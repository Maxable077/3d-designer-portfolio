"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Playground() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setResultImage(data.imageUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-20 md:py-32">
      <section className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <AnimatedSection className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/30 text-brand-text text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> AI Concept Studio
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            Bring ideas to life in seconds.
          </h1>
          <p className="text-lg md:text-xl text-brand-muted max-w-2xl leading-relaxed">
            Describe a 3D product or concept below. Our integrated Replicate pipeline uses Flux 1.1 Pro to generate a hyper-realistic studio render.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="w-full mt-12">
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A minimalist espresso machine made of matte black steel and wood"
              className="flex-grow px-6 py-4 rounded-full border border-brand-accent bg-transparent focus:outline-none focus:border-brand-text transition-colors text-brand-text placeholder:text-brand-muted"
              disabled={isGenerating}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="inline-flex items-center justify-center gap-2 bg-brand-text text-brand-bg px-8 py-4 rounded-full text-sm font-medium disabled:opacity-50 transition-opacity"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                "Generate"
              )}
            </motion.button>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatedSection>
      </section>

      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="w-full aspect-square md:aspect-[21/9] bg-brand-bg-alt border border-brand-accent rounded-2xl overflow-hidden relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isGenerating && !resultImage && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-brand-muted flex flex-col items-center gap-4"
              >
                <Sparkles className="w-8 h-8 opacity-20" />
                <p>Your concept will appear here</p>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 text-brand-text"
              >
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="animate-pulse">Rendering via Replicate...</p>
              </motion.div>
            )}

            {resultImage && !isGenerating && (
              <motion.img
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={resultImage}
                alt={prompt}
                className="w-full h-full object-cover"
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
