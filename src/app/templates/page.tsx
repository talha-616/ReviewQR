import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { TemplateGrid } from "@/components/templates/TemplateGrid";

export const metadata: Metadata = {
  title: "Google Review QR Card Templates — Restaurant, Retail & Hotel Designs",
  description:
    "Browse luxury Google review QR code templates for restaurants, cafés, hotels, clinics, and local venues. 100% customizable, high-contrast & print-ready.",
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">Templates</p>
      <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl tracking-tight">
        Designs that look like print, not clip art
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Pick a starting point, then customize colors, type, and layout. Every template keeps the QR on a high-contrast plate so it stays scannable.
      </p>
      <AdSlot slot="templates" className="py-6" />
      <TemplateGrid />
      <p className="mt-10 text-sm text-muted">
        Ready? <Link href="/create" className="font-medium text-ink underline">Create your review QR</Link>
      </p>
    </div>
  );
}
