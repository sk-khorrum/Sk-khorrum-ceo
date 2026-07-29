"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FolderGit2, Star, ArrowUpRight, ChevronRight, 
  MapPin, Globe, ShieldCheck, Tag
} from "lucide-react";

export default function PortfolioPage() {
  const [selectedCat, setSelectedCat] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "technical", label: "Technical & Core Web Vitals" },
    { id: "local", label: "Local SEO" },
    { id: "ecommerce", label: "E-Commerce" }
  ];

  const projects = [
    {
      id: "proj-scale-1",
      category: "ecommerce",
      title: "Compounding Growth for Luxury Apparel Store",
      industry: "Fashion Retail",
      growth: "+320% Organic Clicks",
      keywords: ["Luxury clothes Dhaka", "Apparel online BD", "Imported garments bd"],
      review: "SK Khorrum resolved our collection sitemap errors. Within 4 months, our search sales revenue tripled. Absolute masterclass SEO work.",
      reviewer: "Faheem Ahmed, CEO",
      link: "https://khorrum.pro.bd/case-studies"
    },
    {
      id: "proj-scale-2",
      category: "local",
      title: "Local Citations Mapping for Dental Clinic Chain",
      industry: "Healthcare / Medical",
      growth: "+240% Phone Appointments",
      keywords: ["Best dentist in Dhaka", "Dental clinic Banani", "Teeth whitening price bd"],
      review: "We are receiving double the map queries. SK Khorrum cleaned up duplicate GMB locations and mapped citations flawlessly.",
      reviewer: "Dr. Nabila Chowdhury",
      link: "https://khorrum.pro.bd/case-studies"
    },
    {
      id: "proj-scale-3",
      category: "technical",
      title: "Index Recovery Audit for Real Estate Portal",
      industry: "Property Listing Platform",
      growth: "+180% Reclaimed Crawl Depth",
      keywords: ["Buy apartment Dhaka", "Plots for sale Uttara", "Flat price in Mirpur"],
      review: "After our page count grew to 15,000, crawl depth dropped. Khorrum implemented canonical outlines and speed fixes that restored rankings.",
      reviewer: "M. Rahman, Tech Lead",
      link: "https://khorrum.pro.bd/case-studies"
    },
    {
      id: "proj-scale-4",
      category: "ecommerce",
      title: "Shopify Core Web Vitals Scaling for Tech Shop",
      industry: "Electronics Ecommerce",
      growth: "99/100 Mobile Speed & +95% Leads",
      keywords: ["Gamer laptops Bangladesh", "Mechanical keyboard price bd", "Custom PC builder Dhaka"],
      review: "He restructured our Shopify theme code. Page loads dropped below 1.2s and conversions spiked immediately.",
      reviewer: "Sajid Khan, Founder",
      link: "https://khorrum.pro.bd/case-studies"
    }
  ];

  const filteredProjects = selectedCat === "all"
    ? projects
    : projects.filter(p => p.category === selectedCat);

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#f97316] selection:text-[#050505] overflow-x-hidden pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 z-10 relative">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f97316] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#f97316]">PORTFOLIO</span>
        </nav>

        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em] mb-3 block">Showcase of Search Execution</span>
            <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
              Client Portfolio
            </h1>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border ${
                  selectedCat === cat.id
                    ? "bg-[#f97316] text-[#050505] border-[#f97316] font-bold"
                    : "bg-white/5 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="group p-8 rounded-[32px] bg-[#111]/40 border border-white/8 hover:border-[#f97316]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="uppercase">{proj.category}</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#f97316]/10 text-[#f97316] font-bold uppercase tracking-wider text-[9px] border border-[#f97316]/20">
                    {proj.growth}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#f97316] transition-colors">
                    {proj.title}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400">
                    Industry Sector: <code className="text-white">{proj.industry}</code>
                  </div>
                </div>

                {/* Keywords list */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Targeted Keywords Ranked:</div>
                  <div className="flex flex-wrap gap-2">
                    {proj.keywords.map((kw, kwIdx) => (
                      <span key={kwIdx} className="px-2.5 py-1 rounded-lg bg-white/5 text-neutral-300 text-[10px] font-mono border border-white/5">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Review quote block */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                <div className="text-neutral-400 italic text-xs leading-relaxed pl-4 border-l-2 border-[#f97316]">
                  "{proj.review}"
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">{proj.reviewer}</span>
                  <Link 
                    href={proj.link} 
                    className="text-[#f97316] hover:underline flex items-center gap-0.5"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="pt-16 border-t border-white/5 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-white">Dominate Search Queries For Your Industry Sector</h2>
          <p className="text-sm text-neutral-400">
            I perform deep keyword mappings and speed enhancements designed to capture transactional interest.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/seo-audit" className="px-6 py-3 rounded-xl bg-[#f97316] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors flex items-center gap-1">
              <span>Request Free Site Audit</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

