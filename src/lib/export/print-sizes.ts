export const PRINT_SIZES: Record<
  string,
  { id: string; name: string; width: number; height: number; hint: string }
> = {
  square: {
    id: "square",
    name: "Square",
    width: 1080,
    height: 1080,
    hint: "Social, window cling, table tent front",
  },
  a5: {
    id: "a5",
    name: "A5",
    width: 1080,
    height: 1528,
    hint: "148 × 210 mm poster",
  },
  a4: {
    id: "a4",
    name: "A4",
    width: 1080,
    height: 1528,
    hint: "210 × 297 mm poster — same ratio, larger export",
  },
  "5x7": {
    id: "5x7",
    name: "5×7 inch",
    width: 1080,
    height: 1512,
    hint: "Table card / small frame",
  },
  table: {
    id: "table",
    name: "Table card",
    width: 1080,
    height: 1620,
    hint: "Tall counter card",
  },
};

export function getPrintSize(id: string) {
  return PRINT_SIZES[id] ?? PRINT_SIZES.square;
}

export function exportPixelRatio(width: number, height: number, minLongest = 3000) {
  const longest = Math.max(width, height);
  const a4Boost = height / width > 1.35 ? 1.12 : 1;
  return Math.max(2, Math.ceil((minLongest / longest) * a4Boost * 100) / 100);
}

export function exportDimensions(width: number, height: number, sizeId: string) {
  const ratio = exportPixelRatio(width, height, sizeId === "a4" ? 3508 : 3000);
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
    pixelRatio: ratio,
  };
}
