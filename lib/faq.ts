/** FAQ entries. The home page renders these and builds its FAQPage structured data from the same list. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How do you come up with your cash offer?",
    a: "We look at your home's location, condition, recent comparable sales nearby, and what it will cost to repair. Because we do that homework up front, the offer you get is the offer you keep. That's our Price Lock Guarantee.",
  },
  {
    q: "Are there any fees or commissions?",
    a: "None. There are no agent commissions and we pay all normal closing costs. The number on your offer is what you take home.",
  },
  {
    q: "Do I need to make repairs or clean the house?",
    a: "No. We buy houses as-is, in any condition. You don't need to fix, paint, or even clean. Take what you want and leave the rest.",
  },
  {
    q: "How fast can you close?",
    a: "We can close in as little as 7 days. Most of our closings happen in 7 to 14 days. Need more time to move? You choose the closing date.",
  },
  {
    q: "Will your offer drop after you see the house?",
    a: "No. A lot of buyers start high and chip away after inspection. We don't play that game. Once we give you a number, that's the number at closing.",
  },
  {
    q: "Am I obligated to accept your offer?",
    a: "Not at all. Our offers are 100% free and no-obligation. If it doesn't work for you, no hard feelings.",
  },
  {
    q: "Can you help if I'm behind on payments or facing foreclosure?",
    a: "Yes. We regularly help homeowners facing foreclosure, tax liens, and other financial pressure. Because we pay cash and close quickly, we can often move before deadlines hit. Call us as early as you can.",
  },
  {
    q: "Do you buy houses that are listed with an agent?",
    a: "We typically don't make offers on listed properties. If your listing is ending or you're thinking about pulling it, reach out and we'll talk.",
  },
  {
    q: "Can you buy a rental with tenants still living there?",
    a: "Yes. Whether you're tired of managing or dealing with difficult tenants, we can buy rental properties with tenants in place.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
