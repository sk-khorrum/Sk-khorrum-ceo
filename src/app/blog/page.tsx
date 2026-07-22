"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredBlogs, BlogItem } from "@/utils/storage";
import {
  Clock,
  Calendar,
  User,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Search,
} from "lucide-react";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setBlogs(getStoredBlogs());
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [blogs]);

  // Filter blogs by search query
  const filteredBlogs = searchQuery
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogs;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#c9f731] selection:text-[#050505] font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 px-8 py-5 flex items-center justify-between backdrop-blur-xl bg-[#050505]/80 border-b border-white/10">
        <Link
          href="/"
          className="font-['Anton'] text-2xl tracking-wider text-white"
        >
          KHORRUM<em className="not-italic text-[#c9f731]">.</em>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-[#c9f731] hover:border-[#c9f731]/40 text-xs font-mono transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Site</span>
          </Link>
        </div>
      </nav>

      {/* HERO HEADER */}
      <section className="pt-20 pb-12 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-xs font-mono text-[#c9f731] uppercase tracking-widest mb-3 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#c9f731]" />
          <span>Thoughts & Insights</span>
        </div>
        <h1 className="font-['Anton'] text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none mb-6">
          <span className="text-[#c9f731]">BLOG</span>
        </h1>
        <p className="font-['Playfair_Display'] italic text-xl sm:text-2xl text-neutral-300 max-w-2xl mb-10">
          Articles, tutorials, and insights from SK Khorrum on web development,
          security, and creative tech.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#111111]/80 border border-white/10 focus:border-[#c9f731] focus:outline-none text-white text-sm font-mono placeholder:text-neutral-600 transition-all"
          />
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 md:px-16 pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group p-8 rounded-3xl bg-[#111111]/60 backdrop-blur-xl border border-white/10 hover:border-[#c9f731] transition-all flex flex-col justify-between reveal"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Cover Image */}
              {blog.imageUrl && (
                <div className="w-full h-[180px] rounded-2xl overflow-hidden border border-white/10 mb-6 -mt-2">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#c9f731] mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#c9f731]/10 border border-[#c9f731]/20 uppercase">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#c9f731] transition-colors mb-3 leading-tight">
                  {blog.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#c9f731]" />
                    <span>{blog.author || "SK Khorrum"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <span className="text-[#c9f731] group-hover:underline flex items-center gap-1">
                  Read <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-white/5 bg-white/5 font-mono text-sm text-neutral-500">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-neutral-600" />
            {searchQuery
              ? `No blog posts matching "${searchQuery}"`
              : "No blog posts published yet."}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/10 text-center font-mono text-xs text-neutral-500 bg-[#050505]/70 px-8">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#c9f731]">SK KHORRUM</span>. ALL RIGHTS
          RESERVED.
        </p>
      </footer>
    </main>
  );
}
