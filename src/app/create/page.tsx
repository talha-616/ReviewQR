import type { Metadata } from "next";
import { Suspense } from "react";
import { LocationWorkspace } from "@/components/location/LocationWorkspace";

export const metadata: Metadata = {
  title: "Search Business & Create Google Review QR Code",
  description: "Search Google Maps for your business or paste your review link to generate a custom 5-star Google Review QR card.",
};

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted">Loading location search…</div>}>
      <LocationWorkspace />
    </Suspense>
  );
}
