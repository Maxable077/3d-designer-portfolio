"use client";

import { FormEvent, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

type ContactFormProps = {
  intent?: "general" | "demo" | "estimate";
};

export function ContactForm({ intent = "general" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, website, intent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      track("contact_form_submit", { intent });
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 py-8"
      >
        <CheckCircle2 className="h-10 w-10 text-brand-text" />
        <h2 className="text-3xl font-medium tracking-tight text-brand-text">Message sent</h2>
        <p className="text-lg text-brand-muted leading-relaxed max-w-md">
          Thanks — we received your request and will get back to you at the email you provided, usually within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium underline underline-offset-4 text-brand-text hover:opacity-70 transition-opacity"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-medium tracking-tight mb-4 text-brand-text">Send a message</h2>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="name" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none text-lg"
            placeholder="John Doe"
          />
        </div>
        <div className="flex flex-col gap-2 relative group">
          <label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none text-lg"
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 relative group">
        <label htmlFor="company" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">
          Company (Optional)
        </label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none text-lg"
          placeholder="Your brand name"
        />
      </div>

      <div className="flex flex-col gap-2 relative group">
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">
          Project Details
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none resize-none text-lg"
          placeholder="Tell us about the deliverables you need..."
        />
      </div>

      <AnimatePresence>
        {status === "error" ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-600"
            role="alert"
          >
            {errorMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="pt-6">
        <MagneticButton strength={0.1}>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-brand-text text-brand-bg px-10 py-5 text-lg font-medium transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === "loading" ? (
              <>
                Sending… <Loader2 className="w-5 h-5 ml-2 animate-spin" />
              </>
            ) : (
              <>
                Submit Request <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </MagneticButton>
      </div>
    </form>
  );
}
