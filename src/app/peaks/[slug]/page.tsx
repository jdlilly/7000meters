import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Peak = {
  name: string;
  namesOther?: string[];
  elevationM: number;
  prominenceM?: number;
  class: string;
  countries?: string[];
  range?: string;
  subrange?: string;
  lat?: number;
  lon?: number;
  firstAscentYear?: number;
  climbed?: boolean;
  overview?: string;
  heroImage?: {
    alt?: string;
    credit?: string;
    asset?: { _ref?: string };
  };
};

function formatCoord(lat?: number, lon?: number) {
  if (lat === undefined || lon === undefined) return "—";
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${ns} / ${Math.abs(lon).toFixed(4)}° ${ew}`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-stone-300 py-3">
      <dt className="text-xs uppercase tracking-wider text-stone-500">{label}</dt>
      <dd className="mt-1 text-stone-900">{value}</dd>
    </div>
  );
}

export default async function PeakPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = await client.fetch<Peak | null>(
    `*[_type == "peak" && slug.current == $slug][0]{
      name, namesOther, elevationM, prominenceM, class, countries,
      range, subrange, lat, lon, firstAscentYear, climbed, overview, heroImage
    }`,
    { slug }
  );

  if (!peak) notFound();

  const photoUrl = peak.heroImage
    ? urlFor(peak.heroImage).width(1600).height(900).fit("crop").url()
    : null;

  const place = [peak.range, peak.subrange].filter(Boolean).join(" / ");
  const countries = peak.countries?.join(" · ");
  const classLabel =
    peak.class === "subsidiary" ? "Named subsidiary" : "Independent peak";

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm text-stone-500">
          <Link href="/peaks" className="hover:text-stone-800">
            ← All peaks
          </Link>
        </p>

        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-slate-600">
          {[place, countries].filter(Boolean).join(" · ") || "7000-meter peak"}
        </p>

        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          {peak.name}
        </h1>

        {peak.namesOther?.length ? (
          <p className="mt-2 text-stone-500">{peak.namesOther.join(" · ")}</p>
        ) : null}

        <p className="mt-4 text-lg text-stone-700">
          {peak.elevationM} m
          <span className="mx-2 text-stone-300">·</span>
          {classLabel}
          {peak.firstAscentYear ? (
            <>
              <span className="mx-2 text-stone-300">·</span>
              first ascent {peak.firstAscentYear}
            </>
          ) : peak.climbed === false ? (
            <>
              <span className="mx-2 text-stone-300">·</span>
              unclimbed
            </>
          ) : null}
        </p>

        {photoUrl ? (
          <figure className="mt-8">
            <img
              src={photoUrl}
              alt={peak.heroImage?.alt || peak.name}
              className="aspect-video w-full object-cover"
            />
            {peak.heroImage?.credit ? (
              <figcaption className="mt-2 text-sm text-stone-500">
                Photo: {peak.heroImage.credit}
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <div className="mt-8 flex aspect-video items-end bg-slate-800 p-6 text-stone-100">
            <p className="font-serif text-5xl tabular-nums">{peak.elevationM} m</p>
          </div>
        )}

        <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
          <Stat label="Elevation" value={`${peak.elevationM} m`} />
          <Stat
            label="Prominence"
            value={peak.prominenceM ? `${peak.prominenceM} m` : "—"}
          />
          <Stat label="Class" value={classLabel} />
          <Stat label="Range" value={place || "—"} />
          <Stat label="Countries" value={countries || "—"} />
          <Stat label="Coordinates" value={formatCoord(peak.lat, peak.lon)} />
          <Stat
            label="First ascent"
            value={
              peak.firstAscentYear
                ? String(peak.firstAscentYear)
                : peak.climbed === false
                  ? "Unclimbed"
                  : "—"
            }
          />
          <Stat
            label="Climbed"
            value={peak.climbed === false ? "No" : "Yes"}
          />
        </dl>

        {peak.overview ? (
          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.18em] text-slate-600">
              Overview
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
              {peak.overview}
            </p>
          </section>
        ) : null}
      </article>
    </main>
  );
}