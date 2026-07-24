import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "SK Khorrum — Digital Marketer & Web App Maker",
  description:
    "Portfolio of SK Khorrum, a Digital Marketer and Web App Maker specializing in creative design and development.",
  keywords: ["SK Khorrum", "Digital Marketer", "Web App Maker", "Frontend Developer", "Portfolio"],
  authors: [{ name: "SK Khorrum" }],
  creator: "SK Khorrum",
  publisher: "SK Khorrum",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skkhorrum.com",
    title: "SK Khorrum — Digital Marketer & Web App Maker",
    description: "Portfolio of SK Khorrum, a Digital Marketer and Web App Maker specializing in creative design and development.",
    siteName: "SK Khorrum",
    images: [
      {
        url: "https://skkhorrum.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SK Khorrum — Digital Marketer & Web App Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Khorrum — Digital Marketer & Web App Maker",
    description: "Portfolio of SK Khorrum, a Digital Marketer and Web App Maker specializing in creative design and development.",
    images: ["https://skkhorrum.com/og-image.jpg"],
    creator: "@skkhorrum",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://skkhorrum.com",
  },
};

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
