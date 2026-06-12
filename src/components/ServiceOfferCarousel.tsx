"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { deliverables } from "@/data/services";

export function ServiceOfferCarousel() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="service-carousel" className="scroll-mt-28 overflow-hidden bg-brand-bg py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 grid grid-cols-1 gap-6 border-b border-brand-accent pb-8 md:grid-cols-[0.5fr_1fr] md:items-end">
          <div>
            <p className="mb-4 text-sm text-brand-muted">Output menu</p>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Choose the assets the launch needs.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-muted md:ml-auto">
            A single product model can become clean shop images, atmospheric campaign scenes, technical feature frames and short motion loops.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max max-w-[calc(100vw-3rem)] gap-4 md:max-w-none">
          {deliverables.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group flex min-h-[360px] w-[82vw] max-w-[380px] flex-col justify-between border border-brand-accent bg-brand-bg-alt p-6 transition-colors hover:bg-brand-text hover:text-brand-bg sm:w-[360px]"
            >
              <div>
                <div className="mb-12 flex items-center justify-between border-b border-brand-accent pb-4 text-sm text-brand-muted transition-colors group-hover:border-white/20 group-hover:text-white/55">
                  <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.formats.split(",")[0]}</span>
                </div>
                <h3 className="mb-4 text-2xl font-medium tracking-tight">{item.title}</h3>
                <p className="leading-relaxed text-brand-muted transition-colors group-hover:text-white/68">
                  {item.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 md:block">
                  <p className="border-t border-white/20 pt-4 text-sm leading-relaxed text-white/68">
                    {item.useCase}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors group-hover:text-brand-bg"
                >
                  Discuss this output
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
