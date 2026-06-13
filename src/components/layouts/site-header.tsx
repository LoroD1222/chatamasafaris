"use client";

import { Menu, Mountain } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary } from "@/i18n/types";

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  const alternateLocale = locale === "en" ? "ar" : "en";

  return (
    <header className="sticky top-0 z-40 border-b border-safari-bark/10 bg-safari-cream/92 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={dictionary.brand.name}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-safari-ink text-safari-cream">
            <Mountain className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold leading-none text-safari-ink">{dictionary.brand.name}</span>
            <span className="text-xs text-safari-bark/65">{dictionary.brand.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-safari-bark/78 md:flex" aria-label="Primary">
          {dictionary.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-safari-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/${alternateLocale}`}>{alternateLocale.toUpperCase()}</Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <a href="#planner">{dictionary.header.plannerCta}</a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label={dictionary.header.menuLabel}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="text-lg font-semibold text-safari-ink">{dictionary.brand.name}</SheetTitle>
            <SheetDescription className="mt-1 text-sm text-safari-bark/70">{dictionary.brand.tagline}</SheetDescription>
            <nav className="mt-8 grid gap-4 text-base font-medium text-safari-bark" aria-label="Mobile primary">
              {dictionary.nav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a href={item.href} className="rounded-md py-2 transition hover:text-safari-ink">
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <Button asChild variant="gold">
                <a href="#planner">{dictionary.header.plannerCta}</a>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${alternateLocale}`}>{alternateLocale.toUpperCase()}</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
