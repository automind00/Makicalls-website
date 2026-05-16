"use client";
import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "5 dk", label: "Kurulum süresi" },
  { value: "7/24", label: "Yanıt zamanı" },
  { value: "%100", label: "Türkçe destek" },
  { value: "<1 sn", label: "Yanıt gecikmesi" },
];

export default function TrustStrip() {
  return (
    <section className="relative py-10 md:py-14 bg-[color:var(--color-page)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand mb-1 tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[color:var(--color-fg-muted)] uppercase tracking-[0.15em]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
