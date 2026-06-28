/** Shared Recharts styling — matches /compare page design tokens. */
export const CHART_COLORS = {
  Traditional: "hsl(0 65% 55%)",
  OmniScout: "#687FF3",
  Exa: "hsl(262 70% 60%)",
  Parallel: "hsl(160 55% 45%)",
  Hosted: "hsl(30 85% 55%)",
  Vendor: "hsl(160 55% 45%)",
  DIY: "hsl(262 70% 60%)",
  Browserbase: "hsl(30 85% 55%)",
  Playwright: "hsl(220 12% 52%)",
} as const;

const chartTooltipTextColor = "hsl(222 25% 12%)";

export const chartTooltipStyle = {
  backgroundColor: "hsl(0 0% 100%)",
  border: "1px solid hsl(220 14% 88%)",
  borderRadius: "8px",
  color: chartTooltipTextColor,
  fontSize: "12px",
  fontFamily: "var(--app-font-mono)",
} as const;

/** Recharts sets label/item text to black unless overridden explicitly. */
export const chartTooltipLabelStyle = {
  color: chartTooltipTextColor,
  fontSize: "12px",
  fontFamily: "var(--app-font-mono)",
} as const;

export const chartTooltipItemStyle = {
  color: chartTooltipTextColor,
  fontSize: "12px",
  fontFamily: "var(--app-font-mono)",
} as const;

/** Spread onto Recharts <Tooltip> for consistent dark-theme styling. */
export const chartTooltipProps = {
  contentStyle: chartTooltipStyle,
  labelStyle: chartTooltipLabelStyle,
  itemStyle: chartTooltipItemStyle,
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

export const chartGridStroke = "hsl(220 14% 90%)";
export const chartCursorFill = "hsl(210 16% 94%)";
