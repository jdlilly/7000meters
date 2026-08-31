import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type PeakListItem = {
  _id: string;
  name: string;
  slug: string;
  elevationM: number;
  class: string;
  range?: string;
  subrange?: string;
};

function groupByRange(peaks: PeakListItem[]) {
  const groups = new Map<string, PeakListItem[]>();
  for (const peak of peaks) {
    const name = peak.range?.trim() || "Unspecified";
    const list = groups.get(name) ?? [];
    list.push(peak);
    groups.set(name, list);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default async function RangesPage() {
  const peaks = await client.fetch<PeakListItem[]>(
    `*[_type == "peak" && defined(slug.current)] | order(elevationM desc) {
      _id, name, "slug": slug.current, elevationM, class, range, subrange
    }`
  );

  const groups = groupByRange(peaks);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-800">
            ← Home
          </Link>
          <span className="mx-2 text-stone-300">·</span>
          <Link href="/peaks" className="hover:text-stone-800">
            By height
          </Link>
        </p>

        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-slate-600">
          Grouped by range
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Ranges
        </h1>
        <p className="mt-4 text-stone-600">
          Uses the main range field. Subrange shows beside the name when present.
        </p>

        {groups.map(([range, list]) => (
          <section key={range} className="mt-12">
            <h2 className="font-serif text-2xl">{range}</h2>
            <p className="mt-1 text-sm text-stone-500">{list.length} peaks</p>
            <ol className="mt-4">
              {list.map((peak) => (
                <li
                  key={`${range}-${peak._id}`}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 border-t border-stone-300 py-3"
                >
                  <div>
                    <Link
                      href={`/peaks/${peak.slug}`}
                      className="text-stone-900 hover:text-slate-700"
                    >
                      {peak.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-stone-500">
                      {[
                        peak.subrange,
                        peak.class === "subsidiary" ? "subsidiary" : null,
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
          </section>
        ))}
      </article>
    </main>
  );
}