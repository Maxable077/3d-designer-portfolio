"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { PopuliqueIntroComposition } from "@/components/PopuliqueIntroComposition";

const RemotionPlayer = dynamic(
  () => import("@remotion/player").then((module) => module.Player),
  { ssr: false }
);

const INTRO_DURATION_MS = 3000;
const INTRO_EXIT_MS = 400;
const FPS = 30;

export function SiteIntroLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = previousOverflow;
    }, INTRO_DURATION_MS - INTRO_EXIT_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          aria-label="Populique intro animation"
          aria-live="polite"
          className="fixed inset-0 z-[100] bg-[#FAF9F6]/70 backdrop-blur-[42px]"
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.018, filter: "blur(8px)" }
          }
          initial={{ opacity: 1 }}
          role="status"
          transition={{ duration: reduceMotion ? 0.18 : INTRO_EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-full w-full">
            <RemotionPlayer
              acknowledgeRemotionLicense
              autoPlay
              component={PopuliqueIntroComposition}
              compositionHeight={720}
              compositionWidth={1280}
              controls={false}
              durationInFrames={INTRO_DURATION_MS / 1000 * FPS}
              fps={FPS}
              inputProps={{ reduceMotion }}
              loop={false}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <span className="sr-only">Populique wordt geladen</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
