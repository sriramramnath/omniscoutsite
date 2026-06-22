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
    omniscout: 'Returns "Donald Trump" (~50 tokens).',
    reduction: "97%",
    savings: "20x-30x fewer tokens saved",
    traditionalTokens: 1500,
    omniscoutTokens: 50,
  },
  {
    question: "What is Apple's current stock price?",
    traditional:
      "AI reads finance websites and market snippets (~2,000 tokens).",
    omniscout: "Returns the latest price (~50 tokens).",
    reduction: "97%",
    savings: "20x-40x fewer tokens saved",
    traditionalTokens: 2000,
    omniscoutTokens: 50,
  },
  {
    question: "What is the return policy? (Support Bot)",
    traditional:
      "AI reads several knowledge-base articles (~4,000 tokens).",
    omniscout: "Extracts the policy statement (~100 tokens).",
    reduction: "97.5%",
    savings: "40x fewer tokens saved",
    traditionalTokens: 4000,
    omniscoutTokens: 100,
  },
] as const;

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
    omniscout: "20 – 200",
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

export const ADVANTAGES_VALUE_PROP = {
  headline: "Save up to 95% on LLM token costs.",
  body: "OmniScout finds and extracts the precise answer before it reaches your LLM—so you send less context, spend less, and get answers faster.",
} as const;

export const ADVANTAGES_FOOTER =
  "Typical users see 70–95% fewer LLM tokens for search-heavy workflows.";

/** Chart-friendly token data derived from the three infographic scenarios. */
export const TOKEN_CHART_DATA = ADVANTAGES_SCENARIOS.map((row) => ({
  name: row.question.split("?")[0].slice(0, 22) + "…",
  fullQuestion: row.question,
  Traditional: row.traditionalTokens,
  OmniScout: row.omniscoutTokens,
}));
