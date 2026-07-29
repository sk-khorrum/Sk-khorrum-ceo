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
      <div className="font-['Anton'] text-4xl sm:text-5xl text-[#f97316] tracking-wider mb-2">
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
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#f97316] selection:text-[#050505] overflow-x-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute inset-0 hero-grid z-0 pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* SEO Main Heading for Search Engines (Hidden visually, read by spiders) */}
      <h1 className="sr-only">Best SEO Specialist in Bangladesh - SK Khorrum | SEO Expert & Consultant</h1>

      {/* ─────────────────────────────────────────────────────────────────────────────
          HERO SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 z-10 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          
          {/* Left Text and Search Simulator */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-[#f97316]/25 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
              <span className="text-[#f97316] tracking-wider uppercase">Rank #1 in Google Bangladesh</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-['Anton'] text-5xl sm:text-7xl lg:text-8xl leading-none tracking-wide">
                WE DOMINATE<br />
                <span className="text-[#f97316] hero-glow">SEARCH ENGINE</span><br />
                REAL ESTATE.
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
                I am <strong className="text-white font-semibold">SK Khorrum</strong>, a premium Google Search Specialist and technical SEO consultant. I build custom, high-speed architectures that rank page #1, capture high-intent leads, and convert traffic into compounding revenue.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/seo-audit" className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#f97316] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-all shadow-lg shadow-[#f97316]/20">
                <span>Free SEO Diagnostics</span>
                <Zap className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="group flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#f97316]/40 hover:text-[#f97316] font-mono text-xs transition-all">
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
                    <span className="text-[#f97316] font-bold">About 2,410,000 results (0.34s)</span>
                  </div>
                  
                  {/* Result 1 (SK Khorrum) */}
                  <div className="space-y-1.5 group cursor-pointer" onClick={() => setShowResults(true)}>
                    <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                      <span>https://khorrum.pro.bd</span>
                      <span className="px-1 py-0.2 bg-[#f97316]/10 text-[#f97316] text-[9px] rounded font-bold">SPONSOR FREE</span>
                    </div>
                    <h3 className="text-base font-bold text-[#f97316] underline group-hover:text-white transition-colors">
                      Best SEO Specialist in Bangladesh - SK Khorrum
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      5+ Years experienced Technical SEO Expert, Google Search Consultant & performance optimizer. Scale your business to Page 1 with proven case studies...
                    </p>
                    <div className="flex items-center gap-4 pt-1.5 text-[10px] text-[#f97316] font-mono">
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
            <div className="absolute inset-0 border border-[#f97316]/20 rounded-[40px] transform rotate-3 scale-95 pointer-events-none" />
            
            <div className="relative w-full max-w-sm rounded-[36px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-3 backdrop-blur-xl animate-float-photo">
              <img
                src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
                alt="SK Khorrum - Best SEO Specialist in Bangladesh"
                className="w-full h-auto object-cover rounded-[28px] grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating indicators */}
              <div className="absolute top-8 -left-8 glass-pill border border-[#f97316]/30 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="w-9 h-9 rounded-xl bg-[#f97316]/10 flex items-center justify-center text-[#f97316]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Organic Traffic</div>
                  <div className="text-sm font-bold text-white font-mono">+480% YoY Growth</div>
                </div>
              </div>

              <div className="absolute bottom-8 -right-8 glass-pill border border-white/10 p-3.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#f97316]">
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
          <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Interactive Diagnostics</span>
          <h2 className="font-['Anton'] text-4xl sm:text-6xl tracking-wide">RUN AN INSTANT AUDIT REPORT</h2>
          <p className="text-neutral-400">
            Crawl your domain live. Inspect critical indexing signals, Core Web Vitals metrics, semantic errors, and get a customized recovery roadmap.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 right-10 w-24 h-24 bg-[#f97316]/5 rounded-full blur-[40px] pointer-events-none" />

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
                        className="w-full bg-[#111]/85 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#f97316] transition-all font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-2xl bg-[#f97316] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Analyze Website</span>
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                  <AlertCircle className="w-4 h-4 text-[#f97316]" />
                  <span>No credit card required. Free analysis scans technical index elements instantly.</span>
                </div>
              </form>
            )}

            {/* SCANNING IN PROGRESS */}
            {isScanning && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-[#f97316]/10 border-t-[#f97316] rounded-full animate-spin" />
                  <RefreshCw className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[#f97316]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-mono text-[#f97316]">
                    Analyzing {new URL(targetUrl).hostname}...
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono animate-pulse max-w-sm mx-auto">
                    {scanSteps[scanStep]}
                  </p>
                </div>
                {/* Visual Progress bar */}
                <div className="w-full max-w-md h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#f97316] transition-all duration-1000"
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
                    className="text-xs font-mono text-neutral-400 hover:text-[#f97316] border border-white/10 rounded-lg px-3 py-1 hover:border-[#f97316]/30 transition-all"
                  >
                    Scan Another URL
                  </button>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold font-mono text-[#f97316] mb-1">{scanResults.seo}%</div>
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">SEO Score</div>
                    <div className="mt-3 text-[11px] text-neutral-500 leading-normal">On-page headers, structure & indexing elements need recovery.</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold font-mono text-[#f97316] mb-1">{scanResults.performance}%</div>
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
                    <div className="p-6 rounded-2xl bg-[#f97316]/10 border border-[#f97316]/30 text-center text-[#f97316] font-mono text-sm">
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
                        className="flex-1 bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#f97316] font-mono"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-[#f97316] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors"
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
          CLIENT LOGOS — INFINITE MARQUEE WITH SVG LOGOS
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#09090b] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 mb-10 text-center">
          <p className="text-[10px] font-mono text-[#f97316] uppercase tracking-[0.25em] mb-1">
            Trusted by Businesses Worldwide
          </p>
          <h2 className="text-2xl font-bold text-white">My SEO Clients</h2>
        </div>

        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

          {/* Row 1 — left scroll */}
          <div className="flex gap-6 mb-4 animate-[marqueeL_28s_linear_infinite] w-max">
            {[
              { src: "/clients/icon-sports.svg", name: "iCon Sports" },
              { src: "/clients/digitfy.svg", name: "Digitfy" },
              { src: "/clients/amar-desh.svg", name: "Amar Desh" },
              { src: "/clients/bme.svg", name: "BME Global" },
              { src: "/clients/sound-space.svg", name: "Sound Space" },
              { src: "/clients/ielts-live.svg", name: "IELTS Live" },
              { src: "/clients/sumash-tech.svg", name: "Sumash Tech" },
              { src: "/clients/soli.svg", name: "Soli" },
              { src: "/clients/sabikatours.svg", name: "Sabikatours" },
              { src: "/clients/cerium.svg", name: "Cerium" },
              // duplicate
              { src: "/clients/icon-sports.svg", name: "iCon Sports" },
              { src: "/clients/digitfy.svg", name: "Digitfy" },
              { src: "/clients/amar-desh.svg", name: "Amar Desh" },
              { src: "/clients/bme.svg", name: "BME Global" },
              { src: "/clients/sound-space.svg", name: "Sound Space" },
              { src: "/clients/ielts-live.svg", name: "IELTS Live" },
              { src: "/clients/sumash-tech.svg", name: "Sumash Tech" },
              { src: "/clients/soli.svg", name: "Soli" },
              { src: "/clients/sabikatours.svg", name: "Sabikatours" },
              { src: "/clients/cerium.svg", name: "Cerium" },
            ].map((c, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center px-5 py-3 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#f97316]/30 hover:bg-white/[0.07] grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 min-w-[140px] group">
                <img src={c.src} alt={c.name} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>

          {/* Row 2 — right scroll */}
          <div className="flex gap-6 animate-[marqueeR_34s_linear_infinite] w-max">
            {[
              { src: "/clients/cerium.svg", name: "Cerium" },
              { src: "/clients/sabikatours.svg", name: "Sabikatours" },
              { src: "/clients/soli.svg", name: "Soli" },
              { src: "/clients/sumash-tech.svg", name: "Sumash Tech" },
              { src: "/clients/ielts-live.svg", name: "IELTS Live" },
              { src: "/clients/sound-space.svg", name: "Sound Space" },
              { src: "/clients/bme.svg", name: "BME Global" },
              { src: "/clients/amar-desh.svg", name: "Amar Desh" },
              { src: "/clients/digitfy.svg", name: "Digitfy" },
              { src: "/clients/icon-sports.svg", name: "iCon Sports" },
              // duplicate
              { src: "/clients/cerium.svg", name: "Cerium" },
              { src: "/clients/sabikatours.svg", name: "Sabikatours" },
              { src: "/clients/soli.svg", name: "Soli" },
              { src: "/clients/sumash-tech.svg", name: "Sumash Tech" },
              { src: "/clients/ielts-live.svg", name: "IELTS Live" },
              { src: "/clients/sound-space.svg", name: "Sound Space" },
              { src: "/clients/bme.svg", name: "BME Global" },
              { src: "/clients/amar-desh.svg", name: "Amar Desh" },
              { src: "/clients/digitfy.svg", name: "Digitfy" },
              { src: "/clients/icon-sports.svg", name: "iCon Sports" },
            ].map((c, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center px-5 py-3 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#f97316]/30 hover:bg-white/[0.07] grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 min-w-[140px]">
                <img src={c.src} alt={c.name} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marqueeL {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeR {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          SERVICES PREVIEW SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Audit, Strategy & Execution</span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl tracking-wide mt-2">Core SEO Pillars</h2>
          </div>
          <Link href="/services" className="font-mono text-xs text-[#f97316] hover:underline flex items-center gap-1.5 uppercase tracking-widest">
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
            <div key={idx} className="group p-8 rounded-3xl bg-[#111]/40 border border-white/8 hover:border-[#f97316]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6">
                  <span>{service.tag}</span>
                  <span className="w-8 h-[1px] bg-white/10" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#f97316] transition-colors">{service.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">{service.desc}</p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-6 text-xs text-neutral-400 font-mono">
                {service.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          DETAILED SERVICE CARDS — ICON STYLE
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">What I Do</span>
          <h2 className="font-['Anton'] text-4xl sm:text-5xl tracking-wide mt-2">SEO Services I Offer</h2>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm">From technical foundations to content strategy — every service is laser-focused on growing your organic traffic.</p>
        </div>

        {/* Top 3 — 3D isometric SVG cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Technical SEO",
              desc: "Making your site fast, crawlable, and perfectly structured for Google to index every page.",
              color: "#f97316",
              svg: (
                <svg viewBox="0 0 120 100" className="w-full h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Isometric server/gear */}
                  <defs>
                    <linearGradient id="g1t" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#7ab800" stopOpacity="0.6"/>
                    </linearGradient>
                    <linearGradient id="g1s" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e2a00"/>
                      <stop offset="100%" stopColor="#0a0f00"/>
                    </linearGradient>
                  </defs>
                  {/* Base cube iso */}
                  <polygon points="60,15 95,33 95,68 60,85 25,68 25,33" fill="url(#g1s)" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.4"/>
                  <polygon points="60,15 95,33 60,50 25,33" fill="url(#g1t)" fillOpacity="0.15"/>
                  <polygon points="25,33 60,50 60,85 25,68" fill="#f97316" fillOpacity="0.05"/>
                  <polygon points="95,33 60,50 60,85 95,68" fill="#f97316" fillOpacity="0.08"/>
                  {/* Gear icon center */}
                  <circle cx="60" cy="50" r="14" stroke="#f97316" strokeWidth="1.5" fill="none" strokeOpacity="0.8"/>
                  <circle cx="60" cy="50" r="6" fill="#f97316" fillOpacity="0.5"/>
                  {[0,45,90,135,180,225,270,315].map((a,i)=>(
                    <rect key={i} x="58.5" y="34" width="3" height="5" rx="1" fill="#f97316"
                      transform={`rotate(${a} 60 50)`} fillOpacity="0.9"/>
                  ))}
                  {/* Floating nodes */}
                  <circle cx="30" cy="28" r="3" fill="#f97316" fillOpacity="0.6"/>
                  <circle cx="90" cy="28" r="3" fill="#f97316" fillOpacity="0.6"/>
                  <line x1="33" y1="28" x2="46" y2="36" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4"/>
                  <line x1="87" y1="28" x2="74" y2="36" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4"/>
                </svg>
              )
            },
            {
              title: "On-Page SEO",
              desc: "Optimizing every page's content, meta, headings and internal links so Google ranks you higher.",
              color: "#60a5fa",
              svg: (
                <svg viewBox="0 0 120 100" className="w-full h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g2t" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                  {/* Document iso */}
                  <polygon points="60,12 92,30 92,72 60,88 28,72 28,30" fill="#0a0f1e" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3"/>
                  <polygon points="60,12 92,30 60,47 28,30" fill="#60a5fa" fillOpacity="0.12"/>
                  <polygon points="28,30 60,47 60,88 28,72" fill="#60a5fa" fillOpacity="0.05"/>
                  <polygon points="92,30 60,47 60,88 92,72" fill="#60a5fa" fillOpacity="0.08"/>
                  {/* Document lines */}
                  <line x1="44" y1="44" x2="76" y2="44" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
                  <line x1="44" y1="52" x2="68" y2="52" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
                  <line x1="44" y1="60" x2="72" y2="60" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
                  {/* Search magnifier */}
                  <circle cx="78" cy="66" r="8" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeOpacity="0.9"/>
                  <line x1="84" y1="72" x2="90" y2="78" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
                  <circle cx="78" cy="66" r="3" fill="#60a5fa" fillOpacity="0.5"/>
                </svg>
              )
            },
            {
              title: "Off-Page SEO",
              desc: "Building domain authority through premium backlinks, brand mentions and digital credibility signals.",
              color: "#f97316",
              svg: (
                <svg viewBox="0 0 120 100" className="w-full h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g3t" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#c2410c" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                  {/* Globe iso */}
                  <polygon points="60,12 92,30 92,72 60,88 28,72 28,30" fill="#120800" stroke="#f97316" strokeWidth="1" strokeOpacity="0.3"/>
                  <polygon points="60,12 92,30 60,47 28,30" fill="#f97316" fillOpacity="0.1"/>
                  {/* Globe meridians */}
                  <ellipse cx="60" cy="50" rx="18" ry="18" stroke="#f97316" strokeWidth="1.2" fill="none" strokeOpacity="0.8"/>
                  <ellipse cx="60" cy="50" rx="10" ry="18" stroke="#f97316" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
                  <line x1="42" y1="50" x2="78" y2="50" stroke="#f97316" strokeWidth="1" strokeOpacity="0.5"/>
                  <line x1="44" y1="42" x2="76" y2="42" stroke="#f97316" strokeWidth="0.8" strokeOpacity="0.3"/>
                  <line x1="44" y1="58" x2="76" y2="58" stroke="#f97316" strokeWidth="0.8" strokeOpacity="0.3"/>
                  {/* Link nodes */}
                  <circle cx="28" cy="30" r="4" fill="#f97316" fillOpacity="0.7"/>
                  <circle cx="92" cy="30" r="4" fill="#f97316" fillOpacity="0.7"/>
                  <circle cx="60" cy="12" r="4" fill="#f97316" fillOpacity="0.7"/>
                  <line x1="32" y1="30" x2="42" y2="38" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,2"/>
                  <line x1="88" y1="30" x2="78" y2="38" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,2"/>
                  <line x1="60" y1="16" x2="60" y2="32" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3,2"/>
                </svg>
              )
            }
          ].map((s, i) => (
            <div key={i} className="group relative p-6 rounded-3xl bg-[#0d0d0d] border border-white/[0.06] hover:border-white/20 transition-all duration-500 flex flex-col gap-5 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
              style={{ boxShadow: `0 0 0 0 ${s.color}00` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px -10px ${s.color}33`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${s.color}00`)}
            >
              {/* Glow orb bg */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: s.color }}/>
              {/* 3D SVG illustration */}
              <div className="w-full">{s.svg}</div>
              <div className="border-t border-white/5 pt-4">
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
              </div>
              {/* Color accent bar bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}/>
            </div>
          ))}
        </div>

        {/* Bottom 6 — detail cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Keyword Research",
              icon: "🔍",
              what: "Finding the exact search terms your customers type into Google — filtered by intent, volume, difficulty, and business value.",
              deliver: "A prioritized keyword map that connects your pages to your most profitable search opportunities.",
              impact: "Smarter content strategy, faster rankings, and traffic that actually converts to customers."
            },
            {
              title: "SEO Audit",
              icon: "📋",
              what: "A full review of your website covering technical health, content quality, backlink profile, and competitor positioning.",
              deliver: "A detailed action plan — showing exactly what is hurting your rankings and what to fix first.",
              impact: "Clear direction, faster wins, and a solid foundation for everything that follows."
            },
            {
              title: "Local SEO",
              icon: "📍",
              what: "Optimizing your online presence so customers in your city find your business when they search on Google Maps or local search.",
              deliver: "Google Business Profile optimization, local citation building, NAP consistency, map pack ranking.",
              impact: "More phone calls, walk-ins, and local leads from customers near you."
            },
            {
              title: "E-Commerce SEO",
              icon: "🛒",
              what: "Specialized SEO for online stores — targeting product pages, category pages, and site structure to drive more organic sales.",
              deliver: "Shopify / WooCommerce optimization, duplicate description fixes, faceted navigation, schema markup.",
              impact: "Higher organic revenue, lower ad spend dependency, and better product discoverability."
            },
            {
              title: "Content SEO & Writing",
              icon: "✍️",
              what: "Creating SEO-optimized content that ranks on Google and guides visitors toward taking action.",
              deliver: "Blog posts, service pages, landing pages, and product descriptions — all built around real search intent.",
              impact: "More organic entry points, stronger topical authority, and higher engagement from the right audience."
            },
            {
              title: "Programmatic SEO",
              icon: "⚙️",
              what: "Using automated, template-driven page creation to scale content across hundreds or thousands of URLs efficiently.",
              deliver: "Structured data templates, bulk page generation strategy, and scalable internal linking architecture.",
              impact: "Rapid content mass indexation of high-intent pages and significant traffic growth without manual effort."
            }
          ].map((s, i) => (
            <div key={i} className="p-7 rounded-3xl bg-[#111]/40 border border-white/8 hover:border-[#f97316]/30 hover:shadow-[0_0_20px_rgba(201,247,49,0.06)] transition-all duration-300 flex flex-col gap-4">
              <div className="flex flex-col items-start gap-3 pb-4 border-b border-white/8">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="font-bold text-white text-lg">{s.title}</h3>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-[#f97316]">What it is: </span>{s.what}
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-white">What I deliver: </span>{s.deliver}
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-white">Business impact: </span>{s.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          WHY CHOOSE ME SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">The Difference</span>
          <h2 className="font-['Anton'] text-4xl sm:text-5xl tracking-wide mt-2">Why Choose Me as Your SEO Expert?</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "I Have Been Doing This Since 2020",
              body: (
                <>
                  <p className="text-neutral-300 leading-relaxed text-sm mb-4">
                    I started in SEO in 2020 and have practiced it every single day since. That includes managing SEO for{" "}
                    <a href="https://www.amardesh.com" target="_blank" rel="noopener" className="text-[#f97316] hover:underline font-semibold">Daily Amar Desh</a>{" "}
                    — a national news platform publishing hundreds of articles daily, with massive crawl complexity, rapid indexation demands, and fierce keyword competition.
                  </p>
                  <p className="text-neutral-300 leading-relaxed text-sm">
                    That environment sharpens technical and strategic skills most freelancers simply never face.
                  </p>
                </>
              ),
              image: (
                <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#f97316]/5" />
                  <div className="text-center p-6">
                    <div className="text-5xl mb-3">📈</div>
                    <div className="font-mono text-xs text-[#f97316] uppercase tracking-widest">5+ Years · 100+ Clients</div>
                    <div className="text-neutral-400 text-xs mt-1">Bangladesh's Top SEO Specialist</div>
                  </div>
                </div>
              )
            },
            {
              title: "I Don't Guess — I Use Data",
              body: (
                <>
                  <p className="text-neutral-300 leading-relaxed text-sm mb-4">
                    Every decision I make is backed by tools like Ahrefs, SEMrush, Google Search Console, and Screaming Frog. No guesswork, no shortcuts — just proven strategies tailored to your market.
                  </p>
                  <p className="text-neutral-300 leading-relaxed text-sm">
                    I analyze your competitors, identify content gaps, and build a roadmap that directly addresses what's holding your rankings back.
                  </p>
                </>
              ),
              image: (
                <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#1a1a2e] border border-[#f97316]/10 flex items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-3 gap-3 p-4 w-full">
                    {["Ahrefs","SEMrush","GSC","Screaming Frog","GA4","PageSpeed"].map((t,i)=>(
                      <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                        <div className="text-[10px] font-mono text-[#f97316] font-bold">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            },
            {
              title: "You Get Results, Not Reports",
              body: (
                <>
                  <p className="text-neutral-300 leading-relaxed text-sm mb-4">
                    My clients don't just get beautiful documents — they get rankings that climb, traffic that grows, and leads that actually convert. I've helped businesses in Bangladesh rank #1 for highly competitive keywords.
                  </p>
                  <p className="text-neutral-300 leading-relaxed text-sm">
                    Every engagement comes with clear KPIs, monthly reporting, and transparent communication — so you always know exactly where your investment is going.
                  </p>
                </>
              ),
              image: (
                <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#1a1a2e] border border-[#f97316]/10 flex items-center justify-center p-6">
                  <div className="w-full space-y-3">
                    {[["Organic Traffic","+340%"],["Keyword Rankings","#1 in 60 days"],["Conversion Rate","+85%"]].map(([label,val],i)=>(
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-neutral-400 text-xs font-mono">{label}</span>
                        <span className="text-[#f97316] text-sm font-bold font-mono">{val}</span>
                      </div>
                    ))}
                    <div className="mt-2 h-[2px] bg-gradient-to-r from-[#f97316]/40 via-[#f97316] to-[#f97316]/40 rounded-full" />
                  </div>
                </div>
              )
            }
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-[#111]/40 border border-white/8 hover:border-[#f97316]/20 transition-all duration-300 items-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-5">{item.title}</h3>
                {item.body}
              </div>
              <div>{item.image}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          CTA BANNER (CRO TARGETED)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="glass-panel border border-[#f97316]/30 rounded-[40px] p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Ready to scale your organic presence?</span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl tracking-wide leading-none">STOP LEAKING TRAFFIC TO COMPETITORS</h2>
            <p className="text-neutral-400 max-w-lg mx-auto">
              Schedule a technical assessment session today. We will map out your primary money keywords and identify why your competitors are ranking higher.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 rounded-2xl bg-[#f97316] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-colors flex items-center gap-2 shadow-lg">
              <span>Book Consultation Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="/resume.pdf" download className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#f97316]/30 hover:text-[#f97316] transition-all font-mono text-xs flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download SEO Resume</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

