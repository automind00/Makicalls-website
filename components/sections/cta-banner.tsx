"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

export default function CtaBanner() {
  const scrollToForm = () => {
    const el = document.getElementById("iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[480px] md:h-[80vh] md:min-h-[600px] w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center py-20 md:py-0">
      {/* Spiral animation full background, slightly dimmed for legibility */}
      <div className="absolute inset-0 z-0 opacity-90">
        <SpiralAnimation />
      </div>

      {/* Stronger top + bottom fade for smoother section blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />

      {/* Inverted vignette: dark center for text legibility, transparent edges so spiral shines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at center, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 45%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-[#a78bfa] mb-4 sm:mb-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]"
        >
          Bir Adım Uzaktasınız
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 [text-shadow:0_4px_40px_rgba(0,0,0,0.9)]"
        >
          Müşterileriniz <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa] [-webkit-text-stroke:0.5px_rgba(255,255,255,0.05)]">
            sizi beklemesin.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed [text-shadow:0_2px_20px_rgba(0,0,0,0.85)]"
        >
          Birkaç dakikada size özel bir teklif alın. Kurulum sonrası{" "}
          <span className="text-white font-semibold">7/24 otomatik müşteri iletişimi</span>{" "}
          işletmenizin standardı olsun.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToForm}
            className="group inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors duration-300 shadow-[0_0_60px_-10px_#8b5cf6]"
          >
            Ücretsiz Teklif Alın
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
