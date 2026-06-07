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

# LLM-friendly site index: ${base}/llms.txt
Sitemap: ${base}/sitemap.xml
`;
}

export function buildLlmsTxt(siteUrl: string = DEFAULT_SITE_URL): string {
  const base = siteUrl.replace(/\/$/, "");
  return `# OmniScout

> Give your AI agent a browser. No SDK. No cloud. Just a CLI. Local-first browser automation, semantic search, extraction, and research for AI agents.

Install: \`pip install omniscout\` then \`omniscout install --skill\` to copy the agent skill into Claude, Cursor, Codex, and Gemini.

## Product

- [Home](${base}/): Overview and quick install
- [Features](${base}/features): Browser control, search, extract, research primitives
- [Use cases](${base}/use-cases): Agent workflow examples
- [Compare](${base}/compare): vs hosted browsers and vendor-integrated agents
- [Changelog](${base}/changelog): Release history
- [Blog](${base}/blogs): Release notes and guides

## Documentation

- [OmniScout Docs llms.txt](https://docs.omniscout.xyz/llms.txt): Full CLI and SDK reference index
- [OmniScout Docs llms-full.txt](https://docs.omniscout.xyz/llms-full.txt): Concatenated documentation for LLM context
- [Agent skill (SKILL.md)](https://github.com/sriramramnath/omniscout/blob/main/docs/agent-skill.md): Drop-in instructions for AI agents

## Optional

- [PyPI package](https://pypi.org/project/omniscout/)
- [GitHub repository](https://github.com/sriramramnath/omniscout)
`;
}

export function buildLlmsFullTxt(siteUrl: string = DEFAULT_SITE_URL): string {
  const base = siteUrl.replace(/\/$/, "");
  return `# OmniScout — condensed site context

> Local-first CLI for AI agents: semantic web search, one-sentence answers, multi-step research, URL extraction, browser memory, and full browser automation via a daemon at 127.0.0.1:7720.

## Install

\`\`\`bash
pip install omniscout
omniscout install --skill
omniscout daemon start
\`\`\`

## Key pages

- ${base}/
- ${base}/features
- ${base}/use-cases
- ${base}/compare
- ${base}/changelog
- ${base}/blogs

## Full technical documentation

See https://docs.omniscout.xyz/llms-full.txt for the complete CLI commands reference, architecture, SDK API, examples, and troubleshooting guides.

## Agent skill

Install with \`omniscout install --skill\` or read https://github.com/sriramramnath/omniscout/blob/main/docs/agent-skill.md
`;
}
