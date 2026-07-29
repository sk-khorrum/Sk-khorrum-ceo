"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Github, Youtube, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/admin.khorrum") || pathname?.startsWith("/birthday")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="font-['Anton'] text-3xl tracking-wider text-white">
              KHORRUM<em className="not-italic text-[#f97316]">.</em>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium SEO consultancy and digital performance engineering for high-growth enterprises and ambitious brands worldwide.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/sk-khorrum" },
                { icon: <Github className="w-4 h-4" />, href: "https://github.com/sk-khorrum" },
                { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/sk_khorrum" },
                { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com/@skkhorrum" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:border-[#f97316] hover:text-[#f97316] transition-all bg-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-mono text-xs text-[#f97316] uppercase tracking-[0.2em] mb-6">Expertise Pages</h3>
            <ul className="space-y-3.5 text-sm text-neutral-400 font-mono">
              {[
                { href: "/about", label: "About Journey" },
                { href: "/services", label: "SEO Services" },
                { href: "/seo-audit", label: "Free SEO Audit" },
                { href: "/case-studies", label: "Success Stories" },
                { href: "/portfolio", label: "Client Portfolio" },
                { href: "/pricing", label: "Consulting Pricing" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#f97316] transition-colors flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Local citations & Office */}
          <div>
            <h3 className="font-mono text-xs text-[#f97316] uppercase tracking-[0.2em] mb-6">Contact & Location</h3>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                <span>
                  Dhaka, Bangladesh<br />
                  <span className="text-xs text-neutral-500 font-mono">Primary Target Country</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f97316] flex-shrink-0" />
                <a href="mailto:khorrum@pro.bd" className="hover:text-[#f97316] transition-colors font-mono">
                  khorrum@pro.bd
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#f97316] flex-shrink-0" />
                <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="hover:text-[#f97316] transition-colors font-mono">
                  +880 WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Lead Magnet */}
          <div>
            <h3 className="font-mono text-xs text-[#f97316] uppercase tracking-[0.2em] mb-6">SEO Newsletter</h3>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              Get bi-weekly technical SEO audits and growth checklists delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#f97316]/10 border border-[#f97316]/30 text-xs text-[#f97316] font-mono">
                Subscription confirmed! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#f97316] transition-all font-mono"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#f97316] text-[#050505] flex items-center justify-center hover:bg-[#b8e220] transition-colors"
                  aria-label="Submit email"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-mono text-neutral-500">
            &copy; {new Date().getFullYear()} SK Khorrum. Crafted for absolute search performance.
          </p>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <a href="https://khorrum.pro.bd/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Sitemap.xml
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

