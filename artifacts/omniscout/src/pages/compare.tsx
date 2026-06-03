import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Check, X, Minus, ArrowRight, Terminal } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { Link } from "wouter";

/* ─── Helpers ───────────────────────────────────────────────────── */
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

/* ─── Data (qualitative positioning — not benchmark scores) ─────── */
const radarData = [
  {
    metric: "Local control",
    OmniScout: 100,
    Hosted: 15,
    Vendor: 25,
    DIY: 70,
  },
  {
    metric: "Browser depth",
    OmniScout: 95,
    Hosted: 85,
    Vendor: 90,
    DIY: 45,
  },
  {
    metric: "Agent CLI",
    OmniScout: 100,
    Hosted: 40,
    Vendor: 35,
    DIY: 50,
  },
  {
    metric: "Search + memory",
    OmniScout: 90,
    Hosted: 30,
    Vendor: 40,
    DIY: 55,
  },
  {
    metric: "BYO LLM",
    OmniScout: 100,
    Hosted: 80,
    Vendor: 10,
    DIY: 95,
  },
  {
    metric: "No signup",
    OmniScout: 100,
    Hosted: 20,
    Vendor: 50,
    DIY: 90,
  },
];

const workflowFit = [
  { workflow: "Search → open → snapshot", OmniScout: 5, Hosted: 3, Vendor: 4, DIY: 2 },
  { workflow: "Multi-step research", OmniScout: 5, Hosted: 2, Vendor: 3, DIY: 3 },
  { workflow: "Real Chrome logins", OmniScout: 5, Hosted: 4, Vendor: 5, DIY: 2 },
  { workflow: "Remember & recall", OmniScout: 5, Hosted: 1, Vendor: 2, DIY: 2 },
  { workflow: "Shell agent drives it", OmniScout: 5, Hosted: 3, Vendor: 2, DIY: 3 },
];

const featureMatrix = [
  {
    category: "Execution model",
    features: [
      {
        name: "Runs locally (no hosted browser required)",
        os: true,
        hosted: false,
        vendor: "partial",
        diy: "partial",
      },
      {
        name: "Bring your own LLM (not tied to one vendor)",
        os: true,
        hosted: true,
        vendor: false,
        diy: true,
      },
      {
        name: "CLI is the public interface (no SDK required)",
        os: true,
        hosted: "partial",
        vendor: false,
        diy: "partial",
      },
      {
        name: "pip install + local daemon",
        os: true,
        hosted: false,
        vendor: false,
        diy: "partial",
      },
    ],
  },
  {
    category: "Browser & web",
    features: [
      {
        name: "Long-lived daemon (sub-second actions)",
        os: true,
        hosted: true,
        vendor: true,
        diy: false,
      },
      {
        name: "@eN accessibility-tree refs",
        os: true,
        hosted: "partial",
        vendor: true,
        diy: false,
      },
      {
        name: "Drive user's real Chrome (extension backend)",
        os: true,
        hosted: false,
        vendor: true,
        diy: false,
      },
      {
        name: "Semantic search + local Qdrant index",
        os: true,
        hosted: false,
        vendor: "partial",
        diy: "partial",
      },
      {
        name: "omniscout research pipeline",
        os: true,
        hosted: false,
        vendor: "partial",
        diy: "partial",
      },
    ],
  },
  {
    category: "Agent integration",
    features: [
      {
        name: "JSON-in / JSON-out (--json)",
        os: true,
        hosted: "partial",
        vendor: "partial",
        diy: false,
      },
      {
        name: "Agent skill install (Claude, Cursor, Codex)",
        os: true,
        hosted: false,
        vendor: false,
        diy: false,
      },
      {
        name: "MCP server shipped",
        os: false,
        hosted: "partial",
        vendor: "partial",
        diy: "partial",
      },
      {
        name: "Vendor owns full agent loop",
        os: false,
        hosted: false,
        vendor: true,
        diy: false,
      },
    ],
  },
];

type CellValue = boolean | "partial";

function Cell({ val }: { val: CellValue }) {
  if (val === true)
    return (
      <div className="flex items-center justify-center">
        <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
          <Check className="w-3 h-3 text-primary" />
        </span>
      </div>
    );
  if (val === "partial")
    return (
      <div className="flex items-center justify-center">
        <span className="w-5 h-5 rounded-full bg-yellow-500/10 flex items-center justify-center">
          <Minus className="w-3 h-3 text-yellow-400" />
        </span>
      </div>
    );
  return (
    <div className="flex items-center justify-center">
      <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
        <X className="w-3 h-3 text-zinc-600" />
      </span>
    </div>
  );
}

const COLORS = {
  OmniScout: "#687FF3",
  Hosted: "hsl(30 85% 55%)",
  Vendor: "hsl(160 55% 45%)",
  DIY: "hsl(262 70% 60%)",
};

const heroStackOptions = [
  {
    name: "OmniScout",
    color: COLORS.OmniScout,
    tag: "Local actuator",
    detail: "Shell agent → CLI → daemon → your browser",
    highlight: true,
  },
  {
    name: "Hosted browsers",
    color: COLORS.Hosted,
    tag: "Cloud fleet",
    detail: "API signup → remote session → per-minute billing",
    highlight: false,
  },
  {
    name: "Vendor-integrated",
    color: COLORS.Vendor,
    tag: "Full loop",
    detail: "Kimi · Claude for Chrome · ChatGPT Atlas",
    highlight: false,
  },
  {
    name: "DIY scrapers",
    color: COLORS.DIY,
    tag: "Glue code",
    detail: "LangChain + Playwright + custom memory",
    highlight: false,
  },
] as const;

function CompareHeroPanel() {
  return (
    <div className="rounded-xl border border-border/50 bg-[hsl(222_22%_6%)] overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-[hsl(222_22%_5%)]">
        <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-mono text-muted-foreground">
          stack at a glance
        </span>
      </div>
      <div className="p-4 space-y-2">
        {heroStackOptions.map((option) => (
          <div
            key={option.name}
            className={`rounded-lg border px-3 py-2.5 transition-colors ${
              option.highlight
                ? "border-primary/40 bg-primary/10"
                : "border-border/40 bg-card/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: option.color }}
              />
              <span
                className={`text-sm font-medium ${
                  option.highlight ? "text-foreground" : "text-foreground/80"
                }`}
              >
                {option.name}
              </span>
              <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {option.tag}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed pl-4">
              {option.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-border/40 bg-card/30">
        <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
          <span className="text-primary">→</span> OmniScout when the agent already
          has a shell and you want JSON-in, JSON-out control.
        </p>
      </div>
    </div>
  );
}

const customTooltipStyle = {
  backgroundColor: "hsl(222 22% 7%)",
  border: "1px solid hsl(222 16% 18%)",
  borderRadius: "8px",
  color: "hsl(210 20% 96%)",
  fontSize: "12px",
  fontFamily: "var(--app-font-mono)",
};

export default function Compare() {
  const radarRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const radarInView = useInView(radarRef, { once: true, margin: "-80px" });
  const barInView = useInView(barRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <PageHeroGlow />

        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-[1fr_minmax(280px,380px)] gap-10 lg:gap-14 items-center">
            <FadeUp>
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
                Comparison
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                When to use
                <br />
                <span className="text-muted-foreground font-normal">
                  OmniScout.
                </span>
              </h1>
              <p className="text-muted-foreground max-w-xl leading-relaxed text-lg mb-8">
                Use OmniScout when you want a local browser actuator any shell agent
                can drive — without a Node MCP server or a cloud-browser signup. Use
                hosted browsers when you need a fleet; use Kimi WebBridge, Claude for
                Chrome, or ChatGPT Atlas when one vendor should own the full loop.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground lg:hidden">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS.OmniScout }} />
                  OmniScout
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS.Hosted }} />
                  Hosted (Browserbase, etc.)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS.Vendor }} />
                  Vendor-integrated
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS.DIY }} />
                  DIY scrapers
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.12} className="hidden lg:block">
              <CompareHeroPanel />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Radar chart */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
                Positioning
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Local actuator,
                <br />
                not another chatbot.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                Charts show qualitative fit from the docs — not published
                benchmark scores. OmniScout deliberately does not own the
                reasoning loop; it exposes search, browser, extract, and memory
                as CLI commands.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground max-w-md">
                <li>
                  <span className="text-foreground font-medium">vs Browserbase / Hyperbrowser:</span>{" "}
                  local Playwright instead of per-minute hosted sessions.
                </li>
                <li>
                  <span className="text-foreground font-medium">vs Exa-style search APIs:</span>{" "}
                  local semantic retrieval with embedded Qdrant.
                </li>
                <li>
                  <span className="text-foreground font-medium">vs Kimi / Claude / Atlas:</span>{" "}
                  same browser surface, any LLM you choose.
                </li>
              </ul>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div
                ref={radarRef}
                className="border border-border/40 bg-card rounded-xl p-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={radarInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ResponsiveContainer width="100%" height={340}>
                    <RadarChart data={radarData}>
                      <PolarGrid
                        stroke="hsl(222 16% 18%)"
                        strokeDasharray="3 3"
                      />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: "hsl(220 12% 52%)", fontSize: 11, fontFamily: "var(--app-font-mono)" }}
                      />
                      <Radar
                        name="Hosted"
                        dataKey="Hosted"
                        stroke={COLORS.Hosted}
                        fill={COLORS.Hosted}
                        fillOpacity={0.1}
                        strokeWidth={1.5}
                        isAnimationActive={radarInView}
                        animationDuration={800}
                      />
                      <Radar
                        name="Vendor"
                        dataKey="Vendor"
                        stroke={COLORS.Vendor}
                        fill={COLORS.Vendor}
                        fillOpacity={0.1}
                        strokeWidth={1.5}
                        isAnimationActive={radarInView}
                        animationDuration={900}
                        animationBegin={100}
                      />
                      <Radar
                        name="DIY"
                        dataKey="DIY"
                        stroke={COLORS.DIY}
                        fill={COLORS.DIY}
                        fillOpacity={0.1}
                        strokeWidth={1.5}
                        isAnimationActive={radarInView}
                        animationDuration={900}
                        animationBegin={150}
                      />
                      <Radar
                        name="OmniScout"
                        dataKey="OmniScout"
                        stroke={COLORS.OmniScout}
                        fill={COLORS.OmniScout}
                        fillOpacity={0.2}
                        strokeWidth={2.5}
                        isAnimationActive={radarInView}
                        animationDuration={1000}
                        animationBegin={200}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "11px", fontFamily: "var(--app-font-mono)", color: "hsl(220 12% 52%)" }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Workflow fit chart */}
      <section className="py-20 border-t border-border/30 bg-card/20">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp className="mb-12 text-center">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Workflow fit
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
              Common agent workflows.
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Scale 1–5 reflects how well each approach matches documented
              OmniScout recipes (search → open → snapshot, research, remember).
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              ref={barRef}
              className="border border-border/40 bg-card rounded-xl p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={barInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart
                    data={workflowFit}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    barCategoryGap="28%"
                    barGap={3}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(222 16% 13%)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="workflow"
                      tick={{ fill: "hsl(220 12% 52%)", fontSize: 10, fontFamily: "var(--app-font-mono)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 5]}
                      tick={{ fill: "hsl(220 12% 52%)", fontSize: 11, fontFamily: "var(--app-font-mono)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={customTooltipStyle}
                      cursor={{ fill: "hsl(222 16% 13%)" }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px", fontFamily: "var(--app-font-mono)", color: "hsl(220 12% 52%)", paddingTop: "12px" }}
                    />
                    <Bar
                      dataKey="Hosted"
                      fill={COLORS.Hosted}
                      radius={[3, 3, 0, 0]}
                      fillOpacity={0.8}
                      isAnimationActive={barInView}
                      animationDuration={800}
                    />
                    <Bar
                      dataKey="Vendor"
                      fill={COLORS.Vendor}
                      radius={[3, 3, 0, 0]}
                      fillOpacity={0.8}
                      isAnimationActive={barInView}
                      animationDuration={800}
                      animationBegin={100}
                    />
                    <Bar
                      dataKey="DIY"
                      fill={COLORS.DIY}
                      radius={[3, 3, 0, 0]}
                      fillOpacity={0.8}
                      isAnimationActive={barInView}
                      animationDuration={800}
                      animationBegin={150}
                    />
                    <Bar
                      dataKey="OmniScout"
                      fill={COLORS.OmniScout}
                      radius={[3, 3, 0, 0]}
                      isAnimationActive={barInView}
                      animationDuration={900}
                      animationBegin={200}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Use OmniScout", value: "Local CLI", sub: "any shell-capable agent" },
              { label: "Use hosted browsers", value: "Fleet scale", sub: "when per-minute cost is OK" },
              { label: "Use vendor tools", value: "Full loop", sub: "when you picked one LLM vendor" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="border border-border/40 bg-card rounded-lg px-5 py-4 text-center">
                <div className="text-xl font-bold text-primary mb-1">{value}</div>
                <div className="text-xs font-semibold text-foreground mb-0.5">{label}</div>
                <div className="text-xs text-muted-foreground font-mono">{sub}</div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* Feature matrix */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp className="mb-12">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Feature matrix
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              Capabilities from the docs.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="border border-border/40 rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 bg-card border-b border-border/40">
                <div className="col-span-1 px-5 py-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Feature
                </div>
                {[
                  { name: "OmniScout", color: COLORS.OmniScout, key: "os" },
                  { name: "Hosted", color: COLORS.Hosted, key: "hosted" },
                  { name: "Vendor", color: COLORS.Vendor, key: "vendor" },
                  { name: "DIY", color: COLORS.DIY, key: "diy" },
                ].map(({ name, color }) => (
                  <div key={name} className="px-3 py-4 text-center">
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              {featureMatrix.map(({ category, features }, gi) => (
                <div key={category}>
                  <div className="px-5 py-3 bg-card/50 border-b border-border/30">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      {category}
                    </span>
                  </div>
                  {features.map(({ name, os, hosted, vendor, diy }, fi) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (gi * 4 + fi) * 0.03 }}
                      className="grid grid-cols-5 border-b border-border/20 last:border-0 hover:bg-card/30 transition-colors"
                    >
                      <div className="col-span-1 px-5 py-3.5 text-sm text-muted-foreground">
                        {name}
                      </div>
                      <div className="px-3 py-3.5"><Cell val={os as CellValue} /></div>
                      <div className="px-3 py-3.5"><Cell val={hosted as CellValue} /></div>
                      <div className="px-3 py-3.5"><Cell val={vendor as CellValue} /></div>
                      <div className="px-3 py-3.5"><Cell val={diy as CellValue} /></div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-primary" /> Supported
              </span>
              <span className="flex items-center gap-1.5">
                <Minus className="w-3 h-3 text-yellow-400" /> Partial
              </span>
              <span className="flex items-center gap-1.5">
                <X className="w-3 h-3 text-zinc-600" /> Not supported
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/30 bg-card/20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Try the local actuator.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              pip install omniscout · omniscout install --skill · Python 3.11+.
              Early development — core focus is stable CLI and reliable browser
              execution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                data-testid="button-compare-cta"
              >
                Get started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/features"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all"
                data-testid="link-compare-features"
              >
                Explore all features
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
