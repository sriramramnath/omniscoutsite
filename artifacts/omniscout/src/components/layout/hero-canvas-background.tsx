import { useEffect, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

const BRAND_RGB: [number, number, number][] = [
  [104, 127, 243],
  [160, 175, 255],
];

export function HeroCanvasBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(104,127,243,0.12)_0%,_transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <CanvasRevealEffect
        animationSpeed={3}
        containerClassName="bg-background"
        colors={BRAND_RGB}
        dotSize={5}
        showGradient={false}
        reverse={false}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(104,127,243,0.12)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--background))_0%,_transparent_65%)]" />
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
