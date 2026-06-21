import { motion } from "framer-motion";
import { ArrowRight, Github, Search, Shield, Terminal } from "lucide-react";
import { Link } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroCanvasBackground } from "@/components/layout/hero-canvas-background";
import { HeroTerminal } from "@/components/layout/hero-terminal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const quickLinks = [
  {
    title: "Install OmniScout",
    description: "Three commands, local setup, and supported agent instructions.",
    href: "/install",
    label: "Start setup",
  },
  {
    title: "Compare options",
    description: "See how OmniScout stacks up against hosted browsers and DIY tools.",
    href: "/compare",
    label: "View comparison",
  },
  {
    title: "Read the docs",
    description: "CLI commands, agent setup, and integration details.",
    href: "https://docs.omniscout.xyz",
    label: "Open docs",
    external: true,
  },
] as const;

const proofPoints = [
  {
    icon: Terminal,
    title: "Local CLI",
    description: "Your agent drives a real browser from the shell.",
  },
  {
    icon: Search,
    title: "Search and extract",
    description: "Find live pages and return compact answers.",
  },
  {
    icon: Shield,
    title: "Your machine",
    description: "No hosted browser session or cloud handoff.",
  },
] as const;

export default function Home() {
  useDocumentMeta(routePageMeta["/"]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/25 overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-24 md:pt-28">
        <HeroCanvasBackground />

        <div className="relative z-10">
          <ContainerScroll
            className="px-2 md:px-5"
            titleComponent={
              <div className="px-3 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="mx-auto mb-6 inline-flex items-center rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  Local browser control for AI agents
                </motion.div>

                <div className="mb-7 overflow-hidden">
                  {["Give your agent", "a browser.", "Nothing in the cloud."].map((line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + i * 0.12,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <h1
                        className={`text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl ${
                          i === 1 ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {line}
                      </h1>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl"
                >
                  OmniScout lets Claude Code, Cursor, Codex, and other shell-capable
                  agents search, open, extract, and remember through your own browser.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="relative z-20 mb-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:mb-12 sm:flex-row md:mb-14"
                >
                  <Link
                    href="/install"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 px-5 py-2.5 text-sm font-semibold text-black shadow-xl shadow-black/20 transition-all hover:from-zinc-200 hover:to-zinc-400"
                    data-testid="button-hero-install"
                  >
                    Install
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/compare"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-5 py-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:text-foreground"
                    data-testid="button-hero-compare"
                  >
                    Compare
                  </Link>
                  <a
                    href="https://github.com/sriramramnath"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-5 py-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:text-foreground"
                    data-testid="button-hero-github"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </motion.div>
              </div>
            }
          >
            <HeroTerminal />
          </ContainerScroll>
        </div>
      </section>

      <section className="border-t border-border/30 bg-card/10 px-4 py-16 sm:px-5 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary">
              Keep moving
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything else is one click away
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The homepage stays focused. Setup, comparisons, and docs live on their own pages.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {quickLinks.map((item) => {
              const cardClass =
                "group flex min-h-48 flex-col justify-between rounded-2xl border border-border/45 bg-card/55 p-5 text-left backdrop-blur-sm transition-all hover:border-primary/35 hover:bg-card/80";
              const content = (
                <>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {item.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </>
              );

              return "external" in item && item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cardClass}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={cardClass}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {proofPoints.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/35 bg-background/35 p-4"
              >
                <Icon className="mb-3 h-4 w-4 text-primary" aria-hidden />
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}