"use client";

import { AgenticSection } from "@/components/LandingPage/AgenticSection";
import AnalyticsDashboard from "@/components/LandingPage/Analytics";
import FeatureShowcase from "@/components/LandingPage/Cards";
import { Hero } from "@/components/LandingPage/Hero";
import { SalesContactForm } from "@/components/LandingPage/SalesContactForm";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <AgenticSection />
      <AnalyticsDashboard />
      <FeatureShowcase />
      <SalesContactForm />

      {/* <SalesContactForm /> */}
    </main>
  );
}
