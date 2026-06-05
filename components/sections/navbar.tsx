"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

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

  // NetGSM numarası kurulduğunda buraya doldurulacak. Şimdilik Calendly'ye / iletişim formuna düşüyor.
  const DEMO_PHONE: string | null = null;
  const DEMO_PHONE_DISPLAY = "0850 XXX XX XX";

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
                onClick={() => scrollToSection("iletisim")}
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
              className="text-[color:var(--color-fg)] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[color:var(--color-page)]/95 backdrop-blur-xl border-t border-[color:var(--color-border)]"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="block text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)] transition-colors text-base w-full text-left"
                >
                  {link.label}
                </button>
              ))}
              {DEMO_PHONE ? (
                <a
                  href={`tel:${DEMO_PHONE}`}
                  className="flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand"
                >
                  <Phone className="w-4 h-4" />
                  Canlı Demo: {DEMO_PHONE_DISPLAY}
                </a>
              ) : (
                <button
                  onClick={() => scrollToSection("iletisim")}
                  className="flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand"
                >
                  <Phone className="w-4 h-4" />
                  Canlı Demo Talep Et
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
