"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type State = "idle" | "submitting" | "sent" | "error";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/admin`;

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: redirectTo,
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setState("sent");
    } catch (err) {
      console.error("[AdminLogin] error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Giriş bağlantısı gönderilemedi. Lütfen tekrar deneyin.",
      );
      setState("error");
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5 py-16 relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana sayfa
        </Link>

        <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/15 to-white/5">
          <div className="bg-[#111111] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#a78bfa]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Paneli</h1>
                <p className="text-xs text-slate-500">MakiCalls — yetkili giriş</p>
              </div>
            </div>

            {state === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Bağlantı gönderildi</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  <span className="text-white font-medium">{email}</span> adresine giriş
                  bağlantısı gönderildi. Mailinizi açın ve linke tıklayın.
                </p>
                <p className="text-xs text-slate-600 mt-4">
                  Bağlantı 1 saat geçerlidir. Spam klasörünü kontrol etmeyi unutmayın.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="al-email" className="text-sm text-slate-400 mb-2 block">
                    E-posta
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="al-email"
                      required
                      type="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === "submitting"}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#8b5cf6]/60 focus:ring-1 focus:ring-[#8b5cf6]/30 transition-all disabled:opacity-60"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                {state === "error" && errorMessage && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition-colors duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_#8b5cf6] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    "Giriş bağlantısı gönder"
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center pt-2">
                  Yalnızca yetkili e-posta adresleri admin paneline erişebilir.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
