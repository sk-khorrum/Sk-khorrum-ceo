"use client";

import React, { useState, useEffect } from "react";
import { Users, Eye, Activity } from "lucide-react";

export default function VisitorCounter() {
  const [totalVisits, setTotalVisits] = useState<number | string>("...");
  const [liveVisitors, setLiveVisitors] = useState<number>(5);

  useEffect(() => {
    // 1. Handle Total Visits
    const fetchTotalVisits = async () => {
      try {
        // Fetch and increment the global counter for SK Khorrum Portfolio
        const response = await fetch("https://api.counterapi.dev/v1/skkhorrum_portfolio/visits/up");
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.value === "number") {
            setTotalVisits(data.value);
            return;
          }
        }
      } catch (err) {
        console.warn("CounterAPI error, falling back to local storage:", err);
      }

      // LocalStorage Fallback if API fails or offline
      try {
        const localCount = localStorage.getItem("khorrum_portfolio_total_visits");
        let count = 1248; // Base starter value to make it look premium
        if (localCount) {
          count = parseInt(localCount, 10) + 1;
        }
        localStorage.setItem("khorrum_portfolio_total_visits", count.toString());
        setTotalVisits(count);
      } catch (e) {
        setTotalVisits(1248);
      }
    };

    fetchTotalVisits();

    // 2. Simulate Active Live Visitors (fluctuates between 3 and 12)
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return Math.max(3, Math.min(12, next));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 px-5 py-3 rounded-2xl bg-neutral-900/40 backdrop-blur-md border border-white/10 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
      {/* Live Visitors Counter */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9f731] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9f731]"></span>
        </span>
        <Activity className="w-3.5 h-3.5 text-[#c9f731]" />
        <span>
          <strong className="text-white font-bold">{liveVisitors}</strong> Today Visitor
        </span>
      </div>

      {/* Separator line */}
      <div className="hidden sm:block w-[1px] h-4 bg-white/10" />

      {/* Total Visits Counter */}
      <div className="flex items-center gap-2">
        <Eye className="w-3.5 h-3.5 text-neutral-400" />
        <span>
          Total Views: <strong className="text-white font-bold">{typeof totalVisits === "number" ? totalVisits.toLocaleString() : totalVisits}</strong>
        </span>
      </div>
    </div>
  );
}
