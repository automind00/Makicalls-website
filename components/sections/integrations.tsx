"use client";
import React from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";

type Integration = { name: string; domain: string };

const rowOne: Integration[] = [
  { name: "WhatsApp Business", domain: "whatsapp.com" },
  { name: "Instagram", domain: "instagram.com" },
  { name: "Telegram", domain: "telegram.org" },
  { name: "Google Calendar", domain: "calendar.google.com" },
  { name: "Google Ads", domain: "ads.google.com" },
  { name: "Zapier", domain: "zapier.com" },
  { name: "Make", domain: "make.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Pipedrive", domain: "pipedrive.com" },
  { name: "NetGSM", domain: "netgsm.com.tr" },
];

const rowTwo: Integration[] = [
  { name: "Zoho CRM", domain: "zoho.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Airtable", domain: "airtable.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "Calendly", domain: "calendly.com" },
  { name: "Twilio", domain: "twilio.com" },
  { name: "TikTok", domain: "tiktok.com" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "n8n", domain: "n8n.io" },
  { name: "Supabase", domain: "supabase.com" },
];

function Pill({ item }: { item: Integration }) {
  return (
    <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] hover:border-brand-soft/40 transition-colors whitespace-nowrap">
      <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
          alt={`${item.name} logosu`}
          width={16}
          height={16}
          loading="lazy"
          className="w-4 h-4 object-contain"
        />
      </span>
      <span className="text-xs sm:text-sm text-[color:var(--color-fg-secondary)] font-medium">
        {item.name}
      </span>
    </div>
  );
}

export default function Integrations() {
  return (
    <section className="relative py-12 md:py-16 bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-brand/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 px-5"
        >
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-brand-soft">
            Entegrasyonlar
          </span>
          <h3 className="text-sm sm:text-base text-[color:var(--color-fg-muted)] mt-2">
            En iyi teknolojilerle güçlendirildi.{" "}
            <span className="text-[color:var(--color-fg)] font-medium">Her şeyle entegre olur.</span>
          </h3>
        </motion.div>

        <div className="relative">
          <Marquee pauseOnHover className="[--duration:38s] [--gap:0.75rem]">
            {rowOne.map((item) => (
              <Pill key={item.name} item={item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:44s] [--gap:0.75rem] mt-3">
            {rowTwo.map((item) => (
              <Pill key={item.name} item={item} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[color:var(--color-surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[color:var(--color-surface)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
