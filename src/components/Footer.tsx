import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 mt-24 border-t border-brand-accent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-brand-muted">
        <div>&copy; {new Date().getFullYear()} Max. All rights reserved.</div>
        <div className="flex gap-6">
          <Link href="/work" className="hover:text-brand-text transition-colors">Work</Link>
          <Link href="/services" className="hover:text-brand-text transition-colors">Services</Link>
          <Link href="/about" className="hover:text-brand-text transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-text transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
