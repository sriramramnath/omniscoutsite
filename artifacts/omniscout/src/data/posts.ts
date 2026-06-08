export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  /** Optimized image for Open Graph / Twitter cards (absolute URL built at deploy). */
  ogImage?: string;
  readingTime?: string;
  cta?: {
    title: string;
    subtitle: string;
    href?: string;
    buttonLabel?: string;
  };
}

export const posts: BlogPost[] = [
  {
    slug: "local-first-browser-for-ai-agents",
    title: "Building a Local-First Browser for AI Agents",
    excerpt:
      "Free, local browser control for AI agents. Run omniscout install --skill once, then type /omniscout in Claude Code, Cursor, or Codex and ask anything.",
    date: "2026-06-08",
    thumbnail: "/og/local-first-browser-for-ai-agents.jpg",
    ogImage: "/og/local-first-browser-for-ai-agents.jpg",
    readingTime: "7 min read",
    cta: {
      title: "Set up omniscout",
      subtitle: "pip install omniscout && omniscout install --skill",
      href: "https://docs.omniscout.xyz/cli/agents/",
      buttonLabel: "Agent setup guide",
    },
  },
  {
    slug: "v0-2-6",
    title: "OmniScout v0.2.6: Grounded Answers, Now in Beta",
    excerpt:
      "v0.2.6 is officially in beta — meet omniscout answer for fast, grounded responses with sources, a smarter pipeline, and better validation.",
    date: "2026-06-05",
    thumbnail: "/v0.2.6.png",
    ogImage: "/og/v0-2-6.jpg",
    readingTime: "6 min read",
    cta: {
      title: "Install omniscout",
      subtitle: "curl -fsSL https://omniscout.xyz/install.sh | bash",
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostOgImage(post: BlogPost): string {
  return post.ogImage ?? post.thumbnail;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
