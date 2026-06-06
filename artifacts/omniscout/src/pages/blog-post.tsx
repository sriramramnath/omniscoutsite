import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { LandscapeThumbnail } from "@/components/blog/landscape-thumbnail";
import { PostMeta } from "@/components/blog/post-meta";
import { CodeBlock } from "@/components/blog/code-block";
import { getPost, getPostOgImage } from "@/data/posts";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import NotFound from "@/pages/not-found";

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

function V026Content() {
  return (
    <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[hsl(222_22%_6%)] prose-pre:border prose-pre:border-border/40">
      <p className="text-lg text-muted-foreground leading-relaxed not-prose mb-8">
        Today marks a big milestone for OmniScout:{" "}
        <strong className="text-foreground">v0.2.6 is officially in beta.</strong>
      </p>

      <p>
        Over the past few releases we&apos;ve been steadily improving search,
        browser automation, and answer quality. With v0.2.6, we&apos;re bringing
        those pieces together with a new way to get fast, grounded answers
        directly from your terminal.
      </p>

      <h2>Meet <code>omniscout answer</code></h2>
      <p>
        The highlight of this release is the new{" "}
        <code>omniscout answer</code> command.
      </p>
      <p>
        Instead of digging through search results and opening multiple tabs, you
        can ask a question and get a direct answer with sources in seconds.
      </p>
      <CodeBlock>{`omniscout answer "How tall is Mount Everest?"`}</CodeBlock>
      <CodeBlock>{`omniscout answer "Who is the current Prime Minister of India?"`}</CodeBlock>
      <CodeBlock>{`omniscout answer "What is 47 × 23?"`}</CodeBlock>
      <p>
        Whether it&apos;s a factual lookup, a quick calculation, or a current event
        question, OmniScout now focuses on giving you the answer first.
      </p>

      <h2>Built for Speed and Accuracy</h2>
      <p>
        Under the hood, v0.2.6 uses a layered answer pipeline designed to return
        the fastest reliable result possible.
      </p>
      <p>
        For straightforward questions, OmniScout can often answer directly from
        search results and search-assist data. For factual lookups, it
        intelligently extracts information from snippets and trusted sources.
        Basic calculations are handled locally, avoiding unnecessary searches
        altogether.
      </p>
      <p>
        When a question needs deeper reasoning, OmniScout uses its answer model to
        synthesize a grounded response backed by sources.
      </p>
      <p>
        The goal is simple: fast answers when possible, deeper answers when
        necessary.
      </p>

      <h2>Better Validation, Fewer Mistakes</h2>
      <p>
        A large part of this release wasn&apos;t about adding features. It was
        about making answers more reliable.
      </p>
      <p>
        We&apos;ve reworked validation to reduce common errors and low-quality
        responses. The new system is better at:
      </p>
      <ul>
        <li>Rejecting weak or low-confidence answers</li>
        <li>Distinguishing roles from people holding those roles</li>
        <li>Preserving full names and important identifiers</li>
        <li>Filtering disambiguation pages and noisy search results</li>
        <li>Producing cleaner, more trustworthy responses</li>
      </ul>
      <p>
        The result is a noticeably better answer experience, especially for
        factual queries.
      </p>

      <h2>Getting Started</h2>
      <p>Install or upgrade OmniScout:</p>
      <CodeBlock>pip install -U omniscout</CodeBlock>
      <p>For the best experience, preload the answer model:</p>
      <CodeBlock>{`omniscout warmup

# or

omniscout install --answer-model`}</CodeBlock>
      <p>Then start asking questions:</p>
      <CodeBlock>{`omniscout answer "Your question here"`}</CodeBlock>

      <h2>Beta Status</h2>
      <p>
        Moving to beta doesn&apos;t mean development is slowing down.
      </p>
      <p>
        It means the core foundations of OmniScout are becoming stable enough for
        everyday use, while we continue improving answer quality, retrieval
        strategies, diagnostics, and agent integrations.
      </p>
      <p>
        You&apos;ll also notice clearer diagnostics throughout the answer pipeline,
        including outputs such as:
      </p>
      <ul>
        <li>
          <code>direct+snippet</code>
        </li>
        <li>
          <code>extractive+search</code>
        </li>
        <li>
          <code>nlp+crawl</code>
        </li>
      </ul>
      <p>
        These make it easier to understand where an answer came from and how it
        was produced.
      </p>

      <h2>What&apos;s Next</h2>
      <p>Our focus for the next few releases is straightforward:</p>
      <ul>
        <li>Better answer quality</li>
        <li>More retrieval transparency</li>
        <li>Stronger agent integrations</li>
        <li>Improved browser automation</li>
        <li>Better diagnostics and debugging tools</li>
      </ul>
      <p>
        If you&apos;ve been following OmniScout since the early releases, thank you
        for the feedback and support. Every release has been shaped by real-world
        usage, bug reports, and feature requests from the community.
      </p>
      <p>
        v0.2.6 is our biggest step forward yet, and we&apos;re excited to see what
        you&apos;ll build with it.
      </p>
      <p>
        <strong>
          Upgrade today and give <code>omniscout answer</code> a try.
        </strong>
      </p>
    </div>
  );
}

const contentBySlug: Record<string, () => React.ReactNode> = {
  "v0-2-6": V026Content,
};

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getPost(params.slug ?? "");

  useDocumentMeta(
    post
      ? {
          title: `${post.title} · OmniScout`,
          description: post.excerpt,
          image: getPostOgImage(post),
          imageWidth: 1200,
          imageHeight: 675,
          imageType: "image/jpeg",
          url: `/blogs/${post.slug}`,
          type: "article",
        }
      : {
          title: "Post not found · OmniScout",
          description: "The blog post you are looking for does not exist.",
          url: "/blogs",
        },
  );

  if (!post) {
    return <NotFound />;
  }

  const Content = contentBySlug[post.slug];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <PageHeroGlow />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-5 min-w-0">
          <FadeUp>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All posts
            </Link>

            <PostMeta post={post} className="mb-6" />

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8 break-words">
              {post.title}
            </h1>
          </FadeUp>

          <FadeUp delay={0.08}>
            <LandscapeThumbnail
              src={post.thumbnail}
              alt=""
              loading="eager"
              className="rounded-xl border border-border/30 shadow-lg mb-12"
            />
          </FadeUp>

          <FadeUp delay={0.12}>
            {Content ? <Content /> : null}
          </FadeUp>

          <FadeUp delay={0.16} className="mt-16 pt-10 border-t border-border/30">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to blog
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 border-t border-border/30 bg-card/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-5 text-center">
          <FadeUp>
            <h2 className="text-xl font-bold tracking-tight mb-3">Try v0.2.6</h2>
            <p className="text-sm text-muted-foreground mb-6">
              pip install -U omniscout · omniscout install --skill
            </p>
            <a
              href="https://omniscout-docs.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            >
              Read the docs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
