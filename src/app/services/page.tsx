import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MotionDeliverableStrip } from "@/components/MotionDeliverableStrip";
import { ScrollServiceStory } from "@/components/ScrollServiceStory";
import { ServiceDetailGrid } from "@/components/ServiceDetailGrid";
import { ServiceEstimator } from "@/components/ServiceEstimator";
import { ServiceOfferCarousel } from "@/components/ServiceOfferCarousel";
import { ServiceProofSection } from "@/components/ServiceProofSection";
import { WorkflowProofSection } from "@/components/WorkflowProofSection";
import { faqs } from "@/data/services";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-28 md:gap-36 py-20 md:py-32">
      <section className="max-w-7xl mx-auto px-6 w-full">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-end">
          <div>
            <p className="text-sm text-brand-muted mb-5">3D render services</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-brand-text">
              Product visuals that can carry the whole launch.
            </h1>
          </div>
          <div className="max-w-2xl lg:ml-auto">
            <p className="text-lg md:text-xl text-brand-muted leading-relaxed mb-8">
              I help product brands, designers and makers turn CAD files, sketches or early concepts into polished render systems: hero images, shop visuals, detail crops, motion assets and technical presentation frames.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-text text-brand-bg px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
            >
              Start a project
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <MotionDeliverableStrip />

      <ServiceProofSection />

      <ScrollServiceStory />

      <ServiceOfferCarousel />

      <ServiceDetailGrid />

      <section id="brief-builder" className="max-w-7xl mx-auto px-6 w-full scroll-mt-28">
        <AnimatedSection>
          <ServiceEstimator />
        </AnimatedSection>
      </section>

      <WorkflowProofSection />

      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-10 lg:gap-20">
          <AnimatedSection>
            <p className="text-sm text-brand-muted mb-4">Details</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Common questions</h2>
          </AnimatedSection>

          <div className="flex flex-col">
            {faqs.map((item, index) => (
              <AnimatedSection key={item.question} delay={index * 0.06} className="border-t border-brand-accent py-7">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium tracking-tight">
                    {item.question}
                    <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-brand-muted leading-relaxed max-w-2xl pt-5">{item.answer}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 w-full text-center">
        <AnimatedSection className="flex flex-col items-center gap-8 py-20 border-y border-brand-accent">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight">
            Have a product that needs a sharper visual story?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 justify-center bg-brand-text text-brand-bg px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
          >
            Send the brief <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
