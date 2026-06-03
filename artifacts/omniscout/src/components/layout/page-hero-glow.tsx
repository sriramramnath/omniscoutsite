/**
 * Dark hero atmosphere for inner pages (no WebGL). Home uses HeroCanvasBackground.
 */
export function PageHeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_rgba(104,127,243,0.035)_0%,_transparent_55%)]" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-primary/[0.02] blur-[100px]" />
      <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-background via-background/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
