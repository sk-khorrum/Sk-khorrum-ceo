"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#c9f731] selection:text-[#050505] overflow-x-hidden pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-16 relative z-10 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9f731] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#c9f731]">PRIVACY POLICY</span>
        </nav>

        {/* Heading */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="font-['Anton'] text-4xl sm:text-5xl uppercase tracking-wide">Privacy Policy</h1>
          <p className="text-xs font-mono text-[#c9f731] mt-2">LAST UPDATED: JULY 29, 2026</p>
        </div>

        {/* Legal content */}
        <div className="space-y-6 text-sm text-neutral-300 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:pt-4 [&_h2]:pb-2">
          <p>
            At <strong className="text-white">SK Khorrum</strong>, operating from <a href="https://khorrum.pro.bd" className="text-[#c9f731] hover:underline">https://khorrum.pro.bd</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by this platform and how we utilize it.
          </p>

          <h2>1. Consent</h2>
          <p>
            By utilizing our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal details.
          </p>
          <p>
            If you utilize our **SEO Audit Scanner** or **Contact Form**, we request details such as your Name, Email address, and Target Website URL. This is used solely to generate diagnostic reports and follow up with recovery recommendations.
          </p>

          <h2>3. Log Files & Analytics Tracking</h2>
          <p>
            SK Khorrum follows a standard procedure of utilizing log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing search trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
          <p>
            We use analytics tools (such as Google Analytics 4) to monitor page performance, visitor durations, and Core Web Vitals speeds.
          </p>

          <h2>4. Cookies & Web Beacons</h2>
          <p>
            Like any other website, our platform uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2>5. GDPR and CCPA Data Protection Rights</h2>
          <p>
            We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:khorrum@pro.bd" className="text-[#c9f731] hover:underline font-mono">khorrum@pro.bd</a>.
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
