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
import { Link } from "wouter";

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
    <section className="py-24 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-5">
        <div
          className={`grid lg:grid-cols-2 gap-14 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
          style={{ direction: reverse ? "rtl" : "ltr" }}
        >
          <FadeUp style={{ direction: "ltr" }}>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              {tag}
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                  {title}
                </h2>
                <p className="text-muted-foreground text-sm">{subtitle}</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
              {description}
            </p>
            <ul className="space-y-2.5 mb-6">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            {code && (
              <div className="rounded-lg border border-border/40 bg-[hsl(222_22%_6%)] overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/30 bg-[hsl(222_22%_5%)]">
                  <Terminal className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">example</span>
                </div>
                <pre className="px-4 py-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-6">
                  <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
              </div>
            )}
          </FadeUp>

          <FadeUp delay={0.15} style={{ direction: "ltr" }}>
            <div className="relative rounded-xl overflow-hidden border border-border/30 shadow-2xl shadow-black/40">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-72 md:h-96 object-cover"
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
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/7 blur-[120px]" />
          <div className="absolute top-20 right-0 w-[400px] h-[300px] rounded-full bg-violet-500/6 blur-[100px]" />
        </div>
        <div className="dot-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 text-center">
          <FadeUp>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              All features
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Every primitive
              <br />
              <span className="text-muted-foreground font-normal">
                your agent needs.
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
              OmniScout is designed around a single principle: give AI agents
              reliable, composable tools for understanding the live web.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Feature blocks */}
      <FeatureBlock
        tag="Web Search"
        title="Search the live web."
        subtitle="Real-time retrieval, not training data."
        description="OmniScout aggregates multiple search providers, cleans noisy HTML into readable markdown, deduplicates results, and filters irrelevant content before any token hits an LLM. Agents get signal, not noise."
        bullets={[
          "Multi-provider search aggregation (Brave, Serper, DuckDuckGo)",
          "Clean markdown output — strips nav, ads, and boilerplate",
          "Configurable ranking and freshness filters",
          "Retry logic and rate-limit handling built in",
        ]}
        code={`<span class="text-violet-400">result</span> = client.search(
  query=<span class="text-emerald-300">"YC W25 AI agent startups"</span>,
  providers=[<span class="text-emerald-300">"brave"</span>, <span class="text-emerald-300">"serper"</span>],
  top_k=<span class="text-sky-300">5</span>,
  clean=<span class="text-sky-300">True</span>
)`}
        imageUrl="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80"
        imageAlt="Data visualization and search"
        icon={<Search className="w-5 h-5" />}
      />

      <FeatureBlock
        tag="Browser Automation"
        title="Navigate like a human."
        subtitle="Playwright-powered headless browser."
        description="Dynamic web pages, JavaScript-rendered content, login-gated resources — OmniScout handles them all. Agents can click, scroll, fill forms, and extract data from any page a human could visit."
        bullets={[
          "Full Playwright integration for JS-heavy SPAs",
          "Handles authentication flows and session state",
          "Intercepts network requests for faster extraction",
          "Screenshot and PDF export at any step",
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
        description="Define a Zod or Pydantic schema, point OmniScout at a URL, and get strongly-typed JSON back. The extraction pipeline handles pagination, partial data, and schema validation automatically."
        bullets={[
          "Zod (TypeScript) and Pydantic (Python) schema support",
          "Handles multi-page extraction and pagination",
          "LLM-assisted fallback for unstructured content",
          "Output includes confidence scores and source citations",
        ]}
        code={`<span class="text-violet-400">class</span> <span class="text-sky-300">Startup</span>(BaseModel):
  name: <span class="text-sky-300">str</span>
  funding: <span class="text-sky-300">Optional[str]</span>
  model: <span class="text-sky-300">Literal["local", "cloud"]</span>

<span class="text-violet-400">results</span> = client.extract(
  url=<span class="text-emerald-300">"https://ycombinator.com/companies"</span>,
  schema=Startup
)`}
        imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
        imageAlt="Data extraction visualization"
        icon={<Code2 className="w-5 h-5" />}
      />

      <FeatureBlock
        tag="Semantic Memory"
        title="Agents that remember."
        subtitle="Local vector database. Cross-session knowledge."
        description="OmniScout ships with a local vector store (Chroma) that gives agents persistent memory across sessions. Research accumulates. Past findings inform future queries. Deduplication happens automatically."
        bullets={[
          "Built-in Chroma vector DB — no external service needed",
          "Automatic chunking and embedding on ingest",
          "Semantic search across all prior research",
          "Memory namespaces for project isolation",
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
              desc="Runs entirely on your machine. Zero telemetry. BYO API keys or use Ollama for fully offline operation."
            />
            <SmallFeature
              icon={<Cpu className="w-4 h-4" />}
              title="MCP API"
              desc="Model Context Protocol interface. Drop OmniScout tools into any agent framework: LangChain, AutoGen, CrewAI."
            />
            <SmallFeature
              icon={<Layers className="w-4 h-4" />}
              title="Workflow Replay"
              desc="Define research workflows as YAML. Re-run with different parameters. Audit any step. Export results in any format."
            />
            <SmallFeature
              icon={<GitBranch className="w-4 h-4" />}
              title="Parallel Execution"
              desc="Run multiple browser sessions and search queries in parallel. OmniScout manages concurrency automatically."
            />
            <SmallFeature
              icon={<Shield className="w-4 h-4" />}
              title="Privacy by Design"
              desc="No data leaves your machine unless you configure external LLMs. All storage is local and under your control."
            />
            <SmallFeature
              icon={<Zap className="w-4 h-4" />}
              title="Fast Startup"
              desc="Single binary. No Docker, no virtual environments. Install once, run anywhere with a compatible OS."
            />
            <SmallFeature
              icon={<RefreshCw className="w-4 h-4" />}
              title="Self-Correcting Pipelines"
              desc="Automatic retry with backoff when pages fail. Selector drift detection keeps workflows running over time."
            />
            <SmallFeature
              icon={<FileText className="w-4 h-4" />}
              title="Export Anywhere"
              desc="Output to Markdown, JSON, CSV, or pipe into your own toolchain. OmniScout doesn't lock in your data."
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
              One runtime. Eight primitives.
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Every component exposes a clean interface. Compose them in any
              order. The runtime manages state, retries, and concurrency.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative border border-border/40 bg-card rounded-xl overflow-hidden">
              <div className="relative aspect-[16/7] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80"
                  alt="Server infrastructure"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-px bg-border/30 rounded-xl overflow-hidden border border-border/40 w-full max-w-3xl mx-8">
                    {[
                      { label: "search()", icon: <Search className="w-4 h-4" /> },
                      { label: "browser()", icon: <Globe className="w-4 h-4" /> },
                      { label: "extract()", icon: <Code2 className="w-4 h-4" /> },
                      { label: "memory()", icon: <Database className="w-4 h-4" /> },
                      { label: "plan()", icon: <Layers className="w-4 h-4" /> },
                      { label: "execute()", icon: <Zap className="w-4 h-4" /> },
                      { label: "verify()", icon: <Shield className="w-4 h-4" /> },
                      { label: "export()", icon: <FileText className="w-4 h-4" /> },
                    ].map(({ label, icon }) => (
                      <div
                        key={label}
                        className="bg-card/90 backdrop-blur-sm px-4 py-5 flex flex-col items-center gap-2 hover:bg-card transition-colors"
                      >
                        <div className="text-primary">{icon}</div>
                        <span className="text-xs font-mono text-muted-foreground">
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
              OmniScout outperforms alternatives on every research task we've
              benchmarked. See the numbers.
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
