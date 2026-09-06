"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star } from "lucide-react";
import { GoogleGIcon, ReviewCard } from "@/components/editor/ReviewCard";
import { createDesignFromTemplate, getTemplate } from "@/templates";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

const PREVIEW_IDS = ["blanc", "noir", "hearth", "suite"] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-radial from-accent/15 via-accent/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-80 w-80 rounded-full bg-radial from-amber-500/10 to-transparent blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="animate-fade-up max-w-2xl">
          <div className="inline-flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-xs backdrop-blur-md">
              <GoogleGIcon className="h-4 w-4" />
              <span>Google Review Ready</span>
              <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-600">
                ★★★★★ 4.9
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/60 px-3.5 py-1.5 text-xs font-semibold text-accent shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Browser-Based QR Card Studio
            </div>
          </div>

          <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
            Turn Every Customer Into a <span className="text-accent font-semibold">5-Star Google Review</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted">
            Create elegant, print-ready Google Review QR cards for your venue, shop, or clinic. No account needed, 100% private in your browser.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="gap-2.5 rounded-2xl px-7 py-6 text-base font-semibold shadow-md shadow-ink/10 transition-all hover:scale-[1.02] hover:shadow-lg">
              <Link href="/create">
                Create Google Review QR
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl border-border/80 px-6 py-6 text-base font-semibold hover:bg-white">
              <Link href="/templates">Explore 12+ Templates</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Free PNG, JPG & SVG
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> No Sign-Up Required
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" /> Direct Google Maps Link
            </span>
          </div>
        </div>

        {/* Stacked Preview Cards */}
        <div className="relative mx-auto h-[360px] sm:h-[440px] w-full max-w-[420px] lg:h-[520px] lg:max-w-none">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/10 via-transparent to-amber-500/10 blur-2xl" />
          
          {/* Floating Google Review Badge */}
          <div className="absolute -bottom-4 -left-4 z-30 hidden rounded-2xl border border-border/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md sm:flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
              <GoogleGIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-ink">
                <span>Google Review Card</span>
                <span className="flex text-amber-500">★★★★★</span>
              </div>
              <p className="text-[11px] text-muted">Direct Place ID Scan Destination</p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/10 via-transparent to-amber-500/10 blur-2xl" />
          
          {PREVIEW_IDS.map((id, index) => {
            const design = createDesignFromTemplate(getTemplate(id), {
              businessName: ["Harbor & Rye", "Maison Noir", "Hearth Coffee", "Lumen Spa"][index],
              reviewUrl: `${siteConfig.url}/create`,
              message: [
                "Your feedback means a lot to us.",
                "We would be honoured to hear from you.",
                "How was your coffee today?",
                "We hope your stay was exceptional.",
              ][index],
            });
            const positions = [
              "left-[6%] top-[8%] z-20 w-[58%] rotate-[-5deg] hover:rotate-0 transition-transform duration-300",
              "right-[2%] top-[3%] z-10 w-[54%] rotate-[7deg] hover:rotate-0 transition-transform duration-300",
              "left-[2%] bottom-[4%] z-[12] w-[52%] rotate-[3deg] hover:rotate-0 transition-transform duration-300",
              "right-[5%] bottom-[6%] z-[11] w-[50%] rotate-[-4deg] hover:rotate-0 transition-transform duration-300",
            ];
            return (
              <div
                key={id}
                className={`absolute aspect-square overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(18,16,14,0.18)] ring-1 ring-black/5 ${positions[index]}`}
              >
                <ReviewCard design={design} className="h-full w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

