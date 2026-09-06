import Link from "next/link";
import { Mail, Phone, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/80 bg-paper-2/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div className="max-w-sm space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted">
            Design high-converting Google Review QR cards for your business — customizable, browser-based, and ready for instant print.
          </p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            100% Client-Side Privacy — Zero Data Uploaded
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Generator</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/create" className="transition-colors hover:text-ink">Create QR Card</Link>
            </li>
            <li>
              <Link href="/templates" className="transition-colors hover:text-ink">Browse Templates</Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="transition-colors hover:text-ink">How It Works</Link>
            </li>
            <li>
              <Link href="/faq" className="transition-colors hover:text-ink">Frequently Asked Questions</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Direct Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href="tel:+923279709707" className="flex items-center gap-2 transition-colors hover:text-ink">
                <Phone className="h-4 w-4 text-accent" />
                <span>+92 3279709707</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/923279709707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-emerald-700 font-medium text-emerald-800">
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp Chat</span>
              </a>
            </li>
            <li>
              <a href="mailto:talhamunawar616@gmail.com" className="flex items-center gap-2 transition-colors hover:text-ink truncate">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span className="truncate">talhamunawar616@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Legal & Info</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/contact" className="transition-colors hover:text-ink">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy" className="transition-colors hover:text-ink">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-ink">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 bg-paper-2/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 ReviewQR. Designed for business growth.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-ink/70">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> High-Resolution Vector & Raster Exports
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

