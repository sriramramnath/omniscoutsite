export interface PageMetaTags {
  title: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  url?: string;
  type?: "website" | "article";
}

export function absoluteUrl(siteUrl: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = siteUrl.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setOrInsertMeta(
  html: string,
  attr: "name" | "property",
  key: string,
  content: string,
): string {
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, "i");
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function applyImageMeta(html: string, meta: PageMetaTags, siteUrl: string): string {
  if (!meta.image) return html;

  const imageUrl = absoluteUrl(siteUrl, meta.image);
  let result = setOrInsertMeta(html, "property", "og:image", imageUrl);
  result = setOrInsertMeta(result, "name", "twitter:image", imageUrl);

  if (meta.imageWidth) {
    result = setOrInsertMeta(result, "property", "og:image:width", String(meta.imageWidth));
  }
  if (meta.imageHeight) {
    result = setOrInsertMeta(result, "property", "og:image:height", String(meta.imageHeight));
  }
  if (meta.imageType) {
    result = setOrInsertMeta(result, "property", "og:image:type", meta.imageType);
  }

  return result;
}

export function patchHtmlMeta(html: string, meta: PageMetaTags, siteUrl: string): string {
  const pageUrl = meta.url ? absoluteUrl(siteUrl, meta.url) : siteUrl.replace(/\/$/, "");

  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  result = setOrInsertMeta(result, "name", "description", meta.description);
  result = setOrInsertMeta(result, "property", "og:title", meta.title);
  result = setOrInsertMeta(result, "property", "og:description", meta.description);
  result = setOrInsertMeta(result, "property", "og:type", meta.type ?? "website");
  result = setOrInsertMeta(result, "property", "og:url", pageUrl);
  result = setOrInsertMeta(result, "name", "twitter:card", "summary_large_image");
  result = setOrInsertMeta(result, "name", "twitter:title", meta.title);
  result = setOrInsertMeta(result, "name", "twitter:description", meta.description);
  result = applyImageMeta(result, meta, siteUrl);

  return result;
}

function upsertDocumentMeta(attr: "name" | "property", key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applyPageMeta(meta: PageMetaTags, siteUrl: string): void {
  const pageUrl = meta.url ? absoluteUrl(siteUrl, meta.url) : siteUrl.replace(/\/$/, "");

  document.title = meta.title;
  upsertDocumentMeta("name", "description", meta.description);
  upsertDocumentMeta("property", "og:title", meta.title);
  upsertDocumentMeta("property", "og:description", meta.description);
  upsertDocumentMeta("property", "og:type", meta.type ?? "website");
  upsertDocumentMeta("property", "og:url", pageUrl);
  upsertDocumentMeta("name", "twitter:card", "summary_large_image");
  upsertDocumentMeta("name", "twitter:title", meta.title);
  upsertDocumentMeta("name", "twitter:description", meta.description);

  if (meta.image) {
    const imageUrl = absoluteUrl(siteUrl, meta.image);
    upsertDocumentMeta("property", "og:image", imageUrl);
    upsertDocumentMeta("name", "twitter:image", imageUrl);
    if (meta.imageWidth) {
      upsertDocumentMeta("property", "og:image:width", String(meta.imageWidth));
    }
    if (meta.imageHeight) {
      upsertDocumentMeta("property", "og:image:height", String(meta.imageHeight));
    }
    if (meta.imageType) {
      upsertDocumentMeta("property", "og:image:type", meta.imageType);
    }
  }
}

export const DEFAULT_OG_IMAGE = "/og/v0-2-6.jpg";

export const defaultSiteMeta: PageMetaTags = {
  title: "OmniScout",
  description:
    "Give your AI agent a browser. No SDK. No cloud. Just a CLI. Local-first browser automation and research for AI agents.",
  image: DEFAULT_OG_IMAGE,
  imageWidth: 1200,
  imageHeight: 675,
  imageType: "image/jpeg",
  url: "/",
  type: "website",
};
