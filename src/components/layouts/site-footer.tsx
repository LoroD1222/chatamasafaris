import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { HomeDictionary } from "@/i18n/types";
import { localizedHref } from "@/utils/routes";

const socialIcons = [Instagram, Twitter, Linkedin, Facebook];

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <footer className="bg-astra-cocoa text-white">
      <div className="container flex max-w-[1280px] flex-col items-center gap-[29px] py-16 md:py-[72px]">
        <div className="relative h-[104px] w-[246px]">
          <Image src="/assets/figma/footer-logo-upload.png" alt={dictionary.brand.logoAlt} fill sizes="246px" className="object-contain" />
        </div>
        <div className="flex items-center justify-center gap-2" aria-label="Social links">
          {/* TODO: Add real social media URLs */}
          {socialIcons.map((Icon, index) => (
            <a
              key={index}
              href="#"
              aria-label={`Social link ${index + 1}`}
              className="grid size-10 place-items-center rounded-lg bg-astra-gold/15 text-astra-gold transition hover:bg-astra-gold/25"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          ))}
        </div>
        <nav className="flex flex-wrap justify-center gap-8 text-base font-medium leading-[1.5] tracking-[-0.18px] text-white/70 md:gap-16" aria-label="Footer">
          {dictionary.footer.links.map((item, index) => (
            <Link key={`${item.label}-${index}`} href={localizedHref(locale, item.href)} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="h-px w-full bg-white/15" />
        <div className="flex w-full flex-col gap-4 text-xs leading-4 text-white md:flex-row md:items-center md:justify-between">
          <p>{dictionary.footer.copyright}</p>
          <nav className="flex flex-wrap gap-4 md:justify-end" aria-label="Legal">
            {dictionary.footer.legalLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-astra-gold">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
