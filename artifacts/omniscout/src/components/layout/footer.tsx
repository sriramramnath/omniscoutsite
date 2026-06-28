import { Link } from "wouter";
import { Github, Package } from "lucide-react";
import { SiX } from "react-icons/si";
import { latestChangelogVersion } from "@/data/changelog";

const PYPI_URL = "https://pypi.org/project/omniscout/";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary py-12">
      <div className="mx-auto max-w-[980px] px-6">
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-10">
          <div className="col-span-2">
            <Link href="/" className="mb-3 flex w-fit items-center gap-2" aria-label="OmniScout home">
              <img
                src="/favicon.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 flex-shrink-0"
              />
              <span className="text-sm font-semibold">OmniScout</span>
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Local-first browser automation and research infrastructure for AI agents.
              CLI in, JSON out.
            </p>
          </div>
          {[
            {
              heading: "Product",
              links: [
                { label: "Features", href: "/features" },
                { label: "Probe Zero", href: "/probe-zero" },
                { label: "Compare", href: "/compare" },
                { label: "Use Cases", href: "/use-cases" },
                { label: "Blog", href: "/blogs" },
                { label: "Changelog", href: "/changelog" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              heading: "Resources",
              links: [
                { label: "Documentation", href: "https://docs.omniscout.xyz" },
                { label: "PyPI", href: PYPI_URL },
                { label: "GitHub", href: "https://github.com/sriramramnath/omniscout" },
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
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-foreground">
                {heading}
              </div>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("http") ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
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

        <div className="gradient-divider mb-6" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <span>Copyright © 2026 OmniScout. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={PYPI_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              data-testid="link-footer-pypi"
            >
              <Package className="h-3.5 w-3.5" />
              PyPI · v{latestChangelogVersion}
            </a>
            <a
              href="https://github.com/sriramramnath/omniscout"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              data-testid="link-footer-github"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://x.com/r__sriram"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
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
