import Link from "next/link";
import { Header } from "@/components/Header";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type PeakListItem = {
  _id: string;
  name: string;
  slug: string;
  elevationM: number;
  class: string;
  countries?: string[];
  range?: string;
};

export default async function UnclimbedPage() {
  const peaks = await client.fetch<PeakListItem[]>(
    `*[_type == "peak" && defined(slug.current) && climbed == false] | order(elevationM desc) {
      _id,
      name,
      "slug": slug.current,
      elevationM,
      class,
      countries,
      range
    }`
  );

  const independentCount = peaks.filter((p) => p.class !== "subsidiary").length;

  let independentRank = 0;
  const rows = peaks.map((peak) => {
    const subsidiary = peak.class === "subsidiary";
    if (!subsidiary) independentRank += 1;
    return {
      peak,
      subsidiary,
      label: subsidiary ? "S" : String(independentRank),
    };
  });

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          No accepted summit
        </p>

        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Unclimbed
        </h1>

        <p className="mt-4 max-w-prose text-stone-600">
          Peaks in this catalog with no accepted ascent. Status is a working
          figure and can change. Bhutan peaks are closed to climbing.
          {independentCount
            ? ` ${independentCount} independent`
            : ""}
          {peaks.length !== independentCount
            ? ` · ${peaks.length - independentCount} named ${
                peaks.length - independentCount === 1
                  ? "subsidiary"
                  : "subsidiaries"
              }`
            : ""}
          .
        </p>

        {peaks.length === 0 ? (
          <p className="mt-10 text-stone-600">None marked unclimbed.</p>
        ) : (
          <ol className="mt-10">
            {rows.map(({ peak, subsidiary, label }) => (
              <li
                key={peak._id}
                className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 border-t border-stone-300 py-3"
              >
                <span className="text-sm tabular-nums text-stone-400">
                  {label}
                </span>
                <div>
                  <Link
                    href={`/peaks/${peak.slug}`}
                    className="text-stone-900 hover:text-slate-700"
                  >
                    {peak.name}
                  </Link>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {[
                      peak.range,
                      peak.countries?.join(" · "),
                      subsidiary ? "subsidiary" : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <span className="tabular-nums text-stone-800">
                  {peak.elevationM} m
                </span>
              </li>
            ))}
          </ol>
        )}
      </article>
    </main>
  );
}