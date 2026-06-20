"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import {
  getConsent,
  setConsent,
  subscribeConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * KVKK uyumlu çerez banner'ı.
 *
 * - Karar verilmedikçe görünür (consent === null)
 * - "Tümünü Kabul Et" → analytics yüklenir
 * - "Sadece Gerekli" → sadece zorunlu (form, auth) çerezler
 * - Her iki seçenek de localStorage'a kaydedilir, banner kaybolur
 * - "X" kapatma → "essential" varsayar (KVKK best practice: opt-in, opt-out değil)
 * - Detaylar için /gizlilik ve /kvkk linkleri
 *
 * SSR-safe: ilk render'da null döner (hydration mismatch yok),
 * mount sonrası gerçek consent okunur.
 */
export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsentState] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setMounted(true);
    setConsentState(getConsent());
    const unsubscribe = subscribeConsent((v) => setConsentState(v));
    return unsubscribe;
  }, []);

  // SSR/ilk render: banner çıkarmıyoruz, hydration mismatch riski yok
  if (!mounted) return null;
  // Karar verildi → banner görünmez
  if (consent !== null) return null;

  const handleAccept = () => setConsent("accepted");
  const handleEssential = () => setConsent("essential");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-5"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
      >
        <div className="max-w-5xl mx-auto rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-elevated)]/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="p-4 sm:p-5 md:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Icon */}
              <div className="hidden sm:flex w-11 h-11 rounded-xl bg-brand/15 border border-brand/30 items-center justify-center text-brand-soft flex-shrink-0">
                <Cookie className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  id="cookie-banner-title"
                  className="text-sm sm:text-base font-semibold text-[color:var(--color-fg)] mb-1 flex items-center gap-2"
                >
                  <Cookie className="w-4 h-4 text-brand-soft sm:hidden" />
                  Çerezleri yönet
                </h3>
                <p
                  id="cookie-banner-desc"
                  className="text-xs sm:text-[13px] text-[color:var(--color-fg-muted)] leading-relaxed mb-3 sm:mb-4"
                >
                  Sitede deneyiminizi iyileştirmek ve trafiği analiz etmek için
                  çerez kullanıyoruz. Tercihinizi seçin —{" "}
                  <Link
                    href="/gizlilik"
                    className="text-brand-soft hover:underline underline-offset-2"
                  >
                    Gizlilik Politikası
                  </Link>{" "}
                  ve{" "}
                  <Link
                    href="/kvkk"
                    className="text-brand-soft hover:underline underline-offset-2"
                  >
                    KVKK metni
                  </Link>{" "}
                  detayları kapsar.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="order-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep active:bg-brand-deep transition-colors shadow-[0_8px_24px_-8px_rgb(var(--brand))]"
                  >
                    Tümünü Kabul Et
                  </button>
                  <button
                    type="button"
                    onClick={handleEssential}
                    className="order-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-sm font-medium text-[color:var(--color-fg-secondary)] bg-[color:var(--color-surface)] border border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-page)] hover:text-[color:var(--color-fg)] transition-colors"
                  >
                    Sadece Gerekli
                  </button>
                </div>
              </div>

              {/* Close button (= essential) */}
              <button
                type="button"
                onClick={handleEssential}
                aria-label="Kapat (sadece gerekli çerezler)"
                className="flex-shrink-0 p-1.5 -mt-1 -mr-1 rounded-lg text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)] hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
