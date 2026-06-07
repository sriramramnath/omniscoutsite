import { routePageMeta, type PageMetaTags } from "../config/page-meta";

export type { PageMetaTags };

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

function setOrInsertLink(html: string, rel: string, href: string): string {
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}" />`;
  const pattern = new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*"\\s*/?>`, "i");
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

export function buildJsonLd(meta: PageMetaTags, siteUrl: string): Record<string, unknown>[] {
  const pageUrl = meta.url ? absoluteUrl(siteUrl, meta.url) : siteUrl.replace(/\/$/, "");
  const base = siteUrl.replace(/\/$/, "");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OmniScout",
    url: base,
    sameAs: [
      "https://github.com/sriramramnath/omniscout",
      "https://pypi.org/project/omniscout/",
      "https://docs.omniscout.xyz",
    ],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OmniScout",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    description: meta.description,
    url: pageUrl,
    downloadUrl: "https://pypi.org/project/omniscout/",
    softwareHelp: "https://docs.omniscout.xyz/cli/overview/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  if (meta.type === "article") {
    return [
      organization,
      software,
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: meta.title.replace(/ · OmniScout$/, ""),
        description: meta.description,
        url: pageUrl,
        image: meta.image ? absoluteUrl(siteUrl, meta.image) : undefined,
        publisher: { "@type": "Organization", name: "OmniScout", url: base },
      },
    ];
  }

  return [organization, software];
}

function upsertJsonLd(meta: PageMetaTags, siteUrl: string): void {
  const id = "omniscout-jsonld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(buildJsonLd(meta, siteUrl));
}

function upsertCanonical(href: string): void {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
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
  result = setOrInsertLink(result, "canonical", pageUrl);

  const jsonLd = `<script id="omniscout-jsonld" type="application/ld+json">${JSON.stringify(buildJsonLd(meta, siteUrl))}</script>`;
  if (result.includes('id="omniscout-jsonld"')) {
    result = result.replace(/<script id="omniscout-jsonld"[^>]*>[\s\S]*?<\/script>/, jsonLd);
  } else {
    result = result.replace("</head>", `    ${jsonLd}\n  </head>`);
  }

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
  upsertCanonical(pageUrl);
  upsertJsonLd(meta, siteUrl);

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

export const DEFAULT_OG_IMAGE = "/og/home.jpg";

export const defaultSiteMeta: PageMetaTags = routePageMeta["/"];
