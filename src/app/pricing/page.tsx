"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, HelpCircle, Zap, DollarSign, ChevronRight } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Technical SEO Audit",
      price: "$499",
      period: "one-time fee",
      desc: "Perfect for companies looking to audit underlying crawl blockages, speed bottlenecks, sitemaps, and schemas.",
      features: [
        "Full Screaming Frog crawl analysis",
        "Core Web Vitals latency report",
        "Canonical & Robots parameter check",
        "Dynamic JSON-LD Schema blueprints",
        "60-min walkthrough screen share",
        "30-day email follow-up support"
      ],
      cta: "Request Crawl Audit",
      popular: false
    },
    {
      name: "Local Authority Setup",
      price: "$349",
      period: "/ month",
      desc: "For local service companies aiming to dominate search coordinates in Dhaka and regional map packs.",
      features: [
        "GMB listing setup & optimization",
        "40+ local directory citations/month",
        "Review acquisition automation setup",
        "Geo-targeted landing copywriting",
        "Monthly rankings progress tracking",
        "Weekly email check-ins support"
      ],
      cta: "Start Local Campaign",
      popular: true
    },
    {
      name: "Ecommerce & Enterprise",
      price: "$799",
      period: "/ month",
      desc: "Sustained high-velocity organic campaign targeting transactional queries, international silos, and platform code.",
      features: [
        "Shopify / WordPress code tuning",
        "Dynamic product schema feeds",
        "Topical authority keyword mapping",
        "Niche guest post outreach links",
        "Duplicate url parameters auditing",
        "GSC verification & sitemap updates"
      ],
      cta: "Start Scaling Search",
      popular: false
    }
  ];

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
          <span className="text-[#f97316]">PRICING</span>
        </nav>

        {/* Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Flexible Investment Models</span>
          <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
            Transparent Pricing
          </h1>
          <p className="text-sm text-neutral-400">
            No long-term lock-in agreements. Fixed pricing with clear weekly tracking sheets and tangible results metrics.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((p, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-[32px] bg-[#111]/40 border flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 relative ${
                p.popular 
                  ? "border-[#f97316]/40 shadow-[0_0_40px_rgba(201,247,49,0.06)]" 
                  : "border-white/8"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#f97316] text-[#050505] font-mono text-[9px] font-bold uppercase tracking-wider">
                  Highly Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1 font-mono">{p.desc}</p>
                </div>

                <div className="flex items-baseline gap-1.5 border-y border-white/5 py-5">
                  <div className="flex items-center text-3xl sm:text-4.5xl font-['Anton'] text-white">
                    <DollarSign className="w-6 h-6 text-[#f97316]" />
                    <span>{p.price.replace("$", "")}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">{p.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 pt-2">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#f97316] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className={`w-full py-4.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                    p.popular
                      ? "bg-[#f97316] text-[#050505] hover:bg-[#b8e220]"
                      : "bg-white/5 border border-white/10 text-white hover:border-[#f97316]/40 hover:text-[#f97316]"
                  }`}
                >
                  <span>{p.cta}</span>
                  <Zap className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Pricing FAQ Section */}
        <section className="glass-panel border border-white/8 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Clear Expectations</span>
            <h2 className="font-['Anton'] text-2xl sm:text-3.5xl tracking-wide uppercase">PRICING FAQS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "What is your milestone setup? Do you charge upfront?",
                a: "For technical audit projects, we process 50% retainer deposit to initiate crawl cycles, with remaining 50% processed upon presentation of recovery guide. Monthly campaigns run on fixed billing Cycles."
              },
              {
                q: "Do you offer localized pricing for Bangladesh companies?",
                a: "Yes, citation updates and GMB local work for local retail outlets can be adjusted. Message us to request a custom billing estimate."
              },
              {
                q: "What is the typical organic ROI timeline?",
                a: "SEO is compounding. Initial crawl optimization fixes provide immediate speed score uplifts. Keyword index mappings deliver clicks and leads in 90 to 180 days."
              },
              {
                q: "Are we tied to a contract period?",
                a: "No, monthly SEO retainers are on rolling month-to-month schedules. You are free to upgrade, pause, or close campaigns with a 15-day notice."
              }
            ].map((faq, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bold text-sm text-white flex items-start gap-1.5">
                  <span className="text-[#f97316]">Q:</span>
                  {faq.q}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

