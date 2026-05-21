"use client";
import React from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";

type Integration = { name: string; slug?: string };

// slug = simpleicons.org slug. slug yoksa yalnızca yazı gösterilir (niş markalar).
const rowOne: Integration[] = [
  { name: "WhatsApp Business", slug: "whatsapp" },
  { name: "Instagram", slug: "instagram" },
  { name: "Telegram", slug: "telegram" },
  { name: "Google Calendar", slug: "googlecalendar" },
  { name: "Google Ads", slug: "googleads" },
  { name: "Zapier", slug: "zapier" },
  { name: "Make", slug: "make" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "Pipedrive", slug: "pipedrive" },
  { name: "NetGSM" },
];

const rowTwo: Integration[] = [
  { name: "Zoho CRM", slug: "zoho" },
  { name: "Notion", slug: "notion" },
  { name: "Airtable", slug: "airtable" },
  { name: "Slack", slug: "slack" },
  { name: "Stripe", slug: "stripe" },
  { name: "Calendly", slug: "calendly" },
  { name: "Twilio", slug: "twilio" },
  { name: "TikTok", slug: "tiktok" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "n8n", slug: "n8n" },
  { name: "Supabase", slug: "supabase" },
];

function Pill({ item }: { item: Integration }) {
  return (
    <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[color:var(--color-elevated)] border border-[color:var(--color-border)] hover:border-brand-soft/40 transition-colors whitespace-nowrap">
      {item.slug && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${item.slug}/e2e8f0`}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          className="w-[18px] h-[18px] opacity-80"
        />
      )}
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

        {/* Akan iki sıra */}
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

          {/* Kenar fade'leri */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[color:var(--color-surface)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[color:var(--color-surface)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
