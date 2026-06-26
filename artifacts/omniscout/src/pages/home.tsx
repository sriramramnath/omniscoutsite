import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroCanvasBackground } from "@/components/layout/hero-canvas-background";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
import { HeroTerminal } from "@/components/layout/hero-terminal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HomePreview } from "@/components/home/home-preview";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

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
                <div className="mb-7 overflow-hidden">
                  {["Give your AI agent", "a real browser."].map((line, i) => (
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
                      <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
                        <HeroTitleGradient>{line}</HeroTitleGradient>
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

      <HomePreview />

      <Footer />
    </div>
  );
}
