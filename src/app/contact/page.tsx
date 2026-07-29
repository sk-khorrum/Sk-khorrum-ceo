"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Send, Zap, MessageSquare, 
  Calendar, Check, AlertCircle, HelpCircle 
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "Technical SEO Audit",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        website: "",
        service: "Technical SEO Audit",
        message: ""
      });
    }, 1500);
  };

  return (
    <main className="relative min-h-screen text-white bg-[#050505] selection:bg-[#f97316] selection:text-[#050505] overflow-x-hidden pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#f97316]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 z-10 relative">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f97316] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#f97316]">CONTACT</span>
        </nav>

        {/* Title */}
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[#f97316] font-mono text-xs uppercase tracking-[0.25em]">Start Crawl Diagnostics</span>
          <h1 className="font-['Anton'] text-5xl md:text-7xl tracking-wide uppercase leading-none">
            Get in Touch
          </h1>
          <p className="text-sm text-neutral-400">
            Let's evaluate your keyword footprints and sitemap structures. Complete the form to schedule a recovery strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left Info and map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel border border-white/8 rounded-3xl p-6.5 space-y-6">
              <h3 className="font-mono text-xs text-[#f97316] uppercase tracking-[0.25em] border-b border-white/5 pb-3">Consultant Directories</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase">OFFICE LOCALITY</span>
                    <span className="text-sm font-bold text-white">Dhaka, Bangladesh</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase">DIRECT INQUIRIES</span>
                    <a href="mailto:khorrum@pro.bd" className="text-sm font-bold text-white hover:text-[#f97316] transition-colors font-mono">
                      khorrum@pro.bd
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase">INSTANT WHATSAPP CHAT</span>
                    <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#f97316] hover:underline font-mono">
                      +880 Chat Live
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Embedded Dhaka, Bangladesh Map */}
            <div className="h-64 rounded-3xl overflow-hidden border border-white/10 relative bg-black">
              {/* Google map iframe wrapper configured for Dhaka, BD */}
              <iframe
                title="Dhaka Office Citation Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.036943545642!2d90.375862!3d23.746466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbd1c32b30!2sDhaka%201205%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                className="w-full h-full border-0 opacity-75 grayscale invert"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right form and Calendly trigger */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mx-auto text-[#f97316]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-['Anton'] uppercase tracking-wider text-white">Requirement Submitted</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    ✨ Your diagnostic details have been queued. SK Khorrum will review your target website and contact you in 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#f97316] font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#f97316] font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-website" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      Website URL
                    </label>
                    <input
                      id="contact-website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      required
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#f97316] font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      Requested SEO Module
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#f97316] font-mono"
                    >
                      <option value="Technical SEO Audit">Technical SEO Audit</option>
                      <option value="Local SEO Bangladesh">Local SEO Bangladesh</option>
                      <option value="Ecommerce / Shopify SEO">Ecommerce / Shopify SEO</option>
                      <option value="International SEO Structures">International SEO Structures</option>
                      <option value="Comprehensive Monthly Retention">Comprehensive Monthly Retention</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      Message & Crawling Brief
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Detail your search issues, keyword goals, or organic drops..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#f97316] font-mono leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#f97316] text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-[#b8e220] transition-colors flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border border-[#050505] border-t-transparent rounded-full animate-spin" />
                        <span>Verifying form parameters...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Requirements</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Calendly Booking Placeholder Widget */}
            <div className="glass-panel border border-white/8 rounded-3xl p-6.5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#f97316]">
                  <Calendar className="w-4 h-4" />
                  <span>CALENDLY SCHEDULER</span>
                </div>
                <h4 className="text-sm font-bold text-white">Book a 15-Minute Zoom Screening</h4>
                <p className="text-xs text-neutral-400">Instantly pick a slot to review your rankings drop.</p>
              </div>
              <button 
                onClick={() => alert("Calendly scheduling modal placeholder triggered. In production, this opens your booking embed.")}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:border-[#f97316]/40 hover:text-[#f97316] transition-all font-mono text-xs flex-shrink-0"
              >
                Open Scheduler
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

