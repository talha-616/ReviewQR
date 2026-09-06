import type { Metadata } from "next";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";

export const metadata: Metadata = {
  title: "Design your review card",
  description: "Customize your Google review QR card and download a print-ready file.",
  robots: { index: false, follow: true },
};

export default function DesignPage() {
  return <EditorWorkspace />;
}
