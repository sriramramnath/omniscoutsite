export type ChangelogSectionKind = "Added" | "Changed" | "Fixed";

export interface ChangelogRelease {
  version: string;
  date?: string;
  label?: string;
  sections: Partial<Record<ChangelogSectionKind, string[]>>;
}

export const changelogReleases: ChangelogRelease[] = [
  {
    version: "0.2.9.1",
    date: "2026-06-10",
    label: "Beta",
    sections: {
      Added: [
        "**--delay on browser screenshot** — wait N seconds before capture so loading animations and spinners can finish (Playwright + extension backends).",
      ],
    },
  },
  {
    version: "0.2.9",
    date: "2026-06-10",
    label: "Beta",
    sections: {
      Added: [
        "**omniscout graph** — structured knowledge graphs for products, companies, and people. Default 3 web sources, local LLM tree output (Company, Founders, Competitors, Pricing, Features, Reviews, …). Pass a URL or --website to crawl one site and same-host links only.",
        "**--full-length screenshot flag** — alias for --full-page on browser screenshot; captures the full scrollable document.",
      ],
      Fixed: [
        "Extension full-page screenshots now use Page.getLayoutMetrics for true document-height captures instead of viewport-sized images.",
      ],
    },
  },
  {
    version: "0.2.8",
    date: "2026-06-09",
    label: "Beta",
    sections: {
      Added: [
        "**Query-driven structured extraction** — extract --query searches DDG, crawls seed URLs, follows same-host links (--depth, default 3), merges pages, and emits structured fields. --results controls seed count; --data includes crawl_sources and timing.",
        "**Depth-aware crawler** — crawl_bfs() for bounded multi-level same-host link expansion.",
      ],
      Changed: [
        "Structured founder extraction prefers Company was founded by Name, rejects employee/subordinate-clause false positives, and resolves Space X-style queries to SpaceX from DDG titles.",
        "Detail-page enrichment follows about/contact/plans links when fields are empty.",
        "Agent skill files bundle in omniscout/data/ (fixes CI wheel build).",
      ],
      Fixed: [
        "False founder matches (e.g. Tom Mueller reported as SpaceX founder).",
        "Query crawls prefer spacex.com/Wikipedia over tag-aggregator pages.",
      ],
    },
  },
  {
    version: "0.2.7.1",
    date: "2026-06-07",
    label: "Beta",
    sections: {
      Changed: [
        "PyPI project URLs now point to omniscout.xyz and docs.omniscout.xyz.",
      ],
    },
  },
  {
    version: "0.2.7",
    date: "2026-06-07",
    label: "Beta",
    sections: {
      Added: [
        "**Browser automation v1** — type, paste, select; back, forward, reload; get title|url|text|html, is; wait text|selector|networkidle|url; mouse scroll|move; console start|stop|list|tail; network tail.",
        "**omniscout settings** — settings show, settings browsers, and settings set browser to pick a Chromium browser for automation.",
        "**Multi-browser support** — Chrome, Edge, Brave, Vivaldi, Opera One, Arc, Dia, Thorium, Chromium, or a custom binary. Install prompts interactively (omniscout install --browser <id>).",
        "**Structured extraction** — extract --format structured auto-extracts flat JSON (NLP, no LLM): metadata, pricing, socials, docs/blog/careers links, and labeled fields. Use --fields to limit; --data for full ExtractResult.",
      ],
      Changed: [
        "Browser launch (daemon, extract, sessions) resolves the configured browser via a shared catalog with automatic fallback to other installed Chromium builds.",
        "Config.toml prefers browser = \"…\" over legacy browser_channel.",
      ],
    },
  },
  {
    version: "0.2.6",
    date: "2026-06-05",
    label: "Beta",
    sections: {
      Added: [
        "**omniscout answer** — grounded web answers with SmolLM2-360M, extractive fallback, source filtering, and entity-aware who-is retrieval.",
        "**Direct-answer-first pipeline** — DuckDuckGo HTML, Search Assist, and filtered Instant API hits before broader retrieval; local math via direct+calc.",
        "**Factual extractors** — capital-city, height/measurement, and who-is parsing from glued DDG snippets.",
        "**Answer validation** — rejects book titles, question-shaped answers, role mismatches, and incomplete person names.",
      ],
      Changed: [
        "Answer escalation: extractive → local LLM → crawl (max two gov/bio URLs for who-is).",
        "Source filtering blocks constitution/textbook URLs, exam-prep domains, and weak wiki stubs.",
        "Docs and agent skill use omniscout answer as the primary answer interface.",
        "PyPI classifier promoted to Development Status :: 4 - Beta.",
      ],
      Fixed: [
        "Who-is grounding — India PM vs Tamil Nadu CM confusion; biography snippets over stale index hits.",
        "Name extraction preserves middle initials (e.g. Donald J. Trump).",
        "Filters DDG Instant disambiguation junk and weak location blurbs for height queries.",
      ],
    },
  },
  {
    version: "0.2.5",
    date: "2026-06-04",
    sections: {
      Fixed: [
        "Legacy harness imports — compatibility package restores from harness.app import main for old console script wrappers.",
      ],
    },
  },
  {
    version: "0.2.4",
    date: "2026-06-04",
    sections: {
      Changed: [
        "Python package renamed to omniscout — pip install omniscout; harness console command remains a legacy alias.",
      ],
      Fixed: [
        "Browser profile singleton lock — reclaims stale Chrome SingletonLock files; one BrowserContext per (profile, headful).",
      ],
    },
  },
  {
    version: "0.2.3",
    date: "2026-05-31",
    sections: {
      Added: [
        "Full OmniScout agent skill — search, research, extract, memory, and browser automation.",
        "Antigravity skill install — omniscout install --skill writes to ~/.gemini/config/skills/scout/.",
      ],
      Fixed: [
        "DDG search profile lock — ephemeral Chrome context for bot challenges when daemon is running.",
        "DDG bot challenge — browser fallback submits the search form instead of a GET URL.",
      ],
    },
  },
  {
    version: "0.2.2",
    date: "2026-05-31",
    sections: {
      Added: [
        "ASCII OMNISCOUT banner on bare omniscout and root --help invocations.",
        "Daemon embed action and /status embed model fields.",
        "Auto-prefetch embedding model to disk on first embed use.",
        "harness.env module — unified OMNISCOUT_* / legacy HARNESS_* resolution.",
      ],
      Changed: [
        "OmniScout is the primary brand — omniscout / OMNISCOUT_* prefix; scout short alias.",
        "Data directory default: ~/Library/Application Support/omniscout/.",
        "Qdrant collections renamed to omniscout_passages and omniscout_memory.",
        "Embedding model stays warm in the daemon (OMNISCOUT_EMBED_DAEMON=1 default).",
      ],
    },
  },
  {
    version: "0.2.1",
    date: "2026-05-30",
    sections: {
      Changed: [
        "License — Modified MIT (Kimi-style): display Powered by OmniScout on product UIs.",
      ],
      Added: ["Rickroll Easter egg (omniscout --rickroll)."],
      Fixed: ["Stop tracking built wheels/sdists in git; ignore cli/dist/ for local builds."],
    },
  },
  {
    version: "0.2.0",
    date: "2026-05-30",
    sections: {
      Added: [
        "Browser memory — remember, memory list/show/note/delete/stats/clear.",
        "Semantic search over remembered visits: search --source memory.",
        "search --source hybrid — memory + DuckDuckGo, deduplicated.",
        "Session replay UX — replay action-<id>, replay session-<name>.",
        "workflow export — JSON steps from state + action history.",
      ],
      Changed: [
        "hybrid search source means memory + DDG (--source index for crawl corpus).",
      ],
    },
  },
  {
    version: "0.1.0",
    date: "2026-05-28",
    sections: {
      Added: [
        "Initial PyPI release (omniscout).",
        "Browser daemon at 127.0.0.1:7720 with auto-start, session restore, trace/replay/watch.",
        "Browser commands — navigate, snapshot (@eN refs), click, fill, scroll, screenshot, login, captcha, network, and more.",
        "Chrome extension backend for real-Chrome control.",
        "Semantic search — DuckDuckGo HTML + local sentence-transformers rerank.",
        "Content extraction, research pipeline, workflow shortcuts, JSON agent contract.",
        "GitHub Actions CI and PyPI trusted publishing.",
      ],
      Changed: [
        "Renamed distribution from harness-harness to omniscout; harness kept as alias.",
      ],
    },
  },
];

export const latestChangelogVersion = changelogReleases[0]?.version ?? "0.2.7";

/** First PyPI release promoted to Development Status :: 4 - Beta. */
export const BETA_FIRST_VERSION = "0.2.6";

function parseVersion(version: string): number[] {
  return version.split(".").map((part) => parseInt(part, 10) || 0);
}

function compareVersion(a: string, b: string): number {
  const left = parseVersion(a);
  const right = parseVersion(b);
  const len = Math.max(left.length, right.length);
  for (let i = 0; i < len; i++) {
    const diff = (left[i] ?? 0) - (right[i] ?? 0);
    if (diff !== 0) return diff < 0 ? -1 : 1;
  }
  return 0;
}

export function isBetaRelease(version: string): boolean {
  return compareVersion(version, BETA_FIRST_VERSION) >= 0;
}

export type ReleaseStability = "Beta" | "Alpha";

export function releaseStability(release: ChangelogRelease): ReleaseStability {
  if (release.label === "Beta" || isBetaRelease(release.version)) return "Beta";
  return "Alpha";
}

export function formatChangelogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
