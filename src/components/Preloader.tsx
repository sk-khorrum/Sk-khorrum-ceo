"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for the cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds preloader

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] text-[#f3f4f6]"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
        >
          <div className="flex flex-col items-center overflow-hidden">
            <motion.h1 
              className="font-['Anton'] text-5xl md:text-7xl tracking-widest uppercase mb-4 flex items-center gap-1"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-[#c9f731]">SK</span>
              <span className="text-transparent [-webkit-text-stroke:2px_#ffffff]">KHORRUM</span>
            </motion.h1>
            
            <motion.div
              className="h-[2px] bg-[#c9f731]"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />
            
            <motion.p
              className="mt-6 font-mono text-xs text-neutral-500 uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Initializing Premium Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
