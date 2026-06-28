import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "wouter";
import { CopyableCommand } from "@/components/home/copyable-command";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
import { HomePreview } from "@/components/home/home-preview";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Home() {
  useDocumentMeta(routePageMeta["/"]);

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-background text-foreground selection:bg-primary/15">
      <Nav />

      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24">
        <div className="relative z-10 mx-auto max-w-[980px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              <HeroTitleGradient>Give your AI agent a real browser</HeroTitleGradient>
            </h1>

            <p className="mx-auto mt-5 max-w-[28rem] text-lg leading-relaxed text-muted-foreground sm:mt-6 sm:text-xl sm:leading-relaxed">
              OmniScout finds answers first — so your LLM reads less, costs less, and
              responds faster.
            </p>

            <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5">
              <Link
                href="/install"
                className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-[17px] font-normal text-primary-foreground transition-opacity hover:opacity-90"
                data-testid="button-hero-install"
              >
                Install
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://github.com/sriramramnath"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[17px] text-primary transition-opacity hover:opacity-80"
                data-testid="button-hero-github"
              >
                <Github className="h-4 w-4" />
                View on GitHub
                <span aria-hidden className="text-sm">
                  ›
                </span>
              </a>
            </div>

            <div className="mx-auto mt-12 max-w-[36rem] rounded-2xl bg-secondary px-6 py-7 text-left sm:px-8 sm:py-8">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                After installation, open any supported AI app — Claude Code, Cursor, Codex,
                Cline, and more.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Type <span className="font-mono text-foreground">/omniscout</span> at the
                start of your message to activate it, then describe what you want in plain
                English.
              </p>
              <div className="mt-5 space-y-2">
                <CopyableCommand command="/omniscout find me the best price for AirPods Pro in India" />
                <CopyableCommand command="/omniscout go to my Gmail and find any unread emails from last week" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HomePreview />

      <Footer />
    </div>
  );
}
