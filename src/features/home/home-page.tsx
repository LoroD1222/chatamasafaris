import { ArrowRight, Check, Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFinalCta } from "@/components/layouts/site-final-cta";
import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/features/home/faq-list";
import { LeadPlanner } from "@/features/home/lead-planner";
import type { TripCard } from "@/features/trips/trip-data";
import type { Locale } from "@/i18n/config";
import type { AssetImage, HomeDictionary, Itinerary, TrustItem, WhyItem } from "@/i18n/types";
import { cn } from "@/utils/cn";
import { localizedHref, localizedSharedTripHref } from "@/utils/routes";


type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: AssetImage;
  featured?: boolean;
  stats?: string[];
};

const teamMembers: TeamMember[] = [
  {
    name: "Peter Chatama",
    role: "Founder & Head Guide",
    bio: "Born in 1977 in the Fipa land alongside Katavi National Park, Peter earned a B.Sc. in Wildlife Management from Sokoine University of Agriculture before teaching tourism in Arusha. In 2007 he joined Singita Serengeti, training in both South Africa and Tanzania, and guided there until 2025 - contributing to the brand's international guiding awards along the way. For Peter, conservation is a value passed between generations, not a slogan.",
    photo: {
      src: "/assets/figma/team/peter.png",
      alt: "Peter Chatama, Founder and Head Guide"
    },
    featured: true,
    stats: ["B.Sc. Wildlife Management, 2005", "Singita Serengeti, 2007-2025", "Katavi-born"]
  },
  {
    name: "Aloyce Moshi",
    role: "Senior Guide",
    bio: "15+ years in the field, with a career across Singita, Legendary Expedition and Auberge Safari - one of Peter's most trusted senior guides.",
    photo: {
      src: "/assets/figma/team/aloyce.jpg",
      alt: "Aloyce Moshi, Senior Guide"
    }
  },
  {
    name: "Abutwalibu Ngua",
    role: "Senior Guide",
    bio: "A senior guide with a photographer's eye - knows how to put you exactly where the light and the wildlife meet.",
    photo: {
      src: "/assets/figma/team/abutwalibu.jpg",
      alt: "Abutwalibu Ngua, Senior Guide"
    }
  },
  {
    name: "Benedictor Loy",
    role: "Guide",
    bio: "Part of the core guiding team at Astra Tanzania, bringing steady, attentive fieldcraft to every drive.",
    photo: {
      src: "/assets/figma/team/benedictor.jpg",
      alt: "Benedictor Loy, Guide"
    }
  },
  {
    name: "Jofrey Masonda",
    role: "Junior Guide",
    bio: "Coming up through the ranks under Peter and the senior guides, sharp-eyed and eager in the field.",
    photo: {
      src: "/assets/figma/team/jofrey.jpg",
      alt: "Jofrey Masonda, Junior Guide"
    }
  },
  {
    name: "Mohamedi Msuya",
    role: "Trainee Guide",
    bio: "Training under the Astra Tanzania team, building the field experience that defines every guide here.",
    photo: {
      src: "/assets/figma/team/mohamedi.jpg",
      alt: "Mohamedi Msuya, Trainee Guide"
    }
  }
];

export function HomePage({ locale, dictionary, recentTrips = [] }: { locale: Locale; dictionary: HomeDictionary; recentTrips?: TripCard[] }) {
  return (
    <main className="astra-page-enter overflow-hidden bg-astra-cream text-astra-brown">
      <HeroSection dictionary={dictionary} />
      <ExperienceCategories locale={locale} dictionary={dictionary} />
      <WhySection dictionary={dictionary} />
      <ItinerariesSection locale={locale} dictionary={dictionary} recentTrips={recentTrips} />
      <ImageStrip />
      <PlanningSection dictionary={dictionary} />
      <TeamSection dictionary={dictionary} />
      <ReviewsSection dictionary={dictionary} />
      <FaqSection dictionary={dictionary} />
      <SiteFinalCta dictionary={dictionary} />
    </main>
  );
}

function HeroSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="relative overflow-hidden bg-astra-cocoa text-white md:min-h-[543px]">
      <div className="absolute inset-0 hidden md:block">
        <Image src={dictionary.hero.image.src} alt={dictionary.hero.image.alt} fill priority sizes="100vw" className="object-cover object-[58%_center] md:object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(69deg,#403028_27%,rgba(64,48,40,0)_69%)]" />
      </div>
      <div className="container relative grid max-w-[1112px] gap-8 md:min-h-[543px] md:items-center md:py-14 lg:grid-cols-[627px_365px] lg:gap-[75px]">
        <div className="relative -mx-4 overflow-hidden px-4 py-14 md:mx-0 md:max-w-[640px] md:overflow-visible md:px-0 md:py-0">
          <Image src={dictionary.hero.image.src} alt={dictionary.hero.image.alt} fill priority sizes="100vw" className="object-cover object-[58%_center] md:hidden" />
          <div className="absolute inset-0 bg-[linear-gradient(69deg,#403028_24%,rgba(64,48,40,0.3)_100%)] md:hidden" />
          <div className="relative">
            <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">
              {dictionary.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-[42px] font-normal leading-[1.14] md:text-[51px]">
              {dictionary.hero.titleBeforeBreak}
              {" "}
              <br />
              {dictionary.hero.titleAfterBreakLead} <span className="font-bold text-astra-gold">{dictionary.hero.titleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-[525px] text-base leading-[1.6]">{dictionary.hero.description}</p>
            <div className="mt-5 flex flex-col gap-[22px] sm:flex-row">
              <PlannerDialogButton
                planner={dictionary.planner}
                className="h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
              >
                {dictionary.hero.primaryCta}
              </PlannerDialogButton>
              <Button
                asChild
                className="h-[54px] rounded-[9px] bg-astra-gold/45 px-[18px] text-base font-bold text-white hover:bg-astra-gold/55"
              >
                <a href="#itineraries">{dictionary.hero.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>
        <LeadPlanner planner={dictionary.planner} sectionId="planner" className="mb-12 mt-2 w-full md:mb-0 md:mt-0" />
      </div>
    </section>
  );
}

function ExperienceCategories({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <section id="experiences" className="bg-astra-cream py-16 md:py-[64px]">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <SectionHeading
          eyebrow={dictionary.experienceCategories.eyebrow}
          title={dictionary.experienceCategories.title}
          description={dictionary.experienceCategories.description}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch lg:gap-6">
          {dictionary.experienceCategories.items.map((item, index) => (
            <Link
              key={item.title}
              href={localizedHref(locale, item.href)}
              className={cn(
                "group flex h-full min-h-[470px] flex-col rounded-[10px] border border-[#403028]/20 bg-white p-2 shadow-[0_14px_40px_rgba(64,48,40,0.06)] outline-none transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(64,48,40,0.1)] focus-visible:ring-2 focus-visible:ring-astra-gold focus-visible:ring-offset-2",
                index === 1 && "md:min-h-[470px]"
              )}
            >
              <div className="relative h-[250px] overflow-hidden rounded-b rounded-t-lg md:h-[260px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                  className={cn("object-cover transition duration-500 group-hover:scale-105", index === 1 && "object-[center_44%]")}
                />
                <div className="absolute left-3 top-3 inline-flex h-[42px] items-center gap-2 rounded-md border border-astra-cocoa/15 bg-white/75 px-2 text-[15px] font-bold text-astra-cocoa backdrop-blur-sm">
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.eyebrow}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4 pb-[25px] pt-5">
                <h3 className="text-[19px] font-bold leading-[1.29] text-astra-cocoa">{item.title}</h3>
                {item.meta.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-4 text-xs font-bold leading-[1.6] text-astra-brown/85">
                    {item.meta.map((meta, metaIndex) => (
                      <span key={`${meta}-${metaIndex}`} className="inline-flex items-center gap-1.5">
                        <Check className="size-4 text-astra-gold" aria-hidden="true" />
                        {meta}
                      </span>
                    ))}
                  </div>
                ) : null}
                <p className="mt-4 text-[15px] leading-[1.6] text-astra-brown/85">{item.description}</p>
                <span className="mt-5 inline-flex h-[42px] items-center justify-between rounded-[5px] border border-astra-gold/40 bg-astra-gold/15 px-[15px] text-sm font-semibold leading-[1.6] text-astra-cocoa transition group-hover:bg-astra-gold/25">
                  {item.cta}
                  <span className="grid h-6 w-[59px] place-items-center rounded bg-astra-gold" aria-hidden="true">
                    <ArrowRight className="size-4" />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[920px] text-center text-base leading-[1.7] text-astra-brown/80">
          {dictionary.experienceCategories.descriptionBelow}
        </p>
        <TrustRow dictionary={dictionary} />
      </div>
    </section>
  );
}

function TrustRow({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <div className="grid w-full max-w-[770px] grid-cols-2 gap-[15px] lg:grid-cols-4">
        {dictionary.trust.items.map((item) => (
          <div key={item.label} className="grid h-[116px] place-items-center rounded-[10px] border border-astra-cocoa/10 bg-white px-3 text-center sm:h-[123px]">
            <div className="flex flex-col items-center gap-4">
              <TrustIcon icon={item.icon} />
              <p className="text-sm leading-[1.6] text-astra-brown">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm font-semibold leading-[1.6] text-astra-brown/70 md:text-base">
        Not sure what is right for you? <a href="#planner" className="font-bold text-astra-gold">{dictionary.trust.note.split("? ")[1]}</a>
      </p>
    </div>
  );
}

const trustIconAssets: Record<TrustItem["icon"], string> = {
  generosity: "/assets/figma/trust/gift-generosity.svg",
  service: "/assets/figma/trust/flag-quest-to-serve.svg",
  nature: "/assets/figma/trust/paw-love-animals-nature.svg",
  teamwork: "/assets/figma/trust/users-team-work.svg"
};

function TrustIcon({ icon }: { icon: TrustItem["icon"] }) {
  return <Image src={trustIconAssets[icon]} alt="" width={40} height={40} className="mb-[-3px] size-10 shrink-0" aria-hidden="true" />;
}
function WhySection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section id="why" className="bg-astra-cocoa py-16 text-white md:py-20">
      <div className="container grid max-w-[1225px] gap-12 lg:grid-cols-[373px_1fr] lg:gap-[84px]">
        <div>
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{dictionary.why.eyebrow}</p>
          <h2 className="mt-7 text-[32px] font-normal leading-[1.16] md:text-[44px]">
            {dictionary.why.titleLead} <span className="font-bold text-astra-gold">{dictionary.why.titleHighlight}</span>
          </h2>
          <p className="mt-7 text-xl font-semibold leading-[1.14]">{dictionary.why.plannerLabel}</p>
          <div className="mt-7 grid gap-4 text-base font-bold leading-[1.6] text-white/65">
            <ContactLink href={`https://wa.me/${dictionary.why.phone.replace(/\D/g, "")}`} icon={Phone}>
              {dictionary.why.phone}
            </ContactLink>
            <ContactLink href={`mailto:${dictionary.why.email}`} icon={Mail}>
              {dictionary.why.email}
            </ContactLink>
          </div>
          <PlannerDialogButton
            planner={dictionary.planner}
            className="mt-7 h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
          >
            {dictionary.why.cta}
          </PlannerDialogButton>
        </div>
        <div className="grid gap-x-[33px] gap-y-[38px] md:grid-cols-2 lg:gap-y-[51px]">
          {dictionary.why.items.map((item) => (
            <article key={`${item.title}-${item.icon}`} className="flex gap-4">
              <div className="w-0.5 shrink-0 rounded-full bg-astra-gold/15" />
              <div>
                <div className="flex min-h-10 items-center gap-[17px]">
                  <WhyIcon icon={item.icon} />
                  <h3 className="text-xl font-bold leading-[1.2] text-[#F4F1EC]">{item.title}</h3>
                </div>
                <p className="mt-1 text-base font-light leading-[1.5] text-[#C9BDB2]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyIcon({ icon }: { icon: WhyItem["icon"] }) {
  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#DABA87",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: 40,
    height: 40,
    className: "size-10 shrink-0",
    "aria-hidden": true
  };

  switch (icon) {
    case "compass":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "route":
      return (
        <svg {...commonProps}>
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...commonProps}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "gem":
      return (
        <svg {...commonProps}>
          <path d="M6 3h12l4 6-10 12L2 9Z" />
          <path d="M11 3 8 9l4 12 4-12-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    case "award":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="6" />
          <path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
  }
}

function ItinerariesSection({ locale, dictionary, recentTrips }: { locale: Locale; dictionary: HomeDictionary; recentTrips?: TripCard[] }) {
  return (
    <section id="itineraries" className="relative bg-astra-cream py-16 md:py-[72px]">
      <div className="container max-w-[1195px]">
        <SectionHeading
          eyebrow={dictionary.itineraries.eyebrow}
          title={
            <>
              {dictionary.itineraries.titleLead} <span className="font-bold">{dictionary.itineraries.titleHighlight}</span>{" "}
              {dictionary.itineraries.titleTrail}
            </>
          }
          description={dictionary.itineraries.description}
        />
        <div className="relative mt-10 overflow-hidden pb-16">
          <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {recentTrips && recentTrips.length > 0
              ? recentTrips.map((trip, index) => (
                  <a key={`${trip.slug}-${index}`} href={`/trip/${trip.slug}`} className="group flex h-[401px] flex-col overflow-hidden rounded-lg bg-astra-cocoa shadow-[0_18px_55px_rgba(64,48,40,0.15)] outline-none transition focus-visible:ring-2 focus-visible:ring-astra-gold focus-visible:ring-offset-2" aria-label={`See itinerary for ${trip.title}`}>
                    <div className="relative min-h-0 flex-1 overflow-hidden">
                      <img src={trip.image} alt={trip.imageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute right-4 top-4 rounded-[5px] border border-white/45 bg-astra-gold px-3 py-1 text-[11px] font-bold leading-[1.51] text-astra-cocoa backdrop-blur-md">from ${trip.priceValue?.toLocaleString('en-US')} USD</div>
                    </div>
                    <div className="bg-[#403028] px-5 pb-[25px] pt-5 text-white">
                      <h3 className="text-sm font-bold leading-[1.6]">{trip.title} - <span className="font-semibold">{trip.duration}</span></h3>
                      <span className="mt-4 inline-flex h-[27px] items-center rounded-full bg-astra-gold px-3 text-sm font-semibold leading-[1.6] text-astra-cocoa transition group-hover:bg-astra-gold/90">See Itinerary -&gt;</span>
                    </div>
                  </a>
                ))
              : dictionary.itineraries.items.map((item, index) => (
                  <ItineraryCard key={`${item.title}-${index}`} locale={locale} item={item} />
                ))
            }
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[190px] bg-gradient-to-b from-astra-cream/0 via-astra-cream/90 to-astra-cream"
          />
        </div>
        <div className="relative z-[100] mt-[-34px] text-center">
          <Button asChild className="h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
            <Link href={localizedHref(locale, "/trips")}>{dictionary.itineraries.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ItineraryCard({ locale, item }: { locale: Locale; item: Itinerary }) {
  return (
    <Link
      href={localizedSharedTripHref(locale)}
      className="group flex h-[401px] flex-col overflow-hidden rounded-lg bg-astra-cocoa shadow-[0_18px_55px_rgba(64,48,40,0.15)] outline-none transition focus-visible:ring-2 focus-visible:ring-astra-gold focus-visible:ring-offset-2"
      aria-label={`See itinerary for ${item.title}`}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 356px, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute right-4 top-4 rounded-[5px] border border-white/45 bg-astra-gold px-3 py-1 text-[11px] font-bold leading-[1.51] text-astra-cocoa backdrop-blur-md">
          {item.price}
        </div>
      </div>
      <div className="bg-[#403028] px-5 pb-[25px] pt-5 text-white">
        <h3 className="text-sm font-bold leading-[1.6]">
          {item.title} - <span className="font-semibold">{item.duration}</span>
        </h3>
        <span className="mt-4 inline-flex h-[27px] items-center rounded-full bg-astra-gold px-3 text-sm font-semibold leading-[1.6] text-astra-cocoa transition group-hover:bg-astra-gold/90">
          See Itinerary -&gt;
        </span>
      </div>
    </Link>
  );
}

function ImageStrip() {
  return (
    <section aria-label="Tanzania landscape gallery" className="relative -mt-[100px] bg-astra-cream">
      <div className="relative h-[230px] w-full overflow-hidden md:h-[322px] lg:h-[404px]">
        <Image src="/assets/figma/choose-tanzania-experience.png" alt="" fill sizes="(min-width: 768px) 100vw, 140vw" className="scale-[1.4] object-cover object-right md:scale-100 md:object-center" />
      </div>
    </section>
  );
}

function PlanningSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section id="about-us" className="bg-astra-cocoa py-16 text-white md:py-[98px]">
      <div className="container grid max-w-[1210px] gap-12 lg:grid-cols-[604px_542px] lg:gap-16">
        <PlanningImage image={dictionary.planning.image} />
        <div className="lg:flex lg:flex-col lg:justify-center">
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{dictionary.planning.eyebrow}</p>
          <h2 className="mt-5 text-[32px] font-normal leading-[1.3] md:text-[44px]">
            {dictionary.planning.titleLead}
            <br />
            <span className="font-bold text-astra-gold">{dictionary.planning.titleHighlight}</span>
          </h2>
          <div className="mt-5 flex max-w-[518px] flex-col gap-4 text-[15px] leading-[1.6] text-white/70">
            {dictionary.planning.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph.slice(0, 18)}-${index}`} className={index === 3 ? "font-bold" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PlannerDialogButton
              planner={dictionary.planner}
              className="h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
            >
              {dictionary.planning.cta}
            </PlannerDialogButton>
            <p className="text-lg font-bold leading-[1.6]">{dictionary.planning.aside}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanningImage({ image }: { image: HomeDictionary["planning"]["image"] }) {
  return (
    <div className="relative mx-auto aspect-[1520/1937] w-full max-w-[520px] lg:justify-self-center">
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-contain" />
    </div>
  );
}

function TeamSection({ dictionary }: { dictionary: HomeDictionary }) {
  const founder = teamMembers.find((member) => member.featured);
  const guides = teamMembers.filter((member) => !member.featured);

  return (
    <section id="our-team" className="bg-[linear-gradient(to_bottom,#403028_0%,#403028_48%,#FFF8F0_48%,#FFF8F0_100%)] px-0 pb-10 pt-[50px] text-astra-cocoa md:pb-12 md:pt-[50px]">
      <div className="container max-w-[1160px]">
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)]">
          <div className="flex h-full flex-col items-start justify-center gap-[14px] text-left">
            <p className="w-full max-w-[360px] text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">Who You&apos;ll Travel With</p>
            <h2 className="w-full max-w-[360px] text-[32px] font-medium leading-[1.18] text-white md:text-[44px] lg:text-[40px]">
              Meet the guides behind every safari
            </h2>
            <p className="w-full max-w-[360px] text-base font-semibold leading-[1.6] text-white/80">
              Every Astra Tanzania trip is led by a guide who has spent years reading this land. Here&apos;s who&apos;s waiting for you in the field.
            </p>
          </div>
          {founder ? <FounderCard member={founder} /> : null}
        </div>
        <div className="mt-7 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {guides.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
          <TeamCtaCard dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
}

function FounderCard({ member }: { member: TeamMember }) {
  return (
    <article className="grid items-stretch gap-6 rounded-[10px] border border-astra-cocoa/10 bg-white/20 p-5 shadow-[0_18px_45px_rgba(64,48,40,0.08)] md:grid-cols-[minmax(220px,280px)_1fr] xl:grid-cols-[320px_1fr] lg:gap-8 motion-safe:transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_50px_rgba(64,48,40,0.12)]">
      <TeamPhoto member={member} className="h-[320px] w-full rounded-[10px] md:h-full md:min-h-[300px]" tag="Founder" sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw" />
      <div className="px-0 py-1 lg:pr-7">
        <p className="text-[12.5px] font-bold uppercase leading-[1.6] tracking-[0.08em] text-[#C99A5D]">{member.role}</p>
        <h3 className="mt-2 text-[28px] font-bold leading-[1.18] text-white">{member.name}</h3>
        <p className="mt-4 max-w-[640px] text-[15px] font-medium leading-[1.7] text-white/80">{member.bio}</p>
      </div>
    </article>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group overflow-hidden rounded-[10px] border border-astra-cocoa/10 bg-white shadow-[0_18px_45px_rgba(64,48,40,0.08)] motion-safe:transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_50px_rgba(64,48,40,0.12)]">
      <TeamPhoto member={member} className="aspect-[4/3] rounded-t-[10px]" tag={member.role} sizes="(min-width: 1024px) 356px, (min-width: 640px) 50vw, 100vw" />
      <div className="px-5 pb-6 pt-5">
        <h4 className="text-[17px] font-bold leading-[1.3] text-astra-cocoa">{member.name}</h4>
        <p className="mt-2 text-[13.5px] font-medium leading-[1.55] text-astra-brown/75">{member.bio}</p>
      </div>
    </article>
  );
}

function TeamCtaCard({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <article className="flex min-h-[380px] flex-col justify-between rounded-[10px] border border-astra-cocoa/10 bg-astra-cocoa p-6 text-white shadow-[0_18px_45px_rgba(64,48,40,0.08)]">
      <div>
        <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">Plan With The Team</p>
        <h4 className="mt-4 text-[28px] font-bold leading-[1.12]">Ready to meet your guide?</h4>
        <p className="mt-4 text-[15px] font-medium leading-[1.6] text-white/75">
          Tell us what you want to see, and we will pair you with the right guide for your route, pace, and travel style.
        </p>
        <div className="mt-6 grid gap-3 text-[14px] font-bold leading-[1.4] text-white/85">
          <a href={`tel:${dictionary.topBar.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-4 transition hover:text-astra-gold">
            <Phone className="size-4 shrink-0 text-astra-gold" aria-hidden="true" />
            {dictionary.topBar.phone}
          </a>
          <a href={`mailto:${dictionary.topBar.email}`} className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-4 transition hover:text-astra-gold">
            <Mail className="size-4 shrink-0 text-astra-gold" aria-hidden="true" />
            {dictionary.topBar.email}
          </a>
        </div>
      </div>
      <PlannerDialogButton
        planner={dictionary.planner}
        className="mt-8 h-[54px] w-full rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
      >
        {dictionary.planning.cta}
      </PlannerDialogButton>
    </article>
  );
}

function TeamPhoto({ member, className, tag, sizes }: { member: TeamMember; className: string; tag: string; sizes: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-astra-cocoa/10", className)}>
      <Image src={member.photo.src} alt={member.photo.alt} fill sizes={sizes} className={cn("object-cover", member.featured && "object-[center_10%]")} />
      <span className="absolute left-3 top-3 rounded-full bg-astra-cocoa/75 px-3 py-1.5 text-xs font-bold leading-none text-white backdrop-blur-sm">
        {tag}
      </span>
    </div>
  );
}

function ReviewsSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="bg-astra-cream py-16 md:py-20">
      <div className="container max-w-[1280px]">
        <SectionHeading eyebrow={dictionary.reviews.eyebrow} title={dictionary.reviews.title} description={dictionary.reviews.description} />
        <div className="mt-10 columns-1 gap-6 lg:columns-2">
          {[...dictionary.reviews.items].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image))).map((review, index) => (
            <article key={`${review.author}-${index}`} className="mb-6 grid break-inside-avoid rounded-[10px] border border-astra-gold/20 bg-white p-6">
              {review.image ? (
                <div className="relative mb-6 aspect-[16/8.5] overflow-hidden rounded-[10px] bg-[#f5f7f8]">
                  <Image src={review.image.src} alt={review.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className={cn("object-cover", review.image.position ?? "object-center")} />
                </div>
              ) : null}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex gap-2 text-[#E0B880]" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-4 fill-[#E0B880] text-[#E0B880]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg font-medium leading-[1.5] tracking-[-0.26px] text-[#403028]">{review.quote}</p>
                </div>
                <div>
                  <p className="text-lg font-bold leading-[1.5] text-[#403028]">{review.author}</p>
                  <p className="text-base leading-[1.5] tracking-[-0.18px] text-[#6F6258]">{review.details}</p>
                </div>
              </div>
            </article>
          ))}
          <ReviewCtaCard dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
}

function ReviewCtaCard({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <article className="mb-6 flex min-h-[300px] break-inside-avoid flex-col justify-between rounded-[10px] border border-astra-cocoa/10 bg-astra-cocoa p-7 text-white shadow-[0_18px_45px_rgba(64,48,40,0.08)] lg:min-h-[340px]">
      <div>
        <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">Start Planning</p>
        <h3 className="mt-4 text-[30px] font-bold leading-[1.12]">Ready for your own safari story?</h3>
        <p className="mt-4 text-[15px] font-medium leading-[1.6] text-white/75">
          Share your dates, interests, and travel style. We will help shape a private Tanzania safari around you.
        </p>
        <div className="mt-6 grid gap-3 text-[14px] font-bold leading-[1.4] text-white/85">
          <a href={`tel:${dictionary.topBar.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-4 transition hover:text-astra-gold">
            <Phone className="size-4 shrink-0 text-astra-gold" aria-hidden="true" />
            {dictionary.topBar.phone}
          </a>
          <a href={`mailto:${dictionary.topBar.email}`} className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-4 transition hover:text-astra-gold">
            <Mail className="size-4 shrink-0 text-astra-gold" aria-hidden="true" />
            {dictionary.topBar.email}
          </a>
        </div>
      </div>
      <PlannerDialogButton
        planner={dictionary.planner}
        className="mt-8 h-[54px] w-full rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
      >
        {dictionary.hero.primaryCta}
      </PlannerDialogButton>
    </article>
  );
}

function FaqSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section id="faq" className="bg-astra-cream py-16 md:py-[70px]">
      <div className="container max-w-[846px]">
        <SectionHeading
          eyebrow={dictionary.faq.eyebrow}
          title={dictionary.faq.title}
          description={dictionary.faq.description}
          titleClassName="font-medium"
        />
        <div className="mt-4">
          <FaqList items={dictionary.faq.items} />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  titleClassName
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  titleClassName?: string;
}) {
  return (
    <div className="mx-auto flex max-w-[1084px] flex-col items-center gap-[14px] text-center">
      <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{eyebrow}</p>
      <h2 className={cn("text-[32px] font-medium leading-[1.4] text-astra-cocoa md:text-[44px]", titleClassName)}>{title}</h2>
      <p className="text-base leading-[1.6] text-astra-brown">{description}</p>
    </div>
  );
}

function ContactLink({
  href,
  icon: Icon,
  children
}: {
  href: string;
  icon: typeof Phone;
  children: string;
}) {
  return (
    <a href={href} className="inline-flex items-center gap-3 underline underline-offset-2 transition hover:text-white">
      <Icon className="size-[17px]" aria-hidden="true" />
      {children}
    </a>
  );
}
