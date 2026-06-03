import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { SlideRevealText } from "@/components/ui/slide-reveal-text";

export function AnimatedNavLink({
  href,
  children,
  className,
  external = false,
  active = false,
  onClick,
  "data-testid": dataTestId,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  active?: boolean;
  onClick?: () => void;
  "data-testid"?: string;
}) {
  const linkClass = cn(
    "group relative inline-flex h-5 items-center text-sm",
    className,
  );

  const label = (
    <SlideRevealText
      active={active}
      primary={<span className={active ? "text-white" : "text-zinc-400"}>{children}</span>}
      secondary={<span className="text-white">{children}</span>}
    />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
        onClick={onClick}
        data-testid={dataTestId}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass} onClick={onClick} data-testid={dataTestId}>
      {label}
    </Link>
  );
}
