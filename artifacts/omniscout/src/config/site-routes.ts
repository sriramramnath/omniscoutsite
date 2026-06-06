export const DEFAULT_SITE_URL = "https://omniscout-omega.vercel.app";

export const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/features", changefreq: "monthly", priority: "0.8" },
  { path: "/use-cases", changefreq: "monthly", priority: "0.8" },
  { path: "/compare", changefreq: "monthly", priority: "0.7" },
  { path: "/blogs", changefreq: "weekly", priority: "0.9" },
  { path: "/changelog", changefreq: "weekly", priority: "0.8" },
] as const;
