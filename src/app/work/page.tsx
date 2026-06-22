"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.meta.category)))];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.meta.category === activeCategory
  );

  return (
    <div className="flex flex-col w-full bg-brand-bg pb-32">
      <PageHero
        eyebrow="Portfolio"
        title="Case studies"
        description="Selected work across product, interior and packaging — proof of what we deliver for clients."
      />

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-brand-bg/90 backdrop-blur-xl border-y border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <span className="text-sm uppercase tracking-widest text-brand-muted font-medium mr-4 hidden md:block">Filter by:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium uppercase tracking-wider ${
                activeCategory === category
                  ? "border-brand-text bg-brand-text text-brand-bg"
                  : "border-transparent text-brand-muted hover:border-brand-accent hover:text-brand-text"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Edge-to-Edge Grid */}
      <motion.div layout className="w-full grid grid-cols-1 md:grid-cols-2">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              key={project.slug}
            >
              <ProjectCard 
                slug={project.slug}
                title={project.title}
                category={project.meta.category}
                year={project.meta.year}
                description={project.shortDescription}
                thumbnailUrl={project.thumbnailUrl}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
