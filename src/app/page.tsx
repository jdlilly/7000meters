import Link from "next/link";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
          A working catalog
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
          Mountains between 7000 and 8000 meters
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-8 text-stone-700">
          Independent peaks of at least 500 m prominence, plus named
          subsidiaries. Heights, first ascents, and climbing notes are
          compiled in public and will keep changing.
        </p>

        <nav className="mt-12 grid gap-4 sm:grid-cols-2">
          <HomeLink href="/peaks" label="Peaks" note="By height" />
          <HomeLink href="/ranges" label="Ranges" note="By mountain range" />
          <HomeLink href="/countries" label="Countries" note="By country" />
          <HomeLink href="/map" label="Map" note="All peaks with coordinates" />
        </nav>
      </article>
    </main>
  );
}

function HomeLink({
  href,
  label,
  note,
}: {
  href: string;
  label: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="border-t border-stone-300 py-4 hover:text-slate-700"
    >
      <span className="block font-serif text-2xl">{label}</span>
      <span className="mt-1 block text-sm text-stone-500">{note}</span>
    </Link>
  );
}