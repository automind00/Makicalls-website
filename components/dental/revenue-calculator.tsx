"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight } from "lucide-react";

const WORK_DAYS_PER_YEAR = 250;
const TL_FORMATTER = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
  onChange: (v: number) => void;
};

function SliderRow({ label, value, min, max, step, suffix, prefix, onChange }: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="text-xs sm:text-sm text-slate-300">{label}</label>
        <span className="text-base sm:text-lg font-semibold text-white tabular-nums">
          {prefix}
          {value.toLocaleString("tr-TR")}
          {suffix}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
    </div>
  );
}

export default function RevenueCalculator() {
  const [callsPerDay, setCallsPerDay] = useState(30);
  const [missRate, setMissRate] = useState(25); // percent
  const [avgValue, setAvgValue] = useState(2000); // TL

  const { annualLoss, monthlyLoss, recoverable } = useMemo(() => {
    const dailyMissed = callsPerDay * (missRate / 100);
    const dailyLoss = dailyMissed * avgValue;
    const annual = dailyLoss * WORK_DAYS_PER_YEAR;
    const monthly = annual / 12;
    // MakiCalls 7/24 olduğu için kaybın %80'ini kurtarabileceğini varsayıyoruz
    const recovered = annual * 0.8;
    return { annualLoss: annual, monthlyLoss: monthly, recoverable: recovered };
  }, [callsPerDay, missRate, avgValue]);

  const scrollToForm = () => {
    const el = document.getElementById("pilot-basvuru");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hesaplayici" className="relative py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#8b5cf6]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            Kaç para kaybediyorsunuz?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
            Kliniğinizin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#fca5a5] to-[#f87171]">
              gerçek kaybını
            </span>{" "}
            hesaplayın
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Üç slider'ı kliniğinize göre ayarlayın. Mesai dışı kaçırdığınız randevuların yıllık maliyetini canlı görün.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-6 p-[1px] rounded-3xl bg-gradient-to-b from-[#8b5cf6]/30 via-white/10 to-transparent"
        >
          <div className="lg:col-span-3 bg-[#111111] rounded-3xl lg:rounded-r-none p-6 sm:p-8 md:p-10 space-y-7">
            <SliderRow
              label="Günde gelen toplam çağrı sayısı"
              value={callsPerDay}
              min={5}
              max={100}
              step={1}
              onChange={setCallsPerDay}
            />
            <SliderRow
              label="Mesai dışı / yoğun saatte kaçırma oranı"
              value={missRate}
              min={5}
              max={50}
              step={1}
              suffix="%"
              onChange={setMissRate}
            />
            <SliderRow
              label="Ortalama randevu / işlem değeri"
              value={avgValue}
              min={500}
              max={5000}
              step={100}
              suffix=" ₺"
              onChange={setAvgValue}
            />

            <div className="pt-4 border-t border-white/5 text-[11px] sm:text-xs text-slate-500">
              Hesaplama: Günlük çağrı × Kaçırma oranı × Ortalama randevu × 250 iş günü.
              Veri kaynağı: klinik sektör ortalaması, ölçeklenebilir.
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-[#8b5cf6]/15 to-[#0a0a0a] rounded-3xl lg:rounded-l-none p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                <TrendingDown className="w-3.5 h-3.5 text-red-300" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-red-300">
                  Yıllık kayıp
                </span>
              </div>

              <motion.div
                key={annualLoss}
                initial={{ opacity: 0.6, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-[#fca5a5] to-[#f87171] tabular-nums leading-none mb-2"
              >
                {TL_FORMATTER.format(annualLoss)}
              </motion.div>
              <p className="text-xs text-slate-400">
                Aylık ortalama:{" "}
                <span className="text-slate-200">{TL_FORMATTER.format(monthlyLoss)}</span>
              </p>

              <div className="mt-7 pt-6 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-[#a78bfa] mb-1.5 font-medium">
                  MakiCalls ile kurtarabilirsiniz
                </p>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {TL_FORMATTER.format(recoverable)}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  7/24 yanıt + tüm kanal entegrasyonu varsayımı (~%80 kurtarma)
                </p>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="mt-7 w-full group flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors shadow-[0_0_40px_-10px_#8b5cf6]"
            >
              Pilot programa başvur
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
