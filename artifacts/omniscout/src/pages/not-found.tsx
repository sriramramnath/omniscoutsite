import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { Link } from "wouter";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — OmniScout";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden px-5 py-32">
        <PageHeroGlow />

        <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-primary/10 text-primary shadow-[0_0_40px_-12px_rgba(104,127,243,0.5)]"
          >
            <Compass className="h-8 w-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-primary"
          >
            404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            This route doesn&apos;t exist on the map. Head back home or pick a section
            from the navigation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-300 px-6 py-3 text-sm font-semibold text-black transition-all hover:from-zinc-200 hover:to-zinc-400"
              data-testid="link-404-home"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              data-testid="button-404-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground"
          >
            {[
              { label: "Features", href: "/features" },
              { label: "Blog", href: "/blogs" },
              { label: "Compare", href: "/compare" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-border/40 bg-card/30 px-3 py-1.5 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
