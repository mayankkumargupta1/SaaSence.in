"use client";


import AnalyticsDashboard from "@/components/Analytics";
import Cards from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { HeroScroll } from "@/components/HeroScroll";
import { SalesContactForm } from "@/components/SalesContactForm";



export default function Home(){
  return(
    <main className="">
      <Hero/>
      <HeroScroll/>
      <AnalyticsDashboard/>
      <Cards/>  
      <SalesContactForm/>
      
    </main>  
  );
}