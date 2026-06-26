export function HeroTitleGradient({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-br from-white via-white to-primary/80 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
