"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const dayNames = ["PZR", "PZT", "SAL", "ÇAR", "PER", "CUM", "CMT"];

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onBookClick: () => void;
}

interface CalendarDayCellProps {
  day: number | string;
  isHeader?: boolean;
  isAvailable?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  isHeader,
  isAvailable,
  isToday,
  isSelected,
  isDisabled,
  onClick,
}) => {
  const base =
    "col-span-1 row-span-1 flex h-8 w-8 items-center justify-center";

  let stateClass = "text-[color:var(--color-fg-muted)]";
  if (!isHeader) {
    if (isSelected)
      stateClass =
        "bg-brand text-white shadow-[var(--shadow-glow)] scale-110";
    else if (isAvailable)
      stateClass =
        "bg-brand/15 text-white hover:bg-brand hover:scale-110 cursor-pointer";
    else if (isToday)
      stateClass =
        "border border-brand/60 text-[color:var(--color-fg)] hover:bg-brand/30 cursor-pointer";
    else if (!isDisabled)
      stateClass =
        "text-[color:var(--color-fg-muted)] hover:text-white hover:bg-white/5 cursor-pointer";
    else stateClass = "text-[color:var(--color-fg-muted)]/40";
  }

  const content = (
    <span className={`font-medium ${isHeader ? "text-[10px] tracking-wider" : "text-sm"}`}>
      {day}
    </span>
  );

  if (isHeader || isDisabled || !onClick) {
    return (
      <div className={`${base} ${isHeader ? "" : "rounded-xl"} ${stateClass}`}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`${base} rounded-xl transition-all duration-200 ${stateClass}`}
    >
      {content}
    </button>
  );
};

export function Calendar({ selectedDate, onSelectDate, onBookClick }: CalendarProps) {
  const [viewDate, setViewDate] = useState<Date | null>(null);

  // Initialize to current month after mount (hydration safe)
  useEffect(() => {
    setViewDate(new Date());
  }, []);

  const computed = useMemo(() => {
    const d = viewDate ?? new Date();
    return {
      monthName: d.toLocaleString("tr-TR", { month: "long" }),
      year: d.getFullYear(),
      month: d.getMonth(),
      todayDate: new Date().getDate(),
      todayMonth: new Date().getMonth(),
      todayYear: new Date().getFullYear(),
      firstDayOfWeek: new Date(d.getFullYear(), d.getMonth(), 1).getDay(),
      daysInMonth: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
    };
  }, [viewDate]);

  // Highlight a deterministic subset of upcoming weekdays as "available"
  const [availableDays, setAvailableDays] = useState<Set<number>>(new Set());
  useEffect(() => {
    if (!viewDate) return;
    const slots = new Set<number>();
    const startDay =
      computed.month === computed.todayMonth && computed.year === computed.todayYear
        ? computed.todayDate
        : 1;
    for (let d = startDay; d <= computed.daysInMonth; d++) {
      const weekday = new Date(computed.year, computed.month, d).getDay();
      if (weekday !== 0 && weekday !== 6 && (d + computed.todayDate) % 3 === 0) {
        slots.add(d);
      }
    }
    setAvailableDays(slots);
  }, [viewDate, computed]);

  const isPastDay = (d: number) => {
    if (computed.year < computed.todayYear) return true;
    if (computed.year === computed.todayYear && computed.month < computed.todayMonth) return true;
    if (
      computed.year === computed.todayYear &&
      computed.month === computed.todayMonth &&
      d < computed.todayDate
    )
      return true;
    return false;
  };

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDayCell key={`header-${day}`} day={day} isHeader />
      )),
      ...Array.from({ length: computed.firstDayOfWeek }).map((_, i) => (
        <div
          key={`empty-start-${i}`}
          className="col-span-1 row-span-1 h-8 w-8"
        />
      )),
      ...Array.from({ length: computed.daysInMonth }).map((_, i) => {
        const d = i + 1;
        const disabled = isPastDay(d);
        const weekday = new Date(computed.year, computed.month, d).getDay();
        const isWeekend = weekday === 0 || weekday === 6;
        const clickable = !disabled && !isWeekend;
        const isSel =
          selectedDate &&
          selectedDate.getDate() === d &&
          selectedDate.getMonth() === computed.month &&
          selectedDate.getFullYear() === computed.year;
        const isTodayCell =
          d === computed.todayDate &&
          computed.month === computed.todayMonth &&
          computed.year === computed.todayYear;
        return (
          <CalendarDayCell
            key={`date-${d}`}
            day={d}
            isAvailable={availableDays.has(d)}
            isToday={isTodayCell}
            isSelected={!!isSel}
            isDisabled={disabled || isWeekend}
            onClick={
              clickable
                ? () => onSelectDate(new Date(computed.year, computed.month, d))
                : undefined
            }
          />
        );
      }),
    ];

    return days;
  };

  return (
    <div className="group relative flex flex-col rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 md:p-8 hover:border-brand/40 transition-colors overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tl from-brand/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      <div className="relative z-10 grid h-full gap-6 md:grid-cols-[1fr_auto] md:items-center">
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
          <Button
            type="button"
            onClick={onBookClick}
            className="rounded-2xl bg-brand hover:bg-brand-deep text-white"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {selectedDate
              ? "Bilgileri Gir"
              : "Şimdi Randevu Al"}
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
                    {computed.monthName}, {computed.year}
                  </span>
                </p>
                <span className="h-1 w-1 rounded-full bg-[color:var(--color-fg-muted)]">&nbsp;</span>
                <p className="text-xs text-[color:var(--color-fg-muted)]">30 dk görüşme</p>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {renderCalendarDays()}
              </div>
              <p className="mt-4 text-[10px] text-[color:var(--color-fg-muted)] text-center">
                Bir gün seçin · Hafta içi randevu mümkün
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
