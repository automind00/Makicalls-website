"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, PhoneIncoming, Wallet } from "lucide-react";

type Metric = {
  icon: React.ReactNode;
  value: string;
  label: string;
  detail: string;
};

const metrics: Metric[] = [
  {
    icon: <PhoneIncoming className="w-5 h-5" />,
    value: "%92",
    label: "Mesai dışı arama yanıt oranı",
    detail: "Eskiden gece/hafta sonu aramalar kayıptı. Şimdi neredeyse hepsi cevaplanıyor.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    value: "3.1×",
    label: "Aydan aya randevu artışı",
    detail: "Pilot kliniklerde ilk 30 günde randevu sayısı ortalama 3 katına çıktı.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    value: "<8 sn",
    label: "Ortalama yanıt süresi",
    detail: "Hasta mesajı attığı an cevap alır — Instagram, WhatsApp, web chat — fark etmez.",
  },
  {
    icon: <Wallet className="w-5 h-5" />,
    value: "%73",
    label: "Aylık operatör maliyeti tasarrufu",
    detail: "Tek tam zamanlı operatöre kıyasla AI çağrı merkezi maliyeti.",
  },
];

export default function Results() {
  return (
    <section className="relative py-16 md:py-28 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[140px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-soft/4 rounded-full blur-[140px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Pilot Sonuçları
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Sayılarla{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              ne değişiyor
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            İlk pilot kliniklerimizin ilk 30 günlük ortalama metrikleri. Klinik tipine göre değişir.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-brand/30 via-[color:var(--color-border)] to-transparent hover:from-brand/60 transition-all"
            >
              <div className="h-full bg-[color:var(--color-elevated)] rounded-2xl p-5 lg:p-6 flex flex-col shadow-[var(--shadow-sm)]">
                <div className="w-11 h-11 rounded-xl bg-brand/10 border border-brand/30 text-brand-soft flex items-center justify-center mb-5">
                  {m.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand mb-2 tracking-tight">
                  {m.value}
                </div>
                <div className="text-sm font-semibold text-[color:var(--color-fg)] mb-2 leading-snug">
                  {m.label}
                </div>
                <p className="text-xs text-[color:var(--color-fg-muted)] leading-relaxed mt-auto">
                  {m.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] text-[color:var(--color-fg-muted)] mt-8 max-w-xl mx-auto">
          * Pilot dönem ortalamaları (3 İstanbul kliniği, Mart–Mayıs 2026). Detaylı vaka çalışması için iletişim formunu kullanın.
        </p>
      </div>
    </section>
  );
}
