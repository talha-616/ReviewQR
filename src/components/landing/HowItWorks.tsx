import { Download, MapPin, Palette, Sparkles } from "lucide-react";
import { GoogleGIcon } from "@/components/editor/ReviewCard";

const steps = [
  {
    n: "Step 01",
    title: "Find Your Google Business",
    body: "Type your business name or address to automatically fetch your direct 5-star Google Maps review link.",
    icon: MapPin,
    hasGoogle: true,
  },
  {
    n: "Step 02",
    title: "Customize Card & QR Code",
    body: "Pick a luxury template, toggle Google logo badges, tweak colors, typography, textures, and print sizes.",
    icon: Palette,
    hasGoogle: false,
  },
  {
    n: "Step 03",
    title: "Download High-Res Print File",
    body: "Export 300 DPI vector SVG, PNG, or JPG ready for table cards, acrylic stands, or window stickers.",
    icon: Download,
    hasGoogle: false,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 border-t border-border/70 bg-paper-2/30 py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light/50 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Simple 3-Step Process
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl tracking-tight sm:text-4xl text-ink">
            From Location Search to Print Card in 60 Seconds
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base text-muted">
            No design skills needed. Everything renders dynamically inside your browser with zero latency.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group relative rounded-3xl border border-border/80 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white shadow-md shadow-ink/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2">
                  {step.hasGoogle && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-paper-2/60 px-2.5 py-1 text-[11px] font-bold text-ink">
                      <GoogleGIcon className="h-3.5 w-3.5" /> Google
                    </span>
                  )}
                  <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-bold tracking-wider text-muted group-hover:bg-accent-light group-hover:text-accent transition-colors">
                    {step.n}
                  </span>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

