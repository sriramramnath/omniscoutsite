import { cn } from "@/lib/utils";

export function SlideRevealText({
  primary,
  secondary,
  active = false,
  className,
}: {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("block h-5 overflow-hidden", className)}>
      <span
        className={cn(
          "flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          active ? "-translate-y-1/2" : "group-hover:-translate-y-1/2",
        )}
      >
        <span className="flex h-5 shrink-0 items-center leading-none">{primary}</span>
        <span className="flex h-5 shrink-0 items-center leading-none">{secondary}</span>
      </span>
    </span>
  );
}
