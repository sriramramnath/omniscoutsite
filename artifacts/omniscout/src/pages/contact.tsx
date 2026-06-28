import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Mail, Package } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroTitleGradient } from "@/components/layout/hero-title-gradient";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const GITHUB_URL = "https://github.com/sriramramnath";
const PYPI_USER_URL = "https://pypi.org/user/sriramramnath/";
const EMAIL = "sriramramnath2011@gmail.com";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  useDocumentMeta(routePageMeta["/contact"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-14 pb-12 sm:pt-16 sm:pb-16">
        <PageHeroGlow />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-5 min-w-0 text-center">
          <FadeUp>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              Contact
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              <HeroTitleGradient>Get in touch</HeroTitleGradient>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="pb-24 border-t border-border/30">
        <div className="mx-auto max-w-2xl px-4 sm:px-5 min-w-0">
          <FadeUp delay={0.08}>
            <article className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-lg">
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-foreground text-base sm:text-lg">
                  Hi, I&apos;m{" "}
                  <span className="font-semibold text-foreground">Sriram Ramnath</span>, founder of{" "}
                  <a
                    href="https://omniscout.xyz"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    OmniScout
                  </a>
                  .
                </p>

                <p>
                  I build practical software projects around AI, automation, and developer tools. My
                  goal is to turn complex ideas into simple products that anyone can understand and
                  use.
                </p>

                <div className="pt-2">
                  <p className="text-sm font-medium text-foreground mb-3">
                    For my code and packages, visit:
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-4 w-4 text-primary" />
                        GitHub: {GITHUB_URL.replace("https://", "")}
                      </a>
                    </li>
                    <li>
                      <a
                        href={PYPI_USER_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <Package className="h-4 w-4 text-primary" />
                        PyPI: {PYPI_USER_URL.replace("https://", "")}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-border/30">
                  <p className="text-sm font-medium text-foreground mb-3">
                    For project queries or collaboration, contact:
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2.5 text-sm text-primary hover:underline underline-offset-4"
                  >
                    <Mail className="h-4 w-4" />
                    {EMAIL}
                  </a>
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
