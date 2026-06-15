"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { deliverables } from "@/data/services";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const serviceGroups = [
  {
    title: "Product images",
    id: "product-images",
    description: "Still imagery for product pages, catalogues, presentations and launch campaigns.",
    items: ["Silo renders", "Lifestyle scenes", "Feature callouts"],
  },
  {
    title: "Motion & reusable assets",
    id: "motion-assets",
    description: "Short loops, social crops and render-ready model systems that extend one product direction.",
    items: ["Motion assets", "CAD to visual", "Material creation"],
  },
];

export function ServiceDetailGrid() {
  const [activeId, setActiveId] = useState(serviceGroups[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    serviceGroups.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="service-menu" className="scroll-mt-28 bg-brand-bg-alt py-28 md:py-32 relative z-10 rounded-t-[3rem] md:rounded-t-[5vw]">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.35fr_1fr] lg:gap-24 relative">
          
          {/* Sticky Sidebar Navigation */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32 flex flex-col gap-8">
              <div>
                <p className="mb-4 text-sm text-brand-muted uppercase tracking-widest font-medium">Service menu</p>
                <h2 className="text-3xl font-medium tracking-tight mb-6">
                  The offer, organized.
                </h2>
                <p className="text-brand-muted leading-relaxed mb-8">
                  Each service is separated into a clear production need, so it is easy to see where it fits and what it produces.
                </p>
              </div>

              <nav className="flex flex-col gap-4 border-l border-brand-accent/30 pl-6">
                {serviceGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => document.getElementById(group.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className={cn(
                      "text-left text-lg font-medium transition-colors duration-300",
                      activeId === group.id ? "text-brand-text" : "text-brand-muted hover:text-brand-text/80"
                    )}
                  >
                    {group.title}
                  </button>
                ))}
              </nav>

              <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-brand-text hover:text-brand-accent transition-colors group">
                  Discuss your specific needs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Header (Visible only on small screens) */}
          <div className="lg:hidden mb-8">
            <p className="mb-4 text-sm text-brand-muted uppercase tracking-widest font-medium">Service menu</p>
            <h2 className="text-3xl font-medium tracking-tight mb-4">
              The offer, organized by what the product needs to do.
            </h2>
          </div>

          {/* Scrollable Content Right */}
          <div className="flex flex-col gap-24">
            {serviceGroups.map((group) => (
              <div key={group.title} id={group.id} className="scroll-mt-32">
                <div className="mb-8">
                  <h3 className="mb-4 text-3xl font-medium tracking-tight">{group.title}</h3>
                  <p className="text-lg leading-relaxed text-brand-muted max-w-2xl">{group.description}</p>
                </div>

                <div className="flex flex-col gap-6">
                  {group.items.map((name) => {
                    const item = deliverables.find((deliverable) => deliverable.title === name);
                    if (!item) return null;

                    return (
                      <div key={item.title} className="group border border-brand-accent/50 bg-brand-bg p-8 hover:border-brand-accent transition-colors duration-500">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr]">
                          <div>
                            <h4 className="mb-4 text-2xl font-medium tracking-tight">{item.title}</h4>
                            <p className="text-base leading-relaxed text-brand-muted">{item.description}</p>
                          </div>
                          <div className="grid grid-cols-1 gap-6 bg-brand-bg-alt/50 p-6">
                            <div>
                              <p className="mb-2 text-sm font-medium text-brand-text uppercase tracking-wider">Use case</p>
                              <p className="leading-relaxed text-brand-muted">{item.useCase}</p>
                            </div>
                            <div>
                              <p className="mb-2 text-sm font-medium text-brand-text uppercase tracking-wider">Outputs</p>
                              <p className="leading-relaxed text-brand-muted">{item.formats}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
