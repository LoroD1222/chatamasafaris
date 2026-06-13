import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-safari-cream px-6 text-center">
      <div className="max-w-md space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-safari-gold">404</p>
        <h1 className="text-4xl font-semibold text-safari-ink">This route is off the map.</h1>
        <p className="text-safari-bark/75">Return to the homepage and keep planning from there.</p>
        <Button asChild>
          <Link href="/en">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
