"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Search, ChevronRight, Download, Check, Sparkles, 
  ArrowUpRight, Users, Shield, Award, BarChart3, Globe, 
  Star, MessageSquare, AlertCircle, RefreshCw, Layers
} from "lucide-react";

// ─── Stat Counter Helper (Inline if not created yet) ──────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // EaseOutCubic
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-['Anton'] text-4xl sm:text-5xl text-[#c9f731] tracking-wider mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function HomePage() {
  // Search bar simulator state
  const [searchQuery, setSearchQuery] = useState("Best SEO Specialist in Bangladesh");
  const [showResults, setShowResults] = useState(false);

  // SEO Scanner states
  const [targetUrl, setTargetUrl] = useState("");
  const [scanStep, setScanStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const scanSteps = [
    "Establishing secure diagnostic connection...",
    "Crawling robots.txt and sitemap.xml indexing signals...",
    "Scanning schema markup (JSON-LD Organization & Person)...",
    "Measuring Core Web Vitals (LCP, FID, CLS, INP) performance...",
    "Auditing on-page content relevance & heading semantic structure...",
    "Reviewing backlink profiles and domain trust velocity...",
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;
    setIsScanning(true);
    setScanStep(0);
    setScanResults(null);
    setLeadSubmitted(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < scanSteps.length) {
        setScanStep(step);
      } else {
        clearInterval(interval);
        // Completed scan
        setIsScanning(false);
        setScanResults({
          seo: Math.floor(Math.random() * 15) + 75, // 75-90
          performance: Math.floor(Math.random() * 20) + 70, // 70-90
          bestPractices: Math.floor(Math.random() * 15) + 80, // 80-95
          structure: "Critical on-page semantic outline warning. Multiple H1 tags identified. Missing LocalBusiness schema.",
        });
      }
    }, 1200);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail) {
      setLeadSubmitted(true);
    }
  };

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#c9f731] selection:text-[#050505] overflow-x-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute inset-0 hero-grid z-0 pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c9f731]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#c9f731]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* SEO Main Heading for Search Engines (Hidden visually, read by spiders) */}
      <h1 className="sr-only">Best SEO Specialist in Bangladesh - SK Khorrum | SEO Expert & Consultant</h1>

      {/* ─────────────────────────────────────────────────────────────────────────────
          HERO SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 z-10 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          
          {/* Left Text and Search Simulator */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-[#c9f731]/25 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#c9f731] animate-pulse" />
              <span className="text-[#c9f731] tracking-wider uppercase">Rank #1 in Google Bangladesh</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-['Anton'] text-5xl sm:text-7xl lg:text-8xl leading-none tracking-wide">
                WE DOMINATE<br />
                <span className="text-[#c9f731] hero-glow">SEARCH ENGINE</span><br />
                REAL ESTATE.
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
                I am <strong className="text-white font-semibold">SK Khorrum</strong>, a premium Google Search Specialist and technical SEO consultant. I build custom, high-speed architectures that rank page #1, capture high-intent leads, and convert traffic into compounding revenue.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/seo-audit" className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#c9f731] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-all shadow-lg shadow-[#c9f731]/20">
                <span>Free SEO Diagnostics</span>
                <Zap className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#c9f731]/40 hover:text-[#c9f731] font-mono text-xs transition-all">
                <span>Book Consulting Call</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Interactive Search Mockup */}
            <div className="pt-4 max-w-xl">
              <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Search Bar top */}
                <div className="bg-[#111] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-1 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 truncate">{searchQuery}</span>
                    <Search className="w-3.5 h-3.5 text-neutral-500" />
                  </div>
                </div>
                {/* Search Simulated Content */}
                <div className="p-5 space-y-4 bg-black/60 min-h-[160px]">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pb-2 border-b border-white/5">
                    <span>Google.com.bd Search Results</span>
                    <span className="text-[#c9f731] font-bold">About 2,410,000 results (0.34s)</span>
                  </div>
                  
                  {/* Result 1 (SK Khorrum) */}
                  <div className="space-y-1.5 group cursor-pointer" onClick={() => setShowResults(true)}>
                    <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                      <span>https://khorrum.pro.bd</span>
                      <span className="px-1 py-0.2 bg-[#c9f731]/10 text-[#c9f731] text-[9px] rounded font-bold">SPONSOR FREE</span>
                    </div>
                    <h3 className="text-base font-bold text-[#c9f731] underline group-hover:text-white transition-colors">
                      Best SEO Specialist in Bangladesh - SK Khorrum
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      5+ Years experienced Technical SEO Expert, Google Search Consultant & performance optimizer. Scale your business to Page 1 with proven case studies...
                    </p>
                    <div className="flex items-center gap-4 pt-1.5 text-[10px] text-[#c9f731] font-mono">
                      <span>★ 5.0 (98 reviews)</span>
                      <span>• Audit Score: 98%</span>
                      <span>• Location: Dhaka, BD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image/Stats Display */}
          <div className="relative flex justify-center">
            {/* Visual glow frame */}
            <div className="absolute inset-0 border border-[#c9f731]/20 rounded-[40px] transform rotate-3 scale-95 pointer-events-none" />
            
            <div className="relative w-full max-w-sm rounded-[36px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-3 backdrop-blur-xl animate-float-photo">
              <img
                src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
                alt="SK Khorrum - Best SEO Specialist in Bangladesh"
                className="w-full h-auto object-cover rounded-[28px] grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating indicators */}
              <div className="absolute top-8 -left-8 glass-pill border border-[#c9f731]/30 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="w-9 h-9 rounded-xl bg-[#c9f731]/10 flex items-center justify-center text-[#c9f731]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Organic Traffic</div>
                  <div className="text-sm font-bold text-white font-mono">+480% YoY Growth</div>
                </div>
              </div>

              <div className="absolute bottom-8 -right-8 glass-pill border border-white/10 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#c9f731]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Google Core Update</div>
                  <div className="text-sm font-bold text-white font-mono">100% Core Safe</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          STATS ROW (DYNAMIC COUNTERS)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/8 bg-[#0a0a0c] py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <StatItem value={5} suffix="+" label="Years Exp (Since 2020)" />
          <StatItem value={120} suffix="+" label="Crawl Audits Run" />
          <StatItem value={2500} suffix="+" label="Ranked Keywords" />
          <StatItem value={98} suffix="%" label="Client Satisfaction" />
          <StatItem value={15} suffix="+" label="Countries Ranked" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          INTERACTIVE SEO SCANNER TOOL (LEAD GENERATION MAGNET)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em]">Interactive Diagnostics</span>
          <h2 className="font-['Anton'] text-4xl sm:text-6xl tracking-wide">RUN AN INSTANT AUDIT REPORT</h2>
          <p className="text-neutral-400">
            Crawl your domain live. Inspect critical indexing signals, Core Web Vitals metrics, semantic errors, and get a customized recovery roadmap.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 right-10 w-24 h-24 bg-[#c9f731]/5 rounded-full blur-[40px] pointer-events-none" />

            {!isScanning && !scanResults && (
              <form onSubmit={handleStartScan} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="audit-domain" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Enter Domain / Website URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        id="audit-domain"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        required
                        className="w-full bg-[#111]/85 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#c9f731] transition-all font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-2xl bg-[#c9f731] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Analyze Website</span>
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                  <AlertCircle className="w-4 h-4 text-[#c9f731]" />
                  <span>No credit card required. Free analysis scans technical index elements instantly.</span>
                </div>
              </form>
            )}

            {/* SCANNING IN PROGRESS */}
            {isScanning && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-[#c9f731]/10 border-t-[#c9f731] rounded-full animate-spin" />
                  <RefreshCw className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[#c9f731]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-mono text-[#c9f731]">
                    Analyzing {new URL(targetUrl).hostname}...
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono animate-pulse max-w-sm mx-auto">
                    {scanSteps[scanStep]}
                  </p>
                </div>
                {/* Visual Progress bar */}
                <div className="w-full max-w-md h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#c9f731] transition-all duration-1000"
                    style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* SCAN RESULTS SHOWN */}
            {scanResults && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono text-white">Diagnostics Complete</h3>
                    <p className="text-xs font-mono text-neutral-500">{targetUrl}</p>
                  </div>
                  <button 
                    onClick={() => { setScanResults(null); setTargetUrl(""); }}
                    className="text-xs font-mono text-neutral-400 hover:text-[#c9f731] border border-white/10 rounded-lg px-3 py-1 hover:border-[#c9f731]/30 transition-all"
                  >
                    Scan Another URL
                  </button>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold font-mono text-[#c9f731] mb-1">{scanResults.seo}%</div>
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">SEO Score</div>
                    <div className="mt-3 text-[11px] text-neutral-500 leading-normal">On-page headers, structure & indexing elements need recovery.</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold font-mono text-[#c9f731] mb-1">{scanResults.performance}%</div>
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Page Speed</div>
                    <div className="mt-3 text-[11px] text-neutral-500 leading-normal">LCP and CLS values exceed modern thresholds on mobile channels.</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold font-mono text-white mb-1">{scanResults.bestPractices}%</div>
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Compliance</div>
                    <div className="mt-3 text-[11px] text-neutral-500 leading-normal">Lack of Structured Data (JSON-LD Organization & Breadcrumb schema).</div>
                  </div>
                </div>

                {/* Diagnostics warning */}
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/25 flex gap-3 text-sm text-neutral-300">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">Critical Indexing Warning</span>
                    {scanResults.structure}
                  </div>
                </div>

                {/* Lead Form wrapper */}
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <h4 className="text-base font-bold">Download Complete PDF Report & Fix Guide</h4>
                    <p className="text-xs text-neutral-400">
                      Enter your email to receive a detailed breakdown of these warnings, along with a free 15-minute search growth roadmap directly from SK Khorrum.
                    </p>
                  </div>

                  {leadSubmitted ? (
                    <div className="p-6 rounded-2xl bg-[#c9f731]/10 border border-[#c9f731]/30 text-center text-[#c9f731] font-mono text-sm">
                      ✨ Thank you! The detailed audit PDF has been queued for delivery to {leadEmail}. I will reach out shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="business@example.com"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        required
                        className="flex-1 bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#c9f731] font-mono"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors"
                      >
                        Send Free Fix Guide
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          CLIENT LOGOS & TRUST BADGES
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#09090b] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <p className="text-center text-[10px] font-mono text-[#c9f731] uppercase tracking-[0.25em] mb-10">
            Trusted by Brands & Enterprises Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale">
            {["Amazon SEO Certified", "Ahrefs Expert Academy", "Semrush Partner", "Google Search Console Qualified", "HubSpot SEO Core"].map((partner, idx) => (
              <span key={idx} className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          SERVICES PREVIEW SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em]">Audit, Strategy & Execution</span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl tracking-wide mt-2">Core SEO Pillars</h2>
          </div>
          <Link href="/services" className="font-mono text-xs text-[#c9f731] hover:underline flex items-center gap-1.5 uppercase tracking-widest">
            <span>Explore All SEO Modules</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Technical SEO & Speed",
              desc: "Deep core crawler optimizations. We fix JavaScript rendering delays, Core Web Vitals, canonical architecture, robots parameters, and Schema.org semantic silos.",
              bullets: ["CWV speed tuning (FCP, LCP)", "Dynamic JSON-LD schemas", "Redirect & crawl budget fixes"],
              tag: "Pillar 01"
            },
            {
              title: "WordPress & Shopify SEO",
              desc: "Engineered frameworks built for modern CMS structures. Optimize database structures, asset delivery streams, permalinks, and product SEO markup.",
              bullets: ["WooCommerce product optimization", "Shopify microdata injections", "XML dynamic sitemap tuning"],
              tag: "Pillar 02"
            },
            {
              title: "Local SEO Bangladesh",
              desc: "Dominate search maps in Dhaka and regional hubs. Drive direct local leads, reviews acquisition flow, and optimize physical storefront discovery profiles.",
              bullets: ["Google Map Pack positioning", "Citation consistency audits", "Geo-targeted copywriting"],
              tag: "Pillar 03"
            }
          ].map((service, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-[#111]/40 border border-white/8 hover:border-[#c9f731]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6">
                  <span>{service.tag}</span>
                  <span className="w-8 h-[1px] bg-white/10" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#c9f731] transition-colors">{service.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">{service.desc}</p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-6 text-xs text-neutral-400 font-mono">
                {service.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9f731]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          CTA BANNER (CRO TARGETED)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="glass-panel border border-[#c9f731]/30 rounded-[40px] p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9f731]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em]">Ready to scale your organic presence?</span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl tracking-wide leading-none">STOP LEAKING TRAFFIC TO COMPETITORS</h2>
            <p className="text-neutral-400 max-w-lg mx-auto">
              Schedule a technical assessment session today. We will map out your primary money keywords and identify why your competitors are ranking higher.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 rounded-2xl bg-[#c9f731] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-colors flex items-center gap-2 shadow-lg">
              <span>Book Consultation Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="/resume.pdf" download className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#c9f731]/30 hover:text-[#c9f731] transition-all font-mono text-xs flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download SEO Resume</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
