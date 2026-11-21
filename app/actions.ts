"use server";

import { deliverLead, normalizePhone } from "@/lib/leads";

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

/** Save an offer-form submission and send it to Follow Up Boss. Open to every visitor (no auth). */
export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  const address = text(input.address);
  const fullName = text(input.name);
  const email = text(input.email);
  const phone = normalizePhone(text(input.phone));
  const listed = text(input.listed);
  const price = text(input.price).replace(/\D/g, "");

  // Same rules as the browser-side validators; the table's check constraints back these up.
  if (address.length < 5) return { ok: false, error: "Please enter the property address." };
  if (listed !== "Yes" && listed !== "No") return { ok: false, error: "Please choose whether the property is listed." };
  // Zapier needs a last name, so ask for at least two words.
  if (fullName.split(/\s+/).length < 2) return { ok: false, error: "Please enter your first and last name." };
  if (phone.length !== 10) return { ok: false, error: "Please enter a valid 10-digit phone number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email." };

  const saved = await deliverLead({
    address,
    fullName,
    phone,
    email,
    listed,
    price,
    condition: text(input.condition),
    timeline: text(input.timeline),
    reason: text(input.reason),
    source: "offer_form",
    utm: {
      utm_source: text(input.utm_source),
      utm_medium: text(input.utm_medium),
      utm_campaign: text(input.utm_campaign),
      utm_term: text(input.utm_term),
      utm_content: text(input.utm_content),
    },
  });
  return saved ? { ok: true } : { ok: false, error: "We couldn't save your info." };
}
