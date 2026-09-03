import { Header } from "@/components/Header";

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          How the catalog is built
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Methodology
        </h1>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Inclusion</h2>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            This site covers mountains whose summit elevation is at least 7,000 m
            and less than 8,000 m. The eight-thousanders are out of scope.
          </p>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            A peak is listed as <strong>independent</strong> if it has at least
            500 m of topographic prominence. That is the same cutoff used by the
            common “highest mountains on Earth” lists.
          </p>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            A peak is listed as a <strong>named subsidiary</strong> when it is
            widely treated as a mountain in its own right but falls short of
            500 m prominence (for example Nuptse or Gasherbrum III). Subsidiaries
            have pages and appear on lists and the map, marked as such. They are
            not ranked with the independent 7000ers.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Numbers</h2>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            Elevations, prominences, coordinates, and first-ascent years are
            working figures compiled from public references. They can differ by
            a few metres or a year between sources. Treat them as a starting
            catalog, not a survey.
          </p>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            Coordinates are decimal degrees, WGS84, as stored in the peak
            record. A few lesser peaks are rounded.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Sources</h2>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            The first pass of names and heights follows published prominence
            lists of mountains above 7,200 m, plus widely named 7,000–7,199 m
            summits. Unnamed bumps over 7,000 m are omitted on purpose.
          </p>

          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            Peaks with no accepted ascent are listed on the{" "}
            <a href="/unclimbed" className="text-slate-700 hover:text-stone-900">
              unclimbed
            </a>{" "}
            page.
          </p>

          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            Peaks that have commercial climbing guiding by at least two companies, 
            each advertising a climb to the summit, are listed on the {" "}
            <a href="/guided" className="text-slate-700 hover:text-stone-900">
              guided
            </a>{" "}
            page.{" "}These are not recommendations of these guiding companies.
          </p>
        </section>


        <section className="mt-10">
          <h2 className="font-serif text-2xl">Corrections</h2>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            The catalog is edited in public. A short list of references is on the Sources page.
            If a height, country, or first
            ascent is wrong, it will be updated in place. The site does not yet
            keep a public changelog.
          </p>
        </section>
      </article>
    </main>
  );
}