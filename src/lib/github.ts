import { z } from "zod";
const repoSchema = z.object({
  name: z.string(),
  html_url: z.url(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  updated_at: z.string(),
});
export async function githubActivity(fetcher: typeof fetch = fetch) {
  try {
    const r = await fetcher(
      "https://api.github.com/users/vishaka1203/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!r.ok) throw new Error("Unavailable");
    return {
      repos: z
        .array(repoSchema)
        .parse(await r.json())
        .slice(0, 4),
      available: true,
    };
  } catch {
    return { repos: [], available: false };
  }
}
