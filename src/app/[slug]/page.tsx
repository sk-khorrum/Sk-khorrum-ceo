"use client";

import React, { useState, useEffect } from "react";
import { getCustomPages, CustomPageItem } from "@/utils/storage";
import { notFound } from "next/navigation";

export default function CustomPage({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState<CustomPageItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomPages().then((list) => {
      const match = list.find(
        (p) => p.slug.toLowerCase().trim() === params.slug.toLowerCase().trim()
      );
      if (match) {
        setPage(match);
      }
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] text-neutral-400 flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#c9f731] animate-ping" />
          <span>Fetching page telemetry...</span>
        </div>
      </div>
    );
  }

  if (!page) {
    notFound();
  }

  // Render user HTML content dynamically
  return (
    <div
      dangerouslySetInnerHTML={{ __html: page.htmlContent }}
    />
  );
}
