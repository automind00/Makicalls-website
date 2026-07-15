import type { Metadata } from "next";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PostCard from "@/components/blog/post-card";
import { getSortedPosts } from "@/lib/blog";

const SITE_URL = "https://makicalls.com";
const PAGE_URL = `${SITE_URL}/blog`;
const PAGE_TITLE = "Blog — AI Çağrı Merkezi ve Otomasyon Yazıları";
const PAGE_DESCRIPTION =
  "AI sesli asistan, WhatsApp chatbot, çağrı merkezi otomasyonu ve KOBİ teknolojisi üzerine Türkçe uzman makaleler.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "AI çağrı merkezi blog",
    "WhatsApp chatbot rehberi",
    "AI sesli asistan",
    "KOBİ otomasyon",
    "MakiCalls blog",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "MakiCalls",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  const posts = getSortedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28 pb-20 sm:pb-28 bg-[color:var(--color-page)]">
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 text-center mb-12 md:mb-16">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
              Blog
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-[1.05] mb-5">
              AI ve Otomasyon{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
                üzerine yazılar
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] max-w-2xl mx-auto leading-relaxed">
              Sektör verisi, gerçek maliyet hesabı, kurulum rehberleri. Boş söz, satış konuşması yok — uygulanabilir bilgi.
            </p>
          </div>

          {/* Posts grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {featured && <PostCard post={featured} index={0} featured />}
            {rest.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i + 1} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
