import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { HomeDictionary } from "@/i18n/types";

export function SiteFooter({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <footer className="bg-safari-ink text-safari-cream">
      <div className="container grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-safari-gold">{dictionary.brand.name}</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{dictionary.footer.cta}</h2>
          <p className="mt-3 text-safari-cream/72">{dictionary.footer.note}</p>
        </div>
        <Button asChild variant="gold" size="lg">
          <Link href="#planner">{dictionary.header.plannerCta}</Link>
        </Button>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container text-sm text-safari-cream/60">© {new Date().getFullYear()} {dictionary.footer.copyright}</div>
      </div>
    </footer>
  );
}
