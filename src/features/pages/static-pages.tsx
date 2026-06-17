import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layouts/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary, Itinerary } from "@/i18n/types";
import { localizedHomeAnchor, localizedHref } from "@/utils/routes";

export const servicePageSlugs = ["itineraries", "safaris", "kilimanjaro", "discover-tanzania"] as const;

export type ServicePageSlug = (typeof servicePageSlugs)[number];

type ServicePageContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
};

const servicePages: Record<ServicePageSlug, ServicePageContent> = {
  itineraries: {
    eyebrow: "Private Tanzania itineraries",
    title: "Safari trips built around your dates, budget, and pace.",
    description:
      "Start with one of Astra's proven routes, then adjust the parks, lodge level, and beach extensions with a planner who knows the ground.",
    image: "/assets/figma/experience-strip.png",
    imageAlt: "Tanzania safari landscapes and Kilimanjaro",
    highlights: ["Serengeti and Ngorongoro routes", "Private vehicles and guides", "USD pricing before deposit"]
  },
  safaris: {
    eyebrow: "Wildlife safaris",
    title: "Classic Tanzania wildlife without vague package promises.",
    description:
      "Game drives, vetted camps, and route timing are planned around the wildlife movement for your travel month.",
    image: "/assets/figma/category-wildlife.jpg",
    imageAlt: "Wildlife safari vehicle on a Tanzania plains road",
    highlights: ["Migration-timed planning", "Vetted lodges and mobile camps", "Private expert guides"]
  },
  kilimanjaro: {
    eyebrow: "Kilimanjaro climbs",
    title: "Climb Kilimanjaro with a clear plan before you land.",
    description:
      "Choose the right route, pace, and acclimatization plan, then add a safari or Zanzibar extension when it makes sense.",
    image: "/assets/figma/category-kilimanjaro.jpg",
    imageAlt: "Mount Kilimanjaro under snow",
    highlights: ["Route and pace guidance", "Porter-supported climbs", "Safari extensions after the summit"]
  },
  "discover-tanzania": {
    eyebrow: "Discover Tanzania",
    title: "Know where to go, when to travel, and what to skip.",
    description:
      "Tanzania is not one trip. We help you combine the right parks, coast, culture, and timing for the experience you actually want.",
    image: "/assets/figma/planning-landscape.png",
    imageAlt: "Zebras resting beside a safari road in Tanzania",
    highlights: ["Month-by-month travel advice", "Park and coast combinations", "Local planning from Arusha"]
  }
};

export function isServicePageSlug(value: string): value is ServicePageSlug {
  return servicePageSlugs.includes(value as ServicePageSlug);
}

export function ServicePage({
  locale,
  dictionary,
  slug
}: {
  locale: Locale;
  dictionary: HomeDictionary;
  slug: ServicePageSlug;
}) {
  const page = servicePages[slug];

  return (
    <PageShell locale={locale} dictionary={dictionary}>
      <main className="bg-astra-cream text-astra-brown">
        <section className="bg-astra-cocoa text-white">
          <div className="container grid min-h-[520px] max-w-[1160px] items-center gap-10 py-16 lg:grid-cols-[1fr_480px]">
            <div>
              <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{page.eyebrow}</p>
              <h1 className="mt-5 max-w-[700px] text-[42px] font-medium leading-[1.12] md:text-[56px]">{page.title}</h1>
              <p className="mt-5 max-w-[610px] text-base leading-[1.7] text-white/75">{page.description}</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
                  <Link href={localizedHomeAnchor(locale, "planner")}>{dictionary.header.plannerCta}</Link>
                </Button>
                <Button
                  asChild
                  className="h-[54px] rounded-[9px] border border-white/25 bg-white/10 px-6 text-base font-bold text-white hover:bg-white/15"
                >
                  <Link href={localizedHref(locale, "/contact")}>Contact us</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-white/20">
              <Image src={page.image} alt={page.imageAlt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" priority />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-[1160px]">
            <div className="grid gap-5 md:grid-cols-3">
              {page.highlights.map((highlight) => (
                <article key={highlight} className="rounded-[10px] border border-astra-cocoa/10 bg-white p-6 shadow-[0_14px_35px_rgba(64,50,41,0.06)]">
                  <p className="text-lg font-bold leading-[1.35] text-astra-cocoa">{highlight}</p>
                </article>
              ))}
            </div>

            {slug === "itineraries" ? <TripGrid locale={locale} itineraries={dictionary.itineraries.items} /> : null}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function TripGrid({ locale, itineraries }: { locale: Locale; itineraries: Itinerary[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-[32px] font-semibold leading-[1.2] text-astra-cocoa">Featured trips</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {itineraries.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-[10px] border border-astra-cocoa/10 bg-white shadow-[0_14px_35px_rgba(64,50,41,0.08)]">
            <div className="relative h-[210px]">
              <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="flex min-h-[196px] flex-col p-5">
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-astra-gold">{item.price}</p>
              <h3 className="mt-3 text-xl font-bold leading-[1.3] text-astra-cocoa">{item.title}</h3>
              <p className="mt-2 text-sm leading-[1.6] text-astra-brown/75">
                {item.duration} - {item.route} - {item.season}
              </p>
              <Link
                href={localizedHref(locale, `/trips/${item.slug}`)}
                className="mt-auto inline-flex h-10 items-center justify-center rounded-[7px] bg-astra-gold px-4 text-sm font-bold text-astra-cocoa transition hover:bg-astra-gold/90"
              >
                See itinerary
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ContactPage({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <PageShell locale={locale} dictionary={dictionary}>
      <main className="bg-astra-cream text-astra-brown">
        <section className="bg-astra-cocoa py-16 text-white md:py-20">
          <div className="container max-w-[1160px]">
            <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">Contact Astra</p>
            <h1 className="mt-5 max-w-[720px] text-[42px] font-medium leading-[1.12] md:text-[56px]">Talk to a Tanzania safari planner.</h1>
            <p className="mt-5 max-w-[620px] text-base leading-[1.7] text-white/75">
              Send your dates, group size, and trip idea. We reply by email or WhatsApp and keep the first conversation simple.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container grid max-w-[1160px] gap-10 lg:grid-cols-[390px_1fr]">
            <aside className="flex flex-col gap-4">
              <ContactMethod icon={Phone} label="Phone / WhatsApp" value={dictionary.topBar.phone} href={`tel:${dictionary.topBar.phone.replace(/\s/g, "")}`} />
              <ContactMethod icon={Mail} label="Email" value={dictionary.topBar.email} href={`mailto:${dictionary.topBar.email}`} />
              <ContactMethod icon={MapPin} label="Base" value="Arusha, Tanzania" />
              <ContactMethod icon={CalendarDays} label="Planning window" value="Replies within 4 hours" />
            </aside>

            <form
              action={`mailto:${dictionary.topBar.email}`}
              method="post"
              encType="text/plain"
              className="rounded-[10px] border border-astra-cocoa/10 bg-white p-6 shadow-[0_18px_45px_rgba(64,50,41,0.08)] md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field id="contact-name" label="Name" placeholder="Your name" name="name" />
                <Field id="contact-email" label="Email" placeholder="you@example.com" name="email" type="email" />
                <Field id="contact-whatsapp" label="WhatsApp" placeholder="+1 555 123 4567" name="whatsapp" type="tel" />
                <Field id="contact-dates" label="Travel dates" placeholder="July 2026" name="travel-dates" />
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor="contact-message">Trip idea</Label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us where you want to go, how many people are traveling, and your rough budget."
                    className="min-h-[150px] rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
                Send message
              </Button>
            </form>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function Field({
  id,
  label,
  name,
  placeholder,
  type = "text"
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} placeholder={placeholder} />
    </div>
  );
}

function ContactMethod({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon className="size-5 text-astra-gold" aria-hidden="true" />
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.05em] text-astra-brown/55">{label}</span>
        <span className="mt-1 block text-base font-semibold text-astra-cocoa">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-4 rounded-[10px] border border-astra-cocoa/10 bg-white p-5 transition hover:border-astra-gold/60">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-4 rounded-[10px] border border-astra-cocoa/10 bg-white p-5">{content}</div>;
}

export function TripPage({
  locale,
  dictionary,
  itinerary
}: {
  locale: Locale;
  dictionary: HomeDictionary;
  itinerary: Itinerary;
}) {
  return (
    <PageShell locale={locale} dictionary={dictionary}>
      <main className="bg-astra-cream text-astra-brown">
        <section className="bg-astra-cocoa py-12 text-white md:py-16">
          <div className="container grid max-w-[1160px] items-center gap-10 lg:grid-cols-[1fr_480px]">
            <div>
              <Link href={localizedHref(locale, "/itineraries")} className="text-sm font-bold text-astra-gold transition hover:text-astra-gold/80">
                Back to itineraries
              </Link>
              <h1 className="mt-5 max-w-[680px] text-[42px] font-medium leading-[1.12] md:text-[56px]">{itinerary.title}</h1>
              <p className="mt-5 text-lg leading-[1.6] text-white/75">
                {itinerary.duration} - {itinerary.route} - {itinerary.season}
              </p>
              <p className="mt-4 text-xl font-bold text-astra-gold">{itinerary.price}</p>
              <Button asChild className="mt-7 h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
                <Link href={localizedHomeAnchor(locale, "planner")}>Plan this trip</Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-white/20">
              <Image src={itinerary.image.src} alt={itinerary.image.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" priority />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container grid max-w-[1160px] gap-8 md:grid-cols-3">
            {["Private guide and vehicle", "Vetted camps only", "Planner support before and during travel"].map((item) => (
              <article key={item} className="rounded-[10px] border border-astra-cocoa/10 bg-white p-6 shadow-[0_14px_35px_rgba(64,50,41,0.06)]">
                <p className="text-lg font-bold leading-[1.35] text-astra-cocoa">{item}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
