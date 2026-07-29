"use client";

import React from "react";
import Link from "next/link";
import { 
  BarChart3, ArrowUpRight, CheckCircle2, TrendingUp, 
  ChevronRight, Calendar, Tag, ShieldCheck 
} from "lucide-react";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: "ecommerce-scale",
      title: "Scaling E-Commerce Organic Sales by 320%",
      client: "International Apparel Retailer",
      date: "Oct 2025 - Mar 2026",
      category: "E-Commerce SEO",
      metrics: {
        traffic: "+320% Traffic Growth",
        keywords: "450+ Keywords ranked Page 1",
        ctr: "from 1.8% to 4.2% CTR",
        conversions: "+180% Sales Revenue"
      },
      summary: "Resolved nested URL duplicates, configured Product & Offer JSON-LD schema feeds, and executed category siloing to drive purchase intent.",
      svgPath: "M10,80 Q50,75 90,65 T170,40 T250,15 T330,10 T410,5 T490,2",
      results: [
        "Eliminated duplicate product URL parameters indexation errors.",
        "Injected local pricing schemas for regional storefront operations.",
        "Aired content maps covering transactional and informational queries."
      ]
    },
    {
      id: "local-service-dhaka",
      title: "Dominating Dhaka Real Estate Search Map Packs",
      client: "Luxury Apartment Developer",
      date: "Jun 2025 - Dec 2025",
      category: "Local SEO & Lead Gen",
      metrics: {
        traffic: "+210% Local Clicks",
        keywords: "Top 3 spots for high-value terms",
        ctr: "from 2.2% to 6.8% Map CTR",
        conversions: "+250% Inquiries Form"
      },
      summary: "Cleaned up name-address-phone citation networks, built geo-targeted landings copy, and organized local BD links profile.",
      svgPath: "M10,80 Q50,60 90,65 T170,48 T250,30 T330,22 T410,15 T490,8",
      results: [
        "Maintained citation consistency across 40 local BD directories.",
        "Structured local business schema mapping coordinates and hours.",
        "Acquired high-relevance editorial guest posts on Dhaka directories."
      ]
    },
    {
      id: "wp-blog-monetization",
      title: "WordPress Technical Recovery: Reclaiming -45% Traffic Loss",
      client: "Automotive Affiliate Platform",
      date: "Feb 2025 - Jun 2025",
      category: "Technical Recovery",
      metrics: {
        traffic: "+180% Organic Recovery",
        keywords: "1,200+ Keywords reclaimed",
        ctr: "from 1.5% to 3.1% CTR",
        conversions: "+120% Affiliate Clicks"
      },
      summary: "Recovered index drops from Core Updates. Fixed JavaScript layout shifts (CLS), clean canonical loops, and cleaned tag archives.",
      svgPath: "M10,75 Q50,90 90,85 T170,70 T250,45 T330,28 T410,12 T490,5",
      results: [
        "Repaired pagination loop warnings returning 404 header status.",
        "Adjusted critical rendering paths (yielding 98 score PageSpeed).",
        "Configured Article & Author schemas establishing E-E-A-T credentials."
      ]
    }
  ];

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#c9f731] selection:text-[#050505] overflow-x-hidden pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#c9f731]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#c9f731]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 z-10 relative">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9f731] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#c9f731]">CASE STUDIES</span>
        </nav>

        {/* Title */}
        <div className="mb-16">
          <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em] mb-3 block">Proven Organic Audited Outcomes</span>
          <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
            SEO Case Studies
          </h1>
        </div>

        {/* Case Studies Loop */}
        <div className="space-y-20">
          {caseStudies.map((cs, idx) => (
            <div 
              key={cs.id}
              className="glass-panel border border-white/8 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#c9f731]">
                    <span className="px-2.5 py-1 rounded bg-[#c9f731]/10 border border-[#c9f731]/30 uppercase">
                      {cs.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {cs.date}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3.5xl font-bold leading-tight text-white">
                    {cs.title}
                  </h2>
                  <div className="text-sm text-neutral-400 font-mono">
                    Client Industry: <code className="text-white">{cs.client}</code>
                  </div>
                  
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {cs.summary}
                  </p>

                  <div className="border-t border-white/5 pt-6">
                    <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">Key Technical Executions</h3>
                    <ul className="space-y-2.5">
                      {cs.results.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-[#c9f731] flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right metrics and SVG traffic growth graph */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Traffic growth SVG chart */}
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>ORGANIC TRAFFIC ROADMAP</span>
                      <span className="text-[#c9f731] flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Live data
                      </span>
                    </div>

                    <div className="h-36 w-full relative">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                        <div className="h-px bg-white" />
                        <div className="h-px bg-white" />
                        <div className="h-px bg-white" />
                        <div className="h-px bg-white" />
                      </div>
                      
                      {/* SVG line */}
                      <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c9f731" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#c9f731" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path 
                          d={cs.svgPath} 
                          fill="none" 
                          stroke="#c9f731" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />
                        <path 
                          d={`${cs.svgPath} L500,100 L0,100 Z`} 
                          fill={`url(#grad-${idx})`}
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 pt-1">
                      <span>CRAWL START</span>
                      <span>MONTH 3</span>
                      <span>MONTH 6 (CURRENT)</span>
                    </div>
                  </div>

                  {/* Metrics boxes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4.5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Organic Traffic</div>
                      <div className="text-sm font-bold text-[#c9f731] font-mono">{cs.metrics.traffic.split(" ")[0]}</div>
                    </div>
                    <div className="p-4.5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Keywords</div>
                      <div className="text-sm font-bold text-white font-mono">{cs.metrics.keywords.split(" ")[0]}</div>
                    </div>
                    <div className="p-4.5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">CTR Boost</div>
                      <div className="text-sm font-bold text-white font-mono">{cs.metrics.ctr.split(" ")[2]}</div>
                    </div>
                    <div className="p-4.5 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Conversions</div>
                      <div className="text-sm font-bold text-[#c9f731] font-mono">{cs.metrics.conversions.split(" ")[0]}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-20 pt-16 border-t border-white/5 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white font-['Anton'] tracking-wider uppercase">Scale Your Organic Conversions Like These Clients</h2>
          <p className="text-sm text-neutral-400">
            Let's evaluate your keyword footprints and resolve underlying crawl code bottlenecks.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/seo-audit" className="px-6 py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors flex items-center gap-1">
              <span>Run Free Crawl Scan</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
