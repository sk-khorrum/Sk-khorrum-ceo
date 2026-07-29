"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getStoredBlogs, BlogItem } from "@/utils/storage";
import { 
  Clock, Calendar, User, ArrowLeft, BookOpen, 
  ChevronRight, List, Share2, Award, Zap
} from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [related, setRelated] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    getStoredBlogs().then((blogs) => {
      const found = blogs.find((b) => b.id === params.id);
      if (found) {
        setBlog(found);
        
        // Find related posts (same category, different ID)
        const rel = blogs
          .filter((b) => b.category === found.category && b.id !== found.id)
          .slice(0, 3);
        setRelated(rel);

        // Generate Table of Contents from content markdown headers (e.g. ### Header)
        const headings: { id: string; text: string }[] = [];
        const lines = found.content.split("\n");
        lines.forEach((line) => {
          if (line.startsWith("### ")) {
            const text = line.replace("### ", "").trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            headings.push({ id, text });
          } else if (line.startsWith("## ")) {
            const text = line.replace("## ", "").trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            headings.push({ id, text });
          }
        });
        setToc(headings);
      }
      setIsLoading(false);
    });
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-neutral-500">Retrieving article metadata...</span>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-6 max-w-md px-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-neutral-500" />
          </div>
          <h1 className="font-['Anton'] text-4xl tracking-wider uppercase">Article Not Found</h1>
          <p className="text-neutral-400 text-xs">The post you are seeking has been archived or relocated.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f97316] text-[#050505] font-semibold text-sm hover:bg-[#a5cc28] transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Blogs</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#f97316] selection:text-[#050505] font-sans pt-28 pb-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-mono text-neutral-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f97316] transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#f97316] transition-colors">BLOG</Link>
          <span>/</span>
          <span className="text-[#f97316] truncate max-w-xs">{blog.title.toUpperCase()}</span>
        </nav>

        {/* Blog layout grid (Content + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main content body */}
          <article className="lg:col-span-8 space-y-8">
            
            {/* Meta details header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#f97316]">
                <span className="px-2.5 py-0.5 rounded bg-[#f97316]/10 border border-[#f97316]/20 uppercase">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.date}
                </span>
              </div>
              <h1 className="font-['Anton'] text-3.5xl sm:text-5xl md:text-6xl tracking-wide leading-tight text-white uppercase">
                {blog.title}
              </h1>
            </div>

            {/* Cover image */}
            {blog.imageUrl && (
              <div className="w-full h-[260px] sm:h-[400px] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Summary / Excerpt */}
            <p className="text-base font-medium text-neutral-300 italic border-l-4 border-[#f97316] pl-5 py-2 leading-relaxed">
              {blog.summary}
            </p>

            {/* Markdown rendered body */}
            <div
              className="prose prose-invert max-w-none text-neutral-300 leading-relaxed font-sans text-sm sm:text-base border-t border-white/5 pt-8
                [&_h2]:font-['Anton'] [&_h2]:text-2xl [&_h2]:text-white [&_h2]:tracking-wide [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:uppercase
                [&_h3]:font-bold [&_h3]:text-xl [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3
                [&_p]:mb-4 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4
                [&_li]:text-neutral-300
                [&_a]:text-[#f97316] [&_a]:underline
                [&_strong]:text-white [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* AUTHOR BIO BOX (E-E-A-T Signal) */}
            <section className="p-6.5 rounded-3xl bg-[#111]/60 border border-white/8 flex flex-col sm:flex-row gap-5 items-center sm:items-start mt-12">
              <img
                src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
                alt="SK Khorrum Profile Avatar"
                className="w-20 h-20 rounded-full object-cover border border-white/10 flex-shrink-0"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <h4 className="font-bold text-white flex items-center justify-center sm:justify-start gap-1.5 text-sm">
                    <span>SK Khorrum</span>
                    <Award className="w-4 h-4 text-[#f97316]" />
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">Author & Technical Search Specialist</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  SK Khorrum is an experienced Technical SEO and Google Search Specialist from Dhaka, Bangladesh. Since 2020, he has advised companies on dynamic website speed optimization, canonical architecture, and sitemap indexing.
                </p>
              </div>
            </section>

          </article>

          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            
            {/* Table of Contents card */}
            {toc.length > 0 && (
              <div className="glass-panel border border-white/8 rounded-3xl p-6 space-y-4">
                <h3 className="font-mono text-xs text-[#f97316] uppercase tracking-[0.25em] flex items-center gap-2 border-b border-white/5 pb-3">
                  <List className="w-4 h-4" />
                  <span>Table of Contents</span>
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
                  {toc.map((heading, hIdx) => (
                    <li key={hIdx} className="hover:text-[#f97316] transition-colors flex gap-2">
                      <span className="text-[#f97316] opacity-60">#</span>
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Free Audit Quick Call-out */}
            <div className="p-6 rounded-3xl bg-[#f97316]/5 border border-[#f97316]/25 text-center space-y-4">
              <h3 className="font-bold text-sm text-white">Require diagnostic technical auditing?</h3>
              <p className="text-xs text-neutral-400">Run your target domain live to identify duplicate H1 structures or indexing obstacles.</p>
              <Link
                href="/seo-audit"
                className="w-full py-3 rounded-xl bg-[#f97316] text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-[#b8e220] transition-colors flex items-center justify-center gap-1"
              >
                <span>Free Crawl Audit</span>
                <Zap className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

        </div>

        {/* RELATED POSTS ROW */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/5 space-y-8">
            <h3 className="font-['Anton'] text-2xl uppercase tracking-wider text-white">Related Reading</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group p-5 rounded-2xl bg-[#111]/30 border border-white/5 hover:border-[#f97316]/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="text-[9px] font-mono text-[#f97316] uppercase tracking-wider">{post.category}</div>
                    <h4 className="font-bold text-sm text-white group-hover:text-[#f97316] transition-colors leading-snug line-clamp-2">{post.title}</h4>
                    <p className="text-neutral-500 text-[11px] leading-relaxed line-clamp-2">{post.summary}</p>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 pt-4 mt-4 border-t border-white/5">
                    <span>{post.date}</span>
                    <span className="text-[#f97316] flex items-center gap-0.5">Read <ChevronRight className="w-2.5 h-2.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
