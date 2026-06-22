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

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/jpeg";

const ogImage = (path: string): Pick<PageMetaTags, "image" | "imageWidth" | "imageHeight" | "imageType"> => ({
  image: path,
  imageWidth: OG_IMAGE_WIDTH,
  imageHeight: OG_IMAGE_HEIGHT,
  imageType: OG_IMAGE_TYPE,
});

export const routePageMeta: Record<string, PageMetaTags> = {
  "/": {
    title: "OmniScout",
    description:
      "Give your AI agent a browser. No SDK. No cloud. Just a CLI. Local-first browser automation and research for AI agents.",
    url: "/",
    type: "website",
    ...ogImage("/og/home.jpg"),
  },
  "/features": {
    title: "Features · OmniScout",
    description:
      "Atomic CLI commands for browser control, semantic search, extraction, and research — designed for Claude Code, Cursor, Codex, and any shell-capable agent.",
    url: "/features",
    type: "website",
    ...ogImage("/og/features.jpg"),
  },
  "/use-cases": {
    title: "Use Cases · OmniScout",
    description:
      "Real agent workflows with OmniScout: research, competitive intel, GitHub automation, news monitoring, and more — all local-first.",
    url: "/use-cases",
    type: "website",
    ...ogImage("/og/use-cases.jpg"),
  },
  "/advantages": {
    title: "How OmniScout Reduces AI Costs · OmniScout",
    description:
      "Get precise answers. Use fewer tokens. Save more. See how OmniScout cuts LLM token costs by up to 95% compared to traditional search + LLM workflows.",
    url: "/advantages",
    type: "website",
    ...ogImage("/og/features.jpg"),
  },
  "/guide": {
    title: "Setup Guide · OmniScout",
    description:
      "Anyone can set this up. Run 3 commands once, then ask your AI in plain English to browse, search, and fill forms automatically.",
    url: "/guide",
    type: "website",
    ...ogImage("/og/home.jpg"),
  },
  "/compare": {
    title: "Compare · OmniScout",
    description:
      "How OmniScout compares to hosted browsers, vendor-integrated agents, and DIY scraper stacks — local Playwright, real Chrome, no cloud sessions.",
    url: "/compare",
    type: "website",
    ...ogImage("/og/compare.jpg"),
  },
  "/changelog": {
    title: "Changelog · OmniScout",
    description: "Release history and version notes for OmniScout — local-first browser control for AI agents.",
    url: "/changelog",
    type: "website",
    ...ogImage("/og/changelog.jpg"),
  },
  "/blogs": {
    title: "Blog · OmniScout",
    description:
      "Release notes, updates, and guides for OmniScout — local-first browser control for AI agents.",
    url: "/blogs",
    type: "website",
    ...ogImage("/og/blogs.jpg"),
  },
  "/contact": {
    title: "Contact · OmniScout",
    description:
      "Contact Sriram Ramnath, founder of OmniScout. Project queries, collaboration, GitHub, and PyPI.",
    url: "/contact",
    type: "website",
    ...ogImage("/og/home.jpg"),
  },
};

export function getRoutePageMeta(path: string): PageMetaTags {
  return routePageMeta[path] ?? routePageMeta["/"];
}
