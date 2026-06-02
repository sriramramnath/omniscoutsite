import { useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect } from "react";
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
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
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

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Data ──────────────────────────────────────────────────────── */
const radarData = [
  { metric: "Local Execution", OmniScout: 100, ChatGPT: 0, LangChain: 65, AutoGPT: 30 },
  { metric: "Memory", OmniScout: 95, ChatGPT: 20, LangChain: 75, AutoGPT: 55 },
  { metric: "Extraction", OmniScout: 96, ChatGPT: 60, LangChain: 80, AutoGPT: 50 },
  { metric: "Web Depth", OmniScout: 100, ChatGPT: 30, LangChain: 70, AutoGPT: 75 },
  { metric: "Reproducibility", OmniScout: 100, ChatGPT: 15, LangChain: 72, AutoGPT: 45 },
  { metric: "Privacy", OmniScout: 100, ChatGPT: 10, LangChain: 60, AutoGPT: 25 },
];

const barData = [
  { task: "Competitor Analysis", OmniScout: 94, ChatGPT: 38, LangChain: 67 },
  { task: "GitHub Triage", OmniScout: 91, ChatGPT: 45, LangChain: 71 },
  { task: "News Digest", OmniScout: 97, ChatGPT: 52, LangChain: 74 },
  { task: "Due Diligence", OmniScout: 89, ChatGPT: 29, LangChain: 60 },
  { task: "Doc Summarization", OmniScout: 93, ChatGPT: 68, LangChain: 76 },
];

const featureMatrix = [
  {
    category: "Execution",
    features: [
      { name: "Runs locally (no cloud required)", os: true, gpt: false, lc: "partial", ag: false },
      { name: "BYO LLM / API keys", os: true, gpt: false, lc: true, ag: "partial" },
      { name: "Fully offline mode (Ollama)", os: true, gpt: false, lc: "partial", ag: false },
      { name: "Single binary install", os: true, gpt: true, lc: false, ag: false },
    ],
  },
  {
    category: "Web Access",
    features: [
      { name: "Real-time web search", os: true, gpt: "partial", lc: "partial", ag: true },
      { name: "Full browser navigation", os: true, gpt: false, lc: "partial", ag: true },
      { name: "Dynamic JS page handling", os: true, gpt: false, lc: "partial", ag: "partial" },
      { name: "Structured extraction (typed schemas)", os: true, gpt: false, lc: "partial", ag: false },
    ],
  },
  {
    category: "Memory & Workflows",
    features: [
      { name: "Persistent semantic memory", os: true, gpt: false, lc: "partial", ag: "partial" },
      { name: "Cross-session knowledge retention", os: true, gpt: false, lc: "partial", ag: false },
      { name: "Reproducible YAML workflows", os: true, gpt: false, lc: "partial", ag: false },
      { name: "Workflow export & replay", os: true, gpt: false, lc: false, ag: false },
    ],
  },
  {
    category: "Developer Integration",
    features: [
      { name: "MCP (Model Context Protocol) API", os: true, gpt: false, lc: false, ag: false },
      { name: "Python / TypeScript SDK", os: true, gpt: true, lc: true, ag: "partial" },
      { name: "LangChain / AutoGen compatible", os: true, gpt: false, lc: true, ag: true },
      { name: "Open source (Apache 2.0)", os: true, gpt: false, lc: true, ag: true },
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
  OmniScout: "hsl(230 85% 62%)",
  ChatGPT: "hsl(160 55% 45%)",
  LangChain: "hsl(262 70% 60%)",
  AutoGPT: "hsl(30 85% 55%)",
};

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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="dot-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <FadeUp>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              Comparison
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              OmniScout vs
              <br />
              <span className="text-muted-foreground font-normal">
                everything else.
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed text-lg mb-8">
              The existing landscape solves pieces of the puzzle. OmniScout
              combines web access, browser automation, structured extraction, and
              persistent memory into a single local runtime.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS.OmniScout }} />
                OmniScout
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS.ChatGPT }} />
                ChatGPT / Claude
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS.LangChain }} />
                LangChain + scrapers
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS.AutoGPT }} />
                AutoGPT
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Radar chart */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
                Capability radar
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                Six dimensions
                <br />
                that matter for agents.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                Evaluated across local execution, persistent memory, structured
                data extraction, deep web navigation, reproducibility, and
                privacy controls.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Capability score", value: 98, suffix: "%" },
                  { label: "Local execution", value: 100, suffix: "%" },
                  { label: "Memory depth", value: 95, suffix: "%" },
                  { label: "Privacy rating", value: 100, suffix: "%" },
                ].map(({ label, value, suffix }) => (
                  <div key={label} className="border border-border/40 bg-card rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      <Counter to={value} suffix={suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{label}</div>
                  </div>
                ))}
              </div>
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
                        name="ChatGPT"
                        dataKey="ChatGPT"
                        stroke={COLORS.ChatGPT}
                        fill={COLORS.ChatGPT}
                        fillOpacity={0.1}
                        strokeWidth={1.5}
                        isAnimationActive={radarInView}
                        animationDuration={800}
                      />
                      <Radar
                        name="LangChain"
                        dataKey="LangChain"
                        stroke={COLORS.LangChain}
                        fill={COLORS.LangChain}
                        fillOpacity={0.1}
                        strokeWidth={1.5}
                        isAnimationActive={radarInView}
                        animationDuration={900}
                        animationBegin={100}
                      />
                      <Radar
                        name="AutoGPT"
                        dataKey="AutoGPT"
                        stroke={COLORS.AutoGPT}
                        fill={COLORS.AutoGPT}
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

      {/* Bar chart */}
      <section className="py-20 border-t border-border/30 bg-card/20">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp className="mb-12 text-center">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Task performance
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
              Benchmarks across real research tasks.
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Scores reflect completeness, accuracy, and reproducibility of
              outputs on standardized research prompts.
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
                    data={barData}
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
                      dataKey="task"
                      tick={{ fill: "hsl(220 12% 52%)", fontSize: 11, fontFamily: "var(--app-font-mono)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "hsl(220 12% 52%)", fontSize: 11, fontFamily: "var(--app-font-mono)" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={customTooltipStyle}
                      cursor={{ fill: "hsl(222 16% 13%)" }}
                      formatter={(value: number) => [`${value}%`]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px", fontFamily: "var(--app-font-mono)", color: "hsl(220 12% 52%)", paddingTop: "12px" }}
                    />
                    <Bar
                      dataKey="ChatGPT"
                      fill={COLORS.ChatGPT}
                      radius={[3, 3, 0, 0]}
                      fillOpacity={0.8}
                      isAnimationActive={barInView}
                      animationDuration={800}
                      animationBegin={0}
                    />
                    <Bar
                      dataKey="LangChain"
                      fill={COLORS.LangChain}
                      radius={[3, 3, 0, 0]}
                      fillOpacity={0.8}
                      isAnimationActive={barInView}
                      animationDuration={800}
                      animationBegin={100}
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

          <FadeUp delay={0.15} className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Avg. score", value: "+34%", sub: "vs nearest alternative" },
              { label: "Local execution", value: "100%", sub: "no cloud required" },
              { label: "Reproducibility", value: "100%", sub: "deterministic workflows" },
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
              Every capability, side by side.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="border border-border/40 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-5 bg-card border-b border-border/40">
                <div className="col-span-1 px-5 py-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Feature
                </div>
                {[
                  { name: "OmniScout", color: COLORS.OmniScout },
                  { name: "ChatGPT", color: COLORS.ChatGPT },
                  { name: "LangChain", color: COLORS.LangChain },
                  { name: "AutoGPT", color: COLORS.AutoGPT },
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
                  {features.map(({ name, os, gpt, lc, ag }, fi) => (
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
                      <div className="px-3 py-3.5"><Cell val={gpt as CellValue} /></div>
                      <div className="px-3 py-3.5"><Cell val={lc as CellValue} /></div>
                      <div className="px-3 py-3.5"><Cell val={ag as CellValue} /></div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-primary" /> Supported
              </span>
              <span className="flex items-center gap-1.5">
                <Minus className="w-3 h-3 text-yellow-400" /> Partial / plugin required
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
              Ready to stop stitching tools together?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              OmniScout ships everything in one binary. No cloud accounts, no
              hidden pricing, no fragile glue code.
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
