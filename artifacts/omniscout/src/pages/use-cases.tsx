import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart2,
  Github,
  Newspaper,
  BookOpen,
  TrendingUp,
  FlaskConical,
  Building2,
  ArrowRight,
  Terminal,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
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

interface UseCase {
  number: string;
  tag: string;
  title: string;
  description: string;
  workflow: { step: string; detail: string }[];
  imageUrl: string;
  timeEstimate: string;
  icon: React.ReactNode;
}

const cases: UseCase[] = [
  {
    number: "01",
    tag: "Research",
    title: "Multi-step research from the CLI.",
    description:
      "Run omniscout research on a question. The pipeline searches, crawls, extracts, embeds into Qdrant, reranks, and summarizes — then your agent reads JSON passages with source URLs.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    timeEstimate: "one command",
    icon: <BarChart2 className="w-5 h-5" />,
    workflow: [
      { step: "omniscout research", detail: "\"open-source browser agents 2026\" --results 10" },
      { step: "jq / agent", detail: "summarize top passages + URLs" },
      { step: "omniscout search", detail: "--source memory for follow-ups" },
      { step: "omniscout memory stats", detail: "inspect index size" },
    ],
  },
  {
    number: "02",
    tag: "Browser loop",
    title: "Search, open, snapshot, click.",
    description:
      "The core agent loop from the docs: search the web, open result 1 from the latest search (never a tab index), snapshot @eN refs, then click or fill.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&q=80",
    timeEstimate: "agent-driven",
    icon: <Github className="w-5 h-5" />,
    workflow: [
      { step: "omniscout search", detail: "\"YC W25 AI agents\"" },
      { step: "omniscout open 1", detail: "first hit from latest search" },
      { step: "omniscout browser snapshot", detail: "--refs-only → @eN tree" },
      { step: "omniscout browser click", detail: "'@e3'" },
      { step: "omniscout context", detail: "workflow state for the agent" },
    ],
  },
  {
    number: "03",
    tag: "Read & answer",
    title: "Extract a page and answer questions.",
    description:
      "Open a docs URL with the browser or call omniscout extract directly. Your agent reads markdown output and answers with citations from the page text.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80",
    timeEstimate: "extract + LLM",
    icon: <Newspaper className="w-5 h-5" />,
    workflow: [
      { step: "omniscout extract", detail: "https://docs.python.org/... --format markdown" },
      { step: "agent reads", detail: "/tmp/page.md or stdout" },
      { step: "omniscout search", detail: "\"asyncio.gather\" --answer" },
      { step: "omniscout remember", detail: "index for later recall" },
    ],
  },
  {
    number: "04",
    tag: "Memory",
    title: "Remember docs, search memory later.",
    description:
      "Explicit memory only — navigate does not auto-index. Use remember on URLs, add notes, then search with --source memory or list entries with memory list.",
    imageUrl: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=900&q=80",
    timeEstimate: "persistent",
    icon: <FlaskConical className="w-5 h-5" />,
    workflow: [
      { step: "omniscout remember", detail: "https://docs.python.org" },
      { step: "omniscout remember", detail: "https://docs.anthropic.com --note \"API\"" },
      { step: "omniscout search", detail: "\"taskgroup\" --source memory" },
      { step: "omniscout memory show", detail: "<id> for full entry" },
    ],
  },
  {
    number: "05",
    tag: "Auth & CAPTCHA",
    title: "Login once, reuse the profile.",
    description:
      "browser login opens a headful tab for you to authenticate; --done saves the profile. captcha detects challenges and blocks for local solve by default; 2captcha is opt-in.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    timeEstimate: "per site",
    icon: <Building2 className="w-5 h-5" />,
    workflow: [
      { step: "omniscout browser login", detail: "https://github.com --profile work" },
      { step: "omniscout browser login", detail: "--done" },
      { step: "omniscout browser captcha", detail: "--detect-only" },
      { step: "omniscout browser navigate", detail: "reuse work profile" },
    ],
  },
  {
    number: "06",
    tag: "Debugging",
    title: "Trace, replay, and parallel sessions.",
    description:
      "daemon trace and replay inspect actions.jsonl. Run parallel screenshots across named sessions. workflow export packages sessions for sharing or debugging.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    timeEstimate: "observability",
    icon: <BookOpen className="w-5 h-5" />,
    workflow: [
      { step: "omniscout daemon trace", detail: "tail action log" },
      { step: "omniscout daemon replay", detail: "re-run captured steps" },
      { step: "omniscout browser screenshot", detail: "--out /tmp/state.png" },
      { step: "omniscout workflow export", detail: "session artifact" },
    ],
  },
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <PageHeroGlow />

        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <FadeUp>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              Use Cases
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Recipes from
              <br />
              <span className="text-muted-foreground font-normal">
                the documentation.
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed text-lg">
              Each workflow maps to copy-paste commands in the docs — hand the
              prompt to Claude Code, Cursor, or Codex, or run the shell yourself.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Use case cards */}
      <section className="pb-10 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5">
          {cases.map((uc, i) => (
            <FadeUp key={uc.number} delay={0.05} className="py-16 border-b border-border/20 last:border-0">
              <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
                <div className="lg:[direction:ltr]">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono text-muted-foreground/40">
                      {uc.number}
                    </span>
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      {uc.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-0.5 w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {uc.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                      {uc.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    {uc.description}
                  </p>

                  <div className="border border-border/40 bg-card rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/50">
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <Terminal className="w-3.5 h-3.5" />
                        example commands
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {uc.timeEstimate}
                      </div>
                    </div>
                    {uc.workflow.map((step, si) => (
                      <motion.div
                        key={`${uc.number}-${si}`}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: si * 0.06 }}
                        className="flex items-center gap-3 px-4 py-2.5 border-b border-border/20 last:border-0 hover:bg-card/50 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <code className="text-xs font-mono text-primary min-w-[130px]">
                          {step.step}
                        </code>
                        <span className="text-xs text-muted-foreground truncate">
                          {step.detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:[direction:ltr]">
                  <div className="relative rounded-xl overflow-hidden border border-border/30 shadow-2xl shadow-black/40">
                    <img
                      src={uc.imageUrl}
                      alt={uc.tag}
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono text-foreground/50 bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border/30">
                        {uc.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-foreground/70">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        CLI + daemon · JSON output · Local-first
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/30 bg-card/20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Start with the docs recipes.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              pip install omniscout, run omniscout install --skill, then paste a
              prompt from the examples page into your agent — or run the shell
              commands directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/sriramramnath/omniscout/tree/main/docs"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                data-testid="button-usecases-docs"
              >
                Read the docs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/compare"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all"
                data-testid="link-usecases-compare"
              >
                Compare to alternatives
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
