import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Globe,
  Code2,
  Database,
  HardDrive,
  Cpu,
  Layers,
  Zap,
  GitBranch,
  ArrowRight,
  Terminal,
  Shield,
  RefreshCw,
  FileText,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

function FadeUp({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
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
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Feature section block ─────────────────────────────────────── */
interface FeatureBlockProps {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
  icon: React.ReactNode;
  code?: string;
}

function FeatureBlock({
  tag,
  title,
  subtitle,
  description,
  bullets,
  imageUrl,
  imageAlt,
  reverse = false,
  icon,
  code,
}: FeatureBlockProps) {
  return (
    <section className="py-16 sm:py-24 border-t border-border/30 overflow-x-clip">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-5 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center min-w-0">
          <FadeUp className={cn("min-w-0 w-full max-w-full", reverse && "lg:order-2")}>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              {tag}
            </div>
            <div className="flex items-start gap-3 mb-5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight leading-tight break-words">
                  {title}
                </h2>
                <p className="text-muted-foreground text-sm break-words">{subtitle}</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base break-words">
              {description}
            </p>
            <ul className="space-y-2.5 mb-6">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground min-w-0">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="break-words min-w-0">{b}</span>
                </li>
              ))}
            </ul>
            {code && (
              <div className="rounded-lg border border-border/40 bg-[hsl(222_22%_6%)] overflow-hidden max-w-full">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/30 bg-[hsl(222_22%_5%)]">
                  <Terminal className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs font-mono text-muted-foreground">example</span>
                </div>
                <pre className="px-4 py-4 text-xs font-mono text-zinc-300 whitespace-pre-wrap break-words leading-6">
                  <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
              </div>
            )}
          </FadeUp>

          <FadeUp delay={0.15} className={cn("min-w-0 w-full max-w-full", reverse && "lg:order-1")}>
            <div className="relative w-full min-w-0 max-w-full rounded-xl overflow-hidden border border-border/30 shadow-lg sm:shadow-2xl sm:shadow-black/40">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="block w-full max-w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground/60 bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {tag}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Small feature card ─────────────────────────────────────────── */
function SmallFeature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <FadeUp>
      <div className="border border-border/40 bg-card rounded-xl p-5 h-full hover:border-primary/20 transition-colors group">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </FadeUp>
  );
}

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <PageHeroGlow />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-5 min-w-0 text-center">
          <FadeUp>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              All features
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 break-words">
              Every primitive
              <br />
              <span className="text-muted-foreground font-normal">
                your agent needs.
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
              Atomic CLI commands for browser control, semantic search, extraction,
              and research — designed for Claude Code, Cursor, Codex, and any
              shell-capable agent.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Feature blocks */}
      <FeatureBlock
        tag="Web Search"
        title="Search the live web."
        subtitle="Real-time retrieval, not training data."
        description="DuckDuckGo HTML retrieval with optional local embedding rerank. Search sources: ddg, index, memory, or hybrid. Use --answer for one-sentence answers with fast, balanced, or deep depth."
        bullets={[
          "Default source: DuckDuckGo (multi-provider search is on the roadmap)",
          "Local embeddings via sentence-transformers/all-MiniLM-L6-v2",
          "omniscout warmup preloads the embed model in the daemon",
          "Domain and freshness filters; duplicate detection",
        ]}
        code={`<span class="text-zinc-300">omniscout search </span><span class="text-emerald-300">"browser agents 2026"</span>
<span class="text-zinc-300">omniscout search </span><span class="text-emerald-300">"who is the president"</span> <span class="text-zinc-300">--answer</span>
<span class="text-zinc-300">omniscout search </span><span class="text-emerald-300">"taskgroup"</span> <span class="text-zinc-300">--source memory</span>`}
        imageUrl="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80"
        imageAlt="Data visualization and search"
        icon={<Search className="w-5 h-5" />}
      />

      <FeatureBlock
        tag="Browser Automation"
        title="Navigate like a human."
        subtitle="Playwright-powered headless browser."
        description="A long-lived daemon holds browser sessions open for sub-second actions. Playwright launches persistent Chrome profiles by default; opt into the extension backend to drive your real Chrome with existing logins."
        bullets={[
          "navigate, snapshot, click, fill, scroll, key, hover, screenshot, pdf, eval, wait",
          "@eN refs from the accessibility tree (preferred over CSS)",
          "browser login and captcha with local handoff by default",
          "browser network start/stop/list/detail for CDP capture",
        ]}
        imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80"
        imageAlt="Developer working at terminal"
        reverse
        icon={<Globe className="w-5 h-5" />}
      />

      <FeatureBlock
        tag="Structured Extraction"
        title="Turn any page into typed data."
        subtitle="Schema-driven, LLM-assisted extraction."
        description="omniscout extract fetches a URL and returns markdown, plain text, or JSON with metadata and links. trafilatura and markdownify power clean output; a content-hashed page cache avoids redundant work."
        bullets={[
          "Formats: markdown, text, json",
          "Works on URLs or @eN refs from workflow state",
          "Content cached under $OMNISCOUT_DATA_DIR/cache/pages/",
          "Smart NL extract (e.g. \"pricing table\") is planned — not shipped",
        ]}
        code={`<span class="text-zinc-300">omniscout extract </span><span class="text-emerald-300">https://example.com</span>
<span class="text-zinc-300">omniscout extract </span><span class="text-emerald-300">https://example.com</span> <span class="text-zinc-300">--format markdown</span>
<span class="text-zinc-300">omniscout extract @e42</span>  <span class="text-zinc-600"># from latest snapshot</span>`}
        imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
        imageAlt="Data extraction visualization"
        icon={<Code2 className="w-5 h-5" />}
      />

      <FeatureBlock
        tag="Semantic Memory"
        title="Agents that remember."
        subtitle="Local vector database. Cross-session knowledge."
        description="Memory is explicit: omniscout remember indexes a URL; memory list, show, note, delete, and stats manage visits and notes. Vectors live in embedded Qdrant; rows in memory.sqlite."
        bullets={[
          "Browsing does not auto-index — you call remember intentionally",
          "Search with --source memory to query past research",
          "omniscout research also embeds passages into the index",
          "Deletion removes both SQLite rows and Qdrant vectors",
        ]}
        imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80"
        imageAlt="Abstract network visualization"
        reverse
        icon={<Database className="w-5 h-5" />}
      />

      {/* Additional small features grid */}
      <section className="py-20 border-t border-border/30 bg-card/20">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp className="mb-12">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              More capabilities
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              The complete toolkit.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SmallFeature
              icon={<HardDrive className="w-4 h-4" />}
              title="Local-First Execution"
              desc="Profiles, Qdrant index, and caches on disk. No hosted browser sessions. Search hits DDG; pages work offline after fetch."
            />
            <SmallFeature
              icon={<Cpu className="w-4 h-4" />}
              title="CLI + JSON"
              desc="Every command supports --json and OMNISCOUT_JSON=1. protocol_version on daemon status for compatibility checks."
            />
            <SmallFeature
              icon={<Layers className="w-4 h-4" />}
              title="Daemon Trace & Replay"
              desc="daemon trace, replay, and watch inspect actions.jsonl. workflow export packages agent sessions for debugging."
            />
            <SmallFeature
              icon={<GitBranch className="w-4 h-4" />}
              title="Workflow Shortcuts"
              desc="open, snapshot, context, reset, and open 1 (first hit from latest search — never tab indices)."
            />
            <SmallFeature
              icon={<Shield className="w-4 h-4" />}
              title="CAPTCHA Handoff"
              desc="Detect reCAPTCHA, hCaptcha, Turnstile. Default: block until you solve locally. 2captcha and capsolver are opt-in."
            />
            <SmallFeature
              icon={<Zap className="w-4 h-4" />}
              title="Research Pipeline"
              desc="omniscout research runs search → crawl → extract → embed → rerank → summarize (TextRank) in one command."
            />
            <SmallFeature
              icon={<RefreshCw className="w-4 h-4" />}
              title="Agent Skills"
              desc="omniscout install --skill copies SKILL.md into Claude, Cursor, Codex, and Gemini skill directories."
            />
            <SmallFeature
              icon={<FileText className="w-4 h-4" />}
              title="Benchmarks"
              desc="omniscout benchmark answers and benchmark startup measure answer quality and cold-start latency locally."
            />
          </div>
        </div>
      </section>

      {/* Architecture diagram section */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp className="mb-12 text-center">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Architecture
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
              Compose CLI commands in any order.
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Search, browser, extract, research, remember, and memory — all
              through the same omniscout binary talking to a local daemon.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative w-full min-w-0 max-w-full border border-border/40 bg-card rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3] sm:aspect-[16/7] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80"
                  alt="Server infrastructure"
                  className="block w-full max-w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center p-3 sm:px-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/30 rounded-xl overflow-hidden border border-border/40 w-full max-w-3xl min-w-0">
                    {[
                      { label: "search", icon: <Search className="w-4 h-4" /> },
                      { label: "browser", icon: <Globe className="w-4 h-4" /> },
                      { label: "extract", icon: <Code2 className="w-4 h-4" /> },
                      { label: "research", icon: <Zap className="w-4 h-4" /> },
                      { label: "remember", icon: <Database className="w-4 h-4" /> },
                      { label: "memory", icon: <Layers className="w-4 h-4" /> },
                      { label: "daemon", icon: <Shield className="w-4 h-4" /> },
                      { label: "workflow", icon: <FileText className="w-4 h-4" /> },
                    ].map(({ label, icon }) => (
                      <div
                        key={label}
                        className="bg-card/90 backdrop-blur-sm px-2 py-3 sm:px-4 sm:py-5 flex flex-col items-center gap-1.5 sm:gap-2 hover:bg-card transition-colors min-w-0"
                      >
                        <div className="text-primary">{icon}</div>
                        <span className="text-[10px] sm:text-xs font-mono text-muted-foreground truncate max-w-full">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/30 bg-card/20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              See how it compares.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              See how OmniScout compares to hosted browsers, vendor-integrated
              agents, and DIY scraper stacks.
            </p>
            <Link
              href="/compare"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              data-testid="link-features-compare"
            >
              View comparison
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
