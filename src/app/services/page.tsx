"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, Search, Globe, MapPin, Code2, ShoppingCart, 
  SearchCode, ShieldCheck, ChevronRight, BarChart4, 
  HelpCircle, CheckCircle2, DollarSign
} from "lucide-react";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Modules" },
    { id: "core", label: "Core Search SEO" },
    { id: "cms", label: "CMS & Platforms" },
    { id: "strategy", label: "Audit & Strategy" }
  ];

  const services = [
    {
      id: "tech-seo",
      category: "core",
      icon: <Code2 className="w-6 h-6 text-[#f97316]" />,
      title: "Technical SEO Expert Audit",
      desc: "Optimizing backend ranking indicators: rendering, page load velocities (Core Web Vitals), crawl depth, dynamic XML sitemaps, robots configurations, and schema injections.",
      deliverables: ["LCP & CLS layout shift fixes", "Sitemap hierarchy structuring", "Robots parameters configuration"],
      price: "$499/one-time"
    },
    {
      id: "on-page",
      category: "core",
      icon: <SearchCode className="w-6 h-6 text-[#f97316]" />,
      title: "On-Page SEO Optimization",
      desc: "Perfecting headings outlines, metadata descriptions, primary keyword mappings, and internal links networks to elevate your content relevance in Google Bangladesh search engines.",
      deliverables: ["Single H1 heading setups", "Meta title optimizations", "Semantic content siloing"],
      price: "$299/monthly"
    },
    {
      id: "off-page",
      category: "core",
      icon: <ShieldCheck className="w-6 h-6 text-[#f97316]" />,
      title: "Off-Page Authority Building",
      desc: "Safe, white-hat link acquisition strategies to increase domain authority and search engine trust indicators without triggering penalty filters.",
      deliverables: ["High-authority link acquisition", "Brand mention development", "Broken link discovery & fixing"],
      price: "$599/monthly"
    },
    {
      id: "local-seo",
      category: "core",
      icon: <MapPin className="w-6 h-6 text-[#f97316]" />,
      title: "Local SEO Bangladesh",
      desc: "Map Pack positioning for targeted keywords in Dhaka and regional search profiles. Command geographical search listings to generate local customers.",
      deliverables: ["Google Business Profile setup", "Geo-targeted citations creation", "Review acquisition pipelines"],
      price: "$349/monthly"
    },
    {
      id: "wp-seo",
      category: "cms",
      icon: <Code2 className="w-6 h-6 text-[#f97316]" />,
      title: "WordPress SEO Expert Care",
      desc: "Comprehensive database speed cleanup, plugin setups (RankMath/Yoast), tag hierarchy checks, and category siloing for WordPress publishing.",
      deliverables: ["RankMath schema optimization", "Database cache setups", "Asset load reduction fixes"],
      price: "$399/monthly"
    },
    {
      id: "shopify-seo",
      category: "cms",
      icon: <ShoppingCart className="w-6 h-6 text-[#f97316]" />,
      title: "Shopify SEO & Ecommerce",
      desc: "E-commerce schema solutions (Product, Review, Offer JSON-LD), product description updates, collections indexation audits, and pagination repairs.",
      deliverables: ["Shopify microdata injections", "Product page SEO copywriting", "Pagination canonical setups"],
      price: "$499/monthly"
    },
    {
      id: "intl-seo",
      category: "cms",
      icon: <Globe className="w-6 h-6 text-[#f97316]" />,
      title: "International SEO Structures",
      desc: "Hreflang tagging arrays, geo-targeting configurations in Search Console, and multi-lingual architecture setups to capture rankings in global markets.",
      deliverables: ["Hreflang tag audits", "Multi-folder URL setups", "Global keyword mapping"],
      price: "$799/monthly"
    },
    {
      id: "keyword-research",
      category: "strategy",
      icon: <Search className="w-6 h-6 text-[#f97316]" />,
      title: "Keyword & Competitor Audits",
      desc: "In-depth identification of high-intent search terms. Find competitor gaps, target country search volumes, and outline transactional opportunities.",
      deliverables: ["Search volume data analysis", "Competitor gaps mapping", "Keyword intent prioritization"],
      price: "$199/one-time"
    },
    {
      id: "link-building",
      category: "core",
      icon: <ShieldCheck className="w-6 h-6 text-[#f97316]" />,
      title: "Quality Link Acquisition",
      desc: "Acquire high-quality editorial placements, anchor text optimizations, and partner blog outreach to pass search power to target landing pages.",
      deliverables: ["Niche guest post outreach", "Natural anchor profiling", "Toxic backlink cleanups"],
      price: "$499/monthly"
    },
    {
      id: "content-strategy",
      category: "strategy",
      icon: <BarChart4 className="w-6 h-6 text-[#f97316]" />,
      title: "SEO Content Strategy & Copywriting",
      desc: "Creating E-E-A-T compliant contents outlines. Research topical authorization silos to guide search crawlers in recognizing you as a subject master.",
      deliverables: ["Topical authority maps", "Content outline blueprints", "User-intent optimized drafts"],
      price: "$399/monthly"
    },
    {
      id: "seo-consultation",
      category: "strategy",
      icon: <HelpCircle className="w-6 h-6 text-[#f97316]" />,
      title: "1-on-1 SEO Consultations",
      desc: "Scheduled video screen share evaluations. Review rankings blocks, index warnings, organic drops, and build actionable recovery plans.",
      deliverables: ["60-minute video analysis session", "Fix action plan dashboard", "30-day email follow-up support"],
      price: "$150/hour"
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#f97316] selection:text-[#050505] overflow-x-hidden pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 z-10 relative">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f97316] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#f97316]">SERVICES</span>
        </nav>

        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em] mb-3 block">Organic Growth Solutions</span>
            <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
              Premium SEO Services
            </h1>
          </div>
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border ${
                  activeCategory === cat.id
                    ? "bg-[#f97316] text-[#050505] border-[#f97316] font-bold"
                    : "bg-white/5 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group p-8 rounded-3xl bg-[#111]/40 border border-white/8 hover:border-[#f97316]/30 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#f97316]/10 group-hover:border-[#f97316]/25 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#f97316] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div>
                {/* Deliverables checklist */}
                <div className="border-t border-white/5 pt-6 mb-6">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">Deliverables Include:</div>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#f97316]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[#f97316]" />
                    <span className="font-mono text-sm font-bold text-white">{service.price}</span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 text-xs font-mono text-[#f97316] hover:underline uppercase tracking-wider"
                  >
                    <span>Request Brief</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Model & FAQ */}
        <section className="glass-panel border border-white/8 rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Execution Framework</span>
              <h2 className="font-['Anton'] text-3xl md:text-4xl tracking-wide uppercase">HOW WE EXECUTE SEO CAMPAIGNS</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Rankings represent the outcome, not the start. I apply an engineering-driven methodology to SEO operations to assure success.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  { num: "01", name: "Comprehensive Audit Diagnostics", desc: "Crawling underlying code structure, canonical chains, loading bottlenecks." },
                  { num: "02", name: "Semantic Outlining & Copy", desc: "Writing user-intent structures, mapping keywords, and resolving heading errors." },
                  { num: "03", name: "Crawl Authority Expansion", desc: "Safe authority building, white-hat link acquisition, and localized Citations." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="font-['Anton'] text-xl text-[#f97316] mt-0.5">{step.num}</div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{step.name}</h4>
                      <p className="text-xs text-neutral-400 leading-normal">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Frequently Asked Questions</span>
              <h2 className="font-['Anton'] text-3xl md:text-4xl tracking-wide uppercase">SERVICES FAQS</h2>
              <div className="space-y-4">
                {[
                  { q: "How long does local SEO in Bangladesh take to rank?", a: "Typically, local optimization (Google Map pack rankings and local search queries) begins to deliver leads within 30 to 90 days. High-competition keywords may require extended cycles." },
                  { q: "Do you offer clean custom website development too?", a: "Yes, I code SEO-optimized Next.js and React interfaces. These sites feature near-perfect Core Web Vitals speed scores, aiding search ranks." },
                  { q: "Are your backlink methods safe from Google updates?", a: "Absolutely. I do not buy PBN link bundles. All link acquisitions are obtained through natural, high-relevance niche outreach." }
                ].map((faq, idx) => (
                  <div key={idx} className="space-y-2 border-b border-white/5 pb-4 last:border-0">
                    <h4 className="font-bold text-sm text-white flex items-start gap-2">
                      <span className="text-[#f97316] font-mono">Q:</span>
                      {faq.q}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

