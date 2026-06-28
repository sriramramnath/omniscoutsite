import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function TerminalLine({
  children,
  color = "text-muted-foreground",
  delay,
  inView,
}: {
  children: React.ReactNode;
  color?: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`font-mono text-xs leading-6 sm:text-sm ${color}`}
    >
      {children}
    </motion.div>
  );
}

export function HeroTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="flex-1 text-center font-mono text-[10px] text-muted-foreground sm:text-xs">
          agent workflow — search → open → snapshot
        </div>
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto p-4 sm:p-5">
        <TerminalLine color="text-muted-foreground" delay={0.2} inView={inView}>
          $ omniscout daemon start
        </TerminalLine>
        <TerminalLine color="text-primary" delay={0.35} inView={inView}>
          ▸ daemon listening on 127.0.0.1:7720
        </TerminalLine>
        <TerminalLine color="text-muted-foreground" delay={0.45} inView={inView}>
          $ OMNISCOUT_JSON=1 omniscout search "browser agents 2026"
        </TerminalLine>
        <TerminalLine color="text-muted-foreground" delay={0.55} inView={inView}>
          &nbsp;&nbsp;ddg · local rerank · 10 results
        </TerminalLine>
        <div className="py-1" />
        <TerminalLine color="text-primary" delay={0.7} inView={inView}>
          $ omniscout open 1
        </TerminalLine>
        <TerminalLine color="text-muted-foreground" delay={0.82} inView={inView}>
          &nbsp;&nbsp;opened first hit from latest search
        </TerminalLine>
        <TerminalLine color="text-primary" delay={0.94} inView={inView}>
          $ omniscout browser snapshot --refs-only
        </TerminalLine>
        <TerminalLine color="text-emerald-600" delay={1.06} inView={inView}>
          &nbsp;&nbsp;✓ @e1 … @e42 from accessibility tree
        </TerminalLine>
        <div className="py-1" />
        <TerminalLine color="text-primary" delay={1.2} inView={inView}>
          $ omniscout extract https://example.com/docs
        </TerminalLine>
        <TerminalLine color="text-muted-foreground" delay={1.32} inView={inView}>
          &nbsp;&nbsp;markdown + metadata → stdout
        </TerminalLine>
        <TerminalLine color="text-primary" delay={1.44} inView={inView}>
          $ omniscout remember https://example.com/docs
        </TerminalLine>
        <TerminalLine color="text-emerald-600" delay={1.56} inView={inView}>
          &nbsp;&nbsp;✓ indexed to Qdrant + memory.sqlite
        </TerminalLine>
      </div>
    </div>
  );
}
