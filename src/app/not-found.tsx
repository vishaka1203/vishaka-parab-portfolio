import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>This page is elsewhere.</h1>
      <p>Let’s get you back to the work.</p>
      <Link href="/">Back to the portfolio →</Link>
    </main>
  );
}
