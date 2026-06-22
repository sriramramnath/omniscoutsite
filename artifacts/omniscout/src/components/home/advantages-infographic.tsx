import { useState } from "react";
import {
  ADVANTAGES_ANALOGY,
  ADVANTAGES_FOOTER,
  ADVANTAGES_HEADER,
  ADVANTAGES_SCENARIOS,
  ADVANTAGES_TYPICAL_RESULTS,
  ADVANTAGES_VALUE_PROP,
} from "@/data/advantages-content";
import { cn } from "@/lib/utils";

export function AdvantagesInfographic() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRow = ADVANTAGES_SCENARIOS[activeIndex];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {ADVANTAGES_HEADER.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {ADVANTAGES_HEADER.subtitle}
        </p>
      </div>

      {/* Comparative examples */}
      <div className="overflow-hidden rounded-[1.5rem] border border-border/50 bg-card">
        <div className="hidden border-b border-border/50 bg-background/40 px-5 py-3 sm:grid sm:grid-cols-[1.2fr_1fr_1fr_0.7fr_0.9fr] sm:gap-3 sm:text-[10px] sm:font-mono sm:uppercase sm:tracking-[0.2em] sm:text-muted-foreground">
          <div>User Question</div>
          <div>Traditional AI Search</div>
          <div>OmniScout Answer</div>
          <div>Token Reduction</div>
          <div>Example Savings</div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-border/50 px-4 py-4 sm:px-5">
          {ADVANTAGES_SCENARIOS.map((row, index) => (
            <button
              key={row.question}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={cn(
                "rounded-full border px-3.5 py-2 text-xs transition-colors",
                index === activeIndex
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/70 bg-background/50 text-muted-foreground hover:text-foreground",
              )}
            >
              Scenario {index + 1}
            </button>
          ))}
        </div>

        <div className="sm:hidden">
          <div className="grid gap-0">
            <div className="border-b border-border/40 px-5 py-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                User Question
              </p>
              <p className="text-base font-semibold leading-snug text-foreground">
                {activeRow.question}
              </p>
            </div>
            <div className="border-b border-border/40 px-5 py-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Traditional AI Search
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {activeRow.traditional}
              </p>
            </div>
            <div className="border-b border-border/40 bg-primary/[0.04] px-5 py-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                OmniScout Answer
              </p>
              <p className="text-sm leading-relaxed text-foreground">{activeRow.omniscout}</p>
            </div>
            <div className="border-b border-border/40 px-5 py-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Token Reduction
              </p>
              <p className="text-3xl font-semibold text-primary">{activeRow.reduction}</p>
              <p className="mt-1 text-xs text-muted-foreground">fewer tokens</p>
            </div>
            <div className="px-5 py-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Example Savings
              </p>
              <p className="text-sm font-medium text-emerald-400">{activeRow.savings}</p>
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          {ADVANTAGES_SCENARIOS.map((row) => (
            <div
              key={row.question}
              className="grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.9fr] gap-3 border-t border-border/40 px-5 py-4 text-sm not-last:border-border/30"
            >
              <div className="font-medium text-foreground">{row.question}</div>
              <div className="text-muted-foreground">{row.traditional}</div>
              <div className="text-foreground">{row.omniscout}</div>
              <div className="font-semibold text-primary">{row.reduction}</div>
              <div className="text-emerald-400">{row.savings}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple analogy flowchart */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-red-500/25 bg-red-500/[0.06] p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-300">
            {ADVANTAGES_ANALOGY.without.label}
          </p>
          <div className="mt-5 space-y-3">
            {ADVANTAGES_ANALOGY.without.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs font-semibold text-red-300">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground/90">{step}</span>
                {index < ADVANTAGES_ANALOGY.without.steps.length - 1 && (
                  <span className="ml-auto hidden text-red-300/60 sm:inline" aria-hidden>
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-red-500/20 bg-background/40 px-4 py-3 text-sm font-medium text-red-200">
            {ADVANTAGES_ANALOGY.without.outcome}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-300">
            {ADVANTAGES_ANALOGY.with.label}
          </p>
          <div className="mt-5 space-y-3">
            {ADVANTAGES_ANALOGY.with.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-300">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground/90">{step}</span>
                {index < ADVANTAGES_ANALOGY.with.steps.length - 1 && (
                  <span className="ml-auto hidden text-emerald-300/60 sm:inline" aria-hidden>
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-emerald-500/20 bg-background/40 px-4 py-3 text-sm font-medium text-emerald-200">
            {ADVANTAGES_ANALOGY.with.outcome}
          </p>
        </div>
      </div>

      {/* Typical results + value prop */}
      <div className="overflow-hidden rounded-[1.5rem] border border-border/50 bg-card">
        <div className="grid md:grid-cols-[1.35fr_0.65fr]">
          <div className="border-b border-border/50 md:border-b-0 md:border-r">
            <div className="hidden border-b border-border/50 px-5 py-3 sm:grid sm:grid-cols-3 sm:text-[10px] sm:font-mono sm:uppercase sm:tracking-[0.24em] sm:text-muted-foreground">
              <div>Metric</div>
              <div>Traditional Search + LLM</div>
              <div className="text-primary">OmniScout</div>
            </div>
            {ADVANTAGES_TYPICAL_RESULTS.map((row) => (
              <div
                key={row.metric}
                className="grid gap-2 border-b border-border/35 px-5 py-4 last:border-b-0 sm:grid-cols-3 sm:items-center"
              >
                <div className="font-medium text-foreground">{row.metric}</div>
                <div className="text-sm text-muted-foreground sm:text-base">
                  {row.traditional}
                </div>
                <div className="text-sm font-semibold text-primary sm:text-base">
                  {row.omniscout}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center bg-primary/[0.05] p-6">
            <p className="text-xl font-bold leading-tight text-foreground sm:text-2xl">
              {ADVANTAGES_VALUE_PROP.headline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {ADVANTAGES_VALUE_PROP.body}
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 px-5 py-4 text-center text-sm text-muted-foreground">
          {ADVANTAGES_FOOTER.split("70–95%").map((part, i) =>
            i === 0 ? (
              <span key={i}>
                {part}
                <span className="font-semibold text-foreground">70–95%</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
