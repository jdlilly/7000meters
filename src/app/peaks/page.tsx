import Link from "next/link";
import { Header } from "@/components/Header";
import { Elevation } from "@/components/Units";
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

export default async function PeaksPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const alphabetical = sort === "name";

  const peaks = await client.fetch<PeakListItem[]>(
    `*[_type == "peak" && defined(slug.current)] | order(${
      alphabetical ? "name asc" : "elevationM desc"
    }) {
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
      label: subsidiary ? "S" : alphabetical ? "" : String(independentRank),
    };
  });

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          Catalog
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Peaks
        </h1>
        <p className="mt-4 max-w-prose text-stone-600">
          Independent 7000-meter peaks and named subsidiaries.
          {independentCount ? ` ${independentCount} independent` : ""}
          {peaks.length !== independentCount
            ? ` · ${peaks.length - independentCount} named ${
                peaks.length - independentCount === 1
                  ? "subsidiary"
                  : "subsidiaries"
              }`
            : ""}
          .
        </p>

        <p className="mt-6 text-sm text-stone-500">
          <Link
            href="/peaks"
            className={alphabetical ? "hover:text-stone-800" : "text-stone-900"}
          >
            Height
          </Link>
          <span className="px-2 text-stone-300">/</span>
          <Link
            href="/peaks?sort=name"
            className={alphabetical ? "text-stone-900" : "hover:text-stone-800"}
          >
            A–Z
          </Link>
        </p>

        <ol className="mt-8">
          {rows.map(({ peak, label }) => (
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
                  {[peak.range, peak.countries?.join(" · ")]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <span className="tabular-nums text-stone-800">
                <Elevation m={peak.elevationM} />
              </span>
            </li>
          ))}
        </ol>
      </article>
    </main>
  );
}