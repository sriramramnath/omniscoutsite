export type ChangelogSectionKind = "Added" | "Changed" | "Fixed";

export interface ChangelogRelease {
  version: string;
  date?: string;
  label?: string;
  sections: Partial<Record<ChangelogSectionKind, string[]>>;
}

export const changelogReleases: ChangelogRelease[] = [
  {
    version: "0.2.15",
    date: "2026-06-20",
    label: "Beta",
    sections: {
      Added: [
        "**omniscout answer --probe** — experimental flag to synthesize answers with Omniscout Probe Zero Mini instead of the default SmolLM2 answer model.",
        "**Probe Zero Mini distillation** — support-derived EXA-style teacher formatting from the existing DDG retrieval pipeline (no EXA data as a source).",
      ],
      Changed: [
        "**Default answer model unchanged** — still HuggingFaceTB/SmolLM2-360M-Instruct; Probe Zero Mini is opt-in via --probe for now.",
      ],
    },
  },
  {
    version: "0.2.14",
    date: "2026-06-19",
    label: "Beta",
    sections: {
      Changed: [
        "**Answer retrieval avoids DDG browser challenge hangs** — answer keeps DDG paths HTTP-only, uses DDG Lite before browser rendering for search, and lazy-loads crawl/extract/embed dependencies only when crawl escalation is needed.",
        "**Role answer extraction is broader and stricter** — CEO/founder/person answers handle source titles like Name - Co-founder & CEO at Company, Company CEO Name, and glued snippets such as CompanyCEOand co-founder, Name.",
      ],
      Fixed: [
        "**Bad role answers from headlines and stale cache** — cache validation rejects fragments like Built, Ping Labs CEO, and generic leadership-team text, and can repair invalid cached role answers from their cached sources when a validated name is present.",
        "**No-answer formatting** — fallback text is no longer wrapped as The CEO of X is I could not find a reliable answer.",
      ],
    },
  },
  {
    version: "0.2.13",
    date: "2026-06-18",
    label: "Beta",
    sections: {
      Added: [
        "**Answer diagnostics** — --data can report direct_ms, crawl_ms, extract_ms, and browser_fallback_count alongside existing retrieval timings.",
        "**Regression coverage** — grounded search --answer routing, ranked support reuse, fast-mode no-crawl behavior, role/person validation, cache rejection, and no-browser direct-answer fallbacks.",
      ],
      Changed: [
        "**search --answer now uses the grounded local answer pipeline** — direct answers, ranked snippet supports, optional local synthesis, and crawl escalation replace the older extractive-only router.",
        "**Answer latency guardrails** — fast/balanced answer retrieval uses answer-specific DDG/crawl budgets and avoids browser fallback by default.",
        "**Role/person answer shaping** — who-is, CEO, founder, president, PM, and CM questions use shared role-intent parsing and validated role sentences.",
      ],
      Fixed: [
        "**Bad cached answers** — cached answers are validated on read and write, so empty strings and headline fragments like “Steps Down” are ignored.",
        "**Repeated answer blanks/timeouts** — validated who-is answers use the short freshness-sensitive cache TTL, and direct-answer DDG paths no longer launch a browser by default after a DDG challenge.",
      ],
    },
  },
  {
    version: "0.2.12",
    date: "2026-06-17",
    label: "Beta",
    sections: {
      Added: [
        "**omniscout auto** — routes free-form input to the best command (search, answer, research, graph, extract, remember, or open) using lightweight intent heuristics.",
        "**Routing diagnostics** — auto --data shows the routing decision and passes diagnostics through to the chosen command.",
      ],
    },
  },
  {
    version: "0.2.11",
    date: "2026-06-16",
    label: "Beta",
    sections: {
      Added: [
        "**Site Markdown export** — extract URL --depth N --out site.md crawls same-host links and writes one combined Markdown file (--max-pages, --max-links, --concurrency). JSON mode returns SiteExportResult.",
        "**Expanded answer gold dataset** — 10 additional benchmark queries.",
        "**Daemon embed throughput** — OMNISCOUT_EMBED_WORKERS (default 2); embed_queue_ms diagnostic.",
      ],
      Changed: [
        "Retrieval optimizations on by default — conditional_rerank, crawl_gate, parallel_retrieval (env overrides still supported).",
        "research --depth ≥ 2 uses BFS link crawl from top DDG seeds.",
        "Headless automated crawls — extract/research/search/DDG fallbacks stay background; headful_on_challenge default off.",
        "Extraction retries on short trafilatura output; site export dedupes by content hash.",
        "Comparison queries never skip semantic rerank; extended spam/aggregator blocklist.",
      ],
      Fixed: [
        "research --depth CLI flag was previously ignored.",
      ],
    },
  },
  {
    version: "0.2.10",
    date: "2026-06-13",
    label: "Beta",
    sections: {
      Added: [
        "**Retrieval benchmarks** — benchmark retrieval (recall@3/5, MRR) and benchmark ablation (optimization matrix presets).",
        "**benchmark answers --pipeline** — grade extractive, LLM, or both pipelines with per-stage timing and skip rates.",
        "**Retrieval feature flags** — SHARED_RETRIEVAL, FUSE_EMBED (on by default); CONDITIONAL_RERANK, CRAWL_GATE, PARALLEL_RETRIEVAL (off by default). Flags surface in --data.",
        "**Shared retrieve_hits()** — unified ranking for search --answer and omniscout answer.",
        "**Confidence calibration** — multi-signal crawl-skip gating (≥ 0.75 confidence; blocked on freshness and deep depth).",
        "**Skip diagnostics** — rerank/crawl skip reasons and confidence_score on --data.",
        "**Unified challenge handling** — detect/solve CAPTCHAs and bot blocks (reCAPTCHA, hCaptcha, Turnstile, Cloudflare, DataDome, PerimeterX) across browser, DDG, and crawl.",
        "**Stealth browser launch** — reduced automation signals and dynamic Chrome UA (on by default).",
        "**CAPTCHA auto-resolve** — --auto-captcha on navigate; Capsolver Cloudflare + reCAPTCHA v3; challenge.detected SSE events.",
        "**Challenge-aware crawl/DDG** — profile-backed browser fallback with headful manual captcha handoff.",
      ],
      Changed: [
        "Fused embedding batches for rerank, LLM crawl, and research (one daemon hop).",
        "Conditional rerank skips embed on stable heuristic rankings; caps rerank pool to top 12.",
        "Answer cache key normalization and LLM freshness bypass; high-confidence answers cacheable.",
        "Freshness classifier includes year tokens (20xx).",
        "Optional parallel index + DDG in balanced mode (PARALLEL_RETRIEVAL=1).",
      ],
    },
  },
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
