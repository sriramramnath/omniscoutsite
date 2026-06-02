import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Code2, Database, Network, Search, HardDrive, Settings, Github, ArrowRight, Zap, Shield, GitPullRequest, Workflow, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground font-sans selection:bg-primary/30 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-mono font-bold text-lg tracking-tight">OmniScout</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">/features</a>
            <a href="#use-cases" className="hover:text-primary transition-colors">/use_cases</a>
            <a href="#architecture" className="hover:text-primary transition-colors">/architecture</a>
            <a href="#docs" className="hover:text-primary transition-colors">/docs</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/omniscout" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-github">
              <Github className="h-5 w-5" />
            </a>
            <Button variant="outline" className="font-mono border-primary/20 hover:border-primary/50 text-primary hidden sm:flex" data-testid="button-version">
              v0.1.0-alpha
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16" ref={targetRef}>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-8" data-testid="badge-system-status">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  SYSTEM.ONLINE()
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                  The runtime for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">autonomous research agents</span>.
                </h1>
                
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  OmniScout gives AI agents the substrate to search, browse, extract, and remember information from across the web. Built for engineers. Run it locally.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="w-full sm:w-auto font-mono text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8" data-testid="button-install">
                    curl -sL omniscout.dev/install.sh | bash
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-mono text-sm gap-2 h-12 px-8 border-border/50 hover:bg-muted/50" data-testid="button-source">
                    <Github className="h-4 w-4" />
                    View Source
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Terminal Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ y }}
              className="mt-20 max-w-5xl mx-auto rounded-xl border border-border/50 bg-black overflow-hidden shadow-2xl shadow-primary/5"
            >
              <div className="flex items-center px-4 py-3 border-b border-border/30 bg-zinc-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-muted-foreground">omniscout --run research_task.yaml</div>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-zinc-300">
                <div className="text-zinc-500">$ omniscout run competitor_analysis</div>
                <div className="text-primary mt-2">▶ Initializing OmniScout Runtime v0.1.0...</div>
                <div className="text-zinc-400">  [INF] Loading semantic memory from ~/.omniscout/db</div>
                <div className="text-zinc-400">  [INF] Spawning headless browser (Playwright)</div>
                <div className="text-primary mt-4">▶ Executing Step 1: Web Search ("YC W25 AI agents")</div>
                <div className="text-zinc-400">  [RES] Found 14 results. Extracting top 3...</div>
                <div className="mt-2 text-green-400">  ✔ Successfully parsed unstructured content from 3 URLs</div>
                <div className="text-primary mt-4">▶ Executing Step 2: Information Extraction</div>
                <div className="text-zinc-400">  [INF] Applying schema: CompetitorProfile</div>
                <div className="text-zinc-400">  [EXT] Found entity: Acme AI (Funding: $2M, Model: Local)</div>
                <div className="text-zinc-400">  [EXT] Found entity: Nexus Agent (Funding: Unknown, Model: Cloud)</div>
                <div className="text-primary mt-4">▶ Executing Step 3: Synthesis & Storage</div>
                <div className="text-green-400">  ✔ Vectorized 12 chunks. Stored to local memory.</div>
                <div className="text-primary mt-4">▶ Task Complete. Artifacts saved to ./output/report.md</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section id="features" className="py-32 border-t border-border/30 bg-card/30 relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="mb-16 md:flex justify-between items-end">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Raw capabilities.<br/><span className="text-muted-foreground">Zero fluff.</span></h2>
                <p className="text-muted-foreground max-w-xl font-mono text-sm">
                  We built the engine. You build the agent. OmniScout provides reliable primitives for complex reasoning loops.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Search />}
                title="Web Search & Retrieval"
                description="Bypass anti-bot protections. Aggregate search APIs, scrape clean markdown, and filter noise before passing to the LLM."
              />
              <FeatureCard 
                icon={<Network />}
                title="Browser Automation"
                description="Headless browser execution via Playwright. Let your agents click, scroll, type, and navigate dynamic single-page applications."
              />
              <FeatureCard 
                icon={<Code2 />}
                title="Structured Extraction"
                description="Turn messy DOMs into clean JSON. Define a Zod schema, point OmniScout at a URL, and get strongly-typed objects back."
              />
              <FeatureCard 
                icon={<Database />}
                title="Semantic Memory"
                description="Built-in vector database (Chroma/Milvus) for persistent agent memory. Agents can recall past research across sessions."
              />
              <FeatureCard 
                icon={<HardDrive />}
                title="Local-First Execution"
                description="Runs entirely on your machine. Bring your own API keys or run completely offline with local Ollama models."
              />
              <FeatureCard 
                icon={<Settings />}
                title="Agent Tooling API"
                description="Exposes a standard MCP (Model Context Protocol) interface. Drop it into LangChain, AutoGen, or your custom Python script."
              />
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="py-32 bg-background border-t border-border/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 text-primary text-xs font-mono mb-6 uppercase tracking-widest">
                Real-world Applications
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Built for deep, multi-step exploration.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <UseCase 
                number="01"
                title="Market Research"
                description="Instruct OmniScout to find the top 5 competitors in a niche, scrape their pricing pages, extract the data into a JSON schema, and synthesize a competitive matrix."
              />
              <UseCase 
                number="02"
                title="GitHub Issue Triage"
                description="Give OmniScout a repository URL. It pulls open issues, reads relevant documentation from other domains, and suggests architectural fixes based on persistent memory."
              />
              <UseCase 
                number="03"
                title="Due Diligence"
                description="Automate startup analysis. The agent crawls LinkedIn profiles, recent news articles, and SEC filings to generate a comprehensive briefing document."
              />
              <UseCase 
                number="04"
                title="News Summarization"
                description="A cron job runs OmniScout daily to read 50+ RSS feeds, extract factual claims, deduplicate information via vector search, and compile a tailored digest."
              />
            </div>
          </div>
        </section>

        {/* Local First Highlight */}
        <section className="py-32 border-t border-border/30 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="w-16 h-16 text-primary mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Your keys. Your data. Your hardware.
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-mono">
                OmniScout is not a SaaS. It's an open-source binary you run on your own infrastructure. No telemetry. No hidden API calls. Ultimate privacy for sensitive research.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-800 pt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">0</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Cloud Dependencies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Open Source</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">BYO</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">LLM / API Keys</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Local</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Vector DB</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Visualizer */}
        <section id="architecture" className="py-32 bg-background border-t border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-muted text-muted-foreground text-xs font-mono mb-6 uppercase tracking-widest">
                  Architecture
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  Designed for multi-step workflows.
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Most AI tools fail when research requires more than a single Google search. OmniScout maintains context across deep rabbit holes, managing browser state and extraction schemas dynamically.
                </p>
                
                <ul className="space-y-6 font-mono text-sm">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded bg-primary/10 text-primary"><GitPullRequest className="w-5 h-5" /></div>
                    <div>
                      <span className="text-foreground font-bold text-base block mb-1">Planning Engine</span> 
                      Break down complex goals into deterministic HTTP/browser steps. Handles retry logic automatically.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded bg-primary/10 text-primary"><Workflow className="w-5 h-5" /></div>
                    <div>
                      <span className="text-foreground font-bold text-base block mb-1">Execution Sandbox</span> 
                      Run JS, intercept network requests, and manage auth states without leaking context.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded bg-primary/10 text-primary"><Activity className="w-5 h-5" /></div>
                    <div>
                      <span className="text-foreground font-bold text-base block mb-1">Verification Loop</span> 
                      Self-correcting pipelines that retry when selectors change or pages fail to load.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                <div className="relative border border-border bg-card p-6 rounded-xl font-mono text-sm shadow-xl">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50 text-muted-foreground">
                    <span className="flex items-center gap-2"><Settings className="w-4 h-4"/> workflow.yaml</span>
                    <span>status: <span className="text-primary animate-pulse">running</span></span>
                  </div>
                  
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-3 md:before:ml-[23px] before:w-px before:bg-border">
                    <WorkflowStep status="done" title="Parse Intention" detail="User: 'Find recent ML papers'" />
                    <WorkflowStep status="done" title="Search arXiv" detail="Query generated. Pagination handled." />
                    <WorkflowStep status="running" title="Download & Extract PDF" detail="Parsing 4 documents via PyMuPDF..." active />
                    <WorkflowStep status="pending" title="Semantic Chunking" detail="Waiting for extraction..." />
                    <WorkflowStep status="pending" title="Vector DB Insert" detail="Target: local-chroma" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Integration */}
        <section className="py-32 border-t border-border/30 bg-card/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 text-primary text-xs font-mono mb-6 uppercase tracking-widest">
                Developer Experience
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Integrates in 3 lines of code.</h2>
              <p className="text-muted-foreground font-mono text-sm">OmniScout runs as a local daemon. Connect to it via standard SDKs.</p>
            </div>
            
            <div className="rounded-xl border border-border/50 bg-[#0d0d0d] overflow-hidden shadow-2xl">
              <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-4 text-xs font-mono text-zinc-400">
                  <span className="text-primary cursor-pointer border-b border-primary pb-3 -mb-3">python</span>
                  <span className="cursor-pointer hover:text-zinc-200">typescript</span>
                  <span className="cursor-pointer hover:text-zinc-200">curl</span>
                </div>
              </div>
              <div className="p-6 md:p-8 overflow-x-auto text-sm md:text-base font-mono text-zinc-300">
                <pre><code><span className="text-pink-400">from</span> omniscout <span className="text-pink-400">import</span> OmniClient<br/><br/>
<span className="text-zinc-500"># Connect to local daemon</span><br/>
client = OmniClient(host=<span className="text-yellow-300">"localhost:8080"</span>)<br/><br/>
<span className="text-zinc-500"># Execute a complex research workflow</span><br/>
result = client.research(<br/>
    goal=<span className="text-yellow-300">"Find pricing for standard API tier of Stripe vs PayPal"</span>,<br/>
    tools=[<span className="text-yellow-300">"browser"</span>, <span className="text-yellow-300">"extractor"</span>],<br/>
    schema=PricingComparisonSchema<br/>
)<br/><br/>
<span className="text-blue-400">print</span>(result.json())</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden bg-background border-t border-border/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Terminal className="h-16 w-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">Ready to upgrade your agents?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Stop writing fragile scraping scripts. Give your LLMs the robust infrastructure they need to understand the web.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto font-mono text-base gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10" data-testid="button-cta-start">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-mono text-base gap-2 h-14 px-10 border-border/50 hover:bg-muted/50" data-testid="button-cta-docs">
                Read Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="h-6 w-6 text-primary" />
                <span className="font-mono font-bold tracking-tight text-lg">OmniScout</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs font-mono leading-relaxed">
                The open-source, local-first runtime for autonomous AI research agents.
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-6 text-sm text-foreground">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-mono">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#architecture" className="hover:text-primary transition-colors">Architecture</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-6 text-sm text-foreground">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-mono">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold mb-6 text-sm text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-mono">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
            <div>© {new Date().getFullYear()} OmniScout Contributors. MIT Licensed.</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-xl border border-border/50 bg-background hover:border-primary/30 transition-colors group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight relative z-10">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-mono relative z-10">
        {description}
      </p>
    </div>
  );
}

function UseCase({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="group border-l-2 border-border hover:border-primary pl-6 py-2 transition-colors">
      <div className="text-xs font-mono text-primary mb-2 opacity-80">{number} //</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-mono">
        {description}
      </p>
    </div>
  );
}

function WorkflowStep({ status, title, detail, active = false }: { status: "done" | "running" | "pending", title: string, detail: string, active?: boolean }) {
  return (
    <div className={`relative pl-10 md:pl-12 py-3 flex items-start gap-4 ${active ? 'opacity-100' : 'opacity-60'}`}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-card border border-border z-10">
        {status === "done" && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
        {status === "running" && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)] animate-pulse" />}
        {status === "pending" && <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />}
      </div>
      <div className={`flex-1 ${active ? 'border-primary/30 bg-primary/5' : 'border-border/20 bg-background/50'} border p-4 rounded-lg`}>
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-foreground">{title}</span>
          <span className="text-xs uppercase tracking-wider opacity-70">
            {status === "done" ? "[OK]" : status === "running" ? "[RUN]" : "[WAIT]"}
          </span>
        </div>
        <div className="text-xs text-muted-foreground opacity-80 mt-2">{detail}</div>
      </div>
    </div>
  );
}
