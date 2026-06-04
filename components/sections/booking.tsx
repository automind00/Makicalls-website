"use client";
import React from "react";
import { motion } from "framer-motion";
import { CalendlyInline } from "@/components/ui/calendly-inline";

export default function Booking() {
  return (
    <section
      id="randevu"
      className="relative py-24 md:py-32 bg-[color:var(--color-page)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-4 block">
            Demo Görüşmesi
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] mb-4 tracking-tight">
            Takvimden{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              uygun bir saat seçin
            </span>
          </h2>
          <p className="text-[color:var(--color-fg-muted)] max-w-xl mx-auto">
            30 dakika içinde Makicalls&apos;ı kliniğinizin ihtiyaçlarına göre konuşalım. Slot seçin, formu doldurun — randevunuz anında onaylanır.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl overflow-hidden border border-[color:var(--color-border-strong)] bg-[color:var(--color-page)]"
        >
          <CalendlyInline
            url="https://calendly.com/ekremhndolu/30min"
            height={720}
          />
        </motion.div>
      </div>
    </section>
  );
}
