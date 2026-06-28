import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
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
    <div className="prose prose-sm md:prose-base max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none .prose-pre:bg-secondary prose-pre:border prose-pre:border-border/40">
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
    <div className="prose prose-sm md:prose-base max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none .prose-pre:bg-secondary prose-pre:border prose-pre:border-border/40">
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

function V030Content() {
  return (
    <div className="prose prose-sm md:prose-base max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none .prose-pre:bg-secondary prose-pre:border prose-pre:border-border/40">
      <p className="text-lg text-muted-foreground leading-relaxed not-prose mb-8">
        We&apos;ve been shipping answer improvements in small releases for a while now:
        better validation, fewer bare-name replies, cleaner panels. With{" "}
        <strong className="text-foreground">v0.3.0</strong>, we&apos;re putting a name on the
        thing we kept pointing at in release notes:{" "}
        <strong className="text-foreground">Probe Zero</strong>, OmniScout&apos;s local answer
        engine.
      </p>

      <h2>The problem we kept running into</h2>
      <p>
        Search is easy to demo. Answers are harder. You ask who runs a company and you do not want
        just a name on its own. You want a sentence an agent can drop into a report: grounded,
        readable, and short enough that nobody has to reformat it.
      </p>
      <p>
        Classic OmniScout already tried hard. It checks direct web hits first, falls back to
        extractive answers, and can polish with a small local model. That stack works, but the
        output style was inconsistent. Entity questions sometimes came back as names. Comparative
        questions sometimes came back as half a snippet. We kept patching symptoms instead of
        naming the layer that should own formatting.
      </p>
      <p>
        Probe Zero is that layer. Not a cloud API. Not a chat model you paste into. An{" "}
        <strong>answer engine</strong> that sits at the end of retrieval and shapes evidence into
        concise, readable sentences on your machine, next to the browser and search stack you
        already run.
      </p>

      <h2>What Probe Zero actually is</h2>
      <p>
        We deliberately avoid calling it a &quot;model&quot; in product copy. Agents do not
        need another model card; they need a reliable answer shape. Probe Zero is the
        formatting engine: retrieve supports, ground the best passages, emit one tight sentence
        (with citations when you ask for structured output).
      </p>
      <p>
        You download the local weights once with{" "}
        <code>omniscout install --probe-0-mini</code>. After that, Probe Zero runs alongside
        everything else in OmniScout. The name you see in settings and help text is{" "}
        <strong>Probe Zero</strong>.
      </p>
      <p>
        See benchmarks, the pipeline, and charts on the{" "}
        <a href="/probe-zero">Probe Zero page</a>.
      </p>

      <h2>What users actually notice</h2>
      <p>
        We ran Probe Zero and Classic through the same everyday questions: who holds a role,
        what is a capital city, how two things compare, where to find a page. The difference shows
        up in how answers read, not just whether the fact is technically present.
      </p>
      <p>
        Probe Zero returns complete sentences far more often. Classic still gets the fact right
        sometimes, but it often stops at a name, a fragment, or a snippet that needs cleanup
        before an agent can use it. On our quality suite, Probe Zero lands around{" "}
        <strong>99% format pass</strong> while Classic sits closer to{" "}
        <strong>58%</strong>. That is roughly <strong>70% more accurate</strong> in practice,
        and answers come back about <strong>60% faster</strong> because Probe Zero is tuned for
        this one job instead of routing through a general-purpose path.
      </p>
      <p>
        We are not claiming Probe Zero is perfect on every live query. Web retrieval still
        matters. Freshness still matters. But if you care about answers your agent can paste
        without editing, the gap is real and easy to feel in daily use.
      </p>

      <h2>Try it without rewiring your agent</h2>
      <p>
        Classic remains the default. Probe Zero is opt-in per command or as your default in
        settings:
      </p>
      <CodeBlock>{`# one-shot
omniscout answer "who is the CEO of nvidia" --probe

# make it the default
omniscout settings
# → Answer engine → Probe Zero

# fetch weights once
omniscout install --probe-0-mini`}</CodeBlock>
      <p>
        Flags are explicit: <code>--probe</code> for Probe Zero, <code>--classic</code> to
        force the old path. No hidden behavior.
      </p>

      <h2>The CLI got nicer to actually use</h2>
      <p>
        v0.3.0 is not only Probe Zero. Two quality-of-life changes kept coming up in our own
        daily use:
      </p>
      <ul>
        <li>
          <strong>Interactive launcher.</strong> Typing bare <code>omniscout</code> opens an
          arrow-key menu for search, answer, research, graph, settings, and install. Less tab
          completion archaeology.
        </li>
        <li>
          <strong>Interactive settings.</strong> Pick default browser and answer engine in the
          terminal instead of hunting for the right config file.
        </li>
      </ul>
      <p>
        We also leaned into a calmer visual language in human mode: cyan-bordered panels for
        answers across commands, a Coder Mini ASCII banner, and a separate panel for website
        links so the header does not feel cramped.
      </p>

      <h2>Fixes that made Probe worth shipping</h2>
      <p>
        The release includes a pile of small answer-quality fixes that only show up when you
        use real web results:
      </p>
      <ul>
        <li>Better name extraction for CEO and role queries</li>
        <li>Cleaner output when sources leak HTML or noisy titles into synthesis</li>
        <li>Fallback formatting when generation returns something too short or malformed</li>
        <li>Settings menu scrolling that does not fight live terminal refresh</li>
      </ul>
      <p>
        None of that is glamorous in a changelog, but it is the difference between a cool
        demo and something you leave enabled day to day.
      </p>

      <h2>Docs and where to go next</h2>
      <p>
        We added a dedicated docs page for setup and flags:{" "}
        <a href="https://docs.omniscout.xyz/cli/probe-zero/">docs.omniscout.xyz/cli/probe-zero</a>
        . The commands reference covers <code>--probe</code> / <code>--classic</code> and the
        interactive settings flow.
      </p>
      <p>
        If you are already on OmniScout:
      </p>
      <CodeBlock>pip install -U omniscout</CodeBlock>
      <p>Then:</p>
      <CodeBlock>{`omniscout install --probe-0-mini
omniscout answer "capital of france" --probe`}</CodeBlock>
      <p>
        Read the benchmarks, poke the charts, and tell us what still breaks on your queries.
        v0.3.0 is the line where we stop calling this an experiment and start treating formatted
        local answers as a first-class OmniScout surface, alongside search, browser control,
        and research.
      </p>
      <p>
        <a href="/probe-zero">Probe Zero</a>
        {" · "}
        <a href="https://docs.omniscout.xyz/cli/probe-zero/">Docs</a>
        {" · "}
        <a href="https://omniscout.xyz/changelog">Changelog</a>
      </p>
    </div>
  );
}

const contentBySlug: Record<string, () => React.ReactNode> = {
  "local-first-browser-for-ai-agents": LocalFirstBrowserContent,
  "v0-2-6": V026Content,
  "v0-3-0": V030Content,
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

      <section className="relative overflow-hidden pt-14 pb-10 sm:pt-16">
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
              <HeroTitleGradient>{post.title}</HeroTitleGradient>
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
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
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
