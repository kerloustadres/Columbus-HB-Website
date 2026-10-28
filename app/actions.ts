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
};

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const orNull = (v: string) => v || null;

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
  if (fullName.length < 2) return { ok: false, error: "Please enter your name." };
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
  return { ok: true };
}
