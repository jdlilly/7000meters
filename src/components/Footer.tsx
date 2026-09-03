import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm text-stone-500 sm:px-6">
        <p>Catalog of 7000 meter peaks</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/methodology" className="hover:text-stone-800">
            Methodology
          </Link>
          <Link href="/unclimbed" className="hover:text-stone-800">
            Unclimbed
          </Link>
          <Link href="/guided" className="hover:text-stone-800">
            Guided
          </Link>
            <Link href="/sources" className="hover:text-stone-800">
            Sources
          </Link>
        </nav>
      </div>
    </footer>
  );
}