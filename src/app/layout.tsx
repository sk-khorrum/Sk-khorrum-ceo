import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://khorrum.pro.bd/#person",
      "name": "SK Khorrum",
      "alternateName": [
        "MD Khorrum",
        "Khorrum"
      ],
      <meta name="google-site-verification" content="m62MkCsKsFl6JReFjUAy0_PnTq38rs7ao2lSvNSszr0" />
      "url": "https://khorrum.pro.bd",
      "image": {
        "@type": "ImageObject",
        "@id": "https://khorrum.pro.bd/#personImage",
        "url": "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
        "caption": "SK Khorrum - Digital Marketing Expert & Full Stack Web Developer"
      },
      "jobTitle": "Digital Marketing Expert | SEO Specialist | Full Stack Web Developer",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Full Stack Web Developer & Digital Marketer",
        "occupationLocation": {
          "@type": "Country",
          "name": "Bangladesh"
        },
        "skills": [
          "SEO",
          "Technical SEO",
          "International SEO",
          "Local SEO",
          "Digital Marketing",
          "Full Stack Web Development",
          "UI/UX Design",
          "Performance Optimization"
        ]
      },
      "worksFor": {
        "@id": "https://khorrum.pro.bd/#organization"
      },
      "sameAs": [
        "https://instagram.com/sk_khorrum",
        "https://threads.net/@sk_khorrum",
        "https://linkedin.com/in/sk-khorrum",
        "https://github.com/sk-khorrum",
        "https://youtube.com/@skkhorrum",
        "https://tiktok.com/@sk_khorrum",
        "https://pinterest.com/sk_khorrum",
        "https://sk-khorrum.tumblr.com"
      ],
      "knowsAbout": [
        "SEO",
        "Technical SEO",
        "International SEO",
        "Local SEO",
        "Enterprise SEO",
        "Digital Marketing",
        "Google Search Console",
        "Google Analytics",
        "Google Tag Manager",
        "Google Ads",
        "Meta Ads",
        "Content Marketing",
        "Keyword Research",
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "REST API",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Firebase",
        "Supabase",
        "Git",
        "GitHub",
        "Docker",
        "Cloudflare",
        "Vercel",
        "Responsive Design",
        "UI Design",
        "UX Design",
        "Performance Optimization",
        "Core Web Vitals",
        "Website Security",
        "Automation",
        "AI Tools",
        "API Integration"
      ],
      "knowsLanguage": [
        {
          "@type": "Language",
          "name": "English",
          "alternateName": "en"
        },
        {
          "@type": "Language",
          "name": "Bengali",
          "alternateName": "bn"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://khorrum.pro.bd/#organization",
      "name": "SK Khorrum",
      "url": "https://khorrum.pro.bd",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://khorrum.pro.bd/#logo",
        "url": "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
        "caption": "SK Khorrum Logo"
      },
      "founder": {
        "@id": "https://khorrum.pro.bd/#person"
      },
      "sameAs": [
        "https://instagram.com/sk_khorrum",
        "https://threads.net/@sk_khorrum",
        "https://linkedin.com/in/sk-khorrum",
        "https://github.com/sk-khorrum",
        "https://youtube.com/@skkhorrum",
        "https://tiktok.com/@sk_khorrum",
        "https://pinterest.com/sk_khorrum",
        "https://sk-khorrum.tumblr.com"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://khorrum.pro.bd/#serviceOrganization",
      "name": "SK Khorrum Portfolio & Digital Services",
      "url": "https://khorrum.pro.bd",
      "image": "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
      "priceRange": "$$",
      "areaServed": [
        {
          "@type": "Place",
          "name": "Worldwide"
        },
        {
          "@type": "Country",
          "name": "United States"
        },
        {
          "@type": "Country",
          "name": "United Kingdom"
        },
        {
          "@type": "Country",
          "name": "Canada"
        },
        {
          "@type": "Country",
          "name": "Australia"
        },
        {
          "@type": "Country",
          "name": "Germany"
        },
        {
          "@type": "Country",
          "name": "France"
        },
        {
          "@type": "Country",
          "name": "Netherlands"
        },
        {
          "@type": "Country",
          "name": "Italy"
        },
        {
          "@type": "Country",
          "name": "Spain"
        },
        {
          "@type": "Country",
          "name": "Sweden"
        },
        {
          "@type": "Country",
          "name": "Norway"
        },
        {
          "@type": "Country",
          "name": "Denmark"
        },
        {
          "@type": "Country",
          "name": "Switzerland"
        },
        {
          "@type": "Country",
          "name": "United Arab Emirates"
        },
        {
          "@type": "Country",
          "name": "Saudi Arabia"
        },
        {
          "@type": "Country",
          "name": "Singapore"
        },
        {
          "@type": "Country",
          "name": "Malaysia"
        },
        {
          "@type": "Country",
          "name": "Bangladesh"
        }
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": "Startups, Businesses, Brands, and Corporations"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "@id": "https://khorrum.pro.bd/#offerCatalog",
        "name": "Digital Services Catalog",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://khorrum.pro.bd/#seoService",
              "name": "Search Engine Optimization (SEO)",
              "serviceType": "Search Engine Optimization",
              "description": "Technical SEO, On-Page SEO, Off-Page SEO, Local SEO, International SEO, Enterprise SEO, Website Audits, and Keyword Research."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://khorrum.pro.bd/#digitalMarketingService",
              "name": "Digital Marketing",
              "serviceType": "Digital Marketing",
              "description": "Social Media Marketing, Content Marketing, Google Ads, Meta Ads, Performance Marketing, and Conversion Rate Optimization."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://khorrum.pro.bd/#webDevService",
              "name": "Website Development",
              "serviceType": "Web Development",
              "description": "Business, Corporate, Portfolio, Landing Pages, Next.js, React, TypeScript, JavaScript, Node.js, REST API, Full Stack, and Web Applications."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://khorrum.pro.bd/#uiUxService",
              "name": "UI/UX Design & Optimization",
              "serviceType": "UI/UX Design",
              "description": "Responsive Web Design, Website Speed Optimization, Core Web Vitals Optimization, and Performance Tuning."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://khorrum.pro.bd/#website",
      "url": "https://khorrum.pro.bd",
      "name": "SK Khorrum Portfolio",
      "description": "Official portfolio of SK Khorrum, a Digital Marketing Expert, SEO Specialist, and Full Stack Web Developer from Bangladesh.",
      "publisher": {
        "@id": "https://khorrum.pro.bd/#person"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://khorrum.pro.bd/blog?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://khorrum.pro.bd/#webpage",
      "url": "https://khorrum.pro.bd",
      "name": "SK Khorrum | Digital Marketing Expert, SEO Specialist & Full Stack Web Developer",
      "description": "Official portfolio of SK Khorrum, a Digital Marketing Expert, SEO Specialist, and Full Stack Web Developer from Bangladesh.",
      "isPartOf": {
        "@id": "https://khorrum.pro.bd/#website"
      },
      "about": {
        "@id": "https://khorrum.pro.bd/#person"
      },
      "mainEntity": {
        "@id": "https://khorrum.pro.bd/#person"
      },
      "breadcrumb": {
        "@id": "https://khorrum.pro.bd/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://khorrum.pro.bd/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://khorrum.pro.bd"
        }
      ]
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://khorrum.pro.bd/#navigation",
      "name": "Main Navigation",
      "hasPart": [
        {
          "@type": "WebPage",
          "name": "Home",
          "url": "https://khorrum.pro.bd"
        },
        {
          "@type": "CollectionPage",
          "name": "Blog",
          "url": "https://khorrum.pro.bd/blog"
        },
        {
          "@type": "WebPage",
          "name": "Admin Portal",
          "url": "https://khorrum.pro.bd/admin.khorrum"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://khorrum.pro.bd/#faqPage",
      "isPartOf": {
        "@id": "https://khorrum.pro.bd/#webpage"
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does SK Khorrum offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SK Khorrum offers end-to-end digital solutions including Search Engine Optimization (SEO), Full Stack Web Development (Next.js, React, Node.js), Digital Marketing, Google & Meta Ads management, UI/UX Design, and Core Web Vitals Speed Optimization."
          }
        },
        {
          "@type": "Question",
          "name": "Does SK Khorrum work with international clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, SK Khorrum provides digital marketing, web development, and SEO services to clients worldwide, including the USA, UK, Canada, UAE, Germany, Australia, and Bangladesh."
          }
        },
        {
          "@type": "Question",
          "name": "What web development technologies does SK Khorrum specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SK Khorrum specializes in Next.js, React, TypeScript, Node.js, Express, Tailwind CSS, GraphQL, REST APIs, PostgreSQL, MongoDB, Prisma, Cloudflare, and Vercel deployment."
          }
        },
        {
          "@type": "Question",
          "name": "How can SEO help my business grow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Through Technical SEO, Keyword Strategy, and Performance Optimization, SK Khorrum helps your website rank higher on Google search results, driving organic traffic and increasing direct conversions."
          }
        }
      ]
    }
  ]
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SK Khorrum",
    url: "https://skkhorrum.com",
    description: "Portfolio of SK Khorrum, a Digital Marketer and Web App Maker specializing in creative design and development.",
    publisher: {
      "@type": "Organization",
      name: "SK Khorrum",
    },
  };

  return (
    <html lang="en" className="dark no-scrollbar">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050507] text-[#f3f4f6] antialiased selection:bg-sky-500 selection:text-black min-h-screen">
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
