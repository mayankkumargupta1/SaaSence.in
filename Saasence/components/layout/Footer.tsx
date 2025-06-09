"use client";

import React from "react";
import Link from "next/link"; // For Next.js links
import {
  Facebook,
  Instagram,
  Twitter, // X icon from Lucide
  Linkedin,
  Youtube, // Replaced TikTok with YouTube for broader appeal, adjust if needed
  Send,
  Sparkles, // For SaaSence logo
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming this path is correct

// --- Helper Components (similar to shadcn/ui structure) ---

interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => (
  <Link
    href={href}
    className={cn(
      "text-sm text-slate-400 hover:text-purple-400 hover:underline underline-offset-2 transition-colors duration-200",
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);

interface FooterSectionTitleProps {
  children: React.ReactNode;
}

const FooterSectionTitle: React.FC<FooterSectionTitleProps> = ({
  children,
}) => (
  <h3 className="text-md font-semibold text-slate-100 mb-4 tracking-wide">
    {children}
  </h3>
);

// --- Main Footer Component ---

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const solutionsLinks = [
    { href: "/solutions/customer-service", label: "Customer Service AI" },
    { href: "/solutions/marketing", label: "Marketing Automation AI" },
    { href: "/solutions/hr", label: "HR & Recruitment AI" },
    {
      href: "/solutions/custom-enterprise",
      label: "Custom Enterprise Solutions",
    },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact Sales" },
    { href: "/login", label: "Client Portal" },
  ];

  const resourcesLinks = [
    { href: "/blog", label: "Blog & Insights" },
    { href: "/resources/case-studies", label: "Case Studies" },
    { href: "/docs", label: "Documentation" },
    { href: "/support", label: "Help & Support" },
  ];

  const legalLinks = [
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/dpa", label: "Data Processing Addendum" },
    { href: "/legal/security", label: "Security Overview" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/saasence",
      label: "Facebook",
      icon: <Facebook size={18} />,
    },
    {
      href: "https://www.instagram.com/saasence",
      label: "Instagram",
      icon: <Instagram size={18} />,
    },
    {
      href: "https://twitter.com/saasence",
      label: "Twitter/X",
      icon: <Twitter size={18} />,
    },
    {
      href: "https://www.linkedin.com/company/saasence",
      label: "LinkedIn",
      icon: <Linkedin size={18} />,
    },
    {
      href: "https://www.youtube.com/@saasence",
      label: "YouTube",
      icon: <Youtube size={18} />,
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 selection:bg-purple-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Top section: Links and Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 mb-12 md:mb-16 pb-12 md:pb-16 border-b border-slate-800">
          {/* Link Columns */}
          <div className="col-span-1">
            <FooterSectionTitle>Solutions</FooterSectionTitle>
            <ul className="space-y-2.5">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <FooterSectionTitle>Company</FooterSectionTitle>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 mt-8 md:mt-0">
            <FooterSectionTitle>Resources</FooterSectionTitle>
            <ul className="space-y-2.5">
              {resourcesLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 mt-8 md:mt-0">
            <FooterSectionTitle>Legal</FooterSectionTitle>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA Column - Spans 2 cols on mobile, 1 on lg */}
          <div className="col-span-2 lg:col-span-1 mt-8 lg:mt-0 lg:pl-4">
            <FooterSectionTitle>Stay Updated</FooterSectionTitle>
            <p className="text-sm text-slate-400 mb-4">
              Get the latest on Agentic AI, product updates, and industry
              insights from SaaSence.
            </p>
          </div>
        </div>

        {/* Bottom section: Brand, Social, Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center mb-2 group">
              <Sparkles
                size={28}
                className="text-purple-400 group-hover:text-purple-300 transition-colors"
              />
              <span className="ml-2 text-2xl font-bold text-slate-100 group-hover:text-slate-50 transition-colors">
                SaaSence.in
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-xs mx-auto md:mx-0">
              Empowering Businesses with Next-Generation Agentic AI Solutions.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="text-center text-xs text-slate-500 mt-12 md:mt-16 pt-8 border-t border-slate-800">
          <p className="mb-2">
            © {currentYear} SaaSence Technologies. All rights reserved. Made
            with
            <span role="img" aria-label="love" className="mx-1 text-red-500/80">
              ❤️
            </span>
            from the Future.
          </p>
          <p>
            SaaSence.in provides autonomous AI agents designed to optimize
            operations and drive innovation. For details, visit our{" "}
            <FooterLink
              href="/support"
              className="text-slate-400 hover:text-purple-300"
            >
              Support Center
            </FooterLink>{" "}
            or review our{" "}
            <FooterLink
              href="/legal/privacy"
              className="text-slate-400 hover:text-purple-300"
            >
              Privacy Policy
            </FooterLink>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
