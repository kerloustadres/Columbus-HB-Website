/** Business details used in page metadata, structured data, the sitemap and the legal pages. */
export const SITE_URL = "https://columbushb.com";
export const SITE_NAME = "Columbus Home Buyers";

export const PHONE_PRIMARY = { display: "(614) 490-1163", tel: "+16144901163" };
export const PHONE_SECONDARY = { display: "(740) 272-5378", tel: "+17402725378" };
export const EMAIL = "info@columbushb.com";
export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/columbushb.com";

/** Date the Privacy Policy and Terms were last changed. Update it whenever either page's text changes. */
export const LEGAL_UPDATED = "October 30, 2026";
export const LEGAL_UPDATED_ISO = "2026-10-30";

/** Serialize structured data for a <script type="application/ld+json"> tag without letting "<" close it early. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
