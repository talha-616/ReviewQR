export type AdSlotId = "homepage-mid" | "editor-banner" | "download" | "templates";

interface AdSlotProps {
  slot: AdSlotId;
  className?: string;
}

export function AdSlot({ slot, className }: AdSlotProps) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") {
    return null;
  }

  return (
    <aside
      data-ad-slot={slot}
      className={`ad-region mx-auto w-full max-w-5xl px-4 ${className ?? ""}`}
      aria-label="Advertisement"
    />
  );
}
