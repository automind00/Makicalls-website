"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import type { SectorConfig } from "@/lib/sectors";
import { ACCENT_THEMES } from "./icon-map";

export default function SectorHero({ sector }: { sector: SectorConfig }) {
  const theme = ACCENT_THEMES[sector.accent];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[color:var(--color-page)] pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-brand-soft/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[color:var(--color-surface)] border ${theme.border} mb-6 sm:mb-8`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} shadow-[0_0_8px_rgb(var(--brand-soft))] animate-pulse`} />
          <span className="text-[10px] sm:text-xs text-[color:var(--color-fg-secondary)] font-medium tracking-wide uppercase">
            {sector.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-[1.05] mb-5 sm:mb-7"
        >
          {sector.hero.titleStart}{" "}
          <span className={`text-transparent bg-clip-text bg-gradient-to-br ${theme.gradient}`}>
            {sector.hero.titleMid}
          </span>{" "}
          {sector.hero.titleEnd}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-[color:var(--color-fg-muted)] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          {sector.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8"
        >
          <button
            onClick={() => scrollTo("demo-talep")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-brand hover:bg-brand-deep transition-colors shadow-[0_0_40px_-10px_rgb(var(--brand))]"
          >
            Canlı Demo Talep Et
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo("acilar")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-[color:var(--color-fg-secondary)] bg-[color:var(--color-surface)] border border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-elevated)] transition-colors"
          >
            <Phone className="w-4 h-4" />
            Sektörün Acı Noktaları
          </button>
        </motion.div>
      </div>
    </section>
  );
}
