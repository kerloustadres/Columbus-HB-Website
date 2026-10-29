import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { PHONE_PRIMARY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist. Get a cash offer on your Columbus house or go back to the home page.",
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="notfound">
        <p className="eyebrow">Error 404</p>
        <h1>We couldn&rsquo;t find that page</h1>
        <p>The link may be old or mistyped. Here are the places most people are looking for:</p>
        <ul className="notfound__links">
          <li><Link href="/">Home page</Link></li>
          <li><a href="/#offer">Get a cash offer</a></li>
          <li><a href="/#how">How it works</a></li>
          <li><a href="/#faq">Frequently asked questions</a></li>
          <li><a href={`tel:${PHONE_PRIMARY.tel}`}>Call {PHONE_PRIMARY.display}</a></li>
        </ul>
      </section>
    </PageShell>
  );
}
