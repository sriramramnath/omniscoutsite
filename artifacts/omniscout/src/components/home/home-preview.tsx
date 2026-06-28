import { AdvantagesInfographic } from "@/components/home/advantages-infographic";
import { FadeUp } from "@/components/home/shared";

export function HomePreview() {
  return (
    <div className="apple-section-alt border-t border-border/60">
      <div className="mx-auto w-full min-w-0 max-w-[980px] px-6">
        <section className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
          <FadeUp>
            <AdvantagesInfographic />
          </FadeUp>
        </section>
      </div>
    </div>
  );
}
