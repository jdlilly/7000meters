import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Peak = {
  name: string;
  elevationM: number;
  prominenceM?: number;
  class: string;
  countries?: string[];
  range?: string;
  subrange?: string;
  firstAscentYear?: number;
  climbed?: boolean;
  overview?: string;
  namesOther?: string[];
  heroImage?: {
    alt?: string;
    credit?: string;
    asset?: { _ref?: string };
  };
};

export default async function PeakPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = await client.fetch<Peak | null>(
    `*[_type == "peak" && slug.current == $slug][0]{
      name, namesOther, elevationM, prominenceM, class, countries,
      range, subrange, firstAscentYear, climbed, overview, heroImage
    }`,
    { slug }
  );

  if (!peak) notFound();

  const photoUrl = peak.heroImage
    ? urlFor(peak.heroImage).width(1600).height(900).fit("crop").url()
    : null;

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <p>
        <Link href="/peaks">← All peaks</Link>
      </p>

      <h1>{peak.name}</h1>
      {peak.namesOther?.length ? (
        <p style={{ color: "#555" }}>{peak.namesOther.join(" · ")}</p>
      ) : null}

      {photoUrl ? (
        <figure style={{ margin: "24px 0" }}>
          <img
            src={photoUrl}
            alt={peak.heroImage?.alt || peak.name}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {peak.heroImage?.credit ? (
            <figcaption style={{ color: "#555", fontSize: 14, marginTop: 8 }}>
              Photo: {peak.heroImage.credit}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          rowGap: 8,
          columnGap: 16,
        }}
      >
        <dt>Elevation</dt>
        <dd>{peak.elevationM} m</dd>

        <dt>Prominence</dt>
        <dd>{peak.prominenceM ? `${peak.prominenceM} m` : "—"}</dd>

        <dt>Class</dt>
        <dd>{peak.class}</dd>

        <dt>Range</dt>
        <dd>
          {peak.range || "—"}
          {peak.subrange ? ` / ${peak.subrange}` : ""}
        </dd>

        <dt>Countries</dt>
        <dd>{peak.countries?.length ? peak.countries.join(", ") : "—"}</dd>

        <dt>First ascent</dt>
        <dd>{peak.firstAscentYear ?? "—"}</dd>

        <dt>Climbed</dt>
        <dd>{peak.climbed === false ? "No / unclimbed" : "Yes"}</dd>
      </dl>

      {peak.overview ? (
        <>
          <h2>Overview</h2>
          <p style={{ lineHeight: 1.6 }}>{peak.overview}</p>
        </>
      ) : null}
    </main>
  );
}