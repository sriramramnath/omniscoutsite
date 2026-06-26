import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { Link } from "wouter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import {
  chartAxisTick,
  chartCursorFill,
  chartGridStroke,
  chartLegendStyle,
  chartTooltipProps,
  chartYAxisTick,
} from "@/components/home/chart-styles";
import { FadeUp, SectionHeader } from "@/components/home/shared";
import {
  PROBE_BENCHMARK,
  PROBE_CHART_COLORS,
} from "@/data/probe-zero-benchmark";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { cn } from "@/lib/utils";

const radarData = [
  {
    metric: "Readable format",
    Probe: PROBE_BENCHMARK.engines.probeZero.formatPass,
    Classic: PROBE_BENCHMARK.engines.classic.formatPass,
  },
  {
    metric: "Full sentences",
    Probe: PROBE_BENCHMARK.engines.probeZero.completeSentence,
    Classic: PROBE_BENCHMARK.engines.classic.completeSentence,
  },
  {
    metric: "Accurate facts",
    Probe: PROBE_BENCHMARK.engines.probeZero.goldFactRetained,
    Classic: PROBE_BENCHMARK.engines.classic.goldFactRetained,
  },
  {
    metric: "Not one-word",
    Probe: PROBE_BENCHMARK.engines.probeZero.notOneWord,
    Classic: PROBE_BENCHMARK.engines.classic.notOneWord,
  },
];

const speedChartData = [
  {
    engine: "Probe Zero",
    ms: PROBE_BENCHMARK.speed.probeAvgMs,
    fill: PROBE_CHART_COLORS.probe,
  },
  {
    engine: "Classic",
    ms: PROBE_BENCHMARK.speed.classicAvgMs,
    fill: PROBE_CHART_COLORS.classic,
  },
];

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <FadeUp className={className}>
      <div className="overflow-hidden rounded-2xl border border-border/40 bg-[hsl(222_22%_6%)]/80 p-5 sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </FadeUp>
  );
}

const HERO_BENCHMARK_METRICS = [
  {
    label: "Readable answers",
    probe: PROBE_BENCHMARK.engines.probeZero.formatPass,
    classic: PROBE_BENCHMARK.engines.classic.formatPass,
  },
  {
    label: "Accurate facts",
    probe: PROBE_BENCHMARK.engines.probeZero.goldFactRetained,
    classic: PROBE_BENCHMARK.engines.classic.goldFactRetained,
  },
  {
    label: "Full sentences",
    probe: PROBE_BENCHMARK.engines.probeZero.completeSentence,
    classic: PROBE_BENCHMARK.engines.classic.completeSentence,
  },
] as const;

function HeroBenchmarkCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative mx-auto max-w-md">
      <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[hsl(222_22%_6%)]/90 shadow-2xl shadow-primary/10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(104,127,243,0.12),transparent_65%)]"
          aria-hidden
        />
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                <img src="/logos/probe.svg" alt="" className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Probe vs Classic</p>
                <p className="text-[11px] text-muted-foreground">Everyday answer quality</p>
              </div>
            </div>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-medium text-primary">
              v{PROBE_BENCHMARK.benchmarkVersion}
            </span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {PROBE_BENCHMARK.engines.probeZero.formatPass.toFixed(0)}%
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">Probe Zero readable answers</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Up to{" "}
              <span className="font-mono text-foreground/80">
                {PROBE_BENCHMARK.improvements.accuracyPercent}%
              </span>{" "}
              more accurate ·{" "}
              <span className="font-mono text-foreground/80">
                {PROBE_BENCHMARK.improvements.speedPercent}%
              </span>{" "}
              faster than Classic
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Metric</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5">
                  <img src="/logos/probe.svg" alt="" className="h-3 w-3" />
                  Probe
                </span>
                <span className="flex items-center gap-1.5" style={{ color: PROBE_CHART_COLORS.classic }}>
                  <Cpu className="h-3 w-3" />
                  Classic
                </span>
              </div>
            </div>

            {HERO_BENCHMARK_METRICS.map((metric, index) => (
              <div key={metric.label}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                  <div className="flex gap-3 font-mono text-[11px]">
                    <span className="text-primary">{metric.probe}%</span>
                    <span style={{ color: PROBE_CHART_COLORS.classic }}>{metric.classic}%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-border/30">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${metric.probe}%` } : { width: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.15 + index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    />
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border/20">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: PROBE_CHART_COLORS.classic }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${metric.classic}%` } : { width: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.25 + index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-border/30 pt-5">
            {[
              `${PROBE_BENCHMARK.improvements.speedPercent}% faster`,
              PROBE_BENCHMARK.quantization.toUpperCase(),
              `${PROBE_BENCHMARK.artifactSizeMb} MB local`,
            ].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-border/40 bg-card/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useSpring(useTransform(scrollYProgress, [0.15, 0.75], [0, 1]), {
    stiffness: 120,
    damping: 28,
  });

  const steps = [
    {
      title: "Retrieve",
      body: "Live web hits: titles, snippets, URLs, ranked for the query.",
    },
    {
      title: "Ground",
      body: "Supporting passages are trimmed so the answer engine sees evidence, not noise.",
    },
    {
      title: "Format",
      body: "Probe Zero shapes a concise, grounded sentence from those supports.",
    },
  ];

  return (
    <section ref={ref} className="border-t border-border/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeader
          tag="Pipeline"
          title="Evidence in, answers out"
          description="Probe Zero sits at the end of OmniScout's answer path, after retrieval and before your agent reads the result."
        />
        <div className="relative grid gap-8 md:grid-cols-3">
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-4 top-8 hidden h-[calc(100%-4rem)] w-px origin-top bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:left-1/2 md:block"
            aria-hidden
          />
          {steps.map((step, index) => (
            <FadeUp key={step.title} delay={index * 0.08}>
              <div className="relative rounded-2xl border border-border/40 bg-card/20 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-mono text-xs text-primary">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProbeZero() {
  useDocumentMeta(routePageMeta["/probe-zero"]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />

      <section className="relative min-h-[78vh] overflow-hidden pt-28 pb-20 sm:pt-32">
        <PageHeroGlow />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(104,127,243,0.14),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeUp>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
                <HeroTitleGradient>Probe Zero</HeroTitleGradient>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                OmniScout&apos;s local answer engine. Grounded, readable web answers that run on
                your machine alongside search and browser automation.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                No hosted synthesis API. Probe Zero formats retrieved evidence into concise
                answers your agents can trust.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/install"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 px-5 py-2.5 text-sm font-semibold text-black transition-all hover:from-zinc-200 hover:to-zinc-400"
                >
                  Install OmniScout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://docs.omniscout.xyz/cli/probe-zero/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card/40 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  Read the docs
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <HeroBenchmarkCard />
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">
          <SectionHeader
            tag="Benchmarks"
            title="Probe vs Classic"
            description={PROBE_BENCHMARK.methodology}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartCard
              title="Answer quality by question type"
              subtitle="How often each engine returned a complete, readable answer"
            >
              <div className="h-72 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PROBE_BENCHMARK.categoryComparison} barGap={8}>
                    <CartesianGrid stroke={chartGridStroke} vertical={false} />
                    <XAxis dataKey="category" tick={chartAxisTick} />
                    <YAxis domain={[0, 100]} tick={chartYAxisTick} unit="%" />
                    <Tooltip
                      {...chartTooltipProps}
                      cursor={{ fill: chartCursorFill }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
                    <Legend wrapperStyle={chartLegendStyle} />
                    <Bar dataKey="probePass" name="Probe Zero" fill={PROBE_CHART_COLORS.probe} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="classicPass" name="Classic" fill={PROBE_CHART_COLORS.classic} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard
              title="Quality at a glance"
              subtitle="Readable format, full sentences, accurate facts, and more than one-word answers"
            >
              <div className="h-72 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke={chartGridStroke} />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(220 12% 62%)", fontSize: 11 }} />
                    <Radar
                      name="Probe Zero"
                      dataKey="Probe"
                      stroke={PROBE_CHART_COLORS.probe}
                      fill={PROBE_CHART_COLORS.probe}
                      fillOpacity={0.22}
                    />
                    <Radar
                      name="Classic"
                      dataKey="Classic"
                      stroke={PROBE_CHART_COLORS.classic}
                      fill={PROBE_CHART_COLORS.classic}
                      fillOpacity={0.12}
                    />
                    <Legend wrapperStyle={chartLegendStyle} />
                    <Tooltip {...chartTooltipProps} formatter={(v: number) => [`${v}%`, ""]} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard
              title="Response time"
              subtitle={`${PROBE_BENCHMARK.speed.label}. Probe Zero is about ${PROBE_BENCHMARK.speed.improvementPercent}% faster`}
              className="lg:col-span-1"
            >
              <div className="h-64 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedChartData} layout="vertical" margin={{ left: 12 }}>
                    <CartesianGrid stroke={chartGridStroke} horizontal={false} />
                    <XAxis
                      type="number"
                      tick={chartAxisTick}
                      unit="ms"
                      domain={[0, "dataMax + 200"]}
                    />
                    <YAxis type="category" dataKey="engine" width={88} tick={chartAxisTick} />
                    <Tooltip
                      {...chartTooltipProps}
                      cursor={{ fill: chartCursorFill }}
                      formatter={(value: number) => [`${value} ms`, ""]}
                    />
                    <Bar dataKey="ms" name="Median time" radius={[0, 6, 6, 0]}>
                      {speedChartData.map((entry) => (
                        <Cell key={entry.engine} fill={entry.fill} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard
              title="Question types we tested"
              subtitle="Mix of everyday lookups, roles, comparisons, and navigational answers"
              className="lg:col-span-1"
            >
              <div className="h-64 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PROBE_BENCHMARK.categoryDistribution} layout="vertical" margin={{ left: 12 }}>
                    <CartesianGrid stroke={chartGridStroke} horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={chartAxisTick} />
                    <YAxis type="category" dataKey="category" width={92} tick={chartAxisTick} />
                    <Tooltip {...chartTooltipProps} cursor={{ fill: chartCursorFill }} />
                    <Bar dataKey="queries" name="Share" radius={[0, 6, 6, 0]}>
                      {PROBE_BENCHMARK.categoryDistribution.map((entry) => (
                        <Cell key={entry.category} fill={PROBE_CHART_COLORS.probe} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
          <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
            Compared {PROBE_BENCHMARK.evaluatedAt} · {PROBE_BENCHMARK.dataset}
          </p>
        </div>
      </section>

      <PipelineSection />

      <section className="border-t border-border/30 bg-card/10 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <FadeUp>
              <SectionHeader
                tag="Engines"
                title="Classic or Probe Zero"
                description="Pick per command or set a default in the interactive settings panel."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: <Cpu className="h-5 w-5" />,
                    title: "Classic",
                    body: "Direct web hits with extractive fallback. Fast defaults for mixed queries.",
                  },
                  {
                    icon: (
                      <img src="/logos/probe.svg" alt="" className="h-5 w-5" />
                    ),
                    title: "Probe Zero",
                    body: "Grounded formatting engine tuned for concise, evidence-backed sentences.",
                  },
                  {
                    icon: <Layers className="h-5 w-5" />,
                    title: "Local inference",
                    body: "Weights download once via omniscout install --probe-0-mini.",
                  },
                  {
                    icon: <BarChart3 className="h-5 w-5" />,
                    title: "Benchmarked",
                    body: `Up to ${PROBE_BENCHMARK.improvements.accuracyPercent}% more accurate and ${PROBE_BENCHMARK.improvements.speedPercent}% faster than Classic.`,
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-border/40 bg-card/30 p-5"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {card.icon}
                    </div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-border/40 bg-[hsl(222_22%_6%)]">
                <div className="flex items-center gap-2 border-b border-border/30 bg-[hsl(222_22%_5%)] px-4 py-2.5">
                  <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">terminal</span>
                </div>
                <pre className="overflow-x-auto px-4 py-5 font-mono text-xs leading-6 text-zinc-300">
{`# Use Probe Zero for one answer
omniscout answer "who is the CEO of nvidia" --probe

# Set Probe Zero as the default answer engine
omniscout settings

# Download local weights once
omniscout install --probe-0-mini`}
                </pre>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-5">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ship grounded answers locally</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              OmniScout v0.3.0 brings Probe Zero, interactive settings, and answer quality up to{" "}
              {PROBE_BENCHMARK.improvements.accuracyPercent}% better than Classic.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/install"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300",
                  "px-5 py-2.5 text-sm font-semibold text-black transition-all hover:from-zinc-200 hover:to-zinc-400",
                )}
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blogs/v0-3-0"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                Read the v0.3.0 blog
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
