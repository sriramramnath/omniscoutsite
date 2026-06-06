import { posts } from "../data/posts";
import { DEFAULT_SITE_URL, staticRoutes } from "../config/site-routes";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function getSitemapEntries(siteUrl: string = DEFAULT_SITE_URL): SitemapEntry[] {
  const base = siteUrl.replace(/\/$/, "");

  const pages: SitemapEntry[] = staticRoutes.map((route) => ({
    loc: `${base}${route.path === "/" ? "" : route.path}`,
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  for (const post of posts) {
    pages.push({
      loc: `${base}/blogs/${post.slug}`,
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  return pages;
}

export function buildSitemapXml(siteUrl: string = DEFAULT_SITE_URL): string {
  const entries = getSitemapEntries(siteUrl);

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobotsTxt(siteUrl: string = DEFAULT_SITE_URL): string {
  const base = siteUrl.replace(/\/$/, "");
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}
