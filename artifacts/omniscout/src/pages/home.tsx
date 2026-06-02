import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  Search,
  Globe,
  Code2,
  Database,
  HardDrive,
  Cpu,
  Github,
  ArrowRight,
  Shield,
  Layers,
  Zap,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";

/* ─── Fade-up wrapper ────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ───────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Glow card ─────────────────────────────────────────────────── */
function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, []);
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card border border-border bg-card rounded-xl p-6 transition-colors duration-300 hover:border-primary/20 ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Feature card ───────────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <GlowCard className="h-full group cursor-default">
        <div className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
          <span className="w-5 h-5">{icon}</span>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </GlowCard>
    </motion.div>
  );
}

/* ─── Terminal line ──────────────────────────────────────────────── */
function TerminalLine({
  children,
  color = "text-zinc-400",
  delay,
  inView,
}: {
  children: React.ReactNode;
  color?: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`font-mono text-sm leading-6 ${color}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Workflow step ──────────────────────────────────────────────── */
function WorkflowStep({
  status,
  label,
  detail,
}: {
  status: "done" | "active" | "pending";
  label: string;
  detail: string;
}) {
  const dotColor =
    status === "done"
      ? "bg-emerald-400"
      : status === "active"
      ? "bg-primary animate-pulse"
      : "bg-border";
  const labelColor =
    status === "pending" ? "text-muted-foreground" : "text-foreground";

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
      <div className="mt-[5px] flex-shrink-0">
        <div className={`w-2 h-2 rounded-full ${dotColor}`} />
      </div>
      <div className="min-w-0">
        <div className={`text-sm font-medium ${labelColor}`}>{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5 font-mono truncate">
          {detail}
        </div>
      </div>
      {status === "done" && (
        <div className="ml-auto text-xs font-mono text-emerald-400 flex-shrink-0">
          ✓
        </div>
      )}
      {status === "active" && (
        <div className="ml-auto text-xs font-mono text-primary flex-shrink-0">
          …
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInView = useInView(terminalRef, { once: true, margin: "-80px" });

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/25 overflow-x-hidden">
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl"
        data-testid="nav-main"
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center flex-shrink-0">
              <Search className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">
              OmniScout
            </span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {["Features", "Architecture", "Use Cases", "Docs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-foreground transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/omniscout"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-github-nav"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
              data-testid="button-nav-cta"
            >
              Get started
            </a>
            <button
              className="md:hidden text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border/30 px-5 py-4 flex flex-col gap-3 text-sm text-muted-foreground bg-background/90 backdrop-blur-xl">
            {["Features", "Architecture", "Use Cases", "Docs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center pt-14 overflow-hidden"
      >
        {/* Gradient mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="mesh-gradient-1 absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]" />
          <div className="mesh-gradient-2 absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[100px]" />
          <div className="mesh-gradient-3 absolute -bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-400/7 blur-[90px]" />
        </div>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />
        {/* Fade out at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-5xl mx-auto px-5 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground font-mono px-3 py-1.5 rounded-full border border-border/60 bg-card/50 mb-10"
            data-testid="badge-tagline"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            Open-source &nbsp;·&nbsp; Local-first &nbsp;·&nbsp; Apache 2.0
          </motion.div>

          {/* Headline */}
          <div className="mb-7 overflow-hidden">
            {["The research", "runtime for", "AI agents."].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <h1
                  className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] ${
                    i === 2
                      ? "bg-gradient-to-br from-primary via-violet-400 to-indigo-300 bg-clip-text text-transparent"
                      : "text-foreground"
                  }`}
                >
                  {line}
                </h1>
              </motion.div>
            ))}
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Search. Browse. Extract. Remember.{" "}
            <span className="text-foreground/70">
              OmniScout gives your agents the infrastructure to reason about the
              live web — without a SaaS subscription.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              data-testid="button-hero-install"
            >
              <code className="font-mono text-xs opacity-90">
                curl -sL omniscout.dev/install.sh | bash
              </code>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="https://github.com/omniscout"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 bg-card/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all backdrop-blur-sm"
              data-testid="button-hero-github"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 max-w-3xl w-full mx-auto px-5 mt-16 pb-20"
        >
          <div className="rounded-xl border border-border/50 bg-[hsl(222_22%_6%)] overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-[hsl(222_22%_5%)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-muted-foreground">
                omniscout run competitor_analysis.yaml
              </div>
            </div>
            {/* Terminal body */}
            <div className="p-5 space-y-0.5">
              <TerminalLine color="text-zinc-500" delay={1.0} inView={terminalInView}>
                $ omniscout run competitor_analysis
              </TerminalLine>
              <TerminalLine color="text-primary" delay={1.15} inView={terminalInView}>
                ▸ Initializing runtime v0.1.0
              </TerminalLine>
              <TerminalLine color="text-zinc-500" delay={1.25} inView={terminalInView}>
                &nbsp;&nbsp;Loading semantic memory from ~/.omniscout/db
              </TerminalLine>
              <TerminalLine color="text-zinc-500" delay={1.35} inView={terminalInView}>
                &nbsp;&nbsp;Spawning headless browser
              </TerminalLine>
              <div className="py-1" />
              <TerminalLine color="text-primary" delay={1.5} inView={terminalInView}>
                ▸ Step 1 — web_search("YC W25 AI agents")
              </TerminalLine>
              <TerminalLine color="text-zinc-500" delay={1.62} inView={terminalInView}>
                &nbsp;&nbsp;14 results · extracting top 3 pages
              </TerminalLine>
              <TerminalLine color="text-emerald-400" delay={1.74} inView={terminalInView}>
                &nbsp;&nbsp;✓ parsed 3 URLs → clean markdown
              </TerminalLine>
              <div className="py-1" />
              <TerminalLine color="text-primary" delay={1.88} inView={terminalInView}>
                ▸ Step 2 — extract(schema: CompetitorProfile)
              </TerminalLine>
              <TerminalLine color="text-zinc-500" delay={2.0} inView={terminalInView}>
                &nbsp;&nbsp;[EXT] Acme AI — Funding: $2M, Model: local
              </TerminalLine>
              <TerminalLine color="text-zinc-500" delay={2.1} inView={terminalInView}>
                &nbsp;&nbsp;[EXT] Nexus Agent — Funding: unknown
              </TerminalLine>
              <div className="py-1" />
              <TerminalLine color="text-primary" delay={2.2} inView={terminalInView}>
                ▸ Step 3 — memory.store(chunks: 12)
              </TerminalLine>
              <TerminalLine color="text-emerald-400" delay={2.32} inView={terminalInView}>
                &nbsp;&nbsp;✓ Vectorized and stored to local Chroma
              </TerminalLine>
              <TerminalLine color="text-emerald-400/80" delay={2.44} inView={terminalInView}>
                &nbsp;&nbsp;✓ Report saved → ./output/report.md
              </TerminalLine>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-y border-border/30 bg-card/30">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 0, suffix: "", label: "Cloud dependencies" },
            { value: 100, suffix: "%", label: "Open source" },
            { value: 8, suffix: "", label: "Core primitives" },
            { value: 1, suffix: " binary", label: "Install and run" },
          ].map(({ value, suffix, label }, i) => (
            <FadeUp key={label} delay={i * 0.07} className="text-center">
              <div className="text-3xl font-bold text-foreground tabular-nums mb-1">
                <Counter to={value} suffix={suffix} />
              </div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                {label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="py-32 max-w-6xl mx-auto px-5">
        <FadeUp className="mb-16">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
            Capabilities
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Everything an agent needs.
              <br />
              <span className="text-muted-foreground font-normal">
                Stable primitives. No wrappers.
              </span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed md:text-right">
              OmniScout is the substrate — not the answer. You compose the
              reasoning; we handle the web.
            </p>
          </div>
        </FadeUp>

        <div className="gradient-divider mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            delay={0.0}
            icon={<Search className="w-5 h-5" />}
            title="Web Search & Retrieval"
            description="Aggregate search APIs, scrape clean markdown, and filter noise before passing to the LLM. Handles rate limits and anti-bot measures automatically."
          />
          <FeatureCard
            delay={0.05}
            icon={<Globe className="w-5 h-5" />}
            title="Browser Automation"
            description="Headless browser execution via Playwright. Agents click, scroll, type, and navigate dynamic SPAs — not just static HTML."
          />
          <FeatureCard
            delay={0.1}
            icon={<Code2 className="w-5 h-5" />}
            title="Structured Extraction"
            description="Turn messy DOMs into typed JSON. Define a schema, point OmniScout at a URL, get strongly-typed objects back."
          />
          <FeatureCard
            delay={0.15}
            icon={<Database className="w-5 h-5" />}
            title="Semantic Memory"
            description="Built-in vector store for persistent agent memory. Agents recall past research across sessions, deduplicate findings, and build cumulative knowledge."
          />
          <FeatureCard
            delay={0.2}
            icon={<HardDrive className="w-5 h-5" />}
            title="Local-First Execution"
            description="Runs entirely on your machine. Bring your own API keys or go fully offline with Ollama. Zero telemetry."
          />
          <FeatureCard
            delay={0.25}
            icon={<Cpu className="w-5 h-5" />}
            title="Agent Tooling API"
            description="Exposes a standard MCP interface. Drop it into LangChain, AutoGen, CrewAI, or your own Python agent in minutes."
          />
        </div>
      </section>

      {/* ── Architecture ── */}
      <section
        id="architecture"
        className="py-32 border-y border-border/30 bg-card/20"
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <FadeUp>
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
                Architecture
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Designed for
                <br />
                multi-step
                <br />
                <span className="text-muted-foreground font-normal">
                  workflows.
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                Most AI tools fail when research requires more than one Google
                search. OmniScout maintains context across deep rabbit holes,
                managing browser state and extraction schemas dynamically.
              </p>
              <ul className="space-y-5">
                {[
                  {
                    icon: <Zap className="w-4 h-4" />,
                    title: "Planning Engine",
                    desc: "Break complex goals into deterministic HTTP and browser steps. Retry logic included.",
                  },
                  {
                    icon: <Layers className="w-4 h-4" />,
                    title: "Execution Sandbox",
                    desc: "Run JS, intercept network requests, and manage auth state without leaking context.",
                  },
                  {
                    icon: <Shield className="w-4 h-4" />,
                    title: "Verification Loop",
                    desc: "Self-correcting pipelines that retry when selectors change or pages fail.",
                  },
                ].map(({ icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      {icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-0.5">
                        {title}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Right — workflow card */}
            <FadeUp delay={0.15}>
              <GlowCard className="relative">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/40">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5" />
                    research.yaml
                  </div>
                  <span className="text-xs font-mono text-primary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                    running
                  </span>
                </div>
                <WorkflowStep
                  status="done"
                  label="parse_intent()"
                  detail="goal: 'Find recent ML papers on agents'"
                />
                <WorkflowStep
                  status="done"
                  label="web_search()"
                  detail="arxiv.org · semanticscholar.org"
                />
                <WorkflowStep
                  status="done"
                  label="browser.navigate()"
                  detail="Opened 4 paper landing pages"
                />
                <WorkflowStep
                  status="active"
                  label="extract(schema: PaperSummary)"
                  detail="Processing PDF via PyMuPDF…"
                />
                <WorkflowStep
                  status="pending"
                  label="memory.store()"
                  detail="target: ~/.omniscout/db"
                />
                <WorkflowStep
                  status="pending"
                  label="report.export()"
                  detail="./output/ml_papers.md"
                />
              </GlowCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section id="use-cases" className="py-32 max-w-6xl mx-auto px-5">
        <FadeUp className="mb-16">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
            Use Cases
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built for deep,
            <br />
            multi-step exploration.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              num: "01",
              title: "Competitive Intelligence",
              desc: "Instruct OmniScout to find top competitors in a niche, scrape their pricing pages, extract data into a typed schema, and synthesize a competitive matrix — all in one workflow.",
            },
            {
              num: "02",
              title: "GitHub Issue Triage",
              desc: "Feed OmniScout a repository. It pulls open issues, reads relevant docs from external domains, and suggests fixes grounded in its persistent memory of past research.",
            },
            {
              num: "03",
              title: "Due Diligence",
              desc: "Automate startup analysis. Crawl LinkedIn profiles, recent news, and filings to generate a comprehensive briefing document — repeatable and auditable.",
            },
            {
              num: "04",
              title: "Living Research Memory",
              desc: "Run OmniScout on a schedule. Read hundreds of sources daily, deduplicate via vector search, and compile a tailored digest that accumulates knowledge over time.",
            },
          ].map(({ num, title, desc }, i) => (
            <FadeUp key={num} delay={i * 0.08}>
              <GlowCard className="h-full group cursor-default">
                <div className="text-xs font-mono text-muted-foreground/50 mb-4">
                  {num}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </GlowCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Code ── */}
      <section className="py-32 border-y border-border/30 bg-card/20">
        <div className="max-w-4xl mx-auto px-5">
          <FadeUp className="text-center mb-12">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              Developer Experience
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Integrates in minutes.
            </h2>
            <p className="text-muted-foreground text-sm font-mono">
              Runs as a local daemon. Connect via HTTP or standard SDKs.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-xl border border-border/50 overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-4 px-5 py-3 border-b border-border/40 bg-[hsl(222_22%_5%)]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                  <span className="text-foreground border-b border-primary pb-[11px] -mb-[12px]">
                    python
                  </span>
                  <span className="opacity-50">typescript</span>
                  <span className="opacity-50">yaml</span>
                </div>
              </div>
              <div className="p-6 bg-[hsl(222_22%_6%)] overflow-x-auto">
                <pre className="text-sm font-mono leading-7">
                  <code>
                    <span className="text-violet-400">from</span>
                    <span className="text-zinc-300"> omniscout </span>
                    <span className="text-violet-400">import</span>
                    <span className="text-zinc-300"> OmniClient</span>
                    {"\n\n"}
                    <span className="text-zinc-600"># Connect to local daemon</span>
                    {"\n"}
                    <span className="text-zinc-300">client = OmniClient(host=</span>
                    <span className="text-emerald-300">"localhost:8080"</span>
                    <span className="text-zinc-300">)</span>
                    {"\n\n"}
                    <span className="text-zinc-600"># Run a multi-step research workflow</span>
                    {"\n"}
                    <span className="text-zinc-300">result = client.research(</span>
                    {"\n"}
                    <span className="text-zinc-300">{"    "}goal=</span>
                    <span className="text-emerald-300">
                      "Compare pricing: Stripe vs PayPal API"
                    </span>
                    <span className="text-zinc-300">,</span>
                    {"\n"}
                    <span className="text-zinc-300">{"    "}tools=[</span>
                    <span className="text-emerald-300">"browser"</span>
                    <span className="text-zinc-300">, </span>
                    <span className="text-emerald-300">"extractor"</span>
                    <span className="text-zinc-300">],</span>
                    {"\n"}
                    <span className="text-zinc-300">{"    "}schema=PricingSchema</span>
                    {"\n"}
                    <span className="text-zinc-300">)</span>
                    {"\n\n"}
                    <span className="text-sky-400">print</span>
                    <span className="text-zinc-300">(result.json())</span>
                  </code>
                </pre>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Local-first CTA ── */}
      <section className="py-32 max-w-6xl mx-auto px-5">
        <FadeUp>
          <div className="relative rounded-2xl border border-border/40 bg-card overflow-hidden p-10 md:p-16 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 blur-[80px] rounded-full" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-6">
                <Shield className="w-3.5 h-3.5" />
                Local-first by design
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Your keys.
                <br />
                Your data.
                <br />
                <span className="text-muted-foreground font-normal">
                  Your hardware.
                </span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10 text-sm md:text-base">
                OmniScout is not a SaaS. It is an open-source binary you run on
                your own infrastructure. No telemetry. No hidden API calls.
                Complete privacy for sensitive research.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                  data-testid="button-cta-install"
                >
                  Install OmniScout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all"
                  data-testid="link-cta-docs"
                >
                  <BookOpen className="w-4 h-4" />
                  Read the docs
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 bg-card/20 py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center flex-shrink-0">
                  <Search className="w-3 h-3 text-white" />
                </div>
                <span className="font-semibold text-sm">OmniScout</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs font-mono">
                The open-source, local-first runtime
                <br />
                for autonomous AI research agents.
              </p>
            </div>
            {[
              {
                heading: "Product",
                links: ["Features", "Architecture", "Roadmap", "Changelog"],
              },
              {
                heading: "Resources",
                links: ["Documentation", "GitHub", "Discord", "Examples"],
              },
              {
                heading: "Legal",
                links: ["Privacy", "Terms", "License"],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">
                  {heading}
                </div>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="gradient-divider mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
            <span>© 2025 OmniScout. Apache 2.0 License.</span>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/omniscout"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-1.5"
                data-testid="link-footer-github"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
