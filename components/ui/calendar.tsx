"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const dayNames = ["PZR", "PZT", "SAL", "ÇAR", "PER", "CUM", "CMT"];

const CalendarDay: React.FC<{
  day: number | string;
  isHeader?: boolean;
  isAvailable?: boolean;
  isToday?: boolean;
}> = ({ day, isHeader, isAvailable, isToday }) => {
  const base =
    "col-span-1 row-span-1 flex h-8 w-8 items-center justify-center";

  let stateClass = "text-[color:var(--color-fg-muted)]";
  if (!isHeader) {
    if (isAvailable) stateClass = "bg-brand text-white shadow-[var(--shadow-glow)]";
    else if (isToday)
      stateClass = "border border-brand/60 text-[color:var(--color-fg)]";
  }

  return (
    <div
      className={`${base} ${isHeader ? "" : "rounded-xl transition-colors"} ${stateClass}`}
    >
      <span className={`font-medium ${isHeader ? "text-[10px] tracking-wider" : "text-sm"}`}>
        {day}
      </span>
    </div>
  );
};

export function Calendar() {
  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString("tr-TR", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const todayDate = currentDate.getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const bookingLink = "https://calendly.com/ekremhndolu/30min";

  // Hydration-safe: highlights only render after mount, so SSR/CSR match.
  const [availableDays, setAvailableDays] = useState<Set<number>>(new Set());
  useEffect(() => {
    const slots = new Set<number>();
    for (let d = todayDate; d <= daysInMonth; d++) {
      const weekday = new Date(currentYear, currentDate.getMonth(), d).getDay();
      if (weekday !== 0 && weekday !== 6 && (d + todayDate) % 3 === 0) {
        slots.add(d);
      }
    }
    setAvailableDays(slots);
  }, [todayDate, daysInMonth, currentYear, currentDate]);

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array.from({ length: firstDayOfWeek }).map((_, i) => (
        <div
          key={`empty-start-${i}`}
          className="col-span-1 row-span-1 h-8 w-8"
        />
      )),
      ...Array.from({ length: daysInMonth }).map((_, i) => {
        const d = i + 1;
        return (
          <CalendarDay
            key={`date-${d}`}
            day={d}
            isAvailable={availableDays.has(d)}
            isToday={d === todayDate}
          />
        );
      }),
    ];

    return days;
  };

  return (
    <BentoCard linkTo={bookingLink}>
      <div className="grid h-full gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-soft mb-3 block">
            Randevu
          </span>
          <h2 className="mb-3 text-2xl md:text-3xl font-bold text-[color:var(--color-fg)] tracking-tight">
            Makicalls&apos;ı 30 dakikada tanıyın
          </h2>
          <p className="mb-5 text-sm md:text-base text-[color:var(--color-fg-muted)] max-w-md">
            Kliniğinize özel demo arama dinleyin, AI çağrı asistanını gerçek zamanlı test edelim. Uzun sözleşme yok, ön ödeme yok.
          </p>
          <Button className="rounded-2xl bg-brand hover:bg-brand-deep text-white">
            Şimdi Randevu Al
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="transition-all duration-500 ease-out md:group-hover:-translate-y-1">
          <div className="w-full md:w-[420px] rounded-[24px] border border-[color:var(--color-border-strong)] p-2 transition-colors duration-300 group-hover:border-brand/60 bg-[color:var(--color-surface)]">
            <div
              className="rounded-2xl border border-[color:var(--color-border)] p-4 bg-[color:var(--color-elevated)]"
              style={{ boxShadow: "0px 2px 1.5px 0px rgb(255 255 255 / 0.04) inset" }}
            >
              <div className="flex items-center space-x-2">
                <p className="text-sm text-[color:var(--color-fg)]">
                  <span className="font-medium capitalize">
                    {currentMonthName}, {currentYear}
                  </span>
                </p>
                <span className="h-1 w-1 rounded-full bg-[color:var(--color-fg-muted)]">&nbsp;</span>
                <p className="text-xs text-[color:var(--color-fg-muted)]">30 dk görüşme</p>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {renderCalendarDays()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
  showHoverGradient?: boolean;
  hideOverflow?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 md:p-8 hover:border-brand/40 transition-colors ${
        hideOverflow ? "overflow-hidden" : ""
      } ${height} ${className}`}
    >
      {linkTo && (
        <div className="absolute bottom-6 right-6 z-30 flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-brand opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <ArrowUpRight className="h-6 w-6 text-white" />
        </div>
      )}
      {showHoverGradient && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tl from-brand/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith("/") ? (
      <Link href={linkTo} className="block">
        {cardContent}
      </Link>
    ) : (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
