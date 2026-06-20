"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight } from "lucide-react";
import type { SectorConfig } from "@/lib/sectors";

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

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  suffix,
  prefix,
  onChange,
}: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="text-xs sm:text-sm text-[color:var(--color-fg-secondary)]">
          {label}
        </label>
        <span className="text-base sm:text-lg font-semibold text-[color:var(--color-fg)] tabular-nums">
          {prefix}
          {value.toLocaleString("tr-TR")}
          {suffix}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-[color:var(--color-surface)] overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand to-brand-soft"
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

/**
 * Generic Sektörel ROI Calculator.
 * 3 slider input (sektöre özel parametreler) + canlı hesaplama.
 * Sektörün roiCalculator alanı yoksa hiçbir şey render etmez.
 */
export default function SectorRoiCalculator({
  sector,
}: {
  sector: SectorConfig;
}) {
  const roi = sector.roiCalculator;
  // Hooks must be called unconditionally, so initialize with safe defaults
  const initialA = roi?.inputs[0]?.default ?? 0;
  const initialB = roi?.inputs[1]?.default ?? 0;
  const initialC = roi?.inputs[2]?.default ?? 0;

  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [c, setC] = useState(initialC);

  const result = useMemo(() => {
    if (!roi) return null;
    return roi.compute(a, b, c);
  }, [roi, a, b, c]);

  if (!roi || !result) return null;

  const scrollToForm = () => {
    const el = document.getElementById("demo-talep");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="roi-hesaplayici"
      className="relative py-16 md:py-24 bg-[color:var(--color-surface)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand/8 rounded-full blur-[140px]" />
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
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            {roi.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            {roi.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-red-400 to-rose-500">
              {roi.titleMid}
            </span>{" "}
            {roi.titleEnd}
          </h2>
          {roi.description && (
            <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
              {roi.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-6 p-[1px] rounded-3xl bg-gradient-to-b from-brand/30 via-[color:var(--color-border)] to-transparent shadow-[var(--shadow-lg)]"
        >
          {/* Inputs */}
          <div className="lg:col-span-3 bg-[color:var(--color-elevated)] rounded-3xl lg:rounded-r-none p-6 sm:p-8 md:p-10 space-y-7">
            <SliderRow
              label={roi.inputs[0].label}
              value={a}
              min={roi.inputs[0].min}
              max={roi.inputs[0].max}
              step={roi.inputs[0].step}
              prefix={roi.inputs[0].prefix}
              suffix={roi.inputs[0].suffix}
              onChange={setA}
            />
            <SliderRow
              label={roi.inputs[1].label}
              value={b}
              min={roi.inputs[1].min}
              max={roi.inputs[1].max}
              step={roi.inputs[1].step}
              prefix={roi.inputs[1].prefix}
              suffix={roi.inputs[1].suffix}
              onChange={setB}
            />
            <SliderRow
              label={roi.inputs[2].label}
              value={c}
              min={roi.inputs[2].min}
              max={roi.inputs[2].max}
              step={roi.inputs[2].step}
              prefix={roi.inputs[2].prefix}
              suffix={roi.inputs[2].suffix}
              onChange={setC}
            />

            <div className="pt-4 border-t border-[color:var(--color-border)] text-[11px] sm:text-xs text-[color:var(--color-fg-muted)]">
              {roi.helperFootnote}
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-2 bg-gradient-to-br from-brand/15 to-[color:var(--color-elevated)] rounded-3xl lg:rounded-l-none p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-red-500">
                  {result.lossLabel}
                </span>
              </div>

              <motion.div
                key={result.lossAmount}
                initial={{ opacity: 0.6, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-red-400 to-rose-500 tabular-nums leading-none mb-2"
              >
                {TL_FORMATTER.format(result.lossAmount)}
              </motion.div>
              {result.lossSubtext && (
                <p className="text-xs text-[color:var(--color-fg-muted)]">
                  {result.lossSubtext}
                </p>
              )}

              <div className="mt-7 pt-6 border-t border-[color:var(--color-border)]">
                <p className="text-[11px] uppercase tracking-wider text-brand-soft mb-1.5 font-medium">
                  {result.recoveryLabel}
                </p>
                <div className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] tabular-nums">
                  {TL_FORMATTER.format(result.recoveryAmount)}
                </div>
                {result.recoverySubtext && (
                  <p className="text-[11px] text-[color:var(--color-fg-muted)] mt-1">
                    {result.recoverySubtext}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="mt-7 w-full group flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-brand hover:bg-brand-deep transition-colors shadow-[0_0_40px_-10px_rgb(var(--brand))]"
            >
              Bu Geliri Yakalayalım
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
