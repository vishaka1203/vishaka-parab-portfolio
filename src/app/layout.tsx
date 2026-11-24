import localFont from "next/font/local";
import { PortfolioBackground } from "@/components/portfolio-background";
import { resolveSiteUrl } from "@/lib/site-url";
import Link from "next/link";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import "./globals.css";
import "./design.css";
const sans = localFont({
  src: "../../public/fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
const editorial = localFont({
  src: "../../public/fonts/cormorant-garamond-italic-latin.woff2",
  variable: "--font-cormorant",
  display: "swap",
  weight: "300 700",
  style: "italic",
});
export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: "Vishaka Parab — Software Developer",
    template: "%s · Vishaka Parab",
  },
  description:
    "Software Developer with 3+ years of experience in enterprise web applications, cloud platforms, and AI-assisted development. Explore professional experience and selected projects.",
  openGraph: {
    type: "website",
    title: "Vishaka Parab — Software Developer",
    description: "Thoughtful interfaces. Dependable engineering.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${editorial.variable}`}
      suppressHydrationWarning
    >
      <body>
        <PortfolioBackground />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        {children}
        <footer className="site-footer">
          <Link href="/#home" className="wordmark">
            vp<span>.</span>
          </Link>
          <span>Thoughtfully designed. Carefully built.</span>
          <span>© {new Date().getFullYear()} Vishaka Parab</span>
          <Link href="/#home">Back to Home</Link>
        </footer>
      </body>
    </html>
  );
}
