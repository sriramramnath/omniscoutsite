import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { getPostOgImage, posts } from "../data/posts";
import { OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH, routePageMeta } from "../config/page-meta";
import { patchHtmlMeta, type PageMetaTags } from "./seo";

const OG_IMAGE_META = {
  imageWidth: OG_IMAGE_WIDTH,
  imageHeight: OG_IMAGE_HEIGHT,
  imageType: OG_IMAGE_TYPE,
} as const;

function writeRouteHtml(outDir: string, indexHtml: string, meta: PageMetaTags, siteUrl: string): void {
  const routePath = meta.url ?? "/";
  const destDir =
    routePath === "/" ? outDir : path.join(outDir, routePath.replace(/^\//, ""));
  if (routePath !== "/") mkdirSync(destDir, { recursive: true });
  const destFile = path.join(destDir, "index.html");
  writeFileSync(destFile, patchHtmlMeta(indexHtml, meta, siteUrl));
}

export function generateOgHtmlPages(outDir: string, siteUrl: string): void {
  const indexHtmlPath = path.join(outDir, "index.html");
  const indexHtml = readFileSync(indexHtmlPath, "utf8");

  for (const meta of Object.values(routePageMeta)) {
    writeRouteHtml(outDir, indexHtml, meta, siteUrl);
  }

  for (const post of posts) {
    const postMeta: PageMetaTags = {
      title: `${post.title} · OmniScout`,
      description: post.excerpt,
      image: getPostOgImage(post),
      ...OG_IMAGE_META,
      url: `/blogs/${post.slug}`,
      type: "article",
    };

    const postDir = path.join(outDir, "blogs", post.slug);
    mkdirSync(postDir, { recursive: true });
    writeFileSync(
      path.join(postDir, "index.html"),
      patchHtmlMeta(indexHtml, postMeta, siteUrl),
    );
  }
}
