import { createClient } from "@/lib/supabase/server";

/** A lead that has already been validated and normalized (phone is 10 digits, strings trimmed). */
export type Lead = {
  address: string;
  fullName: string;
  phone: string;
  email: string;
  listed: "Yes" | "No" | "";
  price: string;
  condition: string;
  timeline: string;
  reason: string;
  utm?: Partial<Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content", string>>;
};

const orNull = (v: string | undefined) => (v ? v : null);

/** Trim, and turn a US phone number into its 10 digits (dropping a leading 1). */
export const normalizePhone = (v: string) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");

/*
 * Leads also go to Zapier (and on to Follow Up Boss) through the send-to-zapier
 * edge function on the offers.columbushb.com Supabase project, the same path
 * the old static site used. funnel_type "website" marks where it came from.
 */
const ZAPIER_RELAY_URL = "https://zwheccdvoumbvqwsnhnn.supabase.co/functions/v1/send-to-zapier";
const ZAPIER_RELAY_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aGVjY2R2b3VtYnZxd3NuaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjE4MjgsImV4cCI6MjA4NjAzNzgyOH0.kc-OlzqJBgHaBrguUI5NKtiTcLTag0XEVCr5U7LlVko"; // public anon key of that project

async function sendToZapier(lead: Lead) {
  const [firstName, ...lastName] = lead.fullName.split(/\s+/);
  const payload = {
    property_address: lead.address,
    phone: lead.phone,
    first_name: firstName,
    last_name: lastName.join(" "),
    email: lead.email,
    is_listed: orNull(lead.listed),
    selling_timeline: orNull(lead.timeline),
    property_condition: orNull(lead.condition),
    reason_for_selling: orNull(lead.reason),
    desired_price: lead.price ? Number(lead.price) : null,
    utm_source: orNull(lead.utm?.utm_source),
    utm_medium: orNull(lead.utm?.utm_medium),
    utm_campaign: orNull(lead.utm?.utm_campaign),
    utm_term: orNull(lead.utm?.utm_term),
    utm_content: orNull(lead.utm?.utm_content),
    funnel_type: "website",
  };

  const res = await fetch(ZAPIER_RELAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: ZAPIER_RELAY_KEY,
      Authorization: `Bearer ${ZAPIER_RELAY_KEY}`,
    },
    body: JSON.stringify({ step: "step2", payload }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function saveToSupabase(lead: Lead) {
  const supabase = await createClient();
  // No .select() after insert: public roles can insert leads but not read them back.
  const { error } = await supabase.from("leads").insert({
    address: lead.address,
    condition: orNull(lead.condition),
    timeline: orNull(lead.timeline),
    reason: orNull(lead.reason),
    is_listed: lead.listed ? lead.listed === "Yes" : null,
    asking_price: lead.price ? Number(lead.price) : null,
    full_name: lead.fullName,
    phone: lead.phone,
    email: orNull(lead.email),
  });
  if (error) throw new Error(error.message);
}

/**
 * Store the lead in Supabase and hand it to Zapier / Follow Up Boss. The two run independently,
 * so the lead still reaches the team if either one is down; it only fails if both do.
 */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const [db, zap] = await Promise.allSettled([saveToSupabase(lead), sendToZapier(lead)]);
  if (db.status === "rejected") console.error("saveToSupabase failed:", db.reason instanceof Error ? db.reason.message : db.reason);
  if (zap.status === "rejected") console.error("sendToZapier failed:", zap.reason instanceof Error ? zap.reason.message : zap.reason);
  return db.status === "fulfilled" || zap.status === "fulfilled";
}
