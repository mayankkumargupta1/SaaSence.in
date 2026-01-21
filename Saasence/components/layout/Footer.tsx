"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming this is for utility classes

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-black pt-20 pb-8 overflow-hidden">
      {/* Top Border Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent animate-pulse-light" />

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-purple-700/10 blur-[120px] rounded-full pointer-events-none opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Content: Centered Flex Container */}
        <div className="flex flex-col items-center text-center gap-6 pb-16 border-b border-slate-800/70">
          {/* Brand and Tagline Section */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/logo.png" // Ensure this path is correct for your logo
              alt="SaaSence Logo"
              width={48}
              height={48}
              className="rounded-full shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-purple-500/30"
            />
            <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
              SaaSence
            </span>
          </Link>
          <p className="text-slate-400 text-sm md:text-base max-w-sm leading-relaxed">
            Transforming tradition with intelligence. <br />
            Bridging the gap for the next generation of business.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Developer Info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 pt-8">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} SaaSence Innovations Pvt. Ltd. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-500">
            Developed and maintained by{" "}
            <Link
              href="https://www.linkedin.com/company/getsetdeployed/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
            >
              GetSetDeployed
            </Link>
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse-light {
          0%,
          100% {
            opacity: 0.5;
            transform: scaleX(0.9);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        .animate-pulse-light {
          animation: pulse-light 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
