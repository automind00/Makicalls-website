"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "@/components/sections/faq-data";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="sss" className="relative py-16 md:py-28 bg-[color:var(--color-surface)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/4 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Aklınızdaki{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              ilk sorular
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const open = openIdx === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`rounded-2xl border bg-[color:var(--color-elevated)] transition-colors ${
                  open ? "border-brand/40 shadow-[0_0_30px_-12px_rgb(var(--brand))]" : "border-[color:var(--color-border)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-sm sm:text-base font-semibold text-[color:var(--color-fg)] leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      open
                        ? "bg-brand text-white border-brand rotate-45"
                        : "bg-[color:var(--color-surface)] border-[color:var(--color-border)] text-[color:var(--color-fg-muted)]"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-[15px] text-[color:var(--color-fg-secondary)] leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs sm:text-sm text-[color:var(--color-fg-muted)] mt-10">
          Sorunuz listede yok mu?{" "}
          <a href="#iletisim" className="text-brand-soft font-medium hover:text-brand transition-colors">
            Bize doğrudan yazın →
          </a>
        </p>
      </div>
    </section>
  );
}
