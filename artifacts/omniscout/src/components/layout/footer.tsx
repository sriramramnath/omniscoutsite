import { Link } from "wouter";
import { Github, Package } from "lucide-react";
import { SiX } from "react-icons/si";

const PYPI_URL = "https://pypi.org/project/omniscout/";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/20 py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit" aria-label="OmniScout home">
              <img
                src="/favicon.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 flex-shrink-0"
              />
              <span className="font-semibold text-sm">OmniScout</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs font-mono">
              Local-first browser automation and research
              <br />
              infrastructure for AI agents. CLI in, JSON out.
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
                { label: "Documentation", href: "https://github.com/sriramramnath/omniscout/tree/main/docs" },
                { label: "PyPI", href: PYPI_URL },
                { label: "GitHub", href: "https://github.com/sriramramnath/omniscout" },
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
          <span>© 2026 OmniScout</span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={PYPI_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
              data-testid="link-footer-pypi"
            >
              <Package className="w-3.5 h-3.5" />
              PyPI
            </a>
            <a
              href="https://github.com/sriramramnath/omniscout"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
              data-testid="link-footer-github"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="https://x.com/r__sriram"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              data-testid="link-footer-x"
            >
              <SiX className="h-3.5 w-3.5" aria-hidden />
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
