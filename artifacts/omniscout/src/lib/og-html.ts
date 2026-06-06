import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { posts } from "../data/posts";
import { defaultSiteMeta, patchHtmlMeta, type PageMetaTags } from "./seo";

export function generateOgHtmlPages(outDir: string, siteUrl: string): void {
  const indexHtmlPath = path.join(outDir, "index.html");
  const indexHtml = readFileSync(indexHtmlPath, "utf8");

  writeFileSync(
    indexHtmlPath,
    patchHtmlMeta(indexHtml, defaultSiteMeta, siteUrl),
  );

  const blogsMeta: PageMetaTags = {
    title: "Blog · OmniScout",
    description: "Release notes, updates, and guides for OmniScout — local-first browser control for AI agents.",
    image: posts[0]?.thumbnail ?? defaultSiteMeta.image,
    url: "/blogs",
    type: "website",
  };

  const blogsDir = path.join(outDir, "blogs");
  mkdirSync(blogsDir, { recursive: true });
  writeFileSync(
    path.join(blogsDir, "index.html"),
    patchHtmlMeta(indexHtml, blogsMeta, siteUrl),
  );

  for (const post of posts) {
    const postMeta: PageMetaTags = {
      title: `${post.title} · OmniScout`,
      description: post.excerpt,
      image: post.thumbnail,
      url: `/blogs/${post.slug}`,
      type: "article",
    };

    const postDir = path.join(blogsDir, post.slug);
    mkdirSync(postDir, { recursive: true });
    writeFileSync(
      path.join(postDir, "index.html"),
      patchHtmlMeta(indexHtml, postMeta, siteUrl),
    );
  }
}
