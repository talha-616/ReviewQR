"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/layout/Logo";

const links = [
  { href: "/create", label: "Create QR" },
  { href: "/templates", label: "Templates" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/create")) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-paper/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 rounded-full border border-border/50 bg-white/50 p-1 text-sm font-medium text-ink/80 shadow-xs backdrop-blur-md md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 transition-all duration-200 ${
                  active ? "bg-ink text-white shadow-xs" : "hover:bg-paper-2/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild className="gap-2 rounded-full px-5 shadow-sm transition-all hover:shadow-md">
            <Link href="/create">
              <Sparkles className="h-4 w-4 text-accent-light" />
              Create Card
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 p-6">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <Logo />
              <nav className="flex flex-col gap-2 pt-4" aria-label="Mobile">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="flex min-h-12 items-center rounded-2xl px-4 text-base font-medium transition-colors hover:bg-paper-2">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto pt-4">
                <SheetClose asChild>
                  <Button asChild className="w-full gap-2 rounded-xl py-3">
                    <Link href="/create">
                      <Sparkles className="h-4 w-4" />
                      Create Review QR
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

