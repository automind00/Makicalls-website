"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { SectorConfig } from "@/lib/sectors";

type FormState = "idle" | "submitting" | "success" | "error";

const callVolumes = [
  "1–10 çağrı/gün",
  "10–25 çağrı/gün",
  "25–50 çağrı/gün",
  "50–100 çağrı/gün",
  "100+ çağrı/gün",
];

export default function SectorPilotForm({ sector }: { sector: SectorConfig }) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    district: "",
    callVolume: callVolumes[1],
    note: "",
    kvkk: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kvkk) return;
    setState("submitting");
    setErrorMessage(null);

    const composedNote = [
      `[Kaynak: ${sector.formSourceTag}]`,
      `Semt/İlçe: ${form.district.trim() || "-"}`,
      `Günlük tahmini çağrı: ${form.callVolume}`,
      ``,
      form.note.trim() || "(ek not yok)",
    ].join("\n");

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15_000);
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          clinic: form.company.trim(),
          notes: composedNote,
          date: `Demo Talebi — ${sector.name}`,
          time: "—",
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || `Sunucu hatası (${res.status})`);
      }
      setState("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        district: "",
        callVolume: callVolumes[1],
        note: "",
        kvkk: false,
      });
      setTimeout(() => setState("idle"), 10_000);
    } catch (err) {
      console.error("[SectorPilotForm] submit error:", err);
      const isAbort =
        err instanceof DOMException && err.name === "AbortError";
      setErrorMessage(
        isAbort
          ? "Sunucuya ulaşılamıyor. Lütfen tekrar deneyin."
          : err instanceof Error
            ? err.message
            : "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
      setState("error");
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 sm:py-3 min-h-[52px] sm:min-h-[48px] rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-fg)] text-[15px] sm:text-sm placeholder:text-[color:var(--color-fg-muted)] focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20 transition-all disabled:opacity-60";

  return (
    <section
      id="demo-talep"
      className="relative py-20 md:py-28 bg-[color:var(--color-surface)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[700px] bg-brand/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            {sector.formCopy.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-fg)] tracking-[-0.02em] leading-tight">
            {sector.formCopy.titleStart}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              {sector.formCopy.titleEnd}
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[color:var(--color-fg-muted)]">
            {sector.formCopy.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="p-[1px] rounded-2xl bg-gradient-to-b from-[color:var(--color-border-strong)] to-[color:var(--color-border)]"
        >
          <div className="bg-[color:var(--color-elevated)] rounded-2xl p-6 md:p-9 shadow-[var(--shadow-md)]">
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-fg)] mb-2">
                  Talebiniz alındı
                </h3>
                <p className="text-[color:var(--color-fg-muted)] max-w-md mx-auto">
                  24 saat içinde size dönüş yapıyoruz. Uygun bulursak {sector.name.toLowerCase()}{" "}
                  için kısa demo görüşmesi planlıyoruz.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                      Adınız Soyadınız
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                      E-posta
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder="ornek@isletme.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                      Telefon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                      İşletme adı
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder={`${sector.name} / Şirket adı`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                      Şehir / Bölge
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder="İstanbul, Antalya, Bursa..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                      Günlük tahmini çağrı
                    </label>
                    <select
                      value={form.callVolume}
                      onChange={(e) => setForm({ ...form, callVolume: e.target.value })}
                      disabled={state === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-fg)] text-sm focus:outline-none focus:border-brand/60 transition-colors disabled:opacity-60"
                    >
                      {callVolumes.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[color:var(--color-fg-muted)] mb-2 block">
                    Eklemek istediğiniz
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                    <textarea
                      rows={3}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      disabled={state === "submitting"}
                      className={`${inputBase} resize-none`}
                      placeholder="Mevcut sisteminiz, en büyük problem, sorularınız..."
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.kvkk}
                    onChange={(e) => setForm({ ...form, kvkk: e.target.checked })}
                    required
                    className="mt-0.5 w-4 h-4 rounded border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] text-brand focus:ring-brand/40"
                  />
                  <span className="text-xs text-[color:var(--color-fg-muted)] leading-relaxed">
                    İletişim formundaki kişisel verilerimin{" "}
                    <a href="/kvkk" className="text-brand-soft hover:underline">
                      KVKK aydınlatma metni
                    </a>{" "}
                    kapsamında işlenmesini kabul ediyorum.
                  </span>
                </label>

                {state === "error" && errorMessage && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-700 dark:text-red-300">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <motion.button
                  whileHover={state === "submitting" ? undefined : { scale: 1.02 }}
                  whileTap={state === "submitting" ? undefined : { scale: 0.98 }}
                  type="submit"
                  disabled={state === "submitting" || !form.kvkk}
                  className="w-full py-4 rounded-xl text-base font-semibold text-white bg-brand hover:bg-brand-deep transition-colors flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_rgb(var(--brand))] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Talep Gönder
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
