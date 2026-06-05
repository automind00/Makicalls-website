import type { MetadataRoute } from "next";
import { SECTORS } from "@/lib/sectors";

const SITE_URL = "https://makicalls.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sectorEntries: MetadataRoute.Sitemap = SECTORS.map((s) => ({
    url: s.legacyHref
      ? `${SITE_URL}${s.legacyHref}`
      : `${SITE_URL}/sektorler/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    ...sectorEntries,
    { url: `${SITE_URL}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/gizlilik`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/sartlar`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
