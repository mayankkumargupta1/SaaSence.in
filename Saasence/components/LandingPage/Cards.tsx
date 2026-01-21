"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MdFolder,
  MdOutlineFlashOn,
  MdOutlineImage,
  MdOutlineInsertDriveFile,
  MdOutlineVideocam,
} from "react-icons/md";
import { FaCube } from "react-icons/fa";
import { SiOpenai, SiHuggingface } from "react-icons/si";
import { ChevronRight, Sparkles } from "lucide-react";

// --- Reusable Card Component ---
interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  children,
  className = "",
  gradientFrom = "from-slate-900/70",
  gradientTo = "to-slate-900/40",
}) => (
  <div
    className={`
      flex flex-col rounded-2xl p-6 shadow-2xl transition-all duration-300 ease-out
      bg-gradient-to-br ${gradientFrom} ${gradientTo}
      border border-slate-700/50
      hover:border-purple-500/70 hover:shadow-purple-500/10 hover:-translate-y-1
      group relative overflow-hidden
      ${className}
    `}
  >
    <div className="flex items-start mb-5">
      <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mr-4 shrink-0 shadow-lg border border-purple-500/30">
        <span className="w-6 h-6">{icon}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
      </div>
    </div>
    <div className="mt-auto pt-4 border-t border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
      {children}
    </div>
  </div>
);

// --- Content for Specific Cards ---
const StorageCardContent: React.FC = () => {
  const items = [
    {
      icon: <MdOutlineImage size={24} />,
      label: "Images",
      count: "500+",
      color: "text-sky-400",
      bgColor: "bg-sky-900/30",
    },
    {
      icon: <MdOutlineInsertDriveFile size={24} />,
      label: "Documents",
      count: "1.2k",
      color: "text-amber-400",
      bgColor: "bg-amber-900/30",
    },
    {
      icon: <MdOutlineVideocam size={24} />,
      label: "Videos",
      count: "250+",
      color: "text-rose-400",
      bgColor: "bg-rose-900/30",
    },
  ];
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 mb-2">Supported File Types:</p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center p-3 rounded-lg ${item.bgColor} border border-slate-700/40 group-hover:border-slate-600/60 aspect-square transition-colors`}
            title={`${item.label}: ${item.count}`}
          >
            <span className={`mb-1 ${item.color}`}>{item.icon}</span>
            <span className="text-xs text-slate-300">{item.label}</span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              {item.count}
            </span>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 text-sm text-purple-300 hover:text-purple-200 font-medium py-2.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/40 transition-all duration-200 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/20 active:bg-purple-600/50">
        Manage Files <ChevronRight className="w-4 h-4 ml-1.5" />
      </button>
    </div>
  );
};

const RealtimeCardContent: React.FC = () => (
  <div className="relative w-full h-48 flex flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-800/40 p-4 border border-slate-700/40 group-hover:border-slate-600/60 transition-all duration-300">
    <MdOutlineFlashOn className="text-6xl text-purple-500 mb-2 opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300" />
    <h4 className="text-slate-100 text-center text-base font-medium mb-1">
      Instant Updates
    </h4>
    <p className="text-xs text-slate-400 text-center max-w-[80%]">
      Sync data across clients and servers in milliseconds.
    </p>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="absolute inset-0 m-auto w-20 h-20 sm:w-28 sm:h-28 border-2 border-purple-500/30 rounded-full animate-ping group-hover:border-purple-500/50 transition-all"
        style={{
          animationDuration: `${1.5 + i * 0.5}s`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

const VectorCardContent: React.FC = () => (
  <div className="relative w-full h-48 flex flex-col items-center justify-center p-4 rounded-lg bg-slate-800/40 border border-slate-700/40 group-hover:border-slate-600/60 transition-all duration-300 space-y-3">
    <FaCube className="text-5xl text-purple-500 opacity-70 group-hover:opacity-90 group-hover:rotate-[20deg] group-hover:scale-105 transition-all duration-300" />
    <h4 className="text-slate-100 text-center text-base font-medium">
      AI Model Integration
    </h4>
    <div className="flex items-center space-x-3 pt-1">
      <div className="flex items-center text-slate-300 text-xs px-2.5 py-1 bg-slate-700/70 rounded-full border border-slate-600">
        <SiOpenai className="mr-1.5 text-sm text-sky-400" /> OpenAI
      </div>
      <div className="flex items-center text-slate-300 text-xs px-2.5 py-1 bg-slate-700/70 rounded-full border border-slate-600">
        <SiHuggingface className="mr-1.5 text-sm text-yellow-400" /> Hugging
        Face
      </div>
    </div>
  </div>
);

// --- Main Cards Section Component ---
const sectionOverallVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const cardFromLeftVariants = {
  hidden: { opacity: 0, x: -80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const cardFromBottomVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const cardFromRightVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const FeatureShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    margin: "-25% 0px -25% 0px",
    once: true,
  });

  const features = [
    {
      icon: <MdFolder />,
      title: "Cloud Storage",
      description:
        "Infinitely scalable object storage for all your media, backups, and large datasets, accessible globally.",
      content: <StorageCardContent />,
      gradientFrom: "from-sky-900/40",
      gradientTo: "to-slate-900/60",
      animationVariants: cardFromLeftVariants,
    },
    {
      icon: <MdOutlineFlashOn />,
      title: "Realtime Engine",
      description:
        "Build dynamic, collaborative applications with ultra-low latency data synchronization and event streaming.",
      content: <RealtimeCardContent />,
      gradientFrom: "from-emerald-900/40",
      gradientTo: "to-slate-900/60",
      animationVariants: cardFromBottomVariants,
    },
    {
      icon: <FaCube />,
      title: "AI Model Hub",
      description:
        "Seamlessly integrate and deploy leading AI models or bring your own for custom intelligent solutions.",
      content: <VectorCardContent />,
      gradientFrom: "from-rose-900/40",
      gradientTo: "to-slate-900/60",
      animationVariants: cardFromRightVariants,
    },
  ];

  return (
    <motion.div
      ref={sectionRef}
      className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 md:p-16 selection:bg-purple-600 selection:text-white antialiased overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionOverallVariants}
    >
      <motion.header
        className="text-center mb-16 md:mb-20"
        variants={headerVariants}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-tight flex items-center justify-center gap-x-3">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 inline-block" />
          Build{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">
            Without Limits
          </span>
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          SaaSence provides a suite of powerful, interconnected modules. Craft
          exceptional AI-driven applications faster than ever before.
        </p>
      </motion.header>

      <motion.main
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto"
        variants={cardsContainerVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={feature.animationVariants}
          >
            <Card
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradientFrom={feature.gradientFrom}
              gradientTo={feature.gradientTo}
              className="min-h-[480px] h-full"
            >
              {feature.content}
            </Card>
          </motion.div>
        ))}
      </motion.main>

      <motion.footer
        className="text-center mt-20 md:mt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }
            : {}
        }
      >
        <p className="text-slate-500 text-lg">
          Ready to innovate?{" "}
          <a
            href="#"
            className="font-semibold text-purple-400 hover:text-purple-300 hover:underline underline-offset-2 transition-colors"
          >
            Explore the full platform
          </a>
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default FeatureShowcase;
