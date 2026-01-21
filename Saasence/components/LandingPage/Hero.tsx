"use client";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "../ui/google-gemini-effect";

export function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  // Define animation variants for the entrance animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 1.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      className="h-[400vh] w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip bg-gradient-to-br from-black via-violet-950/80 to-rose-950/80"
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <GoogleGeminiEffect
        title={"Unleash Autonomous Intelligence."}
        description={
          "The future of work isn’t manual—it’s autonomous. SaaSence empowers businesses with AI agents that deliver results across every department, without human micromanagement."
        }
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </motion.div>
  );
}
