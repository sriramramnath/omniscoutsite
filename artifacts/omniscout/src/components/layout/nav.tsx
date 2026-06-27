import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const PYPI_URL = "https://pypi.org/project/omniscout/";
const GITHUB_URL = "https://github.com/sriramramnath";

type NavItem = {
  label: string;
  description: string;
  href: string;
  external?: boolean;
  image: string;
  imageAlt: string;
  /** Default cover; use contain for logos and product art. */
  imageFit?: "cover" | "contain";
};

type NavGroup = {
  id: string;
  label: string;
  summary: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    id: "product",
    label: "Product",
    summary: "See what OmniScout does and where it fits.",
    items: [
      {
        label: "Features",
        description: "Browser control, search, extraction, and memory.",
        href: "/features",
        image: "/nav/features.jpg",
        imageAlt: "Lucide layers icon on a mesh gradient background",
      },
      {
        label: "Probe Zero",
        description: "Local answer engine with published gold-benchmark metrics.",
        href: "/probe-zero",
        image: "/nav/probe-zero.jpg",
        imageAlt: "Probe Zero icon on a radial gradient background",
      },
      {
        label: "Use cases",
        description: "Research, monitoring, automation, and agent workflows.",
        href: "/use-cases",
        image: "/nav/use-cases.jpg",
        imageAlt: "Lucide workflow icon on a diagonal pattern background",
      },
      {
        label: "Compare",
        description: "Local-first automation versus hosted browser stacks.",
        href: "/compare",
        image: "/nav/compare.jpg",
        imageAlt: "Lucide compare arrows icon on a grid pattern background",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    summary: "Install, learn, and keep up with the project.",
    items: [
      {
        label: "Developer docs",
        description: "Commands, browser APIs, and integration details.",
        href: "https://docs.omniscout.xyz",
        external: true,
        image: "/nav/docs.jpg",
        imageAlt: "Lucide book icon on a wave pattern background",
      },
      {
        label: "Blog",
        description: "Guides and field notes for browser-enabled agents.",
        href: "/blogs",
        image: "/nav/blog.jpg",
        imageAlt: "Lucide newspaper icon on a dotted gradient background",
      },
      {
        label: "Changelog",
        description: "New releases, fixes, and capability updates.",
        href: "/changelog",
        image: "/nav/changelog.jpg",
        imageAlt: "Lucide git commit icon on a concentric pattern background",
      },
      {
        label: "PyPI package",
        description: "View releases and install the Python package.",
        href: PYPI_URL,
        external: true,
        image: "/nav/pypi.jpg",
        imageAlt: "Simple Icons PyPI logo on a linear gradient background",
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    summary: "Talk to the builder or inspect the source.",
    items: [
      {
        label: "Contact",
        description: "Project questions, collaborations, and support.",
        href: "/contact",
        image: "/nav/contact.jpg",
        imageAlt: "Lucide mail icon on a crosshatch pattern background",
      },
      {
        label: "GitHub",
        description: "Read the source, report issues, and contribute.",
        href: GITHUB_URL,
        external: true,
        image: "/nav/github.jpg",
        imageAlt: "Simple Icons GitHub logo on an aurora gradient background",
      },
    ],
  },
];

const menuEase = [0.16, 1, 0.3, 1] as const;

function NavDestination({
  item,
  className,
  onFocus,
  onMouseEnter,
  onClick,
}: {
  item: NavItem;
  className: string;
  onFocus?: () => void;
  onMouseEnter?: () => void;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [previewHref, setPreviewHref] = useState(navGroups[0].items[0].href);
  const [location] = useLocation();
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pillRounded, setPillRounded] = useState(true);

  useEffect(() => {
    setOpen(false);
    setOpenGroupId(null);
  }, [location]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroupId(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (open) {
      setPillRounded(false);
    } else {
      shapeTimeoutRef.current = setTimeout(() => setPillRounded(true), 280);
    }
    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  const activeGroup = navGroups.find((group) => group.id === openGroupId) ?? null;
  const previewItem =
    activeGroup?.items.find((item) => item.href === previewHref) ?? activeGroup?.items[0];

  const openGroup = (group: NavGroup) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenGroupId(group.id);
    setPreviewHref(group.items[0].href);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setOpenGroupId(null), 120);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const isActive = (href: string) => !href.startsWith("http") && location === href;

  return (
    <motion.header
      layout
      transition={{ layout: { duration: 0.35, ease: menuEase } }}
      className={cn(
        "fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 flex-col items-stretch",
        "border border-[#333] bg-[#111318]/95 px-4 py-2.5 backdrop-blur-md sm:top-6 sm:w-[calc(100%-2rem)] sm:px-5",
        pillRounded ? "rounded-full" : "rounded-2xl",
      )}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navGroups.map((group) => {
            const groupOpen = group.id === openGroupId;
            const groupActive = group.items.some((item) => isActive(item.href));
            return (
              <button
                key={group.id}
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                  groupOpen || groupActive
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white",
                )}
                aria-expanded={groupOpen}
                aria-controls={`nav-panel-${group.id}`}
                onMouseEnter={() => openGroup(group)}
                onFocus={() => openGroup(group)}
                onClick={() => (groupOpen ? setOpenGroupId(null) : openGroup(group))}
                data-testid={`nav-group-${group.id}`}
              >
                {group.label}
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform", groupOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
            );
          })}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="hidden items-center justify-center rounded-full border border-[#333] bg-[#1f1f1f] p-2 text-zinc-400 transition-colors duration-200 hover:border-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 sm:flex"
            data-testid="link-github-nav"
          >
            <Github className="h-4 w-4" />
          </a>

          <Link
            href="/install"
            className="group relative hidden sm:inline-block"
            data-testid="button-nav-cta"
          >
            <span className="relative z-10 inline-flex items-center rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-black transition-colors duration-200 hover:bg-white">
              Get started
            </span>
          </Link>

          <button
            type="button"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 md:hidden"
            onClick={() => setOpen((value) => !value)}
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

      <AnimatePresence>
        {activeGroup && previewItem && (
          <motion.div
            id={`nav-panel-${activeGroup.id}`}
            key={activeGroup.id}
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: menuEase }}
            className="absolute inset-x-0 top-full hidden pt-2 md:block"
            onMouseEnter={cancelClose}
          >
            <div className="grid min-h-[300px] grid-cols-[0.9fr_1.1fr] gap-3 rounded-xl border border-white/10 bg-[#111318] p-3">
              <div className="relative min-h-0 overflow-hidden rounded-lg bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={previewItem.image}
                    src={previewItem.image}
                    alt={previewItem.imageAlt}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: menuEase }}
                    className={cn(
                      "absolute inset-0 h-full w-full",
                      previewItem.imageFit === "contain"
                        ? "object-contain p-6"
                        : "object-cover",
                    )}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-lg font-semibold text-white">{previewItem.label}</p>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-zinc-300">
                    {previewItem.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-3">
                <div className="mb-4 border-b border-white/10 pb-4">
                  <p className="text-base font-semibold text-white">{activeGroup.label}</p>
                  <p className="mt-1 text-sm text-zinc-400">{activeGroup.summary}</p>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  {activeGroup.items.map((item) => (
                    <div key={item.href} className="group/row relative">
                      <NavDestination
                        item={item}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                          previewItem.href === item.href
                            ? "bg-white/8 text-white"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white",
                        )}
                        onFocus={() => setPreviewHref(item.href)}
                        onMouseEnter={() => setPreviewHref(item.href)}
                      />
                      <ArrowUpRight className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-hover/row:text-white" aria-hidden />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: menuEase }}
            className="overflow-hidden md:hidden"
          >
            <motion.nav
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.28, ease: menuEase }}
              className="mt-3 max-h-[70dvh] overflow-y-auto border-t border-[#333]/80 pt-4 pb-1"
              aria-label="Mobile navigation"
            >
              {navGroups.map((group) => (
                <div key={group.id} className="mb-4 last:mb-1">
                  <p className="mb-1 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <NavDestination
                      key={item.href}
                      item={item}
                      className={cn(
                        "block w-full rounded-lg px-2 py-2.5 text-left text-sm transition-colors",
                        isActive(item.href) ? "bg-white/8 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white",
                      )}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </div>
              ))}
            </motion.nav>
            <div className="mt-2 border-t border-[#333]/60 pt-4 pb-1">
              <Link
                href="/install"
                className="block w-full rounded-full bg-zinc-100 py-2.5 text-center text-xs font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
