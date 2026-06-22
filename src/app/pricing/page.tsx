import { AnimatedSection } from "@/components/AnimatedSection";
import { PageHero } from "@/components/PageHero";
import { PricingCalculator } from "@/components/PricingCalculator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { createPageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_SEO.pricing.title,
  description: PAGE_SEO.pricing.description,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-brand-bg text-brand-text min-h-screen pb-24">
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Create your <span className="italic opacity-90">product detail page</span>
          </>
        }
        description="Estimate your 3D rendering project in minutes. Select model complexity, lifestyle settings, and optional AR. Get a full pricing breakdown — fast and transparent."
      />

      {/* The Calculator Module */}
      <section className="px-6 w-full max-w-[1400px] mx-auto mb-32 pt-10 md:pt-16 relative z-30">
        <AnimatedSection delay={0.2} className="bg-brand-bg-alt/50 border border-brand-accent/20 rounded-[3rem] p-6 md:p-16 w-full shadow-2xl">
          <PricingCalculator />
        </AnimatedSection>
      </section>

      {/* FAQ specific to pricing */}
      <section className="px-6 max-w-4xl mx-auto w-full border-t border-brand-accent/20 pt-24">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Pricing FAQ</h2>
          <p className="text-brand-muted">Common questions about our billing and delivery process.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <FAQAccordion />
        </AnimatedSection>
      </section>
    </div>
  );
}
