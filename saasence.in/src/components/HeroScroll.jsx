"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Trusted by forward-thinking teams building with <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Agentic AI.
              </span>
            </h1>
          </>
        }
      >
        <video
          src="/bot.mp4" // replace with your video path
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          width={1400}
          height={720}
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
