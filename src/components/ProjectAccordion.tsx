"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string;
}

interface ProjectAccordionProps {
  items: AccordionItem[];
}

export function ProjectAccordion({ items }: ProjectAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-brand-accent/20 border-y border-brand-accent/20">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-6 md:py-8 text-left gap-8 group"
          >
            <span className={cn(
              "text-xl md:text-2xl font-medium tracking-tight transition-colors",
              openIndex === i ? "text-brand-text" : "text-brand-muted group-hover:text-brand-text"
            )}>
              {item.title}
            </span>
            <motion.div
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="shrink-0 w-10 h-10 rounded-full border border-brand-accent flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <p className="text-brand-muted text-lg leading-relaxed pb-8 md:pb-10 max-w-3xl">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
