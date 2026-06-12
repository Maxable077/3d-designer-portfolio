"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ServiceFamily } from "@/data/services";
import { serviceFamilies } from "@/data/services";

export function ScrollServiceStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="service-story" className="scroll-mt-28 bg-brand-bg py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-12 grid grid-cols-1 gap-8 border-b border-brand-accent pb-8 md:grid-cols-[0.7fr_1.3fr] md:items-end md:gap-16"
        >
          <div>
            <p className="mb-4 text-sm text-brand-muted">Service range</p>
            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              Visual services built around product content.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-muted md:ml-auto">
            The offer is organized by product situation first: what needs to be sold, explained, launched or reused. Each panel connects a product category to the assets it can produce.
          </p>
        </motion.div>

        <div className="relative flex flex-col gap-10 md:gap-16">
          {serviceFamilies.map((service, index) => (
            <ServiceStoryCard
              key={service.title}
              service={service}
              index={index}
              total={serviceFamilies.length}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceStoryCard({
  index,
  reduceMotion,
  service,
  total,
}: {
  index: number;
  reduceMotion: boolean | null;
  service: ServiceFamily;
  total: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 78%", "end 18%"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.975, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.86, 1], [0.58, 1, 1, 0.82]);

  return (
    <motion.article
      ref={cardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 70 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="grid min-h-[68vh] overflow-hidden rounded-lg border border-brand-accent bg-brand-bg shadow-[0_24px_80px_rgba(28,28,28,0.08)] md:sticky md:grid-cols-[0.36fr_0.64fr]"
      style={{
        opacity: reduceMotion ? undefined : opacity,
        scale: reduceMotion ? undefined : scale,
        top: `calc(6rem + ${index * 14}px)`,
        zIndex: index + 1,
      }}
    >
      <div className="flex flex-col justify-between bg-brand-text p-7 text-brand-bg md:p-10">
        <div>
          <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5">
            <p className="text-sm text-white/65">{service.eyebrow}</p>
            <p className="text-sm text-white/55 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </div>
          <h3 className="mb-6 text-3xl font-medium tracking-tight md:text-5xl">
            {service.title}
          </h3>
          <p className="max-w-md text-lg leading-relaxed text-white/72">
            {service.audience}
          </p>
        </div>

        <div className="mt-10">
          <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
            {service.outputs.map((output) => (
              <div key={output} className="border-t border-white/15 pt-3 text-sm text-white/75">
                {output}
              </div>
            ))}
          </div>
          <Link
            href={service.href}
            className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-text"
          >
            View matching project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative min-h-[320px] md:min-h-full">
        <Image
          src={service.imageUrl}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 768px) 64vw, 100vw"
          className="object-cover"
          style={{ objectPosition: service.imagePosition ?? "center" }}
        />
      </div>
    </motion.article>
  );
}
