export const DEFAULT_SITE_URL = "https://omniscout.xyz";

/** Resolve canonical origin at build time (Vercel env → VITE_SITE_URL → default). */
export function resolveSiteUrl(): string {
  const explicit = process.env.VITE_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/$/, "");
  if (production) return production.startsWith("http") ? production : `https://${production}`;

  const deployment = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (deployment) return deployment.startsWith("http") ? deployment : `https://${deployment}`;

  return DEFAULT_SITE_URL;
}

export const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/install", changefreq: "monthly", priority: "0.9" },
  { path: "/features", changefreq: "monthly", priority: "0.8" },
  { path: "/use-cases", changefreq: "monthly", priority: "0.8" },
  { path: "/compare", changefreq: "monthly", priority: "0.7" },
  { path: "/blogs", changefreq: "weekly", priority: "0.9" },
  { path: "/changelog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
] as const;
