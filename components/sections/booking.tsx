"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Clock,
  Send,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { getDemoPhone } from "@/lib/contact";

type FormState = "idle" | "submitting" | "success" | "error";

const SUBMIT_TIMEOUT_MS = 15_000;

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function formatDateTR(d: Date) {
  return d.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clinic: "",
    notes: "",
  });
  const panelRef = useRef<HTMLDivElement | null>(null);

  // When user picks a day, scroll the booking panel into view.
  useEffect(() => {
    if (selectedDate && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedDate]);

  const handleBookClick = () => {
    if (!selectedDate) {
      // Scroll to calendar / nudge — pick today's first available, or just open panel area
      const today = new Date();
      // Skip weekends
      const day = today.getDay();
      if (day !== 0 && day !== 6) setSelectedDate(today);
      else {
        // jump to next monday
        const next = new Date(today);
        next.setDate(today.getDate() + ((1 + 7 - day) % 7 || 7));
        setSelectedDate(next);
      }
    }
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Lütfen bir tarih ve saat seçin.");
      setState("error");
      return;
    }
    setState("submitting");
    setErrorMessage(null);

    try {
      const dateStr = formatDateTR(selectedDate);

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          clinic: formData.clinic.trim(),
          notes: formData.notes.trim(),
          date: dateStr,
          time: selectedTime,
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
      setFormData({ name: "", email: "", phone: "", clinic: "", notes: "" });
      setSelectedTime(null);
      // Keep selectedDate so the success screen can show what they booked
    } catch (err) {
      console.error("[Booking] submit error:", err);
      const isAbort =
        err instanceof DOMException && err.name === "AbortError";
      const msg = isAbort
        ? "Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edip tekrar deneyin."
        : err instanceof Error
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setErrorMessage(msg);
      setState("error");
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 sm:py-3 min-h-[52px] sm:min-h-[48px] rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-fg)] text-[15px] sm:text-sm placeholder:text-[color:var(--color-fg-muted)] focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20 transition-all disabled:opacity-60";

  return (
    <section
      id="randevu"
      className="relative py-24 md:py-32 bg-[color:var(--color-page)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-4 block">
            Demo Görüşmesi
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-fg)] mb-4 tracking-tight">
            Takvimden{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--color-fg)] via-brand-soft to-brand">
              uygun bir saat seçin
            </span>
          </h2>
          <p className="text-[color:var(--color-fg-muted)] max-w-xl mx-auto">
            30 dakika içinde Makicalls&apos;ı kliniğinizin ihtiyaçlarına göre konuşalım.
          </p>
        </motion.div>

        {/* Telefon bandı — env'de NEXT_PUBLIC_DEMO_PHONE varsa görünür */}
        {(() => {
          const demoPhone = getDemoPhone();
          if (!demoPhone) return null;
          return (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              href={`tel:${demoPhone.tel}`}
              className="flex items-center justify-center gap-3 mb-6 px-5 py-3.5 rounded-2xl bg-brand/5 border border-brand/25 hover:bg-brand/10 hover:border-brand/45 transition-colors text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-brand-soft" />
              <span className="text-[color:var(--color-fg-muted)]">
                Hemen konuşmak istiyorsan ara:
              </span>
              <span className="font-semibold text-[color:var(--color-fg)] tabular-nums">
                {demoPhone.display}
              </span>
            </motion.a>
          );
        })()}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setState("idle");
              setErrorMessage(null);
            }}
            onBookClick={handleBookClick}
          />
        </motion.div>

        {/* Booking detail panel — appears once a date is picked */}
        <div ref={panelRef}>
          <AnimatePresence mode="wait">
            {selectedDate && (
              <motion.div
                key="booking-panel"
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 p-[1px] rounded-3xl bg-gradient-to-b from-[color:var(--color-border-strong)] to-[color:var(--color-border)]">
                  <div className="bg-[color:var(--color-elevated)] rounded-3xl p-5 sm:p-6 md:p-10 shadow-[var(--shadow-md)]">
                    {state === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-[color:var(--color-fg)] mb-2">
                          Randevu Talebiniz Alındı
                        </h3>
                        <p className="text-[color:var(--color-fg-muted)] mb-4">
                          {selectedDate && (
                            <>
                              <span className="text-[color:var(--color-fg)] font-medium capitalize">
                                {formatDateTR(selectedDate)}
                              </span>
                              <br />
                            </>
                          )}
                          tarihindeki randevunuz için en kısa sürede sizinle iletişime geçeceğiz.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setState("idle");
                            setSelectedDate(null);
                          }}
                          className="text-sm text-brand-soft hover:text-brand-deep underline-offset-4 hover:underline"
                        >
                          Yeni randevu oluştur
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs uppercase tracking-[0.2em] text-brand-soft">
                            Seçilen Tarih
                          </span>
                          <span className="text-base md:text-lg font-semibold text-[color:var(--color-fg)] capitalize">
                            {formatDateTR(selectedDate)}
                          </span>
                        </div>

                        {/* Time slot picker */}
                        <div>
                          <label className="text-sm text-[color:var(--color-fg-muted)] mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Uygun saati seçin
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {TIME_SLOTS.map((slot) => (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`min-h-[48px] sm:min-h-[44px] py-2 rounded-xl text-[15px] sm:text-sm font-semibold border transition-all ${
                                  selectedTime === slot
                                    ? "bg-brand border-brand text-white shadow-[var(--shadow-glow)] scale-[1.02]"
                                    : "bg-[color:var(--color-surface)] border-[color:var(--color-border)] text-[color:var(--color-fg-secondary)] active:border-brand/40 hover:border-brand/40 hover:text-white"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="b-name" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                              Adınız Soyadınız
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                              <input
                                id="b-name"
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
                            <label htmlFor="b-phone" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                              Telefon
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                              <input
                                id="b-phone"
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={state === "submitting"}
                                className={inputBase}
                                placeholder="05XX XXX XX XX"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="b-email" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                              E-posta
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                              <input
                                id="b-email"
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
                          <div>
                            <label htmlFor="b-clinic" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                              Klinik / İşletme
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                              <input
                                id="b-clinic"
                                value={formData.clinic}
                                onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                                disabled={state === "submitting"}
                                className={inputBase}
                                placeholder="İşletme adınız"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="b-notes" className="text-sm text-[color:var(--color-fg-muted)] mb-2 block">
                            Notunuz (opsiyonel)
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[color:var(--color-fg-muted)]" />
                            <textarea
                              id="b-notes"
                              rows={3}
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              disabled={state === "submitting"}
                              className={`${inputBase} resize-none`}
                              placeholder="Görüşmede konuşmak istediğiniz bir konu var mı?"
                            />
                          </div>
                        </div>

                        {state === "error" && errorMessage && (
                          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-700 dark:text-red-300">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{errorMessage}</span>
                          </div>
                        )}

                        <motion.button
                          whileHover={state === "submitting" ? undefined : { scale: 1.01 }}
                          whileTap={state === "submitting" ? undefined : { scale: 0.98 }}
                          type="submit"
                          disabled={state === "submitting" || !selectedTime}
                          className="w-full min-h-[56px] py-4 rounded-2xl text-base sm:text-base font-semibold text-white bg-gradient-to-br from-brand-soft via-brand to-brand-deep active:from-brand-deep transition-colors duration-200 flex items-center justify-center gap-2 shadow-[0_12px_40px_-10px_rgb(var(--brand)),inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-inset ring-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {state === "submitting" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" /> Randevuyu Onayla
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
