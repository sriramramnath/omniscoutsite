import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function FadeUp({
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

export function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <div className="mb-4 text-xs font-mono uppercase tracking-widest text-primary">
        {tag}
      </div>
      <h2 className="mb-3 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export function PageLinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/15"
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}
