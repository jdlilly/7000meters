import Link from "next/link";
import { client } from "@/sanity/lib/client";

type PeakListItem = {
  _id: string;
  name: string;
  slug: string;
  elevationM: number;
  class: string;
  countries?: string[];
};

export default async function PeaksPage() {
  const peaks = await client.fetch<PeakListItem[]>(
    `*[_type == "peak" && defined(slug.current)] | order(elevationM desc) {
      _id,
      name,
      "slug": slug.current,
      elevationM,
      class,
      countries
    }`
  );

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>7000-meter peaks</h1>
      <p>Independent peaks have ≥ 500 m prominence. Subsidiaries are listed but not ranked the same way.</p>
      {peaks.length === 0 ? (
        <p>No peaks published yet. Add one in Studio.</p>
      ) : (
        <ol>
          {peaks.map((peak) => (
            <li key={peak._id}>
              <Link href={`/peaks/${peak.slug}`}>
                {peak.name} — {peak.elevationM} m
              </Link>
              {peak.class === "subsidiary" ? " (subsidiary)" : ""}
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}