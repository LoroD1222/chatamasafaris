import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-astra-cream px-6 text-center">
      <div className="flex max-w-md flex-col gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-astra-gold">404</p>
        <h1 className="text-4xl font-semibold text-astra-cocoa">This route is off the map.</h1>
        <p className="text-astra-brown/75">Return to the homepage and keep planning from there.</p>
        <Button asChild className="bg-astra-gold text-astra-cocoa hover:bg-astra-gold/90">
          <Link href="/en">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
