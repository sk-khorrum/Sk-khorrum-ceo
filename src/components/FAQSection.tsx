"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, HelpCircle, Sparkles, MessageSquare, Info, Link2, Check, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  category: "marketing" | "web" | "app" | "pricing" | "support" | "general";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  // 1. Digital Marketing FAQs (12 items)
  {
    id: "mkt-1",
    category: "marketing",
    question: "What digital marketing services do you provide?",
    answer: "I provide an all-in-one digital marketing suite including Search Engine Optimization (SEO), Social Media Marketing (SMM), Pay-Per-Click (PPC) advertising (Facebook, Instagram, and Google Ads), Content Creation, and comprehensive Conversion Rate Optimization (CRO) to maximize your digital ROI.",
  },
  {
    id: "mkt-2",
    category: "marketing",
    question: "Do you offer SEO services?",
    answer: "Yes, I offer end-to-end SEO services. This includes comprehensive technical website audits, keyword research, on-page optimization (headings, meta tags, and structured data), off-page authority building, and content strategies designed to boost your organic reach.",
  },
  {
    id: "mkt-3",
    category: "marketing",
    question: "Can you manage Facebook, Instagram, and Google Ads?",
    answer: "Absolutely. I design and manage end-to-end paid advertising campaigns. This covers audience research and segmentation, compelling ad copy and graphic design, pixel/conversion tracking setup, active budget bidding, and continuous A/B testing for performance optimization.",
  },
  {
    id: "mkt-4",
    category: "marketing",
    question: "How long does SEO take to show results?",
    answer: "While critical technical fixes can yield quick indexation improvements, a robust organic strategy typically takes 3 to 6 months to display significant ranking increases. This depends largely on keyword competition, domain authority, and content quality.",
  },
  {
    id: "mkt-5",
    category: "marketing",
    question: "Do you provide monthly marketing reports?",
    answer: "Yes, transparency is key. I provide comprehensive monthly performance reports detailing metrics like Cost Per Click (CPC), Conversion Rates, organic traffic gains, and Return on Ad Spend (ROAS), accompanied by actionable insights for scaling the next cycle.",
  },
  {
    id: "mkt-6",
    category: "marketing",
    question: "Can you increase website traffic?",
    answer: "Yes. By optimizing search engine presence, improving website performance, and driving high-intent traffic via paid advertising and content marketing, I implement strategies designed to multiply traffic and attract qualified prospective leads.",
  },
  {
    id: "mkt-7",
    category: "marketing",
    question: "Do you improve Google rankings?",
    answer: "Yes. I focus on optimizing website health, satisfying search intent, creating keyword-optimized articles, building authoritative backlinks, and ensuring clean semantic schemas, which are critical elements to boost page ranking on SERPs.",
  },
  {
    id: "mkt-8",
    category: "marketing",
    question: "Do you work with local and international businesses?",
    answer: "Yes, I work with both. I design localized SEO strategies (Google Business Profile, local directory citation audits) for service businesses, as well as global scaling strategies for international SaaS, digital services, and E-commerce brands.",
  },
  {
    id: "mkt-9",
    category: "marketing",
    question: "How do you measure campaign success?",
    answer: "Success is measured by alignment with your specific business goals. Primary metrics include Cost Per Lead (CPL), Conversion Rate, organic search impressions, click-through rates, and ultimately, your overall Return on Ad Spend (ROAS).",
  },
  {
    id: "mkt-10",
    category: "marketing",
    question: "Do you create content for social media?",
    answer: "Yes, I design engaging graphics, write persuasive captions, create short-form video concepts (reels/shorts), and build custom design templates that preserve your brand's unique identity across Facebook, Instagram, and LinkedIn.",
  },
  {
    id: "mkt-11",
    category: "marketing",
    question: "Can you audit my existing marketing strategy?",
    answer: "Yes. I offer a comprehensive 25-point audit of your current channels, exposing leakages in ad spend, structural deficits in your SEO, copy adjustments to increase conversion, and competitor analytics to identify gaps.",
  },
  {
    id: "mkt-12",
    category: "marketing",
    question: "What industries do you specialize in?",
    answer: "I specialize in E-commerce platforms, SaaS & tech startups, professional consulting agencies (legal, financial, medical), real estate agencies, and local trades requiring a steady stream of online leads.",
  },

  // 2. Web Development FAQs (12 items)
  {
    id: "web-1",
    category: "web",
    question: "What types of websites do you build?",
    answer: "I construct custom business portfolios, dynamic landing pages, corporate websites, multi-vendor E-commerce portals, custom CMS setups, and modern single-page applications (SPAs) tailored to modern business requirements.",
  },
  {
    id: "web-2",
    category: "web",
    question: "Do you create custom websites?",
    answer: "Yes, I build fully bespoke websites using code (React/Next.js/TypeScript) instead of relying on slow, generic templates. This ensures your project is extremely fast, highly secure, scalable, and visually distinct.",
  },
  {
    id: "web-3",
    category: "web",
    question: "Will my website be mobile responsive?",
    answer: "Yes, 100%. Every website is developed using a mobile-first philosophy, ensuring seamless layout grids, legible typography, and responsive media across mobile phones, tablets, laptops, and ultra-wide screens.",
  },
  {
    id: "web-4",
    category: "web",
    question: "Is SEO included?",
    answer: "Yes, technical SEO is baked in. I ensure semantic HTML5 markup, optimized site speeds, proper meta tag configurations, image compression, clean routing, and structured schemas to make your site indexable out-of-the-box.",
  },
  {
    id: "web-5",
    category: "web",
    question: "Which technologies do you use?",
    answer: "My core technology stack includes React.js, Next.js (App Router), TypeScript, Tailwind CSS for frontend styling, Node.js and Express for backend architectures, and database choices like PostgreSQL, MongoDB, or Firebase.",
  },
  {
    id: "web-6",
    category: "web",
    question: "Do you integrate payment gateways?",
    answer: "Yes, I integrate secure international gateways like Stripe, PayPal, and BrainTree, as well as local billing methods (such as bKash, Rocket, Nagad, and SSLCommerz) to make checkout seamless for customers.",
  },
  {
    id: "web-7",
    category: "web",
    question: "Can you redesign an existing website?",
    answer: "Yes. I can refactor outdated pages, upgrading them to modern tech stacks (like Next.js) to improve performance scores, overhaul user interfaces, and boost conversion statistics while keeping your existing SEO page ranking intact.",
  },
  {
    id: "web-8",
    category: "web",
    question: "Will I be able to edit my website?",
    answer: "Yes. I integrate headless CMS platforms (such as Sanity, Strapi, or Contentful) or develop custom, intuitive admin portals that allow you to modify text, upload products, and manage blogs without touching a single line of code.",
  },
  {
    id: "web-9",
    category: "web",
    question: "Do you provide hosting and domain support?",
    answer: "Yes. I assist in selecting the best hosting environments (like Vercel, Netlify, AWS, or digital ocean VPS), configure custom domain DNS records, and install secure SSL certificates for your peace of mind.",
  },
  {
    id: "web-10",
    category: "web",
    question: "How long does a website project take?",
    answer: "Simple landing pages or portfolios take 1 to 2 weeks. Custom business portals and E-commerce sites average 3 to 5 weeks, while complex enterprise applications with custom admin backends take 6 to 10 weeks.",
  },
  {
    id: "web-11",
    category: "web",
    question: "Do you optimize website speed?",
    answer: "Yes. I optimize performance to achieve 90+ lighthouse scores. This is done through advanced code splitting, server-side rendering, next-gen image compression, local caching, and minifying asset bundles.",
  },
  {
    id: "web-12",
    category: "web",
    question: "Will my website be secure?",
    answer: "Yes. I implement robust security controls including HTTPS SSL protection, protection against common OWASP vulnerabilities (SQLi, XSS, CSRF), authorization systems, and secure API keys handling.",
  },

  // 3. Mobile App Development FAQs (10 items)
  {
    id: "app-1",
    category: "app",
    question: "Do you develop Android and iOS apps?",
    answer: "Yes. I develop high-performance mobile applications that deploy natively to the Google Play Store and Apple App Store, using cross-platform technologies to ensure cross-device consistency.",
  },
  {
    id: "app-2",
    category: "app",
    question: "Do you build cross-platform apps?",
    answer: "Yes, I build cross-platform apps using React Native or Flutter. This allows us to share a single codebase for both iOS and Android, which reduces development time and costs by up to 40% while preserving native performance.",
  },
  {
    id: "app-3",
    category: "app",
    question: "Which technologies do you use?",
    answer: "I primarily use React Native with Expo or Flutter, backed by Node.js/Express, TypeScript, PostgreSQL/MongoDB database systems, Firebase for user auth/notifications, and native SDK integrations.",
  },
  {
    id: "app-4",
    category: "app",
    question: "Can you publish my app on Google Play and the App Store?",
    answer: "Yes, I handle the deployment workflow. This includes configuring App Store Connect and Google Play Console developer accounts, creating build bundles, uploading assets and screenshots, and navigating the app review cycles.",
  },
  {
    id: "app-5",
    category: "app",
    question: "Do you provide API integration?",
    answer: "Yes, I build and integrate custom RESTful APIs or GraphQL endpoints to connect your mobile app securely with databases, cloud services, and third-party tools (like maps, payments, and authentication).",
  },
  {
    id: "app-6",
    category: "app",
    question: "Will the app work offline?",
    answer: "Yes, depending on requirements. I can implement local offline storage configurations using databases like SQLite, Realm, or Hive, allowing the app to run without connection and sync data once online.",
  },
  {
    id: "app-7",
    category: "app",
    question: "Can you update an existing app?",
    answer: "Yes. I can audit existing projects, refactor older codebases, upgrade dependency versions, modernize the UI design, implement new backend modules, and deploy updates to the app stores.",
  },
  {
    id: "app-8",
    category: "app",
    question: "Do you provide maintenance after launch?",
    answer: "Yes. I provide maintenance plans covering security patches, OS version compatibility updates (iOS/Android revisions), bug fixes, cloud server scaling, and performance optimizations.",
  },
  {
    id: "app-9",
    category: "app",
    question: "Is the app scalable?",
    answer: "Yes. I construct modular app architectures using clean state management (Redux Toolkit/Zustand/Bloc) and scale-ready server systems that can support growth in user concurrency.",
  },
  {
    id: "app-10",
    category: "app",
    question: "Can you build admin dashboards?",
    answer: "Yes, I develop companion web dashboards that allow administrators to manage application database items, track active users, dispatch push notifications, and monitor analytics.",
  },

  // 4. Pricing FAQs (6 items)
  {
    id: "prc-1",
    category: "pricing",
    question: "How much does a website cost?",
    answer: "The price depends on project complexity. Standard landing pages or portfolio websites start around $500. Custom corporate websites average $1,200 to $2,500, while complex SaaS apps and E-commerce sites begin at $3,000.",
  },
  {
    id: "prc-2",
    category: "pricing",
    question: "How much does an app cost?",
    answer: "Custom mobile app projects utilizing React Native or Flutter start at $2,500 for MVP architectures. Larger products incorporating multi-role users, real-time features, and administrative dashboards average $4,000 to $8,000.",
  },
  {
    id: "prc-3",
    category: "pricing",
    question: "Do you offer custom quotations?",
    answer: "Yes. After discussing your project specifications in a brief meeting, I compile a transparent, itemized PDF quote detailing features, timelines, milestones, and precise cost breakdowns.",
  },
  {
    id: "prc-4",
    category: "pricing",
    question: "What payment methods do you accept?",
    answer: "I accept direct wire transfers, credit card invoices, Payoneer, Wise, and cryptocurrency payments (USDT, BTC). Local clients can settle payments via bank transfer or mobile banking (bKash/Nagad).",
  },
  {
    id: "prc-5",
    category: "pricing",
    question: "Do you require an upfront payment?",
    answer: "Yes, I work with standard milestone structures. A typical contract requires a 30% to 50% deposit before kickoff, with the remainder divided into milestone phases and a final release upon delivery.",
  },
  {
    id: "prc-6",
    category: "pricing",
    question: "Are there any hidden costs?",
    answer: "No. All cost requirements, including design, development, integration, and post-launch support, are explicitly written in the proposal. Third-party bills (hosting, domain, SMS gateways, Maps APIs) are paid directly by the client.",
  },

  // 5. Support FAQs (5 items)
  {
    id: "spt-1",
    category: "support",
    question: "Do you offer free support after project delivery?",
    answer: "Yes. I offer 30 days of free post-launch support to resolve any unforeseen bugs, configure server settings, adjust minor text/copy elements, and train your team on using the site or dashboard.",
  },
  {
    id: "spt-2",
    category: "support",
    question: "How can I request revisions?",
    answer: "You can request revisions directly via Email, Trello, or Slack. I manage revisions systematically, outlining tasks clearly on a project board so you can monitor progress in real-time.",
  },
  {
    id: "spt-3",
    category: "support",
    question: "How quickly do you respond?",
    answer: "I pride myself on rapid response times. You can expect replies within 2 hours during business hours (GMT+6) and within 12 hours during off-peak times or weekends.",
  },
  {
    id: "spt-4",
    category: "support",
    question: "Do you provide long-term maintenance?",
    answer: "Yes. I provide monthly retention plans covering server monitoring, database backups, dependency upgrades, security patching, and content updates to keep your assets secure and operational.",
  },
  {
    id: "spt-5",
    category: "support",
    question: "Can I hire you for ongoing work?",
    answer: "Yes. I am available for long-term retainer agreements or part-time contract roles, working as an extended member of your team for development or marketing iterations.",
  },

  // 6. General FAQs (8 items)
  {
    id: "gen-1",
    category: "general",
    question: "Why should I choose your services?",
    answer: "I offer a unique blend of custom development expertise, UI/UX aesthetics, and growth marketing knowledge. With 5 years of industry experience, my work is built for speed, conversion, and user satisfaction.",
  },
  {
    id: "gen-2",
    category: "general",
    question: "How do we start a project?",
    answer: "Simply submit your brief details using the interactive requirements form on this website. I will audit your submission and follow up within 24 hours to schedule a kickoff meeting.",
  },
  {
    id: "gen-3",
    category: "general",
    question: "Can we communicate via WhatsApp, Zoom, or Google Meet?",
    answer: "Yes, I regularly collaborate with international clients via Google Meet, Zoom, or Discord for video reviews, and maintain daily progress updates through WhatsApp or Slack.",
  },
  {
    id: "gen-4",
    category: "general",
    question: "Do you sign NDAs?",
    answer: "Yes. I respect my clients' privacy and intellectual property. I am fully prepared to review and execute standard NDAs prior to discussing sensitive project briefs or business plans.",
  },
  {
    id: "gen-5",
    category: "general",
    question: "Can you work with international clients?",
    answer: "Yes. Over 70% of my clients are located internationally, including in the US, Europe, Australia, and the Middle East. I schedule meetings flexibly to accommodate varying timezones.",
  },
  {
    id: "gen-6",
    category: "general",
    question: "How do you ensure project quality?",
    answer: "I use standard QA checklists, write code tests, run security scans, perform user journey testing, and secure client design approvals before moving into writing code.",
  },
  {
    id: "gen-7",
    category: "general",
    question: "What is your development process?",
    answer: "My process is divided into: 1. Requirements Discussion, 2. Wireframe Planning, 3. UI/UX Design approval, 4. Agile Development, 5. QA testing, 6. Client feedback iteration, 7. Hosting deployment, and 8. Maintenance support.",
  },
  {
    id: "gen-8",
    category: "general",
    question: "How do I get a free consultation?",
    answer: "You can click on the floating mail button or use the 'Get in Touch' links to fill out the requirement modal. I will review it and contact you to schedule a free 30-minute discovery call.",
  },
];

const TABS = [
  { key: "all", label: "ALL FAQs" },
  { key: "marketing", label: "Digital Marketing" },
  { key: "web", label: "Web Development" },
  { key: "app", label: "Mobile Apps" },
  { key: "pricing", label: "Pricing & Quotation" },
  { key: "support", label: "Support & Revs" },
  { key: "general", label: "General" },
] as const;

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "marketing" | "web" | "app" | "pricing" | "support" | "general">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, "yes" | "no">>({});

  // Load votes from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("faq-votes");
      if (stored) {
        setVotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse local storage votes:", e);
    }
  }, []);

  // Handle deep linking / URL hashes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#faq-")) {
        const id = hash.replace("#faq-", "");
        const matchedFaq = FAQS.find((faq) => faq.id === id);
        if (matchedFaq) {
          setActiveTab("all"); // Switch to all to ensure it's visible
          setExpandedId(id);
          setHighlightedId(id);
          
          setTimeout(() => {
            const element = document.getElementById(`faq-card-${id}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 200);

          // Clear highlight effect after 4s
          const timer = setTimeout(() => {
            setHighlightedId(null);
          }, 4000);
          return () => clearTimeout(timer);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Filter FAQs based on tab and search query
  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || faq.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Complete FAQ Page JSON-LD schema (Statically contains all 53 FAQs for search engine crawlers)
  const fullJsonLdSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };
  }, []);

  const handleVote = (id: string, type: "yes" | "no") => {
    if (votes[id]) return; // already voted
    const newVotes = { ...votes, [id]: type };
    setVotes(newVotes);
    try {
      localStorage.setItem("faq-votes", JSON.stringify(newVotes));
    } catch (e) {}
  };

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#faq-${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Helper function to highlight matches
  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-[#c9f731]/30 text-[#c9f731] px-0.5 rounded font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <section id="faqs" className="py-28 px-6 md:px-16 max-w-5xl mx-auto border-t border-white/5 relative z-10 scroll-mt-24">
      {/* Complete SEO FAQ Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullJsonLdSchema) }}
      />

      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#c9f731]/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-2 flex items-center justify-center gap-3">
        <span className="w-8 h-[1px] bg-[#c9f731]" />
        <span>FAQ Help Center</span>
        <span className="w-8 h-[1px] bg-[#c9f731]" />
      </div>

      <div className="text-center space-y-4 mb-16">
        <h2 className="font-['Anton'] text-5xl md:text-7xl tracking-wide text-white uppercase">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm">
          Got questions? I have answers. Explore detailed breakdowns of digital marketing, web & mobile app engineering, pricing, and ongoing support parameters.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-4 relative">
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedId(null);
            }}
            className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-neutral-900/60 border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#c9f731] focus:outline-none text-xs font-mono transition-all"
          />
          <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {TABS.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setExpandedId(null);
              }}
              className="relative px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-mono tracking-wider transition-all uppercase border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white"
            >
              {isSelected && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#c9f731] rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${isSelected ? "text-[#050507] font-bold" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* FAQs List */}
      <div className="space-y-4" role="presentation">
        {filteredFAQs.map((faq) => {
          const isOpen = expandedId === faq.id;
          const isHighlighted = highlightedId === faq.id;
          const hasVoted = votes[faq.id];

          return (
            <article
              key={faq.id}
              id={`faq-card-${faq.id}`}
              className={`rounded-2xl border transition-all duration-300 scroll-mt-28 ${
                isOpen
                  ? "bg-[#111111]/90 border-[#c9f731] shadow-[0_0_25px_rgba(201,247,49,0.05)]"
                  : isHighlighted
                  ? "bg-[#111111]/90 border-[#c9f731] shadow-[0_0_40px_rgba(201,247,49,0.25)] scale-[1.01]"
                  : "bg-[#111111]/30 border-white/5 hover:border-white/15"
              }`}
            >
              {/* Question Header */}
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => setExpandedId(isOpen ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white group"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-[#c9f731]" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                    <span className="group-hover:text-[#c9f731] transition-colors">
                      {highlightText(faq.question, searchQuery)}
                    </span>
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Copy Link Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyLink(e, faq.id)}
                      className="p-1 rounded bg-white/5 border border-white/10 hover:border-[#c9f731] hover:text-[#c9f731] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
                      title="Copy Direct Link"
                      aria-label="Copy direct link to this question"
                    >
                      {copiedId === faq.id ? <Check className="w-3 h-3 text-[#c9f731]" /> : <Link2 className="w-3 h-3 text-neutral-400" />}
                    </button>

                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 group-hover:text-white transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#c9f731]" : ""
                      }`}
                    />
                  </div>
                </button>
              </h3>

              {/* Answer Content Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-label={`Answer for ${faq.question}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: { height: { duration: 0.25 }, opacity: { duration: 0.2 } },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } },
                    }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="px-6 py-5 space-y-4">
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-normal">
                        {highlightText(faq.answer, searchQuery)}
                      </p>

                      {/* Voting Help Widget */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] sm:text-xs font-mono text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#c9f731]/70" />
                          <span>Direct Link ID: <code className="text-[#c9f731] bg-white/5 px-1.5 py-0.5 rounded">#faq-{faq.id}</code></span>
                        </span>

                        <div className="flex items-center gap-3">
                          <span>Was this helpful?</span>
                          {hasVoted ? (
                            <span className="text-[#c9f731] flex items-center gap-1 animate-fadeIn">
                              <Check className="w-3 h-3" /> Thank you!
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleVote(faq.id, "yes")}
                                className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-[#c9f731] hover:text-[#c9f731] flex items-center gap-1 transition-all"
                              >
                                <ThumbsUp className="w-3 h-3" /> Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => handleVote(faq.id, "no")}
                                className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-red-400 hover:text-red-400 flex items-center gap-1 transition-all"
                              >
                                No
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}

        {filteredFAQs.length === 0 && (
          <div className="text-center py-16 rounded-2xl border border-white/5 bg-white/5 font-mono text-xs text-neutral-500 flex flex-col items-center gap-2">
            <Info className="w-5 h-5 text-neutral-600" />
            <span>No questions matched your search query. Try another keyword!</span>
          </div>
        )}
      </div>

      {/* CTA section under FAQs */}
      <div className="mt-16 p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-center space-y-4">
        <h3 className="font-['Anton'] text-xl sm:text-2xl text-white tracking-wide uppercase flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#c9f731]" />
          <span>STILL HAVE QUESTIONS?</span>
        </h3>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          I am ready to help. Submit your custom project briefs directly through the portal and I will outline a customized response for your specific digital problem.
        </p>
        <div className="pt-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9f731] text-[#050505] font-semibold text-xs hover:bg-[#a5cc28] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#c9f731]/10"
          >
            <span>Get a Free Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
