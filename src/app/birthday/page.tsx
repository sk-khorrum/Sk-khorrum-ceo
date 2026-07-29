"use client";

import React, { useState, useEffect } from "react";
import { Copy, Share2, Calendar, Clock, Smile, ChevronDown, ChevronUp, Activity, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BirthdayPage() {
  const [greeting, setGreeting] = useState("Welcome");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Age States
  const [age, setAge] = useState({
    years: "00",
    months: "00",
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Countdown States
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Cumulative States
  const [cumulative, setCumulative] = useState({
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
  });

  // Timeline Next Year Target
  const [nextBdayYear, setNextBdayYear] = useState(new Date().getFullYear());

  // Yearly Progress Circle Offset
  const [progressPercent, setProgressPercent] = useState("0.0%");
  const [strokeOffset, setStrokeOffset] = useState(597);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll Progress
  const [scrollWidth, setScrollWidth] = useState(0);

  // Birthdate Configuration
  const BIRTH_YEAR = 2006;
  const BIRTH_MONTH = 9; // October (0-indexed: 9 = October)
  const BIRTH_DAY = 27;

  useEffect(() => {
    // 1. Dynamic Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // 2. Scroll Progress Bar
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Telemetry Update Engine
    const BIRTH_DATE = new Date(BIRTH_YEAR, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);

    const updateTelemetry = () => {
      const now = new Date();

      // 3a. Precise Age Calculation
      let y = now.getFullYear() - BIRTH_DATE.getFullYear();
      let m = now.getMonth() - BIRTH_DATE.getMonth();
      let d = now.getDate() - BIRTH_DATE.getDate();
      let h = now.getHours() - BIRTH_DATE.getHours();
      let min = now.getMinutes() - BIRTH_DATE.getMinutes();
      let s = now.getSeconds() - BIRTH_DATE.getSeconds();

      if (s < 0) { s += 60; min--; }
      if (min < 0) { min += 60; h--; }
      if (h < 0) { h += 24; d--; }
      if (d < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += prevMonth.getDate();
        m--;
      }
      if (m < 0) { m += 12; y--; }

      setAge({
        years: String(y).padStart(2, "0"),
        months: String(m).padStart(2, "0"),
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(min).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });

      // 3b. Next Birthday Calculation
      let targetYear = now.getFullYear();
      let nextBday = new Date(targetYear, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);

      if (now >= nextBday) {
        targetYear++;
        nextBday = new Date(targetYear, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);
      }
      setNextBdayYear(targetYear);

      const diffMs = nextBday.getTime() - now.getTime();
      const cdD = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const cdH = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const cdMin = Math.floor((diffMs / 1000 / 60) % 60);
      const cdS = Math.floor((diffMs / 1000) % 60);

      setCountdown({
        days: String(cdD).padStart(2, "0"),
        hours: String(cdH).padStart(2, "0"),
        minutes: String(cdMin).padStart(2, "0"),
        seconds: String(cdS).padStart(2, "0"),
      });

      // 3c. Progress Ring Offset
      const prevBday = new Date(targetYear - 1, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0);
      const totalYearMs = nextBday.getTime() - prevBday.getTime();
      const elapsedMs = now.getTime() - prevBday.getTime();
      const pct = Math.min(Math.max((elapsedMs / totalYearMs) * 100, 0), 100);

      setProgressPercent(`${pct.toFixed(1)}%`);
      const circumference = 2 * Math.PI * 95; // r = 95
      setStrokeOffset(circumference - (pct / 100) * circumference);

      // 3d. Cumulative stats
      const totalMs = now.getTime() - BIRTH_DATE.getTime();
      const totalSecs = Math.floor(totalMs / 1000);
      const totalMins = Math.floor(totalSecs / 60);
      const totalHrs = Math.floor(totalMins / 60);
      const totalDays = Math.floor(totalHrs / 24);

      setCumulative({
        days: totalDays.toLocaleString(),
        hours: totalHrs.toLocaleString(),
        minutes: totalMins.toLocaleString(),
        seconds: totalSecs.toLocaleString(),
      });
    };

    updateTelemetry();
    const interval = setInterval(updateTelemetry, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyDOB = () => {
    navigator.clipboard
      .writeText("27/10/2006")
      .then(() => triggerToast("Birth Date copied: 27/10/2006"))
      .catch(() => triggerToast("Failed to copy date"));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "SK Khorrum Birthday Telemetry",
          text: "Check out SK Khorrum's live age and birthday countdown!",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Link copied to clipboard");
    }
  };

  const FAQS = [
    {
      q: "How old is SK Khorrum?",
      a: `SK Khorrum was born on October 27, 2006. He is currently ${age.years} years old, as dynamically computed in real-time above.`,
    },
    {
      q: "When is SK Khorrum's next birthday?",
      a: `SK Khorrum's next birthday celebration will be on 27 October ${nextBdayYear}.`,
    },
    {
      q: "How does the telemetry engine work?",
      a: "This dashboard subtracts SK Khorrum's exact birth timestamp from your device's current system time. It automatically generates real-time telemetry metrics, zodiac attributes, and yearly countdown statistics.",
    },
  ];

  return (
    <main className="relative min-h-screen text-white selection:bg-[#f97316] selection:text-[#050505] font-sans overflow-x-hidden bg-[#050507]">
      {/* Scroll Progress */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollWidth}%`, zIndex: 100 }}
      />

      {/* Orbs background matching premium portfolio style */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-10">
        
        {/* Navigation Bar / Action bar */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl glass-card border border-white/8 mb-10">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#f97316]/40 text-neutral-400 hover:text-[#f97316] transition-all flex items-center justify-center"
              title="Back to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-[#f97316]/20">
              <span className="w-2 h-2 rounded-full bg-[#f97316] timeline-dot" />
              <span className="text-xs font-mono font-bold text-[#f97316] tracking-wider uppercase">
                {greeting}
              </span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyDOB}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass-pill border border-white/10 text-white font-mono text-xs hover:border-[#f97316]/30 hover:text-[#f97316] transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy DOB</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass-pill border border-white/10 text-white font-mono text-xs hover:border-[#f97316]/30 hover:text-[#f97316] transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* HERO TITLE SECTION */}
        <section className="text-center py-16 mb-8 rounded-3xl glass-card border border-white/8 relative overflow-hidden shimmer-border">
          <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
          <div className="relative z-10 px-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
              Real-Time Life Telemetry
            </span>
            <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wider text-white mb-4">
              SK KHORRUM
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Automated biological telemetry, cumulative lifetime statistics, and real-time next birthday calculations.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/40 border border-white/8 text-[#f97316] font-mono text-base font-semibold shadow-inner">
              <Calendar className="w-4 h-4" />
              <span>27 October 2006</span>
            </div>
          </div>
        </section>

        {/* TIME DATA METRIC CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Live Precision Age Card */}
          <article className="p-8 rounded-3xl glass-card border border-white/8 relative">
            <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#f97316]" />
              <span>Precision Biological Age</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: age.years, l: "Years" },
                { v: age.months, l: "Months" },
                { v: age.days, l: "Days" },
                { v: age.hours, l: "Hours" },
                { v: age.minutes, l: "Minutes" },
                { v: age.seconds, l: "Seconds" },
              ].map(({ v, l }) => (
                <div key={l} className="bg-black/35 border border-white/5 rounded-2xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />
                  <div className="font-['Anton'] text-3xl md:text-4xl text-white tracking-wider" style={{ textShadow: "0 0 16px rgba(255,255,255,0.15)" }}>
                    {v}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase mt-2 tracking-widest">{l}</div>
                </div>
              ))}
            </div>
          </article>

          {/* Next Birthday Countdown */}
          <article className="p-8 rounded-3xl glass-card border border-white/8 relative">
            <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#f97316]" />
              <span>Birthday Anniversary Countdown</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: countdown.days, l: "Days" },
                { v: countdown.hours, l: "Hours" },
                { v: countdown.minutes, l: "Minutes" },
              ].map(({ v, l }) => (
                <div key={l} className="bg-black/35 border border-white/5 rounded-2xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />
                  <div className="font-['Anton'] text-3xl md:text-4xl text-white tracking-wider" style={{ textShadow: "0 0 16px rgba(255,255,255,0.15)" }}>
                    {v}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase mt-2 tracking-widest">{l}</div>
                </div>
              ))}
              <div className="col-span-3 bg-black/35 border border-white/5 rounded-2xl p-5 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent" />
                <div className="font-['Anton'] text-4xl text-[#f97316] tracking-wider" style={{ textShadow: "0 0 20px rgba(201,247,49,0.3)" }}>
                  {countdown.seconds}
                </div>
                <div className="text-[10px] font-mono text-neutral-500 uppercase mt-2 tracking-widest">Seconds Remaining</div>
              </div>
            </div>
          </article>

        </div>

        {/* PROGRESS CIRCLE & ZODIAC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Yearly Progress Ring */}
          <article className="p-8 rounded-3xl glass-card border border-white/8 flex flex-col items-center justify-center relative">
            <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-6 w-full flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#f97316]" />
              <span>Current Year progress</span>
            </div>
            
            <div className="relative flex items-center justify-center w-[220px] h-[220px] mb-4">
              <svg className="w-[220px] h-[220px] transform -rotate-90">
                <circle
                  className="fill-none stroke-white/5 stroke-[12]"
                  cx="110"
                  cy="110"
                  r="95"
                />
                <circle
                  className="fill-none stroke-[12] stroke-linecap-round transition-all duration-1000"
                  style={{
                    stroke: "#f97316",
                    strokeDasharray: "597",
                    strokeDashoffset: `${strokeOffset}`,
                    filter: "drop-shadow(0 0 8px rgba(201, 247, 49, 0.4))",
                  }}
                  cx="110"
                  cy="110"
                  r="95"
                />
              </svg>
              <div className="absolute text-center flex flex-col items-center justify-center">
                <span className="font-['Anton'] text-3xl text-white leading-none">
                  {progressPercent}
                </span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-2">
                  Completed
                </span>
              </div>
            </div>
          </article>

          {/* Zodiac card */}
          <article className="p-8 rounded-3xl glass-card border border-white/8 flex flex-col md:flex-row items-center justify-center gap-8 relative">
            <div className="w-[100px] h-[100px] rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center text-4xl shadow-xl shadow-[#f97316]/5 text-[#f97316]">
              ♏
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-mono text-[#f97316] uppercase tracking-wider font-bold">
                Astronomical Zodiac
              </span>
              <h3 className="font-['Anton'] text-2xl text-white mt-1 mb-2">Scorpio</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-sm">
                Scorpio is a water sign represented by the scorpion. Known for passion, intensity, determination, and strategic vision.
              </p>
            </div>
          </article>

        </div>

        {/* CUMULATIVE LIFE STATS */}
        <section className="mb-8">
          <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#f97316]" />
            <span>Cumulative Life stats</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: cumulative.days, title: "Total Days Lived" },
              { val: cumulative.hours, title: "Total Hours Lived" },
              { val: cumulative.minutes, title: "Total Minutes Lived" },
              { val: cumulative.seconds, title: "Total Seconds Lived" },
            ].map(({ val, title }) => (
              <div key={title} className="p-6 rounded-3xl glass-card border border-white/8 relative overflow-hidden hover:border-[#f97316]/30 transition-all">
                <div className="font-['Anton'] text-2xl text-white tracking-wider mb-1">
                  {val}
                </div>
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  {title}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHRONOLOGY TIMELINE */}
        <section className="p-10 rounded-3xl glass-card border border-white/8 mb-10 relative overflow-hidden">
          <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#f97316]" />
            <span>Life Chronology</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Horizontal line for desktop, vertical line for mobile */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 md:left-0 md:right-0 md:top-6 md:h-px md:w-auto" />
            
            {[
              { date: "27 Oct 2006", label: "Birth Date" },
              { date: `${age.years} Years`, label: "Current Age" },
              { date: `27 Oct ${nextBdayYear}`, label: "Next Celebration" },
            ].map(({ date, label }, idx) => (
              <div key={label} className="flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#050507] border-2 border-[#f97316] flex items-center justify-center font-bold text-xs text-[#f97316] timeline-dot">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-['Anton'] text-lg text-white">{date}</div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDIONS */}
        <section className="mb-10">
          <div className="text-xs font-mono text-[#f97316] uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#f97316]" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/8 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-['Anton'] text-sm uppercase tracking-wider text-white hover:text-[#f97316] transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#f97316]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#f97316]" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out px-5 text-neutral-400 text-xs md:text-sm leading-relaxed overflow-hidden ${
                    openFaq === idx ? "max-h-[200px] pb-5" : "max-h-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-white/8 text-center text-[10px] font-mono text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="text-[#f97316] hover:underline">
              SK KHORRUM
            </Link>
            . ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-ping" />
            <span>Real-time Telemetry Dashboard v2.0</span>
          </div>
        </footer>
      </div>

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl glass-panel border border-[#f97316]/40 text-white font-mono text-xs shadow-2xl transition-all duration-300 ${
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {toastMessage}
      </div>
    </main>
  );
}

