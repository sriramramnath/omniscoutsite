import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "block" | "inline";

export function CopyableCommand({
  command,
  variant = "block",
  className,
}: {
  command: string;
  variant?: Variant;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [command]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <code
        className={cn(
          "min-w-0 flex-1 font-mono text-xs text-foreground sm:text-sm",
          variant === "block"
            ? "block rounded-lg border border-border/50 bg-secondary/40 px-3 py-2 leading-relaxed"
            : "rounded-md border border-border/50 bg-card px-2.5 py-1.5",
        )}
      >
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
        aria-label={copied ? "Copied to clipboard" : "Copy command"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
