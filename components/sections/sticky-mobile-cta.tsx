"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Phone } from "lucide-react";
import { getDemoPhone } from "@/lib/contact";
import { track } from "@/components/analytics/google-analytics";
import { getConsent, subscribeConsent } from "@/lib/consent";

/**
 * Mobile-only sticky bottom CTA bar.
 *
 * Görünme kuralları (hepsi karşılanmalı):
 * 1. Mobile viewport (Tailwind sm altı)
 * 2. Kullanıcı hero'dan biraz scroll yapmış olmalı (göstermeden önce sayfa
 *    tasarımına nefes verelim, anında bombardıman olmasın)
 * 3. Booking section ekranda değil (zaten orada CTA var, tekrar gereksiz)
 * 4. /admin rotalarında değil
 *
 * Telefon (env varsa) + Randevu butonu yan yana. Safe-area-inset
 * respect — iOS gesture bar'a yapışmaz.
 */
export default function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [bookingInView, setBookingInView] = useState(false);
  const [consentDecided, setConsentDecided] = useState(false);

  // /admin sayfasında hiç render etme
  const isExcluded = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isExcluded) return;

    const handleScroll = () => {
      // 400px'ten sonra göster (hero'nun ötesinde)
      setVisible(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Booking section IntersectionObserver
    const bookingSection = document.getElementById("randevu");
    let observer: IntersectionObserver | undefined;
    if (bookingSection) {
      observer = new IntersectionObserver(
        ([entry]) => setBookingInView(entry.isIntersecting),
        { rootMargin: "-100px" }, // Booking yarı görünür olduğunda da gizle
      );
      observer.observe(bookingSection);
    }

    // Consent kararı verildi mi? Cookie banner ile çakışma önlemek için
    setConsentDecided(getConsent() !== null);
    const unsubscribe = subscribeConsent((v) => setConsentDecided(v !== null));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
      unsubscribe();
    };
  }, [isExcluded, pathname]);

  if (isExcluded) return null;

  const demoPhone = getDemoPhone();
  // Cookie banner kapanmadan sticky CTA gösterme (iki layer üst üste binmesin)
  const shouldShow = visible && !bookingInView && consentDecided;

  const handleRandevu = () => {
    track("cta_demo_click", { source: "sticky_mobile_cta" });
    const el = document.getElementById("randevu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else if (window.location.pathname !== "/") {
      window.location.href = "/#randevu";
    }
  };

  const handleCall = () => {
    track("cta_phone_click", { source: "sticky_mobile_cta" });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          aria-label="Hızlı erişim"
        >
          <div className="flex gap-2 p-2 rounded-2xl bg-[color:var(--color-elevated)]/95 backdrop-blur-xl border border-[color:var(--color-border-strong)] shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.6)]">
            {demoPhone && (
              <a
                href={`tel:${demoPhone.tel}`}
                onClick={handleCall}
                className="flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-fg)] active:bg-[color:var(--color-page)] transition-colors flex-shrink-0"
                aria-label={`Telefonla ara: ${demoPhone.display}`}
              >
                <Phone className="w-5 h-5 text-brand-soft" />
              </a>
            )}
            <button
              type="button"
              onClick={handleRandevu}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-xl text-[15px] font-semibold text-white bg-gradient-to-br from-brand-soft via-brand to-brand-deep active:from-brand-deep transition-colors shadow-[0_8px_24px_-8px_rgb(var(--brand)),inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-inset ring-white/10"
            >
              <CalendarDays className="w-[18px] h-[18px]" />
              Randevu Al
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
