import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = siteConfig.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#f7f3ee",
          color: "#14110f",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#c45c26" }}>
          ReviewQR
        </div>
        <div style={{ marginTop: 24, fontSize: 64, lineHeight: 1.1, maxWidth: 900 }}>
          Get More Google Reviews With One Scan
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#6f675e", maxWidth: 820 }}>
          Create a beautiful QR card for your Google Maps review page.
        </div>
      </div>
    ),
    size,
  );
}
