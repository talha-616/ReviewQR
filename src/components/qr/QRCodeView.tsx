"use client";

import { useEffect, useState } from "react";
import { encodeReviewQr, renderQrSvg } from "@/lib/qr/svg";
import { hasQrContrast } from "@/lib/utils";
import type { QrStyleId } from "@/types";

interface QRCodeViewProps {
  value: string;
  style: QrStyleId;
  foreground: string;
  background: string;
  accent?: string;
  className?: string;
  title?: string;
}

export function QRCodeView({
  value,
  style,
  foreground,
  background,
  accent,
  className,
  title = "Google review QR code",
}: QRCodeViewProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!value) {
      setSvg(null);
      setFailed(false);
      return;
    }
    try {
      const qr = encodeReviewQr(value);
      const safeFg = hasQrContrast(foreground, background, 4.5) ? foreground : "#14110f";
      const safeBg = hasQrContrast(safeFg, background, 4.5) ? background : "#ffffff";
      setSvg(
        renderQrSvg(qr, {
          style,
          foreground: safeFg,
          background: safeBg,
          accent,
        }),
      );
      setFailed(false);
    } catch {
      setSvg(null);
      setFailed(true);
    }
  }, [value, style, foreground, background, accent]);

  if (failed) {
    return (
      <div className={className} role="alert">
        Couldn&apos;t generate the QR code. Please try again.
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        className={className}
        style={{ background }}
        role="img"
        aria-label={value ? "Generating QR code" : "QR code will appear once a review link is ready"}
      />
    );
  }

  return (
    <div
      className={className}
      role="img"
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
