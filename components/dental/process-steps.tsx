"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Klinik bilgilerinizi paylaşın",
    body: "15 dakikalık tek bir form: çalışma saatleri, hizmet listesi, randevu kuralları, SSS, marka tonu.",
    time: "15 dakika",
  },
  {
    n: "02",
    title: "AI'yı sizin kliniğinize göre eğitiyoruz",
    body: "Bilgilerinizi alıyoruz, ses karakterini ayarlıyoruz, randevu defteri / CRM / NetGSM ile entegre ediyoruz.",
    time: "3 iş günü",
  },
  {
    n: "03",
    title: "Yayına geçer, raporları sizinle paylaşırız",
    body: "Asistan canlıda. Her hafta size çağrı sayısı, randevu dönüşümü, hasta soruları raporu gelir.",
    time: "Sürekli",
  },
];

export default function ProcessSteps() {
  return (
    <section className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            3 adımda canlı
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
            Toplam{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
              3 iş günü
            </span>
            , klinik tarafından harcadığınız zaman 15 dakika
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line on mobile, horizontal on desktop */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative text-center md:text-left"
              >
                <div className="relative inline-flex md:flex w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#8b5cf6]/40 items-center justify-center text-[#a78bfa] font-bold text-sm mb-5 shadow-[0_0_30px_-8px_#8b5cf6]">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{s.body}</p>
                <span className="inline-block text-[11px] font-medium text-[#a78bfa] uppercase tracking-wider">
                  {s.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
