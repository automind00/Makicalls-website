"use client";
import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";

type Stat = { value: string; label: string; to?: number; prefix?: string; suffix?: string };

const stats: Stat[] = [
  { value: "7/24", to: 7, suffix: "/24", label: "Kesintisiz hizmet" },
  { value: "%100", to: 100, prefix: "%", label: "Türkçe doğal konuşma" },
  { value: "15+ dil", to: 15, suffix: "+ dil", label: "Çoklu dil desteği" },
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
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand mb-1 tracking-tight tabular-nums transition-transform duration-300 group-hover:scale-110">
                {s.to !== undefined ? (
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                ) : (
                  s.value
                )}
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
