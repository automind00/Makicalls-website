import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, CalendarDays, Compass } from "lucide-react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı (404) | MakiCalls",
  description:
    "Aradığın sayfa burada değil. Ana sayfaya, sektör çözümlerine veya randevu bölümüne geçebilirsin.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative overflow-hidden bg-[color:var(--color-page)] flex items-center justify-center py-24 sm:py-32 min-h-[88vh]">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand/12 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-brand-soft/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-brand-soft mb-5">
            404 · Sayfa Bulunamadı
          </span>

          <h1 className="text-[80px] sm:text-[140px] md:text-[180px] font-black leading-none tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-br from-brand-soft via-brand to-brand-deep mb-2 sm:mb-4 tabular-nums">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-tight mb-4">
            Aradığın sayfa burada yok.
          </h2>

          <p className="text-sm sm:text-base text-[color:var(--color-fg-muted)] max-w-md mx-auto leading-relaxed mb-10">
            Yanlış bir bağlantıdan veya artık taşınan bir adresten geldin. Ana
            sayfaya dönebilir ya da hemen 30 dakikalık bir randevu açabilirsin.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[52px] rounded-full text-[15px] sm:text-base font-semibold text-white bg-gradient-to-br from-brand-soft via-brand to-brand-deep active:from-brand-deep transition-colors shadow-[0_12px_40px_-10px_rgb(var(--brand)),inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-inset ring-white/10"
            >
              <Home className="w-[18px] h-[18px]" />
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/#randevu"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[52px] rounded-full text-[15px] sm:text-base font-medium text-[color:var(--color-fg-secondary)] border border-[color:var(--color-border-strong)] hover:border-brand-soft/60 hover:text-[color:var(--color-fg)] hover:bg-brand/5 transition-all backdrop-blur-sm bg-[color:var(--color-surface)]/60"
            >
              <CalendarDays className="w-[18px] h-[18px] text-brand-soft" />
              Randevu Al
              <ArrowRight className="w-4 h-4 text-brand-soft" />
            </Link>
          </div>

          {/* Sektör keşfi - alternatif yönlendirme */}
          <div className="pt-8 border-t border-[color:var(--color-border)] max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-[color:var(--color-fg-muted)] mb-3">
              <Compass className="w-4 h-4 text-brand-soft" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium">
                Belki şunu arıyordun
              </span>
            </div>
            <Link
              href="/sektorler"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-brand-soft hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              8 sektör için özel AI çözümlerini incele
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
