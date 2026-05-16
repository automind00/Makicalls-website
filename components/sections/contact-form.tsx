"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Building2, MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim() || null,
        message: formData.message.trim(),
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      });

      if (error) throw error;

      setState("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setState("idle"), 6000);
    } catch (err) {
      console.error("[ContactForm] submit error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
      setState("error");
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-fg)] text-sm placeholder:text-[color:var(--color-fg-muted)] focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/30 transition-all disabled:opacity-60";

  return (
    <section id="iletisim" className="relative py-24 md:py-32 bg-[color:var(--color-page)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[128px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-strong)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-4 block">
            İletişim
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] mb-4">
            Dijital Dönüşüme{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              Başlayın
            </span>
          </h2>
          <p className="text-[color:var(--color-fg-muted)] max-w-lg mx-auto">
            Formu doldurun, size en kısa sürede özel bir teklif sunalım.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-[1px] rounded-2xl bg-gradient-to-b from-[color:var(--color-border-strong)] to-[color:var(--color-border)]"
        >
          <div className="bg-[color:var(--color-elevated)] rounded-2xl p-6 md:p-10 shadow-[var(--shadow-md)]">
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-[color:var(--color-fg)] mb-2">Teşekkürler!</h3>
                <p className="text-[color:var(--color-fg-muted)]">
                  Mesajınız iletildi. En kısa sürede size dönüş yapacağız.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-name" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                      Adınız Soyadınız
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        id="cf-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                      E-posta
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                      <input
                        id="cf-email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={state === "submitting"}
                        className={inputBase}
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-company" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                    İşletme Adı
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                    <input
                      id="cf-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={state === "submitting"}
                      className={inputBase}
                      placeholder="İşletme adınız"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-message" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                    Mesajınız
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                    <textarea
                      id="cf-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={state === "submitting"}
                      className={`${inputBase} resize-none`}
                      placeholder="Hangi hizmeti almak istiyorsunuz?"
                    />
                  </div>
                </div>

                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  aria-hidden="true"
                />

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
                  disabled={state === "submitting"}
                  className="w-full py-4 rounded-xl text-base font-semibold text-white bg-brand hover:bg-brand-deep transition-colors duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_rgb(var(--brand))] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Teklif Al
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
