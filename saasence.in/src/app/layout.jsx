// app/layout.js
import { Lato, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SaaSenceChatbot } from "./saasence";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
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

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <Navbar />
        {children}
        <Footer />
        <SaaSenceChatbot />
      </body>
    </html>
  );
}
