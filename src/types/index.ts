export type TemplateCategory =
  | "Minimal"
  | "Luxury"
  | "Modern"
  | "Restaurant"
  | "Café"
  | "Retail"
  | "Corporate"
  | "Hotel"
  | "Salon"
  | "Healthcare"
  | "Local Business";

export type QrStyleId =
  | "classic"
  | "rounded"
  | "soft-rounded"
  | "dots"
  | "minimal"
  | "framed"
  | "elegant"
  | "bold";

export type PrintSizeId = "square" | "a5" | "a4" | "5x7" | "table";

export type CardFontId = "outfit" | "fraunces" | "baskerville" | "dm-sans" | "geist";

export type TextAlign = "left" | "center" | "right";

export type LayoutVariant =
  | "classic"
  | "qr-hero"
  | "editorial"
  | "footer-qr"
  | "framed-center";

export type BackgroundKind = "solid" | "gradient" | "abstract" | "business" | "custom";

export type AbstractPattern =
  | "none"
  | "orbs"
  | "waves"
  | "geometric"
  | "dots"
  | "grain"
  | "glass";

export type BusinessTexture =
  | "none"
  | "restaurant"
  | "cafe"
  | "hotel"
  | "office"
  | "retail"
  | "salon"
  | "healthcare";

export interface TextStyle {
  font: CardFontId;
  size: number;
  weight: number;
  letterSpacing: number;
  color: string;
  align: TextAlign;
  transform?: "none" | "uppercase";
}

export interface BackgroundConfig {
  kind: BackgroundKind;
  color: string;
  secondaryColor?: string;
  gradientAngle?: number;
  pattern: AbstractPattern;
  texture: BusinessTexture;
  customImage?: string | null;
  imageZoom: number;
  imageX: number;
  imageY: number;
  overlay: string;
  overlayOpacity: number;
  blur: number;
  brightness: number;
}

export interface LogoConfig {
  src: string | null;
  size: number;
  position: "top" | "above-qr";
}

export interface SelectedPlace {
  placeId: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  rating?: number | null;
  ratingCount?: number | null;
  mapsUri?: string | null;
}

export interface DesignColors {
  primary: string;
  text: string;
  background: string;
  qr: string;
  qrBackground: string;
  accent: string;
}

export interface LayoutConfig {
  variant: LayoutVariant;
  padding: number;
  qrScale: number;
  gap: number;
  contentAlign: TextAlign;
  showStars: boolean;
  showFrame: boolean;
  frameColor: string;
  radius: number;
  showGoogleBadge?: boolean;
  googleBadgePosition?: "above-qr" | "top" | "below-qr" | "qr-center";
  googleBadgeStyle?: "multicolor" | "monochrome" | "pill";
}

export interface DesignTemplateConfig {
  colors: DesignColors;
  background: BackgroundConfig;
  layout: LayoutConfig;
  qrStyle: QrStyleId;
  businessName: TextStyle;
  message: TextStyle;
  cta: TextStyle;
  defaultCta: string;
  defaultMessage: string;
}

export interface DesignTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  config: DesignTemplateConfig;
}

export interface DesignState {
  templateId: string;
  printSize: PrintSizeId;
  businessName: string;
  message: string;
  cta: string;
  reviewUrl: string;
  colors: DesignColors;
  background: BackgroundConfig;
  layout: LayoutConfig;
  qrStyle: QrStyleId;
  businessNameStyle: TextStyle;
  messageStyle: TextStyle;
  ctaStyle: TextStyle;
  logo: LogoConfig;
}

export interface EditorSnapshot {
  place: SelectedPlace | null;
  design: DesignState;
}
