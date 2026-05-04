"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  // Tüm hesaplar/email/phone "Yakında" — placeholder olarak disabled tooltip
  const socials: { icon: React.ReactNode; label: string }[] = [
    { icon: <InstagramIcon className="w-4 h-4" />, label: "Instagram" },
    { icon: <LinkedinIcon className="w-4 h-4" />, label: "LinkedIn" },
    { icon: <Mail className="w-4 h-4" />, label: "E-posta" },
    { icon: <Phone className="w-4 h-4" />, label: "Telefon" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Wordmark */}
          <div className="text-white font-bold text-xl tracking-[-0.02em]">
            Maki<span className="text-[#a78bfa]">Calls</span>
          </div>

          {/* Social Links — disabled, "Yakında" hover */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <div
                key={s.label}
                className="group relative"
              >
                <button
                  type="button"
                  aria-label={`${s.label} — yakında`}
                  aria-disabled="true"
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-600 cursor-not-allowed transition-colors"
                >
                  {s.icon}
                </button>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/95 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {s.label} · Yakında
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MakiCalls. Tüm hakları saklıdır.
          </p>

          <nav className="flex items-center gap-x-5 gap-y-2 flex-wrap justify-center">
            <Link
              href="/kvkk"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              KVKK Aydınlatma
            </Link>
            <Link
              href="/gizlilik"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/sartlar"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Kullanım Şartları
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
