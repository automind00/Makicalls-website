"use client";
import React, { useEffect, useRef, useState, memo } from "react";

export type GlowColor = "violet" | "cyan" | "emerald" | "amber";

export interface OrbitSkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
  icon: React.ReactNode;
  accent: string;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

const glowMap: Record<GlowColor, { primary: string; secondary: string; border: string }> = {
  violet: {
    primary: "rgba(139, 92, 246, 0.4)",
    secondary: "rgba(167, 139, 250, 0.18)",
    border: "rgba(167, 139, 250, 0.3)",
  },
  cyan: {
    primary: "rgba(167, 139, 250, 0.35)",
    secondary: "rgba(139, 92, 246, 0.15)",
    border: "rgba(167, 139, 250, 0.25)",
  },
  emerald: {
    primary: "rgba(167, 139, 250, 0.35)",
    secondary: "rgba(139, 92, 246, 0.15)",
    border: "rgba(167, 139, 250, 0.25)",
  },
  amber: {
    primary: "rgba(167, 139, 250, 0.35)",
    secondary: "rgba(139, 92, 246, 0.15)",
    border: "rgba(167, 139, 250, 0.25)",
  },
};

interface SkillItemProps {
  config: OrbitSkillConfig;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
}

const SkillItem = memo(function SkillItem({ config, registerRef }: SkillItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { id, orbitRadius, size, label, icon, accent, phaseShift } = config;

  // Initial position (server-rendered identical to client first paint)
  const initX = Math.round(Math.cos(phaseShift) * orbitRadius * 1000) / 1000;
  const initY = Math.round(Math.sin(phaseShift) * orbitRadius * 1000) / 1000;

  return (
    <div
      ref={(el) => registerRef(id, el)}
      className="absolute top-1/2 left-1/2 transition-[box-shadow,border-color] duration-300 ease-out will-change-transform"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(-50% + ${initX}px), calc(-50% + ${initY}px))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full p-3 bg-[#111111]/90 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isHovered ? "scale-125 shadow-2xl border-white/30" : "shadow-lg"
        }`}
        style={{
          boxShadow: isHovered ? `0 0 30px ${accent}66, 0 0 60px ${accent}33` : undefined,
        }}
      >
        <div className="w-full h-full text-white">{icon}</div>
        {isHovered && (
          <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/95 backdrop-blur-sm rounded-md text-xs text-white whitespace-nowrap pointer-events-none border border-white/10">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});

const GlowingOrbitPath = memo(function GlowingOrbitPath({
  radius,
  glowColor = "violet",
  animationDelay = 0,
}: GlowingOrbitPathProps) {
  const colors = glowMap[glowColor];
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${colors.border}`, boxShadow: `inset 0 0 20px ${colors.secondary}` }}
      />
    </div>
  );
});

interface OrbitingSkillsProps {
  centerIcon: React.ReactNode;
  skills: OrbitSkillConfig[];
  orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }>;
}

export default function OrbitingSkills({ centerIcon, skills, orbitConfigs }: OrbitingSkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemMapRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const [scale, setScale] = React.useState(1);

  const registerRef = React.useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      itemMapRef.current.set(id, el);
    } else {
      itemMapRef.current.delete(id);
    }
  }, []);

  // Responsive scale: shrink orbits on small viewports
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 480) setScale(0.55);
      else if (w < 768) setScale(0.7);
      else setScale(1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Single RAF loop, direct DOM updates (no React re-renders)
  useEffect(() => {
    let rafId: number;
    let startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      if (isVisibleRef.current && !isHoveredRef.current) {
        for (const config of skills) {
          const el = itemMapRef.current.get(config.id);
          if (!el) continue;
          const angle = elapsed * config.speed + config.phaseShift;
          const r = config.orbitRadius * scale;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          el.style.transform = `translate(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px))`;
        }
      } else if (isHoveredRef.current) {
        startTime = now - elapsed * 1000;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [skills, scale]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-[min(86vw,360px)] h-[min(86vw,360px)] md:w-[480px] md:h-[480px] flex items-center justify-center"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Center */}
        <div className="w-24 h-24 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl flex items-center justify-center z-10 relative shadow-2xl border border-white/10">
          <div className="absolute inset-0 rounded-2xl bg-violet-500/30 blur-xl animate-pulse" />
          <div
            className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="relative z-10 text-white">{centerIcon}</div>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius * scale}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {skills.map((config) => (
          <SkillItem key={config.id} config={config} registerRef={registerRef} />
        ))}
      </div>
    </main>
  );
}
