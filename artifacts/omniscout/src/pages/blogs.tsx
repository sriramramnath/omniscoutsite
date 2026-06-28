import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Rss } from "lucide-react";
import { Link } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { LandscapeThumbnail } from "@/components/blog/landscape-thumbnail";
import { PostMeta } from "@/components/blog/post-meta";
import { posts, type BlogPost } from "@/data/posts";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <FadeUp delay={0.08}>
      <Link href={`/blogs/${post.slug}`} className="group block min-w-0">
        <article
          className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/25 hover:shadow-primary/5"
          data-testid="blog-card-featured"
        >
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/15 via-transparent to-primary/5" />

          <LandscapeThumbnail
            src={post.thumbnail}
            alt=""
            loading="eager"
            className="rounded-none border-b border-border/30"
            imgClassName="transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="relative flex min-w-0 flex-col gap-5 p-6 sm:p-8">
            <PostMeta post={post} />

            <div className="space-y-3 min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground transition-colors group-hover:text-primary break-words">
                {post.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                {post.excerpt}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary pt-1">
              Read release notes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      </Link>
    </FadeUp>
  );
}

function PostRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <FadeUp delay={0.05 + index * 0.04}>
      <Link href={`/blogs/${post.slug}`} className="group block min-w-0">
        <article
          className="grid min-w-0 gap-5 border-b border-border/30 py-8 transition-colors hover:bg-card/20 sm:grid-cols-[min(42%,14rem)_1fr] sm:items-center sm:gap-8 first:pt-0"
          data-testid={`blog-card-${post.slug}`}
        >
          <LandscapeThumbnail
            src={post.thumbnail}
            alt=""
            className="rounded-lg border border-border/30 sm:max-w-[14rem]"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          />

          <div className="min-w-0 space-y-3">
            <PostMeta post={post} size="compact" />
            <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors break-words">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 break-words leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </article>
      </Link>
    </FadeUp>
  );
}

export default function Blogs() {
  const [latest, ...older] = posts;

  useDocumentMeta(routePageMeta["/blogs"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-14 pb-12 sm:pt-16 sm:pb-16">
        <PageHeroGlow />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-5 min-w-0 text-center">
          <FadeUp>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-primary">
              <Rss className="h-3.5 w-3.5" />
              Blog
            </div>
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight break-words">
              <HeroTitleGradient>Release notes &amp; updates</HeroTitleGradient>
            </h1>
            <p className="mx-auto max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              What we ship, why it matters, and how to use it in your agent workflows.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="border-t border-border/30 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 min-w-0">
          {latest ? (
            <FeaturedPost post={latest} />
          ) : (
            <FadeUp>
              <div className="rounded-2xl border border-dashed border-border/50 bg-card/20 px-6 py-16 text-center">
                <p className="text-sm text-muted-foreground">No posts yet. Check back soon.</p>
              </div>
            </FadeUp>
          )}

          {older.length > 0 && (
            <div className="mt-16">
              <FadeUp className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Earlier posts
                </h2>
              </FadeUp>
              <div>
                {older.map((post, i) => (
                  <PostRow key={post.slug} post={post} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
