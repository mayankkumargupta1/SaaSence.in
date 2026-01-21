import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: "emerald" | "blue" | "purple" | "amber" | "rose";
  size?: "sm" | "md" | "lg";
  glowEffect?: boolean;
}

const VARIANTS = {
  emerald: {
    color: "#10b981",
    border: "group-hover:border-emerald-500/50",
    bg: "group-hover:bg-emerald-500/5",
  },
  blue: {
    color: "#3b82f6",
    border: "group-hover:border-blue-500/50",
    bg: "group-hover:bg-blue-500/5",
  },
  purple: {
    color: "#8b5cf6",
    border: "group-hover:border-purple-500/50",
    bg: "group-hover:bg-purple-500/5",
  },
  amber: {
    color: "#f59e0b",
    border: "group-hover:border-amber-500/50",
    bg: "group-hover:bg-amber-500/5",
  },
  rose: {
    color: "#f43f5e",
    border: "group-hover:border-rose-500/50",
    bg: "group-hover:bg-rose-500/5",
  },
};

const SIZES = {
  sm: { padding: "p-5", icon: "h-5 w-5", title: "text-sm", desc: "text-xs" },
  md: { padding: "p-6", icon: "h-6 w-6", title: "text-base", desc: "text-sm" },
  lg: { padding: "p-8", icon: "h-8 w-8", title: "text-lg", desc: "text-base" },
};

export function CardHoverEffect({
  icon,
  title,
  description,
  className,
  variant = "purple",
  size = "md",
  glowEffect = true,
}: CardProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-800 transition-all duration-300",
        "bg-slate-900/40 backdrop-blur-md",
        v.border,
        v.bg,
        s.padding,
        className,
      )}
    >
      {/* 1. Background Glow (Subtle) */}
      {glowEffect && (
        <div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: v.color, filter: "blur(40px)" }}
        />
      )}

      {/* 2. Moving Border Line (Simplified) */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-[-100%] animate-[spin_5s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0, transparent 70%, ${v.color} 100%)`,
          }}
        />
        {/* This inner div masks the center so only the border is visible */}
        <div className="absolute inset-[1px] rounded-[inherit] bg-slate-900/90" />
      </div>

      {/* 3. Content Container */}
      <div className="relative z-10 flex flex-col space-y-3">
        {/* Icon Wrapper */}
        <div
          className="inline-flex w-fit rounded-lg p-2 transition-colors duration-300 bg-slate-800/50 group-hover:bg-transparent"
          style={{ color: v.color }}
        >
          <div className={s.icon}>{icon}</div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3
            className={cn(
              "font-bold text-white transition-colors duration-300 group-hover:text-white",
              s.title,
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-300",
              s.desc,
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {/* 4. Shine Sweep Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[inherit]">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </motion.div>
  );
}

// Add this to your tailwind.config.js or globals.css
// @keyframes shimmer { 100% { transform: translateX(100%); } }
