"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Zap, Sparkles, ArrowRight, Layers, Terminal } from "lucide-react";

const TOTAL_FRAMES = 53;
const FRAME_PREFIX = "/bg/ezgif-frame-";
const FRAME_SUFFIX = ".jpg";

export default function ProductScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [decryptedText, setDecryptedText] = useState("KHORRUM.");

  useEffect(() => {
    if (isLoaded) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$&*10";
    const target = "KHORRUM.";
    let iterations = 0;
    const interval = setInterval(() => {
      setDecryptedText(
        target.split("").map((letter, index) => {
          if (index < iterations) {
            return target[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iterations >= target.length) {
        iterations = 0;
      }
      iterations += 1/3;
    }, 80);
    return () => clearInterval(interval);
  }, [isLoaded]);

  // 1. Framer Motion Scroll tracking across h-[400vh]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0 -> 1 scroll to frame index 0 -> 52
  const frameIndexMotion = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Opacity & transform maps for text sections
  // Section 1: Hero (0% scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -40]);

  // Section 2: Feature #1 Left (30% scroll -> 0.25 to 0.45)
  const feature1Opacity = useTransform(scrollYProgress, [0.22, 0.30, 0.40, 0.48], [0, 1, 1, 0]);
  const feature1X = useTransform(scrollYProgress, [0.22, 0.30, 0.40, 0.48], [-40, 0, 0, -40]);

  // Section 3: Feature #2 Right (60% scroll -> 0.52 to 0.72)
  const feature2Opacity = useTransform(scrollYProgress, [0.50, 0.60, 0.70, 0.78], [0, 1, 1, 0]);
  const feature2X = useTransform(scrollYProgress, [0.50, 0.60, 0.70, 0.78], [40, 0, 0, 40]);

  // Section 4: Final CTA Centered (90% scroll -> 0.82 to 1.0)
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.90, 1.0], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.82, 0.90, 1.0], [40, 0, 0]);

  // Progress percentage bar for preloader
  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  // Draw image on canvas with cover scaling
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Clear canvas with base background color matching image
    ctx.fillStyle = "#050507";
    ctx.fillRect(0, 0, cw, ch);

    // Calculate aspect ratio containment/cover fit
    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;

    let renderWidth = cw;
    let renderHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image: scale to width
      renderWidth = cw;
      renderHeight = cw / imgRatio;
      offsetY = (ch - renderHeight) / 2;
    } else {
      // Canvas is taller than image: scale to height
      renderHeight = ch;
      renderWidth = ch * imgRatio;
      offsetX = (cw - renderWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, [images]);

  // 2. Preload frame sequence
  useEffect(() => {
    let isMounted = true;
    const preloadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `${FRAME_PREFIX}${frameNum}${FRAME_SUFFIX}`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(preloadedImages);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(preloadedImages);
          setIsLoaded(true);
        }
      };

      preloadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 3. Handle window resize and high-DPI canvas resolution
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      setCanvasSize({ width, height });

      // Redraw current frame
      const currFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(frameIndexMotion.get())
      );
      if (images[currFrame]) {
        drawFrame(currFrame);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, drawFrame, frameIndexMotion]);

  // 4. Update canvas frame on scroll
  useMotionValueEvent(frameIndexMotion, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(latest)));
    requestAnimationFrame(() => drawFrame(idx));
  });

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      drawFrame(0);
    }
  }, [isLoaded, images, drawFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050507]">
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040406] text-white p-6"
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Outer cyber circle ring */}
              <div className="relative w-36 h-36 flex items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full border border-white/5 border-t-[#f97316] animate-spin" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-2 rounded-full border border-white/5 border-b-[#f97316] animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
                <div className="absolute inset-6 rounded-full border border-white/5 border-r-[#f97316] animate-spin" style={{ animationDuration: "1.5s" }} />
                <span className="font-['Anton'] text-3xl tracking-widest text-white">SK</span>
              </div>
              
              <div className="text-center space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">SYSTEM INITIALIZING</div>
                <div className="font-mono text-xs text-[#f97316] font-bold tracking-widest uppercase h-6">
                  {decryptedText}
                </div>
              </div>
              
              <div className="mt-6 w-48 bg-white/5 h-[2px] rounded-full overflow-hidden relative border border-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#f97316]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadPercentage}%` }}
                  transition={{ duration: 0.1 }}
                  style={{ boxShadow: "0 0 10px #f97316" }}
                />
              </div>
              <div className="mt-2 text-[10px] font-mono text-white/30 tracking-widest">
                {String(loadPercentage).padStart(2, "0")}.00%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Viewport & Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
          style={{
            width: canvasSize.width || "100vw",
            height: canvasSize.height || "100vh",
          }}
        />

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial-glow opacity-60" />

        {/* Scroll Progress Indicator Line (Top border) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400 origin-left z-30"
          style={{ scaleX: scrollYProgress }}
        />

        {/* OVERLAY SECTIONS */}

        {/* 0% Scroll: HERO HEADLINE (Centered) */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none z-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-xs uppercase tracking-widest text-white/80 font-mono">
              Next-Gen Neural Workstation
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-gradient max-w-5xl leading-[1.05]">
            ENGINEERED BEYOND LIMITS
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl font-normal leading-relaxed">
            The world’s first scroll-responsive modular platform. Unrivaled speed, adaptive thermal dynamics, and hyper-scalable architecture.
          </p>

          <div className="mt-10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 animate-bounce">
            <span>Scroll down to disassemble</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-90" />
          </div>
        </motion.div>

        {/* 30% Scroll: FEATURE #1 (Left Aligned) */}
        <motion.div
          style={{ opacity: feature1Opacity, x: feature1X }}
          className="absolute inset-0 flex items-center justify-start px-6 md:px-20 pointer-events-none z-20"
        >
          <div className="max-w-md glass-panel p-8 rounded-3xl border border-white/10 pointer-events-auto">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-5 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>

            <div className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-semibold mb-2">
              01 — Thermal Architecture
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white/95 tracking-tight mb-4">
              PRECISION ARCHITECTURE
            </h2>

            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              Every sub-millimeter component is algorithmically optimized for maximum throughput. Vapor chamber matrix dissipates heat under extreme neural computing loads.
            </p>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>ACTIVE CORES</span>
              <span className="text-sky-400 font-semibold">128 THREADS</span>
            </div>
          </div>
        </motion.div>

        {/* 60% Scroll: FEATURE #2 (Right Aligned) */}
        <motion.div
          style={{ opacity: feature2Opacity, x: feature2X }}
          className="absolute inset-0 flex items-center justify-end px-6 md:px-20 pointer-events-none z-20"
        >
          <div className="max-w-md glass-panel p-8 rounded-3xl border border-white/10 pointer-events-auto text-right">
            <div className="ml-auto w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mb-5 text-sky-400">
              <Layers className="w-5 h-5" />
            </div>

            <div className="text-xs uppercase tracking-widest text-sky-400 font-mono font-semibold mb-2">
              02 — Internal Disassembly
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white/95 tracking-tight mb-4">
              QUANTUM DISASSEMBLY
            </h2>

            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              Exposing the modular silicon stack. Liquid-metal thermal interface materials coupled with titanium chassis provide structural rigidity and effortless upgradeability.
            </p>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>EFFICIENCY RATING</span>
              <span className="text-indigo-400 font-semibold">99.4% SILICON</span>
            </div>
          </div>
        </motion.div>

        {/* 90% Scroll: CTA / FINAL MESSAGE (Centered) */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none z-20"
        >
          <div className="max-w-xl glass-panel p-10 rounded-3xl border border-white/10 pointer-events-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-mono mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Reassembly Complete</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-gradient tracking-tight mb-4">
              REASSEMBLED FOR THE FUTURE
            </h2>

            <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed">
              Step into the new paradigm of creative workflow. Pre-order your AURA APEX configuration today with early founder privileges.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10 flex items-center justify-center gap-2">
                <span>Reserve Aura Apex</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/15 transition-all flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>Explore Tech Specs</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

