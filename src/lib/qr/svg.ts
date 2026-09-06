import { encode, QrCodeDataType, type QrCodeGenerateResult } from "uqr";
import type { QrStyleId } from "@/types";

const BASE_BORDER = 4;

export function encodeReviewQr(value: string): QrCodeGenerateResult {
  return encode(value, {
    ecc: "H",
    boostEcc: true,
    border: BASE_BORDER,
  });
}

export interface QrRenderOptions {
  style: QrStyleId;
  foreground: string;
  background: string;
  accent?: string;
}

function moduleRadius(style: QrStyleId, isFunction: boolean) {
  if (isFunction) {
    if (style === "dots" || style === "soft-rounded" || style === "elegant") return 0.18;
    if (style === "rounded") return 0.12;
    return 0.04;
  }
  switch (style) {
    case "dots":
      return 0.5;
    case "soft-rounded":
      return 0.42;
    case "elegant":
      return 0.36;
    case "rounded":
      return 0.28;
    case "minimal":
      return 0.08;
    case "bold":
      return 0.06;
    default:
      return 0.02;
  }
}

function moduleScale(style: QrStyleId, isFunction: boolean) {
  if (isFunction) return 1;
  if (style === "dots") return 0.82;
  if (style === "minimal") return 0.86;
  if (style === "bold") return 1.04;
  if (style === "elegant") return 0.92;
  return 0.96;
}

export function renderQrSvg(qr: QrCodeGenerateResult, options: QrRenderOptions): string {
  const { style, foreground, background, accent = foreground } = options;
  const extraQuiet = style === "minimal" || style === "framed" || style === "elegant" ? 1.2 : 0;
  const size = qr.size + extraQuiet * 2;
  const framePad = style === "framed" ? 1.4 : 0;
  const view = size + framePad * 2;
  const parts: string[] = [];

  parts.push(
    `<rect x="0" y="0" width="${view}" height="${view}" fill="${background}" />`,
  );

  if (style === "framed") {
    parts.push(
      `<rect x="0.35" y="0.35" width="${view - 0.7}" height="${view - 0.7}" fill="none" stroke="${accent}" stroke-width="0.22" rx="0.35" />`,
    );
  }

  const offset = extraQuiet + framePad;

  for (let y = 0; y < qr.size; y += 1) {
    for (let x = 0; x < qr.size; x += 1) {
      if (!qr.data[y][x]) continue;
      const type = qr.types[y][x];
      const isFunction =
        type === QrCodeDataType.Position ||
        type === QrCodeDataType.Timing ||
        type === QrCodeDataType.Alignment;
      const scale = Math.min(moduleScale(style, isFunction), 1.08);
      const radius = moduleRadius(style, isFunction);
      const inset = (1 - scale) / 2;
      const px = x + offset + inset;
      const py = y + offset + inset;
      const dim = scale;
      if (style === "dots" && !isFunction) {
        parts.push(
          `<circle cx="${px + dim / 2}" cy="${py + dim / 2}" r="${dim * 0.46}" fill="${foreground}" />`,
        );
      } else {
        parts.push(
          `<rect x="${px}" y="${py}" width="${dim}" height="${dim}" rx="${radius}" fill="${foreground}" />`,
        );
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${view} ${view}" shape-rendering="${style === "classic" || style === "bold" ? "crispEdges" : "geometricPrecision"}" aria-hidden="true">${parts.join("")}</svg>`;
}
