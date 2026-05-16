"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ size = "md" }: { size?: "sm" | "md" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const active = mounted ? resolvedTheme || theme : "light";
  const isDark = active === "dark";

  const dim = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const icon = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <button
      type="button"
      aria-label={isDark ? "Aydınlık temaya geç" : "Karanlık temaya geç"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`${dim} relative rounded-full flex items-center justify-center bg-[rgb(var(--bg-surface))] border border-[color:var(--color-border)] text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-brand-soft)] hover:border-[color:var(--color-brand-soft)]/40 transition-colors`}
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Moon className={icon} /> : <Sun className={icon} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
