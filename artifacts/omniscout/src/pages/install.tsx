import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { SetupGuideContent } from "@/components/home/setup-guide";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Install() {
  useDocumentMeta(routePageMeta["/install"]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />

      <section className="relative overflow-hidden pt-14 pb-12 sm:pt-16 sm:pb-16">
        <PageHeroGlow />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mb-5 text-xs font-mono uppercase tracking-widest text-primary">
              Install
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
              <HeroTitleGradient>Set up OmniScout once</HeroTitleGradient>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Follow the local install guide, then use OmniScout from Claude Code,
              Cursor, Codex, Cline, Windsurf, and other supported agents.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#quick-setup"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Start guide
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                Compare first
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="quick-setup" className="scroll-mt-16 border-t border-border/60 apple-section-alt py-16 md:scroll-mt-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-5">
          <SetupGuideContent />
        </div>
      </section>

      <Footer />
    </div>
  );
}
