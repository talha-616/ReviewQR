"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Grid, Maximize2, Minus, Plus, RefreshCw } from "lucide-react";
import type { DesignState } from "@/types";
import { ReviewCard } from "@/components/editor/ReviewCard";
import { getPrintSize } from "@/lib/export/print-sizes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  design: DesignState;
  cardRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

export function LivePreview({ design, cardRef, className }: LivePreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [userZoom, setUserZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const size = getPrintSize(design.printSize);
  const hasPlace = Boolean(design.reviewUrl);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      const pad = 64;
      const availableW = Math.max(120, rect.width - pad);
      const availableH = Math.max(120, rect.height - pad);
      const next = Math.min(availableW / size.width, availableH / size.height, 0.95);
      setScale(Number.isFinite(next) && next > 0 ? next : 0.25);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [size.width, size.height]);

  const effectiveScale = scale * userZoom;

  return (
    <section
      className={cn("flex min-h-0 min-w-0 flex-1 flex-col bg-paper", className)}
      id="preview"
      aria-label="Live card preview"
    >
      {/* Top Interactive Canvas Bar */}
      <div className="flex shrink-0 items-center justify-between gap-1.5 border-b border-border/70 bg-white/80 px-2.5 py-2 backdrop-blur-md sm:px-4 sm:py-2.5 min-w-0 overflow-x-auto [scrollbar-width:none]">
        <div className="flex shrink-0 items-center gap-1.5 min-w-0">
          <span className="rounded-full bg-accent-light px-2.5 py-1 text-[11px] font-bold text-accent shadow-2xs sm:text-xs">
            <span className="sm:hidden">{size.name}</span>
            <span className="hidden sm:inline">{size.name} ({size.width} × {size.height} px)</span>
          </span>
          {hasPlace ? (
            <span className="hidden items-center gap-1 text-[11px] text-emerald-800 font-medium md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Preview
            </span>
          ) : (
            <span className="hidden text-xs text-muted md:inline">
              Select location to test live QR
            </span>
          )}
        </div>

        {/* Zoom & Canvas Controls */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg text-muted hover:text-ink sm:h-8 sm:w-8"
            onClick={() => setUserZoom((z) => Math.max(0.6, z - 0.15))}
            title="Zoom out"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-8 text-center font-mono text-[10px] font-bold text-muted sm:w-10 sm:text-[11px]">
            {Math.round(userZoom * 100)}%
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg text-muted hover:text-ink sm:h-8 sm:w-8"
            onClick={() => setUserZoom((z) => Math.min(2.0, z + 0.15))}
            title="Zoom in"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg text-muted hover:text-ink sm:h-8 sm:w-8"
            onClick={() => setUserZoom(1)}
            title="Reset zoom"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <div className="h-3.5 w-px bg-border mx-0.5" aria-hidden="true" />
          <Button
            type="button"
            variant={showGrid ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7 rounded-lg text-muted hover:text-ink sm:h-8 sm:w-8"
            onClick={() => setShowGrid((g) => !g)}
            title="Toggle background grid"
          >
            <Grid className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={frameRef}
        className="relative min-h-0 flex-1 overflow-auto bg-radial from-paper via-paper-2/60 to-paper-2/90"
      >
        {showGrid && (
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(#d6cdc0 1px, transparent 1px), linear-gradient(90deg, #d6cdc0 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />
        )}
        <div className="relative flex h-full w-full min-w-0 items-center justify-center p-4 sm:p-8">
          <div
            className="transition-transform duration-200 ease-out overflow-hidden rounded-2xl shadow-[0_25px_70px_-15px_rgba(18,16,14,0.3)] ring-1 ring-black/10"
            style={{
              width: size.width * effectiveScale,
              height: size.height * effectiveScale,
            }}
          >
            <div
              ref={cardRef}
              style={{
                width: size.width,
                height: size.height,
                transform: `scale(${effectiveScale})`,
                transformOrigin: "top left",
              }}
            >
              <ReviewCard design={design} className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

