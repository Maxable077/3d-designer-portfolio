"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Populique transformed our entire catalog process. We used to spend thousands on physical photoshoots, but the 3D renders are not only cheaper, they actually look better than real photos.",
    author: "Sarah J.",
    role: "Marketing Director, Forma Furniture",
  },
  {
    text: "The lighting and texturing are unbelievably realistic. Even our designers couldn't tell it was CGI. Working with the studio was seamless from start to finish.",
    author: "Michael T.",
    role: "Founder, Lumière Lighting",
  },
  {
    text: "What sets them apart is the attention to detail. Every seam, every reflection is perfect. The lifestyle scenes drove a 40% increase in our online conversions.",
    author: "Elena R.",
    role: "E-commerce Manager, Outdoor Living Co.",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-6 pb-10 pt-2">
      <div className="flex flex-col items-center text-center">
        <Quote className="w-10 h-10 text-brand-accent/30 mb-4" />
        
        <div className="relative h-[250px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute w-full"
            >
              <p className="text-2xl md:text-4xl font-light leading-snug md:leading-tight mb-8">
                &quot;{testimonials[currentIndex].text}&quot;
              </p>
              <div className="flex flex-col items-center">
                <span className="font-medium text-lg">{testimonials[currentIndex].author}</span>
                <span className="text-brand-muted text-sm">{testimonials[currentIndex].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-brand-accent text-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full border border-brand-accent text-brand-text hover:bg-brand-text hover:text-brand-bg transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
