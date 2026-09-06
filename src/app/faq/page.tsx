import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Review QR Code FAQ — How it Works, Printing & Scanning",
  description: "Learn how to generate, customize, print, and display Google Review QR codes for your business with zero fees or account registration.",
};

const faqs = [
  {
    q: "Does the QR code expire?",
    a: "No. The QR code points to the Google Maps review destination for the place you selected. ReviewQR does not insert an expiry, redirect, or tracking layer. If Google changes how review links work, you can generate a new card.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can create and download your design without signing up.",
  },
  {
    q: "Are my images uploaded?",
    a: "No. Image processing is performed locally in your browser. ReviewQR does not store your files on a server.",
  },
  {
    q: "Can I use my own background?",
    a: "Yes. Upload a JPG, PNG, or WebP and adjust crop, zoom, overlay, blur, and brightness — all on your device.",
  },
  {
    q: "Can I print the design?",
    a: "Yes. Download a high-resolution PNG or JPG suitable for printing. Choose Square, A5, or A4 before you export.",
  },
  {
    q: "Can I customize the QR code?",
    a: "Yes. You can change module style and colors while we keep a quiet zone, high error correction, and strong contrast so the code stays reliable to scan.",
  },
  {
    q: "What if location search does not work?",
    a: "Paste your Google review link instead. You can still design and download the card.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl tracking-tight">FAQ</h1>
      <dl className="mt-10 space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="text-lg font-semibold">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
