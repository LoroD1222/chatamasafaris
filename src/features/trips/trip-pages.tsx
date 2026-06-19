"use client";

import {
  ArrowRight,
  Binoculars,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Phone,
  Star,
  TrendingUp,
  Trophy,
  UsersRound,
  Waves,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SiteFinalCta } from "@/components/layouts/site-final-cta";
import { SiteFooter } from "@/components/layouts/site-footer";
import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import { LeadPlanner } from "@/features/home/lead-planner";
import { defaultLocale } from "@/i18n/config";
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

const pageContainer = "mx-auto max-w-[1200px] px-6";
const amberButton =
  "rounded-[10px] bg-astra-amber text-white shadow-none transition hover:bg-[color:var(--astra-primary-amber-hover)]";

const itinerarySafariSlides = galleryImages;
const itineraryAccommodationSlides = [
  {
    src: "/assets/trips/itinerary-ahadi-lodge-design.png",
    alt: "Ahadi Lodge swimming pool and stone lodge exterior"
  },
  {
    src: "/assets/figma/review-jeep.jpg",
    alt: "Guests enjoying a private Tanzania safari vehicle"
  },
  {
    src: "/assets/figma/itinerary-2.jpg",
    alt: "Tanzania wilderness road and plains"
  }
];
const includedImageSlides = [
  {
    src: "/assets/trips/trip-included.png",
    alt: "Safari landscape included in trip"
  },
  {
    src: "/assets/figma/itinerary-2.jpg",
    alt: "Zebras resting beside a Tanzania wilderness road"
  },
  {
    src: "/assets/trips/trip-hero-zebras.png",
    alt: "Zebras grazing in Serengeti grassland"
  },
  {
    src: "/assets/figma/review-jeep.jpg",
    alt: "Guests riding in a private Tanzania safari vehicle"
  }
];

export function TripsListPage({ dictionary }: TripPageProps) {
  return (
    <div className="min-h-screen bg-[#fdfaf3] text-[#403229]">
      <TripHeader dictionary={dictionary} />
      <main>
        <section className={`${pageContainer} pb-[116px] pt-[64px] md:pt-[62px]`}>
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
            <p className="inline-flex rounded-full border border-[color:var(--astra-primary-amber)] bg-[#fff8e8] px-5 py-2 text-[12px] font-bold leading-none text-[var(--astra-primary-amber)]">
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
      <TripHeader dictionary={dictionary} showBreadcrumb />
      <main>
        <section className="mx-auto max-w-[1200px] px-6 pb-[76px] pt-[65px]">
          <h1 className="text-[31px] font-semibold leading-[1.14] tracking-[-0.01em] text-[#403229] md:text-[37px]">
            Great Migration & River Crossing in Serengeti
          </h1>

          <div className="mt-[26px] grid gap-7 lg:grid-cols-[708px_448px]">
            <HeroGallery />
            <TripSummaryCard dictionary={dictionary} />
          </div>

          <BuiltForSection dictionary={dictionary} />
        </section>

        <div className="relative">
          <TripTabs />

          <section id="overview" className="mx-auto grid max-w-[1200px] scroll-mt-[82px] gap-10 px-6 py-[84px] lg:grid-cols-[680px_448px]">
            <OverviewText />
            <PlannerQuoteCard dictionary={dictionary} />
          </section>

          <section id="tour-details" className="mx-auto grid max-w-[1200px] scroll-mt-[82px] gap-8 px-6 pb-[84px] lg:grid-cols-[minmax(0,879px)_1fr]">
            <div className="relative overflow-hidden rounded-[10px]">
              <Image src="/assets/trips/trip-map.png" alt="Three day mid-range Tanzania safari map" width={879} height={705} className="h-auto w-full" />
            </div>
            <aside className="relative z-[100] self-center rounded-[10px] border border-[rgba(200,134,10,0.25)] bg-white p-8 shadow-[0_20px_45px_rgba(64,50,41,0.12)] lg:-ml-[200px] lg:w-[calc(100%+200px)]">
              <h2 className="border-b border-[#403229]/18 pb-5 text-[24px] font-semibold leading-[1.18]">Is this tour for me?</h2>
              <div className="border-b border-[#403229]/13 py-5">
                <p className="text-[14px] font-bold leading-[1.6]">Age Requirements: 3+</p>
                <p className="mt-2 text-[14px] font-bold leading-[1.6]">Trip Type: Private Group</p>
              </div>
              <p className="border-b border-[#403229]/13 py-5 text-[13px] font-semibold leading-[1.65] text-[#403229]/70">
                Travel on your own schedule with full flexibility in dates, pace, and itinerary. Pricing is tailored to your private group size, and you can enjoy a fully customized experience.
              </p>
              <PlannerDialogButton planner={dictionary.planner} className={`mt-6 h-[46px] w-full px-4 text-[14px] font-bold ${amberButton}`}>
                Talk to a Planner
              </PlannerDialogButton>
            </aside>
          </section>

          <ItinerarySection />
          <IncludedSection dictionary={dictionary} />
        </div>
        <BestTimeSection dictionary={dictionary} />
        <WidePlannerBand dictionary={dictionary} />
        <ReviewsSection />
        <StopPlanningSection dictionary={dictionary} />
        <SimilarTripsSection />
        <FaqSection dictionary={dictionary} />
        <FinalCtaFooter dictionary={dictionary} />
      </main>
    </div>
  );
}

function TripHeader({ dictionary, showBreadcrumb = false }: TripPageProps & { showBreadcrumb?: boolean }) {
  return (
    <header className="bg-[#fdfaf3] text-[#403229]">
      <div className="bg-[var(--astra-primary-amber)]">
        <div className="mx-auto flex h-[37px] max-w-[1150px] items-center justify-between px-5 text-[13px] font-bold leading-[1.6] text-white/90">
          <p className="hidden items-center gap-2 pl-4 uppercase tracking-[0.08em] sm:flex">
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
              <Link key={link.label} href={link.href} className="transition hover:text-[var(--astra-primary-amber)]">
                {link.label}
              </Link>
            ))}
          </nav>
          <PlannerDialogButton
            planner={dictionary.planner}
            className={`hidden h-[54px] px-[21px] text-[16px] font-bold md:inline-flex ${amberButton}`}
          >
            Get a Safari Planner
          </PlannerDialogButton>
          <PlannerDialogButton
            planner={dictionary.planner}
            className={`h-11 px-4 text-[13px] font-bold md:hidden ${amberButton}`}
          >
            Planner
          </PlannerDialogButton>
        </div>
      </div>
      {showBreadcrumb ? (
        <div className="border-b border-[#403229]/8 bg-[#fdfaf3]">
          <div className={`${pageContainer} py-3 text-[13px] font-semibold leading-none text-[#403229]/55`}>
            Tanzania <span className="mx-2 text-[#403229]/35">&gt;</span> Safari <span className="mx-2 text-[#403229]/35">&gt;</span>{" "}
            <span className="text-[#403229]/80">Great Migration</span>
          </div>
        </div>
      ) : null}
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
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-[rgba(200,134,10,0.45)]" />
            <div className="absolute left-0 top-1/2 size-[14px] -translate-y-1/2 rounded-full bg-[var(--astra-primary-amber)]" />
            <div className="absolute left-[74%] top-1/2 size-[14px] -translate-y-1/2 rounded-full bg-[var(--astra-primary-amber)]" />
          </div>
          <div className="mt-2 flex justify-between text-[12px] font-semibold text-[var(--astra-primary-amber)]">
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
          className="group relative h-[401px] overflow-hidden rounded-[8px] bg-[#403229] text-white outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf3]"
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
          <div className="absolute right-[18px] top-[18px] rounded-[5px] border border-white/45 bg-astra-amber px-3 py-1 text-[11px] font-bold leading-[1.5] text-white backdrop-blur">
            {trip.price}
          </div>
          <div className="absolute bottom-[25px] left-[19px] right-[19px]">
            <h2 className="text-[14px] font-bold leading-[1.6]">
              {trip.title} - <span className="font-semibold">{trip.duration}</span>
            </h2>
            <p className="text-[14px] font-semibold leading-[1.51] text-white/85">
              {trip.route} - {trip.season}
            </p>
            <span className="mt-3 inline-flex h-[27px] items-center gap-1 rounded-full bg-[var(--astra-primary-amber)] px-3 text-[14px] font-semibold leading-none text-white">
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const currentImage = galleryImages[currentIndex];

  const showPreviousImage = () => {
    setCurrentIndex((index) => (index === 0 ? galleryImages.length - 1 : index - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((index) => (index === galleryImages.length - 1 ? 0 : index + 1));
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) => (index === 0 ? galleryImages.length - 1 : index - 1));
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((index) => (index === galleryImages.length - 1 ? 0 : index + 1));
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <div>
      <div className="relative h-[360px] overflow-hidden rounded-[2px] bg-[#403229]">
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute inset-0 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--astra-primary-amber)]"
          aria-label={`Open image gallery: ${currentImage.alt}`}
        >
          <Image src={currentImage.src} alt={currentImage.alt} fill priority sizes="707px" className="object-cover transition duration-300" />
        </button>
        <div className="absolute left-[17px] top-[17px] rounded-full bg-[var(--astra-primary-amber)] px-[15px] py-[9px] text-[14px] font-bold leading-none text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
          Featured
        </div>
        <button
          type="button"
          onClick={showPreviousImage}
          className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#403229] shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)]"
          aria-label="Show previous safari image"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNextImage}
          className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#403229] shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)]"
          aria-label="Show next safari image"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-[12px] font-bold text-white backdrop-blur-sm">
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>
      <div className="mt-[17px] grid grid-cols-4 gap-[10px]">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`relative h-[110px] overflow-hidden rounded-[2px] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)] ${
              index === currentIndex ? "ring-2 ring-[var(--astra-primary-amber)] ring-offset-2 ring-offset-[#fdfaf3]" : "opacity-80 hover:opacity-100"
            }`}
            aria-label={`Show gallery image ${index + 1}: ${image.alt}`}
            aria-current={index === currentIndex ? "true" : undefined}
          >
            <Image src={image.src} alt={image.alt} fill sizes="169px" className="object-cover" />
          </button>
        ))}
      </div>
      {isLightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Safari image gallery"
          className="fixed inset-0 z-[200] bg-black/92 px-5 py-6 text-white"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close image gallery"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-5 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Show previous image in lightbox"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="absolute right-5 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Show next image in lightbox"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
          <div className="mx-auto flex h-full max-w-[1180px] flex-col gap-5" onClick={(event) => event.stopPropagation()}>
            <div className="relative min-h-0 flex-1">
              <Image src={currentImage.src} alt={currentImage.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <div className="text-center text-[13px] font-semibold text-white/72">
              {currentIndex + 1} / {galleryImages.length}
            </div>
            <div className="mx-auto grid w-full max-w-[620px] grid-cols-4 gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image.src}-lightbox`}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`relative h-[76px] overflow-hidden rounded-[4px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    index === currentIndex ? "ring-2 ring-[var(--astra-primary-amber)]" : "opacity-65 hover:opacity-100"
                  }`}
                  aria-label={`Show gallery image ${index + 1}: ${image.alt}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                >
                  <Image src={image.src} alt={image.alt} fill sizes="155px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RatingStars({ className = "size-5" }: { className?: string }) {
  return (
    <span className="flex items-center gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`${className} fill-[var(--astra-primary-amber)] text-[var(--astra-primary-amber)]`} aria-hidden="true" />
      ))}
    </span>
  );
}

function TripSummaryCard({ dictionary }: TripPageProps) {
  return (
    <aside className="flex rounded-[10px] border border-[#403229]/12 bg-white shadow-[0_22px_44px_rgba(64,50,41,0.08)]">
      <div className="flex min-h-full w-full flex-col px-6 py-6">
        <div className="border-b border-[#403229]/13 pb-5">
          <RatingStars className="size-6" />
          <div className="mt-3 flex items-end gap-3">
            <p className="text-[42px] font-bold leading-none text-[#403229]">4.9</p>
            <p className="pb-1 text-[13px] font-semibold leading-[1.4] text-[#403229]/62">from 312 verified reviews</p>
          </div>
        </div>
        <div className="grid gap-3 border-b border-[#403229]/13 py-5">
          <div className="flex items-center justify-between rounded-[8px] bg-[var(--astra-cream-panel)] px-4 py-3">
            <span className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[#403229]/62">
              <TrendingUp className="size-4 text-[var(--astra-primary-amber)]" aria-hidden="true" />
              In Popularity
            </span>
            <span className="flex items-center gap-2 text-[32px] font-bold leading-none text-[var(--astra-primary-amber)]">
              <Trophy className="size-6" aria-hidden="true" />
              #4
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-[8px] border border-[#403229]/10 px-4 py-3 text-[16px] font-bold">
            <UsersRound className="size-5 text-[var(--astra-primary-amber)]" aria-hidden="true" />
            2,000+ travellers booked with Astra
          </div>
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
        <div className="mt-auto border-t border-[#403229]/13 pt-5">
          <PlannerDialogButton planner={dictionary.planner} className={`h-[54px] w-full px-4 text-[15px] font-bold ${amberButton}`}>
            Book a Safari
          </PlannerDialogButton>
        </div>
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
    <section className="mt-[28px] grid gap-7 lg:grid-cols-[708px_448px]">
      <div>
        <h2 className="text-[31px] font-semibold leading-[1.13]">Who this safari is built for?</h2>
        <p className="mt-[29px] max-w-[663px] text-[16px] font-semibold leading-[1.65] text-[#403229]/70">
          Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.
        </p>
        <div className="mt-[25px] grid gap-6 sm:grid-cols-2">
          {items.map(({ label, Icon }) => (
            <p key={label} className="flex items-center gap-4 text-[18px] font-bold leading-[1.5]">
              <Icon className="size-9 shrink-0 text-[var(--astra-primary-amber)]" strokeWidth={1.8} aria-hidden="true" />
              {label}
            </p>
          ))}
        </div>
      </div>
      <aside className="self-start rounded-[10px] border border-[#403229]/12 bg-white p-7 shadow-[0_16px_36px_rgba(64,50,41,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#403229]/13 pb-5">
          <div>
            <p className="flex items-center gap-3 text-[26px] font-bold leading-none text-[var(--astra-primary-amber)]">
              4.9
              <RatingStars className="size-3.5" />
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1f8f5a]/25 bg-[#effaf4] px-3 py-1.5 text-[12px] font-bold leading-none text-[#1f8f5a]">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-[#1f8f5a]" />
              <span className="size-2 rounded-full bg-[#1f8f5a]" />
              <span className="size-2 rounded-full bg-[#1f8f5a]" />
            </span>
            TripAdvisor
          </div>
        </div>
        <p className="border-b border-[#403229]/13 py-5 text-[15px] font-semibold leading-[1.6] text-[#403229]/75">
          Review from TripAdvisor &quot;The river crossing was unlike anything I&apos;ve ever seen in my life.&quot;
        </p>
        <div className="pt-5">
          <p className="text-[15px] font-semibold leading-[1.6]">For extra information please contact us</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-[13px] font-bold leading-[1.6] text-[#403229]/65">
            <a href={`tel:${dictionary.topBar.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-[var(--astra-primary-amber)]">
              <Phone className="size-4 text-[var(--astra-primary-amber)]" aria-hidden="true" />
              {dictionary.topBar.phone}
            </a>
            <a href={`mailto:${dictionary.topBar.email}`} className="inline-flex items-center gap-2 hover:text-[var(--astra-primary-amber)]">
              <Mail className="size-4 text-[var(--astra-primary-amber)]" aria-hidden="true" />
              {dictionary.topBar.email}
            </a>
          </p>
        </div>
      </aside>
    </section>
  );
}

function TripTabs() {
  const tabs = [
    { label: "Overview", href: "#overview" },
    { label: "Tour Details", href: "#tour-details" },
    { label: "Itinerary", href: "#itinerary" },
    { label: "Inclusions", href: "#inclusions" },
    { label: "Price", href: "#pricing" }
  ];

  return (
    <div className="sticky top-0 z-[90] bg-[#fdfaf3]">
      <div className={pageContainer}>
        <nav className="flex h-[58px] items-center overflow-x-auto rounded-[10px] border border-[#403229]/10 bg-[#F8EEDD] px-8 text-[15px] font-bold leading-[1.6] text-[#403229]/70 shadow-[0_8px_20px_rgba(64,50,41,0.04)]" aria-label="Trip sections">
          <div className="flex h-full min-w-max items-center gap-[34px]">
            {tabs.map((tab, index) => (
              <a
                key={tab.label}
                href={tab.href}
                className={index === 0 ? "relative flex h-full items-center text-[#403229]" : "flex h-full items-center transition hover:text-[#403229]"}
              >
                {tab.label}
                {index === 0 ? <span className="absolute bottom-0 left-0 h-[4px] w-full rounded-t-full bg-[var(--astra-primary-amber)]" /> : null}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
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
    <LeadPlanner
      planner={dictionary.planner}
      className="w-full self-start rounded-[10px] border-[#403229]/12 bg-white p-7 text-[#403229] shadow-[0_18px_45px_rgba(64,50,41,0.08)] backdrop-blur-none"
    />
  );
}

function ItinerarySection() {
  const day = itineraryDays[0];

  return (
    <section id="itinerary" className="mx-auto max-w-[1484px] scroll-mt-[82px] px-6 py-[72px]">
      <div className="flex items-center gap-8">
        <h2 className="shrink-0 text-[34px] font-semibold leading-[1.15] text-[#403229] md:text-[38px]">Trip Itinirary</h2>
        <div className="h-[2px] flex-1 bg-[#ddd7cc]" />
      </div>

      <article className="mt-[56px] grid overflow-hidden rounded-[8px] border border-[#403229]/10 bg-white shadow-[0_18px_45px_rgba(64,50,41,0.08)] lg:grid-cols-[605px_64px_minmax(0,1fr)]">
        <div className="grid gap-4 p-5">
          <ItineraryImageSlider images={itinerarySafariSlides} sizes="565px" />
          <ItineraryImageSlider images={itineraryAccommodationSlides} sizes="565px" />
        </div>

        <div className="relative hidden lg:block" aria-hidden="true">
          <Image src="/assets/trips/itinerary-timeline-line.svg" alt="" width={1} height={754} className="absolute left-1/2 top-5 h-[calc(100%-40px)] w-px -translate-x-1/2 object-fill" />
          <Image src="/assets/trips/itinerary-map-pin.svg" alt="" width={49} height={49} className="absolute left-1/2 top-[92px] z-10 size-[49px] -translate-x-1/2" />
          <Image src="/assets/trips/itinerary-bed.svg" alt="" width={49} height={49} className="absolute left-1/2 top-[calc(50%-24px)] z-10 size-[49px] -translate-x-1/2" />
        </div>

        <div className="px-6 pb-10 pt-8 lg:px-0 lg:pb-0 lg:pr-10 lg:pt-[46px]">
          <div className="lg:min-h-[284px]">
            <p className="text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-[#e2bd7d]">{day.day}</p>
            <h3 className="mt-5 max-w-[540px] text-[31px] font-semibold leading-[1.16] text-[#403229] md:text-[34px]">
              {day.title}
            </h3>
            <p className="mt-7 max-w-[690px] text-[16px] font-semibold leading-[1.68] text-[#403229]">
              {day.description}
            </p>
          </div>

          <div className="mt-8 lg:mt-[36px]">
            <h4 className="text-[30px] font-semibold leading-[1.16] text-[#403229]">Accommodations:</h4>
            <p className="mt-5 max-w-[650px] text-[16px] font-semibold leading-[1.65] text-[#403229]">
              Tanzania is one of those trips people talk about for the rest of their lives. {day.accommodation} keeps the stay relaxed and comfortable.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function ItineraryImageSlider({
  images,
  sizes,
  label
}: {
  images: { src: string; alt: string }[];
  sizes: string;
  label?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="relative aspect-[589/300] overflow-hidden rounded-[10px] bg-[#403229]">
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={index === activeIndex ? image.alt : ""}
          fill
          sizes={sizes}
          loading="eager"
          unoptimized
          aria-hidden={index === activeIndex ? undefined : true}
          className={`object-cover transition-opacity duration-300 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {label ? (
        <span className="absolute left-5 top-5 rounded-[8px] bg-white/92 px-5 py-3 text-[15px] font-bold leading-none text-[#403229] shadow-[0_12px_24px_rgba(64,50,41,0.12)]">
          {label}
        </span>
      ) : null}
      {hasMultipleImages ? (
        <>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-0 top-1/2 z-20 grid h-11 w-[70px] -translate-y-1/2 place-items-center rounded-r-[8px] bg-[#f8f2e9] text-[#403229] shadow-[0_10px_22px_rgba(64,50,41,0.12)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)]"
            aria-label="Previous itinerary image"
          >
            <ChevronLeft className="size-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-0 top-1/2 z-20 grid h-11 w-[70px] -translate-y-1/2 place-items-center rounded-l-[8px] bg-[#f8f2e9] text-[#403229] shadow-[0_10px_22px_rgba(64,50,41,0.12)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)]"
            aria-label="Next itinerary image"
          >
            <ChevronRight className="size-7" aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  );
}

function IncludedSection({ dictionary }: TripPageProps) {
  const priceTiers = Array.from({ length: 6 }, (_, index) => ({
    id: `rate-${index}`,
    people: "1 pax",
    price: "$2,890"
  }));

  return (
    <section id="inclusions" className={`${pageContainer} grid scroll-mt-[82px] gap-10 py-[72px] lg:grid-cols-[minmax(0,1fr)_340px]`}>
      <div>
        <div className="flex items-center gap-4">
          <h2 className="shrink-0 text-[30px] font-semibold leading-[1.2]">What is included?</h2>
          <div className="h-[2px] flex-1 bg-[#e2b87f]" />
        </div>
        <ul className="mt-10 grid gap-x-9 gap-y-5 sm:grid-cols-2">
          {includedItems.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center gap-3 text-[13px] font-semibold leading-[1.5] text-[#403229]/75">
              <span className="grid size-[25px] shrink-0 place-items-center rounded-full bg-[var(--astra-primary-amber)] text-white">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <IncludedImageSlider images={includedImageSlides} />
      <div id="pricing" className="scroll-mt-[82px] pt-8 lg:col-span-2">
        <div className="mx-auto flex max-w-[1110px] items-center gap-7">
          <div className="h-[2px] flex-1 bg-[#e7ded1]" />
          <h3 className="shrink-0 text-center text-[27px] font-medium leading-[1.3] text-[#403229]">All-inclusive rates in USD</h3>
          <div className="h-[2px] flex-1 bg-[#e7ded1]" />
        </div>
        <div className="mx-auto mt-3 grid max-w-[930px] overflow-hidden bg-white shadow-[0_16px_35px_rgba(64,50,41,0.06)] sm:grid-cols-2 sm:divide-x sm:divide-[#f0e8dc] md:grid-cols-3 lg:grid-cols-6">
          {priceTiers.map((tier) => (
            <div key={tier.id} className="min-h-[92px] px-4 py-5 text-center">
              <p className="text-[11px] font-semibold leading-none text-[#403229]/78">{tier.people}</p>
              <p className="mt-3 text-[20px] font-bold leading-none text-[#e2b87f]">{tier.price}</p>
              <p className="mt-2 text-[11px] font-semibold leading-none text-[#403229]/68">per person</p>
            </div>
          ))}
        </div>
        <PlannerDialogButton
          planner={dictionary.planner}
          variant="ghost"
          size="sm"
          className="mx-auto mt-9 flex h-auto w-fit bg-transparent p-0 text-[15px] font-bold leading-[1.5] text-[#403229] underline decoration-[#403229]/70 underline-offset-2 shadow-none hover:bg-transparent hover:text-[#403229]/75"
        >
          Not sure on group size? Ask a planner - we&apos;ll figure it out together.
        </PlannerDialogButton>
      </div>
    </section>
  );
}

function IncludedImageSlider({ images }: { images: { src: string; alt: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="relative min-h-[357px] overflow-hidden rounded-[8px] bg-[#403229]">
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={index === activeIndex ? image.alt : ""}
          fill
          sizes="340px"
          loading="eager"
          unoptimized
          aria-hidden={index === activeIndex ? undefined : true}
          className={`object-cover transition-opacity duration-300 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {hasMultipleImages ? (
        <>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-0 top-1/2 z-20 grid h-10 w-14 -translate-y-1/2 place-items-center rounded-r-[8px] bg-[#f8f2e9] text-[#403229] shadow-[0_10px_22px_rgba(64,50,41,0.12)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e2b87f]"
            aria-label="Previous included image"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-0 top-1/2 z-20 grid h-10 w-14 -translate-y-1/2 place-items-center rounded-l-[8px] bg-[#f8f2e9] text-[#403229] shadow-[0_10px_22px_rgba(64,50,41,0.12)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e2b87f]"
            aria-label="Next included image"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  );
}

function BestTimeSection({ dictionary }: TripPageProps) {
  const seasons = [
    {
      title: "Jul - Oct",
      dot: "#f2e8dc",
      description: "Peak migration. River crossings most frequent. Best overall wildlife."
    },
    {
      title: "Jan - Mar",
      dot: "#ead9c3",
      description: "Calving season in southern Serengeti. Predator action is incredible."
    },
    {
      title: "Nov - Dec",
      dot: "#e2b87f",
      description: "Green season. Lush scenery, fewer crowds, lower prices."
    }
  ];

  return (
    <section className="bg-[#F8EEDD] pb-[72px] pt-[76px]">
      <div className={pageContainer}>
        <div className="mx-auto flex max-w-[1100px] items-center gap-8">
          <div className="h-[2px] flex-1 bg-[#e7ded1]" />
          <h2 className="shrink-0 text-center text-[27px] font-medium leading-[1.3] text-[#403229]">Best time for this safari</h2>
          <div className="h-[2px] flex-1 bg-[#e7ded1]" />
        </div>
        <div className="mx-auto mt-5 grid max-w-[930px] overflow-hidden bg-white shadow-[0_16px_35px_rgba(64,50,41,0.05)] md:grid-cols-3 md:divide-x md:divide-[#f0e8dc]">
          {seasons.map((season) => (
            <article key={season.title} className="min-h-[100px] px-6 pb-7 pt-6">
              <h3 className="flex items-center gap-3 text-[16px] font-medium leading-none text-[#e2b87f]">
                <span className="size-3 rounded-full opacity-70" style={{ backgroundColor: season.dot }} aria-hidden="true" />
                {season.title}
              </h3>
              <p className="mt-5 text-[13px] font-semibold leading-[1.6] text-[#403229]/76">{season.description}</p>
            </article>
          ))}
        </div>
        <PlannerDialogButton
          planner={dictionary.planner}
          variant="ghost"
          size="sm"
          className="mx-auto mt-9 flex h-auto w-fit bg-transparent p-0 text-[15px] font-bold leading-[1.5] text-[#403229] underline decoration-[#403229]/70 underline-offset-2 shadow-none hover:bg-transparent hover:text-[#403229]/75"
        >
          Not sure on group size? Ask a planner - we&apos;ll figure it out together.
        </PlannerDialogButton>
      </div>
    </section>
  );
}

function WidePlannerBand({ dictionary }: TripPageProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--astra-dark-espresso)] py-[58px] text-white">
      <Image src="/assets/trips/safari-planner-image-5.png" alt="" fill sizes="100vw" className="object-cover object-[56%_center] opacity-75" aria-hidden="true" />
      <div className="absolute inset-0 bg-[rgba(64,50,41,0.72)]" />
      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#403229] via-[#403229] to-transparent" />
      <div className="relative mx-auto grid max-w-[1100px] gap-8 px-6 md:grid-cols-[360px_390px_minmax(0,1fr)] md:items-center">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--astra-primary-amber)]">Free, no commitment</p>
          <h2 className="mt-3 text-[31px] font-semibold leading-[1.14]">Talk to a safari planner</h2>
          <p className="mt-4 max-w-[430px] text-[15px] font-semibold leading-[1.6] text-white/72">
            This morning is yours to enjoy at a relaxed pace. Have a peaceful breakfast at the lodge and
          </p>
        </div>
        <LeadPlanner
          planner={dictionary.planner}
          className="w-full max-w-[390px] justify-self-center rounded-[10px] border-[#403229]/12 bg-white p-6 text-[#403229] shadow-[0_18px_45px_rgba(24,18,13,0.28)] backdrop-blur-none md:-translate-x-[60px]"
        />
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    { image: "/assets/figma/review-family.jpg", alt: "Safari guests posing beside vehicles" },
    { image: "/assets/figma/review-family.jpg", alt: "Safari guests posing beside vehicles" },
    { image: "/assets/figma/review-jeep.jpg", alt: "Guests riding in a safari vehicle" },
    { image: "/assets/figma/review-jeep.jpg", alt: "Guests riding in a safari vehicle" }
  ];

  return (
    <section id="reviews" className="bg-[#403229] px-6 py-[86px] text-white">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-center text-[13px] font-bold uppercase leading-none tracking-[0.28em] text-[#e2b87f]">Experiences we offer</p>
        <h2 className="mt-7 text-center text-[48px] font-medium leading-[1.08] text-white">Customer reviews</h2>
        <p className="mx-auto mt-7 max-w-[560px] text-center text-[21px] font-medium leading-[1.45] text-white/58">
          A short and simple subheading can be added here
        </p>
        <div className="mt-[58px] grid gap-x-6 gap-y-7 lg:grid-cols-2">
          {reviews.map((review, index) => (
            <article key={`${review.image}-${index}`} className="grid gap-6 rounded-[10px] border border-white/16 bg-white/[0.075] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.12)] sm:grid-cols-[220px_minmax(0,1fr)]">
              <div className="relative h-[158px] overflow-hidden rounded-[8px] bg-[#2c1f18] sm:h-[178px]">
                <Image src={review.image} alt={review.alt} fill sizes="220px" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <RatingStars className="size-5" />
                <p className="mt-7 text-[20px] font-medium leading-[1.42] text-white">
                  &quot;(Testimonial) lorem ipsum dolor sit amet, consec adipiscing sed do eiusmod.&quot;
                </p>
                <p className="mt-2 text-[20px] font-bold leading-[1.2] text-white">Full name</p>
                <p className="mt-2 text-[18px] font-medium leading-[1.25] text-white/72">Company name / details.</p>
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
    <section className="bg-[#403229] py-[76px] text-white">
      <div className={`${pageContainer} grid gap-10 md:grid-cols-[1fr_520px] md:items-center`}>
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--astra-primary-amber)]">Experiences we offer</p>
          <h2 className="mt-4 text-[42px] font-semibold leading-[1.08]">
            Stop overthinking.
            <br />
            <span className="text-[var(--astra-primary-amber)]">Start planning.</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-[15px] font-semibold leading-[1.65] text-white/72">
            Tanzania is one of those trips people talk about for the rest of their lives - but only if you do it right. Tell us your dates, how many people, and what matters most to you.
          </p>
          <PlannerDialogButton planner={dictionary.planner} className={`mt-7 h-[48px] px-6 text-[14px] font-bold ${amberButton}`}>
            Talk to Safari Planner
          </PlannerDialogButton>
        </div>
        <div className="relative min-h-[420px]">
          <Image src="/assets/figma/planning-upper.jpg" alt="" width={280} height={190} className="absolute right-0 top-0 rounded-[8px] object-cover shadow-[0_18px_35px_rgba(0,0,0,0.28)]" />
          <Image src="/assets/figma/planning-center.jpg" alt="" width={340} height={225} className="absolute left-0 top-[104px] rounded-[8px] object-cover shadow-[0_18px_35px_rgba(0,0,0,0.28)]" />
          <Image src="/assets/figma/planning-bottom.jpg" alt="" width={280} height={180} className="absolute bottom-0 right-[22px] rounded-[8px] object-cover shadow-[0_18px_35px_rgba(0,0,0,0.28)]" />
        </div>
      </div>
    </section>
  );
}

function SimilarTripsSection() {
  return (
    <section className={`${pageContainer} py-[76px]`}>
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--astra-primary-amber)]">Experiences we offer</p>
      <h2 className="mt-4 text-center text-[34px] font-semibold leading-[1.15]">Other Simmilar Trips</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {tripCards.slice(0, 3).map((trip, index) => (
          <Link
            key={`${trip.slug}-similar-${index}`}
            href={`/trip/${sharedTripSlug}`}
            className="group overflow-hidden rounded-[8px] border border-[#403229]/10 bg-white shadow-[0_14px_34px_rgba(64,50,41,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(64,50,41,0.12)]"
          >
            <div className="relative h-[200px]">
              <Image src={trip.image} alt={trip.imageAlt} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-4 top-4 rounded-full bg-[var(--astra-primary-amber)] px-3 py-1 text-[11px] font-bold text-white">{trip.price}</span>
            </div>
            <div className="p-5">
              <h3 className="text-[17px] font-bold leading-[1.35]">{trip.title}</h3>
              <p className="mt-2 text-[13px] font-semibold leading-[1.55] text-[#403229]/65">
                {trip.duration} - {trip.route}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[var(--astra-primary-amber)]">
                See Itinerary <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ dictionary }: TripPageProps) {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-[900px] px-6 py-[76px]">
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--astra-primary-amber)]">Overline text</p>
      <h2 className="mt-4 text-center text-[42px] font-semibold leading-[1.2]">Frequently asked questions</h2>
      <p className="mt-3 text-center text-[15px] font-semibold leading-[1.6] text-[#403229]/55">Everything you need to know about this safari before you book.</p>
      <div className="mt-8 border-y border-[#403229]/12">
        {faqs.map((faq, index) => (
          <button
            key={`${faq.question}-${index}`}
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            className="w-full border-b border-[#403229]/12 bg-transparent py-5 text-left last:border-b-0"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="text-[16px] font-medium leading-[1.5]">{faq.question}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#403229]/12 text-[var(--astra-primary-amber)]">
                <ChevronDown className={`size-4 transition ${open === index ? "rotate-180" : ""}`} aria-hidden="true" />
              </span>
            </span>
            {open === index ? <span className="mt-4 block text-[15px] font-semibold leading-[1.6] text-[#403229]/62">{faq.answer}</span> : null}
          </button>
        ))}
      </div>
      <div className="mt-8 text-center">
        <PlannerDialogButton planner={dictionary.planner} className={`h-[48px] px-6 text-[14px] font-bold ${amberButton}`}>
          Talk to a planner
        </PlannerDialogButton>
      </div>
    </section>
  );
}

function FinalCtaFooter({ dictionary }: TripPageProps) {
  return (
    <>
      <SiteFinalCta dictionary={dictionary} />
      <SiteFooter locale={defaultLocale} dictionary={dictionary} />
    </>
  );
}
