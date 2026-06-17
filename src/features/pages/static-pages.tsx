import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layouts/page-shell";
import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary, Itinerary } from "@/i18n/types";
import { localizedHref, localizedSharedTripHref } from "@/utils/routes";

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
    image: "/assets/figma/choose-tanzania-experience.png",
    imageAlt: "Tanzania safari landscapes and Kilimanjaro",
    highlights: ["Serengeti and Ngorongoro routes", "Private vehicles and guides", "USD pricing before deposit"]
  },
  safaris: {
    eyebrow: "Wildlife safaris",
    title: "Classic Tanzania wildlife without vague package promises.",
    description:
      "Game drives, vetted camps, and route timing are planned around the wildlife movement for your travel month.",
    image: "/assets/figma/tanzanian-widernes.png",
    imageAlt: "Tanzania wilderness with zebras on a safari road",
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
    image: "/assets/figma/start-planningimage.png",
    imageAlt: "Tanzania safari landscape and trip planning inspiration",
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
                <PlannerDialogButton
                  planner={dictionary.planner}
                  className="h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
                >
                  {dictionary.header.plannerCta}
                </PlannerDialogButton>
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
          <Link
            key={item.slug}
            href={localizedSharedTripHref(locale)}
            className="group overflow-hidden rounded-[10px] border border-astra-cocoa/10 bg-white shadow-[0_14px_35px_rgba(64,50,41,0.08)] outline-none transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(64,50,41,0.12)] focus-visible:ring-2 focus-visible:ring-astra-gold focus-visible:ring-offset-2"
          >
            <div className="relative h-[210px]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex min-h-[196px] flex-col px-5 pb-[25px] pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-astra-gold">{item.price}</p>
              <h3 className="mt-3 text-xl font-bold leading-[1.3] text-astra-cocoa">{item.title}</h3>
              <p className="mt-2 text-sm leading-[1.6] text-astra-brown/75">
                {item.duration} - {item.route} - {item.season}
              </p>
              <span className="mt-auto inline-flex h-10 items-center justify-center rounded-[7px] bg-astra-gold px-4 text-sm font-bold text-astra-cocoa transition group-hover:bg-astra-gold/90">
                See itinerary
              </span>
            </div>
          </Link>
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
  dictionary
}: {
  locale: Locale;
  dictionary: HomeDictionary;
}) {
  const itinerary = dictionary.itineraries.items[0];
  const facts = [
    { label: "Duration", value: itinerary.duration },
    { label: "Route", value: itinerary.route },
    { label: "Best season", value: itinerary.season },
    { label: "Guide style", value: "Private guide and vehicle" }
  ];
  const plan = [
    "Arrive in Arusha, meet your planner and guide, and confirm the final safari rhythm.",
    "Drive into Tarangire or Lake Manyara for your first private game drives and lodge stay.",
    "Continue toward the Serengeti, with the route adjusted around wildlife movement and season.",
    "Explore Serengeti plains with flexible game drives, picnic lunches, and sunset camp returns.",
    "Descend into Ngorongoro Crater before closing the safari with a clean transfer plan."
  ];
  const included = ["Private 4x4 safari vehicle", "Expert Tanzania guide", "Vetted camps and lodges", "Park fees planned upfront", "USD quote before deposit", "Live planner support"];

  return (
    <PageShell locale={locale} dictionary={dictionary}>
      <main className="bg-astra-cream text-astra-brown">
        <section className="bg-astra-cocoa py-12 text-white md:py-16">
          <div className="container grid max-w-[1160px] items-center gap-10 lg:grid-cols-[1fr_500px]">
            <div>
              <Link href={localizedHref(locale, "/itineraries")} className="text-sm font-bold text-astra-gold transition hover:text-astra-gold/80">
                Back to itineraries
              </Link>
              <h1 className="mt-5 max-w-[680px] text-[42px] font-semibold leading-[1.12] md:text-[56px]">{itinerary.title}</h1>
              <p className="mt-5 max-w-[620px] text-lg leading-[1.6] text-white/75">
                A private northern Tanzania safari page ready for CMS content. The route, lodges, and final cost can be adjusted once the traveler brief is known.
              </p>
              <p className="mt-5 text-lg font-semibold leading-[1.6] text-white/75">
                {itinerary.duration} - {itinerary.route} - {itinerary.season}
              </p>
              <p className="mt-4 text-xl font-bold text-astra-gold">{itinerary.price}</p>
              <PlannerDialogButton
                planner={dictionary.planner}
                className="mt-7 h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
              >
                Plan this trip
              </PlannerDialogButton>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-white/20">
              <Image
                src="/assets/figma/tanzanian-widernes.png"
                alt="Tanzania wilderness safari road with zebras"
                fill
                sizes="(min-width: 1024px) 500px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container max-w-[1160px]">
            <div className="grid gap-5 md:grid-cols-4">
              {facts.map((fact) => (
                <article key={fact.label} className="rounded-[10px] border border-astra-cocoa/10 bg-white p-6 shadow-[0_14px_35px_rgba(64,50,41,0.06)]">
                  <p className="text-xs font-bold uppercase tracking-[0.05em] text-astra-gold">{fact.label}</p>
                  <p className="mt-3 text-lg font-bold leading-[1.35] text-astra-cocoa">{fact.value}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_390px]">
              <section className="rounded-[10px] border border-astra-cocoa/10 bg-white p-6 shadow-[0_14px_35px_rgba(64,50,41,0.06)] md:p-8">
                <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">Sample flow</p>
                <h2 className="mt-3 text-[32px] font-semibold leading-[1.2] text-astra-cocoa">A clear safari plan before CMS content is attached.</h2>
                <div className="mt-8 flex flex-col gap-5">
                  {plan.map((item, index) => (
                    <article key={item} className="grid gap-4 sm:grid-cols-[46px_1fr]">
                      <div className="grid size-[46px] place-items-center rounded-full bg-astra-gold text-sm font-bold text-astra-cocoa">{index + 1}</div>
                      <p className="text-base leading-[1.7] text-astra-brown/75">{item}</p>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="rounded-[10px] border border-astra-cocoa/10 bg-white p-6 shadow-[0_14px_35px_rgba(64,50,41,0.06)]">
                <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">Included planning</p>
                <h2 className="mt-3 text-2xl font-semibold leading-[1.25] text-astra-cocoa">What Astra confirms before deposit</h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-[1.5] text-astra-brown/75">
                      <span className="mt-1 size-2 rounded-full bg-astra-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <PlannerDialogButton
                  planner={dictionary.planner}
                  className="mt-8 h-[54px] w-full rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
                >
                  Talk to Safari Planner
                </PlannerDialogButton>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
