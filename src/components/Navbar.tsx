"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Layers, Menu, Sparkles, X, ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import { deliverables, serviceFamilies } from "@/data/services";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  path: string;
  hasMenu?: boolean;
  menuType?: "services" | "work";
  Icon?: typeof Sparkles;
};

const navItems: NavItem[] = [
  { name: "Work", path: "/work", hasMenu: true, menuType: "work" },
  { name: "Services", path: "/services", hasMenu: true, menuType: "services" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Playground", path: "/playground", Icon: Sparkles },
];

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [activeMenu, setActiveMenu] = useState<"services" | "work" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<"services" | "work" | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const featuredProject = projects[0];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 18);
    setHidden(latest > 130 && latest > previous && !activeMenu && !mobileOpen);
  });

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");
  const isTransparentHeader = (pathname === "/" || pathname.startsWith("/contact") || pathname.startsWith("/work/")) && !scrolled && !activeMenu && !mobileOpen;

  // Handle path changes to close menus
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileExpandedSection(null);
  }, [pathname]);

  return (
    <motion.header
      animate={reduceMotion ? undefined : { y: hidden ? -82 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-500",
        scrolled || activeMenu || mobileOpen
          ? "border-b border-brand-accent/70 bg-brand-bg/92 backdrop-blur-xl text-brand-text"
          : pathname === "/"
            ? "border-b border-transparent bg-transparent text-white"
            : isTransparentHeader
              ? "border-b border-transparent bg-transparent text-brand-bg" // For contact and work/[slug] hero sections
              : "border-b border-brand-accent/45 bg-brand-bg/82 backdrop-blur-xl text-brand-text"
      )}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="relative flex items-center justify-start w-32 md:w-40 h-8" onFocus={() => setActiveMenu(null)}>
          {/* Default to primary (dark), but use inverse (white) if header is transparent over a dark hero */}
          <Image
            src={isTransparentHeader && pathname === "/" || isTransparentHeader ? "/populique-lockup-inverse.svg" : "/populique-lockup-primary.svg"}
            alt="Populique"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) =>
            item.hasMenu ? (
              <button
                key={item.path}
                type="button"
                aria-expanded={activeMenu === item.menuType}
                aria-controls={`${item.menuType}-mega-menu`}
                onClick={() => setActiveMenu((open) => open === item.menuType ? null : (item.menuType || null))}
                onFocus={() => setActiveMenu(item.menuType || null)}
                onMouseEnter={() => setActiveMenu(item.menuType || null)}
                className={cn(
                  "inline-flex h-11 items-center px-4 text-sm font-medium transition-colors rounded-full",
                  activeMenu === item.menuType || isActive(item.path)
                    ? "bg-brand-text text-brand-bg"
                    : isTransparentHeader && pathname === "/"
                      ? "text-white/80 hover:text-white"
                      : isTransparentHeader
                        ? "text-brand-bg/80 hover:text-brand-bg"
                        : "text-brand-muted hover:bg-brand-bg-alt hover:text-brand-text"
                )}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                onFocus={() => setActiveMenu(null)}
                onMouseEnter={() => setActiveMenu(null)}
                className={cn(
                  "inline-flex h-11 items-center gap-1.5 px-4 text-sm font-medium transition-colors rounded-full",
                  isActive(item.path) 
                    ? isTransparentHeader && pathname === "/" ? "text-white" : isTransparentHeader ? "text-brand-bg" : "text-brand-text"
                    : isTransparentHeader && pathname === "/" ? "text-white/80 hover:text-white" : isTransparentHeader ? "text-brand-bg/80 hover:text-brand-bg" : "text-brand-muted hover:bg-brand-bg-alt hover:text-brand-text"
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
            className={cn(
              "inline-flex h-11 items-center gap-2 px-4 text-sm font-medium transition-colors rounded-full",
              isTransparentHeader && pathname === "/" ? "text-white/80 hover:text-white" : isTransparentHeader ? "text-brand-bg/80 hover:text-brand-bg" : "text-brand-muted hover:bg-brand-bg-alt hover:text-brand-text"
            )}
            onFocus={() => setActiveMenu(null)}
          >
            <Layers className="h-4 w-4" />
            Estimate scope
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center bg-brand-text px-6 rounded-full text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
            onFocus={() => setActiveMenu(null)}
          >
            Start project
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
            isTransparentHeader && pathname === "/" ? "border-white/20 text-white" : isTransparentHeader ? "border-brand-bg/20 text-brand-bg" : "border-brand-accent text-brand-text"
          )}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Services Mega Menu */}
      <AnimatePresence>
        {activeMenu === "services" && (
          <motion.div
            id="services-mega-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-0 top-full hidden w-full border-b border-brand-accent/70 bg-brand-bg/96 shadow-[0_28px_70px_rgba(28,28,28,0.12)] backdrop-blur-xl lg:block"
            onMouseEnter={() => setActiveMenu("services")}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_0.34fr] gap-8 px-6 py-8">
              <div className="grid grid-cols-4 items-stretch gap-6">
                {serviceFamilies.map((service) => (
                  <Link
                    key={service.title}
                    href="/services"
                    onClick={() => setActiveMenu(null)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-accent/30 bg-brand-bg transition-colors hover:border-brand-accent"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-brand-bg-alt">
                      <Image
                        src={service.imageUrl}
                        alt={service.imageAlt}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.04]"
                        style={{ objectPosition: service.imagePosition ?? "center" }}
                      />
                    </div>
                    <div className="flex min-h-[5.5rem] flex-1 flex-col justify-end border-t border-brand-accent/30 p-5">
                      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-brand-muted">{service.eyebrow}</p>
                      <h3 className="text-lg font-medium leading-snug tracking-tight text-brand-text">{service.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col justify-between border-l border-brand-accent/30 pl-8">
                <div>
                  <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-brand-muted">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Offer system
                  </div>
                  <h2 className="mb-6 text-2xl font-medium tracking-tight text-brand-text">
                    Pick by output, then shape the scope.
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {deliverables.slice(0, 5).map((item) => (
                      <Link
                        key={item.title}
                        href="/services"
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center justify-between border-t border-brand-accent/30 pt-3 text-sm font-medium"
                      >
                        <span className="text-brand-text group-hover:text-brand-muted transition-colors">{item.title}</span>
                        <ArrowRight className="h-4 w-4 text-brand-muted transition-all group-hover:translate-x-1 group-hover:text-brand-text" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-brand-accent/30 pt-6">
                  <Link
                    href="/services#brief-builder"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-2 bg-brand-text px-6 py-3 rounded-full text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Build a scope <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work Mega Menu */}
      <AnimatePresence>
        {activeMenu === "work" && (
          <motion.div
            id="work-mega-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-0 top-full hidden w-full border-b border-brand-accent/70 bg-brand-bg/96 shadow-[0_28px_70px_rgba(28,28,28,0.12)] backdrop-blur-xl lg:block"
            onMouseEnter={() => setActiveMenu("work")}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_0.34fr] gap-8 px-6 py-8">
              <div className="grid grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    onClick={() => setActiveMenu(null)}
                    className="group block relative rounded-2xl overflow-hidden aspect-[4/3]"
                  >
                    {project.thumbnailUrl ? (
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-accent/20 flex items-center justify-center text-brand-muted">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="mb-2 text-xs text-brand-bg/80 uppercase tracking-widest font-medium">{project.meta.category}</p>
                      <h3 className="text-2xl font-medium tracking-tight text-brand-bg">{project.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col justify-between border-l border-brand-accent/30 pl-8">
                <div>
                  <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-brand-muted">
                    <Sparkles className="h-4 w-4" />
                    Featured Work
                  </div>
                  <h2 className="mb-6 text-2xl font-medium tracking-tight text-brand-text">
                    Explore our latest 3D visual experiences.
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {["All Projects", "Product Rendering", "Lifestyle Images", "Animations"].map((cat) => (
                      <Link
                        key={cat}
                        href="/work"
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center justify-between border-t border-brand-accent/30 pt-3 text-sm font-medium"
                      >
                        <span className="text-brand-text group-hover:text-brand-muted transition-colors">{cat}</span>
                        <ArrowRight className="h-4 w-4 text-brand-muted transition-all group-hover:translate-x-1 group-hover:text-brand-text" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-brand-accent/30 pt-6">
                  <Link
                    href="/work"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-2 bg-brand-text px-6 py-3 rounded-full text-sm font-medium text-brand-bg transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    View all case studies <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="border-t border-brand-accent/30 bg-brand-bg px-6 py-6 lg:hidden h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.path} className="border-b border-brand-accent/30">
                  {item.hasMenu ? (
                    <div className="flex flex-col">
                      <button 
                        onClick={() => setMobileExpandedSection(mobileExpandedSection === item.menuType ? null : (item.menuType || null))}
                        className="flex items-center justify-between py-5 text-2xl font-medium tracking-tight w-full text-left"
                      >
                        {item.name}
                        <ChevronDown className={cn("h-6 w-6 text-brand-muted transition-transform duration-300", mobileExpandedSection === item.menuType && "rotate-180")} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileExpandedSection === item.menuType && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 pt-2 grid grid-cols-1 gap-4">
                              {item.menuType === "services" ? (
                                serviceFamilies.slice(0, 3).map((service) => (
                                  <Link key={service.title} href="/services" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 bg-brand-bg-alt p-3 rounded-xl border border-brand-accent/30">
                                    <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                                      <Image src={service.imageUrl} alt={service.imageAlt} fill className="object-cover" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-brand-muted uppercase tracking-widest">{service.eyebrow}</p>
                                      <p className="text-sm font-medium">{service.title}</p>
                                    </div>
                                  </Link>
                                ))
                              ) : (
                                projects.slice(0, 3).map((project) => (
                                  <Link key={project.slug} href={`/work/${project.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-4 bg-brand-bg-alt p-3 rounded-xl border border-brand-accent/30">
                                    <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                                      {project.thumbnailUrl && <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover" />}
                                    </div>
                                    <div>
                                      <p className="text-xs text-brand-muted uppercase tracking-widest">{project.meta.category}</p>
                                      <p className="text-sm font-medium">{project.title}</p>
                                    </div>
                                  </Link>
                                ))
                              )}
                              <Link href={item.path} onClick={() => setMobileOpen(false)} className="mt-2 text-sm font-medium text-brand-muted flex items-center gap-2 py-2">
                                View all {item.name.toLowerCase()} <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-5 text-2xl font-medium tracking-tight"
                    >
                      {item.name}
                      <ArrowRight className="h-6 w-6 text-brand-muted" />
                    </Link>
                  )}
                </div>
              ))}
              <div className="border-b border-brand-accent/30">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-5 text-2xl font-medium tracking-tight"
                >
                  Contact
                  <ArrowRight className="h-6 w-6 text-brand-muted" />
                </Link>
              </div>
            </div>

            <div className="mt-12 mb-8">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-brand-text px-6 py-4 rounded-full text-lg font-medium text-brand-bg"
              >
                Start your project <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
