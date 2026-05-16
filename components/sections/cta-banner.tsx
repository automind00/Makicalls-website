"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

export default function CtaBanner() {
  return (
    <section className="relative min-h-[480px] md:h-[80vh] md:min-h-[600px] w-full overflow-hidden bg-[color:var(--color-page)] flex items-center justify-center py-20 md:py-0">
      <div className="absolute inset-0 z-0 opacity-90 dark:opacity-90 opacity-30">
        <SpiralAnimation />
      </div>

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[color:var(--color-page)] via-[color:var(--color-page)]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--color-page)] via-[color:var(--color-page)]/80 to-transparent z-10 pointer-events-none" />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at center, rgb(var(--bg-page) / 0.88) 0%, rgb(var(--bg-page) / 0.55) 45%, transparent 80%)",
        }}
      />

      <div className="relative z-20 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-brand-soft mb-4 sm:mb-6"
        >
          Pilot Programı · 3 Koltuk Kaldı
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[color:var(--color-fg)] tracking-[-0.03em] leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8"
        >
          Telefonunuz <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
            artık susmasın.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-xl text-[color:var(--color-fg-secondary)] max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          İlk 3 İstanbul kliniği için pilot fiyatı{" "}
          <span className="text-[color:var(--color-fg)] font-semibold">$500 kurulum + $200/ay</span>. 3 iş günü içinde canlı, ilk 30 günde memnun değilseniz iadesiz çıkış.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link href="/dis-klinikleri#pilot-basvuru">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-brand hover:bg-brand-deep transition-colors duration-300 shadow-[0_0_60px_-10px_rgb(var(--brand))] cursor-pointer"
            >
              Pilot Programa Başvur
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
