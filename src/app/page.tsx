import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { CtaBand } from "@/components/landing/CtaBand";
import { FaqPreview } from "@/components/landing/FaqPreview";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PreviewGallery } from "@/components/landing/PreviewGallery";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Google Review QR Code Generator — ReviewQR",
  description:
    "Create high-converting 5-star Google Review QR cards for your business in 60 seconds. Free, 100% private, no sign-up required. Download 300 DPI vector SVG, PNG & JPG ready for print.",
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Google Review QR Code Generator — ReviewQR",
    description:
      "Create high-converting 5-star Google Review QR cards for your business in 60 seconds. Free, 100% private, no sign-up required.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Google Review QR Code Generator — ReviewQR",
    description: "Create custom 5-star Google Review QR cards for your business in 60 seconds. Free & instant.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#software`,
      name: "ReviewQR - Google Review QR Code Generator",
      operatingSystem: "All",
      applicationCategory: "BusinessApplication",
      softwareVersion: "2.0.0",
      description: siteConfig.description,
      url: siteConfig.url,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "380",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Does the Google review QR code expire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The QR code links directly to your Google Maps business review destination. It never expires.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need an account to create a Google review QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No account or sign-up is required. Everything runs 100% privately in your web browser.",
          },
        },
        {
          "@type": "Question",
          name: "Are my uploaded business images or logos stored on a server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All image processing and QR rendering is performed client-side in your browser.",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <HowItWorks />
      <AdSlot slot="homepage-mid" className="py-4" />
      <PreviewGallery />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
