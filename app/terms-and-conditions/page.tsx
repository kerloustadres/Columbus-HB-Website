import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { EMAIL, LEGAL_UPDATED, LEGAL_UPDATED_ISO, PHONE_PRIMARY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms for using the Columbus Home Buyers website and requesting a no-obligation cash offer on your house.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: { url: "/terms-and-conditions", title: "Terms & Conditions | Columbus Home Buyers" },
};

export default function Terms() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms-and-conditions" }]}>
      <article className="legal">
        <h1>Terms &amp; Conditions</h1>
        <p className="legal__updated">Last updated <time dateTime={LEGAL_UPDATED_ISO}>{LEGAL_UPDATED}</time></p>

        <p>
          These terms apply to your use of columbushb.com, operated by Columbus Home Buyers (&ldquo;we,&rdquo;
          &ldquo;us&rdquo;). By using the site, you agree to them. If you don&rsquo;t agree, please don&rsquo;t use the site.
        </p>

        <h2>What this site is for</h2>
        <p>
          This site describes how we buy houses for cash and lets you request an offer on your property. The information here is
          general. It is not legal, tax or financial advice, and we are not acting as your real estate agent, attorney or
          financial advisor. You are welcome to talk with your own professionals before selling.
        </p>

        <h2>Offers are not binding until signed</h2>
        <p>
          Requesting an offer is free and does not obligate you to sell. Any offer we give, whether online, by phone or in
          person, becomes binding only when both you and we sign a written purchase agreement. That agreement&rsquo;s terms
          control the sale. Closing timelines depend on title, liens and other factors outside our control.
        </p>

        <h2>Your information</h2>
        <p>
          Please give us accurate information about yourself and the property, and only submit a property you own or are
          authorized to sell. Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we use what you share,
          including how we may contact you by phone, text and email.
        </p>

        <h2>Acceptable use</h2>
        <p>Don&rsquo;t use the site to submit false or someone else&rsquo;s information, send spam, or interfere with how the site works.</p>

        <h2>Reviews and testimonials</h2>
        <p>
          Reviews and videos on this site reflect individual sellers&rsquo; experiences. Every property and situation is
          different, so your offer, timeline and results may differ.
        </p>

        <h2>Our content</h2>
        <p>
          The text, logo, videos and design of this site belong to Columbus Home Buyers. You may not copy or reuse them for
          commercial purposes without our written permission.
        </p>

        <h2>Other websites</h2>
        <p>We link to sites we don&rsquo;t control, such as Trustpilot. We aren&rsquo;t responsible for their content or practices.</p>

        <h2>No warranties</h2>
        <p>
          We work to keep the site accurate and available, but we provide it &ldquo;as is&rdquo; without warranties of any
          kind, and we don&rsquo;t promise it will always be error-free or uninterrupted.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent the law allows, Columbus Home Buyers is not liable for indirect or consequential damages arising
          from your use of this website. Nothing in these terms limits rights that cannot be limited under law.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Ohio.</p>

        <h2>Changes to these terms</h2>
        <p>We may update these terms from time to time. The date at the top of this page shows when they last changed.</p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
          <a href={`tel:${PHONE_PRIMARY.tel}`}>{PHONE_PRIMARY.display}</a>.
        </p>
      </article>
    </PageShell>
  );
}
