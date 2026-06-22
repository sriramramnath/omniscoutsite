import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Link } from "wouter";
import {
  Shield,
  KeyRound,
  Bot,
  CloudOff,
  Zap,
  ArrowRight,
  LockOpen,
  Puzzle,
  Globe,
  Terminal,
  MousePointerClick,
  Camera,
} from "lucide-react";
import {
  ADVANTAGES_SCENARIOS,
  buildTokenChartData,
  formatChartValue,
  formatUsd,
  type CostViewMode,
} from "@/data/advantages-content";
import {
  BROWSER_COMPARISON_COLUMNS,
  BROWSER_COMPARISON_ROWS,
  PRICING_FOOTNOTE,
  SEARCH_COMPARISON_COLUMNS,
  SEARCH_COMPARISON_ROWS,
  SEARCH_COST_CHART_DATA,
} from "@/data/comparison-content";
import {
  CHART_COLORS,
  chartAxisTick,
  chartCursorFill,
  chartGridStroke,
  chartLegendStyle,
  chartTooltipStyle,
  chartYAxisTick,
} from "@/components/home/chart-styles";
import { FadeUp, PageLinkButton, SectionHeader } from "@/components/home/shared";
import { ComparisonTable, ViewModeToggle } from "@/components/home/comparison-table";
import { CopyableCommand } from "@/components/home/copyable-command";
import { cn } from "@/lib/utils";

const INSTALL_COMMANDS = [
  "pip install omniscout",
  "omniscout install",
  "omniscout install --skill",
] as const;

const WHY_OMNISCOUT = [
  {
    icon: CloudOff,
    title: "No cloud browser sessions",
    desc: "Runs on your machine. No per-minute hosted browser billing or vendor lock-in.",
  },
  {
    icon: Zap,
    title: "Up to 95% fewer LLM tokens",
    desc: "Extracts precise answers before they reach your model — not full pages of HTML.",
  },
  {
    icon: KeyRound,
    title: "Your logins, your browser",
    desc: "Persistent profiles and extension mode reuse real Chrome sessions — no re-auth dance.",
  },
  {
    icon: Bot,
    title: "CLI-first for any agent",
    desc: "Claude Code, Cursor, Codex, Cline — one install skill, no SDK or MCP required yet.",
  },
] as const;

const BROWSER_FEATURES = [
  {
    icon: MousePointerClick,
    title: "Atomic browser commands",
    desc: "navigate, snapshot, click, fill, scroll, screenshot, eval — sub-second via a local daemon.",
  },
  {
    icon: LockOpen,
    title: "Persistent browser profiles",
    desc: "Log in once with omniscout browser login — the agent stays signed in across sessions.",
  },
  {
    icon: Puzzle,
    title: "CAPTCHA handoff built in",
    desc: "Detects reCAPTCHA, hCaptcha, and Turnstile. Solve locally by default; 2captcha and capsolver are opt-in.",
  },
  {
    icon: Shield,
    title: "Real Chrome extension mode",
    desc: "Drive your actual browser with existing cookies and extensions — bypasses auth walls competitors hit.",
  },
] as const;

const SEARCH_BAR_COLORS: Record<string, string> = {
  Traditional: CHART_COLORS.Traditional,
  Exa: CHART_COLORS.Exa,
  Parallel: CHART_COLORS.Parallel,
  OmniScout: CHART_COLORS.OmniScout,
};

const SECTIONS = [
  { id: "token-savings", label: "Token Savings" },
  { id: "see-it-in-action", label: "See It In Action" },
  { id: "why-omniscout", label: "Why OmniScout" },
  { id: "browser-automation", label: "Browser Automation" },
  { id: "comparison", label: "Comparison" },
  { id: "install", label: "Install" },
] as const;

function SectionFlowDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden>
      <span className="font-mono text-sm text-primary/50">↓</span>
    </div>
  );
}

function HomeSection({
  id,
  children,
  className,
  altBg = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  altBg?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 py-14 md:scroll-mt-32 md:py-20",
        altBg && "rounded-[1.75rem] border border-border/30 bg-card/25 px-4 sm:px-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

function ChartPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glow-card min-w-0 overflow-hidden rounded-xl border border-border/40 bg-card p-4 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TokenSavingsSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<CostViewMode>("tokens");
  const activeRow = ADVANTAGES_SCENARIOS[activeIndex];
  const chartData = buildTokenChartData(viewMode);

  const stats =
    viewMode === "tokens"
      ? [
          { label: "Token reduction", value: activeRow.reduction },
          { label: "OmniScout input", value: `${activeRow.omniscoutTokens} tok` },
          { label: "Traditional input", value: `${activeRow.traditionalTokens.toLocaleString()} tok` },
        ]
      : [
          { label: "Cost reduction", value: activeRow.reduction },
          { label: "OmniScout LLM cost", value: formatUsd(activeRow.omniscoutCost) },
          { label: "Traditional LLM cost", value: formatUsd(activeRow.traditionalCost) },
        ];

  return (
    <HomeSection id="token-savings">
      <FadeUp>
        <SectionHeader
          tag="Token Savings"
          title="Spend less on tokens. Get answers faster."
          description="OmniScout extracts precise answers before they reach your LLM — toggle between token and dollar views."
        />
        <div className="mb-8 flex justify-center">
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card px-4 py-5 text-center"
            >
              <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ChartPanel>
            <div className="mb-4 flex items-center gap-2 border-b border-border/30 pb-3">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {viewMode === "tokens" ? "tokens per query" : "llm cost per query"}
              </span>
            </div>
            <motion.div
              ref={chartRef}
              initial={{ opacity: 0, y: 16 }}
              animate={chartInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-72 w-full sm:h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -8, bottom: 0 }}
                  barCategoryGap="24%"
                  barGap={4}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartGridStroke}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={chartAxisTick}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={chartYAxisTick}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      viewMode === "tokens"
                        ? v < 1000
                          ? `${v}`
                          : `${(v / 1000).toFixed(1)}k`
                        : `$${v.toFixed(4)}`
                    }
                  />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    cursor={{ fill: chartCursorFill }}
                    formatter={(value: number) => [
                      formatChartValue(viewMode, value),
                      "",
                    ]}
                    labelFormatter={(_, payload) =>
                      payload?.[0]?.payload?.fullQuestion ?? ""
                    }
                  />
                  <Legend wrapperStyle={chartLegendStyle} />
                  <Bar
                    dataKey="Traditional"
                    fill={CHART_COLORS.Traditional}
                    radius={[3, 3, 0, 0]}
                    fillOpacity={0.85}
                    isAnimationActive={chartInView}
                    animationDuration={800}
                  />
                  <Bar
                    dataKey="OmniScout"
                    fill={CHART_COLORS.OmniScout}
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={chartInView}
                    animationDuration={900}
                    animationBegin={120}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </ChartPanel>

          <ChartPanel className="flex flex-col">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Scenario detail
              </p>
              <ViewModeToggle mode={viewMode} onChange={setViewMode} />
            </div>
            <h3 className="text-lg font-bold tracking-tight">How OmniScout reduces AI costs</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {ADVANTAGES_SCENARIOS.map((row, index) => (
                <button
                  key={row.question}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                    index === activeIndex
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                  )}
                >
                  Scenario {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-5 flex-1 space-y-3">
              <div className="rounded-lg border border-border/40 bg-[hsl(222_22%_6%)] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Traditional
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {activeRow.traditional}
                </p>
                <p className="mt-2 font-mono text-xs text-foreground/80">
                  {viewMode === "tokens"
                    ? `${activeRow.traditionalTokens.toLocaleString()} tokens`
                    : `${formatUsd(activeRow.traditionalCost)} LLM cost`}
                </p>
              </div>
              <div className="rounded-lg border border-primary/25 bg-primary/10 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  OmniScout
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{activeRow.omniscout}</p>
                <p className="mt-2 font-mono text-xs text-primary">
                  {viewMode === "tokens"
                    ? `${activeRow.omniscoutTokens} tokens`
                    : `${formatUsd(activeRow.omniscoutCost)} LLM cost`}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-border/40 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">{activeRow.reduction}</p>
                <p className="text-xs text-muted-foreground">
                  {viewMode === "tokens" ? "fewer tokens" : "lower LLM cost"}
                </p>
              </div>
              <PageLinkButton href="/advantages">Full breakdown</PageLinkButton>
            </div>
          </ChartPanel>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] text-muted-foreground">
          {PRICING_FOOTNOTE}
        </p>
      </FadeUp>
    </HomeSection>
  );
}

function SeeItInActionSection() {
  return (
    <HomeSection id="see-it-in-action" altBg>
      <FadeUp delay={0.05}>
        <SectionHeader
          tag="See It In Action"
          title="Your AI opens real sites and returns live answers"
          description="Same app you already use — but now it browses, reads prices, and hands you a comparison in seconds."
        />

        <div className="overflow-hidden rounded-xl border border-border/40 bg-[hsl(222_22%_6%)] shadow-2xl shadow-black/30">
          <div className="flex items-center gap-2 border-b border-border/30 bg-[hsl(222_22%_5%)] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              Claude Code — with OmniScout installed
            </span>
          </div>
          <div className="space-y-4 p-4 sm:p-5">
            <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground">
              /omniscout find me the best price for Sony WH-1000XM5 headphones online right now
            </div>
            <div className="flex gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                OS
              </div>
              <div className="min-w-0 flex-1 rounded-xl rounded-bl-sm border border-border/40 bg-secondary/30 p-3 text-sm leading-relaxed text-foreground">
                <p className="mb-3 text-muted-foreground">
                  I searched across major retailers. Here are the best prices I found right now:
                </p>
                <div className="space-y-2">
                  {[
                    { store: "Amazon India", detail: "Prime eligible", price: "₹24,990" },
                    { store: "Croma", detail: "Store pickup today", price: "₹26,490" },
                    { store: "Flipkart", detail: "10% off with Axis Bank", price: "₹23,490" },
                  ].map(({ store, detail, price }) => (
                    <div
                      key={store}
                      className="rounded-lg border border-border/30 bg-card/60 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-primary">{store}</p>
                      <p className="text-xs text-muted-foreground">{detail}</p>
                      <p className="mt-0.5 text-sm font-semibold text-emerald-400">{price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
          The AI opened real websites, read actual prices, and gave you a comparison — you never
          touched a browser.
        </p>
      </FadeUp>
    </HomeSection>
  );
}

function WhyOmniScoutSection() {
  return (
    <HomeSection id="why-omniscout">
      <FadeUp delay={0.05}>
        <SectionHeader
          tag="Why OmniScout"
          title="Local execution. Your LLM. Less waste."
          description="No hosted browser sessions, no vendor lock-in, and answers that cost a fraction of traditional search + LLM workflows."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {WHY_OMNISCOUT.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glow-card rounded-xl border border-border/40 bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </HomeSection>
  );
}

function BrowserAutomationSection() {
  return (
    <HomeSection id="browser-automation" altBg>
      <FadeUp delay={0.05}>
        <SectionHeader
          tag="Browser Automation"
          title="Navigate like a human. Bypass auth and CAPTCHAs."
          description="A long-lived local daemon drives your browser — persistent profiles, extension mode, and CAPTCHA handoff built in."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {BROWSER_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-border/40 bg-background/40 p-4 transition-colors hover:border-primary/25"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border/40 bg-[hsl(222_22%_6%)]">
          <div className="flex items-center gap-1.5 border-b border-border/30 bg-[hsl(222_22%_5%)] px-4 py-2">
            <Globe className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">example</span>
          </div>
          <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 text-zinc-300">
            <code>
              {`omniscout browser navigate https://example.com
omniscout browser snapshot --refs-only
omniscout browser click @e1
omniscout browser login https://github.com --profile work`}
            </code>
          </pre>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            All browser features
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </FadeUp>
    </HomeSection>
  );
}

function ComparisonSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-80px" });

  return (
    <HomeSection id="comparison">
      <FadeUp delay={0.05}>
        <SectionHeader
          tag="Comparison"
          title="Search and browser — side by side"
          description="Real pricing from Exa, Parallel, and Browserbase docs. Same president query, same 5-minute browser workflow."
        />

        <div className="space-y-8">
          <ComparisonTable
            title="Search — Traditional vs Exa vs Parallel vs OmniScout"
            columns={SEARCH_COMPARISON_COLUMNS}
            rows={SEARCH_COMPARISON_ROWS}
            highlightColumn="OmniScout"
          />

          <ChartPanel>
            <div className="mb-4 flex items-center gap-2 border-b border-border/30 pb-3">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                total cost per search query
              </span>
            </div>
            <motion.div
              ref={chartRef}
              initial={{ opacity: 0, y: 16 }}
              animate={chartInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-64 w-full sm:h-72"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={SEARCH_COST_CHART_DATA}
                  margin={{ top: 10, right: 10, left: -8, bottom: 0 }}
                  barCategoryGap="28%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartGridStroke}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={chartAxisTick}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={chartYAxisTick}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v.toFixed(4)}`}
                  />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    cursor={{ fill: chartCursorFill }}
                    formatter={(value: number, name: string) => [
                      formatUsd(value),
                      name === "total" ? "Total" : name === "api" ? "API" : "LLM",
                    ]}
                  />
                  <Bar
                    dataKey="total"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={chartInView}
                    animationDuration={800}
                  >
                    {SEARCH_COST_CHART_DATA.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={SEARCH_BAR_COLORS[entry.name] ?? CHART_COLORS.Traditional}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </ChartPanel>

          <ComparisonTable
            title="Browser — OmniScout vs Browserbase vs Playwright"
            columns={BROWSER_COMPARISON_COLUMNS}
            rows={BROWSER_COMPARISON_ROWS}
            highlightColumn="OmniScout"
          />
        </div>

        <p className="mt-6 text-center font-mono text-[10px] leading-relaxed text-muted-foreground">
          {PRICING_FOOTNOTE}
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Extended competitor analysis
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </FadeUp>
    </HomeSection>
  );
}

function InstallSection() {
  return (
    <HomeSection id="install" altBg>
      <FadeUp delay={0.05}>
        <SectionHeader
          tag="Install"
          title="Anyone can set this up"
          description="Run 3 commands once. Then ask your AI in plain English — it browses, searches, and fills forms automatically."
        />

        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-5 sm:p-6">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            The 3 commands — type these in order
          </p>
          <div className="space-y-2">
            {INSTALL_COMMANDS.map((cmd, i) => (
              <div key={cmd} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-semibold text-emerald-300">
                  {i + 1}
                </span>
                <CopyableCommand command={cmd} variant="inline" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <PageLinkButton href="/guide">Read the full setup guide</PageLinkButton>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Camera className="h-4 w-4" aria-hidden />
            Explore all features
          </Link>
        </div>
      </FadeUp>
    </HomeSection>
  );
}

export const QUICK_SETUP_SECTION_ID = "install";

export function HomePreview() {
  return (
    <div className="overflow-x-clip border-t border-border/30 bg-card/20">
      {/* Section flow nav */}
      <nav
        aria-label="Page sections"
        className="sticky top-[4.5rem] z-30 border-b border-border/30 bg-background/80 backdrop-blur-md sm:top-[5.5rem]"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 sm:gap-2 sm:px-5">
          {SECTIONS.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {section.label}
              {index < SECTIONS.length - 1 && (
                <span className="text-primary/40" aria-hidden>
                  ↓
                </span>
              )}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5">
        <TokenSavingsSection />
        <SectionFlowDivider />
        <SeeItInActionSection />
        <SectionFlowDivider />
        <WhyOmniScoutSection />
        <SectionFlowDivider />
        <BrowserAutomationSection />
        <SectionFlowDivider />
        <ComparisonSection />
        <SectionFlowDivider />
        <InstallSection />
      </div>
    </div>
  );
}
