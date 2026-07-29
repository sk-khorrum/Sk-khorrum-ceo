"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredBlogs, BlogItem } from "@/utils/storage";
import { 
  Clock, Calendar, User, ChevronRight, 
  ArrowLeft, BookOpen, Search, Tag, Sparkles
} from "lucide-react";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    getStoredBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  // Filter blogs by category & search query
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = searchQuery
      ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory === "all"
      ? true
      : b.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "technical seo", label: "Technical SEO" },
    { id: "web development", label: "Web Development" },
    { id: "security", label: "Security" },
    { id: "local seo", label: "Local SEO" }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#c9f731] selection:text-[#050505] font-sans pt-28 pb-20">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c9f731]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Breadcrumbs */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#c9f731] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#c9f731]">BLOG</span>
        </nav>

        {/* Header Title */}
        <section className="mb-16 space-y-6">
          <div>
            <span className="text-[#c9f731] font-mono text-xs uppercase tracking-[0.25em] mb-2 block">Insights, Guides & Search News</span>
            <h1 className="font-['Anton'] text-5xl sm:text-7xl md:text-8xl tracking-wide uppercase leading-none">
              The SEO Journal
            </h1>
          </div>

          <p className="text-neutral-400 text-sm max-w-xl">
            Articles and deep-dives by SK Khorrum on technical indexing systems, site rendering performance, and local search recovery blueprints.
          </p>

          {/* Search and Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center pt-4 border-t border-white/5">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#111]/85 border border-white/10 focus:border-[#c9f731] focus:outline-none text-white text-xs font-mono placeholder:text-neutral-600 transition-all"
              />
            </div>

            {/* Categories filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all border ${
                    selectedCategory === cat.id
                      ? "bg-[#c9f731] text-[#050505] border-[#c9f731] font-bold"
                      : "bg-white/5 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG GRID */}
        {loading ? (
          <div className="py-24 text-center space-y-3 font-mono text-neutral-500">
            <div className="w-8 h-8 border-2 border-[#c9f731] border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs">Fetching SEO articles list...</div>
          </div>
        ) : (
          <section className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="group p-6 rounded-3xl bg-[#111]/40 border border-white/8 hover:border-[#c9f731]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover image if present */}
                    {blog.imageUrl ? (
                      <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/5 mb-6">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-44 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6">
                        <BookOpen className="w-8 h-8 text-neutral-600" />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-4">
                      <span className="px-2 py-0.5 rounded bg-[#c9f731]/10 text-[#c9f731] border border-[#c9f731]/20 uppercase">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#c9f731] transition-colors mb-3 leading-tight">
                      {blog.title}
                    </h3>

                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#c9f731]" />
                        <span>{blog.author || "SK Khorrum"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                    </div>
                    <span className="text-[#c9f731] group-hover:underline flex items-center gap-0.5">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-20 rounded-3xl border border-white/5 bg-white/5 font-mono text-xs text-neutral-500">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-neutral-600" />
                No organic articles matching details.
              </div>
            )}

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-6 font-mono text-xs">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9f731]/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Previous
                </button>
                <span className="text-neutral-400">
                  Page <strong className="text-white">{currentPage}</strong> of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9f731]/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
