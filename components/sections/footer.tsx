"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

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

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Çözümler",
    links: [
      { label: "AI Sesli Asistan", href: "/#hizmetler" },
      { label: "WhatsApp & Instagram Chatbot", href: "/#hizmetler" },
      { label: "Google Yorum Otomasyonu", href: "/#google-yorum" },
      { label: "Özel Otomasyon", href: "/#hizmetler" },
      { label: "Süreç", href: "/#surec" },
      { label: "SSS", href: "/#sss" },
    ],
  },
  {
    title: "Sektörler",
    links: [
      { label: "Diş Klinikleri", href: "/dis-klinikleri" },
      { label: "Saç Ekimi", href: "/#sektorler" },
      { label: "Estetik Klinikler", href: "/#sektorler" },
      { label: "Sağlık Turizmi", href: "/#sektorler" },
      { label: "Araç Kiralama", href: "/#sektorler" },
      { label: "E-ticaret", href: "/#sektorler" },
      { label: "Gayrimenkul", href: "/#sektorler" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "İletişim", href: "/#iletisim" },
      { label: "Randevu Al", href: "/#randevu" },
      { label: "KVKK Aydınlatma", href: "/kvkk" },
      { label: "Gizlilik Politikası", href: "/gizlilik" },
      { label: "Kullanım Şartları", href: "/sartlar" },
    ],
  },
];

const socials: { icon: React.ReactNode; label: string; href?: string }[] = [
  { icon: <InstagramIcon className="w-4 h-4" />, label: "Instagram", href: "https://www.instagram.com/makicalls/" },
  { icon: <LinkedinIcon className="w-4 h-4" />, label: "LinkedIn" },
  { icon: <Mail className="w-4 h-4" />, label: "E-posta" },
  { icon: <Phone className="w-4 h-4" />, label: "Telefon" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[color:var(--color-surface)] border-t border-[color:var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + tagline + contact */}
          <div className="col-span-2 md:col-span-4">
            <div className="font-bold text-2xl tracking-[-0.02em] text-[color:var(--color-fg)] mb-3">
              Maki<span className="text-brand">Calls</span>
            </div>
            <p className="text-sm text-[color:var(--color-fg-muted)] leading-relaxed mb-6 max-w-xs">
              Türkiye’nin AI çağrı merkezi ve Türkçe sesli asistan platformu. Telefonu cevaplayan yapay zeka, müşteriyi kaçırmayan otomasyon.
            </p>

            <ul className="space-y-2.5 text-sm text-[color:var(--color-fg-secondary)]">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-soft flex-shrink-0" />
                <a href="mailto:info@makicalls.com" className="hover:text-[color:var(--color-fg)] transition-colors">
                  info@makicalls.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-soft flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>

            <div className="flex items-center gap-2.5 mt-6">
              {socials.map((s) => (
                <div key={s.label} className="group relative">
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] flex items-center justify-center text-[color:var(--color-fg-secondary)] hover:text-brand-soft hover:border-brand-soft/40 hover:bg-brand/10 transition-colors"
                    >
                      {s.icon}
                    </a>
                  ) : (
                    <button
                      type="button"
                      aria-label={`${s.label} — yakında`}
                      aria-disabled="true"
                      className="w-9 h-9 rounded-full bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] flex items-center justify-center text-[color:var(--color-fg-muted)] opacity-50 cursor-not-allowed"
                    >
                      {s.icon}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2 lg:col-span-2 md:col-start-auto col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA card */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] mb-4">
              Randevu
            </h4>
            <Link
              href="/#randevu"
              className="block rounded-xl border border-brand/40 bg-brand/5 p-4 hover:bg-brand/10 hover:border-brand/60 transition-colors"
            >
              <div className="text-sm font-semibold text-[color:var(--color-fg)] mb-1">
                15 dakikada planlayalım
              </div>
              <div className="text-xs text-[color:var(--color-fg-muted)] leading-relaxed">
                İşletmenize özel AI'yı kısa görüşmede dinleyin.
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[color:var(--color-border)] flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-[color:var(--color-fg-muted)]">
            © {new Date().getFullYear()} MakiCalls. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-[color:var(--color-fg-muted)]">
            İstanbul’da tasarlandı · Türkçe konuşan AI
          </p>
        </div>
      </div>
    </footer>
  );
}
