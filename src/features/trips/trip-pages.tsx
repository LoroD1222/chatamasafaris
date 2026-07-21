"use client";

import {
  ArrowRight,
  Binoculars,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
import { useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { SiteFinalCta } from "@/components/layouts/site-final-cta";
import { SiteFooter } from "@/components/layouts/site-footer";
import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import { LeadPlanner } from "@/features/home/lead-planner";
import { defaultLocale } from "@/i18n/config";
import type { HomeDictionary, PlannerField } from "@/i18n/types";
import { isActiveTripCategory, type TripCard, type TripDetail, tripCards, tripCategoryOrder } from "@/features/trips/trip-data";

type TripPageProps = {
  dictionary: HomeDictionary;
};

type TripDetailPageProps = {
  dictionary: HomeDictionary;
  trip: TripDetail;
  similarTrips?: TripCard[];
};

type TripsListPageProps = {
  dictionary: HomeDictionary;
  initialTrips?: TripCard[];
};

const navLinks = [
  { label: "Safaris", href: "/trips?category=Safaris" },
  { label: "Honeymoon", href: "/trips?category=Honeymoon" },
  { label: "Zanzibar", href: "/trips?category=Zanzibar" },
  { label: "About us", href: "/en#about-us" }
];

const pageContainer = "mx-auto max-w-[1200px] px-6";
const amberButton =
  "rounded-[10px] bg-[#E07B39] text-[#1C1612] shadow-none transition hover:bg-[#C96A2A]";

const itineraryAccommodationSlides = [
  { src: "/assets/trips/itinerary-ahadi-lodge-design.png", alt: "Ahadi Lodge swimming pool and stone lodge exterior" },
  { src: "/assets/figma/review-jeep.jpg", alt: "Guests enjoying a private Tanzania safari vehicle" },
  { src: "/assets/figma/itinerary-2.jpg", alt: "Tanzania wilderness road and plains" }
];
export function TripsListPage({ dictionary, initialTrips }: TripsListPageProps) {
  const sourceCards = initialTrips && initialTrips.length > 0
    ? initialTrips.filter((trip) => isActiveTripCategory(trip.tripType))
    : tripCards;
  const cards = [
    ...sourceCards,
    ...tripCards.filter((fallbackTrip) => isActiveTripCategory(fallbackTrip.tripType) && !sourceCards.some((trip) => trip.tripType === fallbackTrip.tripType))
  ];
  const tripTypes = [...tripCategoryOrder];
  const minPrice = Math.min(...cards.map((trip) => trip.priceValue));
  const maxTripPrice = Math.max(...cards.map((trip) => trip.priceValue));
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category")?.trim() ?? "";
  const normalizedCategoryFromUrl = categoryFromUrl.replace(/\+/g, " ");
  const selectedCategory = normalizedCategoryFromUrl
    ? tripTypes.find((type) => type.toLowerCase() === normalizedCategoryFromUrl.toLowerCase()) ?? ""
    : "";
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => (selectedCategory ? [selectedCategory] : []));
  const [maxPrice, setMaxPrice] = useState(maxTripPrice);
  const filteredCards = cards.filter((trip) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(trip.tripType);
    const matchesPrice = trip.priceValue <= maxPrice;
    return matchesType && matchesPrice;
  });

  useEffect(() => {
    setSelectedTypes(selectedCategory ? [selectedCategory] : []);
    setMaxPrice(maxTripPrice);
  }, [selectedCategory, maxTripPrice]);

  function toggleTripType(type: string) {
    setSelectedTypes((current) => (current.includes(type) ? current.filter((item) => item !== type) : [...current, type]));
  }

  function resetFilters() {
    setSelectedTypes([]);
    setMaxPrice(maxTripPrice);
  }

  return (
    <div className="astra-page-enter min-h-screen overflow-x-clip bg-[#F0E9DE] text-[#1C1612]">
      <TripHeader dictionary={dictionary} />
      <main>
        <section className={`${pageContainer} pb-[116px] pt-[64px] md:pt-[62px]`}>
          <div className="text-center">
            <p className="text-[13px] font-semibold leading-[1.6]">
              <Link href="/trips" className="text-[#1C1612]/75">Tanzania</Link>
              <span className="mx-3 text-[#1C1612]/45">&gt;</span>
              <span className="font-bold text-[#1C1612]">Safari</span>
            </p>
            <h1 className="mt-8 text-[34px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#1C1612] md:text-[43px]">
              Tanzania safari in 2026 - 2027
            </h1>
          </div>
          <TripFilterBar
            tripTypes={tripTypes}
            selectedTypes={selectedTypes}
            minPrice={minPrice}
            maxTripPrice={maxTripPrice}
            maxPrice={maxPrice}
            resultCount={filteredCards.length}
            onToggleType={toggleTripType}
            onPriceChange={setMaxPrice}
            onResetFilters={resetFilters}
          />
          <div className="mt-[34px] text-center">
            <p className="inline-flex rounded-full border border-[#E07B39] bg-[#F0E9DE] px-5 py-2 text-[12px] font-bold leading-none text-[#E07B39]">
              ? The itineraries shown are examples - your journey will be personally tailored to you.
            </p>
          </div>
          {filteredCards.length > 0 ? (
            <TripCardGrid cards={filteredCards} className="mt-[57px]" />
          ) : (
            <div className="mx-auto mt-[57px] max-w-[680px] rounded-[8px] border border-[#1C1612]/12 bg-white p-8 text-center shadow-[0_14px_34px_rgba(28,22,18,0.08)]">
              <p className="text-[18px] font-bold leading-[1.35]">No trips match those filters.</p>
              <button type="button" onClick={resetFilters} className="mt-4 text-[14px] font-bold text-[#E07B39] underline underline-offset-4">Reset filters</button>
            </div>
          )}
          <p className="mx-auto mt-[88px] max-w-[960px] text-center text-[15px] font-semibold leading-[1.6] text-[#1C1612]/70">
            Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.
          </p>
        </section>
        <FinalCtaFooter dictionary={dictionary} />
      </main>
    </div>
  );
}

export function TripDetailPage({ dictionary, trip, similarTrips = [] }: TripDetailPageProps) {
  const gallerySlides = dedupeImages(
    trip.gallery && trip.gallery.length > 0
      ? trip.gallery.map((g) => ({ src: g.url, alt: g.alt || trip.title }))
      : [{ src: trip.heroImage || '/assets/trips/trip-hero-zebras.png', alt: trip.title }]
  );

  const itineraryDays = trip.itinerary && trip.itinerary.length > 0
    ? trip.itinerary.map((d) => ({
        day: `DAY ${d.dayNumber}`,
        title: d.title,
        description: d.description,
        accommodation: d.accommodation,
        images: d.images
          ?.map((image) => ({ src: image.url, alt: image.alt || d.title }))
          .filter((image) => Boolean(image.src)) || [],
      }))
    : [{
        day: "DAY 1",
        title: "Tarangire National Park, Return To Arusha",
        description: "After breakfast, continue toward Tarangire National Park, one of Tanzania's most scenic and elephant-rich parks.",
        accommodation: "Ahadi Lodge",
        images: [],
      }];

  const includedItems = trip.included && trip.included.length > 0
    ? trip.included
    : ["Professional English-speaking guide", "Private luxury 4x4 safari vehicle", "All park entry fees", "2 nights camp accommodation"];

  const excludedItems = trip.notIncluded && trip.notIncluded.length > 0
    ? trip.notIncluded
    : ["International flights", "Travel insurance", "Visa fees", "Tips and personal expenses"];

  const faqs = trip.faqs && trip.faqs.length > 0
    ? trip.faqs
    : dictionary.faq.items;

  const seasons = trip.bestTimeSeasons && trip.bestTimeSeasons.length > 0
    ? trip.bestTimeSeasons.map((s, i) => ({ title: s.period, dot: ["#F0E9DE","#F0E9DE","#E07B39"][i] || "#E07B39", description: s.highlight }))
    : [{ title: "Jul - Oct", dot: "#F0E9DE", description: "Peak migration. River crossings most frequent. Best overall wildlife." }];

  const priceTiers = trip.pricingTiers && trip.pricingTiers.length > 0
    ? trip.pricingTiers.map((t, i) => ({ id: `rate-${i}`, people: t.label, price: `$${t.pricePerPerson?.toLocaleString('en-US')}` }))
    : Array.from({ length: 6 }, (_, i) => ({ id: `rate-${i}`, people: "1 pax", price: "$2,890" }));

  return (
    <div className="astra-page-enter min-h-screen overflow-x-clip bg-[#F0E9DE] text-[#1C1612]">
      <TripHeader dictionary={dictionary} />
      <main>
        <section className="mx-auto max-w-[1200px] px-6 pb-[76px] pt-[65px]">
          <TripBreadcrumb />
          <h1 className="text-[31px] font-semibold leading-[1.14] tracking-[-0.01em] text-[#1C1612] md:text-[37px]">
            {trip.title}
          </h1>
          <div className="mt-[26px] grid items-start gap-7 lg:grid-cols-[708px_448px]">
            <div className="contents lg:block">
              <HeroGallery images={gallerySlides} className="order-1" />
              <BuiltForContent trip={trip} className="order-3 mt-[28px]" />
            </div>
            <div className="contents lg:grid lg:gap-7">
              <TripSummaryCard dictionary={dictionary} trip={trip} className="order-2" />
              <ReviewContactCard dictionary={dictionary} trip={trip} className="order-4" />
            </div>
          </div>
        </section>

        <div className="relative">
          <TripTabs />
          <section id="overview" className="mx-auto grid max-w-[1200px] scroll-mt-[82px] gap-10 px-6 py-[84px] lg:grid-cols-[680px_448px]">
            <OverviewText trip={trip} />
            <PlannerQuoteCard dictionary={dictionary} />
          </section>

          <section id="tour-details" className="mx-auto grid max-w-[1200px] scroll-mt-[82px] gap-8 px-6 pb-[84px] lg:grid-cols-[minmax(0,879px)_1fr]">
            <div className="relative overflow-hidden rounded-[10px]">
              <Image src={trip.mapImage || "/assets/trips/trip-map.png"} alt="Tanzania safari map" width={879} height={705} className="h-auto w-full" unoptimized />
            </div>
            <aside className="relative z-[100] self-center rounded-[10px] border border-[rgba(224,123,57,0.25)] bg-white p-8 shadow-[0_20px_45px_rgba(28,22,18,0.12)] lg:-ml-[200px] lg:w-[calc(100%+200px)]">
              <h2 className="border-b border-[#1C1612]/18 pb-5 text-[24px] font-semibold leading-[1.18]">Is this tour for me?</h2>
              <div className="border-b border-[#1C1612]/13 py-5">
                <p className="text-[14px] font-bold leading-[1.6]">Age Requirements: {trip.minAge ? `${trip.minAge}+` : '3+'}</p>
                <p className="mt-2 text-[14px] font-bold leading-[1.6]">Trip Type: {trip.tripType || 'Private Group'}</p>
              </div>
              <p className="border-b border-[#1C1612]/13 py-5 text-[13px] font-semibold leading-[1.65] text-[#1C1612]/70">
                {trip.tourForMeDescription || "Travel on your own schedule with full flexibility in dates, pace, and itinerary."}
              </p>
              <PlannerDialogButton planner={dictionary.planner} className={`mt-6 h-[46px] w-full px-4 text-[14px] font-bold ${amberButton}`}>
                Talk to a Planner
              </PlannerDialogButton>
            </aside>
          </section>

          <ItinerarySection itineraryDays={itineraryDays} gallerySlides={gallerySlides} />
          <IncludedSection dictionary={dictionary} includedItems={includedItems} excludedItems={excludedItems} priceTiers={priceTiers} />
        </div>
        <BestTimeSection dictionary={dictionary} seasons={seasons} />
        <WidePlannerBand dictionary={dictionary} />
        <ReviewsSection reviews={trip.reviews} />
        <StopPlanningSection dictionary={dictionary} />
        <SimilarTripsSection trips={similarTrips.length > 0 ? similarTrips : tripCards.slice(0, 3)} />
        <FaqSection dictionary={dictionary} faqs={faqs} />
        <FinalCtaFooter dictionary={dictionary} />
      </main>
    </div>
  );
}

function dedupeImages(images: { src: string; alt: string }[]) {
  const seen = new Set<string>();

  return images.filter((image) => {
    if (!image.src || seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

function TripHeader({ dictionary }: TripPageProps) {
  return (
    <header className="bg-[#F0E9DE] text-[#1C1612]">
      <div className="bg-[#E07B39]">
        <div className="mx-auto flex h-[37px] max-w-[1150px] items-center justify-between gap-3 px-5 text-[12px] font-bold leading-[1.6] sm:text-[13px]">
          <p className="flex min-w-0 items-center gap-2 uppercase tracking-[0.08em] text-[#1C1612]/40 sm:pl-4">
            <span className="size-[15px] shrink-0 bg-current [mask:url('/assets/figma/nav-bar-star.png')_center/contain_no-repeat] sm:size-[18px]" aria-hidden="true" />
            <span className="truncate">Highest Rated Tanzania Safari Operator</span>
          </p>
          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-7 text-[#1C1612]/65">
            <a href={`https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 underline underline-offset-2">
              <Phone className="size-3.5" aria-hidden="true" />
              {dictionary.topBar.phone}
            </a>
            <a href={`mailto:${dictionary.topBar.email}`} className="hidden items-center gap-1 underline underline-offset-2 md:inline-flex">
              <Mail className="size-3.5" aria-hidden="true" />
              {dictionary.topBar.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-[#1C1612]/10 bg-[#F0E9DE]">
        <div className="mx-auto flex h-[100px] max-w-[1150px] items-center justify-between gap-8 px-5">
          <Link href="/en" className="relative h-[92px] w-[219px] shrink-0" aria-label="Catama Safaris">
            <Image src="/assets/figma/logo-header.png" alt="Catama Safaris" fill priority sizes="219px" className="object-contain" />
          </Link>
          <nav className="hidden items-center gap-8 text-[15px] font-semibold leading-[1.6] md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-[#E07B39]">{link.label}</Link>
            ))}
          </nav>
          <PlannerDialogButton planner={dictionary.planner} className={`hidden h-[54px] px-[21px] text-[16px] font-bold md:inline-flex ${amberButton}`}>
            Get a Safari Planner
          </PlannerDialogButton>
          <PlannerDialogButton planner={dictionary.planner} className={`h-11 px-4 text-[13px] font-bold md:hidden ${amberButton}`}>
            Planner
          </PlannerDialogButton>
        </div>
      </div>
    </header>
  );
}

function TripBreadcrumb() {
  return (
    <nav className="mb-[47px] text-[13px] font-semibold leading-none text-[#1C1612]/55" aria-label="Breadcrumb">
      <Link href="/trips" className="transition hover:text-[#1C1612]">Tanzania</Link>
      <span className="mx-2 text-[#1C1612]/35">&gt;</span>
      <Link href="/trips" className="transition hover:text-[#1C1612]">Safari</Link>
      <span className="mx-2 text-[#1C1612]/35">&gt;</span>
      <span className="text-[#1C1612]/80">Great Migration</span>
    </nav>
  );
}

function TripFilterBar({ tripTypes, selectedTypes, minPrice, maxTripPrice, maxPrice, resultCount, onToggleType, onPriceChange, onResetFilters }: { tripTypes: string[]; selectedTypes: string[]; minPrice: number; maxTripPrice: number; maxPrice: number; resultCount: number; onToggleType: (type: string) => void; onPriceChange: (price: number) => void; onResetFilters: () => void; }) {
  return (
    <div className="mx-auto mt-[72px] grid max-w-[766px] overflow-hidden rounded-[2px] border border-[#1C1612]/12 bg-white md:grid-cols-[1fr_1.15fr]">
      <div className="border-b border-[#1C1612]/12 px-5 py-4 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-bold leading-[1.4]">Trip type:</p>
          {selectedTypes.length > 0 ? (
            <button type="button" onClick={onResetFilters} className="text-[11px] font-bold leading-none text-[#E07B39] underline underline-offset-2">Clear</button>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {tripTypes.map((type) => {
            const selected = selectedTypes.includes(type);
            return (
              <button key={type} type="button" onClick={() => onToggleType(type)} className={`inline-flex h-[28px] items-center gap-2 rounded-full border px-3 text-[11px] font-bold leading-none transition ${selected ? "border-[#E07B39] bg-[#F0E9DE] text-[#1C1612]" : "border-[#1C1612]/12 bg-[#F0E9DE] text-[#1C1612]/62 hover:border-[#E07B39]"}`} aria-pressed={selected}>
                <span className={`grid size-[14px] place-items-center rounded-full border ${selected ? "border-[#E07B39] bg-[#E07B39] text-white" : "border-[#1C1612]/20"}`}>
                  {selected ? <Check className="size-2.5" aria-hidden="true" /> : null}
                </span>
                {type}
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-bold leading-[1.4]">Filter by price:</p>
          <p className="text-[11px] font-bold leading-none text-[#1C1612]/58">{resultCount} trips</p>
        </div>
        <div className="mt-4">
          <div className="relative h-[14px]">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#E07B39]/55" />
            <div className="absolute left-0 top-1/2 size-[14px] -translate-y-1/2 rounded-full bg-[#E07B39]" />
            <input type="range" min={minPrice} max={maxTripPrice} step={100} value={maxPrice} onChange={(event) => onPriceChange(Number(event.currentTarget.value))} className="absolute inset-x-0 top-1/2 h-[18px] -translate-y-1/2 cursor-pointer opacity-0" aria-label="Maximum trip price" />
            <div className="absolute top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E07B39]" style={{ left: `${((maxPrice - minPrice) / (maxTripPrice - minPrice)) * 100}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-[12px] font-semibold text-[#E07B39]">
            <span>${minPrice.toLocaleString("en-US")}</span>
            <span>${maxPrice.toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCardGrid({ className = "", limit, cards = tripCards }: { className?: string; limit?: number; cards?: TripCard[] }) {
  const visibleCards = typeof limit === "number" ? cards.slice(0, limit) : cards;
  return (
    <div className={`mx-auto grid max-w-[1111px] gap-x-[18px] gap-y-[14px] md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {visibleCards.map((trip, index) => (
        <Link key={`${trip.slug}-${index}`} href={`/trip/${trip.slug}`} className="group relative h-[401px] overflow-hidden rounded-[8px] bg-[#1C1612] text-white outline-none transition focus-visible:ring-2 focus-visible:ring-[#E07B39] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0E9DE]">
          <Image src={trip.image} alt={trip.imageAlt} fill sizes="(min-width: 1024px) 356px, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute right-[18px] top-[18px] rounded-[5px] border border-white/45 bg-[#E07B39] px-3 py-1 text-[11px] font-bold leading-[1.5] text-white backdrop-blur">from ${trip.priceValue?.toLocaleString("en-US")} USD</div>
          <div className="absolute inset-x-0 bottom-0 rounded-b-[8px] border-t border-white/15 bg-[#1C1612]/60 px-[19px] pb-[25px] pt-4 backdrop-blur-[2.5px]">
            <h2 className="text-[14px] font-bold leading-[1.6]">{trip.title} - <span className="font-semibold">{trip.duration}</span></h2>
            <span className="mt-4 inline-flex h-[27px] items-center gap-1 rounded-full bg-[#E07B39] px-3 text-[14px] font-semibold leading-none text-white">See Itinerary<ArrowRight className="size-3.5" aria-hidden="true" /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function HeroGallery({ images, className = "" }: { images: { src: string; alt: string }[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const currentImage = images[currentIndex] || images[0];

  const showPreviousImage = () => setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  const showNextImage = () => setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
      if (event.key === "ArrowRight") setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [isLightboxOpen, images.length]);

  return (
    <div className={className}>
      <div className="relative h-[420px] overflow-hidden rounded-[2px] bg-[#1C1612] lg:h-[574px]">
        <button type="button" onClick={() => setIsLightboxOpen(true)} className="absolute inset-0 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--astra-primary-amber)]" aria-label={`Open image gallery: ${currentImage.alt}`}>
          <Image src={currentImage.src} alt={currentImage.alt} fill priority sizes="707px" className="object-cover transition duration-300" />
        </button>
        <div className="absolute left-[17px] top-[17px] rounded-full bg-[var(--astra-primary-amber)] px-[15px] py-[9px] text-[14px] font-bold leading-none text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">Featured</div>
        <button type="button" onClick={showPreviousImage} className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#1C1612] shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)]" aria-label="Show previous safari image"><ChevronLeft className="size-5" aria-hidden="true" /></button>
        <button type="button" onClick={showNextImage} className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#1C1612] shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)]" aria-label="Show next safari image"><ChevronRight className="size-5" aria-hidden="true" /></button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-[12px] font-bold text-white backdrop-blur-sm">{currentIndex + 1} / {images.length}</div>
      </div>
      <div className="mt-[17px] grid grid-cols-4 gap-[10px]">
        {images.map((image, index) => (
          <button key={image.src} type="button" onClick={() => setCurrentIndex(index)} className={`relative h-[118px] overflow-hidden rounded-[2px] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--astra-primary-amber)] ${index === currentIndex ? "ring-2 ring-[var(--astra-primary-amber)] ring-offset-2 ring-offset-[#F0E9DE]" : "opacity-80 hover:opacity-100"}`} aria-label={`Show gallery image ${index + 1}: ${image.alt}`} aria-current={index === currentIndex ? "true" : undefined}>
            <Image src={image.src} alt={image.alt} fill sizes="169px" className="object-cover" />
          </button>
        ))}
      </div>
      {isLightboxOpen ? createPortal(
        <div role="dialog" aria-modal="true" aria-label="Safari image gallery" className="fixed inset-0 z-[1000] isolate bg-black/85 px-5 py-6 text-white" onClick={() => setIsLightboxOpen(false)}>
          <button type="button" onClick={() => setIsLightboxOpen(false)} className="absolute right-5 top-5 z-30 grid size-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close image gallery"><X className="size-5" aria-hidden="true" /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); showPreviousImage(); }} className="absolute left-5 top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Show previous image in lightbox"><ChevronLeft className="size-6" aria-hidden="true" /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); showNextImage(); }} className="absolute right-5 top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Show next image in lightbox"><ChevronRight className="size-6" aria-hidden="true" /></button>
          <div className="relative z-20 mx-auto flex h-full w-full max-w-[1180px] flex-col gap-5" onClick={(e) => e.stopPropagation()}>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[6px] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <Image src={currentImage.src} alt={currentImage.alt} fill sizes="100vw" className="object-contain" priority unoptimized />
            </div>
            <div className="text-center text-[13px] font-semibold text-white/72">{currentIndex + 1} / {images.length}</div>
            <div className="mx-auto grid w-full max-w-[620px] grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button key={`${image.src}-lightbox`} type="button" onClick={() => setCurrentIndex(index)} className={`relative h-[76px] overflow-hidden rounded-[4px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === currentIndex ? "ring-2 ring-[var(--astra-primary-amber)]" : "opacity-65 hover:opacity-100"}`} aria-label={`Show gallery image ${index + 1}: ${image.alt}`} aria-current={index === currentIndex ? "true" : undefined}>
                  <Image src={image.src} alt={image.alt} fill sizes="155px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </div>
  );
}

function RatingStars({ className = "size-5" }: { className?: string }) {
  return (
    <span className="flex items-center gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`${className} fill-[#E07B39] text-[#E07B39]`} aria-hidden="true" />
      ))}
    </span>
  );
}

function TripSummaryCard({ dictionary, trip, className = "" }: { dictionary: HomeDictionary; trip: TripDetail; className?: string }) {
  return (
    <aside className={`flex rounded-[10px] border border-[#1C1612]/12 bg-white shadow-[0_22px_44px_rgba(28,22,18,0.08)] ${className}`}>
      <div className="flex min-h-full w-full flex-col px-6 py-6">
        <div className="grid gap-3 border-b border-[#1C1612]/13 py-5">
          <div className="flex items-center justify-between rounded-[8px] bg-[var(--astra-cream-panel)] px-4 py-3">
            <span className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[#1C1612]/62"><TrendingUp className="size-4 text-[var(--astra-primary-amber)]" aria-hidden="true" />In Popularity</span>
            <span className="flex items-center gap-2 text-[32px] font-bold leading-none text-[var(--astra-primary-amber)]"><Trophy className="size-6" aria-hidden="true" />#{trip.popularityRank || 4}</span>
          </div>
          <div className="flex items-center gap-3 rounded-[8px] border border-[#1C1612]/10 px-4 py-3 text-[16px] font-bold">
            <UsersRound className="size-5 text-[var(--astra-primary-amber)]" aria-hidden="true" />
            {trip.totalTravellers || '2,000+'} travellers booked with Catama Safaris
          </div>
        </div>
        <dl className="grid gap-4 border-b border-[#1C1612]/13 py-5 text-[16px] leading-[1.6]">
          <div className="grid grid-cols-[140px_1fr]">
            <dt className="font-semibold text-[#1C1612]/65">Physical rating</dt>
            <dd className="font-bold">{trip.physicalRating || 'Easy'}</dd>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <dt className="font-semibold text-[#1C1612]/65">Tour Start</dt>
            <dd className="font-bold">{trip.season || 'All seasons'}</dd>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <dt className="font-semibold text-[#1C1612]/65">Duration</dt>
            <dd className="font-bold">{trip.duration}</dd>
          </div>
        </dl>
        <p className="mt-5 text-[15px] font-semibold leading-[1.65] text-[#1C1612]/66">
          {trip.shortDescription || 'This morning is yours to enjoy at a relaxed pace.'}
        </p>
        <div className="mt-8 border-t border-[#1C1612]/13 pt-5">
          <PlannerDialogButton planner={dictionary.planner} className={`h-[54px] w-full px-4 text-[15px] font-bold ${amberButton}`}>
            Book a Safari
          </PlannerDialogButton>
        </div>
      </div>
    </aside>
  );
}

function BuiltForContent({ trip, className = "" }: { trip: TripDetail; className?: string }) {
  const defaultItems = [
    { label: "Couples & honeymooners", Icon: Check },
    { label: "First-time safari travelers", Icon: Binoculars },
    { label: "Families with limited time", Icon: UsersRound },
    { label: "Zanzibar visitors adding wildlife", Icon: Waves }
  ];
  const icons = [Check, Binoculars, UsersRound, Waves];
  const items = trip.targetAudience && trip.targetAudience.length > 0
    ? trip.targetAudience.map((label, i) => ({ label, Icon: icons[i % icons.length] }))
    : defaultItems;

  return (
    <section className={className}>
      <h2 className="text-[31px] font-semibold leading-[1.13]">Who this safari is built for?</h2>
      <p className="mt-[29px] max-w-[663px] text-[16px] font-semibold leading-[1.65] text-[#1C1612]/70">
        Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.
      </p>
      <div className="mt-[25px] grid gap-6 sm:grid-cols-2">
        {items.map(({ label, Icon }) => (
          <p key={label} className="flex items-center gap-4 text-[18px] font-bold leading-[1.5]">
            <Icon className="size-9 shrink-0 text-[#E07B39]" strokeWidth={1.8} aria-hidden="true" />
            {label}
          </p>
        ))}
      </div>
    </section>
  );
}

function ReviewContactCard({ dictionary, trip, className = "" }: { dictionary: HomeDictionary; trip: TripDetail; className?: string }) {
  const reviewAuthor = trip.reviews?.[0]?.authorName || "Catama Safaris guest";

  return (
    <aside className={`self-start rounded-[10px] border border-[#1C1612]/12 bg-white p-7 shadow-[0_16px_36px_rgba(28,22,18,0.06)] ${className}`}>
      <blockquote className="border-b border-[#1C1612]/13 pb-5">
        <RatingStars className="size-4" />
        <p className="mt-4 text-[17px] font-semibold italic leading-[1.65] text-[#1C1612]/75">
          &ldquo;{trip.featuredReviewQuote || "The river crossing was unlike anything I've ever seen in my life."}&rdquo;
        </p>
        <footer className="mt-4 text-[14px] font-bold leading-none text-[#1C1612]">
          {reviewAuthor}
        </footer>
      </blockquote>
      <div className="pt-5">
        <p className="text-[15px] font-semibold leading-[1.6]">For extra information please contact us</p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-[13px] font-bold leading-[1.6] text-[#1C1612]/65">
          <a href={`https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 hover:text-[#E07B39]"><Phone className="size-4 text-[#E07B39]" aria-hidden="true" />{dictionary.topBar.phone}</a>
          <a href={`mailto:${dictionary.topBar.email}`} className="inline-flex items-center gap-2 hover:text-[#E07B39]"><Mail className="size-4 text-[#E07B39]" aria-hidden="true" />{dictionary.topBar.email}</a>
        </p>
      </div>
    </aside>
  );
}

const tripTabs = [
  { label: "Overview", href: "#overview" },
  { label: "Tour Details", href: "#tour-details" },
  { label: "Itinerary", href: "#itinerary" },
  { label: "Inclusions", href: "#inclusions" },
  { label: "Price", href: "#pricing" }
];

function TripTabs() {
  const [activeTab, setActiveTab] = useState(tripTabs[0].href);

  useEffect(() => {
    const sections = tripTabs
      .map((tab) => document.querySelector<HTMLElement>(tab.href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveTab(`#${visibleEntry.target.id}`);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky left-0 top-0 z-[100000] bg-[#F0E9DE]">
      <div className={pageContainer}>
        <nav className="flex h-[58px] items-center rounded-[10px] border border-[#1C1612]/10 bg-[#F0E9DE] px-2 text-[11px] font-bold leading-[1.2] text-[#1C1612]/70 shadow-[0_8px_20px_rgba(28,22,18,0.04)] sm:px-4 sm:text-[13px] md:px-8 md:text-[15px]" aria-label="Trip sections">
          <div className="grid h-full w-full grid-cols-5 items-center">
            {tripTabs.map((tab) => (
              <a key={tab.label} href={tab.href} onClick={() => setActiveTab(tab.href)} className={`relative flex h-full items-center justify-center px-1 text-center transition hover:text-[#1C1612] ${activeTab === tab.href ? "text-[#1C1612]" : ""}`}>
                {tab.label}
                {activeTab === tab.href ? <span className="absolute bottom-0 left-1/2 h-[4px] w-[min(100%,72px)] -translate-x-1/2 rounded-t-full bg-[#E07B39]" /> : null}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

function OverviewText({ trip }: { trip: TripDetail }) {
  return (
    <div>
      <h2 className="sr-only">Overview</h2>
      <p className="whitespace-pre-line text-[15px] font-semibold leading-[1.68] text-[#1C1612]/74">
        {trip.overviewText || `Tanzania is one of those trips people talk about for the rest of their lives - but only if you do it right.`}
      </p>
    </div>
  );
}

function PlannerQuoteCard({ dictionary }: TripPageProps) {
  return (
    <LeadPlanner planner={dictionary.planner} className="w-full self-start rounded-[10px] border-[#1C1612]/12 bg-white p-7 text-[#1C1612] shadow-[0_18px_45px_rgba(28,22,18,0.08)] backdrop-blur-none" />
  );
}

type ItineraryDayCard = {
  day: string;
  title: string;
  description: string;
  accommodation: string;
  images: { src: string; alt: string }[];
};

function ItinerarySection({ itineraryDays, gallerySlides }: { itineraryDays: ItineraryDayCard[]; gallerySlides: { src: string; alt: string }[] }) {
  const days = itineraryDays.length > 0 ? itineraryDays : [{ day: "DAY 1", title: "Arrival", description: "", accommodation: "", images: [] }];

  return (
    <section id="itinerary" className={`${pageContainer} scroll-mt-[82px] py-[72px]`}>
      <div className="flex items-center gap-8">
        <h2 className="shrink-0 text-[34px] font-semibold leading-[1.15] text-[#1C1612] md:text-[38px]">Trip Itinerary</h2>
        <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
      </div>
      <div className="mt-[56px] grid gap-6">
        {days.map((day, index) => {
          const dayImage = day.images[0] || gallerySlides[index % gallerySlides.length] || itineraryAccommodationSlides[0];

          return (
            <article key={`${day.day}-${day.title}`} className="grid overflow-hidden rounded-[8px] border border-[#1C1612]/10 bg-white shadow-[0_18px_45px_rgba(28,22,18,0.08)] lg:grid-cols-[420px_minmax(0,1fr)]">
              <ItineraryImage images={[dayImage]} sizes="420px" />
              <div className="px-6 py-8 lg:order-2 lg:px-10 lg:py-9">
                <p className="text-[13px] font-bold uppercase leading-none tracking-[0.12em] text-[#E07B39]">{day.day}</p>
                <h3 className="mt-4 max-w-[680px] text-[27px] font-semibold leading-[1.18] text-[#1C1612] md:text-[31px]">{day.title}</h3>
                <p className="mt-6 max-w-[760px] text-[16px] font-semibold leading-[1.68] text-[#1C1612]">{day.description}</p>
                <div className="mt-7 border-t border-[#1C1612]/13 pt-6">
                  <h4 className="text-[22px] font-semibold leading-[1.18] text-[#1C1612]">Accommodations:</h4>
                  <p className="mt-3 max-w-[650px] text-[16px] font-semibold leading-[1.65] text-[#1C1612]">{day.accommodation}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ItineraryImage({ images, sizes, label, className = "" }: { images: { src: string; alt: string }[]; sizes: string; label?: string; className?: string }) {
  const image = images[0];

  return (
    <div className={`relative min-h-[240px] overflow-hidden bg-[#1C1612] lg:min-h-full ${className}`}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} loading="eager" unoptimized className="object-cover" />
      ) : null}
      {label ? <span className="absolute left-5 top-5 rounded-[8px] bg-white/92 px-5 py-3 text-[15px] font-bold leading-none text-[#1C1612] shadow-[0_12px_24px_rgba(28,22,18,0.12)]">{label}</span> : null}
    </div>
  );
}

function IncludedSection({ dictionary, includedItems, excludedItems, priceTiers }: { dictionary: HomeDictionary; includedItems: string[]; excludedItems: string[]; priceTiers: { id: string; people: string; price: string }[] }) {
  return (
    <section id="inclusions" className={`${pageContainer} scroll-mt-[82px] py-[72px]`}>
      <div className={excludedItems.length > 0 ? "mx-auto grid max-w-[1040px] gap-10 md:grid-cols-2 md:items-start" : ""}>
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <h2 className="shrink-0 text-[30px] font-semibold leading-[1.2]">What is included?</h2>
            <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
          </div>
          <ul className={`mt-10 grid gap-x-9 gap-y-5 ${excludedItems.length > 0 ? "" : "sm:grid-cols-2"}`}>
            {includedItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-center gap-3 text-[13px] font-semibold leading-[1.5] text-[#1C1612]/75">
                <span className="grid size-[25px] shrink-0 place-items-center rounded-full bg-[#E07B39] text-white"><Check className="size-4" strokeWidth={3} aria-hidden="true" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {excludedItems.length > 0 ? (
          <div className="border-t border-[#1C1612]/13 pt-10 md:border-t-0 md:pt-0">
            <div className="flex items-center gap-4">
              <h2 className="shrink-0 text-[30px] font-semibold leading-[1.2]">What is excluded?</h2>
              <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
            </div>
            <ul className="mt-10 grid gap-x-9 gap-y-5">
              {excludedItems.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-center gap-3 text-[13px] font-semibold leading-[1.5] text-[#1C1612]/75">
                  <span className="grid size-[25px] shrink-0 place-items-center rounded-full bg-[#E07B39] text-white"><X className="size-4" strokeWidth={3} aria-hidden="true" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div id="pricing" className="scroll-mt-[82px] pt-8 lg:col-span-2">
        <div className="mx-auto flex max-w-[1110px] items-center gap-7">
          <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
          <h3 className="shrink-0 text-center text-[27px] font-medium leading-[1.3] text-[#1C1612]">All-inclusive rates in USD</h3>
          <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
        </div>
        <div className="mx-auto mt-3 flex w-full max-w-[1110px] flex-wrap justify-center gap-2">
          {priceTiers.map((tier) => (
            <div key={tier.id} className="min-h-[92px] w-full max-w-[286px] rounded-[8px] border border-[#1C1612]/10 bg-white px-4 py-5 text-center shadow-[0_16px_35px_rgba(28,22,18,0.06)] sm:w-[calc(50%-4px)] md:w-[calc(33.333%-6px)] lg:w-[178px]">
              <p className="text-[11px] font-semibold leading-none text-[#1C1612]/78">{tier.people}</p>
              <p className="mt-3 text-[20px] font-bold leading-none text-[#E07B39]">{tier.price}</p>
              <p className="mt-2 text-[11px] font-semibold leading-none text-[#1C1612]/68">per person</p>
            </div>
          ))}
        </div>
        <PlannerDialogButton planner={dictionary.planner} variant="ghost" size="sm" className="mx-auto mt-9 flex h-auto w-fit bg-transparent p-0 text-[15px] font-bold leading-[1.5] text-[#1C1612] underline decoration-[#1C1612]/70 underline-offset-2 shadow-none hover:bg-transparent hover:text-[#1C1612]/75">
          Not sure on group size? Ask a planner - we&apos;ll figure it out together.
        </PlannerDialogButton>
      </div>
    </section>
  );
}

function BestTimeSection({ dictionary, seasons }: { dictionary: HomeDictionary; seasons: { title: string; dot: string; description: string }[] }) {
  return (
    <section className="bg-[#F0E9DE] pb-[72px] pt-[76px]">
      <div className={pageContainer}>
        <div className="mx-auto flex max-w-[1110px] items-center gap-8">
          <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
          <h2 className="shrink-0 text-center text-[27px] font-medium leading-[1.3] text-[#1C1612]">Best time for this safari</h2>
          <div className="h-[2px] flex-1 bg-[#F0E9DE]" />
        </div>
        <div className="mx-auto mt-5 flex w-full max-w-[1110px] flex-wrap justify-center gap-3">
          {seasons.map((season) => (
            <article key={season.title} className="min-h-[100px] w-full max-w-[360px] rounded-[8px] border border-[#1C1612]/10 bg-white px-6 pb-7 pt-6 shadow-[0_16px_35px_rgba(28,22,18,0.05)] md:w-[calc(33.333%-8px)]">
              <h3 className="flex items-center gap-3 text-[16px] font-medium leading-none text-[#E07B39]">
                <span className="size-3 rounded-full opacity-70" style={{ backgroundColor: season.dot }} aria-hidden="true" />
                {season.title}
              </h3>
              <p className="mt-5 text-[13px] font-semibold leading-[1.6] text-[#1C1612]/76">{season.description}</p>
            </article>
          ))}
        </div>
        <PlannerDialogButton planner={dictionary.planner} variant="ghost" size="sm" className="mx-auto mt-9 flex h-auto w-fit bg-transparent p-0 text-[15px] font-bold leading-[1.5] text-[#1C1612] underline decoration-[#1C1612]/70 underline-offset-2 shadow-none hover:bg-transparent hover:text-[#1C1612]/75">
          Not sure on group size? Ask a planner - we&apos;ll figure it out together.
        </PlannerDialogButton>
      </div>
    </section>
  );
}

function WidePlannerBand({ dictionary }: TripPageProps) {
  return (
    <section className="relative min-h-[441px] overflow-hidden border border-white/30 bg-[#1C1612] text-white shadow-[0_4px_11px_rgba(0,0,0,0.05)]">
      <Image src="/assets/figma/final-cta-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-[62%_center]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(86deg,#1C1612_1%,rgba(28,22,18,0.4)_89%)]" />
      <div className="relative mx-auto flex min-h-[441px] max-w-[1206px] flex-col gap-8 px-6 py-[78px] md:flex-row md:items-start md:gap-[18px] md:py-0">
        <div className="md:mt-[148px] md:w-[419px]">
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-[#E07B39]">Free, no commitment</p>
          <h2 className="mt-[11px] text-[34px] font-semibold leading-[1.14]">Talk to a safari planner</h2>
          <p className="mt-[11px] max-w-[394px] text-[15px] font-medium leading-[1.5] text-white/80">Tell us your dates, how many people, and what matters most to you.</p>
        </div>
        <InlinePlannerForm planner={dictionary.planner} className="md:mt-[106px]" />
      </div>
    </section>
  );
}

function InlinePlannerForm({ planner, className = "" }: { planner: HomeDictionary["planner"]; className?: string }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(planner.fields.map((field) => [field.name, ""])));
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setInvalidFields((current) => current.filter((fieldName) => fieldName !== name));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = planner.fields.filter((field) => !values[field.name]?.trim()).map((field) => field.name);
    if (missing.length > 0) { setInvalidFields(missing); setSubmitted(false); return; }
    setSubmitted(true);
  }

  return (
    <form className={`grid w-full max-w-[392px] gap-4 ${className}`} aria-label={planner.title} onSubmit={submitForm} noValidate>
      <InlinePlannerField field={planner.fields[0]} value={values[planner.fields[0].name] ?? ""} invalid={invalidFields.includes(planner.fields[0].name)} onChange={updateValue} />
      <div className="grid gap-4 sm:grid-cols-[187px_187px] sm:gap-[18px]">
        {planner.fields.slice(1, 3).map((field) => (
          <InlinePlannerField key={field.name} field={field} value={values[field.name] ?? ""} invalid={invalidFields.includes(field.name)} onChange={updateValue} />
        ))}
      </div>
      <InlinePlannerField field={planner.fields[3]} value={values[planner.fields[3].name] ?? ""} invalid={invalidFields.includes(planner.fields[3].name)} onChange={updateValue} />
      <button type="submit" className="flex h-[42px] items-center rounded-[6px] bg-[#E07B39] px-4 text-left text-[15px] font-semibold leading-[1.6] text-[#1C1612] transition hover:bg-[#C96A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
        <span className="me-auto">Request a quote</span>
        <ArrowRight className="size-5" aria-hidden="true" />
      </button>
      {submitted ? <p className="text-center text-[12px] font-bold leading-[1.5] text-white">{planner.success}</p> : null}
    </form>
  );
}

function InlinePlannerField({ field, value, invalid, onChange }: { field: PlannerField; value: string; invalid: boolean; onChange: (name: string, value: string) => void }) {
  const fieldClassName = "h-[47px] w-full rounded-[4px] border border-[#1C1612]/15 bg-[#F0E9DE]/98 px-4 text-[13px] font-bold leading-[1.4] text-[#1C1612] shadow-none outline-none backdrop-blur-[12px] placeholder:text-[#1C1612]/60 focus:border-[#E07B39] focus:ring-2 focus:ring-[#E07B39]/45";
  return field.type === "select" ? (
    <select aria-label={field.label} aria-invalid={invalid} value={value} onChange={(event) => onChange(field.name, event.currentTarget.value)} className={`${fieldClassName} appearance-auto`}>
      <option value="">{field.placeholder}</option>
      {field.options.map((option) => (<option key={option} value={option}>{option}</option>))}
    </select>
  ) : (
    <input name={field.name} type={field.type} value={value} placeholder={field.placeholder} autoComplete={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "name"} aria-label={field.label} aria-invalid={invalid} onChange={(event) => onChange(field.name, event.currentTarget.value)} className={fieldClassName} />
  );
}

function ReviewsSection({ reviews }: { reviews?: { quote: string; authorName: string; authorDetails: string }[] }) {
  const defaultReviews = [
    { image: "/assets/figma/review-family.jpg", alt: "Safari guests posing beside vehicles", quote: "We saw four of the Big Five on day one. Our guide knew exactly where to be and when - it was like he could read the animals' minds.", name: "Sarah M.", details: "12-Day Luxury Safari & Zanzibar, June 2024" },
    { image: "/assets/figma/review-family.jpg", alt: "Safari guests posing beside vehicles", quote: "Catama Safaris handled everything from the moment we landed to the moment we left. Zero stress. Just pure experience.", name: "James & Linda R.", details: "6-Day Great Migration Safari, August 2024" },
    { image: "/assets/figma/review-jeep.jpg", alt: "Guests riding in a safari vehicle", quote: "The Great Migration crossing was the most breathtaking thing I've ever witnessed. Worth every penny and every hour of planning.", name: "David K.", details: "4-Day Luxury Tanzania Safari, July 2024" },
    { image: "/assets/figma/review-jeep.jpg", alt: "Guests riding in a safari vehicle", quote: "I've done group tours before and they're nothing like this. Private guides, our own vehicle, our own schedule. This is how safari should be done.", name: "Michelle T.", details: "7-Day Safari from Zanzibar, October 2024" },
  ];
  const displayReviews = reviews && reviews.length > 0
    ? reviews.map((r, i) => ({ image: defaultReviews[i % defaultReviews.length].image, alt: defaultReviews[i % defaultReviews.length].alt, quote: r.quote, name: r.authorName, details: r.authorDetails }))
    : defaultReviews;

  return (
    <section id="reviews" className="bg-[#1C1612] px-6 py-[86px] text-white">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-center text-[13px] font-bold uppercase leading-none tracking-[0.28em] text-[#E07B39]">Experiences we offer</p>
        <h2 className="mt-7 text-center text-[48px] font-medium leading-[1.08] text-white">Customer reviews</h2>
        <p className="mx-auto mt-7 max-w-[560px] text-center text-[21px] font-medium leading-[1.45] text-white/58">What our travelers say</p>
        <div className="mt-[58px] grid gap-x-6 gap-y-7 lg:grid-cols-2">
          {displayReviews.map((review, index) => (
            <article key={index} className="grid gap-6 rounded-[10px] border border-white/20 bg-white/[0.075] p-6 shadow-[0_18px_44px_rgba(0,0,0,0.12)] sm:grid-cols-[220px_minmax(0,1fr)]">
              <div className="relative h-[158px] overflow-hidden rounded-[8px] bg-[#1C1612] sm:h-[178px]">
                <Image src={review.image} alt={review.alt} fill sizes="220px" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <RatingStars className="size-5" />
                <p className="mt-7 text-[20px] font-medium leading-[1.42] text-white">&quot;{review.quote}&quot;</p>
                <p className="mt-2 text-[20px] font-bold leading-[1.2] text-white">{review.name}</p>
                <p className="mt-2 text-[18px] font-medium leading-[1.25] text-white/72">{review.details}</p>
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
    <section className="bg-[#1C1612] py-[76px] text-white">
      <div className={`${pageContainer} grid gap-10 md:grid-cols-[1fr_520px] md:items-center`}>
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#E07B39]">Experiences we offer</p>
          <h2 className="mt-4 text-[42px] font-semibold leading-[1.08]">Stop overthinking.<br /><span className="text-[#E07B39]">Start planning.</span></h2>
          <p className="mt-5 max-w-[520px] text-[15px] font-semibold leading-[1.65] text-white/72">Tanzania is one of those trips people talk about for the rest of their lives.</p>
          <PlannerDialogButton planner={dictionary.planner} className={`mt-7 h-[48px] px-6 text-[14px] font-bold ${amberButton}`}>Talk to Safari Planner</PlannerDialogButton>
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

function SimilarTripsSection({ trips }: { trips: TripCard[] }) {
  return (
    <section className={`${pageContainer} py-[76px]`}>
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[#E07B39]">Experiences we offer</p>
      <h2 className="mt-4 text-center text-[34px] font-semibold leading-[1.15]">Other Similar Trips</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {trips.slice(0, 3).map((trip, index) => (
          <Link key={`${trip.slug}-similar-${index}`} href={`/trip/${trip.slug}`} className="group overflow-hidden rounded-[8px] border border-[#1C1612]/10 bg-white shadow-[0_14px_34px_rgba(28,22,18,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(28,22,18,0.12)]">
            <div className="relative h-[200px]">
              <Image src={trip.image} alt={trip.imageAlt} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-4 top-4 rounded-full bg-[#E07B39] px-3 py-1 text-[11px] font-bold text-white">{trip.price}</span>
            </div>
            <div className="p-5">
              <h3 className="text-[17px] font-bold leading-[1.35]">{trip.title}</h3>
              <p className="mt-2 text-[13px] font-semibold leading-[1.55] text-[#1C1612]/65">{trip.duration} - {trip.route}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#E07B39]">See Itinerary <ArrowRight className="size-4" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ dictionary, faqs }: { dictionary: HomeDictionary; faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[900px] px-6 py-[76px]">
      <p className="text-center text-[13px] font-bold uppercase tracking-[0.05em] text-[#E07B39]">{dictionary.faq.eyebrow}</p>
      <h2 className="mt-4 text-center text-[42px] font-semibold leading-[1.2]">{dictionary.faq.title}</h2>
      <p className="mt-3 text-center text-[15px] font-semibold leading-[1.6] text-[#1C1612]/55">{dictionary.faq.description}</p>
      <div className="mt-8 border-y border-[#1C1612]/12">
        {faqs.map((faq, index) => (
          <button key={`${faq.question}-${index}`} type="button" onClick={() => setOpen(open === index ? -1 : index)} className="w-full border-b border-[#1C1612]/12 bg-transparent py-5 text-left last:border-b-0">
            <span className="flex items-center justify-between gap-4">
              <span className="text-[16px] font-medium leading-[1.5]">{faq.question}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#1C1612]/12 text-[#E07B39]"><ChevronDown className={`size-4 transition ${open === index ? "rotate-180" : ""}`} aria-hidden="true" /></span>
            </span>
            {open === index ? <span className="mt-4 block text-[15px] font-semibold leading-[1.6] text-[#1C1612]/62">{faq.answer}</span> : null}
          </button>
        ))}
      </div>
      <div className="mt-8 text-center">
        <PlannerDialogButton planner={dictionary.planner} className={`h-[48px] px-6 text-[14px] font-bold ${amberButton}`}>Talk to a planner</PlannerDialogButton>
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
