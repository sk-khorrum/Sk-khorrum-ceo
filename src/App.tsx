import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Code2,
  FileSearch,
  Gauge,
  Globe2,
  Lightbulb,
  Menu,
  MoveRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import discoveredPosts from "./data/posts.json";
import discoveredPages from "./data/pages.json";
import discoveredProjects from "./data/projects.json";
import discoveredCaseStudies from "./data/case-studies.json";
import discoveredProjectLogos from "./data/project-logos.json";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { seoRoadmap } from "./data/seoRoadmap";

const SITE_URL = "https://sk-khorrum-ceo.vercel.app";

type Web3FormsResponse = { success?: boolean; message?: string };

async function submitFormToBoth(
  values: Record<string, FormDataEntryValue>,
  subject: string,
  firestoreCollection: "contactMessages" | "clientRequirements",
) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("The contact form is not configured yet.");
  }

  const web3Submission = fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: "SK Khorrum Website",
      ...values,
    }),
  }).then(async (response) => {
    const result = (await response.json()) as Web3FormsResponse;
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to submit the email notification.");
    }
    return result;
  });

  const firebaseSubmission = db
    ? addDoc(collection(db, firestoreCollection), {
        ...values,
        status: "New",
        createdAt: serverTimestamp(),
      })
    : Promise.reject(new Error("Firebase is not configured for the admin dashboard."));

  const [web3Result, firebaseResult] = await Promise.allSettled([
    web3Submission,
    firebaseSubmission,
  ]);
  if (web3Result.status === "rejected" || firebaseResult.status === "rejected") {
    throw new Error("The form could not be delivered to both services.");
  }
  return { web3Result: web3Result.value, firebaseId: firebaseResult.value.id };
}

import { seoStrategies } from "./data/seoStrategies";
import {
  goldenKeywordClusters,
  seoGuideDeepNotes,
  seoGuideSections,
  seoGuideWordCount,
} from "./data/seoGuide";

const services: Array<[string, string, LucideIcon]> = [
  [
    "SEO Audit",
    "A clear diagnosis of what is holding your website back, with an ordered action plan.",
    FileSearch,
  ],
  [
    "Technical SEO",
    "Build a fast, crawlable foundation that makes every important page easier to find.",
    Gauge,
  ],
  [
    "On-Page SEO",
    "Turn key pages into useful, intent-matched destinations for the people you want to reach.",
    Target,
  ],
  [
    "Keyword Research",
    "Find the language, questions, and opportunities behind your next qualified customer.",
    Search,
  ],
  [
    "Content SEO",
    "Create topic-led content that earns attention, answers real questions, and compounds over time.",
    Lightbulb,
  ],
  [
    "Local SEO",
    "Help nearby customers discover, trust, and choose your business in local search.",
    Globe2,
  ],
  [
    "Competitor Analysis",
    "Understand the market gaps and search patterns your best competitors have already surfaced.",
    BarChart3,
  ],
  [
    "Internal Linking",
    "Create a useful route through your site so people and crawlers find the pages that matter.",
    Target,
  ],
  [
    "Website SEO Optimization",
    "Improve the pages, structure, UX, and performance that shape search and conversion.",
    Gauge,
  ],
  [
    "Search Console Optimization",
    "Turn search data into decisions with cleaner monitoring, indexing, and opportunity tracking.",
    Search,
  ],
  [
    "E-commerce SEO",
    "Help product and category pages earn visibility across the searches that drive consideration.",
    BarChart3,
  ],
  [
    "SEO-Friendly Web Design",
    "Design beautiful, responsive pages with performance and search visibility built in from day one.",
    Code2,
  ],
];

const workflowSteps = [
  { number: "01", phase: "Understand", title: "Start with the business", description: "We begin with your offer, audience, market, competitors, current website, and the action you want a search visitor to take.", client: "You share context, goals, access, and the questions your customers ask.", output: "A focused SEO brief with goals, audience, priorities, and constraints." },
  { number: "02", phase: "Inspect", title: "See what search sees", description: "I review crawlability, indexation, speed, mobile experience, page structure, Search Console signals, and the paths people take through the website.", client: "You provide the website and analytics context; implementation can stay with your team or be supported.", output: "An evidence-led audit showing blockers, opportunities, impact, and effort." },
  { number: "03", phase: "Research", title: "Find the right demand", description: "I study the language behind real searches, classify intent, compare the SERP, and connect valuable topics to the right page types.", client: "You validate language, services, locations, customer priorities, and commercial reality.", output: "A keyword map, intent model, topic clusters, and content opportunities." },
  { number: "04", phase: "Plan", title: "Turn insight into direction", description: "We decide what to fix first, which pages deserve attention, what content should exist, and how each recommendation supports the goal.", client: "You help confirm priorities, resources, owners, and timing.", output: "A sequenced SEO roadmap with clear decisions and next actions." },
  { number: "05", phase: "Improve", title: "Make the foundation stronger", description: "The work may include technical fixes, on-page optimization, internal links, content briefs, local signals, performance, accessibility, or design collaboration.", client: "You approve changes and coordinate implementation where needed.", output: "Improved pages, clearer structure, implementation guidance, and QA notes." },
  { number: "06", phase: "Learn", title: "Measure what matters", description: "After changes, we review search visibility, qualified engagement, indexation, technical health, and conversions without pretending one metric tells the whole story.", client: "You share business feedback and sales quality, not only dashboard numbers.", output: "A measurement view that explains what changed and what deserves attention next." },
  { number: "07", phase: "Iterate", title: "Keep building momentum", description: "SEO is a living system. We use evidence, new questions, market changes, and performance patterns to choose the next highest-value improvement.", client: "You decide the pace and help keep the work connected to the business.", output: "A continuously refined search strategy, without ranking guarantees or guesswork." }
];

const processStepIcons: LucideIcon[] = [Search, FileSearch, Target, BarChart3, Lightbulb, Gauge, Code2, BarChart3];

function MotionSystem() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('main > section, main > article:not(.article-page), footer');
    targets.forEach((target, index) => { target.classList.add('motion-reveal'); target.style.setProperty('--motion-delay', `${Math.min(index * 55, 330)}ms`); });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return null;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type ContentRecord = {
  [key: string]: unknown;
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  html?: string;
  image?: string;
  keywords?: string;
  schema?: string;
  category?: string;
  publishDate?: string;
  readingTime?: string;
  url?: string;
  externalUrl?: string;
};

type SiteContent = ContentRecord & {
  title: string;
  slug: string;
  description: string;
  content: string;
  html: string;
  image: string;
  keywords: string;
  schema: string;
  category: string;
  date: string;
  time: string;
  color: string;
};

function normalizeContent(records: unknown[], fallbackCategory: string): SiteContent[] {
  return records.map((item, index) => {
    const metadata = item as ContentRecord;
    const title = String(metadata.title || "Untitled content");
    return {
      ...metadata,
      title,
      slug: String(metadata.slug || slugify(title)),
      description: String(metadata.description || `Insights from SK Khorrum about ${title}.`),
      content: String(metadata.content || metadata.html || ""),
      html: String(metadata.html || ""),
      image: String(metadata.image || ""),
      keywords: String(metadata.keywords || ""),
      schema: String(metadata.schema || ""),
      category: String(metadata.category || fallbackCategory),
      date: String(metadata.publishDate || metadata.date || "Aug 2026"),
      time: String(metadata.readingTime || "5 min read"),
      color: ["mint", "sun", "sky"][index % 3],
    };
  });
}

const posts = normalizeContent(discoveredPosts, "SEO");
const pages = normalizeContent(discoveredPages, "Page");
const projects = normalizeContent(discoveredProjects, "Project");
const caseStudies = normalizeContent(discoveredCaseStudies, "Case Study");

const faqs = [
  "Who is SK Khorrum?",
  "What does an SEO Expert do?",
  "What SEO services do you provide?",
  "What is technical SEO?",
  "What is an SEO audit?",
  "How does keyword research work?",
  "How long does SEO take?",
  "Can you optimize an existing website?",
  "Can you provide local SEO?",
  "Can you build SEO-friendly websites?",
  "Do you work with WordPress?",
  "Can you help improve Google visibility?",
  "Can you manage digital marketing campaigns?",
];

function SeoSignals({
  title = "SK Khorrum | SEO Expert & Digital Marketer",
  description = "SEO strategy, technical SEO, content optimization, and SEO-friendly web design for businesses ready to be found.",
  type = "WebSite",
  canonicalUrl = "",
  image = "",
  imageAlt = "",
  keywords = "",
  structuredData = "",
  faqItems = faqs.map((question) => ({
    question,
    answer:
      question === "Who is SK Khorrum?"
        ? "SK Khorrum is an SEO Expert and Digital Marketer focused on improving search visibility, organic growth, and SEO-friendly digital experiences."
        : "The right answer depends on your website and goals. We start with discovery and evidence, then build a practical plan around the biggest opportunities.",
  })),
}: {
  title?: string;
  description?: string;
  type?: string;
  canonicalUrl?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string;
  structuredData?: string;
  faqItems?: Array<{ question: string; answer: string }>;
}) {
  useEffect(() => {
    document.title = title;
    const setMeta = (
      key: string,
      value: string,
      attribute: "name" | "property",
    ) => {
      const selector = `meta[${attribute}="${key}"]`;
      const meta =
        document.querySelector(selector) || document.createElement("meta");
      meta.setAttribute(attribute, key);
      meta.setAttribute("content", value);
      document.head.appendChild(meta);
    };
    const pageUrl = canonicalUrl || `${SITE_URL}${window.location.pathname}`;
    setMeta("description", description, "name");
    if (keywords) setMeta("keywords", keywords, "name");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta(
      "og:url",
      pageUrl,
      "property",
    );
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:card", "summary_large_image", "name");
    if (image) {
      setMeta("og:image", image, "property");
      if (imageAlt) setMeta("og:image:alt", imageAlt, "property");
      setMeta("twitter:image", image, "name");
    }
    const canonical =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute(
      "href",
      pageUrl,
    );
    document.head.appendChild(canonical);
    const graph = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "SK Khorrum",
        jobTitle: "SEO Expert & Digital Marketer",
        url: SITE_URL,
        image: "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
        sameAs: [
          "https://github.com/sk-khorrum",
          "https://linkedin.com/in/sk-khorrum-36107a263/",
          "https://codepen.io/Khorrum",
        ],
        knowsAbout: [
          "Search Engine Optimization",
          "Technical SEO",
          "Content SEO",
          "Digital Marketing",
          "SEO-Friendly Web Design",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": type,
        name: title,
        description,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: "SK Khorrum",
          url: SITE_URL,
        },
      },
      ...(window.location.pathname === "/"
        ? [
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: answer,
                },
              })),
            },
          ]
        : []),
    ];
    let script = document.getElementById(
      "seo-jsonld",
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    if (structuredData) {
      try {
        script.textContent = JSON.stringify(JSON.parse(structuredData));
      } catch {
        script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
      }
    } else {
      script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    }
  }, [title, description, type, canonicalUrl, image, imageAlt, keywords, structuredData, faqItems]);
  return null;
}

function RequirementsPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="utility-page">
      <SeoSignals title="Project brief | SK Khorrum" description="Share your website, goals, and SEO requirements with SK Khorrum." type="WebPage" />
      <a className="brand" href="/">
        <span className="brand-mark">SK</span>
        <span>SK Khorrum</span>
      </a>
      <div className="utility-card">
        <div className="section-kicker">Project brief</div>
        <h1>
          Tell me what you want to <em>make more visible.</em>
        </h1>
        <p>
          Share the useful context and I’ll come prepared with the right
          questions.
        </p>
        {sent ? (
          <div className="success-message light">
            <Check size={28} />
            <h3>Thank you.</h3>
            <p>Your project requirements have been received.</p>
            <a className="button button-primary" href="/">
              Back to home
            </a>
          </div>
        ) : (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              const form = new FormData(event.currentTarget);
              const values = Object.fromEntries(form.entries());
              try {
                await submitFormToBoth(
                  values,
                  `New project brief from ${String(values.Name || "website")}`,
                  "clientRequirements",
                );
                setSent(true);
              } catch {
                setError("We could not submit the brief right now. Please try again.");
              }
            }}
            className="requirements-form"
          >
            {[
              "Name",
              "Email",
              "Phone",
              "Company",
              "Website",
              "Business Type",
              "Target Country",
              "Target Location",
              "Main Services",
              "Target Audience",
              "Main SEO Problems",
              "Competitors",
              "Target Keywords",
              "Budget Range",
              "Deadline",
            ].map((label) => (
              <label key={label}>
                {label}
                <input
                  name={label}
                  required={label === "Name" || label === "Email"}
                  type={label === "Email" ? "email" : "text"}
                />
              </label>
            ))}
            <label className="full">
              Additional Requirements
              <textarea name="Additional Requirements" rows={5} />
            </label>
            {error && <p className="form-error full">{error}</p>}
            <button className="button button-primary full">
              Submit Requirements <ArrowUpRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

type AdminInquiry = Record<string, unknown> & { id: string };

function displayAdminValue(value: unknown) {
  if (value == null) return "—";
  if (typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toLocaleString();
  }
  return String(value) || "—";
}

function InquiryList({ title, items, emptyText }: { title: string; items: AdminInquiry[]; emptyText: string }) {
  return <section className="admin-inquiry-list">
    <h2>{title}</h2>
    {items.length ? items.map((item) => <details className="admin-inquiry" key={item.id}>
      <summary>
        <strong>{displayAdminValue(item.Name || item.name)}</strong>
        <span>{displayAdminValue(item.Email || item.email)}</span>
        <small>{displayAdminValue(item.createdAt)}</small>
      </summary>
      <dl>
        {Object.entries(item)
          .filter(([key]) => key !== "id" && key !== "createdAt")
          .map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{displayAdminValue(value)}</dd></div>)}
        <div><dt>Received</dt><dd>{displayAdminValue(item.createdAt)}</dd></div>
      </dl>
    </details>) : <p className="admin-empty">{emptyText}</p>}
  </section>;
}

function AdminPage() {
  const defaultFeaturedSlugs = posts.slice(0, 3).map((post) => post.slug);
  const [user, setUser] = useState(false);
  const [requirements, setRequirements] = useState<AdminInquiry[]>([]);
  const [messages, setMessages] = useState<AdminInquiry[]>([]);
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>(defaultFeaturedSlugs);
  const [selectionSaved, setSelectionSaved] = useState(false);
  const [selectionSaving, setSelectionSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth || !db) return;
    const database = db;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(Boolean(currentUser));
      if (!currentUser) {
        setRequirements([]);
        setMessages([]);
        return;
      }
      void getDoc(doc(database, "siteSettings", "homepage"))
        .then((snapshot) => {
          const saved = snapshot.data()?.featuredPostSlugs;
          if (Array.isArray(saved)) {
            setFeaturedSlugs(saved.filter((slug): slug is string => typeof slug === "string"));
          }
        })
        .catch(() => {
          // Keep the safe default selection if the settings document is not available yet.
        });
      void Promise.all([
        getDocs(collection(database, "clientRequirements")),
        getDocs(collection(database, "contactMessages")),
      ])
        .then(([requirementSnapshot, messageSnapshot]) => {
          const newestFirst = (items: AdminInquiry[]) => items.sort((a, b) => {
            const aTime = a.createdAt && typeof a.createdAt === "object" && "toMillis" in a.createdAt && typeof a.createdAt.toMillis === "function" ? a.createdAt.toMillis() : 0;
            const bTime = b.createdAt && typeof b.createdAt === "object" && "toMillis" in b.createdAt && typeof b.createdAt.toMillis === "function" ? b.createdAt.toMillis() : 0;
            return bTime - aTime;
          });
          setRequirements(newestFirst(requirementSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }))));
          setMessages(newestFirst(messageSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }))));
        })
        .catch(() => setError("Signed in, but dashboard data could not be loaded. Confirm your Firestore rules and admins/{uid} document."));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="utility-page">
      <SeoSignals title="Admin login | SK Khorrum" description="Private administration area for SK Khorrum." type="WebPage" />
      <a className="brand" href="/">
        <span className="brand-mark">SK</span>
        <span>SK Khorrum / Admin</span>
      </a>
      <div className="admin-card">
        {user ? (
          <>
            <div className="section-kicker">Dashboard</div>
            <h1>Client inquiries.</h1>
            <p>Open any item below to read every field sent by a visitor or prospective client.</p>
            <div className="admin-stats">
              <b>{posts.length}<small>Blog posts</small></b>
              <b>{requirements.length}<small>Requirements</small></b>
              <b>{messages.length}<small>Messages</small></b>
            </div>
            {error && <p className="form-error">{error}</p>}
            <section className="admin-content-selection">
              <div className="admin-selection-heading">
                <div>
                  <div className="section-kicker">Homepage control</div>
                  <h2>Choose featured posts.</h2>
                  <p>Select the articles that should appear in the homepage journal. Every article remains available in the Blog section.</p>
                </div>
                <span className="admin-selection-count">{featuredSlugs.length} selected</span>
              </div>
              <div className="admin-post-selector">
                {posts.map((post) => (
                  <label className="admin-post-option" key={post.slug}>
                    <input
                      type="checkbox"
                      checked={featuredSlugs.includes(post.slug)}
                      onChange={() => {
                        setSelectionSaved(false);
                        setFeaturedSlugs((current) => current.includes(post.slug)
                          ? current.filter((slug) => slug !== post.slug)
                          : [...current, post.slug]);
                      }}
                    />
                    <span>
                      <strong>{post.title}</strong>
                      <small>/blog/{post.slug}</small>
                    </span>
                  </label>
                ))}
              </div>
              <button
                className="button button-primary"
                type="button"
                disabled={selectionSaving}
                onClick={async () => {
                  if (!db) {
                    setError("Firebase is not configured for homepage settings.");
                    return;
                  }
                  setSelectionSaving(true);
                  setSelectionSaved(false);
                  setError("");
                  try {
                    await setDoc(doc(db, "siteSettings", "homepage"), {
                      featuredPostSlugs: featuredSlugs,
                      updatedAt: serverTimestamp(),
                    });
                    setSelectionSaved(true);
                  } catch {
                    setError("Homepage selection could not be saved. Check your admin Firestore permissions.");
                  } finally {
                    setSelectionSaving(false);
                  }
                }}
              >
                {selectionSaving ? "Saving…" : "Save homepage selection"}
              </button>
              {selectionSaved && <p className="admin-save-confirmation">Homepage journal selection saved.</p>}
            </section>
            <InquiryList title="SEO Requirements" items={requirements} emptyText="No client requirements have been received yet." />
            <InquiryList title="Contact Messages" items={messages} emptyText="No contact messages have been received yet." />
            <a className="text-link" href="/">Return to website <MoveRight size={18} /></a>
          </>
        ) : (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              const form = new FormData(event.currentTarget);
              try {
                if (!auth)
                  throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values in Vercel.");
                await signInWithEmailAndPassword(auth, String(form.get("email")), String(form.get("password")));
              } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to sign in.");
              }
            }}
          >
            <div className="section-kicker">Private area</div>
            <h1>Admin <em>login.</em></h1>
            <label>Email<input name="email" type="email" autoComplete="username" required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary" type="submit">Sign in <ArrowUpRight size={18} /></button>
          </form>
        )}
      </div>
    </div>
  );
}

const projectLogos = (discoveredProjectLogos as string[]).filter(Boolean);

function ProjectLogoStrip() {
  const logos = [...projectLogos, ...projectLogos];
  return <section className="logo-strip" aria-label="Selected client and project logos"><div className="logo-strip-head"><span className="section-kicker">Selected project logos</span><span>SEO thinking · digital experience · web design</span></div><div className="logo-marquee"><div className="logo-track">{logos.map((logo, index) => <span className="project-logo" key={`${logo}-${index}`}><img src={`/assets/logos/${logo}`} width="180" height="70" loading="lazy" alt="Selected digital project logo" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span>)}</div></div>{!projectLogos.length && <p className="logo-upload-note">Add verified JPG logos to <code>public/assets/logos/</code> to update this strip.</p>}</section>;
}

type ManualReview = { name: string; photo: string; company: string; designation: string; text: string; rating: number };

// Sample layout content only. Replace these entries with approved client feedback before publishing.
const manualReviews: ManualReview[] = [
  {
    name: "Sample Client 01",
    photo: "https://ui-avatars.com/api/?name=Client+01&background=1d7a5b&color=ffffff&size=160",
    company: "Bangladesh Growth Co.",
    designation: "Managing Director",
    text: "Sample testimonial — replace this with an approved client review.",
    rating: 5,
  },
  {
    name: "Sample Client 02",
    photo: "https://ui-avatars.com/api/?name=Client+02&background=356b82&color=ffffff&size=160",
    company: "Dhaka Digital Ltd.",
    designation: "Founder",
    text: "Sample testimonial — replace this with an approved client review.",
    rating: 5,
  },
  {
    name: "Sample Client 03",
    photo: "https://ui-avatars.com/api/?name=Client+03&background=718a39&color=ffffff&size=160",
    company: "Bangla Commerce BD",
    designation: "Marketing Lead",
    text: "Sample testimonial — replace this with an approved client review.",
    rating: 5,
  },
];

function VerifiedReviews() {
  const profileUrl = import.meta.env.VITE_GOOGLE_BUSINESS_PROFILE_URL || "https://maps.app.goo.gl/78hssZZD7FbByZrH7";
  return <section className="reviews-section section-pad" aria-label="Client feedback">
    <div className="reviews-intro">
      <div className="section-kicker">Client feedback</div>
      <h2>Real words from <em>real work.</em></h2>
      <p>Sample Bangladesh client cards are shown here so you can preview the design. Replace the sample details with approved client feedback before publishing.</p>
      <div className="review-actions">
        <a className="button button-outline" href={profileUrl} target="_blank" rel="noreferrer">View Google Maps profile <ArrowUpRight size={16} /></a>
        <a className="text-link" href={profileUrl} target="_blank" rel="noreferrer">Open Google Maps <MoveRight size={16} /></a>
      </div>
    </div>
    <div className="reviews-panel">
      <div className="review-grid">
        {manualReviews.map((review) => <article className="review-card" key={review.name}>
          <div className="review-person">
            <img src={review.photo} width="52" height="52" loading="lazy" alt={review.name} />
            <div><b>{review.name}</b><small>{review.designation} · {review.company}</small></div>
          </div>
          <div className="stars" aria-label={String(review.rating) + " out of 5 stars"}>{"★".repeat(Math.min(5, review.rating))}</div>
          <p>“{review.text}”</p>
          <small className="review-placeholder">Sample content — replace before publishing</small>
        </article>)}
      </div>
    </div>
  </section>;
}

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "";
const contactAddress = import.meta.env.VITE_CONTACT_ADDRESS || "Bangladesh · Available worldwide";
const mapUrl = import.meta.env.VITE_GOOGLE_BUSINESS_PROFILE_URL || "https://maps.app.goo.gl/78hssZZD7FbByZrH7";

function ContactDetails() {
  return <div className="contact-details">{contactEmail ? <a href={`mailto:${contactEmail}`}><Mail size={17} /><span><small>Email</small>{contactEmail}</span></a> : null}<a href="tel:+88013140589563"><Phone size={17} /><span><small>Phone</small>01314089563</span></a><a href="https://wa.me/88013140589563?text=Hi%20SK%20Khorrum%2C%20I%27d%20like%20to%20discuss%20SEO%20support%20for%20my%20business." target="_blank" rel="noreferrer"><MessageCircle size={17} /><span><small>WhatsApp</small>Message SK Khorrum</span></a><a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={17} /><span><small>Location</small>{contactAddress}</span></a></div>;
}

function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href="https://wa.me/88013140589563?text=Hi%20SK%20Khorrum%2C%20I%27d%20like%20to%20discuss%20SEO%20support%20for%20my%20business." target="_blank" rel="noreferrer" aria-label="Chat with SK Khorrum on WhatsApp"><MessageCircle size={25} /><span>Chat on WhatsApp</span></a>;
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>(() => posts.slice(0, 3).map((post) => post.slug));
  useEffect(() => {
    if (!db) return;
    void getDoc(doc(db, "siteSettings", "homepage"))
      .then((snapshot) => {
        const saved = snapshot.data()?.featuredPostSlugs;
        if (Array.isArray(saved)) {
          setFeaturedSlugs(saved.filter((slug): slug is string => typeof slug === "string"));
        }
      })
      .catch(() => {
        // The first three posts remain a safe fallback if settings are unavailable.
      });
  }, []);
  const featuredPosts = posts.filter((post) => featuredSlugs.includes(post.slug));
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [workflowPaused, setWorkflowPaused] = useState(false);
  const [revealedWorkflow, setRevealedWorkflow] = useState<Set<number>>(new Set([0]));
  useEffect(() => { document.body.classList.toggle("menu-is-open", menuOpen); return () => document.body.classList.remove("menu-is-open"); }, [menuOpen]);
  useEffect(() => { const observer = new IntersectionObserver((entries) => { setRevealedWorkflow((current) => { const next = new Set(current); entries.forEach((entry) => { if (entry.isIntersecting) { const index = Number((entry.target as HTMLElement).dataset.workflowIndex); next.add(index); setActiveWorkflow(index); } }); return next; }); }, { threshold: 0.42 }); const cards = document.querySelectorAll<HTMLElement>('.workflow-card'); cards.forEach((card) => observer.observe(card)); return () => observer.disconnect(); }, []);
  useEffect(() => { const updateFromScroll = () => { const cards = Array.from(document.querySelectorAll<HTMLElement>('.workflow-card')); if (!cards.length) return; const viewportCenter = window.innerHeight / 2; const nearest = cards.reduce((best, card, index) => Math.abs(card.getBoundingClientRect().top + card.offsetHeight / 2 - viewportCenter) < Math.abs(cards[best].getBoundingClientRect().top + cards[best].offsetHeight / 2 - viewportCenter) ? index : best, 0); setActiveWorkflow(nearest); }; updateFromScroll(); window.addEventListener('scroll', updateFromScroll, { passive: true }); return () => window.removeEventListener('scroll', updateFromScroll); }, []);
  const nav = [
    ["About", "/about"],
    ["SEO Services", "/services"],
    ["SEO Process A-Z", "/seo-process"],
    ["How I Work", "#how-i-work"],
    ["Portfolio", "/portfolio"],
    ["Case Studies", "/case-studies"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];
  return (
    <div className="site-shell">
      <FloatingWhatsApp />
      <MotionSystem />
      <SeoSignals />
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="SK Khorrum home">
          <span className="brand-mark">SK</span>
          <span>SK Khorrum</span>
        </a>
        <nav id="site-navigation" className={menuOpen ? "nav-links open" : "nav-links"}>
          {nav.map(([item, href]) => (
            <a href={href} onClick={() => setMenuOpen(false)} key={item}>
              {item}
            </a>
          ))}
          <a className="nav-cta" href="/contact">
            Get SEO Consultation <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse" /> SEO EXPERT & DIGITAL MARKETER <i>·</i> WEB DESIGNER
            </div>
            <h1>
              Make your best work <em>easier to find.</em>
            </h1>
            <p className="hero-lead">
              I'm SK Khorrum, an SEO-focused digital marketer helping businesses
              improve search visibility, attract qualified organic traffic, and
              build a stronger online presence. I also design modern,
              SEO-friendly websites that combine performance, usability, and
              search optimization.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Get SEO Consultation <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#portfolio">
                View my work <MoveRight size={18} />
              </a>
            </div>
            <div className="trust-row">
              <span>SEO Strategy</span>
              <span>Technical SEO</span>
              <span>On-Page SEO</span>
              <span>Keyword Research</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                src="/assets/sk-khorrum-hero-clean.png"
                width="560"
                height="680"
                alt="SK Khorrum, SEO Expert and Digital Marketer"
              />
            </div>
          </div>
        </section>
        <section className="proof-band">
          <div>
            <strong>
              2<span>+</span>
            </strong>
            <small>Years of experience</small>
          </div>
          <div>
            <strong>SEO</strong>
            <small>First, always</small>
          </div>
          <div>
            <strong>360°</strong>
            <small>Digital perspective</small>
          </div>
          <div>
            <strong>1:1</strong>
            <small>Client-focused approach</small>
          </div>
        </section>
        <ProjectLogoStrip />
        <VerifiedReviews />
        <section className="section-pad growth-map">
          <div className="section-kicker">The growth map</div>
          <div className="section-heading">
            <h2>
              Every SEO decision should have a <em>job to do.</em>
            </h2>
            <p>
              SEO is strongest when the work connects from foundation to
              opportunity. Here is how each layer contributes to a healthier
              search presence.
            </p>
          </div>
          <div className="growth-grid">
            <div>
              <span>01</span>
              <b>Foundation</b>
              <p>
                Technical health, crawlability, speed, indexation, and a
                structure search engines can understand.
              </p>
              <small>Technical SEO · Performance · Architecture</small>
            </div>
            <div>
              <span>02</span>
              <b>Relevance</b>
              <p>
                Keyword research, search intent, page structure, and content
                that answers the right questions.
              </p>
              <small>On-page SEO · Content · Internal linking</small>
            </div>
            <div>
              <span>03</span>
              <b>Authority</b>
              <p>
                Topical depth, local signals, competitor gaps, and useful
                experiences that build confidence.
              </p>
              <small>Local SEO · Strategy · Digital marketing</small>
            </div>
            <div>
              <span>04</span>
              <b>Momentum</b>
              <p>
                Measurement, learning, and prioritization so the next
                improvement is based on evidence.
              </p>
              <small>Search Console · Reporting · Iteration</small>
            </div>
          </div>
        </section>
        <section className="section-pad about" id="about">
          <div className="section-kicker">A little about me</div>
          <div className="split-heading">
            <h2>
              I look at your website the way <em>Google and people do.</em>
            </h2>
            <div>
              <p>
                Search is more than a traffic channel. It is where people form
                their first impression, compare their options, and decide what
                to do next.
              </p>
              <p>
                I bring together technical SEO, content thinking, and digital
                marketing to create a clearer path between your expertise and
                the people searching for it.
              </p>
              <a className="text-link" href="#contact">
                Learn more about me <MoveRight size={18} />
              </a>
            </div>
          </div>
          <div className="about-bottom">
            <img
              src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
              width="380"
              height="460"
              loading="lazy"
              alt="SK Khorrum working on an SEO strategy"
            />
            <div className="about-list">
              <div>
                <span>01</span>
                <b>SEO is the main event.</b>
                <p>
                  From crawlability to content architecture, I focus on the work
                  that creates durable search visibility.
                </p>
              </div>
              <div>
                <span>02</span>
                <b>Design supports discovery.</b>
                <p>
                  Web design is my complementary edge: fast, accessible
                  experiences that help visitors take action.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-pad services" id="seo-services">
          <div className="section-kicker">How I can help</div>
          <div className="section-heading">
            <h2>
              SEO services built around <em>real search behavior.</em>
            </h2>
            <p>
              No templates, no ranking guarantees. Just thoughtful strategy and
              focused execution around how your audience searches.
            </p>
          </div>
          <div className="service-grid">
            {services.map(([name, desc, Icon], index) => (
              <a
                className={
                  index < 3 ? "service-card highlighted" : "service-card"
                }
                href={`/services/${name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`}
                key={name}
              >
                <span className="service-number">0{index + 1}</span>
                <Icon size={24} strokeWidth={1.7} />
                <h3>{name}</h3>
                <p>{desc as string}</p>
                <span className="card-link">
                  Learn more <ArrowUpRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section className="strategy section-pad">
          <div className="strategy-intro">
            <div className="section-kicker">My approach</div>
            <h2>
              SEO that starts with <em>understanding.</em>
            </h2>
            <p>
              Good optimization is not a checklist. It is the discipline of
              connecting the right technical foundation to the right human need.
            </p>
            <a className="button button-dark" href="/seo-process">
              Explore SEO Process A-Z <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="strategy-list">
            {[
              "Technical SEO",
              "On-Page SEO",
              "Search Intent",
              "Topical Authority",
              "Local SEO",
              "Data-Driven Optimization",
            ].map((item, i) => (
              <a
                className="strategy-link"
                href={`/strategies/${seoStrategies[i].slug}`}
                key={item}
              >
                <span>0{i + 1}</span>
                <b>{item}</b>
                <p>
                  {
                    [
                      "Make your site accessible to search engines and effortless to use.",
                      "Align pages, structure, and language with what people need.",
                      "Meet the reason behind a query, not just the words in it.",
                      "Build a connected body of expertise that earns trust.",
                      "Turn local relevance into meaningful next steps.",
                      "Use evidence to prioritize improvements and learn continuously.",
                    ][i]
                  }
                </p>
                <ArrowUpRight size={19} />
              </a>
            ))}
          </div>
        </section>
        <section className="section-pad deliverables">
          <div className="section-kicker">What you receive</div>
          <div className="section-heading">
            <h2>
              Clarity you can actually <em>use.</em>
            </h2>
            <p>
              Each engagement is shaped to the business, but the output is
              always practical: decisions, priorities, and a clear next move.
            </p>
          </div>
          <div className="deliverable-grid">
            {[
              [
                "Search opportunity map",
                "A prioritized view of demand, intent, competition, and the pages that can earn attention.",
              ],
              [
                "Technical action plan",
                "A clear list of issues, impact, recommended fix, and implementation priority.",
              ],
              [
                "Content direction",
                "Topics and page briefs that give your expertise a useful place to meet search behavior.",
              ],
              [
                "Measurement framework",
                "A lightweight reporting view that separates useful signals from vanity metrics.",
              ],
            ].map(([title, description], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section-pad process">
          <div className="section-kicker">A considered process</div>
          <div className="section-heading">
            <h2>
              From first question to <em>forward motion.</em>
            </h2>
            <p>
              Every SEO project starts with context, moves through evidence, and
              ends with a roadmap the business can actually act on.
            </p>
          </div>
          <div className="process-grid">
            {[
              "Discovery",
              "Website Audit",
              "Keyword Research",
              "Competitor Analysis",
              "SEO Strategy",
              "Optimization",
              "Content",
              "Monitoring",
            ].map((step, i) => {
              const Icon = processStepIcons[i] || Search;
              return (
                <div key={step}>
                  <span className="process-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <b>{step}</b>
                  <p>
                    {
                      [
                        "Understand the business, audience, and ambition.",
                        "Find friction, gaps, and your best opportunities.",
                        "Map demand to the pages that should earn it.",
                        "See what the market makes possible.",
                        "Turn findings into a prioritized plan.",
                        "Improve the experience search engines and people meet.",
                        "Create useful answers with a reason to exist.",
                        "Learn, refine, and keep building momentum.",
                      ][i]
                    }
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="how-i-work section-pad" id="how-i-work">
          <div className="how-i-work-head">
            <div>
              <div className="section-kicker">How I work</div>
              <h2>From first conversation to <em>clearer growth.</em></h2>
            </div>
            <p>Every project moves through a calm, evidence-led sequence. You always know what happens next, what I need from you, and what the work produces.</p>
          </div>
          <div className="workflow-progress" aria-label="SEO workflow progress"><span style={{ width: `${((activeWorkflow + 1) / workflowSteps.length) * 100}%` }} /></div>
          <div className="workflow-track">
            {workflowSteps.map((step, index) => <article data-workflow-index={index} className={`${activeWorkflow === index ? "workflow-card active" : "workflow-card"} ${revealedWorkflow.has(index) ? "revealed" : ""}`} onMouseEnter={() => { setActiveWorkflow(index); setWorkflowPaused(true); }} onMouseLeave={() => setWorkflowPaused(false)} key={step.number}><div className="workflow-card-top"><span>{step.number}</span><small>{step.phase}</small></div><h3>{step.title}</h3><p>{step.description}</p><div className="workflow-detail"><b>Your part</b><span>{step.client}</span><b>My output</b><span>{step.output}</span></div></article>)}
          </div>
          <a className="button button-dark" href="/requirements">Start with your project <ArrowUpRight size={17} /></a>
        </section>
        <section className="roadmap section-pad">
          <div className="section-kicker">The complete SEO roadmap</div>
          <div className="section-heading">
            <h2>
              SEO from A to Z, <em>without the mystery.</em>
            </h2>
            <p>
              This is the full operating system behind a durable search
              presence. Some projects need every stage; others begin with one
              focused problem.
            </p>
            <a className="text-link" href="/seo-process">
              Open complete SEO process <MoveRight size={18} />
            </a>
          </div>
          <div className="roadmap-list">
            {[
              [
                "A",
                "Align goals",
                "Define the business goal, audience, market, offer, and what a useful organic visit should do.",
              ],
              [
                "B",
                "Benchmark",
                "Capture the current baseline: indexed pages, queries, visibility, conversions, speed, and competitors.",
              ],
              [
                "C",
                "Crawl & diagnose",
                "Review robots.txt, sitemaps, status codes, canonicals, redirects, rendering, and crawl paths.",
              ],
              [
                "D",
                "Discover demand",
                "Research topics and queries by intent, relevance, competition, and business value.",
              ],
              [
                "E",
                "Engineer structure",
                "Build a logical information architecture, URL system, navigation, internal links, and clean page hierarchy.",
              ],
              [
                "F",
                "Fix foundations",
                "Address indexation, performance, mobile UX, accessibility, schema, image SEO, and technical blockers.",
              ],
              [
                "G",
                "Grow relevance",
                "Improve titles, headings, copy, entities, topical coverage, and the helpfulness of important pages.",
              ],
              [
                "H",
                "Harvest insight",
                "Monitor Search Console, analytics, rankings, indexed coverage, engagement, and qualified actions.",
              ],
              [
                "I",
                "Iterate",
                "Prioritize the next highest-value improvement, test the change, document the result, and keep learning.",
              ],
            ].map(([letter, title, description]) => (
              <a href={`/seo-process/${seoRoadmap[letter.charCodeAt(0) - 65].slug}`} key={letter}>
                <span>{letter}</span>
                <div>
                  <b>{title}</b>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </section>
        <section className="work-section" id="portfolio">
          <div className="section-pad">
            <div className="section-kicker">Selected work</div>
            <div className="section-heading">
              <h2>
                Websites with a reason <em>to be seen.</em>
              </h2>
              <p>
                A selection of digital projects. Explore the thinking, craft,
                and potential behind each one.
              </p>
            </div>
            <div className="project-grid">
              {[
                "SK Khorrum CEO",
                "SK Khorrum Info",
                "Life Line",
                "DRT",
                "Wood Communication",
                "Cinevista BD",
              ].map((p, i) => (
                <a
                  href={
                    [
                      "https://sk-khorrum-ceo.vercel.app/",
                      "https://sk-khorruminfo.vercel.app/",
                      "https://sk-khorrum-life-line.vercel.app/",
                      "https://drt.vercel.app/",
                      "https://woodcommunication.vercel.app/",
                      "https://cinevista-bd.vercel.app/",
                    ][i]
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={`project project-${i + 1}`}
                  key={p}
                >
                  <div className="project-art">
                    <span>{i < 3 ? "SEO / DIGITAL" : "WEB DESIGN"}</span>
                    <ArrowUpRight size={23} />
                  </div>
                  <div className="project-meta">
                    <b>{p}</b>
                    <small>
                      {i < 3
                        ? "Personal brand & visibility"
                        : "Responsive web experience"}
                    </small>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="section-pad case-studies" id="case-studies">
          <div className="section-kicker">Proof through process</div>
          <div className="split-heading">
            <h2>
              SEO case studies, <em>without the made-up numbers.</em>
            </h2>
            <div>
              <p>
                Every business has a different starting point. I document the
                problem, strategy, and work honestly, adding verified outcomes
                when they are available.
              </p>
              <a className="text-link" href="#contact">
                Start a conversation <MoveRight size={18} />
              </a>
            </div>
          </div>
          <div className="case-placeholder">
            <ShieldCheck size={25} />
            <div>
              <b>Detailed case studies are coming soon.</b>
              <p>
                Want your project to be the next one? Let's talk about what is
                possible.
              </p>
            </div>
            <a className="button button-outline" href="#contact">
              Discuss your project <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section className="blog-section" id="blog">
          <div className="section-pad">
            <div className="section-kicker">From the journal</div>
            <div className="section-heading">
              <h2>
                Ideas for a more <em>visible business.</em>
              </h2>
              <a className="text-link" href="#blog">
                Browse all insights <MoveRight size={18} />
              </a>
            </div>
            <div className="post-grid">
              {featuredPosts.length ? featuredPosts.map((post) => (
                <article className="post-card" key={post.title}>
                  <PostThumbnail post={post} />
                  <small>
                    {post.date} <i /> {post.time}
                  </small>
                  <h3>{post.title}</h3>
                  <a className="text-link" href={`/blog/${post.slug}`}>
                    Read article <MoveRight size={16} />
                  </a>
                </article>
              )) : (
                <div className="case-placeholder homepage-empty-posts">
                  <div>
                    <b>No homepage posts selected yet.</b>
                    <p>Select posts from the Admin Panel to feature them here. All posts remain available in Blog.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="comparison section-pad">
          <div className="section-kicker">The difference</div>
          <h2>
            With SEO <em>vs</em> without SEO.
          </h2>
          <div className="comparison-grid">
            <div className="with-seo">
              <span className="comparison-label">WITH SEO</span>
              {[
                "Better search visibility",
                "More qualified organic traffic",
                "Stronger website structure",
                "Better content discovery",
                "Long-term visibility",
                "More opportunities for organic leads",
              ].map((x) => (
                <p key={x}>
                  <Check size={17} />
                  {x}
                </p>
              ))}
            </div>
            <div className="without-seo">
              <span className="comparison-label">WITHOUT SEO</span>
              {[
                "Harder to discover",
                "Missed search opportunities",
                "Weak search visibility",
                "Poor content discovery",
                "More dependency on paid traffic",
              ].map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>
          </div>
        </section>
        <section className="faq section-pad">
          <div className="section-kicker">Questions, answered</div>
          <div className="split-heading">
            <h2>
              Let’s make SEO <em>less mysterious.</em>
            </h2>
            <p>
              Clear thinking starts with clear answers. Here are a few of the
              questions I hear most often.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                className={openFaq === i ? "faq-item active" : "faq-item"}
                key={faq}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq}</span>
                  <ChevronDown size={20} />
                </button>
                {openFaq === i && (
                  <p>
                    {i === 0
                      ? "SK Khorrum is an SEO Expert and Digital Marketer focused on improving search visibility, organic growth, and SEO-friendly digital experiences."
                      : "The right answer depends on your website and goals. We start with discovery and evidence, then build a practical plan around the biggest opportunities."}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="contact section-pad" id="contact">
          <div className="contact-copy">
            <div className="section-kicker">Have a question?</div>
            <h2>
              Let's talk about <em>your SEO.</em>
            </h2>
            <p>
              Tell me where you are, where you want to go, and what is getting
              in the way. I’ll reply with a thoughtful next step.
            </p>
            <div className="contact-detail">
              <span>Prefer a detailed brief?</span>
              <a href="/requirements">
                Share your project requirements <ArrowUpRight size={16} />
              </a>
            </div>
            <ContactDetails />
          </div>
          {submitted ? (
            <div className="success-message">
              <Check size={28} />
              <h3>Thank you.</h3>
              <p>
                Your consultation request has been received. I’ll be in touch
                soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitError("");
                const form = e.currentTarget;
                const values = Object.fromEntries(new FormData(form).entries());
                try {
                  await submitFormToBoth(
                    values,
                    `New SEO consultation request from ${String(values.name || "website")}`,
                    "contactMessages",
                  );
                  setSubmitted(true);
                } catch {
                  setSubmitError("We could not send your message right now. Please try again.");
                }
              }}
            >
              <label>
                Full name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Email address
                <input name="email" required type="email" placeholder="you@company.com" />
              </label>
              <label>
                Website URL
                <input name="website" placeholder="https://" />
              </label>
              <label>
                What can I help with?
                <select name="service" defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>SEO Audit</option>
                  <option>Technical SEO</option>
                  <option>Content SEO</option>
                  <option>SEO-Friendly Web Design</option>
                </select>
              </label>
              <label className="full">
                Your message
                <textarea
                  required
                  name="message"
                  placeholder="Tell me a little about your goals..."
                  rows={4}
                />
              </label>
              {submitError && <p className="form-error full">{submitError}</p>}
              <button className="button button-primary full" type="submit">
                Request SEO Consultation <ArrowUpRight size={18} />
              </button>
            </form>
          )}
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a className="brand" href="#top">
            <span className="brand-mark">SK</span>
            <span>SK Khorrum</span>
          </a>
          <p>
            SEO Expert & Digital Marketer
            <br />
            <span>Web Designer</span>
          </p>
          <div className="socials">
            <a href="https://github.com/sk-khorrum">GitHub</a>
            <a href="https://linkedin.com/in/sk-khorrum-36107a263/">LinkedIn</a>
            <a href="https://codepen.io/Khorrum">CodePen</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SK Khorrum. All Rights Reserved.</span>
          <span>SEO first. Always.</span>
        </div>
      </footer>
    </div>
  );
}

const detailServices = [
  [
    "seo-audit",
    "SEO Audit",
    "Find the friction between your business and its next customer.",
    "A clear, prioritized review of technical health, content quality, search intent, internal linking, and conversion paths.",
  ],
  [
    "technical-seo",
    "Technical SEO",
    "Build the foundation search engines can understand.",
    "Crawlability, indexing, speed, structured data, architecture, and Core Web Vitals working together.",
  ],
  [
    "on-page-seo",
    "On-Page SEO",
    "Make every important page useful, relevant, and easy to choose.",
    "Page structure, titles, headings, content depth, internal links, and intent alignment for better discovery.",
  ],
  [
    "keyword-research",
    "Keyword Research",
    "Find the language behind meaningful demand.",
    "A practical map of topics, queries, competition, and opportunities connected to your business goals.",
  ],
  [
    "local-seo",
    "Local SEO",
    "Become easier to choose in the places that matter.",
    "Local relevance through profiles, location pages, reviews, structured data, and a consistent local presence.",
  ],
  [
    "internal-linking",
    "Internal Linking",
    "Create a clearer route through your website.",
    "Connect related pages so users and crawlers can discover your strongest content with less friction.",
  ],
  [
    "website-seo-optimization",
    "Website SEO Optimization",
    "Improve the pages that shape search and action.",
    "A practical blend of technical improvements, UX clarity, page structure, and conversion-focused optimization.",
  ],
  [
    "search-console-optimization",
    "Search Console Optimization",
    "Turn search data into better decisions.",
    "Use indexing, query, coverage, and performance signals to prioritize what deserves attention next.",
  ],
  [
    "e-commerce-seo",
    "E-commerce SEO",
    "Make products easier to discover before the click.",
    "Search-focused category architecture, product visibility, structured data, and helpful commercial content.",
  ],
  [
    "seo-friendly-web-design",
    "SEO-Friendly Web Design",
    "Create a beautiful website that starts with a discoverable foundation.",
    "Responsive design, accessible structure, fast experiences, and content architecture designed with SEO from day one.",
  ],
];

function SiteChrome({ children }: { children: ReactNode }) {
  const links = [
    ["About", "/about"],
    ["SEO Services", "/services"],
    ["SEO Process A-Z", "/seo-process"],
    ["Portfolio", "/portfolio"],
    ["Case Studies", "/case-studies"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle("menu-is-open", open); return () => document.body.classList.remove("menu-is-open"); }, [open]);
  return (
    <div className="site-shell">
      <FloatingWhatsApp />
      <MotionSystem />
      <header className="nav-wrap">
        <a className="brand" href="/">
          <span className="brand-mark">SK</span>
          <span>SK Khorrum</span>
        </a>
        <nav id="site-navigation" className={open ? "nav-links open" : "nav-links"}>
          {links.map(([label, href]) => (
            <a href={href} onClick={() => setOpen(false)} key={href}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="/contact">
            Get SEO Consultation <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {children}
      <footer>
        <div className="footer-top">
          <a className="brand" href="/">
            <span className="brand-mark">SK</span>
            <span>SK Khorrum</span>
          </a>
          <p>
            SEO Expert & Digital Marketer
            <br />
            <span>Web Designer</span>
          </p>
          <div className="socials">
            <a href="https://github.com/sk-khorrum">GitHub</a>
            <a href="https://linkedin.com/in/sk-khorrum-36107a263/">LinkedIn</a>
            <a href="https://codepen.io/Khorrum">CodePen</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SK Khorrum. All Rights Reserved.</span>
          <span>SEO first. Always.</span>
        </div>
      </footer>
    </div>
  );
}

function InnerPage({
  title,
  kicker,
  intro,
  children,
  seo,
}: {
  title: string;
  kicker: string;
  intro: string;
  children: ReactNode;
  seo?: { title?: string; description?: string; type?: string; canonicalUrl?: string; image?: string; imageAlt?: string; keywords?: string; structuredData?: string };
}) {
  return (
    <SiteChrome>
      <SeoSignals
        title={seo?.title || `${title} | SK Khorrum`}
        description={seo?.description || intro}
        type={seo?.type || "WebPage"}
        canonicalUrl={seo?.canonicalUrl}
        image={seo?.image}
        imageAlt={seo?.imageAlt}
        keywords={seo?.keywords}
        structuredData={seo?.structuredData}
      />
      <main className={`inner-page${seo?.type === "Article" ? " article-shell" : ""}`}>
        <section className="inner-hero">
          <div className="section-kicker">{kicker}</div>
          <h1>{title}</h1>
          <p>{intro}</p>
        </section>
        {children}
      </main>
    </SiteChrome>
  );
}

function ServicesPage() {
  return (
    <InnerPage
      title="SEO services for businesses ready to be found."
      kicker="Search visibility, by design"
      intro="A focused set of SEO and digital marketing services to help your business earn more of the right attention. SEO is the main event; web design makes the foundation stronger."
    >
      <section className="section-pad process-index">
        <div className="section-kicker">Choose a starting point</div>
        <div className="section-heading">
          <h2>
            Explore the SEO process <em>stage by stage.</em>
          </h2>
          <p>
            Each card opens a dedicated page with the practical work,
            deliverables, tools, measurement, and risks for that stage.
          </p>
        </div>
        <div className="process-index-grid">
          {seoRoadmap.slice(0, 9).map((stage) => (
            <a
              href={stage.slug ? `/seo-process/${stage.slug}` : "/seo-process"}
              key={stage.letter}
            >
              <span>{stage.letter}</span>
              <div>
                <b>{stage.title}</b>
                <small>{stage.action}</small>
                <strong className="process-card-cta">Read full guide <ArrowUpRight size={14} /></strong>
              </div>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </section>
      <section className="section-pad inner-section">
        <div className="detail-service-grid">
          {detailServices.map(([slug, title, tagline, desc]) => (
            <a className="detail-service" href={`/services/${slug}`} key={slug}>
              <span className="service-number">→</span>
              <div className="section-kicker">SEO service</div>
              <h2>{title}</h2>
              <h3>{tagline}</h3>
              <p>{desc}</p>
              <span className="text-link">
                Explore service <MoveRight size={17} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}

function ServicePage({ service }: { service: string[] }) {
  return (
    <InnerPage title={service[1]} kicker="SEO service" intro={service[3]}>
      <section className="section-pad detail-layout">
        <div>
          <div className="detail-block">
            <div className="section-kicker">The challenge</div>
            <h2>Good businesses can still be hard to discover.</h2>
            <p>
              Search engines and visitors both need clarity. When a website has
              unclear structure, weak intent alignment, or technical friction,
              valuable opportunities stay hidden.
            </p>
          </div>
          <div className="detail-block">
            <div className="section-kicker">The work</div>
            <h2>A practical plan, built around evidence.</h2>
            <p>
              We review what is happening, decide what matters most, then
              improve the foundation and the pages that can create meaningful
              momentum.
            </p>
          </div>
        </div>
        <aside className="detail-aside">
          <b>What’s included</b>
          {[
            "Discovery and goals",
            "Current-state analysis",
            "Prioritized recommendations",
            "Implementation guidance",
            "Measurement plan",
          ].map((item) => (
            <p key={item}>
              <Check size={16} />
              {item}
            </p>
          ))}
          <a className="button button-primary" href="/contact">
            Request a consultation <ArrowUpRight size={17} />
          </a>
        </aside>
      </section>
      <section className="section-pad related-band">
        <div className="section-kicker">A clear next step</div>
        <h2>
          Make your search presence <em>work harder.</em>
        </h2>
        <a className="button button-dark" href="/requirements">
          Share your project requirements <ArrowUpRight size={17} />
        </a>
      </section>
    </InnerPage>
  );
}

const sanitizeArticleHtml = (html: string) =>
  html
    .replace(/<!doctype[^>]*>/gi, "")
    .replace(/<\/?(html|head|body|title|meta|link)\b[^>]*>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(iframe|object|embed|form)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:class|style|srcdoc)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|src)\s*=\s*["']\s*javascript:[^"']*["']/gi, "");

function PostThumbnail({ post, iconSize = 29 }: { post: typeof posts[number]; iconSize?: number }) {
  return (
    <div className={`post-art ${post.color}${post.image ? " has-image" : ""}`}>
      {post.image ? <img src={post.image} alt={`${post.title} cover image`} loading="lazy" /> : null}
      <span>{post.category}</span>
      {!post.image ? <BarChart3 size={iconSize} /> : null}
    </div>
  );
}

function BlogPage() {
  return (
    <InnerPage
      title="SEO insights for clearer digital growth."
      kicker="The journal"
      intro="Practical thinking about technical SEO, content, search intent, and building websites people can actually find."
    >
      <section className="section-pad inner-section">
        <div className="blog-toolbar">
          <b>{posts.length} insights</b>
          <span>Latest first</span>
        </div>
        <div className="post-grid full-post-grid">
          {posts.slice(0, 6)
            .map((post, index) => (
              <article className="post-card" key={`${post.title}-${index}`}>
                <PostThumbnail post={post} />
                <small>
                  {post.date} <i /> {post.time}
                </small>
                <h3>{post.title}</h3>
                <a
                  className="text-link"
                  href={`/blog/${post.slug}`}
                >
                  Read article <MoveRight size={16} />
                </a>
              </article>
            ))}
        </div>
      </section>
    </InnerPage>
  );
}

function BlogPostPage({ slug }: { slug: string }) {
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    return (
      <InnerPage
        title="Post not found"
        kicker="The journal"
        intro="This article could not be found or may have moved."
      >
        <article className="article-page">
          <h2>That post is no longer available.</h2>
          <a className="button button-primary" href="/blog">
            Back to all insights <ArrowUpRight size={17} />
          </a>
        </article>
      </InnerPage>
    );
  }
  return (
    <InnerPage
      title={post.title}
      kicker={`${post.category} · ${post.time}`}
      intro={post.description}
      seo={{
        title: post.title,
        description: post.description,
        type: "Article",
        canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
        image: post.image,
        imageAlt: `${post.title} cover image`,
        keywords: post.keywords,
        structuredData: post.schema,
      }}
    >
      <article className="article-page">
        <PostThumbnail post={post} iconSize={42} />
        <p className="article-meta">{post.date} · By SK Khorrum</p>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(post.content) }}
        />
        <a className="button button-primary" href="/contact">
          Talk about your SEO <ArrowUpRight size={17} />
        </a>
      </article>
    </InnerPage>
  );
}

function SeoProcessPage() {
  return (
    <InnerPage
      title="The complete SEO process, step by step."
      kicker="SEO methodology"
      intro="A transparent, evidence-led SEO process that moves from business understanding to technical foundations, content, measurement, and continuous improvement. Every project is adapted to the business; no rankings are guaranteed."
    >
      <section className="section-pad inner-section">
        <div className="roadmap-list full-roadmap">
          {seoRoadmap.slice(0, 9).map((stage, index) => (
            <a
              key={stage.letter}
              href={stage.slug ? `/seo-process/${stage.slug}` : "/seo-process"}
            >
              <span className="roadmap-step-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <b>{stage.title}</b>
                <p>{stage.action}</p>
                <small>
                  <strong>Output:</strong> {stage.outcome}
                </small>
                <strong className="process-card-cta">Open step details <ArrowUpRight size={14} /></strong>
              </div>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </section>
      <section className="related-band section-pad">
        <div className="section-kicker">Ready to begin?</div>
        <h2>
          Start with the part that matters <em>most right now.</em>
        </h2>
        <a className="button button-dark" href="/requirements">
          Share your SEO requirements <ArrowUpRight size={17} />
        </a>
      </section>
    </InnerPage>
  );
}

function SeoStagePage({ stage }: { stage: (typeof seoRoadmap)[number] }) {
  const checklist = stage.checklist || [
    stage.action,
    "Review the recommendation against business priorities",
    "Document the implementation owner and validation step",
  ];
  const deliverables = stage.deliverables || [
    stage.outcome,
    "A documented recommendation",
    "A validation note for the next review",
  ];
  const metrics = stage.metrics || [
    "Priority page visibility",
    "Qualified organic engagement",
    "Resolved implementation items",
  ];
  const tools = stage.tools || [
    "Google Search Console",
    "Google Analytics",
    "PageSpeed Insights",
  ];
  const risks = stage.risks || [
    "Skipping the baseline",
    "Optimizing without intent context",
    "Failing to validate changes",
  ];
  const faqItems = [
    {
      question: `Why is ${stage.title} important for SEO?`,
      answer: `${stage.explanation || stage.action} It connects technical quality with a useful search and business outcome.`,
    },
    {
      question: `What do I receive from the ${stage.title} stage?`,
      answer: `${stage.outcome} Recommendations are documented with implementation and validation context.`,
    },
    {
      question: `How is this SEO stage measured?`,
      answer:
        "Measurement depends on the website and goal, but includes relevant visibility, qualified engagement, implementation quality, and evidence from Search Console or analytics.",
    },
  ];
  return (
    <InnerPage
      title={`${stage.letter}: ${stage.title}`}
      kicker="SEO process stage"
      intro={stage.action}
    >
      <section className="section-pad stage-detail">
        <div className="stage-lead">
          <span className="stage-letter">{stage.letter}</span>
          <div>
            <div className="section-kicker">What this stage means</div>
            <h2>{stage.explanation || stage.action}</h2>
            <p>
              This stage turns the SEO roadmap into a practical decision. It
              should connect the technical reality of the website with a useful
              human outcome and a measurable business priority.
            </p>
          </div>
        </div>
        <div className="stage-columns">
          <div>
            <div className="detail-block">
              <div className="section-kicker">Implementation checklist</div>
              <h2>What gets reviewed and done</h2>
              {checklist.map((item) => (
                <p className="check-row" key={item}>
                  <Check size={16} />
                  {item}
                </p>
              ))}
            </div>
            <div className="detail-block">
              <div className="section-kicker">Why it affects search</div>
              <h2>Clarity creates compounding value.</h2>
              <p>
                Search visibility is a system. A decision at this stage can
                affect crawl paths, page relevance, user confidence, content
                quality, and the next opportunity a visitor discovers. That is
                why recommendations are made in context instead of copied from a
                generic checklist.
              </p>
              <p>
                Before implementation, record the current state and identify
                dependencies. After implementation, test representative pages,
                annotate the release, and compare against the original baseline.
                The aim is durable improvement, not a short-lived signal.
              </p>
            </div>
          </div>
          <aside className="stage-aside">
            <b>Expected deliverables</b>
            {deliverables.map((item) => (
              <p key={item}>
                <Check size={16} />
                {item}
              </p>
            ))}
            <b className="aside-heading">Useful tools</b>
            {tools.map((item) => (
              <span className="tool-chip" key={item}>
                {item}
              </span>
            ))}
            <a className="button button-primary" href="/requirements">
              Apply this to my site <ArrowUpRight size={17} />
            </a>
          </aside>
        </div>
        <div className="stage-bottom-grid">
          <div>
            <b>How to measure</b>
            {metrics.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <b>Watch for these risks</b>
            {risks.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="related-band section-pad">
        <div className="section-kicker">Next in the system</div>
        <h2>
          SEO gets stronger when the stages <em>work together.</em>
        </h2>
        <div className="related-stage-links">
          {seoRoadmap
            .slice(0, 9)
            .filter((item) => item.letter !== stage.letter)
            .slice(0, 3)
            .map((item) => (
              <a href={`/seo-process/${item.slug}`} key={item.letter}>
                <span>{item.letter}</span>
                {item.title}
                <ArrowUpRight size={16} />
              </a>
            ))}
        </div>
      </section>
    </InnerPage>
  );
}

function SeoGuidePage() {
  return (
    <InnerPage
      title="The complete SEO guide for sustainable search visibility."
      kicker="SEO knowledge hub"
      intro="A detailed, practical guide to SEO strategy, technical optimization, keywords, content, local search, measurement, structured data, and continuous improvement from SK Khorrum, SEO Expert & Digital Marketer."
    >
      <article className="seo-guide article-page">
        <div className="guide-intro-card">
          <span className="comparison-label">PILLAR GUIDE</span>
          <strong>
            {seoGuideWordCount.toLocaleString()}+ words of practical SEO
            knowledge
          </strong>
          <p>
            Updated August 2026 · Written by SK Khorrum · SEO Expert & Digital
            Marketer
          </p>
        </div>
        <div className="guide-toc">
          <b>In this guide</b>
          {seoGuideSections.slice(0, 8).map((section, index) => (
            <a href={`#guide-${index + 1}`} key={section.title}>
              {String(index + 1).padStart(2, "0")} {section.title}
            </a>
          ))}
          <a href="#golden-keywords">Golden keyword clusters</a>
          <a href="#seo-process">Complete SEO roadmap</a>
        </div>
        {seoGuideSections.map((section, index) => (
          <section
            className="guide-section"
            id={`guide-${index + 1}`}
            key={section.title}
          >
            <div className="section-kicker">
              Section {String(index + 1).padStart(2, "0")}
            </div>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <section className="guide-section" id="golden-keywords">
          <div className="section-kicker">Keyword strategy</div>
          <h2>Golden keyword clusters for an SEO Expert brand</h2>
          <p>
            There is no magic keyword that guarantees a ranking. The strongest
            keyword plan combines brand authority, commercial service intent,
            educational questions, and supporting expertise. These clusters show
            how SK Khorrum can build topical relevance without keyword stuffing.
          </p>
          <div className="keyword-clusters">
            {goldenKeywordClusters.map((cluster) => (
              <div key={cluster.label}>
                <b>{cluster.label}</b>
                {cluster.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className="guide-section" id="seo-process">
          <div className="section-kicker">Execution reference</div>
          <h2>SEO process from A to Z</h2>
          <p>
            Use this roadmap as a diagnostic framework. A project may start at
            one stage and return to another as new evidence appears. The
            important habit is to connect each recommendation to a user need, a
            business priority, and a measurable next step.
          </p>
          <div className="guide-stage-grid">
            {seoGuideDeepNotes.map((stage) => (
              <div key={stage.title}>
                <b>{stage.title}</b>
                <p>{stage.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="guide-cta">
          <h2>Need this process applied to your website?</h2>
          <p>
            Share your goals, website, market, and current SEO situation. The
            first step is understanding the opportunity.
          </p>
          <a className="button button-primary" href="/requirements">
            Request an SEO consultation <ArrowUpRight size={17} />
          </a>
        </section>
      </article>
    </InnerPage>
  );
}

function StrategyPage({
  strategy,
}: {
  strategy: (typeof seoStrategies)[number];
}) {
  return (
    <InnerPage
      title={strategy.title}
      kicker="SEO strategy"
      intro={strategy.summary}
    >
      <section className="section-pad detail-layout strategy-detail">
        <div>
          <div className="detail-block">
            <div className="section-kicker">Why it matters</div>
            <h2>{strategy.summary}</h2>
            <p>{strategy.detail}</p>
          </div>
          <div className="detail-block">
            <div className="section-kicker">How the work happens</div>
            <h2>Understand first, then improve with intent.</h2>
            <p>
              We begin with the current state, connect the work to business
              priorities, and turn the findings into a sequence of improvements.
              Each recommendation has a reason, an owner, and a way to learn
              from it.
            </p>
          </div>
        </div>
        <aside className="detail-aside">
          <b>What this includes</b>
          {strategy.includes.map((item) => (
            <p key={item}>
              <Check size={16} />
              {item}
            </p>
          ))}
          <a className="button button-primary" href="/contact">
            Discuss this strategy <ArrowUpRight size={17} />
          </a>
        </aside>
      </section>
      <section className="related-band section-pad">
        <div className="section-kicker">A useful next step</div>
        <h2>
          Make your SEO foundation <em>more intentional.</em>
        </h2>
        <a className="button button-dark" href="/requirements">
          Share your requirements <ArrowUpRight size={17} />
        </a>
      </section>
    </InnerPage>
  );
}

function AboutPage() {
  return (
    <InnerPage
      title="SEO first. Digital thinking always."
      kicker="About SK Khorrum"
      intro="I help businesses improve search visibility through thoughtful SEO strategy, clear content, and websites that make sense to both people and search engines."
    >
      <section className="section-pad about-detail">
        <img
          src="https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp"
          width="560"
          height="680"
          alt="SK Khorrum, SEO Expert and Digital Marketer"
        />
        <div>
          <div className="section-kicker">How I think</div>
          <h2>Search is where trust starts.</h2>
          <p>
            My work sits at the intersection of SEO, digital marketing, and web
            design. The focus is simple: help the right people discover a
            business, understand its value, and take a confident next step.
          </p>
          <p>
            Web design is a supporting skill here. A fast, accessible,
            responsive website gives SEO somewhere strong to land.
          </p>
          <a className="button button-primary" href="/contact">
            Let's work together <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </InnerPage>
  );
}

const legacyPortfolioProjects: SiteContent[] = [
  {
    title: "SK Khorrum CEO",
    slug: "sk-khorrum-ceo",
    description: "A personal brand website designed to make SEO expertise clear and discoverable.",
    category: "SEO / Digital Marketing",
    externalUrl: "https://sk-khorrum-ceo.vercel.app/",
    content: "",
    html: "",
    image: "",
    keywords: "",
    schema: "",
    date: "Aug 2026",
    time: "Project",
    color: "mint",
  },
  { title: "SK Khorrum Info", slug: "sk-khorrum-info", description: "A clear personal brand experience built around discoverability and trust.", category: "SEO / Digital Marketing", externalUrl: "https://sk-khorruminfo.vercel.app/", content: "", html: "", image: "", keywords: "", schema: "", date: "Aug 2026", time: "Project", color: "sun" },
  { title: "Life Line", slug: "life-line", description: "A responsive digital experience with a strong foundation for useful content.", category: "SEO / Digital Marketing", externalUrl: "https://sk-khorrum-life-line.vercel.app/", content: "", html: "", image: "", keywords: "", schema: "", date: "Aug 2026", time: "Project", color: "sky" },
  { title: "DRT", slug: "drt", description: "A responsive web experience shaped for clarity, performance, and action.", category: "Web Design", externalUrl: "https://drt.vercel.app/", content: "", html: "", image: "", keywords: "", schema: "", date: "Aug 2026", time: "Project", color: "mint" },
  { title: "Wood Communication", slug: "wood-communication", description: "A focused web experience connecting clear messaging with responsive design.", category: "Web Design", externalUrl: "https://woodcommunication.vercel.app/", content: "", html: "", image: "", keywords: "", schema: "", date: "Aug 2026", time: "Project", color: "sun" },
  { title: "Cinevista BD", slug: "cinevista-bd", description: "A responsive website concept designed to make the next step easy to find.", category: "Web Design", externalUrl: "https://cinevista-bd.vercel.app/", content: "", html: "", image: "", keywords: "", schema: "", date: "Aug 2026", time: "Project", color: "sky" },
];

const portfolioProjects = [
  ...projects,
  ...legacyPortfolioProjects.filter((legacy) => !projects.some((project) => project.slug === legacy.slug)),
];

function collectionRoute(type: "Portfolio" | "Case Studies", slug: string) {
  return type === "Portfolio" ? `/projects/${slug}` : `/case-studies/${slug}`;
}

function ContentDetailPage({ item, kind, backHref }: { item: SiteContent; kind: "Page" | "Project" | "Case Study"; backHref: string }) {
  const detailEntries = Object.entries(item).filter(([key, value]) => !["title", "slug", "description", "content", "html", "image", "keywords", "schema", "color", "type", "source", "url", "externalUrl", "publishDate", "readingTime"].includes(key) && value !== undefined && value !== "").slice(0, 8);
  return (
    <InnerPage
      title={item.title}
      kicker={kind}
      intro={item.description}
      seo={{ title: item.title, description: item.description, type: kind === "Page" ? "WebPage" : "Article", canonicalUrl: `${SITE_URL}${kind === "Project" ? `/projects/${item.slug}` : kind === "Case Study" ? `/case-studies/${item.slug}` : `/${item.slug}`}`, image: item.image, imageAlt: `${item.title} cover image`, keywords: item.keywords, structuredData: item.schema }}
    >
      <article className="article-page">
        <PostThumbnail post={item} iconSize={42} />
        <p className="article-meta">{item.date} · By SK Khorrum</p>
        {(item.content || item.html) ? (
          <div className="post-content" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(item.content || item.html || "") }} />
        ) : (
          <div className="post-content">
            <p>{item.description}</p>
            {detailEntries.length ? <dl className="content-facts">{detailEntries.map(([key, value]) => <div key={key}><dt>{key.replace(/([A-Z])/g, " $1")}</dt><dd>{Array.isArray(value) ? value.join(", ") : String(value)}</dd></div>)}</dl> : <p>Detailed information for this {kind.toLowerCase()} will be added soon.</p>}
          </div>
        )}
        <div className="article-actions">
          <a className="button button-primary" href={backHref}>Back to {kind === "Project" ? "portfolio" : kind === "Case Study" ? "case studies" : "pages"} <ArrowUpRight size={17} /></a>
          {item.externalUrl ? <a className="text-link" href={String(item.externalUrl)} target="_blank" rel="noreferrer">Visit live project <MoveRight size={16} /></a> : null}
        </div>
      </article>
    </InnerPage>
  );
}

function CollectionPage({ type }: { type: "Portfolio" | "Case Studies" }) {
  const records = type === "Portfolio" ? portfolioProjects : caseStudies;
  return (
    <InnerPage
      title={type === "Portfolio" ? "Selected work, built to be seen." : "SEO case studies, documented honestly."}
      kicker={type}
      intro={type === "Portfolio" ? "A selection of digital experiences where SEO thinking, clear messaging, and responsive design come together." : "Real outcomes belong to real evidence. This collection keeps the process transparent and avoids invented ranking or traffic claims."}
    >
      <section className="section-pad inner-section">
        {records.length ? (
          <div className="post-grid full-post-grid content-collection-grid">
            {records.map((item) => (
              <article className="post-card" key={`${type}-${item.slug}`}>
                <PostThumbnail post={item} />
                <small>{item.category} <i /> {item.time}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a className="text-link" href={collectionRoute(type, item.slug)}>{type === "Portfolio" ? "View project" : "Read case study"} <MoveRight size={16} /></a>
              </article>
            ))}
          </div>
        ) : (
          <div className="case-list"><div className="case-placeholder"><ShieldCheck size={25} /><div><b>No {type.toLowerCase()} have been added yet.</b><p>Add a matching HTML or JSON file to the repository and the next build will publish it here.</p></div></div></div>
        )}
      </section>
    </InnerPage>
  );
}

function DynamicContentResolver({ path }: { path: string }) {
  const [item, setItem] = useState<SiteContent | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const responses = await Promise.all(["pages", "projects", "case-studies"].map((name) => fetch(`/generated/${name}.json`, { cache: "no-store" }).then((response) => response.ok ? response.json() : [])));
        const [pageRecords, projectRecords, caseRecords] = responses;
        const projectMatch = path.match(/^\/projects\/([^/]+?)(?:\.html)?\/?$/);
        const caseMatch = path.match(/^\/case-studies\/([^/]+?)(?:\.html)?\/?$/);
        const pageMatch = path.match(/^\/(?:pages\/)?([^/]+?)(?:\.html)?\/?$/);
        if (projectMatch) {
          const found = normalizeContent(projectRecords, "Project").find((entry) => entry.slug === projectMatch[1]);
          if (found) setItem(found);
        } else if (caseMatch) {
          const found = normalizeContent(caseRecords, "Case Study").find((entry) => entry.slug === caseMatch[1]);
          if (found) setItem(found);
        } else if (pageMatch) {
          const found = normalizeContent(pageRecords, "Page").find((entry) => entry.slug === pageMatch[1]);
          if (found) setItem(found);
        }
      } finally {
        setLoaded(true);
      }
    };
    void load();
  }, [path]);
  if (item) {
    const kind = path.startsWith("/projects/") ? "Project" : path.startsWith("/case-studies/") ? "Case Study" : "Page";
    return <ContentDetailPage item={item} kind={kind} backHref={kind === "Project" ? "/portfolio" : kind === "Case Study" ? "/case-studies" : "/"} />;
  }
  if (!loaded) return <InnerPage title="Loading content" kicker="SK Khorrum" intro="Opening this page…"><section className="section-pad inner-section"><p>Loading content…</p></section></InnerPage>;
  return <InnerPage title="Page not found" kicker="SK Khorrum" intro="This page could not be found or may have moved."><section className="section-pad inner-section"><h2>This link is not available.</h2><a className="button button-primary" href="/">Back to home <ArrowUpRight size={17} /></a></section></InnerPage>;
}

function App() {
  const path = window.location.pathname;
  if (path === "/requirements") return <RequirementsPage />;
  if (path.startsWith("/admin")) return <AdminPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/seo-process") return <SeoProcessPage />;
  const roadmapStage = seoRoadmap.find(
    (item) => path === `/seo-process/${item.slug}`,
  );
  if (roadmapStage && roadmapStage.letter <= "I")
    return <SeoStagePage stage={roadmapStage} />;
  if (path === "/seo-guide") return <SeoGuidePage />;
  const strategy = seoStrategies.find(
    (item) => path === `/strategies/${item.slug}`,
  );
  if (strategy) return <StrategyPage strategy={strategy} />;
  if (path === "/portfolio") return <CollectionPage type="Portfolio" />;
  if (path === "/case-studies") return <CollectionPage type="Case Studies" />;
  if (path === "/blog") return <BlogPage />;
  if (path.startsWith("/blog/")) return <BlogPostPage slug={path.split("/")[2]} />;
  const project = path.startsWith("/projects/") ? projects.find((item) => item.slug === path.split("/")[2]) : undefined;
  if (project) return <ContentDetailPage item={project} kind="Project" backHref="/portfolio" />;
  const caseStudy = path.startsWith("/case-studies/") ? caseStudies.find((item) => item.slug === path.split("/")[2]) : undefined;
  if (caseStudy) return <ContentDetailPage item={caseStudy} kind="Case Study" backHref="/case-studies" />;
  const page = pages.find((item) => path === `/${item.slug}` || path === `/pages/${item.slug}` || path === `/pages/${item.slug}.html`);
  if (page) return <ContentDetailPage item={page} kind="Page" backHref="/" />;
  if (path === "/contact")
    return (
      <InnerPage
        title="Let's talk about your SEO."
        kicker="Start a conversation"
        intro="Tell me where you are, where you want to go, and what is getting in the way."
      >
        <section className="contact section-pad standalone-contact">
          <div className="contact-copy">
            <h2>
              Make your next move <em>more visible.</em>
            </h2>
            <p>For a detailed brief, use the requirements form.</p>
            <a className="button button-primary" href="/requirements">
              Share project requirements <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="success-message">
            <Check size={28} />
            <h3>Thoughtful strategy starts with a conversation.</h3>
            <p>
              SEO audit, technical SEO, content strategy, or an SEO-friendly
              website foundation.
            </p>
          </div>
        </section>
      </InnerPage>
    );
  const service = detailServices.find(
    (item) => path === `/services/${item[0]}`,
  );
  if (service) return <ServicePage service={service} />;
  if (path !== "/") return <DynamicContentResolver path={path} />;
  return <HomePage />;
}

export default App;

