"use client";

import React, { useState, useEffect } from "react";
import { Eye, Activity } from "lucide-react";

export default function VisitorCounter() {
  const [totalVisits, setTotalVisits] = useState<number | string>("...");
  const [todayVisits, setTodayVisits] = useState<number | string>("...");

  useEffect(() => {
    const fetchCounters = async () => {
      // YYYY-MM-DD local date format for daily visits
      const localDate = new Date();
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0");
      const day = String(localDate.getDate()).padStart(2, "0");
      const todayStr = `${year}-${month}-${day}`;

      let todayCountVal = 1;
      let totalCountVal = 12135;

      // 1. Fetch Today's real visitor count
      try {
        const todayRes = await fetch(
          `https://api.counterapi.dev/v1/skkhorrum_portfolio/today_${todayStr}/up`
        );
        if (todayRes.ok) {
          const data = await todayRes.json();
          if (data && typeof data.value === "number") {
            todayCountVal = data.value;
          }
        }
      } catch (err) {
        console.warn("CounterAPI today error, fallback to local storage:", err);
        try {
          const localToday = localStorage.getItem(`khorrum_portfolio_today_${todayStr}`);
          let count = 1;
          if (localToday) {
            count = parseInt(localToday, 10) + 1;
          }
          localStorage.setItem(`khorrum_portfolio_today_${todayStr}`, count.toString());
          todayCountVal = count;
        } catch (e) {}
      }

      // 2. Fetch Total visits starting from 12135
      try {
        const totalRes = await fetch(
          "https://api.counterapi.dev/v1/skkhorrum_portfolio/visits/up"
        );
        if (totalRes.ok) {
          const data = await totalRes.json();
          if (data && typeof data.value === "number") {
            totalCountVal = 12135 + data.value;
          }
        }
      } catch (err) {
        console.warn("CounterAPI total error, fallback to local storage:", err);
        try {
          const localTotal = localStorage.getItem("khorrum_portfolio_total_visits");
          let count = 12135 + 1;
          if (localTotal) {
            count = parseInt(localTotal, 10) + 1;
          }
          localStorage.setItem("khorrum_portfolio_total_visits", count.toString());
          totalCountVal = count;
        } catch (e) {}
      }

      setTodayVisits(todayCountVal);
      setTotalVisits(totalCountVal);
    };

    fetchCounters();
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 px-5 py-3 rounded-2xl bg-neutral-900/40 backdrop-blur-md border border-white/10 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
      {/* Today Visitor Counter */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f97316]"></span>
        </span>
        <Activity className="w-3.5 h-3.5 text-[#f97316]" />
        <span>
          <strong className="text-white font-bold">
            {typeof todayVisits === "number" ? todayVisits.toLocaleString() : todayVisits}
          </strong>{" "}
          Today Visitor
        </span>
      </div>

      {/* Separator line */}
      <div className="hidden sm:block w-[1px] h-4 bg-white/10" />

      {/* Total Visits Counter */}
      <div className="flex items-center gap-2">
        <Eye className="w-3.5 h-3.5 text-neutral-400" />
        <span>
          Total Views:{" "}
          <strong className="text-white font-bold">
            {typeof totalVisits === "number" ? totalVisits.toLocaleString() : totalVisits}
          </strong>
        </span>
      </div>
    </div>
  );
}

