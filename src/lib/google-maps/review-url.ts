const WRITE_REVIEW_BASE = "https://search.google.com/local/writereview";

export function getGoogleReviewUrl(placeId: string): string {
  const id = placeId.trim();
  if (!id) {
    throw new Error("A Google Place ID is required to generate a review URL.");
  }
  const url = new URL(WRITE_REVIEW_BASE);
  url.searchParams.set("placeid", id);
  return url.toString();
}

const ALLOWED_HOSTS = new Set([
  "search.google.com",
  "www.google.com",
  "google.com",
  "maps.google.com",
  "www.google.com.pk",
  "maps.app.goo.gl",
  "goo.gl",
]);

export function isAllowedReviewUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    if (ALLOWED_HOSTS.has(url.hostname)) return true;
    return url.hostname.endsWith(".google.com") || url.hostname.endsWith(".google.com.pk");
  } catch {
    return false;
  }
}

export function normalizeReviewUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!isAllowedReviewUrl(trimmed)) return null;
  return trimmed;
}

export function extractPlaceIdFromUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const fromQuery =
      url.searchParams.get("placeid") ||
      url.searchParams.get("placeId") ||
      url.searchParams.get("query_place_id");
    if (fromQuery) return fromQuery;
    const q = url.searchParams.get("q");
    if (q?.startsWith("place_id:")) return q.slice("place_id:".length);
    const placeMatch = url.pathname.match(/place\/[^/]+\/([^/?]+)/);
    if (placeMatch?.[1]?.startsWith("ChI")) return placeMatch[1];
    return null;
  } catch {
    return null;
  }
}
