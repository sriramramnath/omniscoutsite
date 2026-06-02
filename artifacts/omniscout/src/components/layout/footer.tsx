import { Link } from "wouter";
import { Search, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/20 py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center flex-shrink-0">
                <Search className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-sm">OmniScout</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs font-mono">
              The open-source, local-first runtime
              <br />
              for autonomous AI research agents.
            </p>
          </div>
          {[
            {
              heading: "Product",
              links: [
                { label: "Features", href: "/features" },
                { label: "Compare", href: "/compare" },
                { label: "Use Cases", href: "/use-cases" },
                { label: "Changelog", href: "#" },
              ],
            },
            {
              heading: "Resources",
              links: [
                { label: "Documentation", href: "#" },
                { label: "GitHub", href: "https://github.com/omniscout" },
                { label: "Discord", href: "#" },
                { label: "Examples", href: "#" },
              ],
            },
            {
              heading: "Legal",
              links: [
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "License", href: "#" },
              ],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <div className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">
                {heading}
              </div>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("http") ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gradient-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <span>© 2025 OmniScout. Apache 2.0 License.</span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/omniscout"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
              data-testid="link-footer-github"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
