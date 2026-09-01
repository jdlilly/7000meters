import Link from "next/link";
import { Header } from "@/components/Header";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          A reference for seven-thousanders
        </p>

        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          7000 meters
        </h1>

        <p className="mt-6 max-w-prose text-lg leading-8 text-stone-800">
          A catalog of mountains between 7,000 and 8,000 meters. Independent
          peaks have at least 500 m of prominence. Named subsidiaries get their
          own pages and are marked as such.
        </p>

        <nav className="mt-10 space-y-2 text-sm">
          <p>
            <Link href="/peaks" className="text-slate-700 hover:text-stone-900">
              By height →
            </Link>
          </p>
          <p>
            <Link href="/ranges" className="text-slate-700 hover:text-stone-900">
              By range →
            </Link>
          </p>
          <p>
            <Link
              href="/countries"
              className="text-slate-700 hover:text-stone-900"
            >
              By country →
            </Link>
          </p>
        </nav>
      </article>
    </main>
  );
}