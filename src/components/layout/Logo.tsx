import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 min-h-11 transition-opacity hover:opacity-90" aria-label="ReviewQR home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ink via-ink to-neutral-800 text-white shadow-md shadow-ink/15 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
          <rect x="14" y="14" width="3" height="3" fill="var(--color-accent, #d95d24)" />
          <rect x="18" y="18" width="3" height="3" fill="currentColor" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[16px] font-bold tracking-tight text-ink font-display">
          Review<span className="text-accent">QR</span>
        </span>
      )}
    </Link>
  );
}

