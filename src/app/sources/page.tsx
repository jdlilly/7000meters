import { Header } from "@/components/Header";

export default function SourcesPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          Further reading
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Sources
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
          Heights, first-ascent years, and climbing notes on this site are
          working figures compiled from public references. Peak pages do not
          yet carry individual footnotes. These are the sources used across
          the catalog.
        </p>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Lists and gazetteers</h2>
          <ul className="mt-4 max-w-prose list-disc space-y-3 pl-5 text-lg leading-8 text-stone-800">
            <li>
              <a
                href="https://en.wikipedia.org/wiki/List_of_highest_mountains_on_Earth"
                className="text-slate-700 hover:text-stone-900"
              >
                List of highest mountains on Earth
              </a>
              — Wikipedia. Starting list of independent 7000ers.
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Highest_unclimbed_mountain"
                className="text-slate-700 hover:text-stone-900"
              >
                Highest unclimbed mountain
              </a>
              — Wikipedia. Used for the unclimbed set.
            </li>
            <li>
              <a
                href="https://www.peakbagger.com/"
                className="text-slate-700 hover:text-stone-900"
              >
                Peakbagger
              </a>
              — Prominence, coordinates, and parent peaks.
            </li>
            <li>
              <a
                href="https://www.himalayandatabase.com/"
                className="text-slate-700 hover:text-stone-900"
              >
                Himalayan Database
              </a>
              — Nepal expedition record (Elizabeth Hawley / Billi Bierling).
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Journals and reporting</h2>
          <ul className="mt-4 max-w-prose list-disc space-y-3 pl-5 text-lg leading-8 text-stone-800">
            <li>
              <a
                href="https://www.himalayanclub.org/hj/"
                className="text-slate-700 hover:text-stone-900"
              >
                The Himalayan Journal
              </a>
            </li>
            <li>
              <a
                href="https://publications.americanalpineclub.org/"
                className="text-slate-700 hover:text-stone-900"
              >
                American Alpine Journal
              </a>
            </li>
            <li>
              <a
                href="https://explorersweb.com/"
                className="text-slate-700 hover:text-stone-900"
              >
                ExplorersWeb
              </a>
              — Recent first ascents and unclimbed-peak notes.
            </li>
            <li>
              <a
                href="https://www.alpinist.com/"
                className="text-slate-700 hover:text-stone-900"
              >
                Alpinist
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Photos</h2>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            Hero photographs are credited on each peak page. Many come from
            Wikimedia Commons. Do not reuse a photo from this site without
            checking that credit and licence.
          </p>
        </section>
      </article>
    </main>
  );
}