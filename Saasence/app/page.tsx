"use client";

import AboutUs from "@/components/LandingPage/AboutUs";
import { AgenticSection } from "@/components/LandingPage/AgenticSection";
import AnalyticsDashboard from "@/components/LandingPage/Analytics";
import FeatureShowcase from "@/components/LandingPage/Cards";
import FeatureSection from "@/components/LandingPage/FeatureSection";
import { Hero } from "@/components/LandingPage/Hero";
import { SalesContactForm } from "@/components/LandingPage/SalesContactForm";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <AgenticSection />
      <AnalyticsDashboard />
      <div id="about" className="scroll-mt-20">
        <AboutUs />
      </div>

      <FeatureShowcase />
      <div id="features" className="scroll-mt-24">
        <FeatureSection />
      </div>
      <div id="contact" className="scroll-mt-24">
        <SalesContactForm />
      </div>

      {/* <SalesContactForm /> */}
    </main>
  );
}
