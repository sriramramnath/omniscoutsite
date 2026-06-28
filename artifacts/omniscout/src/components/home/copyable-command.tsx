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
            ? "block rounded-xl bg-background px-3 py-2.5 leading-relaxed shadow-sm"
            : "rounded-lg bg-background px-2.5 py-1.5 shadow-sm",
        )}
      >
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        aria-label={copied ? "Copied to clipboard" : "Copy command"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
