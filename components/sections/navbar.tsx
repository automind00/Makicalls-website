"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { getDemoPhone } from "@/lib/contact";
import { track } from "@/components/analytics/google-analytics";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // Anasayfa dışındaysak (örn. /sektorler/oteller) hash ile anasayfaya git
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
    }
  };

  /**
   * Easter egg: wordmark üzerine 1.2 saniye içinde 3x tıklanırsa admin login'e yönlendir.
   */
  const handleWordmarkClick = () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      router.push("/admin/login");
      return;
    }

    // Normal davranış: sayfa başına scroll
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * `href` varsa direkt o sayfaya gider (Next router).
   * `id` varsa aynı sayfada scroll yapar, anasayfa dışındaysak /#id fallback.
   */
  const navLinks: { label: string; id?: string; href?: string }[] = [
    { label: "Hizmetler", id: "hizmetler" },
    { label: "Sektörler", href: "/sektorler" },
    { label: "Süreç", id: "surec" },
    { label: "SSS", id: "sss" },
    { label: "İletişim", id: "iletisim" },
  ];

  const handleNavClick = (link: { id?: string; href?: string }) => {
    if (link.href) {
      setMobileOpen(false);
      router.push(link.href);
      return;
    }
    if (link.id) scrollToSection(link.id);
  };

  // lib/contact.ts üzerinden env-driven. NEXT_PUBLIC_DEMO_PHONE tanımlıysa
  // navbar + footer + booking otomatik telefon göstermeye başlar.
  const demoPhone = getDemoPhone();
  const DEMO_PHONE = demoPhone?.tel ?? null;
  const DEMO_PHONE_DISPLAY = demoPhone?.display ?? "";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--color-page)]/85 backdrop-blur-xl border-b border-[color:var(--color-border)] shadow-[var(--shadow-md)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark — 3x tıkla = admin login (easter egg) */}
          <motion.button
            onClick={handleWordmarkClick}
            className="group select-none"
            whileHover={{ scale: 1.02 }}
            aria-label="Ana sayfa"
          >
            <span className="font-bold text-xl md:text-[22px] tracking-[-0.02em] leading-none text-[color:var(--color-fg)]">
              Maki<span className="text-brand group-hover:text-brand-soft transition-colors">Calls</span>
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-sm text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Group */}
          <div className="hidden md:flex items-center gap-3">
            {DEMO_PHONE ? (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${DEMO_PHONE}`}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep transition-colors duration-300 shadow-[0_0_30px_-8px_rgb(var(--brand)/0.6)]"
              >
                <Phone className="w-4 h-4" />
                <span>Canlı Demo: {DEMO_PHONE_DISPLAY}</span>
              </motion.a>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  track("cta_demo_click", { source: "navbar_desktop" });
                  scrollToSection("randevu");
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep transition-colors duration-300 shadow-[0_0_30px_-8px_rgb(var(--brand)/0.6)]"
              >
                <Phone className="w-4 h-4" />
                <span>Canlı Demo Talep Et</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="text-[color:var(--color-fg)] p-2.5 -mr-2 rounded-lg active:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — full-screen premium overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-md z-40"
              aria-hidden="true"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed left-0 right-0 top-16 z-50 bg-[color:var(--color-page)]/98 backdrop-blur-2xl border-b border-[color:var(--color-border)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
            >
              <div className="px-5 pt-2 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
                <nav className="flex flex-col" aria-label="Mobil ana menü">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                      onClick={() => handleNavClick(link)}
                      className="flex items-center justify-between text-left w-full py-4 text-[17px] font-medium text-[color:var(--color-fg)] border-b border-[color:var(--color-border)] active:bg-brand/5 transition-colors"
                    >
                      <span>{link.label}</span>
                      <span className="text-brand-soft text-lg" aria-hidden>›</span>
                    </motion.button>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.05 }}
                  className="mt-6"
                >
                  {DEMO_PHONE ? (
                    <a
                      href={`tel:${DEMO_PHONE}`}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full text-base font-semibold text-white bg-brand active:bg-brand-deep shadow-[0_8px_30px_-8px_rgb(var(--brand))]"
                    >
                      <Phone className="w-5 h-5" />
                      Canlı Demo: {DEMO_PHONE_DISPLAY}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        track("cta_demo_click", { source: "navbar_mobile" });
                        scrollToSection("randevu");
                      }}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full text-base font-semibold text-white bg-brand active:bg-brand-deep shadow-[0_8px_30px_-8px_rgb(var(--brand))]"
                    >
                      <Phone className="w-5 h-5" />
                      Randevu Al
                    </button>
                  )}
                  <p className="mt-4 text-center text-[11px] text-[color:var(--color-fg-muted)] tracking-wider uppercase">
                    7/24 · Türkçe · 30 dk
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
