import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How ReviewQR processes designs locally in your browser without storing your files.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl tracking-tight">Privacy</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">Last updated: 6 September 2026</p>
      <div className="prose-review mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <p>
          Your uploaded images and designs are processed locally in your browser. ReviewQR does not
          create accounts, does not store your files on a server, and does not collect unnecessary
          personal information to use the generator.
        </p>
        <h2 className="text-xl font-semibold text-ink">What stays on your device</h2>
        <p>
          Business names, logos, backgrounds, and the finished card are generated with client-side
          code. A short-lived draft may be kept in your browser’s session storage so you do not lose
          work if you refresh the page. Closing the tab clears it.
        </p>
        <h2 className="text-xl font-semibold text-ink">Google Maps</h2>
        <p>
          If you use location search, your query is sent to Google Maps Platform according to Google’s
          terms and privacy policy. We do not receive a copy of that search on our servers because
          this product has no backend.
        </p>
        <h2 className="text-xl font-semibold text-ink">Hosting analytics</h2>
        <p>
          The host that serves this static website may log standard request data such as IP address
          and browser type. We do not use that to identify you or attach it to a design.
        </p>
      </div>
    </article>
  );
}
