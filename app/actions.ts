"use server";

import { createClient } from "@/lib/supabase/server";

export type LeadInput = {
  address?: string;
  condition?: string;
  timeline?: string;
  reason?: string;
  listed?: string;
  price?: string;
  name?: string;
  phone?: string;
  email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const orNull = (v: string) => v || null;

/*
 * Leads also go to Zapier (and on to Follow Up Boss) through the send-to-zapier
 * edge function on the offers.columbushb.com Supabase project, the same path
 * the old static site used. funnel_type "website" marks where it came from.
 */
const ZAPIER_RELAY_URL = "https://zwheccdvoumbvqwsnhnn.supabase.co/functions/v1/send-to-zapier";
const ZAPIER_RELAY_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aGVjY2R2b3VtYnZxd3NuaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjE4MjgsImV4cCI6MjA4NjAzNzgyOH0.kc-OlzqJBgHaBrguUI5NKtiTcLTag0XEVCr5U7LlVko"; // public anon key of that project

async function sendToZapier(input: LeadInput, lead: { address: string; fullName: string; phone: string; email: string; listed: string; price: string }) {
  const [firstName, ...lastName] = lead.fullName.split(/\s+/);
  const payload = {
    property_address: lead.address,
    phone: lead.phone,
    first_name: firstName,
    last_name: lastName.join(" "),
    email: lead.email,
    is_listed: lead.listed,
    selling_timeline: orNull(text(input.timeline)),
    property_condition: orNull(text(input.condition)),
    reason_for_selling: orNull(text(input.reason)),
    desired_price: lead.price ? Number(lead.price) : null,
    utm_source: orNull(text(input.utm_source)),
    utm_medium: orNull(text(input.utm_medium)),
    utm_campaign: orNull(text(input.utm_campaign)),
    utm_term: orNull(text(input.utm_term)),
    utm_content: orNull(text(input.utm_content)),
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

/** Save an offer-form submission to the `leads` table. Open to every visitor (no auth). */
export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  const address = text(input.address);
  const fullName = text(input.name);
  const email = text(input.email);
  const phone = text(input.phone).replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  const listed = text(input.listed);
  const price = text(input.price).replace(/\D/g, "");

  // Same rules as the browser-side validators; the table's check constraints back these up.
  if (address.length < 5) return { ok: false, error: "Please enter the property address." };
  if (listed !== "Yes" && listed !== "No") return { ok: false, error: "Please choose whether the property is listed." };
  // Zapier needs a last name, so ask for at least two words.
  if (fullName.split(/\s+/).length < 2) return { ok: false, error: "Please enter your first and last name." };
  if (phone.length !== 10) return { ok: false, error: "Please enter a valid 10-digit phone number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email." };

  const supabase = await createClient();
  // No .select() after insert: public roles can insert leads but not read them back.
  const { error } = await supabase.from("leads").insert({
    address,
    condition: orNull(text(input.condition)),
    timeline: orNull(text(input.timeline)),
    reason: orNull(text(input.reason)),
    is_listed: listed === "Yes",
    asking_price: price ? Number(price) : null,
    full_name: fullName,
    phone,
    email,
  });

  if (error) {
    console.error("submitLead failed:", error.message);
    return { ok: false, error: "We couldn't save your info." };
  }

  // The lead is already saved, so a failed hand-off is logged rather than shown to the visitor.
  try {
    await sendToZapier(input, { address, fullName, phone, email, listed, price });
  } catch (err) {
    console.error("sendToZapier failed:", err instanceof Error ? err.message : err);
  }
  return { ok: true };
}
