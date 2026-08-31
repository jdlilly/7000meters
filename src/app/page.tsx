import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          A reference for seven-thousanders
        </p>

        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          7000meters
        </h1>

        <p className="mt-6 max-w-prose text-lg leading-8 text-stone-800">
          A catalog of mountains between 7,000 and 8,000 meters. Independent
          peaks have at least 500 m of prominence. Named subsidiaries get their
          own pages and are marked as such.
        </p>

        <p className="mt-10 text-sm">
          <Link href="/peaks" className="text-slate-700 hover:text-stone-900">
            Browse peaks by height →
          </Link>
        </p>
      </article>
    </main>
  );
}