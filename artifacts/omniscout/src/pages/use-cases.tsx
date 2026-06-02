import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart2,
  Github,
  Newspaper,
  BookOpen,
  TrendingUp,
  FlaskConical,
  Building2,
  ArrowRight,
  Terminal,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Link } from "wouter";

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

interface UseCase {
  number: string;
  tag: string;
  title: string;
  description: string;
  workflow: { step: string; detail: string }[];
  imageUrl: string;
  timeEstimate: string;
  icon: React.ReactNode;
}

const cases: UseCase[] = [
  {
    number: "01",
    tag: "Competitive Research",
    title: "Market & competitor intelligence.",
    description:
      "Systematically profile competitors, extract pricing structures, analyze product positioning, and track changes over time — fully automated and reproducible.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    timeEstimate: "~4 min",
    icon: <BarChart2 className="w-5 h-5" />,
    workflow: [
      { step: "search()", detail: "\"YC W25 AI agent startups\" — 14 results" },
      { step: "browser.navigate()", detail: "Top 5 company homepages" },
      { step: "extract(CompetitorProfile)", detail: "Pricing, team size, stack" },
      { step: "memory.store()", detail: "Vectorized 8 profiles" },
      { step: "export(format='csv')", detail: "competitive_matrix.csv" },
    ],
  },
  {
    number: "02",
    tag: "Developer Tooling",
    title: "GitHub repository analysis.",
    description:
      "Analyze open issues, read linked documentation, cross-reference similar bug reports in memory, and generate grounded fix suggestions — all from a single repository URL.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&q=80",
    timeEstimate: "~6 min",
    icon: <Github className="w-5 h-5" />,
    workflow: [
      { step: "browser.navigate()", detail: "github.com/org/repo/issues" },
      { step: "extract(IssueList)", detail: "42 open issues, labeled" },
      { step: "search()", detail: "Related docs and RFCs" },
      { step: "memory.query()", detail: "Similar past issues recalled" },
      { step: "export(format='md')", detail: "triage_report.md" },
    ],
  },
  {
    number: "03",
    tag: "News & Content",
    title: "Living news digest.",
    description:
      "Schedule OmniScout to read hundreds of RSS feeds and news sources daily. It deduplicates across sources using vector similarity, extracts key facts, and compiles a tailored briefing.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80",
    timeEstimate: "~2 min/day",
    icon: <Newspaper className="w-5 h-5" />,
    workflow: [
      { step: "search()", detail: "AI news — 50+ sources" },
      { step: "extract(NewsItem)", detail: "title, source, claims, date" },
      { step: "memory.dedupe()", detail: "12 duplicates removed" },
      { step: "memory.store()", detail: "38 new items indexed" },
      { step: "export(format='email')", detail: "daily_digest.html" },
    ],
  },
  {
    number: "04",
    tag: "Academic Research",
    title: "Systematic literature review.",
    description:
      "Point OmniScout at arXiv, Semantic Scholar, or any academic source. It pulls papers, extracts abstracts and citations, chunks them semantically, and builds a searchable knowledge base.",
    imageUrl: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=900&q=80",
    timeEstimate: "~8 min",
    icon: <FlaskConical className="w-5 h-5" />,
    workflow: [
      { step: "search()", detail: "\"agent memory\" arxiv 2024" },
      { step: "browser.navigate()", detail: "Paper landing pages" },
      { step: "extract(PaperSummary)", detail: "abstract, methods, results" },
      { step: "memory.store()", detail: "24 papers → local Chroma" },
      { step: "memory.query()", detail: "Semantic search enabled" },
    ],
  },
  {
    number: "05",
    tag: "Finance & Due Diligence",
    title: "Startup & market due diligence.",
    description:
      "Automate the research phase of investment or partnership analysis. OmniScout crawls press, filings, LinkedIn, and web properties to produce a comprehensive briefing document.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    timeEstimate: "~10 min",
    icon: <Building2 className="w-5 h-5" />,
    workflow: [
      { step: "search()", detail: "Company + news + funding" },
      { step: "browser.navigate()", detail: "LinkedIn, Crunchbase" },
      { step: "extract(CompanyProfile)", detail: "team, funding, products" },
      { step: "search()", detail: "Regulatory filings (SEC)" },
      { step: "export(format='pdf')", detail: "due_diligence.pdf" },
    ],
  },
  {
    number: "06",
    tag: "Documentation",
    title: "API & docs exploration.",
    description:
      "Feed OmniScout a docs URL and a set of questions. It navigates the entire documentation site, extracts relevant sections, and builds an indexed, queryable knowledge base for your agent.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    timeEstimate: "~5 min",
    icon: <BookOpen className="w-5 h-5" />,
    workflow: [
      { step: "browser.crawl()", detail: "docs.stripe.com — 400 pages" },
      { step: "extract(DocPage)", detail: "endpoint, params, examples" },
      { step: "memory.store()", detail: "Chunked and vectorized" },
      { step: "memory.query()", detail: "\"how to create a subscription\"" },
      { step: "export(format='json')", detail: "stripe_docs_index.json" },
    ],
  },
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/3 w-[500px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="dot-grid absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <FadeUp>
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-5">
              Use Cases
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              What agents
              <br />
              <span className="text-muted-foreground font-normal">
                actually do with OmniScout.
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed text-lg">
              From one-shot research tasks to recurring workflows that build
              institutional knowledge over time — OmniScout handles it all
              locally.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Use case cards */}
      <section className="pb-10 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-5">
          {cases.map((uc, i) => (
            <FadeUp key={uc.number} delay={0.05} className="py-16 border-b border-border/20 last:border-0">
              <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
                {/* Left / text */}
                <div className="lg:[direction:ltr]">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono text-muted-foreground/40">
                      {uc.number}
                    </span>
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      {uc.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-0.5 w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {uc.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                      {uc.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    {uc.description}
                  </p>

                  {/* Workflow steps */}
                  <div className="border border-border/40 bg-card rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/50">
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <Terminal className="w-3.5 h-3.5" />
                        workflow trace
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {uc.timeEstimate}
                      </div>
                    </div>
                    {uc.workflow.map((step, si) => (
                      <motion.div
                        key={`${uc.number}-${si}`}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: si * 0.06 }}
                        className="flex items-center gap-3 px-4 py-2.5 border-b border-border/20 last:border-0 hover:bg-card/50 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <code className="text-xs font-mono text-primary min-w-[130px]">
                          {step.step}
                        </code>
                        <span className="text-xs text-muted-foreground truncate">
                          {step.detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right / image */}
                <div className="lg:[direction:ltr]">
                  <div className="relative rounded-xl overflow-hidden border border-border/30 shadow-2xl shadow-black/40">
                    <img
                      src={uc.imageUrl}
                      alt={uc.tag}
                      className="w-full h-64 md:h-80 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono text-foreground/50 bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border/30">
                        {uc.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-foreground/70">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        Fully automated · Reproducible · Local
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/30 bg-card/20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Build your first workflow.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Every use case above runs as a single YAML file. Define the goal,
              configure the tools, and let OmniScout do the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                data-testid="button-usecases-docs"
              >
                Read the docs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/compare"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all"
                data-testid="link-usecases-compare"
              >
                Compare to alternatives
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
