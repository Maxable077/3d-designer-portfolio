"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Layers, Menu, Sparkles, X } from "lucide-react";
import { projects } from "@/data/projects";
import { deliverables, serviceFamilies } from "@/data/services";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  path: string;
  hasMenu?: boolean;
  Icon?: typeof Sparkles;
};

const navItems: NavItem[] = [
  { name: "Work", path: "/work" },
  { name: "Services", path: "/services", hasMenu: true },
  { name: "About", path: "/about" },
  { name: "Playground", path: "/playground", Icon: Sparkles },
];

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const featuredProject = projects[0];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 18);
    setHidden(latest > 130 && latest > previous && !servicesOpen && !mobileOpen);
  });

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <motion.header
      animate={reduceMotion ? undefined : { y: hidden ? -82 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-colors",
        scrolled || servicesOpen || mobileOpen
          ? "border-brand-accent/70 bg-brand-bg/92"
          : "border-brand-accent/45 bg-brand-bg/82"
      )}
      onMouseLeave={() => setServicesOpen(false)}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-medium tracking-tight" onFocus={() => setServicesOpen(false)}>
          Max
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) =>
            item.hasMenu ? (
              <button
                key={item.path}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-mega-menu"
                onClick={() => setServicesOpen((open) => !open)}
                onFocus={() => setServicesOpen(true)}
                onMouseEnter={() => setServicesOpen(true)}
                className={cn(
                  "inline-flex h-11 items-center px-4 text-sm font-medium transition-colors",
                  servicesOpen || isActive(item.path)
                    ? "bg-brand-text text-brand-bg"
                    : "text-brand-muted hover:bg-brand-bg-alt hover:text-brand-text"
                )}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                onFocus={() => setServicesOpen(false)}
                onMouseEnter={() => setServicesOpen(false)}
                className={cn(
                  "inline-flex h-11 items-center gap-1.5 px-4 text-sm font-medium transition-colors hover:bg-brand-bg-alt hover:text-brand-text",
                  isActive(item.path) ? "text-brand-text" : "text-brand-muted"
                )}
              >
                {item.Icon && <item.Icon className="h-3.5 w-3.5" />}
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/services#brief-builder"
            className="inline-flex h-11 items-center gap-2 px-4 text-sm font-medium text-brand-muted transition-colors hover:bg-brand-bg-alt hover:text-brand-text"
            onFocus={() => setServicesOpen(false)}
          >
            <Layers className="h-4 w-4" />
            Estimate scope
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center bg-brand-text px-5 text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
            onFocus={() => setServicesOpen(false)}
          >
            Start project
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center border border-brand-accent text-brand-text lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            id="services-mega-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-0 top-full hidden w-full border-b border-brand-accent/70 bg-brand-bg/96 shadow-[0_28px_70px_rgba(28,28,28,0.12)] backdrop-blur-xl lg:block"
            onMouseEnter={() => setServicesOpen(true)}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_0.34fr] gap-8 px-6 py-6">
              <div className="grid grid-cols-4 gap-4">
                {serviceFamilies.map((service) => (
                  <Link
                    key={service.title}
                    href="/services#service-story"
                    onClick={() => setServicesOpen(false)}
                    className="group block border border-brand-accent bg-brand-bg-alt"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-brand-accent">
                      <Image
                        src={service.imageUrl}
                        alt={service.imageAlt}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.04]"
                        style={{ objectPosition: service.imagePosition ?? "center" }}
                      />
                    </div>
                    <div className="p-5">
                      <p className="mb-2 text-xs text-brand-muted">{service.eyebrow}</p>
                      <h3 className="mb-3 text-lg font-medium tracking-tight">{service.title}</h3>
                      <p className="text-sm leading-relaxed text-brand-muted">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col justify-between border-l border-brand-accent pl-8">
                <div>
                  <div className="mb-5 flex items-center gap-2 text-sm text-brand-muted">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Offer system
                  </div>
                  <h2 className="mb-4 text-2xl font-medium tracking-tight">
                    Pick by output, then shape the scope.
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {deliverables.slice(0, 5).map((item) => (
                      <Link
                        key={item.title}
                        href="/services#service-carousel"
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-center justify-between border-t border-brand-accent pt-3 text-sm"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-brand-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-text" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-brand-accent pt-5">
                  <p className="mb-3 text-sm leading-relaxed text-brand-muted">
                    Latest visual direction: {featuredProject.title}.
                  </p>
                  <Link
                    href="/services#brief-builder"
                    onClick={() => setServicesOpen(false)}
                    className="inline-flex items-center gap-2 bg-brand-text px-5 py-3 text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Build a scope <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="border-t border-brand-accent bg-brand-bg px-6 py-6 lg:hidden"
          >
            <div className="grid grid-cols-1 gap-2">
              {[
                ...navItems.map((item) => ({ name: item.name, path: item.path })),
                { name: "Estimate scope", path: "/services#brief-builder" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-brand-accent py-4 text-lg font-medium tracking-tight"
                >
                  {item.name}
                  <ArrowRight className="h-4 w-4 text-brand-muted" />
                </Link>
              ))}
            </div>

            <div className="mt-7">
              <p className="mb-4 text-sm text-brand-muted">Services</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {serviceFamilies.slice(0, 4).map((service) => (
                  <Link
                    key={service.title}
                    href="/services#service-story"
                    onClick={() => setMobileOpen(false)}
                    className="border border-brand-accent bg-brand-bg-alt p-4"
                  >
                    <p className="mb-2 text-xs text-brand-muted">{service.eyebrow}</p>
                    <h3 className="text-base font-medium tracking-tight">{service.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
