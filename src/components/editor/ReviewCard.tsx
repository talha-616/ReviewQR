import type { CSSProperties } from "react";
import type { DesignState } from "@/types";
import { QRCodeView } from "@/components/qr/QRCodeView";
import { cn } from "@/lib/utils";

const FONT_FAMILY: Record<string, string> = {
  outfit: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
  fraunces: "var(--font-fraunces), ui-serif, Georgia, serif",
  baskerville: "var(--font-baskerville), ui-serif, Georgia, serif",
  "dm-sans": "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
  geist: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
};

export function GoogleGIcon({ className = "h-5 w-5", color }: { className?: string; color?: string }) {
  if (color) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color} aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function GoogleCardBadge({
  style = "multicolor",
  color,
  size = "md",
}: {
  style?: "multicolor" | "monochrome" | "pill";
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (style === "pill") {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1 shadow-2xs backdrop-blur-xs">
        <GoogleGIcon className="h-3.5 w-3.5" />
        <span className="text-[11px] font-bold tracking-tight text-slate-800">Google Reviews</span>
      </div>
    );
  }

  const iconClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="inline-flex items-center gap-1.5">
      <GoogleGIcon className={iconClass} color={style === "monochrome" ? color : undefined} />
      <span className="text-xs font-bold tracking-tight" style={{ color: color || "currentColor" }}>
        Google Reviews
      </span>
    </div>
  );
}

function StarRow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 18" className="w-[38%] max-w-[220px]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <path
          key={index}
          fill={color}
          d="M10 1.2l2.2 6.6H19l-5.4 4 2.1 6.6L10 14.6 4.3 18.4l2.1-6.6L1 7.8h6.8z"
          transform={`translate(${index * 24} 0)`}
        />
      ))}
    </svg>
  );
}

function CornerMarks({ color }: { color: string }) {
  return (
    <svg className="pointer-events-none absolute inset-[3.2%] z-10" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M8 22 V8 H22" fill="none" stroke={color} strokeWidth="0.7" />
      <path d="M78 8 H92 V22" fill="none" stroke={color} strokeWidth="0.7" />
      <path d="M92 78 V92 H78" fill="none" stroke={color} strokeWidth="0.7" />
      <path d="M22 92 H8 V78" fill="none" stroke={color} strokeWidth="0.7" />
    </svg>
  );
}

function backgroundLayers(design: DesignState): CSSProperties {
  const { background } = design;
  const layers: string[] = [];

  if (background.kind === "custom" && background.customImage) {
    layers.push(
      `linear-gradient(${hexWithAlpha(background.overlay, background.overlayOpacity)}, ${hexWithAlpha(background.overlay, background.overlayOpacity)})`,
      `url("${background.customImage}")`,
    );
  } else if (background.kind === "gradient" || background.secondaryColor) {
    layers.push(
      `linear-gradient(${background.gradientAngle ?? 160}deg, ${background.color}, ${background.secondaryColor ?? background.color})`,
    );
  } else {
    layers.push(background.color);
  }

  return {
    backgroundImage: background.kind === "custom" && background.customImage ? layers.join(", ") : undefined,
    backgroundColor: background.color,
    backgroundSize:
      background.kind === "custom" ? `100% 100%, ${background.imageZoom * 100}%` : undefined,
    backgroundPosition:
      background.kind === "custom"
        ? `center, ${background.imageX}% ${background.imageY}%`
        : undefined,
    backgroundRepeat: "no-repeat",
    filter:
      background.blur || background.brightness !== 100
        ? undefined
        : undefined,
  };
}

function hexWithAlpha(hex: string, opacity: number) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((part) => part + part)
          .join("")
      : clean;
  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  if (full.length !== 6) return hex;
  return `#${full}${alpha}`;
}

function PatternOverlay({ design }: { design: DesignState }) {
  const { pattern, texture } = design.background;
  const accent = design.colors.accent;
  if (pattern === "none" && texture === "none") return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pattern === "orbs" && (
        <>
          <div
            className="absolute -left-[10%] -top-[8%] h-[46%] w-[46%] rounded-full opacity-40 blur-3xl"
            style={{ background: accent }}
          />
          <div
            className="absolute -bottom-[12%] -right-[8%] h-[42%] w-[42%] rounded-full opacity-25 blur-3xl"
            style={{ background: design.colors.primary }}
          />
        </>
      )}
      {pattern === "dots" && (
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(${accent} 1.1px, transparent 1.2px)`,
            backgroundSize: "18px 18px",
          }}
        />
      )}
      {pattern === "geometric" && (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: "42px 42px",
          }}
        />
      )}
      {pattern === "waves" && (
        <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none" viewBox="0 0 400 400">
          <path
            d="M0 280 C80 240 120 320 200 290 C280 260 320 330 400 300 L400 400 L0 400 Z"
            fill={accent}
          />
        </svg>
      )}
      {pattern === "grain" && (
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,.4)_2px)]" />
      )}
      {pattern === "glass" && (
        <div className="absolute inset-[7%] rounded-[28px] border border-white/50 bg-white/25 backdrop-blur-[2px]" />
      )}
      {texture === "cafe" && (
        <div className="absolute inset-x-[8%] top-[6%] h-px bg-current/20" style={{ color: accent }} />
      )}
      {texture === "hotel" && (
        <div className="absolute inset-x-[12%] top-[5.5%] flex justify-center">
          <div className="h-px w-24" style={{ background: accent }} />
        </div>
      )}
      {texture === "retail" && (
        <div className="absolute left-0 top-0 h-full w-[1.8%]" style={{ background: accent }} />
      )}
      {texture === "healthcare" && (
        <div className="absolute inset-x-0 top-0 h-[1.1%]" style={{ background: accent }} />
      )}
      {texture === "office" && (
        <div className="absolute inset-x-[8%] bottom-[6%] h-px" style={{ background: accent, opacity: 0.4 }} />
      )}
      {texture === "salon" && (
        <div className="absolute right-[8%] top-[7%] h-8 w-8 rounded-full opacity-30" style={{ background: accent }} />
      )}
      {texture === "restaurant" && (
        <div className="absolute inset-x-[18%] top-[5%] h-[2px]" style={{ background: accent, opacity: 0.55 }} />
      )}
    </div>
  );
}

interface ReviewCardProps {
  design: DesignState;
  className?: string;
  preview?: boolean;
}

export function ReviewCard({ design, className }: ReviewCardProps) {
  const align = design.layout.contentAlign;
  const padding = `${design.layout.padding}%`;
  const textAlign = align;
  const items =
    align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";
  const variant = design.layout.variant;
  const qrFirst = variant === "qr-hero";
  const ctaBeforeQr = variant === "footer-qr" || variant === "editorial";
  const customFilter =
    design.background.kind === "custom"
      ? `blur(${design.background.blur}px) brightness(${design.background.brightness}%)`
      : undefined;

  const nameStyle: CSSProperties = {
    fontFamily: FONT_FAMILY[design.businessNameStyle.font] || FONT_FAMILY.outfit,
    fontSize: `${design.businessNameStyle.size}px`,
    fontWeight: design.businessNameStyle.weight,
    letterSpacing: `${design.businessNameStyle.letterSpacing}px`,
    color: design.businessNameStyle.color || design.colors.text,
    textAlign: design.businessNameStyle.align || align,
    textTransform: design.businessNameStyle.transform === "uppercase" ? "uppercase" : undefined,
    lineHeight: 1.15,
  };

  const messageStyle: CSSProperties = {
    fontFamily: FONT_FAMILY[design.messageStyle.font] || FONT_FAMILY["dm-sans"],
    fontSize: `${design.messageStyle.size}px`,
    fontWeight: design.messageStyle.weight,
    letterSpacing: `${design.messageStyle.letterSpacing}px`,
    color: design.messageStyle.color || design.colors.text,
    textAlign: design.messageStyle.align || align,
    lineHeight: 1.4,
  };

  const ctaStyle: CSSProperties = {
    fontFamily: FONT_FAMILY[design.ctaStyle.font] || FONT_FAMILY.outfit,
    fontSize: `${design.ctaStyle.size}px`,
    fontWeight: design.ctaStyle.weight,
    letterSpacing: `${design.ctaStyle.letterSpacing}px`,
    color: design.ctaStyle.color || design.colors.primary,
    textAlign: design.ctaStyle.align || align,
    textTransform: design.ctaStyle.transform === "uppercase" ? "uppercase" : undefined,
    lineHeight: 1.3,
  };

  const logo = design.logo.src ? (
    <img
      src={design.logo.src}
      alt=""
      className="object-contain transition-all"
      style={{
        width: `${design.logo.size}%`,
        maxHeight: `${Math.max(140, design.logo.size * 6)}px`,
      }}
    />
  ) : null;

  const nameBlock = (
    <h2 className="max-w-[92%] text-balance" style={nameStyle}>
      {design.businessName || "Your Business"}
    </h2>
  );

  const messageBlock = design.message?.trim() ? (
    <p className="max-w-[86%]" style={messageStyle}>
      {design.message}
    </p>
  ) : null;

  const ctaBlock = design.cta?.trim() ? (
    <p className="max-w-[90%]" style={ctaStyle}>
      {design.cta}
    </p>
  ) : null;

  const showBadge = design.layout.showGoogleBadge !== false;
  const badgePosition = design.layout.googleBadgePosition || "above-qr";
  const badgeStyle = design.layout.googleBadgeStyle || "multicolor";

  const googleBadgeBlock = showBadge && badgePosition !== "qr-center" ? (
    <GoogleCardBadge style={badgeStyle} color={design.colors.text} />
  ) : null;

  const qrBlock = (
    <div
      className={cn(
        "relative shrink-0 flex flex-col items-center mx-auto",
        align === "left" ? "self-start" : align === "right" ? "self-end" : "self-center"
      )}
      style={{ width: `${design.layout.qrScale * 100}%` }}
    >
      <div className="rounded-[4%] p-[6%]" style={{ background: design.colors.qrBackground }}>
        {design.reviewUrl ? (
          <QRCodeView
            value={design.reviewUrl}
            style={design.qrStyle}
            foreground={design.colors.qr}
            background={design.colors.qrBackground}
            accent={design.colors.accent}
            className="aspect-square w-full [&>svg]:h-full [&>svg]:w-full"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-center text-[11px] leading-relaxed text-black/40">
            Select a location to generate your QR
          </div>
        )}
      </div>
      {showBadge && badgePosition === "qr-center" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-[24%] w-[24%] items-center justify-center rounded-full bg-white shadow-md ring-2 ring-white">
            <GoogleGIcon className="h-[70%] w-[70%]" />
          </div>
        </div>
      )}
    </div>
  );

  const bgStyle = backgroundLayers(design);

  return (
    <article
      className={cn("relative overflow-hidden", className)}
      style={{
        ...bgStyle,
        borderRadius: design.layout.radius,
        color: design.colors.text,
      }}
    >
      {design.background.kind === "custom" && design.background.customImage && customFilter ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${design.background.customImage}")`,
            backgroundSize: `${design.background.imageZoom * 100}%`,
            backgroundPosition: `${design.background.imageX}% ${design.background.imageY}%`,
            backgroundRepeat: "no-repeat",
            filter: customFilter,
          }}
        />
      ) : null}
      {design.background.kind === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${design.background.gradientAngle ?? 160}deg, ${design.background.color}, ${design.background.secondaryColor ?? design.background.color})`,
          }}
        />
      )}
      <PatternOverlay design={design} />
      {design.layout.showFrame && <CornerMarks color={design.layout.frameColor || design.colors.primary} />}
      {design.layout.showFrame && (
        <div
          className="pointer-events-none absolute inset-[2.4%] z-10"
          style={{ border: `1.5px solid ${design.layout.frameColor || design.colors.primary}`, opacity: 0.7, borderRadius: Math.max(0, design.layout.radius - 8) }}
        />
      )}

      <div
        className={cn("relative z-20 flex h-full flex-col", items)}
        style={{
          padding,
          gap: `${design.layout.gap}%`,
          textAlign,
          justifyContent: qrFirst ? "flex-start" : "space-between",
        }}
      >
        {qrFirst ? (
          <>
            {design.logo.position === "top" && logo}
            {showBadge && badgePosition === "top" && googleBadgeBlock}
            {nameBlock}
            {showBadge && badgePosition === "above-qr" && googleBadgeBlock}
            {qrBlock}
            {showBadge && badgePosition === "below-qr" && googleBadgeBlock}
            {design.logo.position === "above-qr" && logo}
            {messageBlock}
            {design.layout.showStars && <StarRow color={design.colors.accent} />}
            {ctaBlock}
          </>
        ) : (
          <>
            <div className={cn("flex w-full flex-col", items)} style={{ gap: `${design.layout.gap * 0.7}%` }}>
              {design.logo.position === "top" && logo}
              {showBadge && badgePosition === "top" && googleBadgeBlock}
              {nameBlock}
              {messageBlock}
              {design.layout.showStars && <StarRow color={design.colors.accent} />}
              {ctaBeforeQr && ctaBlock}
            </div>
            <div className={cn("flex w-full flex-1 flex-col justify-end", items)} style={{ gap: `${design.layout.gap * 0.8}%` }}>
              {design.logo.position === "above-qr" && logo}
              {showBadge && badgePosition === "above-qr" && googleBadgeBlock}
              {qrBlock}
              {showBadge && badgePosition === "below-qr" && googleBadgeBlock}
              {!ctaBeforeQr && ctaBlock}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

