import { NextResponse } from "next/server";
import { getStoredBlogs } from "@/utils/storage";

export async function GET() {
  try {
    const blogs = await getStoredBlogs();
    const siteUrl = "https://khorrum.pro.bd";

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>SK Khorrum | SEO Specialist Bangladesh Blog</title>
  <link>${siteUrl}/blog</link>
  <description>Latest technical SEO articles, guides, and Google Search updates by SK Khorrum</description>
  <language>en-us</language>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;

    blogs.forEach((blog) => {
      rss += `  <item>
    <title>${escapeXml(blog.title)}</title>
    <link>${siteUrl}/blog/${blog.id}</link>
    <guid>${siteUrl}/blog/${blog.id}</guid>
    <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
    <description>${escapeXml(blog.summary)}</description>
    <author>khorrum@pro.bd (SK Khorrum)</author>
  </item>
`;
    });

    rss += `</channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    console.error("RSS generation error:", e);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case "\"": return "&quot;";
      default: return c;
    }
  });
}
