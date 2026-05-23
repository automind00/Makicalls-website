"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const WA_NUMBER = "905514905701";
const GREETING =
  "Merhaba! 👋 Ben MakiCalls'ın AI asistanıyım. Sesli asistan, WhatsApp/Instagram chatbot, Google yorum sistemi veya demo hakkında ne sormak istersiniz?";
const QUICK = [
  "Nasıl çalışıyor?",
  "Google yorum sistemi nedir?",
  "Kliniğim için demo istiyorum",
  "Hangi sektörlere uygun?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Bağlantı hatası. Lütfen WhatsApp'tan yazın: 0551 490 57 01.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher — WhatsApp butonunun üstünde */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Sohbeti kapat" : "AI asistanla sohbet et"}
        className="group fixed bottom-[5.5rem] right-5 sm:bottom-[6.25rem] sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_30px_-6px_rgb(var(--brand)/0.7)] transition-transform duration-300 hover:scale-110"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand opacity-40 animate-ping" />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[10rem] right-4 sm:bottom-[11rem] sm:right-6 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-elevated)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            style={{ height: "min(70vh, 560px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)] bg-gradient-to-r from-brand/15 to-transparent">
              <div className="relative w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white flex-shrink-0">
                <Sparkles className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[color:var(--color-elevated)]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[color:var(--color-fg)]">MakiCalls AI</div>
                <div className="text-[11px] text-emerald-400">Çevrimiçi · genelde hemen yanıtlar</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-brand text-white rounded-br-sm"
                        : "bg-[color:var(--color-surface)] text-[color:var(--color-fg-secondary)] border border-[color:var(--color-border)] rounded-bl-sm"
                    }`}
                  >
                    {m.content || (busy ? <TypingDots /> : "")}
                  </div>
                </div>
              ))}

              {messages.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="text-[12px] px-3 py-1.5 rounded-full border border-brand/30 text-[color:var(--color-fg-secondary)] hover:bg-brand/10 hover:border-brand/50 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-[color:var(--color-border)] p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={busy}
                  placeholder="Sorunuzu yazın…"
                  className="flex-1 px-3.5 py-2.5 rounded-full bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-muted)] focus:outline-none focus:border-brand/60 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Gönder"
                  className="w-10 h-10 flex-shrink-0 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-[11px] text-[color:var(--color-fg-muted)] hover:text-brand-soft transition-colors"
              >
                veya WhatsApp&apos;tan canlı konuşun →
              </a>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-fg-muted)] animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
