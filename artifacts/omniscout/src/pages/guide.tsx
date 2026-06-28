import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageHeroGlow } from "@/components/layout/page-hero-glow";
import { SetupGuideContent } from "@/components/home/setup-guide";
import { routePageMeta } from "@/config/page-meta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Guide() {
  useDocumentMeta(routePageMeta["/guide"]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary/25 overflow-x-clip">
      <Nav />

      <section className="relative overflow-hidden pt-14 pb-20 md:pt-16 md:pb-28">
        <PageHeroGlow />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-5">
          <SetupGuideContent />
        </div>
      </section>

      <Footer />
    </div>
  );
}
