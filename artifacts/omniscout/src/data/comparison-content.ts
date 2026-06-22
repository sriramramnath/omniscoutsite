/**
 * Competitor comparison data — sourced from public pricing pages (June 2026).
 *
 * Search: exa.ai/pricing ($7/1k search w/ contents), parallel.ai/docs ($5/1k search),
 *         traditional = raw SERP + page dumps into LLM context.
 * Browser: browserbase.com/docs ($20/mo Developer, $0.12/hr overage, 1-min minimum),
 *          Playwright = OSS, self-hosted.
 */

import { formatUsd, llmCostFromTokens, LLM_INPUT_COST_PER_TOKEN } from "@/data/advantages-content";

/** President question baseline — same query across all search approaches. */
const PRESIDENT_QUERY = "Who is the President of the United States?";

export const SEARCH_COMPARISON_COLUMNS = [
  "Traditional",
  "Exa",
  "Parallel",
  "OmniScout",
] as const;

export type SearchColumn = (typeof SEARCH_COMPARISON_COLUMNS)[number];

/** Per-query figures for the president question workflow. */
const SEARCH_QUERY_DATA: Record<
  SearchColumn,
  { apiCost: number; llmTokens: number; notes: string }
> = {
  Traditional: {
    apiCost: 0,
    llmTokens: 1500,
    notes: "SERP snippets + scraped pages fed raw to LLM",
  },
  Exa: {
    apiCost: 0.007,
    llmTokens: 900,
    notes: "$7/1k search; 10 results w/ text + highlights (exa.ai/pricing)",
  },
  Parallel: {
    apiCost: 0.005,
    llmTokens: 350,
    notes: "$5/1k search; compressed excerpts included (parallel.ai/docs)",
  },
  OmniScout: {
    apiCost: 0,
    llmTokens: 4,
    notes: 'Local answer extraction → "Donald Trump" to LLM',
  },
};

function totalQueryCost(apiCost: number, llmTokens: number): number {
  return apiCost + llmCostFromTokens(llmTokens);
}

export const SEARCH_COMPARISON_ROWS = [
  {
    metric: "Query",
    values: {
      Traditional: PRESIDENT_QUERY,
      Exa: PRESIDENT_QUERY,
      Parallel: PRESIDENT_QUERY,
      OmniScout: PRESIDENT_QUERY,
    },
  },
  {
    metric: "Search API cost",
    values: {
      Traditional: formatUsd(SEARCH_QUERY_DATA.Traditional.apiCost),
      Exa: formatUsd(SEARCH_QUERY_DATA.Exa.apiCost),
      Parallel: formatUsd(SEARCH_QUERY_DATA.Parallel.apiCost),
      OmniScout: formatUsd(SEARCH_QUERY_DATA.OmniScout.apiCost),
    },
  },
  {
    metric: "LLM input tokens",
    values: {
      Traditional: "1,500",
      Exa: "900",
      Parallel: "350",
      OmniScout: "4",
    },
  },
  {
    metric: "LLM cost",
    highlight: true,
    values: {
      Traditional: formatUsd(llmCostFromTokens(1500)),
      Exa: formatUsd(llmCostFromTokens(900)),
      Parallel: formatUsd(llmCostFromTokens(350)),
      OmniScout: formatUsd(llmCostFromTokens(4)),
    },
  },
  {
    metric: "Total per query",
    highlight: true,
    values: {
      Traditional: formatUsd(totalQueryCost(0, 1500)),
      Exa: formatUsd(totalQueryCost(0.007, 900)),
      Parallel: formatUsd(totalQueryCost(0.005, 350)),
      OmniScout: formatUsd(totalQueryCost(0, 4)),
    },
  },
  {
    metric: "How it works",
    values: {
      Traditional: SEARCH_QUERY_DATA.Traditional.notes,
      Exa: SEARCH_QUERY_DATA.Exa.notes,
      Parallel: SEARCH_QUERY_DATA.Parallel.notes,
      OmniScout: SEARCH_QUERY_DATA.OmniScout.notes,
    },
  },
] as const;

export const BROWSER_COMPARISON_COLUMNS = [
  "OmniScout",
  "Browserbase",
  "Playwright",
] as const;

export type BrowserColumn = (typeof BROWSER_COMPARISON_COLUMNS)[number];

export const BROWSER_COMPARISON_ROWS = [
  {
    metric: "Cost model",
    values: {
      OmniScout: "Free, runs locally",
      Browserbase: "$20/mo Developer (100 hrs) + $0.12/hr overage",
      Playwright: "Free OSS + your compute",
    },
  },
  {
    metric: "5-min session cost",
    highlight: true,
    values: {
      OmniScout: "$0",
      Browserbase: "~$0.01",
      Playwright: "$0 (your hardware)",
    },
  },
  {
    metric: "Runs locally",
    values: {
      OmniScout: "Yes",
      Browserbase: "No (cloud)",
      Playwright: "Yes",
    },
  },
  {
    metric: "Long-lived daemon",
    values: {
      OmniScout: "Yes, sub-second actions",
      Browserbase: "Yes, cloud-hosted",
      Playwright: "No (you build it)",
    },
  },
  {
    metric: "Real Chrome logins",
    values: {
      OmniScout: "Yes (extension mode)",
      Browserbase: "No (remote session)",
      Playwright: "Yes (persistent context)",
    },
  },
  {
    metric: "CAPTCHA handling",
    values: {
      OmniScout: "Local handoff (2captcha opt-in)",
      Browserbase: "Auto (paid plans)",
      Playwright: "DIY",
    },
  },
  {
    metric: "Agent-ready CLI",
    values: {
      OmniScout: "Yes (omniscout browser …)",
      Browserbase: "API / SDK required",
      Playwright: "Scripts you write",
    },
  },
  {
    metric: "1-min session minimum",
    values: {
      OmniScout: "No",
      Browserbase: "Yes (billed per minute)",
      Playwright: "No",
    },
  },
] as const;

/** Chart data: total cost per search query for bar chart in comparison section. */
export const SEARCH_COST_CHART_DATA = SEARCH_COMPARISON_COLUMNS.map((col) => {
  const d = SEARCH_QUERY_DATA[col];
  return {
    name: col,
    total: totalQueryCost(d.apiCost, d.llmTokens),
    api: d.apiCost,
    llm: llmCostFromTokens(d.llmTokens),
  };
});

export const PRICING_FOOTNOTE = `LLM costs use GPT-4o input pricing ($${(LLM_INPUT_COST_PER_TOKEN * 1_000_000).toFixed(2)}/1M tokens). Search API rates from exa.ai/pricing and parallel.ai/docs (June 2026). Browserbase from browserbase.com/docs.`;
