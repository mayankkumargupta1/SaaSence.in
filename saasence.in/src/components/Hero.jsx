import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

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

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] relative overflow-clip"
      ref={ref}
    >
      {/* 
        This wrapper is now sticky to the top of the viewport (`top-0`),
        and takes the full screen height (`h-screen`).
        It centrally aligns the GoogleGeminiEffect component.
        `px-4 sm:px-8 lg:px-16` provides responsive horizontal padding.
        `pt-20 sm:pt-40` ensures content isn't flush with the top.
      */}
      <div className="sticky top-0  flex flex-col items-center justify-center px-4 sm:px-2 lg:px-16 ">
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
      </div>
    </div>
  );
}
