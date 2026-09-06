import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us — ReviewQR Support & Inquiry",
  description: "Get in touch with the ReviewQR team. Direct email, phone, and WhatsApp support for Google Review QR card generation.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/60 px-3.5 py-1.5 text-xs font-semibold text-accent shadow-xs backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          Direct Support & Business Inquiries
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl tracking-tight text-ink sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Have questions about your Google Review QR cards, custom bulk templates, or technical assistance? Reach out to us directly — we respond promptly.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Phone Support */}
        <div className="group rounded-3xl border border-border/80 bg-white p-7 shadow-xs transition-all hover:border-accent/40 hover:shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-accent transition-transform group-hover:scale-110">
            <Phone className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-ink">Call or Text</h2>
          <p className="mt-1 text-xs text-muted">Available Mon–Sat for direct phone inquiries.</p>
          <a href="tel:+923279709707" className="mt-4 block font-mono text-base font-bold text-ink hover:text-accent">
            +92 3279709707
          </a>
          <Button asChild className="mt-6 w-full rounded-2xl font-bold shadow-xs">
            <a href="tel:+923279709707">Call Support Now</a>
          </Button>
        </div>

        {/* Card 2: WhatsApp Chat */}
        <div className="group rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-7 shadow-xs transition-all hover:border-emerald-500/60 hover:shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 transition-transform group-hover:scale-110">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-ink">WhatsApp Chat</h2>
          <p className="mt-1 text-xs text-muted">Instant messaging & fast photo/logo review support.</p>
          <a href="https://wa.me/923279709707" target="_blank" rel="noopener noreferrer" className="mt-4 block font-mono text-base font-bold text-emerald-900 hover:text-emerald-700">
            +92 3279709707
          </a>
          <Button asChild className="mt-6 w-full rounded-2xl bg-emerald-600 font-bold hover:bg-emerald-700 shadow-xs">
            <a href="https://wa.me/923279709707" target="_blank" rel="noopener noreferrer">
              Open WhatsApp Chat →
            </a>
          </Button>
        </div>

        {/* Card 3: Email Inquiries */}
        <div className="group rounded-3xl border border-border/80 bg-white p-7 shadow-xs transition-all hover:border-accent/40 hover:shadow-lg md:col-span-2 lg:col-span-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-accent transition-transform group-hover:scale-110">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-ink">Email Us</h2>
          <p className="mt-1 text-xs text-muted">Send design requests or feedback via email.</p>
          <a href="mailto:talhamunawar616@gmail.com" className="mt-4 block truncate font-mono text-sm font-bold text-ink hover:text-accent">
            talhamunawar616@gmail.com
          </a>
          <Button asChild variant="outline" className="mt-6 w-full rounded-2xl border-border/80 font-bold hover:bg-paper-2">
            <a href="mailto:talhamunawar616@gmail.com">Send Email Message</a>
          </Button>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-border/80 bg-paper-2/40 p-6 sm:flex-row sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-bold text-ink">Fast Response Guarantee</p>
            <p className="text-xs text-muted">We reply to all inquiries within 2–4 business hours.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-900">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>100% Free & Private Support</span>
        </div>
      </div>
    </article>
  );
}
