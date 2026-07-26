"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredProjects,
  getStoredBlogs,
  addProject,
  deleteProject,
  addBlog,
  deleteBlog,
  ProjectItem,
  BlogItem,
} from "@/utils/storage";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  Lock,
  Plus,
  Trash2,
  FolderPlus,
  FileText,
  Layout,
  ExternalLink,
  ArrowLeft,
  Check,
  Code,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Mail,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "seo" | "briefs">("projects");

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [briefs, setBriefs] = useState<any[]>([]);

  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("WEB");
  const [projBadge, setProjBadge] = useState("v1.0");
  const [projDescription, setProjDescription] = useState("");
  const [projLink, setProjLink] = useState("");
  const [projImage, setProjImage] = useState("");

  // Blog Form state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Web Development");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Load from Firebase Firestore
    getStoredProjects().then(setProjects);
    getStoredBlogs().then(setBlogs);

    // Load briefs (still local)
    try {
      const storedBriefsStr = localStorage.getItem("khorrum_portfolio_requirements");
      if (storedBriefsStr) {
        setBriefs(JSON.parse(storedBriefsStr));
      }
    } catch (e) {
      console.error("Error reading briefs from localStorage", e);
    }

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Logged in successfully!");
    } catch (error: any) {
      setAuthError(error.message || "Failed to login");
    }
  };

  const loginWithGoogle = async () => {
    setAuthError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast("Logged in with Google!");
    } catch (error: any) {
      setAuthError(error.message || "Google login failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    showToast("Logged out successfully");
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDescription || !projLink) {
      showToast("Please fill in Title, Description, and Link!");
      return;
    }

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: projTitle,
      category: projCategory.toUpperCase(),
      badge: projBadge,
      description: projDescription,
      link: projLink,
      date: new Date().toISOString().split("T")[0],
      imageUrl: projImage || undefined,
    };

    setProjects((prev) => [newProject, ...prev]);
    addProject(newProject);

    // Reset Form
    setProjTitle("");
    setProjDescription("");
    setProjLink("");
    setProjImage("");
    showToast("Project added successfully to Firebase!");
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      deleteProject(id);
      showToast("Project removed!");
    }
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary || !blogContent) {
      showToast("Please fill in Blog Title, Summary, and Content!");
      return;
    }

    const newBlog: BlogItem = {
      id: `blog-${Date.now()}`,
      title: blogTitle,
      category: blogCategory,
      readTime: blogReadTime,
      date: new Date().toISOString().split("T")[0],
      summary: blogSummary,
      content: blogContent,
      author: "SK Khorrum",
      imageUrl: blogImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop",
    };

    setBlogs((prev) => [newBlog, ...prev]);
    addBlog(newBlog);

    // Reset Form
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogImage("");
    showToast("Blog post published to Firebase!");
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      deleteBlog(id);
      showToast("Blog post deleted!");
    }
  };

  const handleDeleteBrief = (id: string) => {
    if (confirm("Are you sure you want to delete this client requirement brief?")) {
      try {
        const updated = briefs.filter((b) => b.id !== id);
        setBriefs(updated);
        localStorage.setItem("khorrum_portfolio_requirements", JSON.stringify(updated));
        showToast("Client brief deleted!");
      } catch (e) {
        console.error("Error deleting brief:", e);
        showToast("Error deleting client brief!");
      }
    }
  };

  // Generate SEO JSON-LD Schema
  const seoSchemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://skkhorrum.com/#person",
        name: "SK Khorrum",
        jobTitle: "Web App Designer & Frontend Developer",
        url: "https://skkhorrum.com",
        sameAs: [
          "https://facebook.com/drt.ceo",
          "https://github.com/sk_khorrum"
        ]
      },
      ...blogs.map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.summary,
        datePublished: blog.date,
        author: {
          "@type": "Person",
          name: blog.author || "SK Khorrum",
        },
        category: blog.category,
      })),
      ...projects.map((proj) => ({
        "@type": "CreativeWork",
        name: proj.title,
        description: proj.description,
        url: proj.link,
        genre: proj.category,
      }))
    ]
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 font-sans selection:bg-[#c9f731] selection:text-[#050505]">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-[#c9f731]/10 pointer-events-none">
            <Lock className="w-32 h-32" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c9f731]/10 border border-[#c9f731]/30 flex items-center justify-center text-[#c9f731]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-['Anton'] text-2xl tracking-wider">ADMIN PORTAL</h1>
                <p className="text-xs font-mono text-neutral-400">skkhorrum.com/admin.khorrum</p>
              </div>
            </div>

            <form onSubmit={loginWithEmail} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white text-sm font-mono placeholder:text-neutral-600 transition-all mb-4"
                  autoFocus
                />
                
                <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white text-sm font-mono placeholder:text-neutral-600 transition-all"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono break-words">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-neutral-400" />
                <span>Login with Email</span>
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-neutral-500 text-xs font-mono">OR</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full py-3.5 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-sm hover:bg-[#a5cc28] transition-all shadow-lg shadow-[#c9f731]/20 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#050505"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#050505"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#050505"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#050505"/>
                </svg>
                <span>Login with Google</span>
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 flex justify-end items-center text-xs font-mono text-neutral-500">
              <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#c9f731] selection:text-[#050505]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 px-6 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-[#c9f731] hover:border-[#c9f731]/30 transition-all"
            title="Go to main website"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="font-['Anton'] text-xl tracking-wider text-white flex items-center gap-2">
              KHORRUM ADMIN PANEL <span className="text-[#c9f731] text-xs font-mono px-2 py-0.5 rounded bg-[#c9f731]/10 border border-[#c9f731]/30">v2.0</span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">Path: /admin.khorrum</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs font-semibold hover:border-[#c9f731] hover:text-[#c9f731] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono hover:bg-red-500/20 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "projects"
                ? "bg-[#c9f731] text-[#050505] font-bold shadow-lg shadow-[#c9f731]/20"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Manage Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "blogs"
                ? "bg-[#c9f731] text-[#050505] font-bold shadow-lg shadow-[#c9f731]/20"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Manage Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("seo")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "seo"
                ? "bg-[#c9f731] text-[#050505] font-bold shadow-lg shadow-[#c9f731]/20"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>SEO Schema JSON-LD</span>
          </button>

          <button
            onClick={() => setActiveTab("briefs")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === "briefs"
                ? "bg-[#c9f731] text-[#050505] font-bold shadow-lg shadow-[#c9f731]/20"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Client Briefs ({briefs.length})</span>
          </button>
        </div>

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ADD PROJECT FORM */}
            <div className="lg:col-span-1 p-6 rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 h-fit space-y-5">
              <h3 className="font-['Anton'] text-xl tracking-wide flex items-center gap-2 text-[#c9f731]">
                <Plus className="w-5 h-5" />
                <span>ADD NEW PROJECT</span>
              </h3>

              <form onSubmit={handleAddProject} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1">PROJECT TITLE *</label>
                  <input
                    type="text"
                    placeholder="e.g. OSINT Automated Vulnerability Scanner"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">CATEGORY</label>
                    <select
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/15 focus:border-[#c9f731] focus:outline-none text-white"
                    >
                      <option value="WEB">WEB</option>
                      <option value="RESEARCH">RESEARCH</option>
                      <option value="TOOLS">TOOLS</option>
                      <option value="DEMO">DEMO</option>
                      <option value="AI / ML">AI / ML</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">BADGE / VERSION</label>
                    <input
                      type="text"
                      placeholder="e.g. v2.0 or lab"
                      value={projBadge}
                      onChange={(e) => setProjBadge(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">PROJECT LINK *</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projLink}
                    onChange={(e) => setProjLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">DESCRIPTION *</label>
                  <textarea
                    rows={3}
                    placeholder="Write a clear description of the project..."
                    value={projDescription}
                    onChange={(e) => setProjDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#a5cc28] transition-all shadow-lg shadow-[#c9f731]/10 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Project to Portfolio</span>
                </button>
              </form>
            </div>

            {/* EXISTING PROJECTS LIST */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-['Anton'] text-xl tracking-wide flex items-center justify-between text-white">
                <span>ACTIVE PROJECTS IN MAIN SITE</span>
                <span className="text-xs font-mono text-[#c9f731]">{projects.length} Total</span>
              </h3>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-[#111111]/60 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#c9f731]">
                        <span className="px-2 py-0.5 rounded bg-[#c9f731]/10 border border-[#c9f731]/20">
                          {proj.category}
                        </span>
                        <span>{proj.badge}</span>
                        {proj.date && <span className="text-neutral-500">• {proj.date}</span>}
                      </div>
                      <h4 className="text-lg font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">{proj.description}</p>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#c9f731] hover:underline pt-1"
                      >
                        <span>{proj.link}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === "blogs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ADD BLOG FORM */}
            <div className="lg:col-span-1 p-6 rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 h-fit space-y-5">
              <h3 className="font-['Anton'] text-xl tracking-wide flex items-center gap-2 text-[#c9f731]">
                <Plus className="w-5 h-5" />
                <span>WRITE NEW BLOG POST</span>
              </h3>

              <form onSubmit={handleAddBlog} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1">BLOG TITLE *</label>
                  <input
                    type="text"
                    placeholder="e.g. Master Web Architecture & OSINT Security"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">CATEGORY</label>
                    <input
                      type="text"
                      placeholder="e.g. Security"
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">READ TIME</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">COVER IMAGE URL (OPTIONAL)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">SUMMARY / EXCERPT *</label>
                  <textarea
                    rows={2}
                    placeholder="Short summary for preview card..."
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">FULL ARTICLE CONTENT (HTML) *</label>
                  <textarea
                    rows={8}
                    placeholder="Write your article content here in HTML format... e.g. <h2>Title</h2><p>Paragraph...</p>"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#c9f731] focus:outline-none text-white placeholder:text-neutral-600 font-mono text-xs"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Supports HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;img&gt;, etc.</p>
                </div>

                {/* HTML PREVIEW PANEL */}
                {blogContent && (
                  <div className="space-y-2">
                    <label className="block text-neutral-400 text-[10px] uppercase tracking-wider font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c9f731] animate-pulse" />
                      LIVE HTML PREVIEW
                    </label>
                    <div
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-[#c9f731]/20 text-neutral-300 text-xs font-sans leading-relaxed max-h-64 overflow-y-auto
                        [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2 [&_h1]:mt-3
                        [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2 [&_h2]:mt-3
                        [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-1 [&_h3]:mt-2
                        [&_p]:mb-2 [&_p]:leading-relaxed
                        [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2
                        [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2
                        [&_li]:mb-1
                        [&_strong]:text-white [&_strong]:font-semibold
                        [&_em]:italic
                        [&_a]:text-[#c9f731] [&_a]:underline
                        [&_code]:px-1 [&_code]:rounded [&_code]:bg-white/10 [&_code]:text-[#c9f731] [&_code]:font-mono
                        [&_blockquote]:border-l-2 [&_blockquote]:border-[#c9f731] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-neutral-400
                        [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-2"
                      dangerouslySetInnerHTML={{ __html: blogContent }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#a5cc28] transition-all shadow-lg shadow-[#c9f731]/10 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Blog Article</span>
                </button>
              </form>
            </div>

            {/* EXISTING BLOGS LIST */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-['Anton'] text-xl tracking-wide flex items-center justify-between text-white">
                <span>PUBLISHED BLOG POSTS</span>
                <span className="text-xs font-mono text-[#c9f731]">{blogs.length} Articles</span>
              </h3>

              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-5 rounded-2xl bg-[#111111]/60 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#c9f731]">
                        <span className="px-2 py-0.5 rounded bg-[#c9f731]/10 border border-[#c9f731]/20">
                          {blog.category}
                        </span>
                        <span>{blog.readTime}</span>
                        <span className="text-neutral-500">• {blog.date}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{blog.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">{blog.summary}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEO SCHEMA TAB */}
        {activeTab === "seo" && (
          <div className="p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-['Anton'] text-2xl tracking-wide text-[#c9f731] flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>STRUCTURED DATA (JSON-LD SEO SCHEMA)</span>
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Automatically generated from your dynamic projects & blog posts for Google Search indexing.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(seoSchemaData, null, 2));
                  showToast("JSON-LD Schema copied to clipboard!");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#c9f731] text-[#050505] font-bold text-xs hover:bg-[#a5cc28] transition-all flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                <span>Copy JSON-LD Code</span>
              </button>
            </div>

            <pre className="p-6 rounded-2xl bg-black/90 border border-white/15 text-xs font-mono text-[#c9f731] overflow-x-auto max-h-[500px]">
              {JSON.stringify(seoSchemaData, null, 2)}
            </pre>
          </div>
        )}

        {/* CLIENT BRIEFS TAB */}
        {activeTab === "briefs" && (
          <div className="p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 space-y-6">
            <div>
              <h3 className="font-['Anton'] text-2xl tracking-wide text-[#c9f731] flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>SUBMITTED CLIENT BRIEFS &amp; REQUIREMENTS</span>
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Leads collected directly from the client requirements form on your website.
              </p>
            </div>

            {briefs.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-white/5 bg-white/5 font-mono text-xs text-neutral-500">
                No project briefs have been submitted yet.
              </div>
            ) : (
              <div className="space-y-6">
                {briefs.map((brief: any) => (
                  <div
                    key={brief.id}
                    className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 hover:border-[#c9f731]/30 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-[#c9f731] text-[#050505] font-bold uppercase">
                            {brief.service}
                          </span>
                          <span className="text-neutral-500">• {brief.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-1">{brief.name}</h4>
                      </div>

                      <button
                        onClick={() => handleDeleteBrief(brief.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono transition-all flex items-center gap-1.5"
                        title="Delete Brief"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-400">
                      <div>
                        <span className="block text-[10px] text-neutral-600 uppercase">Email Address</span>
                        <a href={`mailto:${brief.email}`} className="text-white hover:text-[#c9f731] underline">
                          {brief.email}
                        </a>
                      </div>
                      <div>
                        <span className="block text-[10px] text-neutral-600 uppercase">Phone Number</span>
                        <a href={`tel:${brief.phone}`} className="text-white hover:text-[#c9f731] underline">
                          {brief.phone}
                        </a>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-300 font-sans space-y-1.5 leading-relaxed whitespace-pre-wrap">
                      <span className="block text-[10px] font-mono text-neutral-600 uppercase mb-1.5">Project Brief Details</span>
                      {brief.brief}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
