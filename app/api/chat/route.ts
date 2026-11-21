import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT, SAVE_LEAD_TOOL } from "@/lib/chat-prompt";
import { deliverLead, normalizePhone } from "@/lib/leads";
import { PHONE_PRIMARY } from "@/lib/site";

/*
 * Website chat assistant. The browser sends the visible conversation (plain text only) and
 * gets back newline-delimited JSON events: {t:"text",v}, {t:"break"}, {t:"lead",ok}, {t:"done"}.
 * Earlier assistant turns come back as plain text, so no thinking blocks are ever replayed
 * across turns; within one reply the tool loop passes the model's content back unchanged.
 */

type ChatTurn = { role: "user" | "assistant"; text: string };
type ChatEvent = { t: "text"; v: string } | { t: "break" } | { t: "lead"; ok: boolean } | { t: "done" } | { t: "error"; v: string };

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 40;
const MAX_CHARS_PER_TURN = 1500;
const MAX_TOOL_ROUNDS = 3;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

const ALLOWED_ORIGINS = new Set(["https://columbushb.com", "https://www.columbushb.com"]);
const isAllowedOrigin = (origin: string | null) =>
  !!origin && (ALLOWED_ORIGINS.has(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin));

/* ---- Abuse limits (per server process; enough for a single Hostinger Node app) ---- */
const WINDOW_MS = 10 * 60 * 1000;
const PER_IP_PER_WINDOW = 25;
const GLOBAL_PER_DAY = 2000;
const hits = new Map<string, number[]>();
let day = new Date().toDateString();
let dayCount = 0;

function overLimit(ip: string): boolean {
  const now = Date.now();
  if (new Date().toDateString() !== day) {
    day = new Date().toDateString();
    dayCount = 0;
    hits.clear();
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP_PER_WINDOW || dayCount >= GLOBAL_PER_DAY) return true;
  recent.push(now);
  hits.set(ip, recent);
  dayCount++;
  return false;
}

/** Accept only a well-formed visible conversation: alternating turns, starting and ending with the visitor. */
function parseHistory(body: unknown): ChatTurn[] | null {
  const list = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || list.length === 0 || list.length > MAX_TURNS) return null;
  const turns: ChatTurn[] = [];
  for (const [i, m] of list.entries()) {
    const role = (m as ChatTurn)?.role;
    const text = (m as ChatTurn)?.text;
    if (role !== (i % 2 === 0 ? "user" : "assistant")) return null;
    if (typeof text !== "string" || !text.trim() || text.length > MAX_CHARS_PER_TURN) return null;
    turns.push({ role, text: text.trim() });
  }
  return turns[turns.length - 1].role === "user" ? turns : null;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Run the save_lead tool. Returns the text for the tool_result and whether it should be marked an error. */
async function runSaveLead(input: unknown): Promise<{ content: string; isError: boolean; saved: boolean }> {
  const fail = (content: string) => ({ content, isError: true, saved: false });
  if (typeof input !== "object" || input === null) return fail("Invalid input.");
  const i = input as Record<string, unknown>;

  const requestType = str(i.request_type);
  const fullName = str(i.full_name);
  const phone = normalizePhone(str(i.phone));
  const address = str(i.property_address);
  if (i.consent_to_contact !== true) return fail("The visitor has not agreed to be contacted. Ask before saving.");
  if (requestType !== "cash_offer" && requestType !== "callback") return fail("request_type must be cash_offer or callback.");
  if (fullName.split(/\s+/).length < 2) return fail("Need the visitor's first and last name.");
  if (phone.length !== 10) return fail("Need a valid 10-digit US phone number.");
  if (requestType === "cash_offer" && address.length < 5) return fail("Need the property address for a cash offer.");

  const notes = str(i.notes);
  const reason = [requestType === "callback" ? "Website chat: callback requested." : "Website chat: cash offer request.", notes]
    .filter(Boolean)
    .join(" ");

  const saved = await deliverLead({
    address,
    fullName,
    phone,
    email: str(i.email),
    listed: "",
    price: "",
    condition: str(i.condition),
    timeline: str(i.timeline),
    reason: reason.slice(0, 1000),
    source: "chat",
  });
  return saved
    ? { content: "Saved. The team has the visitor's details.", isError: false, saved: true }
    : { content: `Saving failed. Apologize and ask them to call ${PHONE_PRIMARY.display}.`, isError: true, saved: false };
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"))) return Response.json({ error: "forbidden" }, { status: 403 });
  if (!client) return Response.json({ error: "offline" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (overLimit(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const history = parseHistory(body);
  if (!history) return Response.json({ error: "bad_request" }, { status: 400 });

  const messages: Anthropic.Beta.BetaMessageParam[] = history.map((m) => ({ role: m.role, content: m.text }));
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: ChatEvent) => controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        let wroteText = false;
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const reply = client.beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 4096,
              betas: ["server-side-fallback-2026-07-01"],
              fallbacks: "default",
              output_config: { effort: "low" },
              system: [{ type: "text", text: CHAT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
              tools: [SAVE_LEAD_TOOL],
              messages,
            },
            { signal: request.signal },
          );

          let startedBlock = false;
          for await (const event of reply) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              // A second reply after a tool call starts a new chat bubble.
              if (!startedBlock && wroteText) send({ t: "break" });
              startedBlock = true;
              wroteText = true;
              send({ t: "text", v: event.delta.text });
            }
          }
          const message = await reply.finalMessage();

          if (message.stop_reason === "refusal") {
            if (!wroteText) send({ t: "text", v: `Sorry, I can't help with that here. You can reach the team at ${PHONE_PRIMARY.display}.` });
            break;
          }
          const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
          // Only a completed tool_use turn is safe to run; a max_tokens stop may have cut the input short.
          if (message.stop_reason !== "tool_use" || toolUses.length === 0) break;

          messages.push({ role: "assistant", content: message.content });
          const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const use of toolUses) {
            if (use.name !== SAVE_LEAD_TOOL.name) {
              results.push({ type: "tool_result", tool_use_id: use.id, content: "Unknown tool.", is_error: true });
              continue;
            }
            const r = await runSaveLead(use.input);
            send({ t: "lead", ok: r.saved });
            results.push({ type: "tool_result", tool_use_id: use.id, content: r.content, is_error: r.isError });
          }
          messages.push({ role: "user", content: results });
        }
        send({ t: "done" });
      } catch (err) {
        if (err instanceof Anthropic.APIUserAbortError) return controller.close();
        if (err instanceof Anthropic.RateLimitError) console.error("chat: rate limited by Anthropic");
        else if (err instanceof Anthropic.AuthenticationError) console.error("chat: ANTHROPIC_API_KEY was rejected");
        else if (err instanceof Anthropic.APIError) console.error(`chat: API error ${err.status}:`, err.message);
        else console.error("chat failed:", err instanceof Error ? err.message : err);
        send({ t: "error", v: `Sorry, I'm having trouble right now. Please call or text us at ${PHONE_PRIMARY.display}.` });
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
