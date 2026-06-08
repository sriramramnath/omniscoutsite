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

function LocalFirstBrowserContent() {
  return (
    <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[hsl(222_22%_6%)] prose-pre:border prose-pre:border-border/40">
      <p className="text-lg text-muted-foreground leading-relaxed not-prose mb-8">
        Most AI agents can write code, reason through tasks, and plan complex
        workflows. The moment they need to interact with the web, things get
        messy: hosted browsers, API keys, usage limits, and page dumps that eat
        your context window.
      </p>

      <p>
        We built <strong>omniscout</strong> around a simpler idea: your agent
        should use a <strong>real browser on your machine</strong>, for{" "}
        <strong>free</strong>, without signing up for another cloud service.
      </p>

      <h2>Local. Free. Yours.</h2>
      <p>
        omniscout is a CLI that runs entirely on your computer. There is no
        hosted browser farm, no per-session billing, and no vendor lock-in on
        where your browsing happens. Search, extraction, embeddings, and
        research all execute locally, the same way you would run any other dev
        tool.
      </p>
      <p>
        You pay for the Agent you already use (Claude Code, Codex, Cursor, whatever).
        omniscout itself is free to install and use. Your logins, cookies, and
        browsing history stay on your machine unless you explicitly send
        something to a model.
      </p>
      <p>
        That matters if you are automating internal dashboards, reading paywalled
        docs behind SSO, or just do not want a third party holding your browser
        sessions in the cloud.
      </p>

      <h2>One setup command for every agent</h2>
      <p>
        After you install the package, run this once:
      </p>
      <CodeBlock>omniscout install --skill</CodeBlock>
      <p>
        That single command does the important work: it picks a Chromium browser
        on your system, prefetches the local models omniscout needs, and drops
        the agent skill into Claude Code, Cursor, Codex, Gemini, and the other
        directories agents already read. No manual copying. No editing system
        prompts by hand.
      </p>
      <p>
        The skill is also listed on{" "}
        <a href="https://skills.sh" target="_blank" rel="noreferrer">
          skills.sh
        </a>{" "}
        (the open agent-skills ecosystem), but you do not need a long{" "}
        <code>npx skills add …</code> invocation.{" "}
        <code>omniscout install --skill</code> is the shortcut we ship for
        exactly this.
      </p>

      <h2>Then just type /omniscout</h2>
      <p>
        Open any supported agent: Claude Code in your terminal, Cursor in your
        editor, Codex, Cline, Windsurf, Claude Code, and more. Start your
        message with <code>/omniscout</code>, then describe what you want in
        plain English.
      </p>
      <p>
        Because the skill is already installed, the agent knows omniscout&apos;s
        vocabulary. It does not guess at curl commands or hallucinate browser
        APIs. It routes the task through the local CLI: open a page, read it,
        click, fill forms, search the web, run a research pass, and hand the
        answer back in the same chat.
      </p>
      <p>Things people actually ask:</p>
      <ul>
        <li>
          <em>/omniscout find the cheapest price for this headphone in India</em>
        </li>
        <li>
          <em>/omniscout read this company&apos;s pricing page and summarize the cheapest plan</em>
        </li>
        <li>
          <em>/omniscout search for beginner Python tutorials and summarize the top three</em>
        </li>
        <li>
          <em>/omniscout what happened in tech news today?</em>
        </li>
      </ul>
      <p>
        You are not learning a new UI. You are talking to the agent you already
        use, with one prefix that turns on the browser.
      </p>

      <h2>Why browser state had to be smaller</h2>
      <p>
        A typical automation loop dumps huge accessibility trees or raw DOM into
        the model. One page can cost thousands of tokens. After a few actions,
        the agent spends more context understanding the browser than solving your
        task.
      </p>
      <p>
        omniscout snapshots use compact refs tied to real accessibility labels,
        small enough to stay in a tight context budget and stable enough that the
        model is not chasing CSS class hashes that change every deploy.
      </p>

      <h2>Your browser, not a rented one</h2>
      <p>
        omniscout supports two modes. A dedicated Playwright session works well
        for isolated automation, CI, and testing. The Chrome extension backend
        connects to the Chrome you already run, with the GitHub, Notion, Linear,
        and internal-tool logins you already have.
      </p>
      <p>
        That second mode surprised us. People did not want to re-authenticate in
        a cloud browser. They wanted their AI to work inside the session they
        use every day: locally, for free, on hardware they already own.
      </p>

      <h2>Research without another subscription</h2>
      <p>
        Beyond click-and-fill, omniscout can run a full research pipeline from a
        single agent request: search, crawl sources, extract clean text, embed
        and rerank locally, and return structured passages with URLs. No Exa
        account. No hosted crawl API. The indexing and ranking happen on your
        machine.
      </p>
      <p>
        The output is shaped for agents: ranked snippets, sources, and scores,
        not a human-facing report you have to re-parse.
      </p>

      <h2>What we learned after launch</h2>
      <ul>
        <li>
          <strong>Local beat hosted.</strong> Developers strongly preferred
          running browsers on their own hardware over cloud sessions with caps
          and extra invoices.
        </li>
        <li>
          <strong>/omniscout beat documentation.</strong> Once the skill was
          installed, people stopped pasting long prompts. They typed the prefix
          and moved on.
        </li>
        <li>
          <strong>Session persistence mattered.</strong> Log in once; the agent
          stays logged in across daemon restarts.
        </li>
        <li>
          <strong>Research was useful without agents.</strong> Many people run
          omniscout from the terminal directly. The skill path just makes the
          same power available inside Claude, Cursor, and Codex.
        </li>
      </ul>

      <h2>What&apos;s next</h2>
      <p>
        MCP support, faster research indexing, persistent knowledge bases, and
        more agent integrations. The goal stays the same: free, local browser
        access for any model you choose.
      </p>
      <p>
        Install once with <code>omniscout install --skill</code>, open your
        agent, type <code>/omniscout</code>, and ask.
      </p>
      <p>
        <a href="https://omniscout.xyz">omniscout.xyz</a>
        {" · "}
        <a href="https://docs.omniscout.xyz">docs.omniscout.xyz</a>
      </p>
    </div>
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
  "local-first-browser-for-ai-agents": LocalFirstBrowserContent,
  "v0-2-6": V026Content,
};

const defaultPostCta = {
  title: "Set up omniscout",
  subtitle: "pip install omniscout && omniscout install --skill",
  href: "https://docs.omniscout.xyz/cli/agents/",
  buttonLabel: "Agent setup guide",
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
          imageHeight: 630,
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
  const cta = post.cta ?? defaultPostCta;

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
            <h2 className="text-xl font-bold tracking-tight mb-3">{cta.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">{cta.subtitle}</p>
            <a
              href={cta.href ?? "https://docs.omniscout.xyz"}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            >
              {cta.buttonLabel ?? "Read the docs"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
