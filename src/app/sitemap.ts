import { MetadataRoute } from "next";
import { getStoredBlogs } from "@/utils/storage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://khorrum.pro.bd";
  
  // Static pages
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/seo-audit",
    "/case-studies",
    "/portfolio",
    "/testimonials",
    "/pricing",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticSitemaps = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blogs sitemaps
  try {
    const blogs = await getStoredBlogs();
    const blogSitemaps = blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    
    return [...staticSitemaps, ...blogSitemaps];
  } catch (e) {
    console.error("Sitemap dynamic blog fetch error:", e);
    return staticSitemaps;
  }
}
