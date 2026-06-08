import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitCommitHorizontal, Plus, RefreshCw, Wrench } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-shadcn-tabs";
import {
  changelogReleases,
  formatChangelogDate,
  latestChangelogVersion,
  releaseStability,
  type ChangelogRelease,
  type ChangelogSectionKind,
  type ReleaseStability,
} from "@/data/changelog";
import { cn } from "@/lib/utils";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

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

const stabilityBadgeClass: Record<
  ReleaseStability,
  { latest: string; default: string }
> = {
  Beta: {
    latest:
      "border-primary/40 bg-primary/10 text-primary",
    default:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  Alpha: {
    latest: "border-border/50 bg-muted/40 text-muted-foreground",
    default: "border-border/50 bg-muted/40 text-muted-foreground",
  },
};

function StabilityBadge({
  stability,
  isLatest,
  size = "md",
}: {
  stability: ReleaseStability;
  isLatest: boolean;
  size?: "sm" | "md";
}) {
  const styles = stabilityBadgeClass[stability][isLatest ? "latest" : "default"];
  return (
    <span
      className={cn(
        "rounded-full border font-mono uppercase tracking-widest",
        size === "sm"
          ? "rounded px-1.5 py-0.5 text-[9px] tracking-wider"
          : "px-2.5 py-0.5 text-[10px]",
        styles,
      )}
    >
      {stability}
    </span>
  );
}

const sectionMeta: Record<
  ChangelogSectionKind,
  { icon: React.ReactNode; className: string }
> = {
  Added: {
    icon: <Plus className="h-3.5 w-3.5" />,
    className: "text-emerald-400",
  },
  Changed: {
    icon: <RefreshCw className="h-3.5 w-3.5" />,
    className: "text-primary",
  },
  Fixed: {
    icon: <Wrench className="h-3.5 w-3.5" />,
    className: "text-amber-400",
  },
};

function ReleasePanel({
  release,
  isLatest,
}: {
  release: ChangelogRelease;
  isLatest: boolean;
}) {
  const sectionOrder: ChangelogSectionKind[] = ["Added", "Changed", "Fixed"];

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-border/30 pb-5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          v{release.version}
        </h2>
        {release.date && (
          <time
            dateTime={release.date}
            className="text-sm font-mono text-muted-foreground"
          >
            {formatChangelogDate(release.date)}
          </time>
        )}
        <StabilityBadge
          stability={releaseStability(release)}
          isLatest={isLatest}
        />
      </div>

      {sectionOrder.map((kind) => {
        const items = release.sections[kind];
        if (!items?.length) return null;
        const meta = sectionMeta[kind];

        return (
          <section key={kind} className="min-w-0">
            <h3
              className={cn(
                "mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-widest",
                meta.className,
              )}
            >
              {meta.icon}
              {kind}
            </h3>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-border" />
                  <span
                    className="min-w-0 break-words [&_strong]:font-semibold [&_strong]:text-foreground"
                    dangerouslySetInnerHTML={{
                      __html: item.replace(
                        /\*\*(.+?)\*\*/g,
                        "<strong>$1</strong>",
                      ),
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default function Changelog() {
  useDocumentMeta(routePageMeta["/changelog"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
        <PageHeroGlow />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-5 min-w-0 text-center">
          <FadeUp>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-primary">
              <GitCommitHorizontal className="h-3.5 w-3.5" />
              Changelog
            </div>
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight break-words">
              What shipped in each release
            </h1>
            <p className="mx-auto max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              Version history for the omniscout Python package. Latest: v
              {latestChangelogVersion} (beta). Releases from v0.2.6 onward are
              beta; earlier releases were alpha.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="border-t border-border/30 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-5 min-w-0">
          <FadeUp delay={0.08}>
            <Tabs
              defaultValue={latestChangelogVersion}
              className={cn(
                "flex flex-col gap-4 sm:flex-row sm:gap-6",
                "sm:h-[min(32rem,calc(100dvh-14rem))] sm:min-h-[20rem]",
              )}
            >
              <div
                className={cn(
                  "shrink-0 sm:w-48 sm:min-w-[12rem]",
                  "sm:overflow-y-auto sm:overscroll-contain",
                  "sm:rounded-xl sm:border sm:border-border/40 sm:bg-card/20 sm:p-1",
                  "[scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]",
                )}
              >
                <TabsList
                  className={cn(
                    "mt-0 h-auto w-full flex-col items-stretch",
                    "bg-card/50 border border-border/40 p-1.5 sm:border-0 sm:bg-transparent sm:p-1",
                  )}
                  indicatorClassName="bg-card border-border/50 shadow-md dark:bg-card/90"
                >
                  {changelogReleases.map((release) => {
                    const isLatest = release.version === latestChangelogVersion;

                    return (
                      <TabsTrigger
                        key={release.version}
                        value={release.version}
                        className="w-full justify-between gap-2 px-3 py-2.5 font-mono text-xs sm:text-sm data-[state=active]:font-semibold"
                      >
                        <span>v{release.version}</span>
                        <StabilityBadge
                          stability={releaseStability(release)}
                          isLatest={isLatest}
                          size="sm"
                        />
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              <div
                className={cn(
                  "min-w-0 flex-1 sm:overflow-y-auto sm:overscroll-contain",
                  "[scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]",
                )}
              >
                {changelogReleases.map((release) => {
                  const isLatest = release.version === latestChangelogVersion;

                  return (
                    <TabsContent
                      key={release.version}
                      value={release.version}
                      className="mt-0 sm:pr-1"
                    >
                      <div className="rounded-xl border border-border/40 bg-card/30 p-5 sm:p-8">
                        <ReleasePanel release={release} isLatest={isLatest} />
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </Tabs>
          </FadeUp>

          <FadeUp delay={0.12} className="mt-10 text-center">
            <a
              href="https://github.com/sriramramnath/omniscout/blob/main/cli/CHANGELOG.md"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Full changelog on GitHub →
            </a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
