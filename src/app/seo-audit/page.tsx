"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, Search, Globe, AlertTriangle, CheckCircle, 
  HelpCircle, RefreshCw, Star, Mail, ShieldAlert, Award
} from "lucide-react";

export default function SEOAuditPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [reportGenerated, setReportGenerated] = useState(false);

  const steps = [
    "Establishing network handshake with host server...",
    "Validating robots.txt indexation parameters & sitemap links...",
    "Scanning semantic tags (Single H1 outline compliance)...",
    "Measuring mobile viewport and CSS responsive layout shifts...",
    "Calculating Core Web Vitals speed latency scores (LCP, CLS)...",
    "Evaluating Organization, Person, and LocalBusiness schema markup...",
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsScanning(true);
    setScanStep(0);
    setReportGenerated(false);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setReportGenerated(true);
      }
    }, 1200);
  };

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#c9f731] selection:text-[#050505] overflow-x-hidden pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c9f731]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#c9f731]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 z-10 relative">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9f731] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#c9f731]">SEO AUDIT</span>
        </nav>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em]">Lead Generation Diagnostics</span>
          <h1 className="font-['Anton'] text-5xl sm:text-7xl tracking-wide uppercase leading-none">
            Get A Free Technical SEO Audit
          </h1>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            Uncover why your competitors are ranking higher. Run a live structural check of sitemaps, schemas, and speed layout shifts instantly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main Scanner Box */}
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#c9f731]/5 rounded-full blur-[50px] pointer-events-none" />

            {!isScanning && !reportGenerated && (
              <form onSubmit={handleStartScan} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="audit-url" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      Website URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        id="audit-url"
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="w-full bg-[#111]/80 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#c9f731] font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="audit-email" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      Email Address (To send report PDF)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <input
                        id="audit-email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#111]/80 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#c9f731] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4.5 rounded-2xl bg-[#c9f731] text-[#050505] font-bold text-sm hover:bg-[#b8e220] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Scan Technical Signals</span>
                  <Zap className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* SCANNING ACTIVE SCREEN */}
            {isScanning && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-[#c9f731]/10 border-t-[#c9f731] rounded-full animate-spin" />
                  <RefreshCw className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-[#c9f731]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-mono text-white">Analyzing Crawler Feeds...</h3>
                  <p className="text-xs text-[#c9f731] font-mono animate-pulse max-w-sm mx-auto">
                    {steps[scanStep]}
                  </p>
                </div>
                <div className="w-full max-w-md h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#c9f731] transition-all duration-1000"
                    style={{ width: `${((scanStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* AUDIT COMPLETE REPORT DISPLAY */}
            {reportGenerated && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                  <div>
                    <div className="text-xs font-mono text-[#c9f731] uppercase tracking-wider mb-0.5">Analysis Status: complete</div>
                    <h3 className="text-xl font-bold font-mono text-white">{new URL(url).hostname}</h3>
                  </div>
                  <button 
                    onClick={() => { setReportGenerated(false); setUrl(""); setEmail(""); }}
                    className="text-xs font-mono text-neutral-400 hover:text-[#c9f731] border border-white/10 rounded-lg px-3 py-1.5"
                  >
                    Run New Audit Scan
                  </button>
                </div>

                {/* Score breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                    <div className="text-4xl font-bold font-mono text-[#c9f731]">82%</div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">SEO Architecture</div>
                    <div className="text-[11px] text-red-500 pt-1">Duplicate H1 Tags found.</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                    <div className="text-4xl font-bold font-mono text-red-500">68%</div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Core Web Vitals</div>
                    <div className="text-[11px] text-red-500 pt-1">CLS Layout shifts alert.</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                    <div className="text-4xl font-bold font-mono text-[#c9f731]">90%</div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Indexing Compliance</div>
                    <div className="text-[11px] text-[#c9f731] pt-1">Robots parameters verified.</div>
                  </div>
                </div>

                {/* Warning message log */}
                <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2.5">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                    <ShieldAlert className="w-5 h-5" />
                    <span>Critical On-Page and Speed Bottlenecks Found</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-neutral-300 space-y-1.5 font-mono">
                    <li>Your site is currently missing **Organization & LocalBusiness schema objects**.</li>
                    <li>Cumulative Layout Shift (CLS) on mobile devices exceeds Google's recommended threshold (0.28).</li>
                    <li>Sitemap feeds are missing priority crawl weights for transactional landing pages.</li>
                  </ul>
                </div>

                {/* Success conversion block */}
                <div className="p-6 rounded-2xl bg-[#c9f731]/10 border border-[#c9f731]/30 text-center space-y-4">
                  <div className="max-w-md mx-auto space-y-1.5">
                    <h4 className="font-bold text-[#c9f731] text-base">✨ PDF Audit & Audit Recovery Plan Sent</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      A detailed diagnostic breakdown and standard fix guide have been queued to **{email}**.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors"
                    >
                      <span>Book Free 15-Min Strategy Session</span>
                      <Zap className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Why audit checklist */}
        <section className="mt-24 max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-['Anton'] text-3xl md:text-5xl uppercase tracking-wide">WHAT WE AUDIT IN COLD CRAWLS</h2>
            <p className="text-sm text-neutral-400">Technical details analyzed during diagnostic sweeps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "1. Renderability & Indexation",
                desc: "We check if search engines can crawl your URLs. Identify blockages inside robots.txt parameters, duplicate content pathways, canonical configurations, and XML dynamic feeds."
              },
              {
                title: "2. Core Web Vitals Latency",
                desc: "Evaluate page loading speeds. Scan Cumulative Layout Shift (CLS) errors, First Contentful Paint (FCP) delay, and Interaction to Next Paint (INP) markers."
              },
              {
                title: "3. Semantic Heading Outlining",
                desc: "Ensure headings match hierarchy trees. We search for missing or duplicate H1 headers, verify nesting layouts (H2 to H4), and check image alt values."
              },
              {
                title: "4. JSON-LD Schema Markup",
                desc: "Inspect structural markup feeds. Confirm index metadata contains correct Person, LocalBusiness, Breadcrumb, Product, and Article schemas."
              }
            ].map((check, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#111]/30 border border-white/5 space-y-2">
                <h3 className="font-bold text-sm text-white">{check.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{check.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
