export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  /** Optimized image for Open Graph / Twitter cards (absolute URL built at deploy). */
  ogImage?: string;
  readingTime?: string;
}

export const posts: BlogPost[] = [
  {
    slug: "v0-2-6",
    title: "OmniScout v0.2.6: Grounded Answers, Now in Beta",
    excerpt:
      "v0.2.6 is officially in beta — meet omniscout answer for fast, grounded responses with sources, a smarter pipeline, and better validation.",
    date: "2026-06-05",
    thumbnail: "/v0.2.6.png",
    ogImage: "/og/v0-2-6.jpg",
    readingTime: "6 min read",
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
