"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Fare hareketiyle 3D tilt + holografik parlama efekti veren kart sarmalayıcı.
 * --x/--y imleç konumunu, --bg-x/--bg-y gradyan konumunu takip eder.
 */
export function HolographicCard({ className, children }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 18;
    const rotateY = (rect.width / 2 - x) / 18;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
    card.style.setProperty("--bg-x", "50%");
    card.style.setProperty("--bg-y", "50%");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--x": "50%",
          "--y": "50%",
          "--bg-x": "50%",
          "--bg-y": "50%",
        } as React.CSSProperties
      }
      className={cn(
        "relative overflow-hidden transition-transform duration-150 ease-out will-change-transform",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-color-dodge [background-image:linear-gradient(115deg,transparent_20%,rgba(168,132,255,0.35)_36%,rgba(255,255,255,0.45)_45%,rgba(132,220,255,0.35)_54%,transparent_70%)] [background-size:250%_250%] [background-position:var(--bg-x)_var(--bg-y)]" />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
