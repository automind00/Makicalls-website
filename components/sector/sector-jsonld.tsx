import type { SectorConfig } from "@/lib/sectors";

const SITE_URL = "https://makicalls.com";

export default function SectorJsonLd({ sector }: { sector: SectorConfig }) {
  const pageUrl = sector.legacyHref
    ? `${SITE_URL}${sector.legacyHref}`
    : `${SITE_URL}/sektorler/${sector.slug}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sector.metadata.title,
    description: sector.metadata.description,
    provider: {
      "@type": "Organization",
      name: "MakiCalls",
      url: SITE_URL,
    },
    areaServed: "TR",
    serviceType: "AI Müşteri Hizmetleri",
    url: pageUrl,
    image: `${SITE_URL}/sektorler/${sector.slug}/opengraph-image`,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sector.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
