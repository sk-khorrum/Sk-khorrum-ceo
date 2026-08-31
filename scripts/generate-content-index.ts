import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, extname, basename, resolve } from "node:path";

type ContentRecord = { title: string; slug: string; description: string; url: string; source: string; type: string; content?: string; html?: string; image?: string; keywords?: string; schema?: string; [key: string]: unknown };
const root = resolve(process.cwd());
const contentRoots = ["posts", "pages", "projects", "case-studies"];
const siteUrl = "https://sk-khorrum-ceo.vercel.app";

async function filesIn(folder: string): Promise<string[]> {
  try {
    const entries = await readdir(join(root, folder), { withFileTypes: true });
    return entries.filter((entry) => entry.isFile() && [".html", ".json"].includes(extname(entry.name).toLowerCase())).map((entry) => join(folder, entry.name));
  } catch {
    return [];
  }
}

function textBetween(html: string, tag: string, fallback: string) {
  return html.match(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, "is"))?.[1]?.replace(/<[^>]+>/g, "").trim() || fallback;
}
function firstImage(html: string) {
  const image = html.match(/<img\b[^>]*\bsrc=["\']([^"\']+)/i)?.[1] || html.match(/(?:property|name)=["\'](?:og:image|twitter:image)["\'][^>]*content=["\']([^"\']+)/i)?.[1] || "";
  return image.replaceAll("&amp;", "&");
}
function keywords(html: string) { return html.match(/(?:name|property)=["\']keywords["\'][^>]*content=["\']([^"\']+)/i)?.[1] || ""; }
function schema(html: string) { return html.match(/<script[^>]*type=["\']application\/ld\+json["\'][^>]*>([\s\S]*?)<\/script>/i)?.[1]?.trim() || ""; }
function articleContent(html: string) {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] || html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  return article.replace(/^\s*<header\b[^>]*>[\s\S]*?<\/header>\s*/i, "").replace(/<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "").trim();
}
function routeFor(type: string, slug: string) {
  if (type === "posts") return `/blog/${slug}`;
  if (type === "projects") return `/projects/${slug}`;
  if (type === "case-studies") return `/case-studies/${slug}`;
  return `/${slug}`;
}

async function record(path: string, type: string): Promise<ContentRecord | null> {
  const raw = await readFile(join(root, path), "utf8");
  const fileSlug = basename(path, extname(path)) === "index" ? basename(resolve(path, "..")) : basename(path, extname(path));
  const route = routeFor(type, fileSlug);
  if (extname(path).toLowerCase() === ".json") {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const embeddedHtml = typeof parsed.html === "string" ? parsed.html : "";
    return { ...parsed, title: String(parsed.title || fileSlug.replaceAll("-", " ")), slug: String(parsed.slug || fileSlug), description: String(parsed.description || `Insights from SK Khorrum about ${fileSlug.replaceAll("-", " ")}.`), url: route, ...(parsed.url ? { externalUrl: String(parsed.url) } : {}), content: String(parsed.content || (embeddedHtml ? articleContent(embeddedHtml) : "")), html: embeddedHtml, image: String(parsed.image || (embeddedHtml ? firstImage(embeddedHtml) : "")), keywords: String(parsed.keywords || (embeddedHtml ? keywords(embeddedHtml) : "")), schema: String(parsed.schema || (embeddedHtml ? schema(embeddedHtml) : "")), type, source: path };
  }
  return { title: textBetween(raw, "title", fileSlug.replaceAll("-", " ")), slug: fileSlug, description: raw.match(/name=["']description["'][^>]*content=["']([^"']+)/i)?.[1] || `Insights from SK Khorrum about ${fileSlug.replaceAll("-", " ")}.`, url: route, source: path, type, content: articleContent(raw), html: raw, image: firstImage(raw), keywords: keywords(raw), schema: schema(raw) };
}

const records: Record<string, ContentRecord[]> = {};
for (const type of contentRoots) {
  const files = await filesIn(type);
  records[type] = (await Promise.all(files.map((file) => record(file, type)))).filter(Boolean) as ContentRecord[];
}
await mkdir(join(root, "public/generated"), { recursive: true });
await mkdir(join(root, "src/data"), { recursive: true });
for (const [type, items] of Object.entries(records)) {
  await writeFile(join(root, "public/generated", `${type}.json`), JSON.stringify(items, null, 2));
  await writeFile(join(root, "src/data", `${type}.json`), JSON.stringify(items, null, 2));
}

async function discoverProjectLogos(): Promise<string[]> {
  try {
    const entries = await readdir(join(root, "public", "assets", "logos"), { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"].includes(extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

const projectLogos = await discoverProjectLogos();
await writeFile(join(root, "public/generated", "project-logos.json"), JSON.stringify(projectLogos, null, 2));
await writeFile(join(root, "src/data", "project-logos.json"), JSON.stringify(projectLogos, null, 2));
const staticUrls = ["", "/about", "/services", "/seo-process", "/seo-guide", "/portfolio", "/case-studies", "/blog", "/contact", "/requirements", "/services/seo-audit", "/services/technical-seo", "/services/on-page-seo", "/services/keyword-research", "/services/local-seo", "/services/internal-linking", "/services/website-seo-optimization", "/services/search-console-optimization", "/services/e-commerce-seo", "/services/seo-friendly-web-design", "/strategies/technical-seo-strategy", "/strategies/on-page-seo-strategy", "/strategies/search-intent-strategy", "/strategies/topical-authority-strategy", "/strategies/local-seo-strategy", "/strategies/data-driven-optimization-strategy", "/seo-process/a-align-goals", "/seo-process/b-benchmark", "/seo-process/c-crawl", "/seo-process/d-diagnose", "/seo-process/e-explore-demand", "/seo-process/f-find-search-intent", "/seo-process/g-group-topics", "/seo-process/h-harden-technical-seo", "/seo-process/i-improve-information-architecture"];
const urls = [...staticUrls, ...Object.values(records).flat().map((item) => item.url)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${siteUrl}${url}</loc></url>`).join("")}</urlset>`;
await writeFile(join(root, "public/sitemap.xml"), sitemap);
console.log(`Generated ${Object.values(records).flat().length} content records and sitemap.`);
