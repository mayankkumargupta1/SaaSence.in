"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Github, X, Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "../TransitionLink";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Documentation" },
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut", when: "afterChildren" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-lg shadow-xl border-b border-slate-700/60"
      variants={navbarVariants}
      initial="hidden"
      animate={hasMounted ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div className="flex items-center" variants={navItemVariants}>
            <TransitionLink
              href="/"
              className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap mr-3 sm:mr-6"
            >
              SaaSence.in
            </TransitionLink>
            <motion.a
              href="#"
              className="hidden lg:flex items-center px-3 py-1.5 bg-slate-800/80 border border-purple-600/70 rounded-full text-xs sm:text-sm text-slate-200 hover:bg-slate-700/80 transition-colors duration-200 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                role="img"
                aria-label="rocket"
                className="mr-1.5 sm:mr-2 text-sm sm:text-base"
              >
                🚀
              </span>
              <span className="hidden sm:inline border-r border-slate-600/80 h-4 mr-1.5 sm:mr-2"></span>
              <span className="whitespace-nowrap">Introducing SaaSence</span>
              <ChevronRight className="ml-1.5 sm:ml-2 text-slate-400 text-xs" />
            </motion.a>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center space-x-5 xl:space-x-7"
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={navItemVariants}>
                <TransitionLink
                  href={link.href}
                  className="text-slate-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                >
                  {link.label}
                </TransitionLink>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center space-x-2 sm:space-x-3"
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.4 },
              },
            }}
          >
            <motion.div variants={navItemVariants}>
              <TransitionLink
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center px-3 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-full text-xs sm:text-sm text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors duration-200"
              >
                <Github className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
                2.5K
              </TransitionLink>
            </motion.div>
            {/* <motion.div variants={navItemVariants}> */}
            {/*   <TransitionLink */}
            {/*     href="/login" */}
            {/*     className="hidden sm:inline-block text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200" */}
            {/*   > */}
            {/*     Login */}
            {/*   </TransitionLink> */}
            {/* </motion.div> */}
            {/* <motion.div variants={navItemVariants}> */}
            {/*   <TransitionLink */}
            {/*     href="/signup" */}
            {/*     className="text-slate-900 bg-white hover:bg-slate-200 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-200 shadow-sm" */}
            {/*   > */}
            {/*     Sign up */}
            {/*   </TransitionLink> */}
            {/* </motion.div> */}

            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 rounded-md"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-content"
              variants={navItemVariants}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence initial={false} mode="wait">
                {" "}
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-content"
            className="lg:hidden absolute top-full left-0 right-0 overflow-hidden bg-black/85 backdrop-blur-xl border-t border-slate-700/60 shadow-2xl"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-4 pt-4 pb-5 space-y-2 sm:px-6">
              <motion.a
                href="#"
                className="flex w-full items-center justify-center px-4 py-3 mb-3 bg-slate-800/80 border border-purple-600/70 rounded-lg text-sm text-slate-200 hover:bg-slate-700/80 transition-colors duration-200 shadow-md"
                onClick={toggleMobileMenu}
                variants={mobileMenuItemVariants}
              >
                <span role="img" aria-label="rocket" className="mr-2 text-base">
                  🚀
                </span>
                <span className="whitespace-nowrap">Introducing SaaSence</span>
                <ChevronRight className="ml-2 text-slate-400 text-xs" />
              </motion.a>

              {navLinks.map((link) => (
                <motion.div key={link.href} variants={mobileMenuItemVariants}>
                  <TransitionLink
                    href={link.href}
                    className="block text-slate-200 hover:bg-slate-700/50 hover:text-white px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}

              <motion.div
                className="pt-3 mt-3 border-t border-slate-700/80"
                variants={mobileMenuItemVariants}
              >
                <TransitionLink
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-200 hover:bg-slate-700/50 hover:text-white px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <Github className="mr-3 text-xl" />
                  GitHub (2.5K Stars)
                </TransitionLink>
              </motion.div>

              <div className="sm:hidden flex flex-col space-y-3 pt-4 mt-2">
                {/* <motion.div variants={mobileMenuItemVariants}> */}
                {/*   <TransitionLink */}
                {/*     href="/login" */}
                {/*     className="w-full text-center text-slate-200 bg-slate-700/60 hover:bg-slate-600/80 px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200" */}
                {/*     onClick={toggleMobileMenu} */}
                {/*   > */}
                {/*     Login */}
                {/*   </TransitionLink> */}
                {/* </motion.div> */}
                {/* <motion.div variants={mobileMenuItemVariants}> */}
                {/*   <TransitionLink */}
                {/*     href="/signup" */}
                {/*     className="w-full text-center text-slate-900 bg-white hover:bg-slate-200 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-200 shadow-sm" */}
                {/*     onClick={toggleMobileMenu} */}
                {/*   > */}
                {/*     Sign up */}
                {/*   </TransitionLink> */}
                {/* </motion.div> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
