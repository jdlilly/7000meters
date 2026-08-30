import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>7000meters</h1>
      <p>
        A reference for mountains between 7,000 and 8,000 meters. Independent
        peaks have at least 500 m of prominence. Named subsidiaries get their
        own pages but are marked separately.
      </p>
      <p>
        <Link href="/peaks">Browse peaks</Link>
      </p>
    </main>
  );
}