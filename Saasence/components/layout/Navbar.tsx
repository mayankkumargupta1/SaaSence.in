"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../TransitionLink";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  // Handle Scroll state for background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Body Scroll Lock when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { href: "#about", label: "About", isSection: true },
    { href: "#methodology", label: "Methodology", isSection: true },
    { href: "#features", label: "Features", isSection: true },
    { href: "#contact", label: "Contact Us", isSection: true },
  ];

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-slate-800 h-14"
          : "bg-transparent border-transparent h-16",
      )}
    >
      <nav className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-6">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="SaaSence Logo"
            width={28}
            height={28}
            className="transition-transform duration-500 group-hover:rotate-6"
          />
          <span className="text-lg font-bold tracking-[0.1em] text-white uppercase">
            SaaSence
          </span>
        </Link>

        {/* Desktop Links (Efferd Style) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -1 }}>
              <a
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MenuIcon size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-[3.5rem] z-50 bg-slate-950/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="block text-2xl font-semibold text-slate-100 border-b border-slate-900 pb-4 transition-colors hover:text-purple-400"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <div className="pt-10 flex flex-col gap-4 text-xs tracking-widest text-slate-500 uppercase">
                <p>hello@saasence.in</p>
                <div className="flex gap-4">
                  <span className="hover:text-purple-400 cursor-pointer">
                    LinkedIn
                  </span>
                  <span className="hover:text-purple-400 cursor-pointer">
                    Twitter
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
