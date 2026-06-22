"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "populique-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function saveChoice(value: "accepted" | "essential") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-4 left-4 right-4 z-[90] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
          aria-label="Cookie consent"
        >
          <div className="rounded-2xl border border-brand-accent/60 bg-brand-bg/95 p-5 shadow-[0_20px_50px_rgba(28,28,28,0.12)] backdrop-blur-xl">
            <p className="text-sm leading-relaxed text-brand-muted">
              We use essential cookies to keep the site secure and working. Optional analytics may be added later — you
              can read how we handle data in our{" "}
              <Link href="/privacy" className="text-brand-text underline underline-offset-4 hover:opacity-70">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => saveChoice("accepted")}
                className="rounded-full bg-brand-text px-5 py-2.5 text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => saveChoice("essential")}
                className="rounded-full border border-brand-accent px-5 py-2.5 text-sm font-medium text-brand-text transition-colors hover:border-brand-text"
              >
                Essential only
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
