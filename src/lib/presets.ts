import type { CardFontId, QrStyleId } from "@/types";

export const CTA_PRESETS = [
  "Scan to Leave a Review",
  "Share Your Experience",
  "Tell Us What You Think",
  "Love Our Service?",
  "Your Feedback Matters",
  "Scan & Review Us",
] as const;

export const COLOR_PRESETS = [
  {
    id: "bw",
    name: "Black & White",
    primary: "#14110f",
    text: "#14110f",
    background: "#ffffff",
    qr: "#14110f",
    qrBackground: "#ffffff",
    accent: "#14110f",
  },
  {
    id: "navy",
    name: "Navy & White",
    primary: "#0b1f3a",
    text: "#0b1f3a",
    background: "#ffffff",
    qr: "#0b1f3a",
    qrBackground: "#ffffff",
    accent: "#1f4e79",
  },
  {
    id: "gold",
    name: "Dark & Gold",
    primary: "#d4b07a",
    text: "#f3ead8",
    background: "#12100e",
    qr: "#12100e",
    qrBackground: "#f3ead8",
    accent: "#d4b07a",
  },
  {
    id: "green",
    name: "Green & White",
    primary: "#1f6b3a",
    text: "#14301d",
    background: "#ffffff",
    qr: "#14301d",
    qrBackground: "#ffffff",
    accent: "#2f8a4e",
  },
  {
    id: "blue",
    name: "Blue & White",
    primary: "#1d4f91",
    text: "#13243d",
    background: "#ffffff",
    qr: "#13243d",
    qrBackground: "#ffffff",
    accent: "#2b6cb0",
  },
  {
    id: "brown",
    name: "Brown & Cream",
    primary: "#6b3f2a",
    text: "#3a271c",
    background: "#f1e3d0",
    qr: "#3a271c",
    qrBackground: "#fffaf3",
    accent: "#a05c38",
  },
  {
    id: "purple",
    name: "Purple & White",
    primary: "#5b3a86",
    text: "#2d2140",
    background: "#ffffff",
    qr: "#2d2140",
    qrBackground: "#ffffff",
    accent: "#7c5cbf",
  },
] as const;

export const SOLID_SWATCHES = [
  { name: "White", color: "#ffffff" },
  { name: "Black", color: "#14110f" },
  { name: "Cream", color: "#f4efe6" },
  { name: "Gray", color: "#e7e5e4" },
] as const;

export const GRADIENT_PRESETS = [
  { name: "Mist", color: "#e4ecf8", secondaryColor: "#f6f1ea", angle: 135 },
  { name: "Dusk", color: "#12182a", secondaryColor: "#1d2740", angle: 180 },
  { name: "Warm", color: "#f3e4cf", secondaryColor: "#e7d1b5", angle: 170 },
  { name: "Sage", color: "#eaf3e3", secondaryColor: "#f6f1e4", angle: 140 },
  { name: "Blush", color: "#f8ecee", secondaryColor: "#f1ddd6", angle: 150 },
  { name: "Ink", color: "#1b1814", secondaryColor: "#2a241c", angle: 180 },
] as const;

export const FONT_OPTIONS: { id: CardFontId; label: string }[] = [
  { id: "outfit", label: "Outfit" },
  { id: "fraunces", label: "Fraunces" },
  { id: "baskerville", label: "Libre Baskerville" },
  { id: "dm-sans", label: "DM Sans" },
  { id: "geist", label: "Geist" },
];

export const QR_STYLES: { id: QrStyleId; name: string; description: string }[] = [
  { id: "classic", name: "Classic Square", description: "Maximum scan reliability" },
  { id: "rounded", name: "Rounded", description: "Soft corners, still precise" },
  { id: "soft-rounded", name: "Soft Rounded", description: "Gentle modules" },
  { id: "dots", name: "Modern Dots", description: "Circular data modules" },
  { id: "minimal", name: "Minimal", description: "Extra quiet zone" },
  { id: "framed", name: "Framed", description: "Decorative outer frame" },
  { id: "elegant", name: "Elegant", description: "Refined rounded modules" },
  { id: "bold", name: "Bold", description: "Heavier, high-contrast modules" },
];
