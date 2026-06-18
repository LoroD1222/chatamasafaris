"use client";

import { ArrowRight, Binoculars, Check, ChevronDown, Heart, Mail, Phone, Star, UsersRound, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import type { HomeDictionary } from "@/i18n/types";
import { faqs, galleryImages, includedItems, itineraryDays, sharedTripSlug, tripCards } from "@/features/trips/trip-data";

type TripPageProps = {
  dictionary: HomeDictionary;
};

const navLinks = [
  { label: "Itineraries", href: "/trips" },
  { label: "Safaris", href: "/safaris" },
  { label: "Kilimanjaro", href: "/kilimanjaro" },
  { label: "Discover Tanzania", href: "/discover-tanzania" }
];

export function TripsListPage({ dictionary }: TripPageProps) {
  return (
    <div className="min-h-screen bg-[#fdfaf3] text-[#403229]">
      <TripHeader dictionary={dictionary} />
      <main>
        <section className="mx-auto max-w-[1195px] px-5 pb-[116px] pt-[64px] md:pt-[62px]">
          <div className="text-center">
            <p className="text-[13px] font-semibold leading-[1.6]">
              <Link href="/trips" className="text-[#6d5b4c]/75">
                Tanzania
              </Link>
              <span className="mx-3 text-[#6d5b4c]/45">&gt;</span>
              <span className="font-bold text-[#403229]">Safari</span>
            </p>
            <h1 className="mt-8 text-[34px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#403229] md:text-[43px]">
              Tanzania safari in 2026 - 2027
            </h1>
          </div>

          <TripFilterBar />

          <div className="mt-[34px] text-center">
            <p className="inline-flex rounded-full border border-[#e2b87f]/75 bg-[#fff8e8] px-5 py-2 text-[12px] font-bold leading-none text-[#e2b87f]">
              ? The itineraries shown are examples - your journey will be personally tailored to you.
            </p>
          </div>

          <TripCardGrid className="mt-[57px]" />

          <p className="mx-auto mt-[88px] max-w-[960px] text-center text-[15px] font-semibold leading-[1.6] text-[#403229]/70">
            Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.
          </p>
        </section>

        <FinalCtaFooter dictionary={dictionary} />
      </main>
    </div>
  );
}

export function TripDetailPage({ dictionary }: TripPageProps) {
  return (
    <div className="min-h-screen bg-[#fdfaf3] text-[#403229]">
      <TripHeader dictionary={dictionary} />
      <main>
        <section className="mx-auto max-w-[1197px] px-5 pb-[76px] pt-[65px]">
          <p className="text-[17px] font-semibold leading-none text-[#403229]/58">
            Tanzania <span className="mx-2">&gt;</span> Safari <span className="mx-2">&gt;</span>{" "}
            <span className="text-[#403229]">Great Migration</span>
          </p>
          <h1 className="mt-[34px] text-[31px] font-semibold leading-[1.14] tracking-[-0.01em] text-[#403229] md:text-[37px]">
            Great Migration & River Crossing in Serengeti
          </h1>

          <div className="mt-[26px] grid gap-7 lg:grid-cols-[708px_448px]">
            <HeroGallery />
            <TripSummaryCard dictionary={dictionary} />
          </div>

          <BuiltForSection dictionary={dictionary} />
        </section>

        <TripTabs />

        <section id="overview" className="mx-auto grid max-w-[1197px] gap-10 px-5 py-[84px] lg:grid-cols-[680px_448px]">
          <OverviewText />
          <PlannerQuoteCard dictionary={dictionary} />
        </section>

        <section className="mx-auto grid max-w-[1197px] gap-8 px-5 pb-[84px] lg:grid-cols-[879px_1fr]">
          <div className="relative overflow-hidden rounded-[3px]">
            <Image src="/assets/trips/trip-map.png" alt="Three day mid-range Tanzania safari map" width={879} height={705} className="h-auto w-full" />
          </div>
          <aside className="self-center rounded-[2px] border border-[#e2b87f]/25 bg-white p-8 shadow-[0_20px_45px_rgba(64,50,41,0.08)]">
            <h2 className="text-[24px] font-semibold leading-[1.18]">Is this tour for me?</h2>
            <div className="mt-5 h-px bg-[#403229]/13" />
            <p className="mt-5 text-[14px] font-bold leading-[1.6]">Age Requirements: 3+</p>
            <p className="mt-2 text-[14px] font-bold leading-[1.6]">Trip Type: Private Group</p>
            <p className="mt-4 text-[13px] font-semibold leading-[1.65] text-[#403229]/70">
              Travel on your own schedule with full flexibility in dates, pace, and itinerary. Pricing is tailored to your private group size, and you can enjoy a fully customized experience.
            </p>
          </aside>
        </section>

        <ItinerarySection />
        <IncludedSection />
        <BestTimeSection />
        <WidePlannerBand dictionary={dictionary} />
        <ReviewsSection />
        <StopPlanningSection dictionary={dictionary} />
        <SimilarTripsSection />
        <FaqSection />
        <FinalCtaFooter dictionary={dictionary} compact />
      </main>
    </div>
  );
}

function TripHeader({ dictionary }: TripPageProps) {
  return (
    <header className="bg-[#fdfaf3] text-[#403229]">
      <div className="bg-[#e2b87f]">
        <div className="mx-auto flex h-[37px] max-w-[1150px] items-center justify-between px-5 text-[13px] font-bold leading-[1.6] text-[#403229]/60">
          <p className="hidden items-center gap-2 uppercase tracking-[0.08em] sm:flex">
            <Image src="/assets/figma/nav-bar-star.png" alt="" width={18} height={18} className="size-[18px] object-contain" aria-hidden="true" />
            Safari Operator for USA Travelers
          </p>
          <div className="ms-auto flex items-center gap-7">
            <a href={`tel:${dictionary.topBar.phone.replace(/\s/g, "")}`} className="hidden items-center gap-1 underline underline-offset-2 md:inline-flex">
              <Phone className="size-3.5" aria-hidden="true" />
              {dictionary.topBar.phone}
            </a>
            <a href={`mailto:${dictionary.topBar.email}`} className="inline-flex items-center gap-1 underline underline-offset-2">
              <Mail className="size-3.5" aria-hidden="true" />
              {dictionary.topBar.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-[#403229]/10 bg-[#fdfaf3]">
        <div className="mx-auto flex h-[100px] max-w-[1150px] items-center justify-between gap-8 px-5">
          <Link href="/trips" className="relative h-[92px] w-[219px] shrink-0" aria-label="Astra Tanzania Safaris">
            <Image src="/assets/figma/logo-header.png" alt="Astra Tanzania Safaris" fill priority sizes="219px" className="object-contain" />
          </Link>
          <nav className="hidden items-center gap-8 text-[15px] font-semibold leading-[1.6] md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-[#b88441]">
                {link.label}
              </Link>
            ))}
          </nav>
          <PlannerDialogButton
            planner={dictionary.planner}
            className="hidden h-[54px] rounded-[9px] bg-[#e2b87f] px-[21px] text-[16px] font-bold text-[#403229] hover:bg-[#d9aa67] md:inline-flex"
          >
            Talk to Safari Planner
          </PlannerDialogButton>
          <PlannerDialogButton
            planner={dictionary.planner}
            className="h-11 rounded-[9px] bg-[#e2b87f] px-4 text-[13px] font-bold text-[#403229] hover:bg-[#d9aa67] md:hidden"
          >
            Planner
          </PlannerDialogButton>
        </div>
      </div>
    </header>
  );
}

function TripFilterBar() {
  return (
    <div className="mx-auto mt-[72px] grid max-w-[766px] overflow-hidden rounded-[2px] border border-[#403229]/12 bg-white md:grid-cols-[1fr_1.15fr]">
      <div className="border-b border-[#403229]/12 px-5 py-4 md:border-b-0 md:border-r">
        <p className="text-[12px] font-bold leading-[1.4]">Duration:</p>
        <div className="mt-4 flex flex-wrap gap-5">
          {[1, 2, 3].map((item) => (
            <label key={item} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#403229]/60">
              <span className="size-[18px] border border-[#403229]/12 bg-[#fdfaf3]" aria-hidden="true" />
              2 to 5 days
            </label>
          ))}
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-[12px] font-bold leading-[1.4]">Filter by price:</p>
        <div className="mt-4">
          <div className="relative h-[14px]">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#e2b87f]/45" />
            <div className="absolute left-0 top-1/2 size-[14px] -translate-y-1/2 rounded-full bg-[#e2b87f]" />
            <div className="absolute left-[74%] top-1/2 size-[14px] -translate-y-1/2 rounded-full bg-[#e2b87f]" />
          </div>
          <div className="mt-2 flex justify-between text-[12px] font-semibold text-[#e2b87f]">
            <span>500$</span>
            <span>5043$</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCardGrid({ className = "", limit }: { className?: string; limit?: number }) {
  const cards = typeof limit === "number" ? tripCards.slice(0, limit) : tripCards;

  return (
    <div className={`mx-auto grid max-w-[1111px] gap-x-[18px] gap-y-[14px] md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {cards.map((trip, index) => (
        <Link
          key={`${trip.slug}-${index}`}
          href={`/trip/${sharedTripSlug}`}
          className="group relative h-[401px] overflow-hidden rounded-[8px] bg-[#403229] text-white outline-none transition focus-visible:ring-2 focus-visible:ring-[#e2b87f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf3]"
        >
          <Image
            src={trip.image}
            alt={trip.imageAlt}
            fill
            sizes="(min-width: 1024px) 356px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-[115px] rounded-b-[8px] bg-[#654d38]/60 backdrop-blur-[2.5px]" />
          <div className="absolute inset-x-0 bottom-[113px] h-[3px] bg-white/15" />
          <div className="absolute right-[18px] top-[18px] rounded-[5px] border border-white/45 bg-[#e2b87f]/60 px-3 py-1 text-[11px] font-bold leading-[1.5] text-[#4a351c] backdrop-blur">
            {trip.price}
          </div>
          <div className="absolute bottom-[25px] left-[19px] right-[19px]">
            <h2 className="text-[14px] font-bold leading-[1.6]">
              {trip.title} - <span className="font-semibold">{trip.duration}</span>
            </h2>
            <p className="text-[14px] font-semibold leading-[1.51] text-white/85">
              {trip.route} - {trip.season}
            </p>
            <span className="mt-3 inline-flex h-[27px] items-center gap-1 rounded-full bg-[#e2b87f] px-3 text-[14px] font-semibold leading-none text-[#4a351c]">
              See Itinerary
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function HeroGallery() {
  return (
    <div>
      <div className="relative h-[448px] overflow-hidden rounded-[2px] bg-[#403229]">
        <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill priority sizes="707px" className="object-cover" />
        <div className="absolute left-[17px] top-[17px] rounded-[5px] bg-[#e2b87f] px-[13px] py-[10px] text-[15px] font-bold leading-none text-[#403229]">
          Top Seller
        </div>
      </div>
      <div className="mt-[17px] grid grid-cols-4 gap-[10px]">
        {galleryImages.map((image) => (
          <div key={image.src} className="relative h-[110px] overflow-hidden rounded-[2px]">
            <Image src={image.src} alt={image.alt} fill sizes="169px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TripSummaryCard({ dictionary }: TripPageProps) {
  return (
    <aside className="rounded-[2px] border border-[#403229]/12 bg-white shadow-[0_22px_44px_rgba(64,50,41,0.08)]">
      <div className="px-6 py-6">
        <div className="flex items-center gap-3 border-b border-[#403229]/13 pb-5">
          <Star className="size-8 fill-[#e2b87f] text-[#e2b87f]" aria-hidden="true" />
          <p className="text-[18px] font-bold leading-[1.45]">5.0 Tour rating</p>
        </div>
        <dl className="grid gap-4 border-b border-[#403229]/13 py-5 text-[16px] leading-[1.6]">
          <div className="grid grid-cols-[140px_1fr]">
            <dt className="font-semibold text-[#403229]/65">Physical rating</dt>
            <dd className="font-bold">Easy</dd>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <dt className="font-semibold text-[#403229]/65">Tour Start</dt>
            <dd className="font-bold">All seasons</dd>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <dt className="font-semibold text-[#403229]/65">Duration</dt>
            <dd className="font-bold">3 days</dd>
          </div>
        </dl>
        <p className="mt-5 min-h-[206px] text-[15px] font-semibold leading-[1.65] text-[#403229]/66">
          This morning is yours to enjoy at a relaxed pace. Have a peaceful breakfast at the lodge and take some time to soak in the surroundings before your departure. Most flights usually depart around 10-11 AM, so you will leave the lodge at a comfortable time.
        </p>
        <PlannerDialogButton planner={dictionary.planner} className="mt-4 h-[42px] w-full rounded-[2px] bg-[#e2b87f] px-4 text-[15px] font-bold text-[#403229] hover:bg-[#d9aa67]">
          Request a quote
        </PlannerDialogButton>
      </div>
    </aside>
  );
}

function BuiltForSection({ dictionary }: TripPageProps) {
  const items = [
    { label: "Couples & honeymooners", Icon: Heart },
    { label: "First-time safari travelers", Icon: Binoculars },
    { label: "Families with limited time", Icon: UsersRound },
    { label: "Zanzibar visitors adding wildlife", Icon: Waves }
  ];

  return (
    <section className="mt-[28px] grid gap-8 lg:grid-cols-[688px_448px]">
      <div>
        <h2 className="text-[31px] font-semibold leading-[1.13]">Who this safari is built for?</h2>
        <p className="mt-[29px] max-w-[663px] text-[16px] font-semibold leading-[1.65] text-[#403229]/70">
          Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.
        </p>
        <div className="mt-[25px] grid gap-6 sm:grid-cols-2">
          {items.map(({ label, Icon }) => (
            <p key={label} className="flex items-center gap-4 text-[18px] font-bold leading-[1.5]">
              <Icon className="size-9 shrink-0 text-[#e2b87f]" strokeWidth={1.8} aria-hidden="true" />
              {label}
            </p>
          ))}
        </div>
      </div>
      <aside className="rounded-[2px] border border-[#403229]/12 bg-white p-7">
        <p className="text-[26px] font-bold leading-none text-[#e2b87f]">
          4.9
          <span className="ml-3 text-[18px]">*****</span>
        </p>
        <p className="mt-3 text-[15px] font-semibold leading-[1.6] text-[#403229]/75">
          Review from TripAdvisor &quot;The river crossing was unlike anything I&apos;ve ever seen in my life.&quot;
        </p>
        <div className="my-5 h-px bg-[#403229]/13" />
        <p className="text-[15px] font-semibold leading-[1.6]">For extra information please contact us</p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-bold leading-[1.6] text-[#403229]/65">
          <a href={`tel:${dictionary.topBar.phone.replace(/\s/g, "")}`}>{dictionary.topBar.phone}</a>
          <a href={`mailto:${dictionary.topBar.email}`}>{dictionary.topBar.email}</a>
        </p>
      </aside>
    </section>
  );
}

function TripTabs() {
  const tabs = ["Overview", "Packing List", "Itinirary", "Price", "Visa and Documents", "Includes"];

  return (
    <nav className="border-y border-[#403229]/8 bg-[#fff4dc]" aria-label="Trip sections">
      <div className="mx-auto flex h-[53px] max-w-[1101px] items-center gap-[30px] overflow-x-auto px-5 text-[15px] font-bold leading-[1.6] text-[#403229]/70">
        {tabs.map((tab, index) => (
          <a key={tab} href={index === 0 ? "#overview" : "#"} className={index === 0 ? "relative flex h-full items-center text-[#403229]" : "flex h-full items-center"}>
            {tab}
            {index === 0 ? <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#e2b87f]" /> : null}
          </a>
        ))}
      </div>
    </nav>
  );
}

function OverviewText() {
  return (
    <div>
      <h2 className="sr-only">Overview</h2>
      <p className="whitespace-pre-line text-[15px] font-semibold leading-[1.68] text-[#403229]/74">
        {`Overview

Tanzania is one of those trips people talk about for the rest of their lives - but only if you do it right. The Serengeti, Zanzibar, Kilimanjaro. It's all here, and it's all within reach. The hard part isn't getting to Tanzania. It's knowing who to trust to get you there.

That's where we come in. We're Astra Tanzania - a small team based in Arusha with one job: building Tanzania trips that actually deliver what the photos promise. Not a call center. Not a booking engine. Real people who live here, know the parks, and answer your WhatsApp.

Tell us your dates, how many people, and what matters most to you. We'll handle everything else - from which park to visit in your month, to what's included in every dollar you spend. No hidden fees. No vague itineraries. No surprises when you land.

Immerse yourself in local culture, meet the Maasai, and experience Tanzania's breathtaking landscapes. With a focus on sustainable travel, we create unforgettable adventures while supporting local communities.`}
      </p>
    </div>
  );
}

function PlannerQuoteCard({ dictionary }: TripPageProps) {
  return (
    <aside className="rounded-[2px] border border-[#403229]/12 bg-white p-6 shadow-[0_18px_45px_rgba(64,50,41,0.08)]">
      <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-[#e2b87f]">Free, no commitment</p>
      <h2 className="mt-2 text-[25px] font-semibold leading-[1.14]">Talk to a safari planner</h2>
      <p className="mt-3 text-[12px] font-semibold leading-[1.4] text-[#403229]/75">This morning is yours to enjoy at a relaxed pace. Have a peaceful breakfast at the lodge and</p>
      <PlannerFields className="mt-5" />
      <PlannerDialogButton planner={dictionary.planner} className="mt-4 h-[42px] w-full rounded-[2px] bg-[#e2b87f] text-[15px] font-bold text-[#403229] hover:bg-[#d9aa67]">
        Request a quote
      </PlannerDialogButton>
    </aside>
  );
}

function PlannerFields({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-[16px] ${className}`}>
      <input aria-label="Your name" placeholder="Your name" className="h-[47px] border border-[#654a29]/15 bg-[#fdfaf3] px-4 text-[13px] font-bold text-[#403229] placeholder:text-[#403229]/55" />
      <div className="grid gap-[16px] sm:grid-cols-2">
        <input aria-label="Whatsapp number" placeholder="Whatsapp number" className="h-[47px] border border-[#654a29]/15 bg-[#fdfaf3] px-4 text-[12px] font-bold text-[#403229] placeholder:text-[#403229]/55" />
        <input aria-label="Email" placeholder="Email" className="h-[47px] border border-[#654a29]/15 bg-[#fdfaf3] px-4 text-[12px] font-bold text-[#403229] placeholder:text-[#403229]/55" />
      </div>
      <input aria-label="How many people" placeholder="How many people" className="h-[47px] border border-[#654a29]/15 bg-[#fdfaf3] px-4 text-[13px] font-bold text-[#403229] placeholder:text-[#403229]/55" />
    </div>
  );
}

function ItinerarySection() {
  return (
    <section className="mx-auto max-w-[1101px] px-5 py-[58px]">
      <h2 className="text-[28px] font-semibold leading-[1.2]">Trip Itinirary</h2>
      <div className="mt-[39px] grid gap-[30px]">
        {itineraryDays.map((day, index) => (
          <article key={day.day} className="grid overflow-hidden rounded-[4px] border border-[#403229]/10 bg-white shadow-[0_14px_35px_rgba(64,50,41,0.06)] lg:grid-cols-[454px_1fr]">
            <div className="grid gap-5 p-5">
              <div className="relative h-[207px] overflow-hidden rounded-[3px]">
                <Image src="/assets/trips/trip-hero-zebras.png" alt="Zebras in Serengeti" fill sizes="454px" className="object-cover" />
              </div>
              <div className="relative h-[207px] overflow-hidden rounded-[3px]">
                <Image src="/assets/figma/planning-center.jpg" alt="Ahadi Lodge accommodation" fill sizes="454px" className="object-cover" />
                <span className="absolute left-4 top-4 rounded bg-white px-3 py-2 text-[11px] font-bold text-[#403229]">AHADI LODGE</span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">{day.day}</p>
              <h3 className="mt-2 max-w-[390px] text-[26px] font-semibold leading-[1.12]">{day.title}</h3>
              <p className="mt-5 text-[13px] font-semibold leading-[1.7] text-[#403229]/68">{day.description}</p>
              <div className="mt-8 flex gap-4">
                <span className="mt-1 size-4 rounded-[2px] bg-[#e2b87f]" aria-hidden="true" />
                <div>
                  <h4 className="text-[21px] font-semibold leading-[1.2]">Accommodations:</h4>
                  <p className="mt-3 text-[13px] font-semibold leading-[1.7] text-[#403229]/68">
                    Tanzania is one of those trips people talk about for the rest of their lives. {day.accommodation} keeps the stay relaxed and comfortable.
                  </p>
                </div>
              </div>
              {index < itineraryDays.length - 1 ? <div className="mt-7 h-px bg-[#403229]/10" /> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function IncludedSection() {
  return (
    <section className="mx-auto grid max-w-[1101px] gap-10 px-5 py-[60px] lg:grid-cols-[731px_317px]">
      <div>
        <div className="flex items-center gap-4">
          <h2 className="shrink-0 text-[30px] font-semibold leading-[1.2]">What is included?</h2>
          <div className="h-[3px] flex-1 bg-[#e2b87f]" />
        </div>
        <ul className="mt-10 grid gap-x-9 gap-y-5 sm:grid-cols-2">
          {includedItems.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center gap-3 text-[13px] font-semibold leading-[1.5] text-[#403229]/75">
              <span className="grid size-[25px] shrink-0 place-items-center rounded-full bg-[#e2b87f] text-[#403229]">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative min-h-[357px] overflow-hidden rounded-[2px]">
        <Image src="/assets/trips/trip-included.png" alt="Safari landscape included in trip" fill sizes="317px" className="object-cover" />
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-center text-[22px] font-semibold leading-[1.4]">All-inclusive rates in USD</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[1, 1, 1, 1, 1, 1].map((_, index) => (
            <div key={index} className="bg-white px-5 py-4 text-center shadow-[0_10px_30px_rgba(64,50,41,0.05)]">
              <p className="text-[11px] font-bold text-[#403229]/70">1 pax</p>
              <p className="mt-2 text-[17px] font-bold text-[#e2b87f]">$2,890</p>
              <p className="mt-1 text-[11px] font-semibold text-[#403229]/50">per person</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[12px] font-bold underline">Not sure on group size? Ask a planner - we&apos;ll figure it out together.</p>
      </div>
    </section>
  );
}

function BestTimeSection() {
  const rows = [
    ["Jul - Oct", "Peak migration. River crossings most frequent. Best overall wildlife."],
    ["Jan - Mar", "Calving season in southern Serengeti. Predator action is incredible."],
    ["Nov - Dec", "Green season. Lush scenery, fewer crowds, lower prices."]
  ];

  return (
    <section className="bg-[#fff4dc] py-12">
      <div className="mx-auto max-w-[1101px] px-5">
        <h2 className="text-center text-[25px] font-semibold leading-[1.3]">Best time for this safari</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {rows.map(([date, text]) => (
            <article key={date} className="bg-white p-5">
              <p className="text-[15px] font-bold text-[#e2b87f]">{date}</p>
              <p className="mt-3 text-[13px] font-semibold leading-[1.6] text-[#403229]/70">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-[12px] font-bold underline">Not sure on group size? Ask a planner - we&apos;ll figure it out together.</p>
      </div>
    </section>
  );
}

function WidePlannerBand({ dictionary }: TripPageProps) {
  return (
    <section className="relative bg-[#403229] py-[70px] text-white">
      <Image src="/assets/figma/final-cta-backgroundimage.png" alt="" fill sizes="100vw" className="object-cover opacity-45" aria-hidden="true" />
      <div className="absolute inset-0 bg-[#4a351c]/65" />
      <div className="relative mx-auto grid max-w-[1080px] gap-8 px-5 md:grid-cols-[1fr_392px] md:items-center">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Free, no commitment</p>
          <h2 className="mt-3 text-[34px] font-semibold leading-[1.14]">Talk to a safari planner</h2>
          <p className="mt-4 max-w-[430px] text-[15px] font-semibold leading-[1.6] text-white/72">
            This morning is yours to enjoy at a relaxed pace. Have a peaceful breakfast at the lodge and
          </p>
        </div>
        <div className="rounded-[2px] bg-white/95 p-5 text-[#403229]">
          <PlannerFields />
          <PlannerDialogButton planner={dictionary.planner} className="mt-4 h-[42px] w-full rounded-[2px] bg-[#e2b87f] text-[15px] font-bold text-[#403229] hover:bg-[#d9aa67]">
            Request a quote
          </PlannerDialogButton>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="bg-[#403229] px-5 py-[70px] text-white">
      <div className="mx-auto max-w-[946px]">
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Experiences we offer</p>
        <h2 className="mt-4 text-center text-[34px] font-semibold leading-[1.15]">Customer reviews</h2>
        <p className="mt-3 text-center text-[15px] font-semibold text-white/55">A short and simple subheading can be added here</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <article key={item} className="grid grid-cols-[120px_1fr] gap-4 rounded-[2px] bg-white/9 p-4">
              <div className="relative h-[94px] overflow-hidden rounded-[2px]">
                <Image src={item % 2 ? "/assets/figma/review-jeep.jpg" : "/assets/figma/review-family.jpg"} alt="Customer safari review" fill sizes="120px" className="object-cover" />
              </div>
              <div>
                <p className="text-[14px] font-semibold leading-[1.6] text-white/84">&quot;(Testimonial) lorem ipsum dolor sit amet, consec adipiscing sed do eiusmod.&quot;</p>
                <p className="mt-3 text-[13px] font-bold">Full name</p>
                <p className="text-[12px] font-semibold text-white/55">Company name / details.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StopPlanningSection({ dictionary }: TripPageProps) {
  return (
    <section className="mx-auto grid max-w-[947px] gap-10 px-5 py-[80px] md:grid-cols-[1fr_360px] md:items-center">
      <div>
        <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Experiences we offer</p>
        <h2 className="mt-4 text-[37px] font-semibold leading-[1.12]">Stop overthinking. Start planning.</h2>
        <p className="mt-5 text-[15px] font-semibold leading-[1.65] text-[#403229]/70">
          Tanzania is one of those trips people talk about for the rest of their lives - but only if you do it right. Tell us your dates, how many people, and what matters most to you.
        </p>
        <PlannerDialogButton planner={dictionary.planner} className="mt-6 h-[42px] rounded-[2px] bg-[#e2b87f] px-5 text-[14px] font-bold text-[#403229] hover:bg-[#d9aa67]">
          Talk to Safari Planner
        </PlannerDialogButton>
      </div>
      <div className="relative min-h-[330px]">
        <Image src="/assets/figma/planning-upper.jpg" alt="" width={220} height={160} className="absolute right-0 top-0 rounded-[8px] object-cover shadow-[0_18px_35px_rgba(64,50,41,0.2)]" />
        <Image src="/assets/figma/planning-center.jpg" alt="" width={260} height={170} className="absolute left-0 top-[85px] rounded-[8px] object-cover shadow-[0_18px_35px_rgba(64,50,41,0.2)]" />
        <Image src="/assets/figma/planning-bottom.jpg" alt="" width={220} height={145} className="absolute bottom-0 right-[18px] rounded-[8px] object-cover shadow-[0_18px_35px_rgba(64,50,41,0.2)]" />
      </div>
    </section>
  );
}

function SimilarTripsSection() {
  return (
    <section className="mx-auto max-w-[1111px] px-5 pb-[88px]">
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Experiences we offer</p>
      <h2 className="mt-4 text-center text-[34px] font-semibold leading-[1.15]">Other Simmilar Trips</h2>
      <TripCardGrid className="mt-10" limit={3} />
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-[846px] px-5 pb-[110px]">
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Overline text</p>
      <h2 className="mt-4 text-center text-[42px] font-semibold leading-[1.2]">Frequently asked questions</h2>
      <p className="mt-3 text-center text-[15px] font-semibold text-[#403229]/55">A short and simple subheading can be added here</p>
      <div className="mt-8 grid gap-4">
        {faqs.map((faq, index) => (
          <button
            key={`${faq.question}-${index}`}
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            className="w-full rounded-[2px] border border-[#403229]/10 bg-white p-6 text-left shadow-[0_10px_25px_rgba(64,50,41,0.04)]"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="text-[16px] font-bold leading-[1.5]">{faq.question}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-[2px] border border-[#403229]/10 text-[#e2b87f]">
                <ChevronDown className={`size-4 transition ${open === index ? "rotate-180" : ""}`} aria-hidden="true" />
              </span>
            </span>
            {open === index ? <span className="mt-4 block text-[15px] font-semibold leading-[1.6] text-[#403229]/62">{faq.answer}</span> : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function FinalCtaFooter({ dictionary, compact = false }: TripPageProps & { compact?: boolean }) {
  return (
    <section className={`relative bg-[#403229] text-white ${compact ? "pt-[104px]" : "pt-[80px]"}`}>
      <div className="absolute left-0 right-0 top-0 hidden h-[160px] -translate-y-1/2 bg-[#fdfaf3] md:block" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1230px] px-5">
        <div className="relative mx-auto max-w-[628px] translate-y-[-48px] rounded-[10px] bg-[#e2b87f] p-3 text-[#403229] shadow-[0_18px_40px_rgba(64,50,41,0.15)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[14px] font-bold leading-[1.5]">Couldn&apos;t find the answer you&apos;re looking for?</p>
              <p className="text-[12px] font-semibold leading-[1.5]">Description can be added here. Link button</p>
            </div>
            <a href={`https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`} className="inline-flex h-10 items-center justify-center rounded-[8px] bg-[#4a351c] px-4 text-[14px] font-bold text-white">
              Ask us on Whatsapp
            </a>
          </div>
        </div>

        <div className="relative mt-[-18px] min-h-[560px] overflow-hidden rounded-[16px] border border-white/30">
          <Image src="/assets/figma/final-cta-backgroundimage.png" alt="Safari planner by a vehicle in Tanzania" fill sizes="1230px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4a351c]/90 via-[#4a351c]/68 to-[#4a351c]/18" />
          <div className="relative grid min-h-[560px] gap-10 px-8 py-[82px] md:grid-cols-[minmax(0,1fr)_365px] md:px-[72px]">
            <div className="max-w-[660px] self-center">
              <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Experiences we offer</p>
              <h2 className="mt-4 text-[44px] font-semibold leading-[1.12] md:text-[49px]">
                Still thinking about it?
                <br />
                <span className="text-[34px] text-[#e2b87f]">Talk to a planner first - it&apos;s free.</span>
              </h2>
              <p className="mt-5 max-w-[504px] text-[15px] font-semibold leading-[1.6] text-white/75">
                Just a 10-minute conversation with someone who knows Tanzania inside out. Tell us your dates, your budget, and what matters most - we&apos;ll tell you honestly whether we&apos;re the right fit.
              </p>
              <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[16px] font-bold text-white/55">
                <span>{dictionary.topBar.phone}</span>
                <span>{dictionary.topBar.email}</span>
              </p>
              <PlannerDialogButton planner={dictionary.planner} className="mt-7 h-[54px] rounded-[9px] bg-[#e2b87f] px-6 text-[16px] font-bold text-[#4a351c] hover:bg-[#d9aa67]">
                Start the conversation -
              </PlannerDialogButton>
              <p className="mt-8 text-[12px] font-bold italic text-white">July and August departures are filling up. If those months work for you, now is the time.</p>
            </div>
            <div className="self-center rounded-[15px] border border-black/15 bg-white p-7 text-[#2c1a0e]">
              <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#e2b87f]">Free, no commitment</p>
              <h3 className="mt-2 text-[25px] font-semibold leading-[1.14]">Talk to a safari planner</h3>
              <p className="mt-4 text-[12px] font-semibold leading-[1.4]">We reply within 4 hours - by email or WhatsApp, your choice.</p>
              <PlannerFields className="mt-6" />
              <PlannerDialogButton planner={dictionary.planner} className="mt-4 h-[42px] w-full rounded-[2px] bg-[#e2b87f] text-[15px] font-bold text-[#403229] hover:bg-[#d9aa67]">
                Talk to Safari Planner
              </PlannerDialogButton>
            </div>
          </div>
        </div>
      </div>
      <TripFooter />
    </section>
  );
}

function TripFooter() {
  return (
    <footer className="px-5 pb-8 pt-[70px]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[29px]">
        <div className="relative h-[104px] w-[246px]">
          <Image src="/assets/figma/footer-logo-upload.png" alt="Astra Tanzania Safaris" fill sizes="246px" className="object-contain" />
        </div>
        <div className="flex gap-2">
          {["ig", "x", "in", "fb"].map((label) => (
            <a key={label} href="#" aria-label={label} className="grid size-10 place-items-center rounded-[8px] bg-[#e2b87f]/15 text-[12px] font-bold text-[#e2b87f]">
              {label}
            </a>
          ))}
        </div>
        <nav className="flex flex-wrap justify-center gap-12 text-[16px] font-semibold leading-[1.5] text-white/70" aria-label="Footer">
          {["Link menu", "Link menu", "Link menu", "Link menu"].map((label, index) => (
            <a href="#" key={`${label}-${index}`} className="hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="h-px w-full bg-white/15" />
        <div className="flex w-full flex-col gap-4 text-[12px] font-semibold leading-4 text-white md:flex-row md:items-center md:justify-between">
          <p>(c)2025 Chalk UI - All Rights Reserved.</p>
          <nav className="flex flex-wrap gap-4">
            <a href="#">Terms of Service</a>
            <span className="text-white/30">|</span>
            <a href="#">Cookies Settings</a>
            <span className="text-white/30">|</span>
            <a href="#">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
