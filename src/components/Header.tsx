"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  if (pathname?.startsWith("/admin.khorrum") || pathname?.startsWith("/birthday")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      document.documentElement.className = "dark";
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.className = nextTheme;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/seo-audit", label: "SEO Audit" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/testimonials", label: "Reviews" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-[#050505]/80 border-b border-neutral-200/10 dark:border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-['Anton'] text-2xl tracking-wider text-white"
        >
          KHORRUM<em className="not-italic text-[#f97316]">.</em>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-6 text-xs font-mono tracking-widest uppercase">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 relative group py-1.5 ${
                    isActive
                      ? "text-[#f97316] font-bold"
                      : "text-neutral-400 hover:text-[#f97316]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#f97316] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right buttons */}
        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200/15 dark:border-white/10 hover:bg-[#f97316]/10 text-neutral-400 hover:text-[#f97316] transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f97316] hover:bg-[#b8e220] text-[#050505] font-bold text-xs transition-all shadow-lg shadow-[#f97316]/15"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Consultation</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-neutral-400 hover:text-[#f97316] transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-40 backdrop-blur-2xl bg-[#050505]/95 border-b border-neutral-200/10 dark:border-white/10 xl:hidden flex flex-col px-6 py-8 shadow-2xl"
          >
            <ul className="flex flex-col gap-5 text-sm font-mono tracking-widest uppercase text-neutral-300 dark:text-neutral-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#f97316] transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#f97316] text-[#050505] font-bold text-xs"
            >
              Get Free SEO Audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

