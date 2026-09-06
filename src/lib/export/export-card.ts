import { toJpeg, toPng, toSvg } from "html-to-image";
import { downloadBlob, slugify } from "@/lib/utils";
import { exportDimensions, getPrintSize } from "@/lib/export/print-sizes";
import type { PrintSizeId } from "@/types";

export type ExportFormat = "png" | "jpg" | "svg";

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export async function exportReviewCard(
  node: HTMLElement,
  options: {
    format: ExportFormat;
    printSize: PrintSizeId;
    businessName: string;
  },
) {
  await waitForPaint();
  const size = getPrintSize(options.printSize);
  const { pixelRatio } = exportDimensions(size.width, size.height, options.printSize);
  const fileBase = `${slugify(options.businessName) || "review-card"}-google-review-qr`;
  const filter = (element: Element) => {
    if (!(element instanceof HTMLElement)) return true;
    return !element.dataset.exportIgnore;
  };

  const common = {
    cacheBust: true,
    pixelRatio,
    backgroundColor: undefined as string | undefined,
    filter,
    style: {
      transform: "none",
      transformOrigin: "top left",
    },
  };

  try {
    if (options.format === "jpg") {
      const dataUrl = await toJpeg(node, { ...common, quality: 0.92, backgroundColor: "#ffffff" });
      const blob = await (await fetch(dataUrl)).blob();
      downloadBlob(blob, `${fileBase}.jpg`);
      return;
    }
    if (options.format === "svg") {
      const svg = await toSvg(node, common);
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      downloadBlob(blob, `${fileBase}.svg`);
      return;
    }
    const dataUrl = await toPng(node, common);
    const blob = await (await fetch(dataUrl)).blob();
    downloadBlob(blob, `${fileBase}.png`);
  } catch {
    throw new Error("export-failed");
  }
}
