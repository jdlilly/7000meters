import { Header } from "@/components/Header";
import { PeakMap, type MapPeak } from "@/components/PeakMap";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function MapPage() {
  const peaks = await client.fetch<MapPeak[]>(
    `*[_type == "peak" && defined(slug.current) && defined(lat) && defined(lon)] | order(elevationM desc) {
      name,
      "slug": slug.current,
      elevationM,
      class,
      lat,
      lon
    }`
  );

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          All peaks with coordinates
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Map
        </h1>
        <p className="mt-4 text-stone-600">
          {peaks.length} peaks. Click a marker for the name and page.
        </p>
      </article>
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <PeakMap peaks={peaks} />
      </div>
    </main>
  );
}