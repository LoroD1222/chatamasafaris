"use client";

import { Mail, Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary } from "@/i18n/types";
import { localizedHref, localizedHomeAnchor } from "@/utils/routes";

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <header className="bg-astra-cream text-astra-brown">
      <div className="bg-astra-gold">
        <div className="container flex h-[37px] max-w-[1160px] items-center justify-between gap-1.5 text-[8px] font-bold leading-[1.35] sm:gap-3 sm:text-[13px] sm:leading-[1.6]">
          <p className="flex min-w-0 items-center gap-1 uppercase tracking-normal text-astra-cocoa/40 sm:gap-2 sm:pl-4 sm:tracking-[0.05em]">
            <span className="size-2.5 shrink-0 bg-current [mask:url('/assets/figma/nav-bar-star.png')_center/contain_no-repeat] sm:size-[18px]" aria-hidden="true" />
            <span className="whitespace-nowrap text-[7px] sm:text-[13px]">{dictionary.topBar.label}</span>
          </p>
          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-1 text-[10px] text-astra-cocoa/65 sm:gap-5 sm:text-[13px]">
            <a href={`https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 underline underline-offset-2">
              <Phone className="size-3 sm:size-3.5" aria-hidden="true" />
              {dictionary.topBar.phone}
            </a>
            <a href={`mailto:${dictionary.topBar.email}`} className="hidden min-w-0 items-center gap-1 underline underline-offset-2 md:inline-flex">
              <Mail className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{dictionary.topBar.email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-astra-cream">
        <div className="container flex h-[70px] max-w-[1160px] items-center justify-between gap-8 sm:h-[100px]">
          <Link href={locale === "en" ? "/" : `/${locale}`} className="relative block h-[51px] w-[136px] shrink-0 sm:h-[92px] sm:w-[219px]" aria-label={dictionary.brand.name}>
            <span className="sr-only">{dictionary.brand.name}</span>
            <Image src="/assets/figma/logo-header.png" alt={dictionary.brand.logoAlt} fill priority sizes="(min-width: 640px) 219px, 136px" className="object-contain" />
          </Link>

          <nav className="hidden items-center gap-7 text-[15px] font-medium leading-[1.6] text-astra-brown md:flex" aria-label="Primary">
            {dictionary.nav.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={localizedHref(locale, item.href)} className="transition hover:text-astra-gold">
                {item.label}
              </Link>
            ))}
          </nav>

          <PlannerDialogButton
            planner={dictionary.planner}
            className="hidden h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90 md:inline-flex"
          >
            {dictionary.header.plannerCta}
          </PlannerDialogButton>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label={dictionary.header.menuLabel}>
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="text-lg font-semibold text-astra-cocoa">{dictionary.brand.name}</SheetTitle>
              <SheetDescription className="mt-1 text-sm text-astra-brown/70">{dictionary.brand.tagline}</SheetDescription>
              <nav className="mt-8 grid gap-4 text-base font-medium text-astra-brown" aria-label="Mobile primary">
                {dictionary.nav.map((item) => (
                  <SheetClose asChild key={`${item.label}-${item.href}`}>
                    <Link href={localizedHref(locale, item.href)} className="rounded-md py-2 transition hover:text-astra-gold">
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8">
                <SheetClose asChild>
                  <Button asChild className="w-full bg-astra-gold text-astra-cocoa hover:bg-astra-gold/90">
                    <Link href={localizedHomeAnchor(locale, "planner")}>{dictionary.header.plannerCta}</Link>
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
