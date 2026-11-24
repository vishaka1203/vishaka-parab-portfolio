"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { projects } from "@/content/profile";
import { discover } from "@/lib/portfolio";
import { ProjectPreview } from "./project-preview";
import { Input } from "./ui/input";
export function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [recent, setRecent] = useState(false);
  const found = discover(
    projects,
    `${query}${recent ? " recently updated" : ""}`,
    filter,
  );
  return (
    <section id="work" className="section work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2>
            Ideas, made tangible<span>.</span>
          </h2>
        </div>
        <p>
          A selection of public projects.
          <br />
          Built to explore. Crafted to be useful.
        </p>
      </div>
      <div className="filter-bar">
        <label className="search-field">
          <Search size={17} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “projects using TypeScript”"
            aria-label="Search projects"
          />
        </label>
        <button className="sort-control" onClick={() => setRecent(!recent)}>
          <SlidersHorizontal size={15} />
          {recent ? "Recently updated" : "Newest first"}
        </button>
      </div>
      <div className="filters" aria-label="Project category">
        {["All", ...new Set(projects.map((p) => p.category))].map((f) => (
          <button
            aria-pressed={filter === f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
            key={f}
          >
            {f}
            {f === "All" && (
              <span>{projects.length.toString().padStart(2, "0")}</span>
            )}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {found.map((p, i) => (
          <article className="project-card" key={p.slug}>
            <Link className="project-image-link" href={`/projects/${p.slug}`}>
              <ProjectPreview project={p} />
              <span className="project-hover">Explore project</span>
            </Link>
            <div className="project-content">
              <div className="project-meta">
                <span>
                  {p.category} {p.featured ? " / FEATURED" : ""}
                </span>
                <span>{p.createdAt.slice(0, 4)}</span>
              </div>
              <Link className="project-title" href={`/projects/${p.slug}`}>
                <h3>{p.title}</h3>
                <span aria-hidden="true" className="project-open">
                  +
                </span>
              </Link>
              <p>{p.summary}</p>
              <div className="tags">
                {p.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <span className="sr-only">
              Project {i + 1} of {found.length}
            </span>
          </article>
        ))}
      </div>
      {!found.length && (
        <p role="status" className="empty-state">
          No matching projects. Try React, Next.js or MySQL, or clear the
          filters.
        </p>
      )}
    </section>
  );
}
