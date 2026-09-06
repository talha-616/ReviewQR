export const siteConfig = {
  name: "ReviewQR",
  shortName: "ReviewQR",
  tagline: "Free Google Review QR Code Generator",
  description:
    "Create custom, high-converting 5-star Google Review QR cards for your business in 60 seconds. Free, 100% private, no sign-up required. Download 300 DPI vector SVG, PNG & JPG ready for print.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reviewqr.app",
  keywords: [
    "Google review QR code generator",
    "Free Google review QR generator",
    "QR code reviews generator",
    "Review generator",
    "Google review card maker",
    "Google Business review QR code",
    "QR code for Google reviews free",
    "Google Maps review QR code",
    "Google Maps review link generator",
    "Printable Google review QR card",
    "5-star Google review QR code",
    "How to create QR code for Google reviews",
    "Google review standing card",
    "Table top Google review QR code",
    "Restaurant review QR code maker",
    "Google review card maker online",
    "Google review QR generator free no sign up",
  ],
} as const;

export function getGoogleMapsApiKey() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
}

export function getGoogleMapsMapId() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() || "DEMO_MAP_ID";
}

export function isMapsConfigured() {
  return getGoogleMapsApiKey().length > 0;
}
