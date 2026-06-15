import { AnimatedSection } from "@/components/AnimatedSection";
import { PricingCalculator } from "@/components/PricingCalculator";
import { FAQAccordion } from "@/components/FAQAccordion";

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-brand-bg text-brand-text min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-16 md:mb-24">
        <AnimatedSection className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-6">
            Simple Pricing Of 3D Content For E-Commerce
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Create your <span className="text-brand-muted italic">product detail page</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-muted leading-relaxed">
            Estimate your 3D rendering project in minutes. Select model complexity,
            lifestyle settings, and optional AR. Get a full pricing breakdown — fast and transparent.
          </p>
        </AnimatedSection>
      </section>

      {/* The Calculator Module */}
      <section className="px-6 w-full max-w-[1400px] mx-auto mb-32">
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
