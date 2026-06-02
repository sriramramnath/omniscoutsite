import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Github, Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "/features" },
  { label: "Compare", href: "/compare" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Docs", href: "#" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl"
      data-testid="nav-main"
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight">OmniScout</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          {links.map(({ label, href }) => {
            const active = href !== "#" && location === href;
            return (
              <Link
                key={label}
                href={href}
                className={`transition-colors duration-200 ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-link-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/omniscout"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-github-nav"
          >
            <Github className="w-4 h-4" />
          </a>
          <Link
            href="/compare"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
            data-testid="button-nav-cta"
          >
            Get started
          </Link>
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/30 px-5 py-4 flex flex-col gap-3 text-sm bg-background/90 backdrop-blur-xl">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
