import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl">Page not found</h1>
      <p className="mt-3 text-sm text-muted">That page does not exist. Create a review card instead.</p>
      <Button asChild className="mt-6">
        <Link href="/create">Create Review QR</Link>
      </Button>
    </div>
  );
}
