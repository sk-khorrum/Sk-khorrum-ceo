"use client";

import React from "react";
import Link from "next/link";
import { 
  Award, Briefcase, Calendar, ShieldCheck, Target, 
  Settings, CheckCircle, ChevronRight, GraduationCap, Laptop 
} from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2024 - Present",
      title: "Senior SEO Consultant & Performance Engineer",
      company: "Enterprise Retainers & Global Brands",
      desc: "Architected international SEO siloing and speed optimizations for Shopify and WordPress sites, scaling traffic by over 300% on average."
    },
    {
      year: "2022 - 2024",
      title: "Technical SEO Expert & Local search lead",
      company: "Bangladesh Digital Agency Group",
      desc: "Ran localized search campaigns targeting Dhaka and major hubs, ranking dozens of service businesses in the top 3 spots of Google Map packs."
    },
    {
      year: "2020 - 2022",
      title: "Full Stack SEO Developer & Marketer",
      company: "Freelance Consultancy Hub",
      desc: "Blended raw frontend programming (Next.js/React) with search engine indexing signals, resolving performance layout shifts (CLS) for clients."
    }
  ];

  const tools = [
    { name: "Ahrefs & SEMrush", category: "Keyword & Competitor Auditing" },
    { name: "Screaming Frog", category: "Technical Crawl Diagnostics" },
    { name: "Google Search Console", category: "Indexation & XML Sitemaps" },
    { name: "Google Analytics 4 & GTM", category: "Conversion Tracking & CRO" },
    { name: "PageSpeed Insights & Webpagetest", category: "Core Web Vitals Tuning" },
    { name: "Yoast / RankMath", category: "WordPress Metadata Schema" }
  ];

  const skills = [
    "Technical SEO Audit", "On-Page Schema Injection", "Off-Page Quality Backlink Acquisition",
    "WordPress Speed Optimization", "Shopify microdata configuration", "Conversion Rate Optimization (CRO)",
    "Core Web Vitals Engineering", "Dynamic Sitemap & Robots management", "Geo-targeted Local SEO"
  ];

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#c9f731] selection:text-[#050505] overflow-x-hidden pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c9f731]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#c9f731]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 z-10 relative">
        {/* Breadcrumb Schema navigation (Manual rendering for visual aesthetics) */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9f731] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#c9f731]">ABOUT</span>
        </nav>

        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em] mb-3 block">My Profile & EEAT credentials</span>
          <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
            SK KHORRUM: Google SEO Specialist
          </h1>
        </div>

        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-white leading-snug">
              Leveraging deep technical audit logic and search algorithms to position brands in Dhaka & worldwide at spot #1.
            </h2>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Since 2020, I have operated at the intersection of web development, user experience design, and Google ranking logic. I do not run cookie-cutter search updates; instead, I perform systematic audits of client assets, resolving underlying crawl blockages, CSS layout shifts, and semantic heading errors.
            </p>
            <p className="text-neutral-400 leading-relaxed text-sm">
              My client relationships are built upon absolute integrity, measurable data, and transparent monthly performance cycles. Whether optimizing localized map listings in Bangladesh or deploying multi-lingual schema hubs for international retail stores, I build search strategies designed to deliver compounding customer acquisitions.
            </p>
            
            {/* Vision and Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 rounded-2xl bg-[#111]/50 border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#c9f731]">
                  <Target className="w-5 h-5" />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Our Mission</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  To eliminate digital invisibility. We deploy clean, lightning-fast technical SEO layouts that satisfy search algorithms and capture organic leads.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#111]/50 border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#c9f731]">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Our Vision</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  To establish SK Khorrum as the benchmark of technical search consulting in Bangladesh, delivering world-class performance and E-E-A-T.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            {/* Visual profile details card */}
            <div className="glass-panel border border-white/10 rounded-3xl p-6 space-y-6">
              <img
                src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
                alt="SK Khorrum Portrait"
                className="w-full h-48 object-cover rounded-2xl grayscale border border-white/5"
              />
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-sm">
                  <span className="text-neutral-400 font-mono">Based in:</span>
                  <span className="font-semibold text-white">Dhaka, Bangladesh</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-sm">
                  <span className="text-neutral-400 font-mono">SEO Experience:</span>
                  <span className="font-semibold text-white">5+ Years (Since 2020)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5 text-sm">
                  <span className="text-neutral-400 font-mono">Specialization:</span>
                  <span className="font-semibold text-white text-[#c9f731]">Technical & Core Web Vitals</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-mono">Availability:</span>
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c9f731] animate-ping" />
                    Consulting Open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────────
            EXPERIENCE TIMELINE
            ───────────────────────────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-12">
            <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em] mb-2 block">Career Journey</span>
            <h2 className="font-['Anton'] text-3xl md:text-5xl tracking-wide uppercase">Chronological History</h2>
          </div>

          <div className="space-y-6 max-w-4xl">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#111]/30 border border-white/5 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-[#c9f731]/30 transition-all duration-300">
                <div className="space-y-1.5 md:w-1/3">
                  <div className="text-xs font-mono text-[#c9f731] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{m.year}</span>
                  </div>
                  <div className="text-xs font-mono text-neutral-500">{m.company}</div>
                </div>
                <div className="space-y-2 md:w-2/3">
                  <h3 className="text-lg font-bold text-white">{m.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────────
            SKILLS & TOOLSTACK
            ───────────────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Skills Checklist */}
          <div className="space-y-8">
            <div>
              <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em] mb-2 block">Areas of Mastery</span>
              <h2 className="font-['Anton'] text-3xl md:text-5xl tracking-wide uppercase">Core Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#111]/30 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-[#c9f731] flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-mono text-neutral-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="space-y-8">
            <div>
              <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em] mb-2 block">Technical Infrastructure</span>
              <h2 className="font-['Anton'] text-3xl md:text-5xl tracking-wide uppercase">Audit Diagnostics Stack</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#111]/30 border border-white/5 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-white">
                    <Laptop className="w-4 h-4 text-[#c9f731]" />
                    <span className="text-sm font-bold">{tool.name}</span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────────
            CTA BAR
            ───────────────────────────────────────────────────────────────────────────── */}
        <section className="pt-16 border-t border-white/5 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-white">Require custom diagnostic search analysis?</h2>
          <p className="text-sm text-neutral-400">
            Let's evaluate your search assets, Crawlability obstacles, and key terms in Dhaka or globally. Schedule your initial consultation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="px-6 py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors flex items-center gap-1.5">
              <span>Connect Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
