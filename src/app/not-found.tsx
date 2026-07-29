"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, BookOpen, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans selection:bg-[#f97316] selection:text-[#050505]">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center space-y-8 max-w-md px-6 relative z-10">
        {/* Visual warning indicator */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f97316] shadow-2xl">
          <AlertCircle className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono text-[#f97316] uppercase tracking-[0.25em]">Error 404 - Broken canonical URL</div>
          <h1 className="font-['Anton'] text-5xl sm:text-6xl tracking-wide uppercase leading-none">
            Page Index Warning
          </h1>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-xs mx-auto">
            The page path you are attempting to crawl does not exist or has been permanently redirected.
          </p>
        </div>

        {/* Search Mockup as link to blog */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex items-center gap-3 max-w-sm mx-auto">
          <Search className="w-4 h-4 text-neutral-500 flex-shrink-0" />
          <Link href="/blog" className="text-xs font-mono text-neutral-400 hover:text-[#f97316] transition-colors text-left flex-1">
            Search our active blog articles...
          </Link>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f97316] text-[#050505] font-bold text-xs hover:bg-[#b8e220] transition-colors shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-neutral-300 font-mono text-xs hover:border-[#f97316]/40 hover:text-[#f97316] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Guides</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

