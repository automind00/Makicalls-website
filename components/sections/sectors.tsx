"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
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
  shortDesc: string;
  longDesc: string;
  href?: string;
  status: "live" | "coming";
};

const healthcareSectors: Sector[] = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Diş Klinikleri",
    shortDesc: "Randevu, ücret bilgisi, tedavi soruları",
    longDesc:
      "Mesai dışı çağrıları yakalar, randevu defterine ekler. Sık sorulan tedavi/fiyat sorularını klinik tonunda yanıtlar.",
    href: "/dis-klinikleri",
    status: "live",
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    title: "Saç Ekimi",
    shortDesc: "Uluslararası hasta, ön bilgi, fotoğraf analizi",
    longDesc:
      "İngilizce + Arapça + Rusça konuşur. Hasta fotoğrafını alır, AI ön analiz raporu hazırlar, uygun paket önerisi sunar.",
    status: "coming",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Estetik Klinikler",
    shortDesc: "Botoks, dolgu, lazer epilasyon",
    longDesc:
      "Yüksek dönüşüm potansiyelli leadleri ayrıştırır. Konsültasyon randevusu açar, ön bilgileri toplar.",
    status: "coming",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Sağlık Turizmi",
    shortDesc: "Çoklu dil, paket bilgisi, konaklama",
    longDesc:
      "15+ dil. Uluslararası lead’leri kalifiye eder, vize/uçuş/konaklama paket sorularını yönetir.",
    status: "coming",
  },
];

const otherSectors: Sector[] = [
  {
    icon: <Car className="w-6 h-6" />,
    title: "Araç Kiralama",
    shortDesc: "Rezervasyon, müsaitlik, depozit",
    longDesc:
      "Müşteri WhatsApp veya telefonla arar; AI tarih, araç sınıfı ve teslim noktasını alır, müsait araçlardan rezervasyon açar. Depozit, sigorta, ehliyet soruları otomatik yanıtlanır.",
    status: "coming",
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "E-ticaret",
    shortDesc: "Sipariş takibi, iade, ürün soruları",
    longDesc:
      "Instagram DM ve WhatsApp’tan gelen ‘kargom nerede?’, ‘iade nasıl?’, ‘bedenim var mı?’ sorularını anında cevaplar. Yüksek niyetli müşteriyi insan satışçıya bağlar.",
    status: "coming",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Gayrimenkul",
    shortDesc: "İlan sorgusu, gezme randevusu, ön kalifikasyon",
    longDesc:
      "İlan numarasıyla gelen aramaları cevaplar, müşteri kriterlerini (bütçe, semt, oda) toplar, uygun ilanları önerir, gezme için danışmana randevu açar.",
    status: "coming",
  },
];

function SectorCard({ s, i }: { s: Sector; i: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.06 }}
      className={`group relative h-full p-[1px] rounded-2xl transition-all ${
        s.status === "live"
          ? "bg-gradient-to-b from-brand/40 via-[color:var(--color-border)] to-transparent hover:from-brand/70"
          : "bg-gradient-to-b from-[color:var(--color-border)] to-transparent"
      }`}
    >
      <div className="h-full bg-[color:var(--color-elevated)] rounded-2xl p-5 lg:p-6 flex flex-col shadow-[var(--shadow-sm)]">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand/10 border border-brand/30 text-brand-soft">
            {s.icon}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[color:var(--color-fg)] mb-1.5">{s.title}</h3>
        <p className="text-[11px] uppercase tracking-wider text-brand-soft mb-3 font-medium">
          {s.shortDesc}
        </p>
        <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-5 flex-1">
          {s.longDesc}
        </p>

        {s.status === "live" && s.href ? (
          <div className="flex items-center gap-1.5 text-sm font-medium text-brand-soft group-hover:gap-2.5 transition-all">
            Detayları gör
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        ) : (
          <a
            href="/#iletisim"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-soft hover:gap-2.5 transition-all"
          >
            İletişime geçin
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );

  return s.status === "live" && s.href ? (
    <Link href={s.href} className="block h-full">
      {card}
    </Link>
  ) : (
    <div className="h-full">{card}</div>
  );
}

function CategoryHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="flex items-end justify-between mb-6 md:mb-8"
    >
      <div>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft block mb-2">
          {eyebrow}
        </span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em]">
          {title}
        </h3>
      </div>
      <div className="hidden sm:block flex-1 ml-6 h-px bg-gradient-to-r from-[color:var(--color-border)] via-[color:var(--color-border)] to-transparent" />
    </motion.div>
  );
}

export default function Sectors() {
  return (
    <section id="sektorler" className="relative py-16 md:py-24 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-brand/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-soft/5 rounded-full blur-[120px]" />
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
            Hangi sektördesiniz?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            Her sektörün{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              kendi asistanı
            </span>{" "}
            var
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            Aynı temel teknoloji, sektöre özel eğitim: hizmet listesi, soru kalıpları, randevu/rezervasyon kuralları, ton.
          </p>
        </motion.div>

        {/* Sağlık */}
        <CategoryHeader eyebrow="Kategori 01" title="Sağlık Sektörleri" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-14 md:mb-20">
          {healthcareSectors.map((s, i) => (
            <SectorCard key={s.title} s={s} i={i} />
          ))}
        </div>

        {/* Diğer Sektörler */}
        <CategoryHeader eyebrow="Kategori 02" title="Diğer Sektörler" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {otherSectors.map((s, i) => (
            <SectorCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
