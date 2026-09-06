"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ReviewCard } from "@/components/editor/ReviewCard";
import { Button } from "@/components/ui/button";
import { createDesignFromTemplate, templates } from "@/templates";
import { siteConfig } from "@/lib/site";

export function PreviewGallery() {
  const featured = templates.slice(0, 6);
  return (
    <section className="relative z-10 border-t border-border/80 bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/50 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Curated Design Suite
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl tracking-tight sm:text-4xl text-ink">
              Crafted for Restaurants, Boutiques, Hotels & Offices
            </h2>
            <p className="mt-2 text-sm text-muted">
              Choose a starter design — fully customizable with custom colors, logos, and fonts.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl border-border/80 hover:bg-paper-2">
            <Link href="/templates" className="gap-2">
              View All Templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {featured.map((template, index) => {
            const design = createDesignFromTemplate(template, {
              businessName: template.name,
              reviewUrl: `${siteConfig.url}/create`,
            });
            return (
              <Link
                key={template.id}
                href={`/create?template=${template.id}`}
                className="group relative rounded-2xl border border-border/80 bg-paper p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/40 hover:bg-white"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-paper-2 ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02]">
                  <ReviewCard design={design} className="h-full w-full" />
                </div>
                <div className="flex items-center justify-between px-1 pb-1 pt-3.5">
                  <div>
                    <p className="text-sm font-bold text-ink">{template.name}</p>
                    <p className="text-xs font-medium text-muted">{template.category}</p>
                  </div>
                  <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink group-hover:bg-accent group-hover:text-white transition-colors">
                    Customize
                  </span>
                </div>
                <span className="sr-only">Use {template.name} template {index + 1}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

