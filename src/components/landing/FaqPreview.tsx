import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "Does the QR code expire?",
    a: "No. The QR code points to the Google Maps review destination for the place you selected. It does not expire on its own.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can create and download your design without signing up.",
  },
  {
    q: "Are my images uploaded?",
    a: "No. Image processing is performed locally in your browser.",
  },
];

export function FaqPreview() {
  return (
    <section className="relative z-10 border-t border-border bg-white/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl tracking-tight">
            Straight answers
          </h2>
          <p className="mt-3 text-muted">
            Built like a utility: open it, make the card, download it.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/faq">Read the FAQ</Link>
          </Button>
        </div>
        <dl className="space-y-6">
          {faqs.map((item) => (
            <div key={item.q} className="border-b border-border pb-6">
              <dt className="font-semibold">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
