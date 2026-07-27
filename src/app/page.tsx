"use client";

import React, { useState, useEffect, useRef } from "react";
import { getStoredProjects, getStoredBlogs, ProjectItem, BlogItem } from "@/utils/storage";
import WorkProcess from "@/components/WorkProcess";
import FAQSection from "@/components/FAQSection";
import VisitorCounter from "@/components/VisitorCounter";
import {
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  Clock,
  X,
  Download,
  Send,
  Sparkles,
  Check,
  Menu,
  ArrowUpRight,
  Zap,
  Globe,
  Code2,
  Shield,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";

// ─── Animated Section Wrapper ───────────────────────────────────────────────
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0px)" : "translateY(60px)",
        filter: isInView ? "blur(0px)" : "blur(6px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </section>
  );
}

// ─── Stagger Container ───────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Section Header Component ────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14"
    >
      <div className="text-xs font-mono text-[#c9f731] uppercase tracking-[0.25em] mb-3 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-[#c9f731] opacity-60" />
        <span className="opacity-80">{label}</span>
      </div>
      <h2 className="font-['Anton'] text-5xl md:text-7xl tracking-wide text-white leading-none">
        {title}
      </h2>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Requirements Form Modal State
  const [isReqModalOpen, setIsReqModalOpen] = useState(false);
  const [reqService, setReqService] = useState("");
  const [reqBrief, setReqBrief] = useState("");
  const [reqName, setReqName] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [isBriefSubmitted, setIsBriefSubmitted] = useState(false);

  // Navbar scroll state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getStoredProjects().then(setProjects);
    getStoredBlogs().then(setBlogs);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === selectedCategory.toUpperCase());
  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category.toUpperCase())))];

  // ─ JSON-LD ─
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://khorrum.pro.bd/#person",
        name: "SK Khorrum",
        jobTitle: "Web App Designer, Frontend Developer & Creative Designer",
        url: "https://khorrum.pro.bd/",
        image: "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
        telephone: "+8809696789563",
        sameAs: ["https://facebook.com/drt.ceo", "https://github.com/sk-khorrum"],
      },
      ...blogs.map((b) => ({
        "@type": "BlogPosting",
        "@id": `https://khorrum.pro.bd/blogs/#${b.id}`,
        headline: b.title,
        description: b.summary,
        datePublished: b.date,
        author: { "@type": "Person", name: b.author || "SK Khorrum" },
      })),
      ...projects.map((p) => ({
        "@type": "CreativeWork",
        "@id": `https://khorrum.pro.bd/projects/#${p.id}`,
        name: p.title,
        description: p.description,
        url: p.link,
        genre: p.category,
        creator: { "@type": "Person", name: "SK Khorrum" },
      })),
    ],
  };

  // ─ Scroll-driven canvas (Journey section) ─
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

    const drawFrame = (index: number) => {
      const img = frameImages.current[index];
      if (!img || !img.complete || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const canvasRatio = w / h;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let drawW, drawH, drawX, drawY;
      if (canvasRatio > imgRatio) {
        drawW = w; drawH = w / imgRatio; drawX = 0; drawY = (h - drawH) / 2;
      } else {
        drawH = h; drawW = h * imgRatio; drawX = (w - drawW) / 2; drawY = 0;
      }
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.fillStyle = "rgba(5,5,5,0.55)";
      ctx.fillRect(0, 0, w, h);
    };

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

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
      if (currentFrame.current >= 0) drawFrame(currentFrame.current);
      else clearCanvas();
    };
    setSize();

    const onOrientationChange = () => setTimeout(setSize, 200);
    window.addEventListener("resize", setSize);
    window.addEventListener("orientationchange", onOrientationChange);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", setSize);

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const num = String(i).padStart(3, "0");
      img.src = `/bg/ezgif-frame-${num}.jpg`;
      img.onload = () => { loadedCount++; if (loadedCount === 1) drawFrame(0); };
      images.push(img);
    }
    frameImages.current = images;

    const handleScroll = () => {
      const journeyEl = journeySectionRef.current;
      if (!journeyEl) return;
      const journeyBottom = journeyEl.offsetTop + journeyEl.offsetHeight;
      const scrollTop = window.scrollY;
      if (scrollTop >= journeyBottom) {
        if (currentFrame.current !== -1) { currentFrame.current = -1; clearCanvas(); }
        return;
      }
      const progress = Math.min(scrollTop / journeyBottom, 1);
      const frameIndex = Math.min(Math.floor(progress * (frameCount - 1)), frameCount - 1);
      if (frameIndex !== currentFrame.current) { currentFrame.current = frameIndex; drawFrame(frameIndex); }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("orientationchange", onOrientationChange);
      if (window.visualViewport) window.visualViewport.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <main className="relative min-h-screen text-[#ffffff] selection:bg-[#c9f731] selection:text-[#050505] font-sans overflow-x-hidden bg-transparent">

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />

      {/* ── SCROLL-DRIVEN CANVAS BACKGROUND ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {/* ── FLOATING ORBS ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10">

        {/* ─────────────────── NAVBAR ─────────────────── */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "backdrop-blur-2xl bg-[#050505]/60 border-b border-white/10 shadow-2xl shadow-black/50"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <motion.a
            href="#about"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['Anton'] text-2xl tracking-wider text-white relative z-50"
          >
            KHORRUM<em className="not-italic text-[#c9f731]">.</em>
          </motion.a>

          {/* Desktop Links */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase"
          >
            {["about", "skills", "projects", "blogs", "journey", "faqs", "contact"].map((item, i) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="text-neutral-400 hover:text-[#c9f731] transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c9f731] group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 relative z-50"
          >
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#e8ff85] transition-all btn-neon"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#c9f731] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[64px] left-0 right-0 z-40 backdrop-blur-2xl bg-[#050505]/90 border-b border-white/10 md:hidden flex flex-col px-6 py-8 shadow-2xl"
            >
              <ul className="flex flex-col gap-6 text-sm font-mono tracking-widest uppercase text-neutral-300">
                {["about", "skills", "projects", "blogs", "journey", "faqs", "contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-[#c9f731] transition-colors block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs sm:hidden"
              >
                Get in Touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─────────────────── MARQUEE ─────────────────── */}
        <div className="pt-[72px] overflow-hidden border-b border-white/5">
          <div className="py-6 flex items-center">
            <div
              className="flex whitespace-nowrap gap-16 font-['Anton'] text-3xl md:text-4xl uppercase tracking-widest"
              style={{ animation: "marqueeScroll 32s linear infinite", display: "inline-flex" }}
            >
              {[
                { text: "FRONTEND DEV •", accent: false },
                { text: "UI/UX DESIGN •", accent: false },
                { text: "DIGITAL MARKETER •", accent: true },
                { text: "THREE.JS •", accent: false },
                { text: "OSINT RESEARCH •", accent: false },
                { text: "NEXT.JS •", accent: false },
                { text: "FRONTEND DEV •", accent: false },
                { text: "UI/UX DESIGN •", accent: false },
                { text: "DIGITAL MARKETER •", accent: true },
                { text: "THREE.JS •", accent: false },
                { text: "OSINT RESEARCH •", accent: false },
                { text: "NEXT.JS •", accent: false },
              ].map((item, i) => (
                <span key={i} className={item.accent ? "text-[#c9f731]" : "text-neutral-700"}>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────── ABOUT ─────────────────── */}
        <Section id="about" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <SectionHeader label="Profile" title="WHO I AM" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            {/* Photo */}
            <motion.div variants={fadeUpItem} className="relative rounded-3xl overflow-hidden border border-white/10 glass-card aspect-[3/4] shimmer-border">
              <img
                src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
                alt="SK Khorrum"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
              <a
                href="tel:+8809696789563"
                className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel border border-white/15 font-mono text-xs text-[#c9f731] hover:border-[#c9f731]/50 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+8809696789563</span>
              </a>
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeUpItem} className="p-8 sm:p-10 rounded-3xl glass-card border border-white/8 space-y-8">
              <div>
                <h3 className="font-['Anton'] text-3xl sm:text-4xl text-white mb-2 leading-tight">
                  Digital Marketer &amp; <span className="text-[#c9f731]">Web App Maker</span>
                </h3>
                <p className="text-neutral-300 leading-relaxed text-sm mt-4">
                  I am SK Khorrum, a 20-year-old tech enthusiast with 5 years of experience in creating digital experiences.
                </p>
                <p className="text-neutral-400 leading-relaxed text-sm mt-3">
                  My goal is to establish myself as a top-tier IT Expert through innovative web development and secure infrastructure design.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/8">
                {[
                  { num: "5+", label: "Years Exp" },
                  { num: "22+", label: "Projects" },
                  { num: "100%", label: "Creative" },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <div className="stat-number">{num}</div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase mt-1 tracking-wider">{label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-neon font-bold text-xs"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" /> Hire Me
                </a>
                <a
                  href="/assets/SK_Khorrum_CV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-pill border border-white/15 text-white font-mono text-xs hover:border-[#c9f731]/40 hover:text-[#c9f731] transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Download CV
                </a>
              </div>
            </motion.div>
          </motion.div>
        </Section>

        {/* ─────────────────── SKILLS ─────────────────── */}
        <Section id="skills" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <SectionHeader label="Expertise" title="SKILLS" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Code2 className="w-8 h-8 text-[#c9f731]" />,
                title: "Development",
                tags: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Three.js", "Node.js", "Python"],
                index: "01",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#c9f731]" />,
                title: "Digital Marketing",
                tags: ["Google Ads", "Meta Business", "Google Analytics 4", "SEMrush", "Ahrefs", "Mailchimp", "GTM & Pixel"],
                index: "02",
              },
              {
                icon: <Shield className="w-8 h-8 text-[#c9f731]" />,
                title: "Specialized",
                tags: ["Java (Dex/D8)", "OSINT Framework", "Social Engineering"],
                index: "03",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUpItem}
                className="relative p-8 rounded-3xl glass-card border border-white/8 hover:border-[#c9f731]/30 transition-all group overflow-hidden"
              >
                <span className="card-index">{card.index}</span>
                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-2xl bg-[#c9f731]/8 border border-[#c9f731]/20 group-hover:bg-[#c9f731]/15 transition-all">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-5">{card.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((s) => (
                    <span key={s} className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
                {/* Hover glow bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9f731]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ─────────────────── PROJECTS ─────────────────── */}
        <Section id="projects" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <SectionHeader label="Portfolio" title="FEATURED WORK" />
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all uppercase ${
                    selectedCategory === cat
                      ? "bg-[#c9f731] text-[#050505] font-bold shadow-lg shadow-[#c9f731]/20"
                      : "glass-pill text-neutral-400 hover:text-white border border-white/10 hover:border-[#c9f731]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.a
                  key={proj.id}
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  variants={fadeUpItem}
                  layout
                  className="group relative p-8 rounded-3xl glass-card border border-white/8 hover:border-[#c9f731]/35 transition-all flex flex-col justify-between overflow-hidden shimmer-border"
                >
                  <span className="absolute top-4 right-5 font-['Anton'] text-6xl text-[#c9f731]/5 pointer-events-none select-none leading-none">
                    {proj.category?.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#c9f731] mb-4">
                      <span className="px-2 py-1 rounded-lg bg-[#c9f731]/10 border border-[#c9f731]/20 uppercase tracking-wider">
                        {proj.category}
                      </span>
                      <span className="text-neutral-500">{proj.badge}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-[#c9f731] transition-colors mb-3 leading-tight">
                      {proj.title}
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{proj.description}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/8 flex items-center gap-2 text-xs font-mono text-neutral-500 group-hover:text-[#c9f731] transition-colors">
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="col-span-2 text-center py-16 rounded-3xl border border-white/5 glass-card font-mono text-xs text-neutral-500">
                No projects found in this category. Go to admin panel to add one!
              </div>
            )}
          </motion.div>
        </Section>

        {/* ─────────────────── WORK PROCESS ─────────────────── */}
        <WorkProcess />

        {/* ─────────────────── BLOGS ─────────────────── */}
        <Section id="blogs" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader label="Thoughts & Insights" title="LATEST BLOGS" />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-pill border border-white/15 text-white hover:border-[#c9f731]/50 hover:text-[#c9f731] font-mono text-xs uppercase tracking-wider transition-all mb-14"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View All Blogs</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {blogs.map((blog) => (
              <motion.div key={blog.id} variants={fadeUpItem}>
                <Link
                  href={`/blog/${blog.id}`}
                  className="group block p-8 rounded-3xl glass-card border border-white/8 hover:border-[#c9f731]/35 transition-all flex flex-col justify-between shimmer-border"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#c9f731] mb-4">
                      <span className="px-2 py-1 rounded-lg bg-[#c9f731]/10 border border-[#c9f731]/20 uppercase tracking-wider">
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
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">{blog.summary}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.date}</span>
                    </div>
                    <span className="text-[#c9f731] group-hover:underline flex items-center gap-1">
                      Read Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-2 text-center py-16 rounded-3xl border border-white/5 glass-card font-mono text-xs text-neutral-500">
                No blog posts published yet. Use admin panel to write articles!
              </div>
            )}
          </motion.div>
        </Section>

        {/* ─────────────────── JOURNEY ─────────────────── */}
        <section ref={journeySectionRef} id="journey" className="py-28 px-6 md:px-16 max-w-7xl mx-auto relative">
          <SectionHeader label="Education & Exp" title="MY JOURNEY" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 sm:p-14 rounded-3xl glass-card border border-white/8 relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#c9f731]/4 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="border-l-2 border-[#c9f731]/50 pl-8 space-y-12">
              {[
                {
                  label: "CURRENT",
                  title: "Frontend & Web Developer",
                  desc: "Developed multiple apps and web tools used by thousands of users, focusing on modern web technologies.",
                },
                {
                  label: "MARKETER",
                  title: "Digital Marketer & Web App Maker",
                  desc: "Creating data-driven digital marketing campaigns and scalable web applications for a modern audience.",
                },
                {
                  label: "EDUCATION",
                  title: "Technical Studies",
                  desc: "Bhowanipur & Khulna Technical Institute.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#c9f731] timeline-dot shadow-lg shadow-[#c9f731]/30" />
                  <div className="text-xs font-mono text-[#c9f731] mb-1 tracking-widest">{item.label}</div>
                  <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─────────────────── FAQ ─────────────────── */}
        <FAQSection />

        {/* ─────────────────── CONTACT ─────────────────── */}
        <Section id="contact" className="py-28 px-6 md:px-16 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-12 sm:p-16 rounded-3xl glass-card border border-white/8 max-w-4xl mx-auto overflow-hidden"
          >
            {/* BG glows inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9f731]/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#c9f731]/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-xs font-mono text-[#c9f731] uppercase tracking-[0.25em] mb-3 opacity-70">Let's Build</div>
              <h2 className="font-['Anton'] text-5xl md:text-7xl mb-6 text-white leading-none">
                LET&apos;S CONNECT
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Ready to build something amazing? Let&apos;s create digital experiences that leave a lasting impression.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  {
                    label: "Facebook",
                    href: "https://facebook.com/drt.ceo",
                    icon: (
                      <svg className="w-5 h-5 text-[#c9f731]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeLinecap="round" strokeLinejoin="round" className="animate-fb-path" />
                      </svg>
                    ),
                  },
                  {
                    label: "Email",
                    href: "mailto:Skkhorrum@yahoo.com",
                    icon: (
                      <svg className="w-5 h-5 text-[#c9f731]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" className="animate-mail-flap" />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    href: "https://github.com/sk-khorrum",
                    icon: (
                      <svg className="w-5 h-5 text-[#c9f731]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" className="animate-git-wag" />
                      </svg>
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group px-8 py-3.5 rounded-full glass-pill border border-white/15 text-white hover:border-[#c9f731]/50 hover:text-[#c9f731] transition-all font-mono text-sm flex items-center gap-2.5"
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ─────────────────── FOOTER ─────────────────── */}
        <footer className="py-10 border-t border-white/8 font-mono text-xs text-neutral-500 flex flex-col items-center gap-4 justify-between sm:flex-row px-8 backdrop-blur-md bg-[#050505]/30">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-[#c9f731]">SK KHORRUM</span>. ALL RIGHTS RESERVED.
          </p>
          <VisitorCounter />
        </footer>
      </div>

      {/* ─────────────────── HUD FLOATING ACTIONS ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3"
      >
        <a
          href="/assets/SK_Khorrum_CV.pdf"
          download
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel border border-white/10 hover:border-[#c9f731]/40 text-white hover:text-[#c9f731] font-mono text-[11px] uppercase tracking-wider transition-all shadow-lg hover:scale-105"
          title="Download CV"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download CV</span>
        </a>

        <button
          onClick={() => setIsReqModalOpen(true)}
          className="relative w-12 h-12 rounded-xl bg-[#c9f731] text-[#050505] flex items-center justify-center hover:bg-[#e8ff85] transition-all shadow-lg shadow-[#c9f731]/30 hover:scale-110 active:scale-95 group animate-pulse"
          title="Request Project Requirement"
        >
          <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        </button>
      </motion.div>

      {/* ─────────────────── REQUIREMENTS MODAL ─────────────────── */}
      {isReqModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-white/12 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => {
                setIsReqModalOpen(false);
                if (isBriefSubmitted) {
                  setIsBriefSubmitted(false);
                  setReqService(""); setReqBrief(""); setReqName(""); setReqPhone(""); setReqEmail("");
                }
              }}
              className="absolute top-5 right-5 p-2 rounded-full glass-pill hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

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
                  <h4 className="font-['Anton'] text-2xl text-white tracking-wider">SUBMISSION SUCCESS!</h4>
                  <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Your brief has been saved. SK Khorrum has been notified and will review your requirements.
                  </p>
                </div>
                <button
                  onClick={() => { setIsReqModalOpen(false); setIsBriefSubmitted(false); setReqService(""); setReqBrief(""); setReqName(""); setReqPhone(""); setReqEmail(""); }}
                  className="px-6 py-2.5 rounded-xl bg-[#c9f731] text-[#050505] text-xs font-mono font-bold hover:bg-[#e8ff85] transition-all shadow-lg"
                >
                  Return to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequirementsSubmit} className="space-y-4 font-mono text-xs text-white/70">
                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Select Service *</label>
                  <select
                    value={reqService}
                    onChange={(e) => setReqService(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/12 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs transition-colors"
                  >
                    <option value="" disabled>Choose service type...</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web & App Development">Web &amp; App Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Client Project Brief *</label>
                  <textarea
                    value={reqBrief}
                    onChange={(e) => setReqBrief(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your project goals, features, and budget details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs placeholder:text-neutral-600 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 mb-1.5 uppercase tracking-wider">Phone / Number *</label>
                    <input
                      type="tel"
                      value={reqPhone}
                      onChange={(e) => setReqPhone(e.target.value)}
                      required
                      placeholder="+8801234..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs transition-colors"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/12 focus:border-[#c9f731] focus:outline-none text-white font-sans text-xs transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-xl btn-neon font-bold text-xs flex items-center justify-center gap-2"
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
