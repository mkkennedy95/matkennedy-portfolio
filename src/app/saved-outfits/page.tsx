import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface SavedOutfit {
  id: string;
  outfit_description: string;
  weather_context: string;
  created_at: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function SavedOutfitsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: outfits } = await supabase
    .from("saved_outfits")
    .select("id, outfit_description, weather_context, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const savedOutfits: SavedOutfit[] = outfits ?? [];

  return (
    <main className="min-h-screen bg-[#1b2a4a] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="text-white/40 transition hover:text-white/70 text-sm"
          >
            ← Home
          </Link>
          <h1 className="text-2xl font-semibold text-white">Saved Outfits</h1>
        </div>

        {savedOutfits.length === 0 ? (
          /* Empty state */
          <div className="rounded-xl bg-white/10 px-8 py-16 text-center shadow-sm">
            <p className="text-4xl mb-4">👗</p>
            <p className="text-lg font-medium text-white">No saved outfits yet</p>
            <p className="mt-2 text-sm text-white/60">
              Get a recommendation and save the ones you love.
            </p>
            <Link
              href="/outfit"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-[#1b2a4a] transition hover:bg-white/90"
            >
              Get an outfit recommendation
            </Link>
          </div>
        ) : (
          /* Outfit cards */
          <ul className="flex flex-col gap-4">
            {savedOutfits.map((outfit) => (
              <li
                key={outfit.id}
                className="rounded-xl bg-white px-6 py-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1b2a4a]/40 mb-3">
                  {formatDate(outfit.created_at)}
                </p>
                <p className="text-[#1b2a4a] leading-relaxed">
                  {outfit.outfit_description}
                </p>
                {outfit.weather_context && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-[#1b2a4a]/50">
                    <span>🌤</span>
                    <span>{outfit.weather_context}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
