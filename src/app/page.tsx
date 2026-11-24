import { CompanyProjects } from "@/components/company-projects";
import { resolveSiteUrl } from "@/lib/site-url";
import { Reveal } from "@/components/reveal";
import { Github, Linkedin } from "@/components/brand-icons";
import { Download, Code2, Layers, Sparkles, MapPin, Mail } from "lucide-react";
import { CurrentTag, TechnologyTags } from "@/components/current-tag";
import {
  profile,
  experience,
  skills,
  education,
  certifications,
} from "@/content/profile";
import { Projects } from "@/components/projects";
import { ContactForm } from "@/components/contact";
import { Button } from "@/components/ui/button";
import { githubActivity } from "@/lib/github";
export const revalidate = 3600;
export const metadata = { alternates: { canonical: "/" } };
export default async function Home() {
  const activity = await githubActivity();
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            sameAs: [profile.github, profile.linkedin],
            knowsAbout: ["React", "Next.js", "TypeScript"],
            url: resolveSiteUrl(),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section id="home" className="hero section">
        <div className="hero-top">
          <p className="eyebrow">
            <span className="status-dot" /> VISHAKA PARAB / SOFTWARE DEVELOPER
          </p>
          <span className="location">
            <MapPin size={13} /> {profile.location}
          </span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <h1>
              Software Developer.
              <br />
              <span>Engineering with intent.</span>
            </h1>
            <p>
              Software Developer with 3+ years of experience building enterprise
              web applications. Skilled in React, Next.js, TypeScript, and API
              integration, with an AI-assisted development workflow.
            </p>
            <div className="hero-actions">
              <Button asChild>
                <a href="#work">Explore my work</a>
              </Button>
              <a href="#contact" className="text-link">
                Let’s build something
              </a>
            </div>
            <div className="hero-stack">
              <span>CORE TECHNOLOGIES</span>
              <TechnologyTags items={["React", "Next.js", "TypeScript"]} />
            </div>
            {profile.resumeUrl && (
              <a
                className="hero-resume text-link"
                href={profile.resumeUrl}
                download
              >
                <Download size={16} /> Download resume
              </a>
            )}
          </div>
          <div
            className="hero-visual"
            aria-label="Abstract interface architecture illustration"
            role="img"
          >
            <div className="visual-grid" />
            <span className="visual-caption">
              THE SPACE BETWEEN DESIGN & CODE
            </span>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="architecture-card card-back">
              <span>01 — STRUCTURE</span>
              <div className="wireframe">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="architecture-card card-front">
              <div className="card-toolbar">
                <Code2 size={16} />
                <span>interface.tsx</span>
                <i />
                <i />
                <i />
              </div>
              <div className="code-lines">
                <span>
                  <b>const</b> experience = {"{"}
                </span>
                <span>
                  {" "}
                  &nbsp; clarity: <em>true</em>,
                </span>
                <span>
                  {" "}
                  &nbsp; craft: <em>&quot;in every detail&quot;</em>,
                </span>
                <span>
                  {" "}
                  &nbsp; builtFor: <em>&quot;people&quot;</em>
                </span>
                <span>{"};"}</span>
              </div>
              <div className="code-bottom">
                <span className="status-dot" /> Designed to make sense.
              </div>
            </div>
            <div className="floating-label">
              <Layers size={14} /> Design. Develop. Refine.
            </div>
            <span className="visual-coordinate">
              19.0760° N &nbsp; 72.8777° E
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>COMPLEXITY, MADE CLEAR.</span>
          <a href="#about">A little more about me</a>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>
      <div className="expertise-strip">
        <span>
          <Code2 size={17} /> Application architecture
        </span>
        <span>
          <Layers size={17} /> Reusable design systems
        </span>
        <span>
          <Sparkles size={17} /> AI-assisted development
        </span>
        <span>React · Next.js · TypeScript</span>
      </div>
      <Reveal>
        <Projects />
      </Reveal>
      <section className="section about-section" id="about">
        <div className="about-label">
          <p className="eyebrow">ABOUT VISHAKA</p>
          <div className="monogram-art">
            v<span>p</span>
            <small>
              CURIOUS BY NATURE.
              <br />
              AN ENGINEER BY CRAFT.
            </small>
          </div>
        </div>
        <div className="about-copy">
          <h2>
            Vishaka Parab.
            <br />
            <em>Software Developer.</em>
          </h2>
          <p className="lead">{profile.summary}</p>
          <p>{profile.about}</p>
          <div className="about-details">
            <div>
              <strong>Based in</strong>
              <span>Mumbai, India</span>
            </div>
            <div>
              <strong>Engineering approach</strong>
              <span>AI-assisted, technically grounded</span>
            </div>
          </div>
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            More about my journey
          </a>
        </div>
      </section>
      <CompanyProjects />
      <section className="section experience-section" id="experience">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPERIENCE</p>
            <h2>
              Experience that adds up<span>.</span>
            </h2>
          </div>
          <p>
            From responsive interfaces
            <br />
            to complex cloud workflows.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((e, i) => (
            <article className="experience-row" key={e.company}>
              <div className="experience-date">
                <span className="timeline-dot" />
                {e.dates}
                <span>{e.location}</span>
              </div>
              <div>
                <div className="role-line">
                  <h3>{e.company}</h3>
                  {i === 0 && <CurrentTag />}
                </div>
                <h4>{e.role}</h4>
                <p>{e.summary}</p>
                <ul>
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tags">
                  {e.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section skills-section" id="skills">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE TOOLKIT</p>
            <h2>
              The tools behind the thinking<span>.</span>
            </h2>
          </div>
          <p>
            Technology follows the problem.
            <br />
            These are the tools I work with.
          </p>
        </div>
        <div className="skill-list">
          {Object.entries(skills).map(([group, items]) => (
            <div className="skill-row" key={group}>
              <h3>{group}</h3>
              <div>
                {items.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="education">
          <p className="eyebrow">FOUNDATIONS / EDUCATION</p>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
          <span>
            {education.dates} &nbsp; · &nbsp; {education.result}
          </span>
        </div>
        <div className="certification-list">
          <p className="eyebrow">CONTINUED LEARNING / CERTIFICATIONS</p>
          {certifications.map((c) => (
            <div key={c.title}>
              <h3>{c.title}</h3>
              <span>
                {c.issuer} · {c.year}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="section github-section">
        <div>
          <p className="eyebrow">OPEN SOURCE / CONTINUOUSLY LEARNING</p>
          <h2>
            More on GitHub<span>.</span>
          </h2>
          <p>The experiments, iterations and work in between.</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <Github size={16} /> Explore my repositories{" "}
          </a>
        </div>
        <div className="github-repos">
          {activity.available ? (
            activity.repos.map((r) => (
              <a
                href={r.html_url}
                key={r.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {r.name}
                  <small>
                    {r.language || "Repository"} · Updated{" "}
                    {r.updated_at.slice(0, 10)} · {r.stargazers_count} stars ·{" "}
                    {r.forks_count} forks
                  </small>
                </span>
              </a>
            ))
          ) : (
            <p>
              Live activity is temporarily unavailable. Selected projects remain
              available above, and you can browse the public repositories on
              GitHub.
            </p>
          )}
        </div>
      </section>
      <section className="section contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">LET’S CONNECT</p>
          <h2>
            Great things start
            <br />
            with a <em>conversation.</em>
          </h2>
          <p>
            Have a role or project where thoughtful software development can
            make a difference? Let’s connect.
          </p>
          <a
            className="contact-email text-link"
            href={`mailto:${profile.email}`}
          >
            <Mail size={18} />
            {profile.email}
          </a>
          <div className="social-links">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} /> GitHub
            </a>
          </div>
          {profile.resumeUrl ? (
            <Button asChild variant="outline" className="contact-resume">
              <a href={profile.resumeUrl} download>
                <Download size={16} /> Download resume
              </a>
            </Button>
          ) : (
            <span className="resume-note">
              Public resume available after privacy review.
            </span>
          )}
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
