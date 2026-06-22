import { useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
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
} from "lucide-react";
import {
  ADVANTAGES_SCENARIOS,
  TOKEN_CHART_DATA,
} from "@/data/advantages-content";
import { FadeUp, PageLinkButton, SectionHeader } from "@/components/home/shared";
import { CopyableCommand } from "@/components/home/copyable-command";
import { cn } from "@/lib/utils";

const CHART_COLORS = {
  Traditional: "hsl(0 65% 55%)",
  OmniScout: "hsl(var(--primary))",
};

const COMPETITOR_EDGES = [
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

const AUTH_BYPASS_FEATURES = [
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

const INSTALL_COMMANDS = [
  "pip install omniscout",
  "omniscout install",
  "omniscout install --skill",
] as const;

function TokenTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm shadow-xl">
      <p className="mb-2 max-w-xs font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-mono text-xs">
          {entry.name}: {entry.value.toLocaleString()} tokens
        </p>
      ))}
    </div>
  );
}

function TokenEfficiencyChart() {
  return (
    <div className="rounded-[1.5rem] border border-border/50 bg-card p-4 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        Token efficiency
      </p>
      <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
        Same answer, a fraction of the tokens
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Traditional search sends whole pages to your LLM. OmniScout extracts the
        answer first — typical workflows see 70–95% fewer input tokens.
      </p>

      <div className="mt-6 h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TOKEN_CHART_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<TokenTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              formatter={(value) => (
                <span className="text-muted-foreground">{value}</span>
              )}
            />
            <Bar
              dataKey="Traditional"
              fill={CHART_COLORS.Traditional}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
            <Bar
              dataKey="OmniScout"
              fill={CHART_COLORS.OmniScout}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {ADVANTAGES_SCENARIOS.map((row) => (
          <div
            key={row.question}
            className="rounded-xl border border-border/40 bg-background/40 px-4 py-3"
          >
            <p className="text-xs font-medium text-foreground line-clamp-2">{row.question}</p>
            <p className="mt-2 text-2xl font-bold text-primary">{row.reduction}</p>
            <p className="text-xs text-muted-foreground">fewer tokens</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Try different prompts in the full comparison — toggle between real-world scenarios.
        </p>
        <PageLinkButton href="/advantages">See full cost breakdown</PageLinkButton>
      </div>
    </div>
  );
}

function CostSavingsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const stats = [
    { label: "Token reduction", value: "up to 95%" },
    { label: "Typical input tokens", value: "20–200" },
    { label: "vs traditional", value: "1,000–5,000" },
  ];

  return (
    <div
      ref={ref}
      className="grid gap-3 rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-4 sm:grid-cols-3 sm:p-6"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border/30 bg-background/50 px-4 py-4 text-center">
          <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function AuthBypassSection() {
  return (
    <div className="rounded-[1.5rem] border border-border/50 bg-card p-4 sm:p-6">
      <SectionHeader
        tag="No walls"
        title="Bypass auth, CAPTCHAs, and session limits"
        description="Competitors stop at login screens and bot checks. OmniScout uses your real browser profile so agents keep moving."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {AUTH_BYPASS_FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-border/40 bg-background/40 p-4 transition-colors hover:border-primary/25"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitorEdgeSection() {
  return (
    <div>
      <SectionHeader
        tag="Why OmniScout"
        title="Better than hosted browsers and vendor agents"
        description="Local execution, your LLM, and answers that cost less — without signing up for another cloud API."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {COMPETITOR_EDGES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className={cn(
              "group rounded-xl border border-border/40 bg-card p-5 transition-colors hover:border-primary/30",
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
      <div className="mt-6 text-center">
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Full competitor comparison
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function SetupGuideTeaser() {
  return (
    <div className="rounded-[1.5rem] border border-border/50 bg-card p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
            Quick setup
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Anyone can set this up
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Run 3 commands once. Then ask your AI in plain English — it browses,
            searches, and fills forms automatically. The full guide covers terminal
            setup on Mac, Windows, and Linux, plus what happens behind the scenes.
          </p>
          <div className="mt-5 space-y-2">
            {INSTALL_COMMANDS.map((cmd, i) => (
              <div key={cmd} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <CopyableCommand command={cmd} variant="inline" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <PageLinkButton href="/guide">Read the full setup guide</PageLinkButton>
          <a
            href="#quick-setup"
            className="text-center text-xs text-muted-foreground hover:text-foreground"
          >
            Jump to install on this page
          </a>
        </div>
      </div>
    </div>
  );
}

export const QUICK_SETUP_SECTION_ID = "quick-setup";

export function HomePreview() {
  return (
    <section
      id={QUICK_SETUP_SECTION_ID}
      className="scroll-mt-28 overflow-x-clip border-t border-border/30 bg-card/20 py-20 md:scroll-mt-32 md:py-28"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5">
        <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
          <FadeUp>
            <SectionHeader
              tag="Cost & efficiency"
              title="Spend less on tokens. Get answers faster."
              description="OmniScout extracts precise answers before they reach your LLM — so you send less context and pay less per query."
            />
            <div className="space-y-5">
              <CostSavingsStrip />
              <TokenEfficiencyChart />
            </div>
          </FadeUp>

          <div className="gradient-divider" />

          <FadeUp delay={0.05}>
            <AuthBypassSection />
          </FadeUp>

          <div className="gradient-divider" />

          <FadeUp delay={0.05}>
            <CompetitorEdgeSection />
          </FadeUp>

          <div className="gradient-divider" />

          <FadeUp delay={0.05}>
            <SetupGuideTeaser />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
