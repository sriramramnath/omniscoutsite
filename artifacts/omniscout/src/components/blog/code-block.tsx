import { useCallback, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { HighlighterCore } from "shiki/core";
import { cn } from "@/lib/utils";

let highlighterPromise: Promise<HighlighterCore> | null = null;

async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        bash,
        githubDark,
      ] = await Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
        import("shiki/dist/langs/bash.mjs"),
        import("shiki/dist/themes/github-dark.mjs"),
      ]);

      return createHighlighterCore({
        themes: [githubDark.default],
        langs: [bash.default],
        engine: createJavaScriptRegexEngine(),
      });
    })();
  }
  return highlighterPromise;
}

export function CodeBlock({
  children,
  language = "bash",
  className,
}: {
  children: string;
  language?: "bash" | "shell";
  className?: string;
}) {
  const code = children.trim();
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getHighlighter()
      .then((highlighter) =>
        highlighter.codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        }),
      )
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [code]);

  return (
    <div
      className={cn(
        "not-prose relative my-4 overflow-hidden rounded-lg border border-border/40 bg-[hsl(222_22%_6%)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/30 bg-[hsl(222_22%_5%)] px-3 py-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-mono transition-colors",
            "text-muted-foreground hover:bg-card/60 hover:text-foreground",
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {html ? (
        <div
          className={cn(
            "overflow-x-auto p-4 text-[13px] leading-relaxed",
            "[&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0",
            "[&_code]:font-mono",
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
          <code className="font-mono text-zinc-300">{code}</code>
        </pre>
      )}
    </div>
  );
}
