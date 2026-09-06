import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the ReviewQR Google review card generator.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl tracking-tight">Terms</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <p>
          ReviewQR is a free, client-side tool for creating Google review QR cards. You are
          responsible for having the right to use any business name, logo, or image you add, and for
          complying with Google Maps Platform terms when you use location search.
        </p>
        <p>
          The QR code encodes the review destination you selected or pasted. We do not operate the
          Google review page and cannot guarantee third-party availability.
        </p>
        <p>
          The generator is provided as-is, without warranties. Always test-scan a card before you
          print it at scale.
        </p>
      </div>
    </article>
  );
}
