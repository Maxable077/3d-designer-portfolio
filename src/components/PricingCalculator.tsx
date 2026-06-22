"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const complexityOptions = [
  {
    id: "simple",
    title: "Simple",
    image: "/project-luma-light-v2.png",
    price: 100,
    oldPrice: 130,
  },
  {
    id: "medium",
    title: "Medium",
    image: "/project-forma-chair-v2.png",
    price: 160,
    oldPrice: 330,
  },
  {
    id: "complex",
    title: "Complex",
    image: "/project-aurora-exploded-view.png",
    price: 380,
    oldPrice: 780,
  },
];

const volumeTiers = [
  { label: "1-9 units", value: 1 },
  { label: "10-49 units", value: 0.9 },
  { label: "50-199 units", value: 0.8 },
  { label: "200+ units", value: 0.7 },
];

export function PricingCalculator() {
  const [step, setStep] = useState(1);
  const [complexity, setComplexity] = useState<string | null>(null);
  const [volumeIndex, setVolumeIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Dummy states for steps 2, 3, 4 just to make it fully interactive
  const [deliverable, setDeliverable] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateTotal = () => {
    let base = 0;
    if (complexity === "simple") base = 100;
    if (complexity === "medium") base = 160;
    if (complexity === "complex") base = 380;
    
    // Add dummy pricing for deliverables/extras
    if (deliverable === "lifestyle") base += 50;
    if (deliverable === "animation") base += 150;
    
    base += extras.length * 40;

    // Apply volume discount
    const multiplier = volumeTiers[volumeIndex].value;
    return Math.round(base * multiplier);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Header Info - Similar to Screenshot */}
      <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-end mb-12 gap-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-4">
            Step {step} / 4
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-text mb-2">
            {step === 1 && "How complex does your average product look?"}
            {step === 2 && "What type of deliverable do you need?"}
            {step === 3 && "Any interactive extras?"}
            {step === 4 && "Your estimated scope"}
          </h2>
        </div>

        {/* Volume Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-muted hidden sm:block">Prices listed for orders of</span>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-4 bg-brand-bg-alt border border-brand-accent/30 px-4 py-2 rounded-lg min-w-[160px] hover:border-brand-text transition-colors"
            >
              <span className="text-sm font-medium">{volumeTiers[volumeIndex].label}</span>
              <ChevronDown className="w-4 h-4 text-brand-muted" />
            </button>
          </div>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-full min-w-[160px] bg-brand-bg border border-brand-accent/50 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                {volumeTiers.map((tier, idx) => (
                  <button
                    key={tier.label}
                    onClick={() => {
                      setVolumeIndex(idx);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm hover:bg-brand-bg-alt transition-colors",
                      volumeIndex === idx ? "bg-brand-bg-alt font-bold text-brand-text" : "text-brand-muted"
                    )}
                  >
                    {tier.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dynamic Steps */}
      <div className="w-full relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {complexityOptions.map((opt) => {
                const isSelected = complexity === opt.id;
                return (
                  <div key={opt.id} className="flex flex-col">
                    <button
                      onClick={() => setComplexity(opt.id)}
                      className={cn(
                        "relative w-full aspect-square rounded-2xl overflow-hidden mb-4 border-2 transition-all duration-300 group bg-white",
                        isSelected ? "border-brand-text scale-[1.02] shadow-2xl" : "border-transparent hover:border-brand-accent"
                      )}
                    >
                      <Image 
                        src={opt.image} 
                        alt={opt.title} 
                        fill 
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      {/* Inner border/check overlay when selected */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-text flex items-center justify-center text-brand-bg shadow-lg">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </button>
                    
                    <div className="flex justify-between items-end px-1">
                      <div>
                        <h3 className="text-xl font-bold text-brand-text mb-1">{opt.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-medium">${Math.round(opt.price * volumeTiers[volumeIndex].value)}</span>
                          <span className="text-sm text-brand-muted line-through">${opt.oldPrice}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setComplexity(opt.id)}
                        className={cn(
                          "px-6 py-2 rounded-full border text-sm font-medium transition-colors",
                          isSelected ? "bg-brand-text border-brand-text text-brand-bg" : "border-brand-accent text-brand-text hover:border-brand-text"
                        )}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              {[
                { id: "silo", title: "White Background (Silo)", price: "+$0", icon: "🧊" },
                { id: "lifestyle", title: "Lifestyle Scene", price: "+$50", icon: "🛋️" },
                { id: "animation", title: "Product Animation", price: "+$150", icon: "🎬" },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDeliverable(opt.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-12 rounded-2xl border-2 transition-all duration-300 gap-4",
                    deliverable === opt.id ? "bg-brand-bg border-brand-text shadow-xl" : "bg-brand-bg-alt border-brand-accent/20 hover:border-brand-accent"
                  )}
                >
                  <span className="text-6xl mb-4">{opt.icon}</span>
                  <h3 className="text-xl font-bold">{opt.title}</h3>
                  <p className="text-brand-muted">{opt.price} per item</p>
                </button>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
              {[
                { id: "ar", title: "AR / 3D Model Viewer", desc: "Interactive GLB/USDZ file for web.", price: "+$40" },
                { id: "spin", title: "360 Spin", desc: "Interactive rotation for e-commerce.", price: "+$40" },
              ].map(opt => {
                const isSelected = extras.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (isSelected) setExtras(extras.filter(e => e !== opt.id));
                      else setExtras([...extras, opt.id]);
                    }}
                    className={cn(
                      "flex items-center justify-between p-8 rounded-2xl border-2 transition-all duration-300 text-left",
                      isSelected ? "bg-brand-bg border-brand-text shadow-xl" : "bg-brand-bg-alt border-brand-accent/20 hover:border-brand-accent"
                    )}
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2">{opt.title}</h3>
                      <p className="text-brand-muted">{opt.desc}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-medium text-lg">{opt.price}</span>
                      <div className={cn("w-6 h-6 rounded-md border flex items-center justify-center", isSelected ? "bg-brand-text border-brand-text text-brand-bg" : "border-brand-accent")}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center justify-center bg-brand-bg-alt p-12 md:p-24 rounded-[3rem] border border-brand-accent/20"
            >
              <p className="text-sm uppercase tracking-widest font-bold text-brand-muted mb-4">Estimated Total</p>
              <h2 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8">${calculateTotal()} <span className="text-2xl text-brand-muted font-normal tracking-normal">/ unit</span></h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="bg-brand-bg px-6 py-3 rounded-full border border-brand-accent/20 text-sm">
                  <span className="text-brand-muted">Complexity:</span> <span className="font-bold capitalize">{complexity || "None"}</span>
                </div>
                <div className="bg-brand-bg px-6 py-3 rounded-full border border-brand-accent/20 text-sm">
                  <span className="text-brand-muted">Deliverable:</span> <span className="font-bold capitalize">{deliverable || "Silo"}</span>
                </div>
                <div className="bg-brand-bg px-6 py-3 rounded-full border border-brand-accent/20 text-sm">
                  <span className="text-brand-muted">Extras:</span> <span className="font-bold">{extras.length} selected</span>
                </div>
              </div>

              <a href="/contact" className="bg-brand-text text-brand-bg px-12 py-5 rounded-full text-lg font-bold hover:scale-[1.02] active:scale-95 transition-transform">
                Get exact quote
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {step < 4 && (
        <div className="w-full flex justify-center items-center mt-16 pt-8 border-t border-brand-accent/20">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-3 font-medium text-brand-muted hover:text-brand-text disabled:opacity-30 disabled:hover:text-brand-muted transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={step === 1 && !complexity}
              className="bg-brand-text text-brand-bg px-12 py-4 rounded-full font-bold transition-transform disabled:opacity-50 hover:scale-[1.02] active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
