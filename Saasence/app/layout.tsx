// app/layout.js
import { Saira } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SaaSenceChatbot } from "@/components/layout/SaasenceChatBot";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "SaaSence.in - Empowering Businesses with Agentic AI Solutions",
  description:
    "SaaSence.in offers AI-powered SaaS products transforming business operations with Agentic AI. Discover autonomous customer support, AI-driven marketing automation, and HR tools.",
  keywords:
    "Agentic AI, SaaS, AI automation, customer service, marketing automation, HR tools, business transformation",
  authors: [{ name: "SaaSence.in" }],
  creator: "SaaSence.in",
  publisher: "SaaSence.in",
  robots: "index, follow",
  openGraph: {
    title: "SaaSence.in - Empowering Businesses with Agentic AI Solutions",
    description:
      "Transform your business operations with our suite of AI-powered SaaS products built on Agentic AI technology.",
    url: "https://saasence.in",
    siteName: "SaaSence.in",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSence.in - Empowering Businesses with Agentic AI Solutions",
    description:
      "Transform your business operations with our suite of AI-powered SaaS products built on Agentic AI technology.",
    creator: "@saasencein",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${saira.variable} antialiased bg-white text-slate-900 selection:bg-purple-500 selection:text-white`}
      >
        {/* Accessibility: Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-50 focus:font-medium transition-all duration-200"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-screen focus:outline-none"
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Chatbot - Anya */}
        <SaaSenceChatbot />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SaaSence.in",
              description: "Empowering Businesses with Agentic AI Solutions",
              url: "https://saasence.in",
              logo: "https://saasence.in/logo.png",
              sameAs: [
                "https://twitter.com/saasencein",
                "https://linkedin.com/company/saasence",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
