import { proofPoints } from "@/data/services";

export function ServiceProofSection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-6">
      <div className="grid grid-cols-1 gap-10 border-y border-brand-accent py-12 md:grid-cols-[0.55fr_1.45fr] md:py-16">
        <div>
          <p className="mb-4 text-sm text-brand-muted">Production proof</p>
          <h2 className="max-w-md text-3xl font-medium tracking-tight md:text-4xl">
            Built like a content system, not a single loose render.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.title} className="border-t border-brand-accent pt-6">
              <p className="mb-8 text-sm text-brand-muted tabular-nums">{point.stat}</p>
              <h3 className="mb-3 text-xl font-medium tracking-tight">{point.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
