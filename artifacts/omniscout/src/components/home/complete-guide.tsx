import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  User,
  Cpu,
  FileText,
  Check,
  EyeOff,
  Search,
  ShoppingCart,
  Newspaper,
  ClipboardList,
  MapPin,
  Repeat,
  Shield,
} from "lucide-react";
import { CopyableCommand } from "@/components/home/copyable-command";
import { SupportedAgentsGrid } from "@/components/home/supported-agents";
import { cn } from "@/lib/utils";

const INSTALL_COMMANDS = [
  "pip install omniscout",
  "omniscout install",
  "omniscout install --skill",
] as const;

const EXAMPLE_PROMPTS = [
  "/omniscout find me the best price for AirPods Pro in India",
  "/omniscout go to my Gmail and find any unread emails from last week",
  "/omniscout search for Python tutorials for beginners and summarise the top 3",
] as const;

const USE_CASES = [
  {
    icon: ShoppingCart,
    title: "Compare prices",
    say: '"Find the cheapest flight from Chennai to Delhi next Friday"',
    note: "OmniScout opens sites, reads the prices, and gives you the best deal.",
  },
  {
    icon: Newspaper,
    title: "Get a news summary",
    say: '"What happened in tech news today?"',
    note: "Searches multiple news sites and gives you a short readable summary.",
  },
  {
    icon: ClipboardList,
    title: "Fill in forms",
    say: '"Go to this website and fill in the contact form with my details"',
    note: "Types into fields, clicks buttons, and submits — you just watch.",
  },
  {
    icon: MapPin,
    title: "Research a place",
    say: '"Find the top rated restaurants near Marina Beach Chennai"',
    note: "Searches, reads reviews, and lists the best options with details.",
  },
  {
    icon: FileText,
    title: "Read a website for you",
    say: '"Read this company\'s pricing page and tell me what the cheapest plan includes"',
    note: "Extracts just the information you care about from any webpage.",
  },
  {
    icon: Repeat,
    title: "Repetitive tasks",
    say: '"Check this job board every morning and save any new Python jobs"',
    note: "Anything you do on a browser the same way each day can be automated.",
  },
] as const;

const COST_TABLE_ROWS = [
  {
    question: "Who is the President of the United States?",
    prompt: "Who is the President of the United...",
    traditional: "Reading whitehouse.gov, news pages, and recent election coverage to confirm the latest office holder...",
    traditionalTokens: "1,500 tok",
    traditionalCost: "$0.0045",
    answer: "Donald Trump",
    omniTokens: "50 tok",
    omniCost: "$0.00015",
    reduction: "97%",
    savings: "20x-30x fewer tokens",
  },
  {
    question: "What is Apple's current stock price?",
    prompt: "What is Apple's current stock price?",
    traditional: "Reading finance.yahoo.com, marketwatch.com, bloomberg.com, and parsing live tickers across multiple market snippets to surface the latest quote...",
    traditionalTokens: "2,000 tok",
    traditionalCost: "$0.0060",
    answer: "$237.41 (NASDAQ: AAPL)",
    omniTokens: "50 tok",
    omniCost: "$0.00015",
    reduction: "98%",
    savings: "20x-40x fewer tokens",
  },
  {
    question: "What is the capital of Japan?",
    prompt: "What is the capital of Japan?",
    traditional: "Scanning encyclopedia snippets, country profiles, and travel references before returning the city name...",
    traditionalTokens: "900 tok",
    traditionalCost: "$0.0027",
    answer: "Tokyo",
    omniTokens: "35 tok",
    omniCost: "$0.00011",
    reduction: "96%",
    savings: "25x fewer tokens",
  },
  {
    question: "What is OpenAI?",
    prompt: "What is OpenAI?",
    traditional: "Reading company pages, recent news, and background articles to build a concise definition...",
    traditionalTokens: "1,800 tok",
    traditionalCost: "$0.0054",
    answer: "An AI research and product company.",
    omniTokens: "70 tok",
    omniCost: "$0.00021",
    reduction: "96%",
    savings: "25x fewer tokens",
  },
  {
    question: "What is the return policy? (Support Bot)",
    prompt: "What is the return policy?",
    traditional: "Reading help-center articles, FAQ sections, and policy pages to extract the merchant's return window...",
    traditionalTokens: "4,000 tok",
    traditionalCost: "$0.0120",
    answer: "Returns accepted within 30 days.",
    omniTokens: "100 tok",
    omniCost: "$0.00030",
    reduction: "97.5%",
    savings: "40x fewer tokens",
  },
] as const;

const TYPICAL_RESULTS = [
  {
    metric: "Input Tokens",
    traditional: "1,000-5,000",
    omniscout: "20-200",
  },
  {
    metric: "Response Speed",
    traditional: "Slower",
    omniscout: "Faster",
  },
  {
    metric: "LLM Cost",
    traditional: "Higher",
    omniscout: "Up to 95% lower",
  },
  {
    metric: "Context Window Usage",
    traditional: "High",
    omniscout: "Minimal",
  },
] as const;

const BROWSER_COMPARISON = {
  label: "Browser use",
  prompt: "sign in with Google and check my order",
  withoutTitle: "AI without your browser",
  withoutItems: [
    "Cannot use your Google login",
    "Asks you to copy links",
    "Asks for screenshots",
    "More back and forth",
  ],
  withoutAnswer: "Please open the page for me.",
  withTitle: "AI with OmniScout",
  withItems: [
    "Opens your browser",
    "Uses your signed-in session",
    "Clicks normal website buttons",
    "Returns the result",
  ],
  withAnswer: "Your order is arriving tomorrow.",
  takeaway: "Your browser, your logins, less manual work.",
} as const;

const OUTCOMES = [
  {
    label: "Before OmniScout",
    title: "Your AI hits a wall",
    desc: 'You ask it to search the web or check a price. It says "I don\'t have access to the internet" or gives you outdated information from months ago.',
  },
  {
    label: "After OmniScout",
    title: "Your AI just does it",
    desc: "Same question, same app — but now it opens a real browser on your computer, reads the live page, and hands you the answer. No extra apps to open. No copying links.",
  },
  {
    label: "Where it runs",
    title: "Quietly in the background",
    desc: "A tiny server starts automatically on your machine the moment your AI needs it. You will never see it. It stops itself when not needed. Nothing is in the cloud.",
  },
] as const;

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

function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <div className="mb-4 text-xs font-mono uppercase tracking-widest text-primary">
        {tag}
      </div>
      <h2 className="mb-3 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function StepCard({
  num,
  variant = "default",
  className,
  children,
}: {
  num: React.ReactNode;
  variant?: "default" | "done" | "warn";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex gap-4 rounded-xl border border-border/40 bg-card p-5",
        className,
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          variant === "done" && "bg-emerald-500/15 text-emerald-400",
          variant === "warn" && "bg-amber-500/15 text-amber-400",
          variant === "default" && "bg-primary/10 text-primary",
        )}
      >
        {num}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border/60 bg-secondary/50 px-1.5 py-0.5 font-mono text-xs text-foreground">
      {children}
    </span>
  );
}

function TimelineStep({
  icon,
  title,
  description,
  children,
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        {!isLast && <div className="my-1 w-px flex-1 bg-border/60" />}
      </div>
      <div className={cn("min-w-0 flex-1", !isLast && "pb-5")}>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}

function CostSavingsTable() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeRow = COST_TABLE_ROWS[activeIndex];
  const nextPrompt = () => setActiveIndex((activeIndex + 1) % COST_TABLE_ROWS.length);

  return (
    <div className="rounded-[1.5rem] border border-border/50 bg-card p-4 sm:rounded-[1.75rem] sm:p-6">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Token comparison
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          How OmniScout reduces AI costs
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Traditional retrieval sends full pages into the model. OmniScout extracts
          the exact answer first, so the LLM reads less and responds faster.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/60 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border/60 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Prompt
          </p>
          <div className="-mx-4 flex min-w-0 snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {COST_TABLE_ROWS.map((row) => {
              const isActive = row.question === activeRow.question;
              return (
                <button
                  key={row.question}
                  type="button"
                  title={row.question}
                  onClick={() => setActiveIndex(COST_TABLE_ROWS.indexOf(row))}
                  aria-pressed={isActive}
                  className={cn(
                    "min-h-10 max-w-[78vw] shrink-0 snap-start truncate rounded-full border px-3.5 py-2 text-xs transition-colors sm:min-h-0 sm:max-w-none sm:py-1.5",
                    isActive
                      ? "border-foreground bg-foreground text-background shadow-sm"
                      : "border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                  )}
                >
                  {row.prompt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-b border-border/60 px-4 py-5 sm:px-8 sm:py-7">
          <h4 className="break-words text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            <span className="font-mono text-muted-foreground">&gt; </span>
            {activeRow.question}
          </h4>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/70 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Traditional avg cost
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {activeRow.traditionalCost}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                OmniScout avg cost
              </p>
              <p className="mt-1 text-xl font-semibold text-primary">
                {activeRow.omniCost}
              </p>
            </div>
          </div>
        </div>

        <div className="grid min-h-56 md:grid-cols-2">
          <div className="border-b border-border/60 px-4 py-5 md:border-b-0 md:border-r sm:px-8 sm:py-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                Traditional AI
              </p>
              <p className="font-mono text-[11px] text-muted-foreground">
                {activeRow.traditionalTokens}
              </p>
            </div>
            <div className="mb-6 h-1 w-44 max-w-full overflow-hidden rounded-full bg-border">
              <div className="h-full w-4/5 bg-muted-foreground/60" />
            </div>
            <p className="max-w-md break-words font-mono text-sm leading-7 text-muted-foreground">
              {activeRow.traditional}
            </p>
          </div>

          <div className="px-4 py-5 sm:px-8 sm:py-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
                With OmniScout
              </p>
              <p className="font-mono text-[11px] text-primary">{activeRow.omniTokens}</p>
            </div>
            <div className="mb-6 h-1 w-8 overflow-hidden rounded-full bg-primary" />
            <p className="break-words font-mono text-base leading-7 text-foreground sm:text-lg sm:leading-8">
              {activeRow.answer}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/60 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="font-serif text-4xl leading-none text-primary sm:text-6xl">
              {activeRow.reduction}
            </p>
            <p className="text-sm text-muted-foreground">fewer tokens on this prompt</p>
          </div>
          <button
            type="button"
            onClick={nextPrompt}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground sm:w-fit"
          >
            Next prompt -&gt;
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/50 bg-background/40">
        <div className="grid gap-0 md:grid-cols-[1.35fr_0.65fr]">
          <div className="border-b border-border/50 md:border-b-0 md:border-r">
            <div className="hidden grid-cols-3 border-b border-border/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:grid">
              <div>Metric</div>
              <div>Traditional</div>
              <div className="text-primary">OmniScout</div>
            </div>
            <div className="sm:hidden">
              {TYPICAL_RESULTS.map((row) => (
                <div key={row.metric} className="px-4 py-3.5 not-last:border-b not-last:border-border/35">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium leading-snug text-foreground">{row.metric}</p>
                    <p className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-right text-xs font-semibold text-primary">
                      {row.omniscout}
                    </p>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Traditional: <span className="text-foreground/80">{row.traditional}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden sm:block">
              {TYPICAL_RESULTS.map((row) => (
                <div
                  key={row.metric}
                  className="grid grid-cols-3 px-5 py-4 text-sm not-last:border-b not-last:border-border/35"
                >
                  <div className="font-medium text-foreground">{row.metric}</div>
                  <div className="text-muted-foreground">{row.traditional}</div>
                  <div className="font-semibold text-primary">{row.omniscout}</div>
                </div>
              ))}
              </div>
          </div>

          <div className="flex flex-col justify-between bg-primary/[0.04] p-5 sm:p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                Average reduction
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                95%
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                lower LLM token costs
              </p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              OmniScout sends compact answers instead of full pages, reducing context use
              without changing the user&apos;s prompt.
            </p>
          </div>
        </div>
        <div className="border-t border-border/50 px-5 py-3 text-center text-sm text-muted-foreground">
          Typical search-heavy workflows use{" "}
          <span className="font-semibold text-foreground">70-95% fewer LLM tokens</span>.
        </div>
      </div>
    </div>
  );
}

function BrowserComparisonPanel() {
  const comparison = BROWSER_COMPARISON;

  return (
    <div className="rounded-[1.5rem] border border-border/50 bg-card p-4 sm:rounded-[1.75rem] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border/40 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
            {comparison.label}
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Your signed-in browser becomes the tool
          </h3>
        </div>
        <div className="rounded-2xl border border-border/50 bg-background/50 px-4 py-3 text-sm text-muted-foreground sm:max-w-xs">
          Ask:{" "}
          <span className="break-words font-medium text-foreground">
            {comparison.prompt}
          </span>
        </div>
      </div>

      <div className="grid gap-4 py-5 sm:py-6 md:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border/45 bg-background/35 p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Without browser access
          </p>
          <p className="mt-3 text-lg font-semibold text-foreground">
            The agent stops and asks you to do the work.
          </p>
          <div className="mt-5 space-y-2">
            {comparison.withoutItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border/35 bg-card/50 px-3 py-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span className="min-w-0 break-words">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-border/40 bg-card/70 px-4 py-3 text-sm text-muted-foreground">
            {comparison.withoutAnswer}
          </div>
        </div>

        <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            With OmniScout
          </p>
          <p className="mt-3 text-lg font-semibold text-foreground">
            The same request runs through your real browser session.
          </p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            {comparison.withItems.map((item) => (
              <div
                key={item}
                className="flex min-h-11 items-start gap-2 rounded-xl border border-primary/15 bg-background/45 px-3.5 py-3 text-sm font-medium text-foreground"
              >
                <span className="shrink-0 text-primary">✓</span>
                <span className="min-w-0 break-words">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-primary/20 bg-background/60 px-4 py-3 text-sm font-semibold text-foreground">
            {comparison.withAnswer}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/45 bg-background/40 px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
        <span className="font-semibold text-foreground">{comparison.takeaway}</span>{" "}
        OmniScout handles the browser steps invisibly, then gives the model only the
        result it needs.
      </div>
    </div>
  );
}

export const QUICK_SETUP_SECTION_ID = "quick-setup";

export function CompleteGuide() {
  return (
    <section
      id={QUICK_SETUP_SECTION_ID}
      className="scroll-mt-28 overflow-x-clip border-t border-border/30 bg-card/20 py-20 md:scroll-mt-32 md:py-32"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5">
        <div className="mx-auto max-w-4xl space-y-16 md:space-y-20">
          {/* Advantages */}
          <FadeUp delay={0.05}>
            <SectionHeader
              tag="Why it helps"
              title="Same result, less work for the AI"
              description="OmniScout keeps the hard parts simple. It finds short answers before the model spends tokens, and it can use your own browser for real website tasks."
            />

            <div className="space-y-5">
              <CostSavingsTable />
              <BrowserComparisonPanel />
            </div>
          </FadeUp>

          <div className="gradient-divider" />

          {/* Intro */}
          <FadeUp className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-5">
              Get started
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Anyone can set this up
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Run 3 commands once. Then just ask your AI in plain English — it will
              browse, search, and fill in forms for you automatically.
            </p>
          </FadeUp>

          {/* Part 1 */}
          <FadeUp>
            <SectionHeader
              tag="Part 1 — one time only"
              title="Open a terminal on your computer"
            />
            <div className="space-y-3">
              <StepCard num={1}>
                <p className="text-sm font-semibold text-foreground">
                  Switch on your laptop and wait for it to fully load
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Make sure you can see your desktop before continuing.
                </p>
              </StepCard>
              <StepCard num={2}>
                <p className="text-sm font-semibold text-foreground">
                  Open the terminal (the text window where you type commands)
                </p>
                <p className="mt-1 mb-4 text-sm text-muted-foreground">
                  This is where you will type the 3 install commands below. Here is
                  how to open it on each system:
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="mb-1 text-xs font-mono uppercase tracking-widest text-primary">
                      Mac
                    </p>
                    <p className="text-muted-foreground">
                      Press <Kbd>Command ⌘ + Space</Kbd> — a search bar appears.
                      Type <Kbd>Terminal</Kbd> and press Enter.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-mono uppercase tracking-widest text-primary">
                      Windows
                    </p>
                    <p className="text-muted-foreground">
                      Press the <Kbd>Windows key</Kbd>. Type <Kbd>cmd</Kbd> and press
                      Enter. A black window opens — that is the Command Prompt.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-mono uppercase tracking-widest text-primary">
                      Linux
                    </p>
                    <p className="text-muted-foreground">
                      Press <Kbd>Ctrl + Alt + T</Kbd> — the terminal opens immediately.
                    </p>
                  </div>
                </div>
              </StepCard>
            </div>
          </FadeUp>

          <div className="gradient-divider" />

          {/* Part 2 */}
          <FadeUp delay={0.05}>
            <SectionHeader
              tag="Part 2 — run these 3 commands"
              title="Copy, paste, press Enter — one at a time"
              description="Each command installs one thing. The whole process takes about 2–5 minutes depending on your internet speed."
            />

            <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-5">
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

            <div className="space-y-3">
              <StepCard num={3}>
                <p className="text-sm font-semibold text-foreground">
                  Command 1 — installs OmniScout on your computer
                </p>
                <CopyableCommand command={INSTALL_COMMANDS[0]} className="mt-3" />
                <p className="mt-3 rounded-lg border border-border/30 bg-secondary/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  If you see &quot;pip is not recognised&quot;, install Python from
                  python.org first, then try again.
                </p>
              </StepCard>
              <StepCard num={4}>
                <p className="text-sm font-semibold text-foreground">
                  Command 2 — picks a browser and downloads the AI model
                </p>
                <CopyableCommand command={INSTALL_COMMANDS[1]} className="mt-3" />
                <p className="mt-3 text-sm text-muted-foreground">
                  It will ask you which browser to use (Chrome, Edge, Brave, etc.).
                  Press Enter to accept the default. It then downloads a small AI model
                  — this takes 1–3 minutes.
                </p>
                <div className="mt-3 rounded-lg border border-border/30 bg-secondary/30 px-3 py-2 text-xs text-muted-foreground">
                  No Chromium browser? Add --bundled:
                  <CopyableCommand
                    command="omniscout install --bundled"
                    className="mt-2"
                  />
                </div>
              </StepCard>
              <StepCard num={5}>
                <p className="text-sm font-semibold text-foreground">
                  Command 3 — tells your AI apps that OmniScout exists
                </p>
                <CopyableCommand command={INSTALL_COMMANDS[2]} className="mt-3" />
                <p className="mt-3 text-sm text-muted-foreground">
                This is the most important step. It writes instructions into Claude
                Code, Cursor, Codex, Cline, Windsurf, and other supported agents so
                they automatically use OmniScout whenever you ask them to search,
                browse, or fill in a form.
                </p>
              </StepCard>
            </div>
          </FadeUp>

          <div className="gradient-divider" />

          {/* Part 3 */}
          <FadeUp delay={0.05}>
            <SectionHeader
              tag="Part 3 — you are done. forever."
              title="Every day from now on — just talk to your AI normally"
            />
            <StepCard num="✓" variant="done">
              <p className="text-sm font-semibold text-foreground">
                Open any supported AI app — Claude Code, Cursor, Codex, Cline, and more
              </p>
              <p className="mt-1 mb-4 text-sm text-muted-foreground">
                Type <Kbd>/omniscout</Kbd> at the start of your message to activate it,
                then describe what you want in plain English.
              </p>
              <div className="space-y-2">
                {EXAMPLE_PROMPTS.map((prompt) => (
                  <CopyableCommand key={prompt} command={prompt} />
                ))}
              </div>
            </StepCard>
          </FadeUp>

          <div className="gradient-divider" />

          {/* Behind the scenes */}
          <FadeUp delay={0.05}>
            <SectionHeader
              tag="What actually happens"
              title="Your browser opens invisibly in the background"
              description="The moment you send your message, OmniScout silently takes over your default browser — the same Chrome or Edge you use every day — but hides it completely from your screen."
            />

            <div className="rounded-xl border border-border/40 bg-card p-5 sm:p-6">
              <p className="mb-5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Behind the scenes
              </p>
              <TimelineStep
                icon={<User className="h-3.5 w-3.5" aria-hidden />}
                title="You type your question in Claude Code, Codex, or Cursor"
                description="/omniscout what is the best laptop under 60000 rupees right now"
              />
              <TimelineStep
                icon={<Cpu className="h-3.5 w-3.5" aria-hidden />}
                title="OmniScout starts your browser silently in the background"
                description="Your Chrome or Edge opens without appearing on your screen. You will not see any window pop up."
              >
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-300">
                  <EyeOff className="h-3 w-3" aria-hidden />
                  invisible to you
                </span>
              </TimelineStep>
              <TimelineStep
                icon={<span className="text-[11px] font-semibold">3</span>}
                title="It opens 3 tabs at the same time — one for each search engine"
                description="All three searches happen simultaneously for speed and better coverage."
              >
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Google", "Bing", "DuckDuckGo"].map((engine) => (
                    <span
                      key={engine}
                      className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-secondary/40 px-2 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      <Search className="h-3 w-3" aria-hidden />
                      {engine}
                    </span>
                  ))}
                </div>
              </TimelineStep>
              <TimelineStep
                icon={<FileText className="h-3.5 w-3.5" aria-hidden />}
                title="It reads all the results and the actual pages behind them"
                description="Not just headline snippets — OmniScout clicks into the top results and reads the full content of each page."
              />
              <TimelineStep
                icon={<Check className="h-3.5 w-3.5" aria-hidden />}
                title="The summary appears directly in your AI app"
                description="The browser closes quietly. The answer shows up right where you typed your question."
                isLast
              />
            </div>

            <StepCard num="!" variant="warn" className="mt-4">
              <p className="text-sm font-semibold text-foreground">
                Your screen stays completely undisturbed
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                No tabs flash up. No windows move around. OmniScout works entirely in
                the background — like a helper in another room.
              </p>
            </StepCard>
          </FadeUp>

          <div className="gradient-divider" />

          {/* Use cases */}
          <FadeUp delay={0.05}>
            <SectionHeader
              tag="Things you can ask"
              title="Everyday tasks that used to take you 10 minutes"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map(({ icon: Icon, title, say, note }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border/40 bg-card p-4 transition-colors hover:border-primary/20"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-xs italic leading-relaxed text-primary/80">
                    {say}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Nothing is sent to the cloud.
                </span>{" "}
                OmniScout runs entirely on your computer. Your passwords, browsing
                history, and personal data never leave your machine.
              </p>
            </div>
          </FadeUp>

          <div className="gradient-divider" />

          {/* Outcome */}
          <FadeUp delay={0.05}>
            <SectionHeader
              tag="What you will see"
              title="After the 3 commands, here is exactly what changes"
              description="You open Claude Code, Cursor, Codex, or any supported agent — the same app you already use — and it now has a superpower."
            />

            <div className="overflow-hidden rounded-xl border border-border/40 bg-card">
              <div className="flex items-center gap-2 border-b border-border/30 bg-card/50 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-mono text-muted-foreground">
                  Claude Code — with OmniScout installed
                </span>
              </div>
              <div className="space-y-4 p-4 sm:p-5">
                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground">
                  /omniscout find me the best price for Sony WH-1000XM5 headphones
                  online right now
                </div>
                <div className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                    OS
                  </div>
                  <div className="min-w-0 flex-1 rounded-xl rounded-bl-sm border border-border/40 bg-secondary/30 p-3 text-sm leading-relaxed text-foreground">
                    <p className="mb-3 text-muted-foreground">
                      I searched across major retailers. Here are the best prices I
                      found right now:
                    </p>
                    <div className="space-y-2">
                      {[
                        {
                          store: "Amazon India",
                          detail: "Black, ships in 2 days, Prime eligible",
                          price: "₹24,990",
                        },
                        {
                          store: "Croma",
                          detail: "In stock, store pickup available today",
                          price: "₹26,490",
                        },
                        {
                          store: "Flipkart",
                          detail: "Extra 10% off with Axis Bank card",
                          price: "₹23,490 after discount",
                        },
                      ].map(({ store, detail, price }) => (
                        <div
                          key={store}
                          className="rounded-lg border border-border/30 bg-card/60 px-3 py-2"
                        >
                          <p className="text-xs font-semibold text-primary">{store}</p>
                          <p className="text-xs text-muted-foreground">{detail}</p>
                          <p className="mt-0.5 text-sm font-semibold text-emerald-400">
                            {price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
              The AI opened real websites, read the actual prices, and gave you a
              comparison — all in seconds. You did not touch a browser. Here is
              what changed in each app you use:
            </p>

            <SupportedAgentsGrid className="mt-8" />

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {OUTCOMES.map(({ label, title, desc }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border/40 bg-card p-4"
                >
                  <p className="mb-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
