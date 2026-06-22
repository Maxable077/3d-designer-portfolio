import { Suspense } from "react";
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactFormSection } from "@/components/ContactFormSection";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_COMPANY_URL,
  LINKEDIN_PERSONAL_URL,
} from "@/lib/site";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a product CGI project with Populique — request a quote, book a demo, or ask about photorealistic 3D renders and animation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-brand-bg-alt w-full min-h-screen">
      <PageHero
        eyebrow="Let's talk"
        title="Start your project."
        description="Looking for product visuals, renders or a flexible 3D partner? Drop us a line."
      />

      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto w-full -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 bg-brand-bg rounded-3xl p-8 md:p-16 border border-brand-accent/20 shadow-2xl">
          <AnimatedSection className="flex flex-col gap-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-8 text-brand-text">Contact details</h2>
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-text" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted uppercase tracking-widest font-medium mb-1">Email</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-lg font-medium hover:text-brand-accent transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-text" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted uppercase tracking-widest font-medium mb-1">Location</p>
                    <p className="text-lg font-medium">Amsterdam, Netherlands</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-accent/20">
              <p className="text-sm text-brand-muted uppercase tracking-widest font-medium mb-4">Follow us</p>
              <div className="flex gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-brand-accent text-sm font-medium hover:bg-brand-text hover:text-brand-bg transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={LINKEDIN_COMPANY_URL ?? LINKEDIN_PERSONAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-brand-accent text-sm font-medium hover:bg-brand-text hover:text-brand-bg transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-brand-bg-alt" />}>
              <ContactFormSection />
            </Suspense>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto w-full">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Still have questions?</h2>
          <p className="text-lg text-brand-muted">Here are some quick answers before you reach out.</p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <FAQAccordion />
        </AnimatedSection>
      </section>

      <div className="h-20 bg-brand-bg-alt" />
    </div>
  );
}
