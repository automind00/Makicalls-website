import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import TrustStrip from "@/components/sections/trust-strip";
import Integrations from "@/components/sections/integrations";
import SectorHero from "@/components/sector/sector-hero";
import SectorPainPoints from "@/components/sector/sector-pain-points";
import SectorOmnichannel from "@/components/sector/sector-omnichannel";
import SectorProcess from "@/components/sector/sector-process";
import SectorRoiCalculator from "@/components/sector/sector-roi-calculator";
import SectorFaq from "@/components/sector/sector-faq";
import SectorPilotForm from "@/components/sector/sector-pilot-form";
import SectorJsonLd from "@/components/sector/sector-jsonld";
import { SECTORS, SECTORS_BY_SLUG } from "@/lib/sectors";

const SITE_URL = "https://makicalls.com";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return SECTORS.filter((s) => !s.legacyHref).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTORS_BY_SLUG[slug];
  if (!sector) return {};
  const url = `${SITE_URL}/sektorler/${sector.slug}`;
  return {
    title: sector.metadata.title,
    description: sector.metadata.description,
    keywords: sector.metadata.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: "MakiCalls",
      title: sector.metadata.title,
      description: sector.metadata.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: sector.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: sector.metadata.title,
      description: sector.metadata.description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sector = SECTORS_BY_SLUG[slug];
  if (!sector) notFound();

  // If a sector has a legacy top-level route, redirect there to keep SEO consolidated.
  if (sector.legacyHref) redirect(sector.legacyHref);

  return (
    <>
      <SectorJsonLd sector={sector} />
      <Navbar />
      <main className="flex-1">
        <SectorHero sector={sector} />
        <TrustStrip />
        <SectorPainPoints sector={sector} />
        <SectorOmnichannel sector={sector} />
        <SectorProcess sector={sector} />
        <SectorRoiCalculator sectorSlug={sector.slug} />
        <Integrations />
        <SectorFaq sector={sector} />
        <SectorPilotForm sector={sector} />
      </main>
      <Footer />
    </>
  );
}
