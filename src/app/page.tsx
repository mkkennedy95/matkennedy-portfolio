"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface StatCard {
  label: string;
  value: string | number;
  href?: string;
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [savedCount, setSavedCount] = useState(0);
  const [outfitCount, setOutfitCount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const [savedResult, outfitResult] = await Promise.all([
        supabase
          .from("saved_outfits")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("outfit_logs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

      setSavedCount(savedResult.count ?? 0);
      setOutfitCount(outfitResult.count ?? 0);
      // streak calculation placeholder — update with real logic as needed
      setStreakDays(0);
      setLoading(false);
    }

    fetchStats();
  }, []);

  const stats: StatCard[] = [
    { label: "Outfits Generated", value: loading ? "—" : outfitCount },
    { label: "Streak (days)", value: loading ? "—" : streakDays },
  ];

  return (
    <main className="min-h-screen bg-[#1b2a4a] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Outfit Advisor
          </h1>
          <p className="mt-1 text-sm text-white/60">
            AI-powered outfit recommendations for every forecast.
          </p>
        </header>

        {/* CTA */}
        <Link
          href="/outfit"
          className="mb-10 flex items-center justify-between rounded-xl bg-white/10 px-6 py-5 shadow-sm transition hover:bg-white/15"
        >
          <div>
            <p className="font-medium text-white">Get today's recommendation</p>
            <p className="mt-0.5 text-sm text-white/60">
              Based on your local weather
            </p>
          </div>
          <span className="text-white/40 text-xl">→</span>
        </Link>

        {/* Stats grid */}
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
          Your stats
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white px-6 py-5 shadow-sm"
            >
              <p className="text-2xl font-semibold text-[#1b2a4a]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[#1b2a4a]/60">{stat.label}</p>
            </div>
          ))}

          {/* Saved Outfits card — clickable */}
          <Link
            href="/saved-outfits"
            className="rounded-xl bg-white px-6 py-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-2xl font-semibold text-[#1b2a4a]">
              {loading ? "—" : savedCount}
            </p>
            <p className="mt-1 text-sm text-[#1b2a4a]/60">Saved Outfits</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
