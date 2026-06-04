import { motion, useInView, animate } from "framer-motion";
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
} from "lucide-react";
import { useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroCanvasBackground } from "@/components/layout/hero-canvas-background";
import { HeroTerminal } from "@/components/layout/hero-terminal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CopyInstallButton } from "@/components/ui/copy-install-button";

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
  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/25 overflow-x-hidden">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 md:pt-28">
        <HeroCanvasBackground />

        <div className="relative z-10">
          <ContainerScroll
            className="px-2 md:px-5"
            titleComponent={
              <div className="px-3 text-center">
                <div className="mb-7 overflow-hidden">
                  {["Give your AI agent", "a browser.", "No SDK. No cloud."].map((line, i) => (
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
                        className={`text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl ${
                          i === 1 ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {line}
                      </h1>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl"
                >
                  Navigate, search, extract, and remember — through a local CLI and
                  daemon.{" "}
                  <span className="text-foreground/70">
                    Same browser-control surface as Kimi WebBridge or Claude for Chrome,
                    but you bring the LLM. No hosted browsers. No MCP server yet.
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="relative z-20 mb-10 flex flex-col items-center justify-center gap-3 sm:mb-12 sm:flex-row md:mb-14"
                >
                  <CopyInstallButton testId="button-hero-install" />
                  <a
                    href="https://github.com/sriramramnath/omniscout"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-5 py-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:text-foreground"
                    data-testid="button-hero-github"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </motion.div>
              </div>
            }
          >
            <HeroTerminal />
          </ContainerScroll>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-y border-border/30 bg-card/30">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 7720, suffix: "", label: "Default daemon port" },
            { value: 2, suffix: "", label: "Browser backends" },
            { value: 0, suffix: "", label: "Required cloud APIs" },
            { value: 1, suffix: "", label: "CLI interface" },
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
            title="Semantic Search"
            description="DuckDuckGo retrieval with optional local embedding rerank. Sources include ddg, index, memory, and hybrid. One-sentence answer mode with --answer."
          />
          <FeatureCard
            delay={0.05}
            icon={<Globe className="w-5 h-5" />}
            title="Browser Automation"
            description="Long-lived daemon with Playwright (default) or your real Chrome via extension. navigate, snapshot, click, fill, scroll, screenshot, network, login, captcha — JSON in, JSON out."
          />
          <FeatureCard
            delay={0.1}
            icon={<Code2 className="w-5 h-5" />}
            title="Content Extraction"
            description="omniscout extract turns URLs into markdown, plain text, or JSON with metadata and links. Page cache avoids redundant fetches."
          />
          <FeatureCard
            delay={0.15}
            icon={<Database className="w-5 h-5" />}
            title="Browser Memory"
            description="Explicit remember and memory commands index visits and notes into local Qdrant + SQLite. Search with --source memory to recall prior research."
          />
          <FeatureCard
            delay={0.2}
            icon={<HardDrive className="w-5 h-5" />}
            title="Local-First Execution"
            description="Daemon and browser profiles stay on your machine. Search hits DuckDuckGo; everything else can run offline after fetch. No hosted browser sessions."
          />
          <FeatureCard
            delay={0.25}
            icon={<Cpu className="w-5 h-5" />}
            title="Agent-Native CLI"
            description="No SDK required — the CLI is the public interface. Install drops a skill into Claude Code, Cursor, and Codex. MCP support is planned, not shipped yet."
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
                A long-lived daemon at 127.0.0.1:7720 keeps Playwright warm so
                per-action latency stays sub-second. Agents drive the browser with
                stable @eN refs from the accessibility tree.
              </p>
              <ul className="space-y-5">
                {[
                  {
                    icon: <Zap className="w-4 h-4" />,
                    title: "Long-lived daemon",
                    desc: "HTTP POST /command on port 7720. Auto-starts on browser and search commands unless disabled.",
                  },
                  {
                    icon: <Layers className="w-4 h-4" />,
                    title: "@eN snapshot refs",
                    desc: "Prefer accessibility-tree refs over brittle CSS. Same convention as Kimi WebBridge.",
                  },
                  {
                    icon: <Shield className="w-4 h-4" />,
                    title: "Persistent profiles",
                    desc: "Log in once per profile; cookies and sessions survive between agent invocations.",
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
                    agent session
                  </div>
                  <span className="text-xs font-mono text-primary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                    running
                  </span>
                </div>
                <WorkflowStep
                  status="done"
                  label="omniscout research"
                  detail="search → crawl → extract → index → summarize"
                />
                <WorkflowStep
                  status="done"
                  label="omniscout search"
                  detail="ddg + local embeddings + rerank"
                />
                <WorkflowStep
                  status="done"
                  label="omniscout browser navigate"
                  detail="Playwright or extension backend"
                />
                <WorkflowStep
                  status="active"
                  label="omniscout browser snapshot"
                  detail="accessibility tree with @eN refs"
                />
                <WorkflowStep
                  status="pending"
                  label="omniscout remember"
                  detail="Qdrant + memory.sqlite"
                />
                <WorkflowStep
                  status="pending"
                  label="omniscout workflow export"
                  detail="replay agent actions from JSONL log"
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
              title: "Multi-step research",
              desc: "Run omniscout research on a topic — search, crawl, extract, embed into Qdrant, rerank, and summarize passages with source URLs.",
            },
            {
              num: "02",
              title: "Search → open → act",
              desc: "Search the web, open result 1 from the latest search, snapshot @eN refs, then click or fill — the core agent loop from the docs.",
            },
            {
              num: "03",
              title: "Read and answer from a page",
              desc: "Navigate or extract a docs URL, pull markdown with omniscout extract, and let your agent answer questions grounded in page content.",
            },
            {
              num: "04",
              title: "Remember and recall",
              desc: "Index URLs with omniscout remember, then search memory later with --source memory. Visits and notes persist across sessions.",
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
              Install in two commands.
            </h2>
            <p className="text-muted-foreground text-sm font-mono">
              pip install omniscout · omniscout install --skill
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
                    shell
                  </span>
                  <span className="opacity-50">agent prompt</span>
                </div>
              </div>
              <div className="p-6 bg-[hsl(222_22%_6%)] overflow-x-auto">
                <pre className="text-sm font-mono leading-7">
                  <code>
                    <span className="text-zinc-600"># Install (Python 3.11+)</span>
                    {"\n"}
                    <span className="text-zinc-300">pip install omniscout</span>
                    {"\n"}
                    <span className="text-zinc-300">omniscout install --skill</span>
                    {"\n\n"}
                    <span className="text-zinc-600"># Agent-style JSON output</span>
                    {"\n"}
                    <span className="text-zinc-300">omniscout daemon start</span>
                    {"\n"}
                    <span className="text-zinc-300">OMNISCOUT_JSON=1 omniscout browser navigate </span>
                    <span className="text-emerald-300">https://example.com</span>
                    {"\n"}
                    <span className="text-zinc-300">OMNISCOUT_JSON=1 omniscout browser snapshot --refs-only</span>
                    {"\n"}
                    <span className="text-zinc-300">OMNISCOUT_JSON=1 omniscout browser click </span>
                    <span className="text-emerald-300">'@e1'</span>
                    {"\n\n"}
                    <span className="text-zinc-600"># Research + memory</span>
                    {"\n"}
                    <span className="text-zinc-300">omniscout research </span>
                    <span className="text-emerald-300">"state of local AI agents"</span>
                    {"\n"}
                    <span className="text-zinc-300">omniscout remember </span>
                    <span className="text-emerald-300">https://docs.python.org</span>
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
                OmniScout is not a SaaS or hosted browser product. Profiles,
                caches, and indexes live under ~/Library/Application Support/omniscout/
                on macOS. Search uses DuckDuckGo; CAPTCHA solvers are opt-in.
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
                  href="https://omniscout-docs.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
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

      <Footer />
    </div>
  );
}
