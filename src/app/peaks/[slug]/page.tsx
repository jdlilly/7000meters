import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

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
};

export default async function PeakPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const peak = await client.fetch<Peak | null>(
    `*[_type == "peak" && slug.current == $slug][0]{
      name, elevationM, prominenceM, class, countries, range, subrange,
      firstAscentYear, climbed, overview
    }`,
    { slug }
  );

  if (!peak) notFound();

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>{peak.name}</h1>
      <p>{peak.elevationM} m · {peak.class}</p>
      {peak.range ? <p>{peak.range}{peak.subrange ? ` / ${peak.subrange}` : ""}</p> : null}
      {peak.countries?.length ? <p>{peak.countries.join(", ")}</p> : null}
      {peak.overview ? <p>{peak.overview}</p> : null}
    </main>
  );
}