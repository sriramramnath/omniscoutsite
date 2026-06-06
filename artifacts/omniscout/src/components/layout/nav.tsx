import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Github } from "lucide-react";
import { AnimatedNavLink } from "@/components/layout/animated-nav-link";
import { cn } from "@/lib/utils";

const PYPI_URL = "https://pypi.org/project/omniscout/";

const links = [
  { label: "Features", href: "/features" },
  { label: "Compare", href: "/compare" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Blog", href: "/blogs" },
  { label: "Changelog", href: "/changelog" },
  { label: "Docs", href: "https://omniscout-docs.vercel.app/", external: true },
  { label: "PyPI", href: PYPI_URL, external: true },
];

const menuEase = [0.25, 0.1, 0.25, 1] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pillRounded, setPillRounded] = useState(true);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }
    if (open) {
      setPillRounded(false);
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setPillRounded(true);
      }, 280);
    }
    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [open]);

  const isActive = (href: string) => !href.startsWith("http") && location === href;

  return (
    <motion.header
      layout
      transition={{ layout: { duration: 0.35, ease: menuEase } }}
      className={cn(
        "fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 flex-col items-stretch",
        "border border-[#333] bg-[#1f1f1f57] px-4 py-2.5 backdrop-blur-md sm:top-6 sm:w-[calc(100%-2rem)] sm:px-5",
        pillRounded ? "rounded-full" : "rounded-2xl",
      )}
      data-testid="nav-main"
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex min-w-0 flex-shrink items-center gap-1.5 sm:gap-2"
          aria-label="OmniScout home"
        >
          <img
            src="/favicon.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 flex-shrink-0"
            data-testid="nav-logo"
          />
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            OmniScout
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex md:gap-5">
          {links.map(({ label, href, external }) => (
            <AnimatedNavLink
              key={href}
              href={href}
              external={external}
              active={isActive(href)}
              data-testid={`nav-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="https://github.com/sriramramnath/omniscout"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="hidden items-center justify-center rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] p-2 text-zinc-400 transition-colors duration-200 hover:border-white/50 hover:text-white sm:flex"
            data-testid="link-github-nav"
          >
            <Github className="h-4 w-4" />
          </a>

          <Link
            href="/compare"
            className="group relative hidden sm:inline-block"
            data-testid="button-nav-cta"
          >
            <span className="pointer-events-none absolute inset-0 -m-1.5 rounded-full bg-primary/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
            <span className="relative z-10 inline-flex items-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:from-zinc-200 hover:to-zinc-400">
              Get started
            </span>
          </Link>

          <button
            type="button"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: menuEase }}
            className="overflow-hidden md:hidden"
          >
            <motion.nav
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.34, ease: menuEase }}
              className="flex flex-col items-center gap-1 border-t border-[#333]/80 pt-4 pb-1"
            >
              {links.map(({ label, href, external }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.28, ease: menuEase }}
                  className="w-full"
                >
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-2.5 text-center text-sm text-zinc-400 transition-colors hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={cn(
                        "block w-full py-2.5 text-center text-sm transition-colors",
                        isActive(href) ? "text-white" : "text-zinc-400 hover:text-white",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.12, duration: 0.28, ease: menuEase }}
              className="mt-2 flex w-full flex-col gap-2 border-t border-[#333]/60 pt-4 pb-1"
            >
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PYPI_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] py-2.5 text-center text-xs text-zinc-300 transition-colors hover:border-white/50 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  PyPI
                </a>
                <a
                  href="https://github.com/sriramramnath/omniscout"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] py-2.5 text-center text-xs text-zinc-300 transition-colors hover:border-white/50 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  GitHub
                </a>
              </div>
              <Link
                href="/compare"
                className="w-full rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 py-2.5 text-center text-xs font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Get started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
