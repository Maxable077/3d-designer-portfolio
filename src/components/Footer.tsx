"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  INSTAGRAM_URL,
  LINKEDIN_COMPANY_URL,
  LINKEDIN_PERSONAL_URL,
} from "@/lib/site";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer className="w-full bg-brand-bg relative z-30 rounded-t-[3rem] md:rounded-t-[5vw] pt-24 md:pt-32 pb-12 -mt-10 md:-mt-16 border-t border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24 border-b border-brand-accent/20 pb-20">
          
          <div className="lg:col-span-2 flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              Let's shape your <br />next big idea.
            </h2>
            <div className="flex gap-4">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 justify-center rounded-full bg-brand-text text-brand-bg px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Get in touch
                </Link>
              </MagneticButton>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-brand-muted mb-4 uppercase tracking-widest font-medium">Stay updated</p>
              <div className="flex max-w-sm">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-brand-bg-alt border border-brand-accent/50 rounded-l-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-text text-brand-text placeholder:text-brand-muted"
                />
                <button className="bg-brand-text text-brand-bg px-6 rounded-r-sm hover:bg-brand-text/90 transition-colors flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm text-brand-muted uppercase tracking-widest font-medium">Navigation</h3>
            <div className="flex flex-col gap-4">
              <Link href="/work" className="text-lg hover:text-brand-accent transition-colors w-fit">Work</Link>
              <Link href="/services" className="text-lg hover:text-brand-accent transition-colors w-fit">Services</Link>
              <Link href="/about" className="text-lg hover:text-brand-accent transition-colors w-fit">About</Link>
              <Link href="/playground" className="text-lg hover:text-brand-accent transition-colors w-fit">Playground</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm text-brand-muted uppercase tracking-widest font-medium">Socials</h3>
            <div className="flex flex-col gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-brand-accent transition-colors w-fit">
                Instagram
              </a>
              <a
                href={LINKEDIN_COMPANY_URL ?? LINKEDIN_PERSONAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-brand-accent transition-colors w-fit"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-brand-muted">
          <div>&copy; {new Date().getFullYear()} Populique. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-text transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-text transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
