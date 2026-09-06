import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleGIcon } from "@/components/editor/ReviewCard";

export function CtaBand() {
  return (
    <section className="relative z-10 border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-paper sm:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-paper backdrop-blur-md">
            <GoogleGIcon className="h-4 w-4" />
            <span>Google Maps Review Integration</span>
          </div>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-fraunces)] text-3xl tracking-tight sm:text-4xl">
            Select your business. Make it beautiful. Download.
          </h2>
          <p className="mt-4 max-w-lg text-paper/70">
            A Google review QR card your customers will actually want to scan.
          </p>
          <Button asChild size="lg" className="mt-8 bg-paper text-ink hover:bg-paper-2 font-bold rounded-2xl">
            <Link href="/create">Create Your Google Review QR</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
