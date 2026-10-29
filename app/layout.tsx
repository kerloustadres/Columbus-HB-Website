import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { EMAIL, PHONE_PRIMARY, PHONE_SECONDARY, SITE_NAME, SITE_URL, TRUSTPILOT_URL, jsonLd } from "@/lib/site";

// Self-hosted at build time: no request to Google Fonts and a size-matched fallback, so text doesn't shift when it loads.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "We Buy Houses in Columbus for Cash | Columbus Home Buyers",
    template: "%s | Columbus Home Buyers",
  },
  description:
    "Get a fair cash offer on your Columbus, OH house in 24 hours. No repairs, no fees, no commissions. Sell as-is and close in as little as 7 days.",
  applicationName: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [{ url: "/assets/images/logo.webp", width: 240, height: 240, alt: "Columbus Home Buyers logo" }],
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Hostinger only if you verify Search Console with the HTML tag method.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a111d",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "We buy houses fast for cash in Columbus, OH and surrounding areas. No repairs, no fees, no commissions.",
  telephone: [PHONE_PRIMARY.display, PHONE_SECONDARY.display],
  email: EMAIL,
  logo: `${SITE_URL}/assets/images/logo.webp`,
  image: `${SITE_URL}/assets/images/logo.webp`,
  sameAs: [TRUSTPILOT_URL],
  areaServed: { "@type": "City", name: "Columbus", containedInPlace: { "@type": "State", name: "Ohio" } },
  openingHours: "Mo-Su 08:00-20:00",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#business` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([localBusiness, website])} />
        {/* Enables the CSS entrance animations only when JS runs */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js");' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
