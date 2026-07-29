"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SeoIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Globe */}
    <circle cx="28" cy="28" r="20" stroke="#f97316" strokeWidth="2.5" fill="none"/>
    <ellipse cx="28" cy="28" rx="9" ry="20" stroke="#f97316" strokeWidth="1.5" fill="none"/>
    <line x1="8" y1="28" x2="48" y2="28" stroke="#f97316" strokeWidth="1.5"/>
    <line x1="11" y1="18" x2="45" y2="18" stroke="#f97316" strokeWidth="1"/>
    <line x1="11" y1="38" x2="45" y2="38" stroke="#f97316" strokeWidth="1"/>
    {/* Magnifier */}
    <circle cx="42" cy="42" r="10" stroke="#ffffff" strokeWidth="2.5" fill="none"/>
    <line x1="49.5" y1="49.5" x2="58" y2="58" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
    {/* Rank bars */}
    <rect x="4" y="50" width="4" height="10" rx="1" fill="#f97316" opacity="0.5"/>
    <rect x="10" y="44" width="4" height="16" rx="1" fill="#f97316" opacity="0.7"/>
    <rect x="16" y="38" width="4" height="22" rx="1" fill="#f97316"/>
  </svg>
);

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] text-[#f3f4f6]"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
        >
          <div className="flex flex-col items-center overflow-hidden gap-6">
            {/* SEO Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SeoIcon />
            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-['Anton'] text-5xl md:text-7xl tracking-widest uppercase flex items-center gap-1"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              <span className="text-[#f97316]">SK</span>
              <span className="text-transparent [-webkit-text-stroke:2px_#ffffff]">KHORRUM</span>
            </motion.h1>

            {/* Progress bar */}
            <motion.div
              className="h-[2px] bg-[#f97316] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "220px" }}
              transition={{ duration: 2.0, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Tag line */}
            <motion.p
              className="font-mono text-xs text-neutral-500 uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              SEO Expert &amp; Web Designer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
