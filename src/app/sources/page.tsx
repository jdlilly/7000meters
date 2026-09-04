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
                className="text-slate-700 underline decoration-blue-400 underline-offset-2 hover:text-stone-900 hover:decoration-stone-600"
              >
                List of highest mountains on Earth
              </a>
              — Wikipedia. Starting list of independent 7000ers.
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Highest_unclimbed_mountain"
                className="text-slate-700 underline decoration-blue-400 underline-offset-2 hover:text-stone-900 hover:decoration-stone-600"
              >
                Highest unclimbed mountain
              </a>
              — Wikipedia. Used for the unclimbed set.
            </li>
            <li>
              <a
                href="https://www.peakbagger.com/"
                className="text-slate-700 underline decoration-blue-400 underline-offset-2 hover:text-stone-900 hover:decoration-stone-600"
              >
                Peakbagger
              </a>
              — Prominence, coordinates, and parent peaks.
            </li>
            <li>
              <a
                href="https://www.himalayandatabase.com/"
                className="text-slate-700 underline decoration-blue-400 underline-offset-2 hover:text-stone-900 hover:decoration-stone-600"
              >
                Himalayan Database
              </a>
              — Nepal expedition record (Elizabeth Hawley / Billi Bierling).
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">Photos</h2>
          <p className="mt-4 max-w-prose text-lg leading-8 text-stone-800">
            Hero photographs are credited on each peak page. Many come from
            Wikimedia Commons. Do not reuse a photo from this site without
            checking that credit.
          </p>
        </section>
      </article>
    </main>
  );
}