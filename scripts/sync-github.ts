/** Explicit allowlist only; never overwrite curated summaries or MDX. */
import { projects } from "../src/content/profile";
import { writeFile } from "node:fs/promises";
import { z } from "zod";
const schema = z.object({
  name: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  html_url: z.url(),
  private: z.literal(false),
});
const requested = process.argv.slice(2);
const selected = projects.filter(
  (p) => requested.length === 0 || requested.includes(p.slug),
);
if (!selected.length) throw new Error("No allowlisted project slugs matched.");
const result: Record<string, { createdAt: string; updatedAt: string }> = {};
for (const p of selected) {
  const name = new URL(p.githubUrl).pathname.split("/").pop();
  const r = await fetch(
    `https://api.github.com/repos/vishaka1203/${encodeURIComponent(name!)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!r.ok)
    throw new Error(
      `GitHub returned ${r.status}; local content was preserved.`,
    );
  const repo = schema.parse(await r.json());
  result[p.slug] = {
    createdAt: repo.created_at.slice(0, 10),
    updatedAt: repo.updated_at.slice(0, 10),
  };
}
const { default: previous } =
  await import("../src/content/github.generated.json");
await writeFile(
  "src/content/github.generated.json",
  JSON.stringify({ ...previous, ...result }, null, 2) + "\n",
);
console.log(
  `Refreshed dates for ${selected.length} selected public projects. Curated content and case studies preserved.`,
);
