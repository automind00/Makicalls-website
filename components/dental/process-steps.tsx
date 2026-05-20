"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Klinik bilgilerinizi paylaşın",
    body: "Tek bir kısa form: çalışma saatleri, hizmet listesi, randevu kuralları, SSS, marka tonu.",
    time: "Sizden 15 dk",
  },
  {
    n: "02",
    title: "AI’yı sizin kliniğinize göre eğitiyoruz",
    body: "Bilgilerinizi alıyoruz, ses karakterini ayarlıyoruz, randevu defteri / CRM / NetGSM ile entegre ediyoruz.",
    time: "Bizim işimiz",
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
    <section className="relative py-16 md:py-24 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            3 adımda canlı
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Sizden tek istediğimiz{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              15 dakika
            </span>
            , gerisini biz hallederiz
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

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
                <div className="relative inline-flex md:flex w-12 h-12 rounded-full bg-[color:var(--color-page)] border-2 border-brand/40 items-center justify-center text-brand-soft font-bold text-sm mb-5 shadow-[0_0_30px_-8px_rgb(var(--brand))]">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)] mb-2">{s.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-3">{s.body}</p>
                <span className="inline-block text-[11px] font-medium text-brand-soft uppercase tracking-wider">
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
