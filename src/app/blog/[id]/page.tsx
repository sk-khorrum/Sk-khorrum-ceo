"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getStoredBlogs, BlogItem } from "@/utils/storage";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  BookOpen,
  ChevronRight,
} from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStoredBlogs().then((blogs) => {
      const found = blogs.find((b) => b.id === params.id);
      setBlog(found || null);
      setIsLoading(false);
    });
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#c9f731] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-neutral-400">
            Loading article...
          </span>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans selection:bg-[#c9f731] selection:text-[#050505]">
        <div className="text-center space-y-6 max-w-md px-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-neutral-500" />
          </div>
          <h1 className="font-['Anton'] text-4xl tracking-wider">
            POST NOT FOUND
          </h1>
          <p className="text-neutral-400 text-sm">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9f731] text-[#050505] font-semibold text-sm hover:bg-[#a5cc28] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Blogs</span>
          </Link>
        </div>
      </main>
    );
  }

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

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-[#c9f731] hover:border-[#c9f731]/40 text-xs font-mono transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Blogs</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-[#c9f731] hover:border-[#c9f731]/40 text-xs font-mono transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Main Site</span>
          </Link>
        </div>
      </nav>

      {/* ARTICLE */}
      <article className="max-w-4xl mx-auto px-6 md:px-16 pt-16 pb-28">
        {/* Meta Details */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#c9f731]">
            <span className="px-2.5 py-1 rounded bg-[#c9f731]/10 border border-[#c9f731]/30 uppercase">
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

          <h1 className="font-['Anton'] text-4xl sm:text-6xl md:text-7xl leading-[0.95] text-white tracking-wide">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <User className="w-3.5 h-3.5 text-[#c9f731]" />
            <span>
              Written by:{" "}
              <code className="text-white">
                {blog.author || "SK Khorrum"}
              </code>
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {blog.imageUrl && (
          <div className="w-full h-[280px] sm:h-[400px] rounded-3xl overflow-hidden border border-white/10 mb-10">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-lg font-medium text-neutral-300 italic border-l-4 border-[#c9f731] pl-5 py-2 leading-relaxed mb-10">
          {blog.summary}
        </p>

        {/* Full HTML Content */}
        <div
          className="prose prose-invert max-w-none text-neutral-300 leading-relaxed font-sans text-sm sm:text-base border-t border-white/10 pt-8
            [&_h1]:font-['Anton'] [&_h1]:text-3xl [&_h1]:text-white [&_h1]:tracking-wide [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:font-['Anton'] [&_h2]:text-2xl [&_h2]:text-white [&_h2]:tracking-wide [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:font-bold [&_h3]:text-xl [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3
            [&_h4]:font-bold [&_h4]:text-lg [&_h4]:text-white [&_h4]:mt-4 [&_h4]:mb-2
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4
            [&_li]:text-neutral-300
            [&_a]:text-[#c9f731] [&_a]:underline [&_a]:hover:text-[#a5cc28]
            [&_strong]:text-white [&_strong]:font-semibold
            [&_em]:italic
            [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-white/10 [&_code]:text-[#c9f731] [&_code]:text-xs [&_code]:font-mono
            [&_pre]:p-4 [&_pre]:rounded-2xl [&_pre]:bg-black/60 [&_pre]:border [&_pre]:border-white/10 [&_pre]:overflow-x-auto [&_pre]:mb-4
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#c9f731] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-400 [&_blockquote]:my-4
            [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:my-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-neutral-500">
            &copy; {new Date().getFullYear()} SK Khorrum — Team DRT
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-[#c9f731] hover:border-[#c9f731]/40 text-xs font-mono transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Blog Posts</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#a5cc28] transition-all"
            >
              <span>Main Site</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
