"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ChevronRight, MapPin, Palette } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function ToolHeader({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const onDesign = pathname.includes("/design");

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-white/90 px-3 sm:px-4 backdrop-blur-md">
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        <Logo />
        <nav className="hidden items-center gap-1.5 sm:flex" aria-label="Create steps">
          <Link
            href="/create"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
              !onDesign
                ? "bg-ink text-white shadow-xs"
                : "text-muted hover:bg-paper-2 hover:text-ink",
            )}
          >
            <MapPin className="h-3.5 w-3.5" />
            1. Location
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted/50" aria-hidden="true" />
          <Link
            href="/create/design"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
              onDesign
                ? "bg-ink text-white shadow-xs"
                : "text-muted hover:bg-paper-2 hover:text-ink",
            )}
          >
            <Palette className="h-3.5 w-3.5" />
            2. Design & Export
          </Link>
        </nav>
        <span className="inline-flex items-center rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-bold text-accent sm:hidden">
          {onDesign ? "Step 2/2" : "Step 1/2"}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">{children}</div>
    </header>
  );
}

