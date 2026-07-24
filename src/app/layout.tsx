import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
export const metadata: Metadata = {
  metadataBase: new URL("https://khorrum.pro.bd"),

  title: {
    default: "SK Khorrum | Digital Marketing & Full Stack Web Developer",
    template: "%s | SK Khorrum",
  },

  description:
    "Official portfolio of SK Khorrum. Digital Marketing Expert, SEO Specialist, Full Stack Web Developer, UI/UX Designer and Creative Technology Consultant.",

  keywords: [
    "SK Khorrum",
    "Khorrum",
    "Digital Marketing",
    "SEO Expert",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web Developer Bangladesh",
    "Portfolio",
    "UI UX Designer",
    "App Developer",
    "Freelancer Bangladesh"
  ],

  authors: [{ name: "SK Khorrum" }],
  creator: "SK Khorrum",
  publisher: "SK Khorrum",
  applicationName: "SK Khorrum Portfolio",
  category: "Technology",

  alternates: {
    canonical: "https://khorrum.pro.bd",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khorrum.pro.bd",
    siteName: "SK Khorrum",

    title: "SK Khorrum | Digital Marketing & Full Stack Web Developer",

    description:
      "Official portfolio of SK Khorrum showcasing Digital Marketing, SEO, Web Development, Mobile Apps and Creative Projects.",

    images: [
      {
        url: "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
        width: 1200,
        height: 630,
        alt: "SK Khorrum",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SK Khorrum Portfolio",

    description:
      "Digital Marketing, SEO & Full Stack Web Development Portfolio.",

    creator: "@sk_khorrum",

    images: [
      "https://assets-one-beta.vercel.app/portfolio/sk-khorrum.webp",
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
