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
    <section className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            İlk 3 klinik · Pilot fiyatı
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
            Erken bizimle başlayan klinikler{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
              en iyi koşulu alır
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative p-[1px] rounded-3xl bg-gradient-to-b from-[#8b5cf6]/50 via-[#8b5cf6]/20 to-transparent shadow-[0_0_60px_-20px_#8b5cf6]"
        >
          <div className="bg-[#111111] rounded-3xl p-7 sm:p-9 md:p-11">
            {/* Price block */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 mb-8 border-b border-white/5">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#a78bfa] font-medium mb-2">
                  Pilot Paketi · 3 Ay
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
                    $500
                  </span>
                  <span className="text-base sm:text-lg text-slate-400">tek seferlik kurulum</span>
                </div>
                <div className="flex items-baseline gap-3 flex-wrap mt-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">
                    + $200
                  </span>
                  <span className="text-sm sm:text-base text-slate-400">/ay (3 ay sabit)</span>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  4. aydan itibaren $300/ay · İstediğinizde sözleşmesiz çıkış
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors shadow-[0_0_40px_-10px_#8b5cf6] whitespace-nowrap"
              >
                Pilot programa başvur
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Includes + conditions */}
            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-4">
                  Pakete dahil
                </p>
                <ul className="space-y-2.5">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#a78bfa] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-4">
                  Karşılığında istediklerimiz
                </p>
                <ul className="space-y-2.5">
                  {pilotConditions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#a78bfa] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-slate-500 italic">
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
