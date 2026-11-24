import { z } from "zod";
import {
  projects,
  profile,
  experience,
  skills,
  type Project,
} from "../content/profile";
export function sortProjects(items: Project[], recent = false) {
  return [...items].sort(
    (a, b) =>
      (recent ? b.updatedAt : b.createdAt).localeCompare(
        recent ? a.updatedAt : a.createdAt,
      ) || a.slug.localeCompare(b.slug),
  );
}
export function discover(items: Project[], query: string, category = "All") {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9.+ -]/g, "")
    .split(/\s+/)
    .filter(
      (w) =>
        w &&
        ![
          "show",
          "me",
          "projects",
          "project",
          "using",
          "with",
          "find",
          "the",
          "latest",
          "recent",
          "recently",
          "updated",
          "involving",
          "in",
          "a",
          "and",
          "related",
          "to",
        ].includes(w),
    );
  return sortProjects(items, /recent|updated/i.test(query)).filter(
    (p) =>
      (category === "All" || p.category === category) &&
      words.every((w) =>
        [p.title, p.summary, p.category, ...p.technologies]
          .join(" ")
          .toLowerCase()
          .includes(w),
      ),
  );
}
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(0),
});
export function fallback(query: string, intent?: string) {
  const text = `${query} ${intent || ""}`;
  if (/contact|email|resume/i.test(text))
    return `Email Vishaka at ${profile.email}, or connect on LinkedIn: ${profile.linkedin}. Download the public resume at /resume/vishaka-parab-public-resume.pdf.`;
  if (/education|degree/i.test(text))
    return "B.E. Computer Science, Agnel Institute of Technology and Design, Goa (2019–2023), CGPA 8.8/10.";
  if (/experience|work|career|company|professional/i.test(text))
    return `${profile.name} has 3+ years of professional software development experience. ${experience.map((e) => `${e.role} at ${e.company} (${e.dates})`).join("; ")}. Additional achievements are not yet documented. See /#experience.`;
  if (/project|build|latest/i.test(text)) {
    if (/cloud|aws|azure|dashboard/i.test(query))
      return "Cloud security dashboards are documented in the Softcell Technologies experience at /#experience. No public cloud-dashboard case study has been verified yet.";
    const technologies = [
      ...new Set(projects.flatMap((p) => p.technologies)),
    ].filter((t) => query.toLowerCase().includes(t.toLowerCase()));
    const matches = sortProjects(projects).filter((p) =>
      technologies.every((t) => p.technologies.includes(t)),
    );
    return matches.length
      ? matches
          .map((p) => `${p.title}: ${p.summary} Read /projects/${p.slug}`)
          .join("\n\n")
      : "No matching public projects are documented yet. Explore /#experience for professional work.";
  }
  if (/skill|tech|react|next|cloud|typescript/i.test(text))
    return `Vishaka works with ${Object.values(skills).flat().join(", ")}. Cloud experience is documented under /#experience. Ask about public projects to explore the source.`;
  return "That detail is not yet documented in the verified portfolio. Ask about skills, experience, education, or public projects; you can also connect with Vishaka on LinkedIn.";
}
