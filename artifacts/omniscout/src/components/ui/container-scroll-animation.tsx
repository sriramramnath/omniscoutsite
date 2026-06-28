import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function ContainerScroll({
  titleComponent,
  children,
  className,
  containerClassName,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleRange = isMobile ? [0.72, 0.92] : [0.98, 1];
  /** Tilt / scale finish in the first ~30% of section scroll (snappier feel). */
  const tiltEnd = 0.3;
  const rotate = useTransform(scrollYProgress, [0, tiltEnd], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, tiltEnd], scaleRange);
  const translate = useTransform(scrollYProgress, [0, tiltEnd], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[58rem] items-start justify-center overflow-x-clip p-2 md:h-[78rem] md:p-12",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full min-w-0 max-w-full pt-4 pb-16 md:pt-8 md:pb-24",
          containerClassName,
        )}
        style={{ perspective: "1000px" }}
      >
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="relative z-0 mx-auto mt-10 h-[28rem] w-full min-w-0 max-w-[min(100%,64rem)] border-4 border-border bg-secondary p-2 shadow-xl rounded-[30px] md:mt-16 md:h-[38rem] md:p-6 lg:mt-20"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-card md:rounded-2xl md:p-3">
        {children}
      </div>
    </motion.div>
  );
}
