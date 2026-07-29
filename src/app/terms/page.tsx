"use client";

import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#c9f731] selection:text-[#050505] overflow-x-hidden pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-16 relative z-10 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9f731] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#c9f731]">TERMS OF SERVICE</span>
        </nav>

        {/* Heading */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="font-['Anton'] text-4xl sm:text-5xl uppercase tracking-wide">Terms & Conditions</h1>
          <p className="text-xs font-mono text-[#c9f731] mt-2">LAST UPDATED: JULY 29, 2026</p>
        </div>

        {/* Legal content */}
        <div className="space-y-6 text-sm text-neutral-300 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:pt-4 [&_h2]:pb-2">
          <p>
            Welcome to <strong className="text-white">SK Khorrum SEO Consultancy</strong>. These terms and conditions outline the rules and regulations for the use of SK Khorrum's Website, located at <a href="https://khorrum.pro.bd" className="text-[#c9f731] hover:underline">https://khorrum.pro.bd</a>.
          </p>

          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use khorrum.pro.bd if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2>1. Terminology</h2>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Consultant's terms and conditions. "The Consultant", "Ourselves", "We", "Our" and "Us", refers to our brand SK Khorrum.
          </p>

          <h2>2. SEO Services and Consultations</h2>
          <p>
            Our service scope covers Technical SEO audits, site speed consulting, sitemaps structuring, schema injection guidelines, keyword diagnostics, link-building outreach, and Google search analytics configuration.
          </p>
          <p>
            While we apply expert optimization methodologies to target spots on search engines, rankings represent a third-party algorithmic outcome. We do not issue guarantees of specific search positions, as search engine ranking parameters are subject to regular updates.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, SK Khorrum owns the intellectual property rights for all material on khorrum.pro.bd. All intellectual property rights are reserved. You may access this from khorrum.pro.bd for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Republish material or copy diagnostic audit scripts from khorrum.pro.bd</li>
            <li>Sell, rent or sub-license material from khorrum.pro.bd</li>
            <li>Reproduce, duplicate or copy material from khorrum.pro.bd</li>
          </ul>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall SK Khorrum be held liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on khorrum.pro.bd.
          </p>

          <h2>5. Variations of Terms</h2>
          <p>
            SK Khorrum is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Bangladesh, and you irrevocably submit to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.
          </p>
        </div>

        {/* Back Button */}
        <div className="pt-6 border-t border-white/5">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c9f731] hover:underline uppercase">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Site</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

// Inline ArrowLeft helper
function ArrowLeft(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  );
}
