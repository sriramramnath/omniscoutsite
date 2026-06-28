import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Coins,
  FileText,
  Gauge,
  Globe,
  Headphones,
  Shield,
} from "lucide-react";
import {
  ADVANTAGES_HEADER,
  ADVANTAGES_SCENARIOS,
  ADVANTAGES_VALUE_PROP,
  ADVANTAGES_WHY_IT_MATTERS,
} from "@/data/advantages-content";
import { cn } from "@/lib/utils";

const WHY_ICONS: Record<(typeof ADVANTAGES_WHY_IT_MATTERS)[number]["tone"], LucideIcon> = {
  blue: Coins,
  green: Gauge,
  purple: FileText,
  orange: Shield,
};

const WHY_ICON_STYLES: Record<(typeof ADVANTAGES_WHY_IT_MATTERS)[number]["tone"], string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
};

function ScenarioIcon({ icon }: { icon: string }) {
  if (icon === "🇺🇸") {
    return <span className="text-base leading-none" aria-hidden>🇺🇸</span>;
  }
  if (icon === "chart") {
    return <BarChart3 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />;
  }
  return <Headphones className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />;
}

function ComparisonImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="mx-auto w-full max-w-[1024px] overflow-hidden rounded-2xl bg-background shadow-sm">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

export function AdvantagesInfographic() {
  return (
    <article className="mx-auto w-full space-y-12 sm:space-y-16">
      <header className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {ADVANTAGES_HEADER.titleLead}{" "}
          <span className="text-foreground">{ADVANTAGES_HEADER.titleAccent}</span>
        </h2>
      </header>

      <div className="space-y-8">
        <ComparisonImage
          src="/without-omniscout.png"
          alt="Without OmniScout: LLM reads many search results, higher token usage and cost"
          width={1024}
          height={682}
        />
        <ComparisonImage
          src="/with-omniscout.png"
          alt="With OmniScout: only the answer is sent to the LLM, up to 95% lower token usage"
          width={1024}
          height={682}
        />
      </div>

      <section className="overflow-hidden rounded-2xl bg-background shadow-sm">
        <div className="flex items-center justify-center gap-2 border-b border-border/60 px-4 py-4">
          <Globe className="h-4 w-4 text-muted-foreground" aria-hidden />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Real-world examples
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/80 text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">User Question</th>
                <th className="px-4 py-3 font-medium">Traditional AI Search</th>
                <th className="px-4 py-3 font-medium">With OmniScout</th>
                <th className="px-4 py-3 font-medium">Token Reduction</th>
                <th className="px-4 py-3 font-medium">Example Savings</th>
              </tr>
            </thead>
            <tbody>
              {ADVANTAGES_SCENARIOS.map((row) => (
                <tr key={row.question} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-4 font-medium text-foreground">
                    <div className="flex items-start gap-2">
                      <ScenarioIcon icon={row.icon} />
                      <span>{row.question}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    ~{row.traditionalTokens.toLocaleString()} tokens
                  </td>
                  <td className="px-4 py-4 font-medium text-primary">
                    ~{row.omniscoutTokens} tokens
                  </td>
                  <td className="px-4 py-4 font-semibold text-emerald-600">{row.reduction}</td>
                  <td className="px-4 py-4 font-medium text-emerald-700">{row.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="mb-8 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Why it matters
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {ADVANTAGES_WHY_IT_MATTERS.map(({ title, description, tone }) => {
            const Icon = WHY_ICONS[tone];
            return (
              <div
                key={title}
                className="flex gap-4 rounded-2xl bg-background p-5 shadow-sm"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    WHY_ICON_STYLES[tone],
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="rounded-2xl bg-background px-6 py-8 text-center shadow-sm sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <img src="/favicon.svg" alt="" width={40} height={40} className="h-10 w-10" />
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">{ADVANTAGES_VALUE_PROP.headline}</span>{" "}
            {ADVANTAGES_VALUE_PROP.body}
          </p>
        </div>
      </footer>
    </article>
  );
}
