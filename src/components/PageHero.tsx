"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  align = "center",
  children,
  className,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "w-full bg-brand-text text-brand-bg pt-40 pb-20 md:pt-56 md:pb-32 px-6 rounded-b-[3rem] md:rounded-b-[5vw] relative z-20",
        className
      )}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "max-w-7xl mx-auto flex flex-col",
          isCenter ? "items-center text-center" : "items-start text-left"
        )}
      >
        {eyebrow ? (
          <p className="text-sm uppercase tracking-widest font-medium opacity-80 mb-6">{eyebrow}</p>
        ) : null}
        <h1
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 leading-none max-w-4xl",
            isCenter && "mx-auto"
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "text-xl md:text-2xl opacity-80 font-light max-w-2xl mb-8",
              isCenter && "mx-auto"
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </motion.div>
    </section>
  );
}
