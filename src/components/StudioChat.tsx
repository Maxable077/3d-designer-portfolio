"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  BriefcaseBusiness,
  Check,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ChatAction = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "visitor";
  text: string;
  actions?: ChatAction[];
};

const starterMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hi, ik ben de studio assistant. Ik kan je helpen het juiste werk te vinden, een 3D project scherp te krijgen of snel een briefing klaar te zetten.",
  },
];

const quickReplies = [
  "Ik wil een 3D project starten",
  "Toon relevant werk",
  "Wat heb je nodig van mij?",
  "Ben je beschikbaar?",
];

function createAssistantReply(input: string): ChatMessage {
  const normalizedInput = input.toLowerCase();

  if (
    normalizedInput.includes("project") ||
    normalizedInput.includes("start") ||
    normalizedInput.includes("brief") ||
    normalizedInput.includes("render")
  ) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Mooi. Voor een sterke 3D briefing zijn vooral dit soort details handig: product of ruimte, gewenste output, stijlreferenties, deadline, budgetrange en of er CAD, schetsen of foto’s beschikbaar zijn.",
      actions: [
        { label: "Open contact", href: "/contact" },
        { label: "Bekijk services", href: "/services" },
      ],
    };
  }

  if (
    normalizedInput.includes("werk") ||
    normalizedInput.includes("portfolio") ||
    normalizedInput.includes("voorbeeld") ||
    normalizedInput.includes("toon")
  ) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Als je product renders zoekt, start bij Aurora Espresso. Voor interieur en meubels past Forma Chair of Linea Kitchen beter. Voor licht, glas en sfeer is Luma Light het meest relevant.",
      actions: [
        { label: "Alle projecten", href: "/work" },
        { label: "Product renders", href: "/work/aurora-espresso" },
      ],
    };
  }

  if (
    normalizedInput.includes("nodig") ||
    normalizedInput.includes("aanlever") ||
    normalizedInput.includes("cad") ||
    normalizedInput.includes("files")
  ) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Om te starten is één van deze al genoeg: CAD-bestand, schets, productfoto’s, afmetingen of een moodboard. Hoe beter de referenties, hoe sneller de visual richting premium en realistisch wordt.",
      actions: [{ label: "Proces bekijken", href: "/services" }],
    };
  }

  if (
    normalizedInput.includes("beschikbaar") ||
    normalizedInput.includes("deadline") ||
    normalizedInput.includes("prijs") ||
    normalizedInput.includes("budget")
  ) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Voor beschikbaarheid, timing en prijs is het slim om kort de scope te sturen: aantal beelden, gewenste stijl, deadline en inputmateriaal. Dan kan Max gericht reageren zonder eindeloze mailpingpong.",
      actions: [{ label: "Stuur aanvraag", href: "/contact" }],
    };
  }

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    text: "Dat kan ik helpen voorbereiden. Vertel kort wat je wilt laten maken, waarvoor het gebruikt wordt en wanneer je het nodig hebt. Dan zet ik het om naar een scherpe projectvraag.",
    actions: [{ label: "Contactpagina", href: "/contact" }],
  };
}

export function StudioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const visitorBrief = useMemo(
    () =>
      messages
        .filter((message) => message.role === "visitor")
        .map((message) => message.text)
        .join("\n\n"),
    [messages]
  );

  const mailHref = useMemo(() => {
    const body = visitorBrief
      ? `Hi Max,\n\nIk kwam via je portfolio chat. Dit is mijn eerste projectinfo:\n\n${visitorBrief}\n\nGroet,`
      : "Hi Max,\n\nIk wil graag een 3D project bespreken.\n\nGroet,";

    return `mailto:hello@example.com?subject=${encodeURIComponent(
      "3D project aanvraag"
    )}&body=${encodeURIComponent(body)}`;
  }, [visitorBrief]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages]);

  function sendMessage(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    const visitorMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "visitor",
      text: trimmedValue,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      visitorMessage,
      createAssistantReply(trimmedValue),
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            key="studio-chat-panel"
            id="studio-chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-4 bottom-4 flex max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-2xl border border-brand-accent/70 bg-brand-bg/96 backdrop-blur-xl shadow-[0_28px_70px_rgba(28,28,28,0.12)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[620px] sm:w-[400px]"
            aria-label="Studio assistant chat"
          >
            <header className="flex items-start justify-between gap-4 border-b border-brand-accent/30 bg-transparent px-5 py-4">
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-brand-text">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Studio Assistant
                </div>
                <p className="text-xs leading-relaxed text-brand-muted">
                  Snelle hulp voor portfolio, briefing en beschikbaarheid.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-accent/50 text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
                aria-label="Sluit chat"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={cn(
                      "flex",
                      message.role === "visitor" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[86%] px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-sm",
                        message.role === "visitor"
                          ? "bg-brand-text text-brand-bg rounded-br-sm"
                          : "border border-brand-accent/50 bg-white text-brand-text rounded-bl-sm"
                      )}
                    >
                      <p>{message.text}</p>
                      {message.actions ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.actions.map((action) => (
                            <Link
                              key={action.href}
                              href={action.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 rounded-full border border-brand-accent/50 bg-brand-bg px-3 py-2 text-xs font-medium text-brand-text transition-colors hover:border-brand-text"
                            >
                              <Check className="h-3 w-3" aria-hidden="true" />
                              {action.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-brand-accent/30 bg-transparent px-4 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => sendMessage(reply)}
                    className="rounded-full border border-brand-accent/50 bg-brand-bg-alt px-3 py-2 text-left text-xs text-brand-text transition-colors hover:border-brand-text"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label htmlFor="studio-chat-input" className="sr-only">
                  Typ je vraag
                </label>
                <input
                  id="studio-chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Typ je projectvraag..."
                  className="min-w-0 flex-1 rounded-full border border-brand-accent/50 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-brand-muted focus:border-brand-text"
                />
                <button
                  type="submit"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-text text-brand-bg transition-transform hover:scale-[1.03] active:scale-95"
                  aria-label="Verstuur bericht"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>

              <a
                href={mailHref}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-brand-accent/50 bg-brand-bg-alt px-4 py-3 text-xs font-medium text-brand-text transition-colors hover:border-brand-text"
              >
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                Mail deze briefing naar Max
              </a>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 items-center gap-3 rounded-full bg-brand-text px-5 text-sm font-medium text-brand-bg shadow-xl shadow-black/15"
        aria-label="Vraag de studio"
        aria-expanded={isOpen}
        aria-controls="studio-chat-panel"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Vraag de studio</span>
      </motion.button>
    </div>
  );
}
