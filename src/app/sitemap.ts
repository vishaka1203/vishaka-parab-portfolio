import { resolveSiteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();
  return [
    { url: base },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
