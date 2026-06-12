"use client";

import { motion, useReducedMotion } from "framer-motion";
import { deliverables } from "@/data/services";

export function MotionDeliverableStrip() {
  const reduceMotion = useReducedMotion();
  const stripItems = [...deliverables, ...deliverables];

  return (
    <div className="relative overflow-hidden border-y border-brand-accent bg-brand-bg">
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        {stripItems.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex min-w-[260px] md:min-w-[340px] items-center justify-between gap-8 border-r border-brand-accent px-6 py-5 md:px-10"
          >
            <span className="text-sm text-brand-muted tabular-nums">
              {String((index % deliverables.length) + 1).padStart(2, "0")}
            </span>
            <span className="text-base md:text-lg font-medium tracking-tight whitespace-nowrap">
              {item.title}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
