"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const includes = [
  "Sesli + WhatsApp + Web Chat + Instagram DM, tek asistan",
  "Türkçe doğal konuşma, klinik tonunda eğitim",
  "Randevu defteri / CRM entegrasyonu",
  "NetGSM hat üzerinden kurumsal numara",
  "Haftalık çağrı + randevu raporu",
  "İlk 30 günde memnun değilseniz iadesiz çıkış",
];

const pilotConditions = [
  "İlk 3 İstanbul kliniği için geçerli",
  "Yayın sonrası 1 kısa case study videosu",
  "2 sektörel tanıdık tavsiyesi",
];

export default function PricingPilot() {
  const scrollToForm = () => {
    const el = document.getElementById("pilot-basvuru");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-16 md:py-24 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            İlk 3 klinik · Pilot fiyatı
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Erken bizimle başlayan klinikler{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              en iyi koşulu alır
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative p-[1px] rounded-3xl bg-gradient-to-b from-brand/50 via-brand/20 to-transparent shadow-[0_0_60px_-20px_rgb(var(--brand))]"
        >
          <div className="bg-[color:var(--color-elevated)] rounded-3xl p-7 sm:p-9 md:p-11 shadow-[var(--shadow-lg)]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 mb-8 border-b border-[color:var(--color-border)]">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-brand-soft font-medium mb-2">
                  Pilot Paketi · 3 Ay
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[color:var(--color-fg)] tabular-nums">
                    $500
                  </span>
                  <span className="text-base sm:text-lg text-[color:var(--color-fg-muted)]">tek seferlik kurulum</span>
                </div>
                <div className="flex items-baseline gap-3 flex-wrap mt-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[color:var(--color-fg)] tabular-nums">
                    + $200
                  </span>
                  <span className="text-sm sm:text-base text-[color:var(--color-fg-muted)]">/ay (3 ay sabit)</span>
                </div>
                <p className="text-xs text-[color:var(--color-fg-muted)] mt-3">
                  4. aydan itibaren $300/ay · İstediğinizde sözleşmesiz çıkış
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep transition-colors shadow-[0_0_40px_-10px_rgb(var(--brand))] whitespace-nowrap"
              >
                Pilot programa başvur
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)] font-medium mb-4">
                  Pakete dahil
                </p>
                <ul className="space-y-2.5">
                  {includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[color:var(--color-fg-secondary)]"
                    >
                      <Check className="w-4 h-4 text-brand-soft mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)] font-medium mb-4">
                  Karşılığında istediklerimiz
                </p>
                <ul className="space-y-2.5">
                  {pilotConditions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[color:var(--color-fg-secondary)]"
                    >
                      <Check className="w-4 h-4 text-brand-soft mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-[color:var(--color-fg-muted)] italic">
                  Bu üç madde sizi rahatsız ediyorsa standart paketi konuşalım — pilot zorunlu değil.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
