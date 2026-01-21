"use client";

import React from "react";
import {
  BrainCircuit,
  ClipboardCheck,
  GraduationCap,
  LineChart,
  Settings2,
  Zap,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: "left" | "right";
  color: string;
  cornerStyle?: string;
};

const leftFeatures: FeatureItem[] = [
  {
    icon: ClipboardCheck,
    title: "Digital Readiness Audits",
    description:
      "We assess your current legacy operations to identify high-impact automation gaps.",
    color: "text-amber-400",
    cornerStyle: "sm:translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: BrainCircuit,
    title: "Agentic AI Deployment",
    description:
      'Custom "Agentic" solutions that handle complex workflows autonomously.',
    color: "text-purple-400",
    cornerStyle: "sm:-translate-x-4 sm:rounded-br-[2px]",
  },
  {
    icon: GraduationCap,
    title: "Business Workshops",
    description:
      "Empowering Tier-2 & 3 city managers with hands-on AI literacy and control.",
    color: "text-blue-400",
    cornerStyle: "sm:translate-x-4 sm:rounded-tr-[2px]",
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: Settings2,
    title: "Seamless Integration",
    description:
      "AI tools that plug into your existing CRM and ERP without disrupting daily work.",
    color: "text-emerald-400",
    cornerStyle: "sm:-translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: LineChart,
    title: "Performance Monitoring",
    description:
      "Real-time analytics to track efficiency gains and ROI across all automated systems.",
    color: "text-pink-400",
    cornerStyle: "sm:translate-x-4 sm:rounded-bl-[2px]",
  },
  {
    icon: Zap,
    title: "Operational Scalability",
    description:
      "Grow your business volume without increasing overhead through intelligent scaling.",
    color: "text-orange-400",
    cornerStyle: "sm:-translate-x-4 sm:rounded-tl-[2px]",
  },
];

const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "relative rounded-2xl p-6 text-sm transition-all duration-300",
        "bg-slate-900/50 border border-slate-800 backdrop-blur-sm",
        "hover:border-slate-700 hover:bg-slate-900/80",
        feature.cornerStyle,
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800/50",
          feature.color,
        )}
      >
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-slate-100 mb-2 text-xl font-semibold tracking-tight">
        {feature.title}
      </h3>
      <p className="text-slate-400 text-base leading-relaxed">
        {feature.description}
      </p>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-slate-800/20 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
};

export default function FeatureSection() {
  return (
    <section
      className="bg-slate-950 py-24 relative overflow-hidden"
      id="methodology"
    >
      {/* Background radial for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-12 md:grid md:grid-cols-3 md:items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-${index}`} feature={feature} />
            ))}
          </div>

          {/* Center column - The Vision */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-400 uppercase tracking-widest">
              The Methodology
            </div>
            <h2 className="text-white mb-6 text-3xl font-bold tracking-tight md:text-5xl">
              Future-Ready <br />
              <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>
            <p className="text-slate-400 max-w-[20rem] text-lg leading-relaxed">
              We provide the framework to turn traditional overhead into
              automated intelligence.
            </p>

            {/* Action Link for the Document-style UI */}
            {/* <a */}
            {/*   href="#audits" */}
            {/*   className="mt-8 text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2" */}
            {/* > */}
            {/*   Download AI Roadmap <Zap size={16} /> */}
            {/* </a> */}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
