import raw from "./probe-zero-benchmark.json";

export interface ProbeEngineMetrics {
  label: string;
  description: string;
  formatPass: number;
  notOneWord: number;
  completeSentence: number;
  goldFactRetained: number;
}

export interface ProbeZeroBenchmark {
  benchmarkVersion: string;
  dataset: string;
  evaluatedAt: string;
  methodology: string;
  improvements: {
    accuracyPercent: number;
    speedPercent: number;
  };
  speed: {
    probeAvgMs: number;
    classicAvgMs: number;
    improvementPercent: number;
    label: string;
  };
  engines: {
    probeZero: ProbeEngineMetrics;
    classic: ProbeEngineMetrics;
  };
  categoryComparison: Array<{
    category: string;
    probePass: number;
    classicPass: number;
    queries: number;
  }>;
  categoryDistribution: Array<{ category: string; queries: number }>;
  artifactVersion: string;
  artifactSizeMb: number;
  quantization: string;
}

export const PROBE_BENCHMARK = raw as ProbeZeroBenchmark;

export const PROBE_CHART_COLORS = {
  probe: "#687FF3",
  classic: "#34d399",
} as const;
