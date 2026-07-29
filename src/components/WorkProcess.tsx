"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Compass,
  Search,
  Settings,
  Palette,
  Rocket,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Map,
  Code2,
  CheckSquare,
  Eye,
  Globe,
  Wrench,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Step {
  title: string;
  icon: React.ComponentType<any>;
  items: string[];
}

const MARKETING_STEPS: Step[] = [
  {
    title: "Client Consultation",
    icon: Users,
    items: ["Understand business goals", "Target audience definition", "Competitor research"],
  },
  {
    title: "Strategy Planning",
    icon: Map,
    items: ["Marketing roadmap", "Content planning", "Campaign objectives"],
  },
  {
    title: "Market Research",
    icon: Search,
    items: ["Keyword research", "Competitor analysis", "Industry trends"],
  },
  {
    title: "Campaign Setup",
    icon: Settings,
    items: ["Facebook & Instagram Ads", "Google Ads", "SEO optimization", "Social media setup"],
  },
  {
    title: "Content Creation",
    icon: Palette,
    items: ["Graphics & banners", "Video creation", "Copywriting", "Landing pages design"],
  },
  {
    title: "Launch Campaign",
    icon: Rocket,
    items: ["Publish campaigns", "Initial testing", "Audience targeting & bidding"],
  },
  {
    title: "Performance Monitoring",
    icon: BarChart3,
    items: ["Analytics & data collection", "Conversion tracking", "ROI monitoring & reporting"],
  },
  {
    title: "Optimization & Reporting",
    icon: TrendingUp,
    items: ["A/B Testing", "Monthly performance reports", "Improvements & Scaling strategy"],
  },
];

const DEV_STEPS: Step[] = [
  {
    title: "Requirement Discussion",
    icon: MessageSquare,
    items: ["Project goals definition", "Features spec listing", "Budget & Timeline alignment"],
  },
  {
    title: "Planning & Architecture",
    icon: Map,
    items: ["Sitemap creation", "User flow maps", "Wireframe concepts", "Technology selection"],
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    items: ["Modern interface design", "Responsive design systems", "Interactive prototypes", "Client approval"],
  },
  {
    title: "Development",
    icon: Code2,
    items: ["Frontend development", "Backend services", "Database configuration", "API Integrations"],
  },
  {
    title: "Testing & QA",
    icon: CheckSquare,
    items: ["Bug fixing", "Security auditing", "Performance optimization", "Cross-device testing"],
  },
  {
    title: "Client Review",
    icon: Eye,
    items: ["Feedback collection", "Required revisions & updates"],
  },
  {
    title: "Deployment",
    icon: Globe,
    items: ["Domain setup", "Hosting infrastructure setup", "SSL & security configurations", "Production launch"],
  },
  {
    title: "Maintenance & Support",
    icon: Wrench,
    items: ["Updates & patches", "Bug fixes & support", "Uptime monitoring", "Future enhancements planning"],
  },
];

export default function WorkProcess() {
  const [activeProcess, setActiveProcess] = useState<"marketing" | "development">("development");
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = activeProcess === "marketing" ? MARKETING_STEPS : DEV_STEPS;

  return (
    <section id="process" className="py-28 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5 relative z-10">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#f97316]/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-2 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-[#f97316]" />
        <span>Workflow</span>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="font-['Anton'] text-5xl md:text-7xl tracking-wide text-white">WORK PROCESS</h2>
          <p className="text-neutral-400 mt-3 max-w-md text-sm font-sans">
            How I transform raw concepts into scalable, revenue-generating digital products.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col sm:flex-row p-1 rounded-2xl bg-transparent border border-white/10 w-full sm:w-fit gap-1 sm:gap-0">
          <button
            onClick={() => {
              setActiveProcess("development");
              setActiveStep(0);
            }}
            className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all uppercase flex items-center gap-2 ${
              activeProcess === "development"
                ? "bg-[#f97316] text-[#050505] font-bold shadow-lg"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Web & App Dev</span>
          </button>
          
          <button
            onClick={() => {
              setActiveProcess("marketing");
              setActiveStep(0);
            }}
            className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all uppercase flex items-center gap-2 ${
              activeProcess === "marketing"
                ? "bg-[#f97316] text-[#050505] font-bold shadow-lg"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Digital Marketing</span>
          </button>
        </div>
      </div>

      {/* Timelines View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Stepper (Steps list) */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                  isActive
                    ? "bg-transparent border-[#f97316] shadow-[0_0_20px_rgba(201,247,49,0.05)]"
                    : "bg-transparent border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Step Number Badge */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#f97316] text-[#050505]"
                        : "bg-white/5 text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </div>

                  {/* Step Title & Icon */}
                  <div>
                    <h4
                      className={`text-sm sm:text-base font-bold transition-all flex items-center gap-2 ${
                        isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#f97316]" : "text-neutral-500"}`} />
                      <span>{step.title}</span>
                    </h4>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? "text-[#f97316] translate-x-1" : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Step Detail Card */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProcess}-${activeStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 sm:p-10 rounded-3xl bg-transparent border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[380px]"
            >
              {/* Card Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316]/5 rounded-full filter blur-2xl pointer-events-none" />

              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#f97316] uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>STAGE {(activeStep + 1).toString().padStart(2, "0")} OF 08</span>
                    </span>
                    <h3 className="font-['Anton'] text-2xl sm:text-3xl text-white tracking-wide uppercase">
                      {steps[activeStep].title}
                    </h3>
                  </div>

                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f97316]">
                    {React.createElement(steps[activeStep].icon, { className: "w-6 h-6" })}
                  </div>
                </div>

                {/* Sub-items / Deliverables */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    KEY OBJECTIVES & DELIVERABLES:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {steps[activeStep].items.map((item, itemIdx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: itemIdx * 0.08 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 font-mono text-xs text-neutral-300 hover:border-[#f97316]/30 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call-to-action mini footer */}
              <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
                <span>Interactive Roadmap</span>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#f97316]/40 text-neutral-300 hover:text-[#f97316] transition-all"
                >
                  Discuss this stage
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

