/**
 * LLM input pricing baseline: GPT-4o at $2.50 / 1M input tokens.
 * Used for apples-to-apples LLM cost estimates across approaches.
 */
export const LLM_INPUT_COST_PER_TOKEN = 2.5 / 1_000_000;

export function llmCostFromTokens(tokens: number): number {
  return tokens * LLM_INPUT_COST_PER_TOKEN;
}

export function formatUsd(cost: number): string {
  if (cost >= 0.01) return `$${cost.toFixed(4)}`;
  if (cost >= 0.0001) return `$${cost.toFixed(5)}`;
  return `$${cost.toFixed(6)}`;
}

export function formatTokens(tokens: number): string {
  return tokens.toLocaleString();
}

export function tokenReduction(traditional: number, omniscout: number): string {
  const pct = ((traditional - omniscout) / traditional) * 100;
  return `${pct >= 99.95 ? pct.toFixed(1) : Math.round(pct)}%`;
}

export function tokenSavingsMultiplier(traditional: number, omniscout: number): string {
  const mult = traditional / omniscout;
  return `${Math.round(mult)}x fewer tokens`;
}

/** Exact content from the "How OmniScout Reduces AI Costs" infographic. */
export const ADVANTAGES_HEADER = {
  title: "How OmniScout Reduces AI Costs",
  subtitle: "Get precise answers. Use fewer tokens. Save more.",
} as const;

export const ADVANTAGES_SCENARIOS = [
  {
    question: "Who is the President of the United States?",
    traditional:
      "AI reads multiple search results (~1,500 tokens) before answering.",
    omniscout: 'Returns "Donald Trump" (~4 tokens).',
    traditionalTokens: 1500,
    omniscoutTokens: 4,
  },
  {
    question: "What is Apple's current stock price?",
    traditional:
      "AI reads finance websites and market snippets (~2,000 tokens).",
    omniscout: "Returns the latest price (~10 tokens).",
    traditionalTokens: 2000,
    omniscoutTokens: 10,
  },
  {
    question: "What is the return policy? (Support Bot)",
    traditional:
      "AI reads several knowledge-base articles (~4,000 tokens).",
    omniscout: "Extracts the policy statement (~12 tokens).",
    traditionalTokens: 4000,
    omniscoutTokens: 12,
  },
].map((row) => ({
  ...row,
  reduction: tokenReduction(row.traditionalTokens, row.omniscoutTokens),
  savings: tokenSavingsMultiplier(row.traditionalTokens, row.omniscoutTokens),
  traditionalCost: llmCostFromTokens(row.traditionalTokens),
  omniscoutCost: llmCostFromTokens(row.omniscoutTokens),
}));

export const ADVANTAGES_ANALOGY = {
  without: {
    label: "Without OmniScout",
    steps: [
      "Ask a question",
      "AI reads 10 web pages",
      "AI finds the answer",
    ],
    outcome: "Higher token usage and cost.",
  },
  with: {
    label: "With OmniScout",
    steps: [
      "Ask a question",
      "OmniScout finds the answer first",
      "AI reads only the answer",
    ],
    outcome: "Up to 95% lower token usage.",
  },
} as const;

export const ADVANTAGES_TYPICAL_RESULTS = [
  {
    metric: "Input Tokens",
    traditional: "1,000 – 5,000",
    omniscout: "4 – 200",
  },
  {
    metric: "Response Speed",
    traditional: "Slower",
    omniscout: "Faster",
  },
  {
    metric: "LLM Cost",
    traditional: "Higher",
    omniscout: "Up to 99% lower",
  },
  {
    metric: "Context Window Usage",
    traditional: "High",
    omniscout: "Minimal",
  },
] as const;

export const ADVANTAGES_VALUE_PROP = {
  headline: "Save up to 95% on LLM token costs.",
  body: "OmniScout finds and extracts the precise answer before it reaches your LLM—so you send less context, spend less, and get answers faster.",
} as const;

export const ADVANTAGES_FOOTER =
  "Typical users see 70–95% fewer LLM tokens for search-heavy workflows.";

export type CostViewMode = "tokens" | "cost";

export function getScenarioChartValue(
  mode: CostViewMode,
  kind: "traditional" | "omniscout",
  row: (typeof ADVANTAGES_SCENARIOS)[number],
): number {
  if (mode === "tokens") {
    return kind === "traditional" ? row.traditionalTokens : row.omniscoutTokens;
  }
  return kind === "traditional" ? row.traditionalCost : row.omniscoutCost;
}

/** Chart-friendly data for token/cost toggle. */
export function buildTokenChartData(mode: CostViewMode) {
  return ADVANTAGES_SCENARIOS.map((row) => ({
    name: row.question.split("?")[0].slice(0, 22) + "…",
    fullQuestion: row.question,
    Traditional: getScenarioChartValue(mode, "traditional", row),
    OmniScout: getScenarioChartValue(mode, "omniscout", row),
  }));
}

export function formatChartValue(mode: CostViewMode, value: number): string {
  return mode === "tokens" ? `${value.toLocaleString()} tok` : formatUsd(value);
}
