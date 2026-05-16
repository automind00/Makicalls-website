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
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type FormState = "idle" | "submitting" | "success" | "error";

const callVolumes = [
  "1–10 çağrı/gün",
  "10–25 çağrı/gün",
  "25–50 çağrı/gün",
  "50–100 çağrı/gün",
  "100+ çağrı/gün",
];

export default function PilotForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    clinic: "",
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

    const composedMessage = [
      `[Kaynak: dental_landing]`,
      `Telefon: ${form.phone.trim() || "-"}`,
      `Semt/İlçe: ${form.district.trim() || "-"}`,
      `Günlük çağrı hacmi: ${form.callVolume}`,
      ``,
      form.note.trim() || "(ek not yok)",
    ].join("\n");

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.clinic.trim() || null,
        message: composedMessage,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });
      if (error) throw error;

      setState("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        clinic: "",
        district: "",
        callVolume: callVolumes[1],
        note: "",
        kvkk: false,
      });
      setTimeout(() => setState("idle"), 8000);
    } catch (err) {
      console.error("[PilotForm] submit error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
      setState("error");
    }
  };

  return (
    <section id="pilot-basvuru" className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[700px] bg-[#8b5cf6]/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#a78bfa] mb-3 block">
            Pilot başvuru formu
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] leading-tight">
            İlk 3 klinikten biri{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e9d5ff] to-[#a78bfa]">
              sizin olsun
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Formu doldurun, 24 saat içinde dönüş yapıyoruz. Uygun bulursak kısa demo görüşmesi kuruyoruz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="p-[1px] rounded-2xl bg-gradient-to-b from-white/15 to-white/5"
        >
          <div className="bg-[#111111] rounded-2xl p-6 md:p-9">
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Başvurunuz alındı</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  24 saat içinde size dönüş yapıyoruz. İncelememiz olumlu olursa kısa demo görüşmesi
                  için takvim göndereceğiz.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Adınız Soyadınız</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={state === "submitting"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 transition-colors disabled:opacity-60"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">E-posta</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={state === "submitting"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 transition-colors disabled:opacity-60"
                        placeholder="ornek@klinik.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Telefon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={state === "submitting"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 transition-colors disabled:opacity-60"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Klinik adı</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        required
                        value={form.clinic}
                        onChange={(e) => setForm({ ...form, clinic: e.target.value })}
                        disabled={state === "submitting"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 transition-colors disabled:opacity-60"
                        placeholder="Klinik / Şirket adı"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Semt / İlçe</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                        disabled={state === "submitting"}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 transition-colors disabled:opacity-60"
                        placeholder="Örn. Kadıköy, Şişli"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">Günlük tahmini çağrı</label>
                    <select
                      value={form.callVolume}
                      onChange={(e) => setForm({ ...form, callVolume: e.target.value })}
                      disabled={state === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8b5cf6]/60 transition-colors disabled:opacity-60"
                    >
                      {callVolumes.map((v) => (
                        <option key={v} value={v} className="bg-[#111111]">
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-2 block">Eklemek istediğiniz</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <textarea
                      rows={3}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      disabled={state === "submitting"}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 transition-colors resize-none disabled:opacity-60"
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
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-[#8b5cf6] focus:ring-[#8b5cf6]/40"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    İletişim formundaki kişisel verilerimin{" "}
                    <a href="/kvkk" className="text-[#a78bfa] hover:underline">
                      KVKK aydınlatma metni
                    </a>{" "}
                    kapsamında işlenmesini kabul ediyorum.
                  </span>
                </label>

                {state === "error" && errorMessage && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <motion.button
                  whileHover={state === "submitting" ? undefined : { scale: 1.02 }}
                  whileTap={state === "submitting" ? undefined : { scale: 0.98 }}
                  type="submit"
                  disabled={state === "submitting" || !form.kvkk}
                  className="w-full py-4 rounded-xl text-base font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_#8b5cf6] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Pilot programa başvur
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
