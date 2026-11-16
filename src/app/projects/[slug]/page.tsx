import { Github } from "@/components/brand-icons";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/profile";
import { ProjectPreview } from "@/components/project-preview";
import { Button } from "@/components/ui/button";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readFile } from "node:fs/promises";
import path from "node:path";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.summary,
        alternates: { canonical: `/projects/${p.slug}` },
        openGraph: { title: p.title, description: p.summary },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  let mdx: string | null = null;
  try {
    mdx = await readFile(
      path.join(process.cwd(), "src/content/projects", `${p.slug}.mdx`),
      "utf8",
    );
  } catch {
    /* A new data entry works without a case study. */
  }
  return (
    <main id="main">
      <section className="section case-hero">
        <Link href="/#work" className="case-back">
          <ArrowLeft size={15} /> Back to selected work
        </Link>
        <p className="eyebrow">
          {p.category.toUpperCase()} / {p.createdAt.slice(0, 4)} / PUBLIC
          PROJECT
        </p>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
        <div className="case-actions">
          <Button asChild>
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} /> View source <ArrowUpRight size={15} />
            </a>
          </Button>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Visit live project <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <div className="tags">
          {p.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <ProjectPreview project={p} />
      </section>
      <section className="section case-content">
        <p className="case-note">
          Project illustration is a concept visual, not a screenshot. Repository
          created {p.createdAt}; last updated {p.updatedAt}. Dates describe
          repository metadata, not development duration.
        </p>
        {mdx ? (
          <MDXRemote source={mdx} />
        ) : (
          <>
            <h2>Project overview</h2>
            <p>{p.summary}</p>
            <p>
              A detailed technical walkthrough has not yet been documented.
              Explore the public source for implementation details.
            </p>
          </>
        )}
        <p className="case-note">
          Source: {p.source}. No traffic, performance or business outcomes are
          claimed.
        </p>
        <Link href="/#work" className="text-link">
          <ArrowLeft size={15} /> Explore more work
        </Link>
      </section>
    </main>
  );
}
