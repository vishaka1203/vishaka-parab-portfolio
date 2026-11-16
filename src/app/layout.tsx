import { resolveSiteUrl } from "@/lib/site-url";
import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: "Vishaka Parab — Frontend Engineer",
    template: "%s · Vishaka Parab",
  },
  description:
    "Frontend engineer building thoughtful web experiences with React, Next.js and TypeScript. Explore selected projects, experience and engineering interests.",
  openGraph: {
    type: "website",
    title: "Vishaka Parab — Frontend Engineer",
    description: "Thoughtful interfaces. Dependable engineering.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        {children}
        <footer className="site-footer">
          <Link href="/" className="wordmark">
            vp<span>.</span>
          </Link>
          <span>Thoughtfully designed. Carefully built.</span>
          <span>© {new Date().getFullYear()} Vishaka Parab</span>
          <a href="#main">Back to top ↑</a>
        </footer>
      </body>
    </html>
  );
}
