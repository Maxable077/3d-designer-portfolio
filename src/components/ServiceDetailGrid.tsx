import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { deliverables } from "@/data/services";

const serviceGroups = [
  {
    title: "Product images",
    description: "Still imagery for product pages, catalogues, presentations and launch campaigns.",
    items: ["Silo renders", "Lifestyle scenes", "Feature callouts"],
  },
  {
    title: "Motion & reusable assets",
    description: "Short loops, social crops and render-ready model systems that extend one product direction.",
    items: ["Motion assets", "CAD to visual", "Material creation"],
  },
];

export function ServiceDetailGrid() {
  return (
    <section id="service-menu" className="scroll-mt-28 bg-brand-bg-alt py-28 md:py-32">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-[0.45fr_1fr] md:gap-20">
          <div>
            <p className="mb-4 text-sm text-brand-muted">Service menu</p>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              The offer, organized by what the product needs to do.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-muted">
            Each service is separated into a clear production need, so it is easy to see where it fits, what it produces and how it can be reused across a product launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {serviceGroups.map((group) => (
            <div key={group.title} className="border border-brand-accent bg-brand-bg">
              <div className="border-b border-brand-accent p-7 md:p-8">
                <h3 className="mb-3 text-2xl font-medium tracking-tight">{group.title}</h3>
                <p className="leading-relaxed text-brand-muted">{group.description}</p>
              </div>

              <div>
                {group.items.map((name) => {
                  const item = deliverables.find((deliverable) => deliverable.title === name);

                  if (!item) {
                    return null;
                  }

                  return (
                    <div key={item.title} className="grid grid-cols-1 gap-6 border-b border-brand-accent p-7 last:border-b-0 md:grid-cols-[0.85fr_1.15fr] md:p-8">
                      <div>
                        <h4 className="mb-3 text-xl font-medium tracking-tight">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-brand-muted">{item.description}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <p className="mb-1 text-brand-text">Use case</p>
                          <p className="leading-relaxed text-brand-muted">{item.useCase}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-brand-text">Outputs</p>
                          <p className="leading-relaxed text-brand-muted">{item.formats}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-text group">
            Discuss the right service mix
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
