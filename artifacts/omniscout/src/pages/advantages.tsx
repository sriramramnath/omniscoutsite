import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { AdvantagesInfographic } from "@/components/home/advantages-infographic";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Advantages() {
  useDocumentMeta(routePageMeta["/advantages"]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/25 overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-14 pb-12 md:pt-16 md:pb-16">
        <PageHeroGlow />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-5">
          <AdvantagesInfographic />
        </div>
      </section>

      <Footer />
    </div>
  );
}
