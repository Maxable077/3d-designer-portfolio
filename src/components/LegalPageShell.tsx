import { AnimatedSection } from "@/components/AnimatedSection";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";
import { ReactNode } from "react";

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageShell({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="flex flex-col bg-brand-bg w-full min-h-screen">
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <p className="text-sm uppercase tracking-widest opacity-60">Last updated: {lastUpdated}</p>
      </PageHero>

      <section className="py-24 md:py-32 px-6 max-w-3xl mx-auto w-full -mt-16 relative z-30">
        <AnimatedSection delay={0.1}>
          <article className="bg-brand-bg rounded-3xl p-8 md:p-14 border border-brand-accent/20 shadow-2xl legal-content">
            {children}
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-brand-accent text-brand-text hover:bg-brand-text hover:text-brand-bg px-8 py-4 text-sm font-medium transition-colors"
          >
            Questions? Get in touch
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
