/**
 * LLM input pricing baseline: GPT-4o at $2.50 / 1M input tokens.
 * Used for apples-to-apples LLM cost estimates across approaches.
 */
export const LLM_INPUT_COST_PER_TOKEN = 2.5 / 1_000_000;

export function llmCostFromTokens(tokens: number): number {
  return tokens * LLM_INPUT_COST_PER_TOKEN;
}

export function formatUsd(cost: number): string {
  const precision = cost >= 0.01 ? 4 : cost >= 0.0001 ? 5 : 6;
  const value = cost.toFixed(precision).replace(/\.?0+$/, "");
  return `$${value}`;
}

export function formatTokens(tokens: number): string {
  return tokens.toLocaleString();
}

export function tokenReduction(traditional: number, omniscout: number): string {
  const pct = ((traditional - omniscout) / traditional) * 100;
  const rounded = Math.round(pct * 10) / 10;
  return rounded % 1 === 0 ? `${Math.floor(rounded)}%` : `${rounded}%`;
}

/** Infographic copy — matches the token-savings visual. */
export const ADVANTAGES_HEADER = {
  titleLead: "How OmniScout Reduces",
  titleAccent: "LLM Token Usage",
  subtitle:
    "With OmniScout, it either uses its own API or OmniScout silently opens a browser in background to find the answer, reducing LLM token usage.",
  subtitleHighlight: "OmniScout silently opens a browser in background",
} as const;

export const ADVANTAGES_COMPARISON = {
  without: {
    label: "WITHOUT OMNISCOUT",
    tagline: "LLM reads many search results",
    steps: [
      { label: "User Question" },
      { label: "AI Search" },
      { label: "Many Results", detail: "(1,000 – 5,000 tokens)", badge: "10+" },
      { label: "LLM Reads Everything", isLlm: true },
      { label: "Higher Token Usage & Cost", isOutcome: true },
    ],
    stats: {
      inputTokens: "1,000 – 5,000+ to LLM",
      responseSpeed: "Slower",
      llmCost: "Higher",
    },
  },
  with: {
    label: "WITH OMNISCOUT",
    tagline: "Only the answer is sent to LLM",
    steps: [
      { label: "User Question" },
      { label: "OmniScout", isOmniScout: true },
      {
        label: "Finds the answer",
        branch: {
          api: "Uses OmniScout API",
          browser: "OmniScout silently opens browser in background",
        },
      },
      { label: "Answer Only", detail: "(20 – 200 tokens)", isAnswer: true },
      { label: "LLM Gets Only What It Needs", isLlm: true },
      { label: "Up to 95% Lower Token Usage & Cost", isOutcome: true },
    ],
    stats: {
      inputTokens: "20 – 200 to LLM",
      responseSpeed: "Faster",
      llmCost: "Up to 95% Lower",
    },
  },
} as const;

export const ADVANTAGES_SCENARIOS = [
  {
    question: "Who is the President of the United States?",
    icon: "🇺🇸",
    traditionalTokens: 1500,
    omniscoutTokens: 50,
    reduction: "97%",
    savings: "20x – 30x fewer tokens",
  },
  {
    question: "What is Apple's current stock price?",
    icon: "chart",
    traditionalTokens: 2000,
    omniscoutTokens: 50,
    reduction: "97%",
    savings: "20x – 40x fewer tokens",
  },
  {
    question: "What is the return policy? (Support Bot)",
    icon: "headphones",
    traditionalTokens: 4000,
    omniscoutTokens: 100,
    reduction: "97.5%",
    savings: "40x fewer tokens",
  },
].map((row) => ({
  ...row,
  traditionalCost: llmCostFromTokens(row.traditionalTokens),
  omniscoutCost: llmCostFromTokens(row.omniscoutTokens),
}));

export const ADVANTAGES_WHY_IT_MATTERS = [
  {
    title: "More accurate response with live data from authentic websites",
    description: "Instead of your LLM's previous year knowledge.",
    tone: "blue" as const,
  },
  {
    title: "Faster Responses",
    description: "Less to read, quicker answers.",
    tone: "green" as const,
  },
  {
    title: "More Room for Important Context",
    description: "Save context window for what matters.",
    tone: "purple" as const,
  },
  {
    title: "Private & Silent",
    description: "Your queries and data never reach our cloud.",
    tone: "orange" as const,
  },
] as const;

export const ADVANTAGES_VALUE_PROP = {
  headline: "Smarter Search. Lower Costs. Better AI.",
  body: "OmniScout finds the answer first, so your LLM does less and performs more.",
} as const;

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
