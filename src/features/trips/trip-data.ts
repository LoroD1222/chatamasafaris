import { client } from '@/lib/sanity'

export const tripCategoryOrder = ["Safaris", "Honeymoon", "Zanzibar"] as const;

export type TripCategory = (typeof tripCategoryOrder)[number];

const activeTripCategories = new Set<string>(tripCategoryOrder);

const categoryReassignmentsByTitle: Record<string, TripCategory> = {
  "12-Day Luxury Safari & Zanzibar Beach Escape": "Honeymoon",
  "4 Days Luxury Tanzania Safari": "Honeymoon",
  "5 Day Safari From Zanzibar": "Zanzibar",
  "6 Days Great Migration Safari from Zanzibar": "Safaris",
  "6 Days Semi-Luxury Great Migration Safari": "Safaris",
  "7-Day Budget Safari from Zanzibar": "Safaris",
};

const legacyCategoryNames: Record<string, TripCategory> = {
  "Wildlife Safari": "Safaris",
  Safari: "Safaris",
  "Luxury Safari": "Honeymoon",
  Zanzibar: "Zanzibar",
  "Zanzibar Extension": "Zanzibar",
};

export type TripCard = {
  slug: string;
  title: string;
  duration: string;
  route: string;
  season: string;
  tripType: string;
  priceValue: number;
  price: string;
  image: string;
  imageAlt: string;
}

export type TripDetail = {
  slug: string;
  title: string;
  duration: string;
  route: string;
  season: string;
  tripType: string;
  priceValue: number;
  price: string;
  heroImage: string;
  gallery: { url: string; alt: string }[];
  shortDescription: string;
  overviewText: string;
  targetAudience: string[];
  featuredReviewQuote: string;
  tourForMeDescription: string;
  itinerary: { dayNumber: number; title: string; description: string; accommodation: string; images: { url: string; alt: string }[] }[];
  included: string[];
  notIncluded: string[];
  faqs: { question: string; answer: string }[];
  reviews: { quote: string; authorName: string; authorDetails: string }[];
  pricingTiers: { label: string; pricePerPerson: number }[];
  bestTimeSeasons: { period: string; highlight: string }[];
  reviewScore: number;
  reviewCount: number;
  popularityRank: number;
  totalTravellers: string;
  physicalRating: string;
  minAge: number;
  isFeatured: boolean;
  category: string;
}

type SanityTripCard = Omit<TripCard, "price" | "image" | "imageAlt" | "tripType"> & {
  tripType?: string | null;
  image?: string | null;
  imageAlt?: string | null;
};

function normalizeTripCategory(title: string, category?: string | null): string {
  const reassignedCategory = categoryReassignmentsByTitle[title.trim()];
  if (reassignedCategory) return reassignedCategory;

  const trimmedCategory = category?.trim();
  if (!trimmedCategory) return "Safaris";

  return legacyCategoryNames[trimmedCategory] ?? trimmedCategory;
}

export function isActiveTripCategory(category: string) {
  return activeTripCategories.has(category);
}

function normalizeTripCard(trip: SanityTripCard): TripCard {
  const tripType = normalizeTripCategory(trip.title, trip.tripType);

  return {
    ...trip,
    tripType,
    image: trip.image || '/assets/figma/itinerary-1.jpg',
    imageAlt: trip.imageAlt || trip.title,
    price: `from $${trip.priceValue?.toLocaleString('en-US')} USD per person`,
  };
}

function normalizeTripCards(trips: SanityTripCard[]): TripCard[] {
  // TODO: Confirm whether to keep, reassign, or remove Kilimanjaro trips
  return trips.map(normalizeTripCard).filter((trip) => isActiveTripCategory(trip.tripType));
}

export async function getTripCards(): Promise<TripCard[]> {
  const trips = await client.fetch<SanityTripCard[]>(`
    *[_type == "trip"] | order(priceFrom asc) {
      "slug": slug.current,
      title,
      "duration": duration,
      "route": destinations,
      "season": bestSeason,
      "tripType": category,
      "priceValue": priceFrom,
      "image": heroImage.asset->url,
      "imageAlt": heroImage.alt
    }
  `)
  return normalizeTripCards(trips)
}

export async function getRecentTrips(limit = 6): Promise<TripCard[]> {
  const fetchLimit = Math.max(limit * 3, 18);
  const trips = await client.fetch<SanityTripCard[]>(`
    *[_type == "trip"] | order(_createdAt desc) [0...$fetchLimit] {
      "slug": slug.current,
      title,
      "duration": duration,
      "route": destinations,
      "season": bestSeason,
      "tripType": category,
      "priceValue": priceFrom,
      "image": heroImage.asset->url,
      "imageAlt": heroImage.alt
    }
  `, { fetchLimit })
  return normalizeTripCards(trips).slice(0, limit)
}

export async function getSimilarTrips(slug: string, category: string, limit = 3): Promise<TripCard[]> {
  const trips = await client.fetch<SanityTripCard[]>(`
    *[_type == "trip" && slug.current != $slug] | order(_createdAt desc) [0...80] {
      "slug": slug.current,
      title,
      "duration": duration,
      "route": destinations,
      "season": bestSeason,
      "tripType": category,
      "priceValue": priceFrom,
      "image": heroImage.asset->url,
      "imageAlt": heroImage.alt
    }
  `, { slug })
  return trips
    .map(normalizeTripCard)
    .filter((trip) => trip.tripType === category && isActiveTripCategory(trip.tripType))
    .slice(0, limit)
}

export async function getTripBySlug(slug: string): Promise<TripDetail | null> {
  const trip = await client.fetch<(Omit<TripDetail, "price"> & { heroImage?: string | null; tripType?: string | null; category?: string | null }) | null>(`
    *[_type == "trip" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      "duration": duration,
      "route": destinations,
      "season": bestSeason,
      "tripType": category,
      "category": category,
      "priceValue": priceFrom,
      "heroImage": heroImage.asset->url,
      "gallery": gallery[]{ "url": asset->url, "alt": alt },
      shortDescription,
      "overviewText": pt::text(overviewText),
      targetAudience,
      featuredReviewQuote,
      tourForMeDescription,
      itinerary[]{
        dayNumber,
        title,
        "description": pt::text(description),
        "accommodation": accommodation.name,
        "images": [
          { "url": accommodation.image.asset->url, "alt": accommodation.name }
        ]
      },
      included,
      notIncluded,
      faqs[]{ question, "answer": pt::text(answer) },
      reviews[]{ quote, authorName, authorDetails },
      pricingTiers,
      bestTimeSeasons,
      reviewScore,
      reviewCount,
      popularityRank,
      totalTravellers,
      physicalRating,
      minAge,
      isFeatured,
    }
  `, { slug })
  if (!trip) return null
  const category = normalizeTripCategory(trip.title, trip.category || trip.tripType);
  return {
    ...trip,
    tripType: category,
    category,
    heroImage: trip.heroImage || '/assets/trips/trip-hero-zebras.png',
    price: `from $${trip.priceValue?.toLocaleString('en-US')} USD per person`,
  }
}

// Fallback static data
export const sharedTripSlug = "great-migration-classic"

export const galleryImages = [
  { src: "/assets/trips/trip-hero-zebras.png", alt: "Zebras grazing in Serengeti during a Tanzania safari" },
  { src: "/assets/figma/itinerary-2.jpg", alt: "Tanzania wilderness road and plains" },
  { src: "/assets/figma/itinerary-3.jpg", alt: "Safari vehicle in the grass" },
  { src: "/assets/figma/itinerary-5.jpg", alt: "Zanzibar turquoise coastline" }
]

export const tripCards: TripCard[] = [
  { slug: sharedTripSlug, title: "The Great Migration Classic", duration: "7 nights", route: "Serengeti + Ngorongoro", season: "July-October", tripType: "Safaris", priceValue: 1459, price: "from $1,459 USD per person", image: "/assets/figma/itinerary-1.jpg", imageAlt: "Tanzania safari itinerary preview 1" },
  { slug: sharedTripSlug, title: "Northern Circuit Safari", duration: "5 nights", route: "Tarangire + Ngorongoro", season: "June-October", tripType: "Safaris", priceValue: 1890, price: "from $1,890 USD per person", image: "/assets/figma/itinerary-2.jpg", imageAlt: "Tanzania safari itinerary preview 2" },
  { slug: sharedTripSlug, title: "Serengeti Fly-in Safari", duration: "4 nights", route: "Serengeti + Arusha", season: "All seasons", tripType: "Honeymoon", priceValue: 2890, price: "from $2,890 USD per person", image: "/assets/figma/itinerary-3.jpg", imageAlt: "Tanzania safari itinerary preview 3" },
]
