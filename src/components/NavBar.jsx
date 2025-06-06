"use client";

// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FaGithub, FaChevronRight } from 'react-icons/fa';
import { TransitionLink } from './Link/TransitionLink'; // Assuming this component is robust

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than or equal to Tailwind's 'lg' breakpoint (typically 1024px).
      // If it is, close the mobile menu.
      if (window.innerWidth >= 1024 && isMobileMenuOpen) { // Changed 768 to 1024
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]); // Re-run effect if isMobileMenuOpen changes

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and "Introducing" pill (or mobile toggle) */}
          <div className="flex items-center">
            {/* Logo */}
            <TransitionLink href="/" className="text-2xl font-bold text-white whitespace-nowrap mr-2 sm:mr-4">
              SaaSence.in
            </TransitionLink>

            {/* Desktop "Introducing" pill */}
            <a
              href="#"
              className="hidden lg:flex items-center px-3 py-1.5 bg-gray-800/70 border border-purple-500/60 rounded-full text-xs sm:text-sm text-gray-300 hover:bg-gray-700/70 transition-colors" // Changed md:flex to lg:flex
            >
              <span role="img" aria-label="rocket" className="mr-1.5 sm:mr-2 text-sm sm:text-base">
                🚀
              </span>
              <span className="hidden sm:inline border-r border-gray-600/80 h-4 mr-1.5 sm:mr-2"></span>
              <span className="whitespace-nowrap">Introducing SaaSence</span>
              <FaChevronRight className="ml-1.5 sm:ml-2 text-gray-400 text-xs" />
            </a>

            {/* Mobile "Introducing" pill - also acts as menu toggle for screens below lg */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden ml-auto flex items-center px-3 py-1.5 bg-gray-800/70 border border-purple-500/60 rounded-full text-xs text-gray-300 hover:bg-gray-700/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500" // Changed md:hidden to lg:hidden
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span role="img" aria-label="rocket" className="text-sm mr-1.5">
                🚀
              </span>
              {/* Conditional text based on available space */}
              <span className="hidden sm:inline">Introducing</span>
              <span className="inline sm:hidden">Menu</span> {/* Default to 'Menu' on very small screens */}
              <FaChevronRight
                className={`ml-1.5 text-gray-400 text-xs transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
              />
            </button>
          </div>

          {/* Middle Section: Navigation Links (Desktop only - now lg and up) */}
          <div className="hidden lg:flex items-center space-x-5 lg:space-x-7"> {/* Changed md:flex to lg:flex */}
            <TransitionLink href="underdev" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Features
            </TransitionLink>
            <TransitionLink href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Pricing
            </TransitionLink>
            <TransitionLink href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </TransitionLink>
            <TransitionLink href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Documentation
            </TransitionLink>
          </div>

          {/* Right Section: GitHub, Login, Sign Up */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* GitHub hidden on mobile and tablet */}
            <TransitionLink
              href="#"
              className="hidden lg:flex items-center px-3 py-1.5 bg-gray-800/70 border border-gray-700/80 rounded-full text-xs sm:text-sm text-gray-300 hover:bg-gray-700/70 transition-colors" // Changed md:flex to lg:flex
            >
              <FaGithub className="mr-1.5 sm:mr-2 text-base sm:text-lg" />
              2.5K
            </TransitionLink>

            {/* Login and Sign Up (visible on all screens) */}
            <TransitionLink
              href="#"
              className="text-white bg-gray-700/80 hover:bg-gray-600/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
            >
              Login
            </TransitionLink>
            <TransitionLink
              href="#"
              className="text-gray-900 bg-white hover:bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors"
            >
              Sign up
            </TransitionLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Expanded from the "Introducing" pill) - now visible up to lg-1 */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${ // Changed md:hidden to lg:hidden
          isMobileMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
        } bg-black/80 backdrop-blur-md border-t border-gray-700`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6">
          <TransitionLink
            href="underdev" // Added the actual path here
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu} // Close menu on click
          >
            Features
          </TransitionLink>
          <TransitionLink
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Pricing
          </TransitionLink>
          <TransitionLink
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Blog
          </TransitionLink>
          <TransitionLink
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Documentation
          </TransitionLink>

          {/* GitHub link in the mobile menu */}
          <div className="mt-2 pt-2 border-t border-gray-800">
            <TransitionLink
              href="#"
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              <FaGithub className="mr-2 text-xl" />
              GitHub (2.5K Stars)
            </TransitionLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;