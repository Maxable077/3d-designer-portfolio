import { workflowProof } from "@/data/services";

export function WorkflowProofSection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-6">
      <div className="grid grid-cols-1 gap-10 border-b border-brand-accent pb-10 md:grid-cols-[0.45fr_1fr] md:gap-20">
        <div>
          <p className="mb-4 text-sm text-brand-muted">How it works</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
            A render workflow with clear proof at every step.
          </h2>
        </div>
        <p className="max-w-3xl text-lg leading-relaxed text-brand-muted">
          The process is designed to make the invisible parts of 3D work visible: what input is needed, what is created, and how each final asset will be used.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-3">
        {workflowProof.map((item, index) => (
          <div key={item.title} className="border-t border-brand-accent pt-6">
            <p className="mb-8 text-sm text-brand-muted tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mb-4 text-xl font-medium tracking-tight">{item.title}</h3>
            <p className="mb-6 leading-relaxed text-brand-muted">{item.description}</p>
            <div className="bg-brand-bg-alt p-4 text-sm leading-relaxed text-brand-text/75">
              {item.evidence}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
