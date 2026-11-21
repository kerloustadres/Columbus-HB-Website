"use client";

import { useEffect, useRef, useState } from "react";
import { PHONE_PRIMARY } from "@/lib/site";

type Bubble = { role: "user" | "assistant"; text: string } | { role: "note"; text: string };

const GREETING = "Hi! I can answer questions about selling your house to us, or get you a no-obligation cash offer. What can I help with?";
const SUGGESTIONS = ["How does it work?", "Get a cash offer", "Talk to a person"];
const STORAGE_KEY = "chb-chat";
const OFFLINE = `Our chat assistant is offline right now. Please call or text us at ${PHONE_PRIMARY.display} and a real person will help you.`;

/** Floating chat assistant. Talks to /api/chat, which runs Claude and can send leads to the team. */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the conversation while the visitor moves around the site in this tab.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setBubbles(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bubbles));
    } catch {}
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [bubbles]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    setDraft("");
    const next: Bubble[] = [...bubbles, { role: "user", text: message }];
    setBubbles(next);
    setBusy(true);

    // The API sees only the real conversation: visitor and assistant turns, merged so they alternate.
    const history: { role: "user" | "assistant"; text: string }[] = [];
    for (const b of next) {
      if (b.role === "note") continue;
      const last = history[history.length - 1];
      if (last?.role === b.role) last.text += "\n\n" + b.text;
      else history.push({ role: b.role, text: b.text });
    }
    const recent = history.slice(-39);
    if (recent[0]?.role === "assistant") recent.shift();

    const add = (b: Bubble) => setBubbles((cur) => [...cur, b]);
    const appendText = (v: string) =>
      setBubbles((cur) => {
        const last = cur[cur.length - 1];
        if (last?.role === "assistant") return [...cur.slice(0, -1), { role: "assistant", text: last.text + v }];
        return [...cur, { role: "assistant", text: v }];
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: recent }),
      });
      if (res.status === 503) return add({ role: "assistant", text: OFFLINE });
      if (res.status === 429) return add({ role: "assistant", text: `I'm getting a lot of messages right now. Please try again in a few minutes, or call ${PHONE_PRIMARY.display}.` });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let startNew = true;
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line) continue;
          const e = JSON.parse(line);
          if (e.t === "text") {
            if (startNew) add({ role: "assistant", text: e.v });
            else appendText(e.v);
            startNew = false;
          } else if (e.t === "break") startNew = true;
          else if (e.t === "lead" && e.ok) {
            add({ role: "note", text: "Your details were sent to our team" });
            startNew = true;
          } else if (e.t === "error") add({ role: "assistant", text: e.v });
        }
      }
    } catch {
      add({ role: "assistant", text: `Sorry, something went wrong. Please call or text us at ${PHONE_PRIMARY.display}.` });
    } finally {
      setBusy(false);
    }
  }

  const lastIsUser = bubbles[bubbles.length - 1]?.role === "user";

  return (
    <>
      <button
        type="button"
        className={`chat-launch${open ? " is-open" : ""}`}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        aria-controls="chatPanel"
        onClick={() => setOpen(!open)}
      >
        <svg className="icon" aria-hidden="true"><use href={open ? "#i-x" : "#i-chat"} /></svg>
        <span className="chat-launch__label">Chat with us</span>
      </button>

      <section className="chat" id="chatPanel" role="dialog" aria-label="Chat with Columbus Home Buyers" hidden={!open}>
        <header className="chat__head">
          <img src="/assets/images/logo.webp" alt="" width="40" height="40" />
          <div className="chat__title">
            <strong>Columbus Home Buyers</strong>
            <span><i aria-hidden="true" /> AI assistant &middot; real people 8am&ndash;8pm</span>
          </div>
          <button type="button" className="chat__close" aria-label="Close chat" onClick={() => setOpen(false)}>
            <svg className="icon"><use href="#i-x" /></svg>
          </button>
        </header>

        <div className="chat__human">
          <a href={`tel:${PHONE_PRIMARY.tel}`}><svg className="icon" aria-hidden="true"><use href="#i-phone" /></svg> Call</a>
          <a href={`sms:${PHONE_PRIMARY.tel}`}><svg className="icon" aria-hidden="true"><use href="#i-chat" /></svg> Text</a>
          <button type="button" onClick={() => send("I'd like someone to call me back.")} disabled={busy}>
            Request a callback
          </button>
        </div>

        <div className="chat__log" ref={logRef} aria-live="polite">
          <p className="chat__msg chat__msg--assistant">{GREETING}</p>
          {bubbles.map((b, i) =>
            b.role === "note" ? (
              <p key={i} className="chat__note"><svg className="icon" aria-hidden="true"><use href="#i-check" /></svg> {b.text}</p>
            ) : (
              <p key={i} className={`chat__msg chat__msg--${b.role}`}>{b.text}</p>
            ),
          )}
          {busy && lastIsUser && <p className="chat__typing" aria-label="Assistant is typing"><span /><span /><span /></p>}
          {bubbles.length === 0 && (
            <div className="chat__chips">
              {SUGGESTIONS.map((s) => (
                <button type="button" key={s} onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            maxLength={1500}
            placeholder="Type your message..."
            aria-label="Your message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
          />
          <button type="submit" aria-label="Send message" disabled={busy || !draft.trim()}>
            <svg className="icon"><use href="#i-send" /></svg>
          </button>
        </form>
        <p className="chat__fine">
          AI assistant; it can make mistakes. See our <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>
    </>
  );
}
