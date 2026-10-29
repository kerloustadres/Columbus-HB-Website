import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { EMAIL, LEGAL_UPDATED, LEGAL_UPDATED_ISO, PHONE_PRIMARY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Columbus Home Buyers collects, uses and protects the information you share when you request a cash offer on your house.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy", title: "Privacy Policy | Columbus Home Buyers" },
};

export default function PrivacyPolicy() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]}>
      <article className="legal">
        <h1>Privacy Policy</h1>
        <p className="legal__updated">Last updated <time dateTime={LEGAL_UPDATED_ISO}>{LEGAL_UPDATED}</time></p>

        <p>
          This policy explains what information Columbus Home Buyers (&ldquo;we,&rdquo; &ldquo;us&rdquo;) collects through
          columbushb.com, how we use it, and the choices you have. If you have questions, email{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call {PHONE_PRIMARY.display}.
        </p>

        <h2>Information you give us</h2>
        <p>When you request a cash offer through our form, we collect:</p>
        <ul>
          <li>The property address, its condition, whether it is listed, and any price you have in mind</li>
          <li>Your selling timeline and reason for selling</li>
          <li>Your name, phone number and email address</li>
        </ul>
        <p>We also receive whatever you choose to tell us when you call, text or email us.</p>

        <h2>Information collected automatically</h2>
        <p>
          If you arrive from an ad or a link that carries campaign tags (such as <code>utm_source</code>), we save those tags
          with your offer request so we know which advertising is working. Like most websites, our hosting provider also keeps
          standard server logs, which include your IP address, browser type and the pages you requested. We do not currently
          use advertising or analytics cookies on this site.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To review your property and prepare a cash offer</li>
          <li>To contact you about your property and your offer by phone, text message or email</li>
          <li>To keep records of our conversations and transactions</li>
          <li>To measure which marketing brings in requests</li>
          <li>To protect our website and comply with the law</li>
        </ul>

        <h2>Phone calls and text messages</h2>
        <p>
          By submitting your phone number, you agree that we may call or text you at that number about your property. Message
          and data rates may apply. You can reply STOP to any text to stop receiving them, or tell us on a call that you no
          longer want to hear from us. Agreeing to be contacted is not a condition of selling to us.
        </p>

        <h2>Who we share it with</h2>
        <p>
          We do not sell your personal information. We share it only with service providers that help us run our business,
          and only for that purpose:
        </p>
        <ul>
          <li><strong>Supabase</strong>, which stores the offer requests submitted through our form</li>
          <li><strong>Zapier</strong> and <strong>Follow Up Boss</strong>, which deliver your request to our team and keep track of our follow-up</li>
          <li><strong>Hostinger</strong>, which hosts this website</li>
        </ul>
        <p>
          If you move forward with a sale, we will also share the details needed to close with the title company, closing
          attorney or other parties involved in the transaction. We may disclose information when the law requires it or to
          protect our rights.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep your information for as long as we need it to work with you, and afterward for as long as we need it for our
          business records or legal obligations.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to tell you what information we have about you, correct it, or delete it. Email{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will respond within a reasonable time. We may need to keep some
          records when the law requires it.
        </p>

        <h2>Security</h2>
        <p>
          We use reputable providers and limit who on our team can see your information. No method of sending or storing data
          over the internet is completely secure, so we cannot guarantee absolute security.
        </p>

        <h2>Children</h2>
        <p>This website is meant for adults. We do not knowingly collect information from anyone under 18.</p>

        <h2>Links to other sites</h2>
        <p>
          Our site links to other websites, such as Trustpilot. Their own privacy policies apply when you visit them.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The date at the top of this page shows when it last changed. See also
          our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
        </p>

        <h2>Contact us</h2>
        <p>
          Columbus Home Buyers
          <br />Columbus, Ohio
          <br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <br /><a href={`tel:${PHONE_PRIMARY.tel}`}>{PHONE_PRIMARY.display}</a>
        </p>
      </article>
    </PageShell>
  );
}
