import { ArrowRight, BadgeCheck, Check, CircleDollarSign, Headphones, Mail, MapPinned, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { FaqList } from "@/features/home/faq-list";
import { LeadPlanner } from "@/features/home/lead-planner";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary, Itinerary } from "@/i18n/types";
import { cn } from "@/utils/cn";
import { localizedHref } from "@/utils/routes";

const trustIcons = {
  camp: BadgeCheck,
  guide: MapPinned,
  priced: CircleDollarSign,
  support: Headphones
};

export function HomePage({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <main className="overflow-hidden bg-astra-cream text-astra-brown">
      <HeroSection dictionary={dictionary} />
      <ExperienceCategories locale={locale} dictionary={dictionary} />
      <WhySection dictionary={dictionary} />
      <ItinerariesSection locale={locale} dictionary={dictionary} />
      <ImageStrip />
      <PlanningSection dictionary={dictionary} />
      <ReviewsSection dictionary={dictionary} />
      <FaqSection dictionary={dictionary} />
      <FinalCtaSection dictionary={dictionary} />
    </main>
  );
}

function HeroSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="relative min-h-[543px] overflow-hidden bg-astra-cocoa text-white">
      <Image src={dictionary.hero.image.src} alt={dictionary.hero.image.alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(69deg,#403229_27%,rgba(64,50,41,0)_69%)]" />
      <div className="container relative grid min-h-[543px] max-w-[1112px] items-center gap-8 py-14 lg:grid-cols-[627px_365px] lg:gap-[75px]">
        <div className="max-w-[640px]">
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
            <Button asChild className="h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
              <a href="#planner">{dictionary.hero.primaryCta}</a>
            </Button>
            <Button
              asChild
              className="h-[54px] rounded-[9px] bg-astra-gold/45 px-[18px] text-base font-bold text-white hover:bg-astra-gold/55"
            >
              <a href="#itineraries">{dictionary.hero.secondaryCta}</a>
            </Button>
          </div>
        </div>
        <LeadPlanner planner={dictionary.planner} sectionId="planner" className="w-full" />
      </div>
    </section>
  );
}

function ExperienceCategories({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <section id="experiences" className="bg-astra-cream py-16 md:py-[64px]">
      <div className="container max-w-[1113px]">
        <SectionHeading
          eyebrow={dictionary.experienceCategories.eyebrow}
          title={dictionary.experienceCategories.title}
          description={dictionary.experienceCategories.description}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:items-end lg:gap-[9px]">
          {dictionary.experienceCategories.items.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "rounded-[10px] border border-[#795b35]/20 bg-white p-2 shadow-[0_14px_40px_rgba(64,50,41,0.06)]",
                index === 1 ? "md:min-h-[472px]" : "md:min-h-[475px]"
              )}
            >
              <div className={cn("relative h-[219px] overflow-hidden rounded-t-lg rounded-b", index === 1 && "h-[250px] md:h-[244px]")}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={cn("object-cover", index === 1 && "object-[center_44%]")}
                />
                <div className="absolute left-3 top-3 inline-flex h-[42px] items-center gap-2 rounded-md border border-astra-cocoa/15 bg-white/75 px-2 text-[15px] font-bold text-astra-cocoa backdrop-blur-sm">
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.eyebrow}</span>
                </div>
              </div>
              <div className="flex min-h-[226px] flex-col px-4 pb-6 pt-5">
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
                <p className="mt-4 flex-1 text-[15px] leading-[1.6] text-astra-brown/85">{item.description}</p>
                <Link
                  href={localizedHref(locale, item.href)}
                  className="mt-5 inline-flex h-[42px] items-center justify-between rounded-[5px] border border-astra-gold/40 bg-astra-gold/15 px-[15px] text-sm font-semibold leading-[1.6] text-astra-cocoa transition hover:bg-astra-gold/25"
                >
                  {item.cta}
                  <span className="grid h-6 w-[59px] place-items-center rounded bg-astra-gold" aria-hidden="true">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <TrustRow dictionary={dictionary} />
      </div>
    </section>
  );
}

function TrustRow({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <div className="grid w-full max-w-[770px] gap-[15px] sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.trust.items.map((item) => (
          <div key={item.label} className="grid h-[123px] place-items-center rounded-[10px] border border-astra-cocoa/10 bg-white px-3 text-center">
            <div className="flex flex-col items-center gap-4">
              <TrustIcon icon={item.icon} />
              <p className="text-sm leading-[1.6] text-astra-brown">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs leading-[1.6] text-astra-brown/55">
        Not sure what is right for you? <a href="#planner" className="font-bold text-astra-gold">{dictionary.trust.note.split("? ")[1]}</a>
      </p>
    </div>
  );
}

function TrustIcon({ icon }: { icon: keyof typeof trustIcons }) {
  const Icon = trustIcons[icon];

  return <Icon className="size-[38px] text-astra-gold" aria-hidden="true" />;
}

function WhySection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section id="why" className="bg-astra-cocoa py-16 text-white md:py-20">
      <div className="container grid max-w-[1225px] gap-12 lg:grid-cols-[373px_1fr] lg:gap-[84px]">
        <div>
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{dictionary.why.eyebrow}</p>
          <h2 className="mt-7 text-[44px] font-normal leading-[1.16] md:text-[49px]">
            {dictionary.why.titleLead} <span className="font-bold text-astra-gold">{dictionary.why.titleHighlight}</span>
          </h2>
          <p className="mt-7 text-xl font-semibold leading-[1.14]">{dictionary.why.plannerLabel}</p>
          <div className="mt-7 grid gap-4 text-base font-bold leading-[1.6] text-white/65">
            <ContactLink href={`tel:${dictionary.why.phone.replace(/\s/g, "")}`} icon={Phone}>
              {dictionary.why.phone}
            </ContactLink>
            <ContactLink href={`mailto:${dictionary.why.email}`} icon={Mail}>
              {dictionary.why.email}
            </ContactLink>
          </div>
          <Button asChild className="mt-7 h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
            <a href="#planner">{dictionary.why.cta}</a>
          </Button>
        </div>
        <div className="grid gap-x-[33px] gap-y-[38px] md:grid-cols-2 lg:gap-y-[51px]">
          {dictionary.why.items.map((item) => (
            <article key={`${item.title}-${item.icon}`} className="flex min-h-[146px] gap-4">
              <div className="w-0.5 shrink-0 rounded-full bg-astra-gold/15" />
              <div>
                <div className="text-[40px] leading-[1]">{item.icon}</div>
                <h3 className="mt-[-30px] ps-[57px] text-xl font-bold leading-[1.8]">{item.title}</h3>
                <p className="mt-1 text-base leading-[1.8] text-white/70">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ItinerariesSection({ locale, dictionary }: { locale: Locale; dictionary: HomeDictionary }) {
  return (
    <section id="itineraries" className="bg-astra-cream py-16 md:py-[72px]">
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
          titleClassName="md:text-[46px]"
        />
        <div className="mt-10 grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {dictionary.itineraries.items.map((item, index) => (
            <ItineraryCard key={`${item.title}-${index}`} locale={locale} item={item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
            <Link href={localizedHref(locale, "/itineraries")}>{dictionary.itineraries.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ItineraryCard({ locale, item }: { locale: Locale; item: Itinerary }) {
  return (
    <article className="group relative h-[401px] overflow-hidden rounded-lg bg-astra-cocoa shadow-[0_18px_55px_rgba(64,50,41,0.15)]">
      <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 356px, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute right-4 top-4 rounded-[5px] border border-white/45 bg-astra-gold/60 px-3 py-1 text-[11px] font-bold leading-[1.51] text-astra-cocoa backdrop-blur-md">
        {item.price}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[115px] rounded-b-lg bg-[#654d38]/40 p-5 text-white backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-white/15" />
        <h3 className="text-sm font-bold leading-[1.6]">
          {item.title} - <span className="font-normal">{item.duration}</span>
        </h3>
        <p className="mt-1 text-sm leading-[1.51]">
          {item.route} - {item.season}
        </p>
        <Link
          href={localizedHref(locale, `/trips/${item.slug}`)}
          className="mt-3 inline-flex h-[27px] items-center rounded-full bg-astra-gold px-3 text-sm font-medium leading-[1.6] text-astra-cocoa transition hover:bg-astra-gold/90"
        >
          See Itinerary -&gt;
        </Link>
      </div>
    </article>
  );
}

function ImageStrip() {
  return (
    <section aria-label="Tanzania landscape gallery" className="bg-astra-cream">
      <div className="relative h-[230px] w-full overflow-hidden md:h-[322px] lg:h-[404px]">
        <Image src="/assets/figma/experience-strip.png" alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}

function PlanningSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section id="planning" className="bg-astra-cocoa py-16 text-white md:py-[98px]">
      <div className="container grid max-w-[1210px] gap-12 lg:grid-cols-[604px_542px] lg:gap-16">
        <PlanningImage image={dictionary.planning.image} />
        <div>
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{dictionary.planning.eyebrow}</p>
          <h2 className="mt-5 text-[44px] font-normal leading-[1.3] md:text-[49px]">
            {dictionary.planning.titleLead}
            <br />
            <span className="font-bold text-astra-gold">{dictionary.planning.titleHighlight}</span>
          </h2>
          <div className="mt-5 flex max-w-[518px] flex-col gap-4 text-[15px] leading-[1.6]">
            {dictionary.planning.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph.slice(0, 18)}-${index}`} className={index === 4 ? "font-bold" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild className="h-[54px] rounded-[9px] bg-astra-gold px-[21px] text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
              <a href="#planner">{dictionary.planning.cta}</a>
            </Button>
            <p className="text-lg font-bold leading-[1.6]">{dictionary.planning.aside}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanningImage({ image }: { image: HomeDictionary["planning"]["image"] }) {
  return (
    <div className="relative mx-auto aspect-[1074/710] w-full max-w-[604px] overflow-hidden rounded-[21px] border border-white/35 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 604px, 100vw" className="object-cover" />
    </div>
  );
}

function ReviewsSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="bg-astra-cream py-16 md:py-20">
      <div className="container max-w-[1280px]">
        <SectionHeading eyebrow={dictionary.reviews.eyebrow} title={dictionary.reviews.title} description={dictionary.reviews.description} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {dictionary.reviews.items.map((review, index) => (
            <article key={`${review.author}-${index}`} className="grid gap-6 rounded-[10px] border border-astra-gold/50 bg-white p-6 sm:grid-cols-[200px_1fr]">
              <div className="relative h-[182px] overflow-hidden rounded-[10px] bg-[#f5f7f8]">
                <Image src={review.image.src} alt={review.image.alt} fill sizes="200px" className="object-cover" />
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <div className="flex gap-2 text-astra-gold" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg font-medium leading-[1.5] tracking-[-0.26px] text-[#2e3138]">{review.quote}</p>
                </div>
                <div>
                  <p className="text-lg font-bold leading-[1.5] text-[#2e3138]">{review.author}</p>
                  <p className="text-base leading-[1.5] tracking-[-0.18px] text-[#5e6573]">{review.details}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
          titleClassName="font-medium md:text-[53px]"
        />
        <div className="mt-4">
          <FaqList items={dictionary.faq.items} />
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="relative bg-astra-cocoa px-4 pb-16 pt-8 text-white">
      <div className="relative z-[100] mx-auto mb-[-34px] flex max-w-[628px] flex-col gap-4 rounded-[10px] bg-astra-gold p-3 text-[#2e3138] shadow-[0_15px_35px_rgba(64,50,41,0.2)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold leading-[1.5] tracking-[-0.08px]">Couldn&apos;t find the answer you&apos;re looking for?</p>
          <p className="text-xs leading-[1.5]">Description can be added here. <a href="#planner" className="font-medium">Link button</a></p>
        </div>
        <Button asChild className="h-10 rounded-lg bg-astra-cocoa px-4 text-sm font-medium text-white hover:bg-astra-brown">
          <a href={`https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`}>{dictionary.finalCta.whatsappCta}</a>
        </Button>
      </div>
      <div className="container max-w-[1230px]">
        <div className="relative overflow-hidden rounded-2xl border border-white/30">
          <Image src={dictionary.finalCta.background.src} alt={dictionary.finalCta.background.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(86deg,#403229_3%,rgba(64,50,41,0.21)_99%)]" />
          <div className="relative grid min-h-[560px] gap-10 px-6 py-16 md:px-16 lg:grid-cols-[611px_365px] lg:items-center lg:gap-[72px] lg:px-[97px]">
            <div>
              <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{dictionary.finalCta.eyebrow}</p>
              <h2 className="mt-6 max-w-[572px] text-[40px] font-normal leading-[1.3] md:text-[49px]">
                {dictionary.finalCta.titleLead}
                <br />
                <span className="text-[34px] font-bold text-astra-gold">{dictionary.finalCta.titleHighlight}</span>
              </h2>
              <p className="mt-6 max-w-[504px] text-[15px] leading-[1.6] text-white/70">{dictionary.finalCta.description}</p>
              <Button asChild className="mt-6 h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
                <a href="#planner">{dictionary.header.plannerCta}</a>
              </Button>
              <p className="mt-7 max-w-[611px] text-xs font-bold italic leading-[1.6]">{dictionary.finalCta.aside}</p>
            </div>
            <LeadPlanner planner={dictionary.planner} sectionId="final-planner" className="w-full" />
          </div>
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
      <h2 className={cn("text-[34px] font-medium leading-[1.4] text-astra-cocoa md:text-[40px]", titleClassName)}>{title}</h2>
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
