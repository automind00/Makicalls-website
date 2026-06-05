import {
  Clock,
  PhoneOff,
  Inbox,
  UserMinus,
  Globe,
  DollarSign,
  AlertTriangle,
  Languages,
  Star,
  Calendar,
  FileWarning,
  Truck,
  TrendingDown,
  Camera,
  MessageSquareWarning,
  MapPin,
  Stethoscope,
  Scissors,
  Sparkles,
  Plane,
  Hotel,
  Car,
  ShoppingBag,
  Building2,
  type LucideIcon,
} from "lucide-react";
import type { PainIconKey, ShowcaseIconKey } from "@/lib/sectors";

export const PAIN_ICONS: Record<PainIconKey, LucideIcon> = {
  Clock,
  PhoneOff,
  Inbox,
  UserMinus,
  Globe,
  DollarSign,
  AlertTriangle,
  Languages,
  Star,
  Calendar,
  FileWarning,
  Truck,
  TrendingDown,
  Camera,
  MessageSquareWarning,
  MapPin,
};

export const SHOWCASE_ICONS: Record<ShowcaseIconKey, LucideIcon> = {
  Stethoscope,
  Scissors,
  Sparkles,
  Plane,
  Hotel,
  Car,
  ShoppingBag,
  Building2,
};

export type AccentTheme = {
  text: string;
  bg: string;
  border: string;
  hoverBorder: string;
  gradient: string;
  shadow: string;
};

export const ACCENT_THEMES: Record<string, AccentTheme> = {
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    hoverBorder: "hover:border-violet-400/60",
    gradient: "from-violet-500 via-violet-400 to-fuchsia-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(139_92_246/0.6)]",
  },
  rose: {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    hoverBorder: "hover:border-rose-400/60",
    gradient: "from-rose-500 via-pink-400 to-rose-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(244_63_94/0.6)]",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    hoverBorder: "hover:border-amber-400/60",
    gradient: "from-amber-400 via-orange-400 to-amber-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(245_158_11/0.6)]",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-400/60",
    gradient: "from-emerald-400 via-green-400 to-teal-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(16_185_129/0.6)]",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400/60",
    gradient: "from-cyan-400 via-sky-400 to-blue-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(34_211_238/0.6)]",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    hoverBorder: "hover:border-indigo-400/60",
    gradient: "from-indigo-500 via-blue-400 to-violet-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(99_102_241/0.6)]",
  },
  fuchsia: {
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    hoverBorder: "hover:border-fuchsia-400/60",
    gradient: "from-fuchsia-400 via-pink-400 to-purple-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(232_121_249/0.6)]",
  },
  orange: {
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    hoverBorder: "hover:border-orange-400/60",
    gradient: "from-orange-500 via-amber-400 to-yellow-500",
    shadow: "shadow-[0_0_40px_-12px_rgb(249_115_22/0.6)]",
  },
};
