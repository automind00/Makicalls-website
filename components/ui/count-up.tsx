"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/** Scroll'da görünür olunca 0 → `to` sayar. Ondalık, prefix ve suffix destekler. */
export function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1.5, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("tr-TR");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
