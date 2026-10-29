import type { MetadataRoute } from "next";
import { LEGAL_UPDATED_ISO, SITE_URL } from "@/lib/site";

/** Every indexable page. Add new pages here so Google can find them. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(LEGAL_UPDATED_ISO), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: new Date(LEGAL_UPDATED_ISO), changeFrequency: "yearly", priority: 0.3 },
  ];
}
