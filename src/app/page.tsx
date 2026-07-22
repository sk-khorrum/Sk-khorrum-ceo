"use client";

import React, { useState, useEffect, useRef } from "react";
import { getStoredProjects, getStoredBlogs, ProjectItem, BlogItem } from "@/utils/storage";
import WorkProcess from "@/components/WorkProcess";
import FAQSection from "@/components/FAQSection";
import VisitorCounter from "@/components/VisitorCounter";
import {
  Rocket,
  Mail,
  Phone,
  Code2,
  Database,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Globe,
  Award,
  BookOpen,
  Calendar,
  Clock,
  User,
  X,
  ChevronUp,
  Download,
  Send,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  
  // Project Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Requirements Form Modal State
  const [isReqModalOpen, setIsReqModalOpen] = useState(false);
  const [reqService, setReqService] = useState("");
  const [reqBrief, setReqBrief] = useState("");
  const [reqName, setReqName] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [isBriefSubmitted, setIsBriefSubmitted] = useState(false);

  // Fetch projects and blogs on mount
  useEffect(() => {
    setProjects(getStoredProjects());
    setBlogs(getStoredBlogs());
  }, []);

  // Framer Motion handles reveal animations natively now

  const handleRequirementsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqService || !reqBrief || !reqName || !reqPhone || !reqEmail) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const existingBriefsStr = localStorage.getItem("khorrum_portfolio_requirements");
      const existingBriefs = existingBriefsStr ? JSON.parse(existingBriefsStr) : [];
      const newBrief = {
        id: `brief-${Date.now()}`,
        service: reqService,
        brief: reqBrief,
        name: reqName,
        phone: reqPhone,
        email: reqEmail,
        date: new Date().toLocaleString(),
        status: "new",
      };
      localStorage.setItem("khorrum_portfolio_requirements", JSON.stringify([newBrief, ...existingBriefs]));
      setIsBriefSubmitted(true);
    } catch (err) {
      console.error("Error saving lead requirements:", err);
      alert("There was an error saving your brief. Please try again.");
    }
  };

  // Filter projects by category
  const filteredProjects = selectedCategory === "ALL" 
    ? projects 
    : projects.filter(p => p.category.toUpperCase() === selectedCategory.toUpperCase());

  // Get unique categories for project filter buttons
  const categories = ["ALL", ...Array.from(new Set(projects.map(p => p.category.toUpperCase())))];

  // Dynamic SEO JSON-LD structured data for index page
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://skkhorrum.com/#person",
        "name": "SK Khorrum",
        "jobTitle": "Web App Designer, Frontend Developer & Creative Designer",
        "url": "https://skkhorrum.com",
        "image": "https://sk-khorrum-ceo.vercel.app/assets/img/about.jpg",
        "telephone": "+8809696789563",
        "sameAs": [
          "https://facebook.com/drt.ceo",
          "https://github.com/sk_khorrum"
        ]
      },
      ...blogs.map((b) => ({
        "@type": "BlogPosting",
        "@id": `https://skkhorrum.com/blogs/#${b.id}`,
        "headline": b.title,
        "description": b.summary,
        "datePublished": b.date,
        "author": {
          "@type": "Person",
          "name": b.author || "SK Khorrum"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SK Khorrum",
          "logo": {
            "@type": "ImageObject",
            "url": "https://sk-khorrum-ceo.vercel.app/assets/img/about.jpg"
          }
        },
        "mainEntityOfPage": "https://skkhorrum.com",
        "articleBody": b.content
      })),
      ...projects.map((p) => ({
        "@type": "CreativeWork",
        "@id": `https://skkhorrum.com/projects/#${p.id}`,
        "name": p.title,
        "description": p.description,
        "url": p.link,
        "genre": p.category,
        "creator": {
          "@type": "Person",
          "name": "SK Khorrum"
        }
      }))
    ]
  };

  // Scroll-driven frame animation (Apple-style) — scoped to MY JOURNEY section
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const journeySectionRef = useRef<HTMLElement>(null);
  const frameCount = 53;
  const frameImages = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Draw helpers (defined first so setSize can call them on resize) ──
    const drawFrame = (index: number) => {
      const img = frameImages.current[index];
      if (!img || !img.complete || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Cover-fit the image
      const canvasRatio = w / h;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let drawW, drawH, drawX, drawY;
      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      // Dark overlay
      ctx.fillStyle = "rgba(5,5,5,0.60)";
      ctx.fillRect(0, 0, w, h);
    };

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // ── Responsive canvas sizing (phone + tablet + PC) ──
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const vp = window.visualViewport;
      const w = vp ? vp.width : window.innerWidth;
      const h = vp ? vp.height : window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      // Redraw current frame after resize so canvas never goes blank
      if (currentFrame.current >= 0) {
        drawFrame(currentFrame.current);
      } else {
        clearCanvas();
      }
    };
    setSize();

    // Orientation change (mobile): wait for browser to settle then resize
    const onOrientationChange = () => setTimeout(setSize, 200);
    window.addEventListener("resize", setSize);
    window.addEventListener("orientationchange", onOrientationChange);
    // iOS Safari visual viewport resize (address bar show/hide)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setSize);
    }

    // ── Preload all 53 frames ──
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/bg/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) drawFrame(0);
      };
      images.push(img);
    }
    frameImages.current = images;

    // ── Scroll handler ──
    const handleScroll = () => {
      const journeyEl = journeySectionRef.current;
      if (!journeyEl) return;

      const journeyBottom = journeyEl.offsetTop + journeyEl.offsetHeight;
      const scrollTop = window.scrollY;

      // After MY JOURNEY section ends: solid black
      if (scrollTop >= journeyBottom) {
        if (currentFrame.current !== -1) {
          currentFrame.current = -1;
          clearCanvas();
        }
        return;
      }

      // Hero → end of MY JOURNEY: animate all 53 frames
      const progress = Math.min(scrollTop / journeyBottom, 1);
      const frameIndex = Math.min(
        Math.floor(progress * (frameCount - 1)),
        frameCount - 1
      );
      if (frameIndex !== currentFrame.current) {
        currentFrame.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("orientationchange", onOrientationChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setSize);
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#ffffff] selection:bg-[#c9f731] selection:text-[#050505] font-sans overflow-x-hidden">
      
      {/* Google SEO JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* SCROLL-DRIVEN FRAME ANIMATION BACKGROUND — full viewport on all devices */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {/* 2. FOREGROUND CONTENT (SK KHORRUM PORTFOLIO) */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between backdrop-blur-xl bg-[#050505]/60 border-b border-white/10 transition-all">
          <a href="#hero" className="font-['Anton'] text-2xl tracking-wider text-white">
            KHORRUM<em className="not-italic text-[#c9f731]">.</em>
          </a>

          <ul className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <li><a href="#about" className="hover:text-[#c9f731] transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-[#c9f731] transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-[#c9f731] transition-colors">Projects</a></li>
            <li><a href="#blogs" className="hover:text-[#c9f731] transition-colors">Blogs</a></li>
            <li><a href="#journey" className="hover:text-[#c9f731] transition-colors">Journey</a></li>
            <li><a href="#faqs" className="hover:text-[#c9f731] transition-colors">FAQs</a></li>
            <li><a href="#contact" className="hover:text-[#c9f731] transition-colors">Contact</a></li>
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#c9f731] text-[#050505] font-semibold text-xs hover:bg-[#a5cc28] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#c9f731]/10"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-32 pb-16 max-w-7xl mx-auto relative">
          <div className="space-y-6 max-w-4xl">
            <h1 className="font-['Anton'] text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none">
              <span className="text-[#c9f731]">SK</span>
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_#ffffff]">
                KHORRUM
              </span>
            </h1>

            <p className="font-['Playfair_Display'] italic text-xl sm:text-2xl text-neutral-300 max-w-2xl">
              Digital Marketer & Web App Maker.
            </p>

            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c9f731] text-[#050505] font-semibold text-sm hover:bg-[#a5cc28] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#c9f731]/20"
              >
                <Rocket className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15 text-white font-medium text-sm hover:border-[#c9f731] hover:text-[#c9f731] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </section>

        {/* MARQUEE SECTION */}
        <div className="py-8 overflow-hidden bg-[#050505]/50 backdrop-blur-md border-y border-white/10">
          <div className="flex whitespace-nowrap animate-marquee gap-12 font-['Anton'] text-3xl md:text-4xl text-neutral-600 uppercase tracking-widest">
            <span>FRONTEND DEV •</span>
            <span>UI/UX DESIGN •</span>
            <span className="text-[#c9f731]">DIGITAL MARKETER •</span>
            <span>THREE.JS •</span>
            <span>OSINT RESEARCH •</span>
            <span>FRONTEND DEV •</span>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-2 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9f731]" />
              <span>Profile</span>
            </div>
            <h2 className="font-['Anton'] text-5xl md:text-7xl mb-12 tracking-wide text-white">WHO I AM</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <Reveal delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900/40 backdrop-blur-md aspect-[3/4]">
              <img
                src="https://sk-khorrum-ceo.vercel.app/assets/img/about.jpg"
                alt="SK Khorrum"
                className="w-full h-full object-cover"
              />
              <a
                href="tel:+8809696789563"
                className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#050505]/85 backdrop-blur-md border border-white/15 font-mono text-xs text-[#c9f731]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+8809696789563</span>
              </a>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="p-8 sm:p-10 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-white">
                Digital Marketer & Web App Maker
              </h3>

              <p className="text-neutral-300 leading-relaxed">
                I am SK Khorrum, an 20-year-old tech enthusiast with 5 years of experience in creating digital experiences.
              </p>

              <p className="text-neutral-400 leading-relaxed">
                My goal is to establish myself as a top-tier IT Expert through innovative web development and secure infrastructure design.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="font-['Anton'] text-4xl text-[#c9f731]">5+</div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase mt-1">Years Exp</div>
                </div>
                <div>
                  <div className="font-['Anton'] text-4xl text-[#c9f731]">22+</div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase mt-1">Projects</div>
                </div>
                <div>
                  <div className="font-['Anton'] text-4xl text-[#c9f731]">100%</div>
                  <div className="text-[11px] font-mono text-neutral-500 uppercase mt-1">Creative</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-2 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9f731]" />
              <span>Expertise</span>
            </div>
            <h2 className="font-['Anton'] text-5xl md:text-7xl mb-12 tracking-wide text-white">SKILLS</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.2}>
              <div className="p-8 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 hover:border-[#c9f731] transition-all h-full">
              <div className="w-12 h-12 mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#c9f731]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M30,35 L10,50 L30,65" strokeLinecap="round" strokeLinejoin="round" className="animate-bracket-left" />
                  <path d="M70,35 L90,50 L70,65" strokeLinecap="round" strokeLinejoin="round" className="animate-bracket-right" />
                  <ellipse cx="50" cy="50" rx="25" ry="8" transform="rotate(30 50 50)" strokeOpacity="0.3" />
                  <ellipse cx="50" cy="50" rx="25" ry="8" transform="rotate(150 50 50)" strokeOpacity="0.3" />
                  <circle cx="50" cy="50" r="4" fill="currentColor">
                    <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Development</h4>
              <div className="flex flex-wrap gap-2">
                {["HTML", "CSS", "JavaScript", "React", "Next.js", "Three.js", "Node.js", "Python"].map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 hover:border-[#c9f731] transition-all">
              <div className="w-12 h-12 mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#c9f731]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="10" y1="90" x2="90" y2="90" stroke-opacity="0.2" />
                  <line x1="10" y1="10" x2="10" y2="90" stroke-opacity="0.2" />
                  <path d="M10,80 Q30,40 50,60 T90,20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-svg-path-1" />
                  <path d="M10,85 Q30,65 50,75 T90,40" stroke="currentColor" strokeWidth="1.5" stroke-opacity="0.5" strokeDasharray="4 4" strokeLinecap="round" className="animate-svg-path-2" />
                  <circle cx="90" cy="20" r="5" fill="currentColor">
                    <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Backend & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {["Firebase", "PostgreSQL", "Docker", "AWS", "FastAPI", "TensorFlow"].map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 hover:border-[#c9f731] transition-all">
              <div className="w-12 h-12 mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#c9f731]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M50,15 C65,15 80,20 80,20 C80,20 80,55 50,85 C20,55 20,20 20,20 C20,20 35,15 50,15 Z" strokeLinecap="round" strokeLinejoin="round" className="animate-shield" />
                  <circle cx="50" cy="45" r="10" stroke-dasharray="3 3" />
                  <line x1="25" y1="45" x2="75" y2="45" strokeWidth="1" className="animate-scanline" />
                  <path d="M45,45 L50,50 L55,42" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Specialized</h4>
              <div className="flex flex-wrap gap-2">
                {["Java (Dex/D8)", "OSINT Framework", "Social Engineering"].map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-2 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9f731]" />
              <span>Portfolio</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <h2 className="font-['Anton'] text-5xl md:text-7xl tracking-wide text-white">FEATURED WORK</h2>
              
              {/* Category filtering pills */}
              <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
                    selectedCategory === cat
                      ? "bg-[#c9f731] text-[#050505] font-bold"
                      : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#c9f731] mb-4">
                    <span className="uppercase">{proj.category}</span>
                    <span>{proj.badge}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-[#c9f731] transition-colors mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-neutral-400 group-hover:text-white">
                  <span>Explore Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                </a>
              </Reveal>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-2 text-center py-16 rounded-3xl border border-white/5 bg-white/5 font-mono text-xs text-neutral-500">
                No projects found in this category. Go to admin panel to add one!
              </div>
            )}
          </div>
        </motion.section>

        <WorkProcess />

        {/* NEW BLOGS SECTION */}
        <section id="blogs" className="py-28 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5">
          <Reveal>
            <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-2 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9f731]" />
              <span>Thoughts & Insights</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <h2 className="font-['Anton'] text-5xl md:text-7xl tracking-wide text-white">LATEST BLOGS</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-white hover:border-[#c9f731] hover:text-[#c9f731] font-mono text-xs uppercase tracking-wider transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View All Blogs</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <Reveal key={blog.id} delay={0.2 + (index * 0.1)}>
                <Link
                  href={`/blog/${blog.id}`}
                className="group p-8 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 hover:border-[#c9f731] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#c9f731] mb-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase">
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#c9f731] transition-colors mb-3 leading-tight">
                    {blog.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.date}</span>
                  </div>
                  <span className="text-[#c9f731] group-hover:underline flex items-center gap-1">
                    Read Article <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                </Link>
              </Reveal>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-2 text-center py-16 rounded-3xl border border-white/5 bg-white/5 font-mono text-xs text-neutral-500">
                No blog posts published yet. Use admin panel to write articles!
              </div>
            )}
          </div>
        </motion.section>

        {/* JOURNEY SECTION */}
        <section ref={journeySectionRef} id="journey" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-2 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9f731]" />
              <span>Education & Exp</span>
            </div>
            <h2 className="font-['Anton'] text-5xl md:text-7xl mb-12 tracking-wide text-white">MY JOURNEY</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="p-10 sm:p-14 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 space-y-10 relative">
            <div className="border-l-2 border-[#c9f731] pl-8 space-y-10">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#c9f731] shadow-lg shadow-[#c9f731]" />
                <div className="text-xs font-mono text-[#c9f731] mb-1">CURRENT</div>
                <h4 className="text-2xl font-bold text-white mb-2">Frontend & Web Developer</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Developed multiple apps and web tools used by thousands of users, focusing on modern web technologies.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#c9f731] shadow-lg shadow-[#c9f731]" />
                <div className="text-xs font-mono text-[#c9f731] mb-1">MARKETER</div>
                <h4 className="text-2xl font-bold text-white mb-2">Digital Marketer & Web App Maker</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Creating data-driven digital marketing campaigns and scalable web applications for a modern audience.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#c9f731] shadow-lg shadow-[#c9f731]" />
                <div className="text-xs font-mono text-[#c9f731] mb-1">EDUCATION</div>
                <h4 className="text-2xl font-bold text-white mb-2">Technical Studies</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Bhowanipur & Khulna Technical Institute.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <FAQSection />

        {/* CONTACT SECTION */}
        <section id="contact" className="py-28 px-6 md:px-16 max-w-7xl mx-auto text-center">
          <Reveal>
            <div className="p-12 sm:p-16 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 max-w-4xl mx-auto">
            <h2 className="font-['Anton'] text-5xl md:text-7xl mb-6 text-white">LET'S CONNECT</h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">
              Ready to build something amazing?
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://facebook.com/drt.ceo"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-white hover:border-[#c9f731] hover:text-[#c9f731] transition-all font-mono text-sm group flex items-center gap-2.5"
              >
                <svg className="w-5 h-5 text-[#c9f731] transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" className="animate-fb-path" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="mailto:Skkhorrum@yahoo.com"
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-white hover:border-[#c9f731] hover:text-[#c9f731] transition-all font-mono text-sm group flex items-center gap-2.5"
              >
                <svg className="w-5 h-5 text-[#c9f731] transition-transform group-hover:translate-y-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" className="animate-mail-flap" />
                </svg>
                <span>Email</span>
              </a>
              <a
                href="https://github.com/sk_khorrum"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-white hover:border-[#c9f731] hover:text-[#c9f731] transition-all font-mono text-sm group flex items-center gap-2.5"
              >
                <svg className="w-5 h-5 text-[#c9f731] transition-transform group-hover:rotate-[10deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" className="animate-git-wag" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-white/10 text-center font-mono text-xs text-neutral-500 bg-[#050505]/70 backdrop-blur-md flex flex-col items-center gap-4 justify-between sm:flex-row px-8">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-[#c9f731]">SK KHORRUM</span>. ALL RIGHTS RESERVED.
          </p>
          
          <VisitorCounter />
        </footer>
      </div>


      {/* HUD FLOATING ACTIONS (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Download CV Button */}
        <a
          href="/assets/SK_Khorrum_CV.pdf"
          download
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#c9f731] text-white hover:text-[#c9f731] font-mono text-[11px] uppercase tracking-wider transition-all shadow-lg hover:scale-105"
          title="Download CV"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download CV</span>
        </a>

        {/* Animated Email Popup Button */}
        <button
          onClick={() => setIsReqModalOpen(true)}
          className="relative w-12 h-12 rounded-xl bg-[#c9f731] text-[#050505] flex items-center justify-center hover:bg-[#a5cc28] transition-all shadow-lg shadow-[#c9f731]/20 hover:scale-110 active:scale-95 group animate-pulse"
          title="Request Project Requirement"
        >
          <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
      </div>

      {/* REQUIREMENTS FORM MODAL */}
      {isReqModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0c0c0e] border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsReqModalOpen(false);
                if (isBriefSubmitted) {
                  setIsBriefSubmitted(false);
                  setReqService("");
                  setReqBrief("");
                  setReqName("");
                  setReqPhone("");
                  setReqEmail("");
                }
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-all animate-none"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            {!isBriefSubmitted && (
              <div className="space-y-1">
                <h3 className="font-['Anton'] text-2xl text-white tracking-wider flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#c9f731]" />
                  <span>PROJECT REQUIREMENTS</span>
                </h3>
                <p className="text-xs font-mono text-neutral-400">Submit your brief directly to SK Khorrum</p>
              </div>
            )}

            {isBriefSubmitted ? (
              <div className="py-6 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-[#c9f731]/10 border border-[#c9f731]/30 rounded-full flex items-center justify-center text-[#c9f731] mx-auto">
                  <Check className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-['Anton'] text-2xl text-white tracking-wider">
                    SUBMISSION SUCCESS!
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Your brief has been saved directly to the database. SK Khorrum has been notified and will review your requirements.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsReqModalOpen(false);
                      setIsBriefSubmitted(false);
                      setReqService("");
                      setReqBrief("");
                      setReqName("");
                      setReqPhone("");
                      setReqEmail("");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#c9f731] text-[#050505] text-xs font-mono font-bold hover:bg-[#a5cc28] transition-all shadow-lg"
                  >
                    Return to Portfolio
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRequirementsSubmit} className="space-y-4 font-mono text-xs text-white/70">
                {/* Service Selection */}
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Select Service *</label>
                  <select
                    value={reqService}
                    onChange={(e) => setReqService(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141416] border border-white/15 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs"
                  >
                    <option value="" disabled>Choose service type...</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web & App Development">Web & App Development</option>
                  </select>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Client Project Brief *</label>
                  <textarea
                    value={reqBrief}
                    onChange={(e) => setReqBrief(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your project goals, features, and budget details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs placeholder:text-neutral-600"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Your Phone / Number *</label>
                    <input
                      type="tel"
                      value={reqPhone}
                      onChange={(e) => setReqPhone(e.target.value)}
                      required
                      placeholder="+8801234..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Your Email *</label>
                  <input
                    type="email"
                    value={reqEmail}
                    onChange={(e) => setReqEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#a5cc28] transition-all shadow-lg shadow-[#c9f731]/10 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Requirement Details</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
