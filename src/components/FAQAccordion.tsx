"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How long does a 3D rendering project typically take?",
    answer: "Most standard product rendering projects take 1-2 weeks from concept to final delivery. Complex animations or large sets might take 3-4 weeks. We always provide a clear timeline upfront.",
  },
  {
    question: "Do you need physical samples of the product?",
    answer: "No, we usually don't need physical samples. We work directly from your CAD files (.STEP, .IGES, etc.), technical drawings, or even just detailed reference photos with dimensions.",
  },
  {
    question: "Can I use the 3D models for AR/VR later?",
    answer: "Absolutely. We build all our assets with future-proofing in mind. We can export lightweight glTF/USDZ files ready for Shopify, Apple Quick Look, and Android ARCore.",
  },
  {
    question: "How does the revision process work?",
    answer: "Every project includes two rounds of revisions. The first round is for geometry and layout approval (clay renders), and the second is for lighting and material tweaks on the final high-res renders.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index}
            className="border-b border-brand-accent/20 pb-4 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between py-4 text-left group"
            >
              <span className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-brand-accent transition-colors">
                {faq.question}
              </span>
              <span className="flex-shrink-0 ml-6 text-brand-muted">
                {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="pb-6 pt-2 text-brand-muted text-lg font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
