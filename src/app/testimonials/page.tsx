"use client";

import React from "react";
import Link from "next/link";
import { Star, MessageSquare, ShieldCheck, Quote, ChevronRight, UserCheck } from "lucide-react";

export default function TestimonialsPage() {
  const reviews = [
    {
      name: "Faheem Ahmed",
      role: "CEO, Apex Apparel",
      project: "Shopify E-Commerce SEO",
      rating: 5,
      date: "Jan 2026",
      text: "SK Khorrum fixed our collection filtering index issues. In less than four months, our sales conversion grew by 3x. His technical insights are second to none in Bangladesh."
    },
    {
      name: "Dr. Nabila Chowdhury",
      role: "Founder, CareDental Banani",
      project: "Local SEO Map Pack Optimization",
      rating: 5,
      date: "Dec 2025",
      text: "We were getting no phone inquiries from Google Maps. Khorrum resolved citation discrepancies and structured our local listings. Appointments doubled within two months."
    },
    {
      name: "Sajid Khan",
      role: "Owner, KeyboardBD",
      project: "Shopify Speed Tuning & CWV",
      rating: 5,
      date: "Nov 2025",
      text: "PageSpeed scores were in the red on mobile. SK Khorrum cleaned up redundant JavaScript renders. Load speed went under 1s, and mobile checkout leakage dropped to zero."
    },
    {
      name: "M. Rahman",
      role: "Chief Engineer, RealEstateBD",
      project: "Index Recovery & Canonical Repairs",
      rating: 5,
      date: "Sep 2025",
      text: "A complex canonical loop was keeping hundreds of listings out of Google search indices. SK Khorrum audited our Next.js structures and restored search health."
    },
    {
      name: "Sabrina Yusuf",
      role: "Director, EduBD Consultants",
      project: "Lead Generation SEO",
      rating: 5,
      date: "Jul 2025",
      text: "Excellent communication, highly responsive and analytical. He provided transparent weekly tracking sheets that showed steady progress for our main keywords."
    },
    {
      name: "Ahsan Habib",
      role: "Co-Founder, TechShop BD",
      project: "Google Search Console recovery",
      rating: 5,
      date: "May 2025",
      text: "Our organic traffic dropped by half after an algorithm update. SK Khorrum performed a toxic backlink cleanup and structured content siloing. Traffic has recovered fully."
    }
  ];

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
          <span className="text-[#f97316]">REVIEWS</span>
        </nav>

        {/* Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Verified Client Feedback</span>
          <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
            Client Reviews
          </h1>
          <p className="text-sm text-neutral-400">
            Real stories from business owners and founders scaling their organic reach under SK Khorrum's search audits.
          </p>
        </div>

        {/* Trust summary metrics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
            <div className="flex justify-center text-[#f97316] mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <div className="text-lg font-bold text-white">5.0 / 5.0 Average Rating</div>
            <div className="text-xs font-mono text-neutral-500 uppercase">From 95+ Audited Businesses</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
            <div className="flex justify-center text-[#f97316] mb-2">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="text-lg font-bold text-white">100% Retainer Renewal</div>
            <div className="text-xs font-mono text-neutral-500 uppercase">Long-Term Partnerships</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/8 text-center space-y-1">
            <div className="flex justify-center text-[#f97316] mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-lg font-bold text-white">Core Safe Optimizations</div>
            <div className="text-xs font-mono text-neutral-500 uppercase">Zero Algorithm Penalty Runs</div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-[#111]/40 border border-white/8 flex flex-col justify-between hover:border-[#f97316]/30 transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-[#f97316]/5 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1 text-[#f97316]">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                {/* Text */}
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
                <div>
                  <div className="text-sm font-bold text-white">{rev.name}</div>
                  <div className="text-xs text-neutral-500 font-mono">{rev.role}</div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
                  <span>Scope: {rev.project}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <section className="pt-16 border-t border-white/5 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white font-['Anton'] tracking-wider uppercase">Become Our Next Success Story</h2>
          <p className="text-sm text-neutral-400">
            Secure your complimentary crawl diagnosis session today and discover what holds your site back from page #1.
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

