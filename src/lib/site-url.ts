/** Vercel supplies the production hostname at build time, including preview builds. */
export function resolveSiteUrl(
  env: Record<string, string | undefined> = process.env,
) {
  const url =
    env.NEXT_PUBLIC_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return new URL(url).origin;
}
