const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function isAcceptedImage(file: File) {
  return ACCEPTED_IMAGE_TYPES.has(file.type);
}

export async function readAndResizeImage(file: File, maxEdge = 1920): Promise<string> {
  if (!isAcceptedImage(file)) {
    throw new Error("unsupported-type");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("too-large");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
  return canvas.toDataURL(mime, mime === "image/jpeg" ? 0.9 : undefined);
}
