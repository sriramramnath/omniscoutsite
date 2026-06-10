import { motion } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroCanvasBackground } from "@/components/layout/hero-canvas-background";
import { HeroTerminal } from "@/components/layout/hero-terminal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CopyInstallButton } from "@/components/ui/copy-install-button";
import { CompleteGuide, QUICK_SETUP_SECTION_ID } from "@/components/home/complete-guide";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Home() {
  useDocumentMeta(routePageMeta["/"]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/25 overflow-x-clip">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 md:pt-28">
        <HeroCanvasBackground />

        <div className="relative z-10">
          <ContainerScroll
            className="px-2 md:px-5"
            titleComponent={
              <div className="px-3 text-center">
                <div className="mb-7 overflow-hidden">
                  {["Give your AI agent", "a browser.", "No SDK. No cloud."].map((line, i) => (
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
                  Navigate, search, extract, and remember — through a local CLI and
                  daemon.{" "}
                  <span className="text-foreground/70">
                    Same browser-control surface as Kimi WebBridge or Claude for Chrome,
                    but you bring the LLM. No hosted browsers. No MCP server yet.
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="relative z-20 mb-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:mb-12 sm:flex-row md:mb-14"
                >
                  <CopyInstallButton testId="button-hero-install" />
                  <a
                    href={`#${QUICK_SETUP_SECTION_ID}`}
                    className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                    data-testid="button-hero-quick-setup"
                  >
                    <ArrowDown className="h-4 w-4" />
                    Quick Setup
                  </a>
                  <a
                    href="https://github.com/sriramramnath"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-5 py-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-all hover:border-border hover:text-foreground"
                    data-testid="button-hero-github"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </motion.div>
              </div>
            }
          >
            <HeroTerminal />
          </ContainerScroll>
        </div>
      </section>

      <CompleteGuide />

      <Footer />
    </div>
  );
}