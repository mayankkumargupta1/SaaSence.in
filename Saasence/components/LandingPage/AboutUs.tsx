"use client";

import { motion, useInView } from "framer-motion"; // Changed to framer-motion for compatibility
import { useRef } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { BorderBeam } from "@/components/ui/border-beam";
import { CardHoverEffect } from "@/components/ui/pulse-card";
import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Cpu,
  Factory,
  Zap,
  LineChart,
} from "lucide-react";

// Updated Icon mapping to match the Business Model
const iconComponents = {
  BrainCircuit: BrainCircuit, // Innovation/AI
  ShieldCheck: ShieldCheck, // Reliability/Audit
  TrendingUp: TrendingUp, // Scalability/Growth
  Handshake: Handshake, // Partnership/Trust
  Cpu: Cpu, // Technology
  Factory: Factory, // Traditional Industry
  Zap: Zap, // Efficiency
  LineChart: LineChart, // Insights
};

const saasenceValues = [
  {
    title: "Agentic Innovation",
    description:
      "We don't just provide tools; we build AI-driven 'agentic' solutions that act as autonomous extensions of your team.",
    icon: "BrainCircuit" as const,
  },
  {
    title: "Tradition-First",
    description:
      "We respect the roots of manufacturing and retail, ensuring AI integration is seamless and non-disruptive to existing operations.",
    icon: "Factory" as const,
  },
  {
    title: "Actionable Insights",
    description:
      "Empowering business owners with clear, real-time data and hands-on control over their automated workflows.",
    icon: "LineChart" as const,
  },
  {
    title: "Digital Inclusivity",
    description:
      "Bridging the tech gap for Tier-2 and Tier-3 cities with affordable, high-impact digital transformation.",
    icon: "Handshake" as const,
  },
];

export default function AboutUs() {
  const aboutData = {
    title: "SaaSence Innovations",
    subtitle: "Transforming Tradition with Intelligence.",
    mission:
      "Our mission is to democratize AI for traditional businesses, making them future-ready through seamless integration, intelligent automation, and actionable insights.",
    vision:
      "To be the catalyst for digital evolution in Tier-2 and Tier-3 cities, turning local enterprises into globally competitive, AI-powered powerhouses.",
    values: saasenceValues,
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-20">
      {/* Spotlight tailored for a "Deep Intelligence" vibe (Purple to Blue) */}
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(280, 100%, 50%, 0.12) 0, hsla(280, 100%, 55%, 0.04) 50%, transparent 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, 0.08) 0, hsla(210, 100%, 55%, 0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(250, 100%, 85%, 0.06) 0, hsla(250, 100%, 85%, 0.06) 80%, transparent 100%)"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 border border-purple-500/20"
          >
            Future-Ready Business
          </motion.div>
          <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="text-slate-400 mt-6 text-xl">{aboutData.subtitle}</p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <div className="relative z-10 grid gap-8 md:grid-cols-2">
            {/* Mission Card - "The Push" */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl"
            >
              <BorderBeam
                duration={6}
                size={200}
                className="from-purple-500 via-fuchsia-500 to-transparent"
              />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                <Zap className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {aboutData.mission}
              </p>
            </motion.div>

            {/* Vision Card - "The Future" */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl"
            >
              <BorderBeam
                duration={6}
                size={200}
                reverse
                className="from-blue-500 via-cyan-500 to-transparent"
              />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Cpu className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values Section */}
        <div ref={valuesRef} className="pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The SaaSence Edge
            </h2>
            <p className="text-slate-500 mt-4">
              Bridging the gap between traditional operations and AI
              capabilities.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values.map((value, index) => {
              const IconComponent = iconComponents[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                    variant={
                      index === 0
                        ? "purple"
                        : index === 1
                          ? "amber" // Using Amber for "Tradition"
                          : index === 2
                            ? "blue"
                            : "emerald"
                    }
                    glowEffect={true}
                    size="lg"
                    className="h-full border-slate-800 bg-slate-900/40"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
