"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, FileStack, Layers, PackageCheck, RotateCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const complexityOptions = [
  { label: "Simple form", description: "Clean silhouette, few materials", weight: 1 },
  { label: "Detailed product", description: "Multiple parts and visible details", weight: 2 },
  { label: "Complex system", description: "Assemblies, mechanisms or variants", weight: 3 },
];

const sourceOptions = [
  { label: "CAD available", description: "Model cleanup and render prep", weight: 0 },
  { label: "Sketches or photos", description: "Model built from references", weight: 2 },
  { label: "Concept only", description: "Form, model and direction", weight: 3 },
];

const assetOptions = [
  { label: "Silo renders", weight: 1 },
  { label: "Lifestyle scene", weight: 2 },
  { label: "Feature callouts", weight: 2 },
  { label: "Material close-ups", weight: 1 },
  { label: "Short animation", weight: 3 },
  { label: "Social crops", weight: 1 },
];

const quantityOptions = [
  { label: "1-3 finals", description: "Compact delivery", weight: 1 },
  { label: "4-8 finals", description: "Core campaign range", weight: 2 },
  { label: "Launch set", description: "Full asset family", weight: 3 },
];

const stepLabels = ["Complexity", "Source", "Assets", "Finals"];

export function ServiceEstimator() {
  const [activeStep, setActiveStep] = useState(0);
  const [complexity, setComplexity] = useState(complexityOptions[1]);
  const [source, setSource] = useState(sourceOptions[0]);
  const [quantity, setQuantity] = useState(quantityOptions[1]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([
    "Silo renders",
    "Lifestyle scene",
    "Feature callouts",
  ]);

  const recommendation = useMemo(() => {
    const assetWeight = assetOptions
      .filter((option) => selectedAssets.includes(option.label))
      .reduce((total, option) => total + option.weight, 0);
    const score = complexity.weight + source.weight + quantity.weight + assetWeight;

    if (score >= 12) {
      return {
        label: "Launch content system",
        timeline: "3-5 weeks",
        output: "Full model setup, visual direction, still renders, feature frames and motion-ready assets.",
        next: "Best for a complete product launch or collection refresh.",
      };
    }

    if (score >= 8) {
      return {
        label: "Campaign render set",
        timeline: "1-3 weeks",
        output: "Hero scene, silo images, detail crops and reusable crops for web or social.",
        next: "Best for a product page, investor deck or campaign push.",
      };
    }

    return {
      label: "Focused hero package",
      timeline: "4-8 days",
      output: "One refined visual direction with a compact batch of final stills.",
      next: "Best for testing a direction or presenting one product clearly.",
    };
  }, [complexity, source, quantity, selectedAssets]);

  const selectedSummary = [
    complexity.label,
    source.label,
    quantity.label,
    `${selectedAssets.length} asset types`,
  ];

  function toggleAsset(label: string) {
    setSelectedAssets((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  }

  const stepContent = [
    {
      icon: <PackageCheck className="h-4 w-4" />,
      label: "Step 1 / Product complexity",
      title: "How complex is the product?",
      description: "Choose the closest starting point. This affects modeling, cleanup and material work.",
      body: (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {complexityOptions.map((option) => (
            <OptionButton
              key={option.label}
              active={complexity.label === option.label}
              title={option.label}
              description={option.description}
              onClick={() => setComplexity(option)}
            />
          ))}
        </div>
      ),
    },
    {
      icon: <FileStack className="h-4 w-4" />,
      label: "Step 2 / Source material",
      title: "What can we start from?",
      description: "CAD files move fastest, but sketches, photos and concepts can become render-ready models too.",
      body: (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {sourceOptions.map((option) => (
            <OptionButton
              key={option.label}
              active={source.label === option.label}
              title={option.label}
              description={option.description}
              onClick={() => setSource(option)}
            />
          ))}
        </div>
      ),
    },
    {
      icon: <Layers className="h-4 w-4" />,
      label: "Step 3 / Asset types",
      title: "Which outputs should the model create?",
      description: "This is where the scope becomes a reusable content system instead of one loose render.",
      body: (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {assetOptions.map((option) => {
            const selected = selectedAssets.includes(option.label);

            return (
              <motion.button
                key={option.label}
                type="button"
                aria-pressed={selected}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleAsset(option.label)}
                className={cn(
                  "flex min-h-16 items-center justify-between border px-4 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-brand-text bg-brand-text text-brand-bg"
                    : "border-brand-accent bg-brand-bg text-brand-text hover:border-brand-text/40"
                )}
              >
                {option.label}
                <span className={cn("grid h-5 w-5 place-items-center border", selected ? "border-white/40" : "border-brand-accent")}>
                  {selected && <Check className="h-3.5 w-3.5" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      ),
    },
    {
      icon: <Check className="h-4 w-4" />,
      label: "Step 4 / Final image count",
      title: "How broad should the final set be?",
      description: "Pick the delivery size that best matches the product page, launch deck or campaign.",
      body: (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {quantityOptions.map((option) => (
            <OptionButton
              key={option.label}
              active={quantity.label === option.label}
              title={option.label}
              description={option.description}
              onClick={() => setQuantity(option)}
            />
          ))}
        </div>
      ),
    },
  ];

  const currentStep = stepContent[activeStep];

  return (
    <div className="grid grid-cols-1 gap-10 border-y border-brand-accent py-14 md:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="mb-5 flex items-center gap-2 text-sm text-brand-muted">
          <Layers className="h-4 w-4" />
          Estimate project
        </div>
        <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-5xl">
          Build a render scope in four steps.
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-brand-muted">
          Move through the same decisions that shape a real brief: product complexity, source material, asset types and final delivery range.
        </p>

        <motion.div
          key={recommendation.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="mt-10 border border-brand-accent bg-brand-bg-alt p-6"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm text-brand-muted">Recommended package</p>
              <h3 className="text-2xl font-medium tracking-tight">{recommendation.label}</h3>
            </div>
            <Sparkles className="h-5 w-5 text-brand-muted" />
          </div>
          <p className="mb-5 leading-relaxed text-brand-muted">{recommendation.output}</p>
          <p className="mb-6 text-sm text-brand-text/75">{recommendation.next}</p>
          <div className="mb-7 flex items-center gap-2 text-sm">
            <RotateCw className="h-4 w-4" />
            Typical production window: {recommendation.timeline}
          </div>
          <div className="mb-7 flex flex-wrap gap-2">
            {selectedSummary.map((item) => (
              <span key={item} className="border border-brand-accent bg-brand-bg px-3 py-2 text-xs text-brand-muted">
                {item}
              </span>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-text px-5 py-3 text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
          >
            Send this scope
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="border border-brand-accent bg-brand-bg">
        <div className="grid grid-cols-4 border-b border-brand-accent">
          {stepLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveStep(index)}
              className={cn(
                "border-r border-brand-accent px-3 py-4 text-left text-xs transition-colors last:border-r-0 md:px-5 md:text-sm",
                activeStep === index ? "bg-brand-text text-brand-bg" : "text-brand-muted hover:bg-brand-bg-alt hover:text-brand-text"
              )}
            >
              <span className="mb-2 block tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.label}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="mb-8 flex items-start justify-between gap-6 border-b border-brand-accent pb-7">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-muted">
                    {currentStep.icon}
                    {currentStep.label}
                  </div>
                  <h3 className="mb-3 text-3xl font-medium tracking-tight md:text-4xl">
                    {currentStep.title}
                  </h3>
                  <p className="max-w-2xl leading-relaxed text-brand-muted">
                    {currentStep.description}
                  </p>
                </div>
              </div>

              {currentStep.body}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 border-t border-brand-accent pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
              disabled={activeStep === 0}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-text disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {activeStep < stepContent.length - 1 ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep((step) => Math.min(stepContent.length - 1, step + 1))}
                className="inline-flex items-center justify-center gap-2 bg-brand-text px-6 py-3 text-sm font-medium text-brand-bg"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-text px-6 py-3 text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
              >
                Send scope
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionButton({
  active,
  description,
  onClick,
  title,
}: {
  active: boolean;
  description: string;
  onClick: () => void;
  title: string;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={active}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex min-h-32 flex-col justify-between border p-5 text-left transition-colors",
        active
          ? "border-brand-text bg-brand-text text-brand-bg"
          : "border-brand-accent bg-brand-bg text-brand-text hover:border-brand-text/40"
      )}
    >
      <span className="flex items-start justify-between gap-3 text-sm font-medium">
        {title}
        {active && <Check className="h-4 w-4 flex-shrink-0" />}
      </span>
      <span className={cn("mt-5 text-sm leading-relaxed", active ? "text-white/68" : "text-brand-muted")}>
        {description}
      </span>
    </motion.button>
  );
}
