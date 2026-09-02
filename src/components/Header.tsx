import Link from "next/link";

const links = [
  { href: "/peaks", label: "Peaks" },
  { href: "/ranges", label: "Ranges" },
  { href: "/countries", label: "Countries" },
  { href: "/map", label: "Map" },
];

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg text-stone-900 hover:text-slate-700"
        >
          7000meters
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm text-stone-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}