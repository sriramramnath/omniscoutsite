import type { ComponentType, SVGProps } from "react";
import {
  ClaudeAI,
  CodexDark,
  CursorDark,
  Gemini,
  GitHubCopilotDark,
  GoogleAntigravity,
  OpenCodeDark,
  VisualStudioCode,
  WindsurfDark,
} from "@ridemountainpig/svgl-react";
import { cn } from "@/lib/utils";

type AgentIcon = ComponentType<SVGProps<SVGSVGElement>> | "cline";

export type SupportedAgent = {
  name: string;
  where: string;
  icon: AgentIcon;
};

export const SUPPORTED_AGENTS: SupportedAgent[] = [
  { name: "Claude Code", where: "In your terminal", icon: ClaudeAI },
  { name: "Cursor", where: "In your code editor", icon: CursorDark },
  { name: "GitHub Copilot", where: "In your editor", icon: GitHubCopilotDark },
  { name: "Windsurf", where: "In your code editor", icon: WindsurfDark },
  { name: "OpenAI Codex CLI", where: "In your terminal", icon: CodexDark },
  { name: "Gemini CLI", where: "In your terminal", icon: Gemini },
  { name: "Cline", where: "VS Code extension", icon: "cline" },
  { name: "OpenCode", where: "In your terminal", icon: OpenCodeDark },
  { name: "Antigravity", where: "Google AI IDE", icon: GoogleAntigravity },
  { name: "GitHub Copilot CLI", where: "In your terminal", icon: GitHubCopilotDark },
  { name: "VS Code Agent Mode", where: "In VS Code", icon: VisualStudioCode },
];

function AgentLogo({
  icon,
  className,
}: {
  icon: AgentIcon;
  className?: string;
}) {
  if (icon === "cline") {
    return (
      <img
        src="/logos/cline.svg"
        alt=""
        className={cn("h-4 w-4 object-contain", className)}
        aria-hidden
      />
    );
  }

  const Icon = icon;
  return <Icon className={cn("h-4 w-4", className)} aria-hidden />;
}

export function SupportedAgentsGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {SUPPORTED_AGENTS.map((agent) => (
        <div
          key={agent.name}
          className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-card p-3 transition-colors hover:border-primary/25"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/30 bg-secondary/40">
            <AgentLogo icon={agent.icon} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">
              {agent.name}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {agent.where}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
