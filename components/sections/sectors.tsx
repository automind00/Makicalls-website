"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Stethoscope,
  Scissors,
  Sparkles,
  Plane,
  Car,
  ShoppingBag,
  Building2,
} from "lucide-react";

type Sector = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href?: string;
};

const healthcare: Sector[] = [
  { icon: <Stethoscope className="w-5 h-5" />, title: "Diş Klinikleri", desc: "Randevu, ücret bilgisi, tedavi soruları", href: "/dis-klinikleri" },
  { icon: <Scissors className="w-5 h-5" />, title: "Saç Ekimi", desc: "Uluslararası hasta, ön bilgi, fotoğraf analizi" },
  { icon: <Sparkles className="w-5 h-5" />, title: "Estetik Klinikler", desc: "Botoks, dolgu, lazer epilasyon" },
  { icon: <Plane className="w-5 h-5" />, title: "Sağlık Turizmi", desc: "Çoklu dil, paket bilgisi, konaklama" },
];

const other: Sector[] = [
  { icon: <Car className="w-5 h-5" />, title: "Araç Kiralama", desc: "Rezervasyon, müsaitlik, depozit" },
  { icon: <ShoppingBag className="w-5 h-5" />, title: "E-ticaret", desc: "Sipariş takibi, iade, ürün soruları" },
  { icon: <Building2 className="w-5 h-5" />, title: "Gayrimenkul", desc: "İlan sorgusu, gezme randevusu, kalifikasyon" },
];

function Card({ s, i }: { s: Sector; i: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="group relative flex items-center gap-3.5 h-full p-4 rounded-xl bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] hover:border-brand/40 hover:bg-brand/[0.04] transition-all"
    >
      <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/25 text-brand-soft flex items-center justify-center flex-shrink-0">
        {s.icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-[color:var(--color-fg)] leading-tight flex items-center gap-1">
          {s.title}
          {s.href && (
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-soft opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          )}
        </h3>
        <p className="text-xs text-[color:var(--color-fg-muted)] leading-snug mt-0.5 truncate">
          {s.desc}
        </p>
      </div>
    </motion.div>
  );

  return s.href ? (
    <Link href={s.href} className="block h-full">
      {inner}
    </Link>
  ) : (
    <div className="h-full">{inner}</div>
  );
}

export default function Sectors() {
  return (
    <section id="sektorler" className="relative py-14 md:py-20 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-brand/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 max-w-xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-2 block">
            Sektörler
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Her sektörün{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              kendi asistanı
            </span>{" "}
            var
          </h2>
        </motion.div>

        <div className="mb-3 flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[color:var(--color-fg-muted)]">
            Sağlık
          </span>
          <span className="flex-1 h-px bg-[color:var(--color-border)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {healthcare.map((s, i) => (
            <Card key={s.title} s={s} i={i} />
          ))}
        </div>

        <div className="mb-3 flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[color:var(--color-fg-muted)]">
            Diğer Sektörler
          </span>
          <span className="flex-1 h-px bg-[color:var(--color-border)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {other.map((s, i) => (
            <Card key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
