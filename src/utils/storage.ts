export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  link: string;
  date: string;
  imageUrl?: string;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
  imageUrl?: string;
  author: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "All Security & Hacking Lab Projects",
    category: "RESEARCH",
    badge: "lab",
    description: "Advanced security research framework for OSINT and educational purposes.",
    link: "https://skkhorrumproject.vercel.app/#security",
    date: "2026-01-15",
  },
  {
    id: "proj-2",
    title: "All Entertainment Projects",
    category: "WEB",
    badge: "v2.0",
    description: "There are some entertainment-based sites here that can add a bit of joy to your busy life.",
    link: "https://skkhorrumproject.vercel.app/#entertainment",
    date: "2026-02-10",
  },
  {
    id: "proj-3",
    title: "Others Tools Projects",
    category: "TOOLS",
    badge: "v3.0",
    description: "There are some tools here that can make your daily life easier, and thousands of people are already using them.",
    link: "https://skkhorrumproject.vercel.app/#tools",
    date: "2026-03-01",
  },
  {
    id: "proj-4",
    title: "Some Demo Site",
    category: "WEB",
    badge: "v2.0",
    description: "Here are some demo sites inspired by large, well-known websites to demonstrate advanced design skills.",
    link: "https://skkhorrumproject.vercel.app/#demo",
    date: "2026-03-20",
  },
];

const DEFAULT_BLOGS: BlogItem[] = [
  {
    id: "blog-1",
    title: "Building High Performance Web Apps with Next.js 14 and Three.js",
    category: "Web Development",
    readTime: "5 min read",
    date: "2026-07-15",
    summary: "Discover how to blend 3D canvas scrollytelling animations seamlessly with server-rendered React components.",
    author: "SK Khorrum",
    content: `Modern web development has evolved beyond static pages. Integrating 3D interactive graphics using Three.js with Next.js App Router creates an incredibly engaging user experience.

### Key Performance Strategies:
1. **Pre-rendering Frames**: Use canvas drawImage for rapid frame swapping during scroll events.
2. **Dynamic Imports**: Load heavy 3D assets conditionally to maintain sub-second First Contentful Paint (FCP).
3. **Hardware Acceleration**: Leverage CSS transforms and WebGL for smooth 60fps animations.

Building immersive web applications requires a balance between creative visual design and optimal loading speeds.`,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "blog-2",
    title: "Cybersecurity & OSINT Research Essentials in 2026",
    category: "Security",
    readTime: "7 min read",
    date: "2026-07-02",
    summary: "An overview of modern Open Source Intelligence (OSINT) tools and ethical security practices for web applications.",
    author: "SK Khorrum",
    content: `Security is an essential foundation for any modern enterprise web architecture. Understanding how information is gathered and exposed allows developers to build far safer systems.

### Ethical OSINT Principles:
- Always conduct research within authorized scope and legal boundaries.
- Inspect public API endpoints and HTTP response headers for accidental metadata leaks.
- Secure environment variables and prevent secret exposure in client-side bundles.

By combining proactive OSINT auditing with secure coding practices, developers can prevent vulnerabilities before deployment.`,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
  }
];

const PROJECTS_KEY = "khorrum_portfolio_projects";
const BLOGS_KEY = "khorrum_portfolio_blogs";

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading projects from localStorage", e);
    return DEFAULT_PROJECTS;
  }
}

export function saveProjects(projects: ProjectItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Error saving projects to localStorage", e);
  }
}

export function getStoredBlogs(): BlogItem[] {
  if (typeof window === "undefined") return DEFAULT_BLOGS;
  try {
    const data = localStorage.getItem(BLOGS_KEY);
    if (!data) {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(DEFAULT_BLOGS));
      return DEFAULT_BLOGS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading blogs from localStorage", e);
    return DEFAULT_BLOGS;
  }
}

export function saveBlogs(blogs: BlogItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  } catch (e) {
    console.error("Error saving blogs to localStorage", e);
  }
}
