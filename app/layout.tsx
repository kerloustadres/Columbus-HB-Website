import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "We Buy Houses in Columbus for Cash | Columbus Home Buyers",
  description:
    "Get a fair cash offer on your Columbus, OH house in 24 hours. No repairs, no fees, no commissions. Sell as-is and close in as little as 7 days.",
  alternates: { canonical: "https://columbushb.com/" },
  icons: { icon: { url: "/assets/images/logo.webp", type: "image/webp" } },
  openGraph: {
    type: "website",
    siteName: "Columbus Home Buyers",
    title: "We Buy Houses in Columbus for Cash | Columbus Home Buyers",
    description: "A fair cash offer in 24 hours. No repairs, no fees, no commissions. Close in as little as 7 days.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a111d",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Columbus Home Buyers",
  description:
    "We buy houses fast for cash in Columbus, OH and surrounding areas. No repairs, no fees, no commissions.",
  telephone: ["(614) 490-1163", "(740) 272-5378"],
  email: "info@columbushb.com",
  logo: "https://columbushb.com/assets/images/logo.webp",
  sameAs: ["https://www.trustpilot.com/review/columbushb.com"],
  areaServed: { "@type": "City", name: "Columbus", containedInPlace: { "@type": "State", name: "Ohio" } },
  openingHours: "Mo-Su 08:00-20:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Enables the CSS entrance animations only when JS runs */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js");' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
