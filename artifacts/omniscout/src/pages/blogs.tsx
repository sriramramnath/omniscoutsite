import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, PenLine, Sparkles } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { cn } from "@/lib/utils";

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

const categories = ["All", "Engineering", "Product", "Tutorials", "Changelog"] as const;

const placeholderPosts = [
  { id: "featured", category: "Engineering", featured: true },
  { id: "02", category: "Product" },
  { id: "03", category: "Tutorials" },
  { id: "04", category: "Engineering" },
  { id: "05", category: "Changelog" },
  { id: "06", category: "Product" },
] as const;

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-3 rounded-full bg-gradient-to-r from-border/80 via-muted/50 to-border/80",
        className,
      )}
      aria-hidden
    />
  );
}

function BlankBlogCard({
  category,
  featured = false,
  index,
}: {
  category: string;
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm",
        "transition-colors duration-300 hover:border-primary/30 hover:bg-card/60",
        featured ? "md:col-span-2 md:row-span-2" : "",
      )}
      data-testid={featured ? "blog-card-featured" : `blog-card-${index}`}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "bg-gradient-to-br from-primary/20 via-transparent to-primary/10",
        )}
        aria-hidden
      />

      <div className={cn("relative flex flex-col", featured ? "h-full min-h-[420px]" : "min-h-[280px]")}>
        <div
          className={cn(
            "relative overflow-hidden border-b border-border/30 bg-gradient-to-br from-muted/30 via-background to-primary/[0.04]",
            featured ? "h-52 md:h-64" : "h-36",
          )}
        >
          <div className="absolute inset-0 dot-grid opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(104,127,243,0.12)_0%,_transparent_50%)]" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="rounded-full border border-border/50 bg-background/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
              {category}
            </span>
            <span className="rounded-full border border-dashed border-primary/40 bg-primary/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-primary/80">
              Draft
            </span>
          </div>
          <div className="absolute right-4 top-4 rounded-full border border-border/40 bg-background/50 p-2 text-muted-foreground/50 backdrop-blur-sm">
            <PenLine className="h-4 w-4" />
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col gap-4 p-5", featured && "p-6 md:p-8")}>
          <div className="space-y-3">
            <SkeletonBar className={cn("w-3/4", featured && "h-4 md:w-2/3")} />
            <SkeletonBar className={cn("w-full", featured ? "h-3.5" : "w-5/6")} />
            {featured && <SkeletonBar className="h-3 w-4/5" />}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-muted/60 ring-1 ring-border/40" />
              <div className="space-y-1.5">
                <SkeletonBar className="h-2 w-16" />
                <SkeletonBar className="h-2 w-20" />
              </div>
            </div>
            <SkeletonBar className="h-2 w-14" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <PageHeroGlow />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <FadeUp>
            <div className="mb-5 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Blog
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Stories from
              <br />
              <span className="font-normal text-muted-foreground">the build.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Deep dives on local-first agents, browser automation, and what we ship
              next — posts are on the way.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="border-t border-border/30 pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <FadeUp delay={0.05}>
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200",
                      activeCategory === cat
                        ? "border-primary/50 bg-primary/10 text-foreground shadow-[0_0_24px_-8px_rgba(104,127,243,0.45)]"
                        : "border-border/50 bg-card/30 text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                    data-testid={`blog-filter-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                {placeholderPosts.length} drafts · publishing soon
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post, i) => (
              <BlankBlogCard
                key={post.id}
                category={post.category}
                featured={"featured" in post && post.featured}
                index={i}
              />
            ))}
          </div>

          <FadeUp delay={0.1} className="mt-16">
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/50 bg-card/20 px-6 py-14 text-center sm:px-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,_rgba(104,127,243,0.08)_0%,_transparent_70%)]" />
              <div className="relative mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight">Nothing published yet</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We&apos;re drafting the first posts. Check back soon for release notes,
                  engineering write-ups, and agent workflow guides.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
