"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Download, Eye, FileCheck, Loader2, Sparkles } from "lucide-react";
import { ControlPanel } from "@/components/editor/ControlPanel";
import { LivePreview } from "@/components/editor/LivePreview";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolHeader } from "@/components/layout/ToolHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { exportReviewCard, type ExportFormat } from "@/lib/export/export-card";
import { exportDimensions, getPrintSize } from "@/lib/export/print-sizes";
import { useEditorStore } from "@/store/editor-store";

export function EditorWorkspace() {
  const design = useEditorStore((s) => s.design);
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "preparing" | "ready" | "error">("idle");
  const [open, setOpen] = useState(false);
  const [lastFormat, setLastFormat] = useState<ExportFormat>("png");

  const printSizeObj = getPrintSize(design.printSize);
  const dims = exportDimensions(printSizeObj.width, printSizeObj.height, design.printSize);

  async function download(format: ExportFormat) {
    if (!cardRef.current) return;
    setLastFormat(format);
    setOpen(true);
    setStatus("preparing");
    try {
      await exportReviewCard(cardRef.current, {
        format,
        printSize: design.printSize,
        businessName: design.businessName,
      });
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper lg:h-dvh lg:overflow-hidden">
      <ToolHeader>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm" className="rounded-xl border-border/80 text-xs font-semibold" onClick={() => void download("svg")}>
            Vector SVG
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border/80 text-xs font-semibold" onClick={() => void download("jpg")}>
            JPG (Print)
          </Button>
          <Button size="sm" className="gap-2 rounded-xl text-xs font-bold shadow-xs" onClick={() => void download("png")}>
            <Download className="h-3.5 w-3.5" /> High-Res PNG
          </Button>
        </div>
      </ToolHeader>

      <AdSlot slot="editor-banner" />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <aside className="order-2 flex w-full flex-col bg-white lg:order-1 lg:h-full lg:w-[24rem] lg:shrink-0 lg:overflow-hidden lg:border-r lg:border-t-0 xl:w-[27rem]">
          <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
            <ControlPanel />
          </div>
        </aside>
        <LivePreview
          design={design}
          cardRef={cardRef}
          className="order-1 shrink-0 lg:order-2 lg:min-h-0 lg:flex-1"
        />
      </div>

      {/* Mobile Floating Action Bar */}
      <div className="sticky bottom-0 z-30 flex items-center justify-between gap-2.5 border-t border-border/80 bg-white/95 p-3 backdrop-blur-md md:hidden">
        <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl px-3 py-2.5 text-xs font-semibold">
          <a href="#preview" className="flex items-center justify-center gap-1.5">
            <Eye className="h-4 w-4 shrink-0 text-accent" />
            <span className="truncate">Card Preview</span>
          </a>
        </Button>
        <Button size="sm" className="flex-1 gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold shadow-sm" onClick={() => void download("png")}>
          <Download className="h-4 w-4 shrink-0" />
          <span className="truncate">Download File</span>
        </Button>
      </div>

      {/* High Resolution Export Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl p-6 sm:p-7">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              {status === "preparing" && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  Rendering High-Res File…
                </>
              )}
              {status === "ready" && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Your Card Export is Ready!
                </>
              )}
              {status === "error" && "Export Encountered an Issue"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs text-muted">
              {status === "preparing" && `Generating a 300 DPI print-ready image file (${dims.width} × ${dims.height} px).`}
              {status === "ready" && "Your download has started automatically in your browser."}
              {status === "error" && "Something went wrong while capturing the design canvas. Please try again."}
            </DialogDescription>
          </DialogHeader>

          {status === "ready" && (
            <div className="mt-2 space-y-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs">
                <p className="font-bold text-emerald-900">File Specs: {lastFormat.toUpperCase()} Format</p>
                <p className="mt-1 text-emerald-800">
                  Resolution: {dims.width} × {dims.height} px • Print Ready (300 DPI target)
                </p>
              </div>

              <AdSlot slot="download" />

              <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3 w-full">
                <Button variant="outline" className="w-full rounded-xl text-xs font-semibold" onClick={() => void download("jpg")}>
                  Download JPG
                </Button>
                <Button variant="outline" className="w-full rounded-xl text-xs font-semibold" onClick={() => void download("svg")}>
                  Download SVG
                </Button>
                <Button className="w-full rounded-xl text-xs font-bold shadow-xs" onClick={() => void download("png")}>
                  Download PNG
                </Button>
              </div>
            </div>
          )}

          {status === "error" && (
            <Button className="mt-2 w-full rounded-xl" onClick={() => void download("png")}>
              Try PNG Export Again
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

