"use client";
import React from "react";
import { motion } from "framer-motion";
import type { SectorConfig } from "@/lib/sectors";
import { PAIN_ICONS } from "./icon-map";

export default function SectorPainPoints({ sector }: { sector: SectorConfig }) {
  const heading = sector.painsHeading ?? {
    badge: `${sector.name} sahiplerinin günlük problemi`,
    titleStart: "Cevapsız kalan her arama",
    titleEnd: "kaçırılan bir müşteridir",
  };

  return (
    <section
      id="acilar"
      className="relative py-16 md:py-24 bg-[color:var(--color-page)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            {heading.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            {heading.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-red-400 to-rose-500">
              {heading.titleEnd}
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {sector.pains.map((p, i) => {
            const Icon = PAIN_ICONS[p.iconKey];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[color:var(--color-border-strong)] to-transparent"
              >
                <div className="h-full bg-[color:var(--color-elevated)] rounded-2xl p-6 md:p-7 shadow-[var(--shadow-md)]">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-5">
                    {Icon ? <Icon className="w-6 h-6" /> : null}
                  </div>
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)] mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-5">
                    {p.body}
                  </p>
                  {p.stat && (
                    <div className="pt-4 border-t border-[color:var(--color-border)]">
                      <p className="text-xs text-[color:var(--color-fg-muted)] italic">
                        {p.stat}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
