import { cn } from "@/lib/utils";
import type { CostViewMode } from "@/data/advantages-content";

export function ViewModeToggle({
  mode,
  onChange,
}: {
  mode: CostViewMode;
  onChange: (mode: CostViewMode) => void;
}) {
  return (
    <div
      className="inline-flex rounded-full border border-border/50 bg-background/60 p-1"
      role="group"
      aria-label="View mode"
    >
      {(
        [
          { id: "tokens" as const, label: "Tokens" },
          { id: "cost" as const, label: "Cost" },
        ] as const
      ).map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={mode === id}
          className={cn(
            "rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
            mode === id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

type ComparisonRow = {
  metric: string;
  highlight?: boolean;
  values: Record<string, string>;
};

export function ComparisonTable({
  title,
  columns,
  rows,
  highlightColumn,
}: {
  title: string;
  columns: readonly string[];
  rows: readonly ComparisonRow[];
  highlightColumn?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/40 bg-card">
      <div className="border-b border-border/40 bg-background/40 px-4 py-3 sm:px-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {title}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-background/20">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-5">
                Metric
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className={cn(
                    "px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] sm:px-4",
                    col === highlightColumn
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.metric}
                className="border-b border-border/30 last:border-b-0"
              >
                <td
                  className={cn(
                    "px-4 py-3 font-medium text-foreground sm:px-5",
                    row.highlight && "text-primary",
                  )}
                >
                  {row.metric}
                </td>
                {columns.map((col) => (
                  <td
                    key={col}
                    className={cn(
                      "px-3 py-3 text-xs leading-relaxed sm:px-4 sm:text-sm",
                      col === highlightColumn
                        ? "bg-primary/[0.04] font-medium text-foreground"
                        : "text-muted-foreground",
                      row.highlight && col === highlightColumn && "text-primary",
                    )}
                  >
                    {row.values[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
