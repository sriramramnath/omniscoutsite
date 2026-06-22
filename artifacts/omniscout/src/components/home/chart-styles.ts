/** Shared Recharts styling — matches /compare page design tokens. */
export const CHART_COLORS = {
  Traditional: "hsl(0 65% 55%)",
  OmniScout: "#687FF3",
  Hosted: "hsl(30 85% 55%)",
  Vendor: "hsl(160 55% 45%)",
  DIY: "hsl(262 70% 60%)",
} as const;

export const chartTooltipStyle = {
  backgroundColor: "hsl(222 22% 7%)",
  border: "1px solid hsl(222 16% 18%)",
  borderRadius: "8px",
  color: "hsl(210 20% 96%)",
  fontSize: "12px",
  fontFamily: "var(--app-font-mono)",
} as const;

export const chartAxisTick = {
  fill: "hsl(220 12% 52%)",
  fontSize: 10,
  fontFamily: "var(--app-font-mono)",
} as const;

export const chartYAxisTick = {
  fill: "hsl(220 12% 52%)",
  fontSize: 11,
  fontFamily: "var(--app-font-mono)",
} as const;

export const chartLegendStyle = {
  fontSize: "11px",
  fontFamily: "var(--app-font-mono)",
  color: "hsl(220 12% 52%)",
  paddingTop: "12px",
} as const;

export const chartGridStroke = "hsl(222 16% 13%)";
export const chartCursorFill = "hsl(222 16% 13%)";
