"use client";
import React from "react";
import { motion } from "framer-motion";

const integrations = [
  "WhatsApp Business",
  "Instagram DM",
  "Google Calendar",
  "NetGSM",
  "n8n",
  "Supabase",
  "Stripe",
  "Calendly",
];

export default function Integrations() {
  return (
    <section className="relative py-12 md:py-16 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#8b5cf6]/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa]">
            Entegrasyonlar
          </span>
          <h3 className="text-sm sm:text-base text-slate-400 mt-2">
            Mevcut sisteminizle <span className="text-white font-medium">uyumlu çalışır</span>
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
          {integrations.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-300 hover:border-[#8b5cf6]/40 hover:text-white transition-colors"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
