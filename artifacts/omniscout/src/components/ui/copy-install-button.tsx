import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlideRevealText } from "@/components/ui/slide-reveal-text";

const INSTALL_CMD = "pip install omniscout";
const WIDTH_EASE = [0.25, 0.1, 0.25, 1] as const;

export function CopyInstallButton({
  className,
  testId,
}: {
  className?: string;
  testId?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [showCopiedLabel, setShowCopiedLabel] = useState(false);
  const measureFullRef = useRef<HTMLSpanElement>(null);
  const measureCopiedRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState({ full: 0, copied: 0 });
  const labelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    const full = measureFullRef.current?.offsetWidth ?? 0;
    const copiedW = measureCopiedRef.current?.offsetWidth ?? 0;
    if (full > 0 && copiedW > 0) {
      setWidths({ full, copied: copiedW });
    }
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      if (labelTimerRef.current) clearTimeout(labelTimerRef.current);
      setCopied(true);
      setShowCopiedLabel(false);
      labelTimerRef.current = setTimeout(() => setShowCopiedLabel(true), 320);
      window.setTimeout(() => {
        setShowCopiedLabel(false);
        labelTimerRef.current = setTimeout(() => setCopied(false), 340);
      }, 2400);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  const padX = 32;
  const iconGap = 10;
  const iconW = 16;
  const targetWidth =
    widths.full > 0
      ? copied
        ? widths.copied + padX + iconGap + iconW
        : widths.full + padX + iconGap + iconW
      : undefined;

  const muted = "text-muted-foreground";
  const bright = "text-foreground";

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] top-0 whitespace-nowrap opacity-0"
      >
        <span ref={measureFullRef}>
          <code className="font-mono text-xs">{INSTALL_CMD}</code>
        </span>
        <span ref={measureCopiedRef}>
          <code className="font-mono text-xs">Copied!</code>
        </span>
      </span>

      <motion.button
        type="button"
        onClick={copy}
        initial={false}
        animate={{ width: targetWidth ?? "auto" }}
        transition={{ duration: 0.55, ease: WIDTH_EASE }}
        className={cn(
          "group inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-border",
          "bg-card px-4 py-2.5 text-sm shadow-sm backdrop-blur-sm",
          "transition-colors duration-200 hover:border-primary/30",
          className,
        )}
        style={targetWidth ? { width: targetWidth } : undefined}
        data-testid={testId}
        aria-label={showCopiedLabel ? "Copied to clipboard" : "Copy install command"}
      >
        <SlideRevealText
          active={showCopiedLabel}
          primary={
            <code
              className={cn(
                "whitespace-nowrap font-mono text-xs",
                showCopiedLabel ? bright : muted,
              )}
            >
              {showCopiedLabel ? "Copied!" : INSTALL_CMD}
            </code>
          }
          secondary={
            <code className="whitespace-nowrap font-mono text-xs text-foreground">
              {showCopiedLabel ? "Copied!" : INSTALL_CMD}
            </code>
          }
        />
        <span className="relative h-4 w-4 shrink-0">
          {showCopiedLabel ? (
            <Check className="h-4 w-4 text-emerald-600" aria-hidden />
          ) : (
            <>
              <Copy
                className="absolute inset-0 h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-foreground"
                aria-hidden
              />
              <span
                className="block h-4 w-4 text-muted-foreground transition-opacity duration-200 group-hover:opacity-0"
                aria-hidden
              >
                →
              </span>
            </>
          )}
        </span>
      </motion.button>
    </>
  );
}
