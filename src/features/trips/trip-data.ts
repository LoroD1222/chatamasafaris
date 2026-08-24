import { client } from '@/lib/sanity'

export const tripCategoryOrder = ["Wildlife Safari", "Luxury Safari", "Zanzibar"] as const;

export type TripCategory = (typeof tripCategoryOrder)[number];

const activeTripCategories = new Set<string>(tripCategoryOrder);

const sanityImageHost = "cdn.sanity.io";
const fullResolutionImageWidth = 1920;
const cardImageWidth = 1200;

/**
 * Keep the original Sanity asset intact while asking its CDN for an efficient
 * browser-supported format at a resolution that exceeds every rendered size
 * on this site.
 */
function optimizedSanityImageUrl(url?: string | null, maxWidth = fullResolutionImageWidth) {
  if (!url) return null;

  try {
    const imageUrl = new URL(url);
    if (imageUrl.hostname !== sanityImageHost) return url;

    imageUrl.searchParams.set("auto", "format");
    imageUrl.searchParams.set("fit", "max");
    imageUrl.searchParams.set("w", String(maxWidth));
    return imageUrl.toString();
  } catch {
    return url;
  }
}

const categoryReassignmentsByTitle: Record<string, TripCategory> = {
  "12-Day Luxury Safari & Zanzibar Beach Escape": "Luxury Safari",
  "4 Days Luxury Tanzania Safari": "Luxury Safari",
  "5 Day Safari From Zanzibar": "Zanzibar",
  "6 Days Great Migration Safari from Zanzibar": "Wildlife Safari",
  "6 Days Semi-Luxury Great Migration Safari": "Wildlife Safari",
  "7-Day Budget Safari from Zanzibar": "Wildlife Safari",
};

const legacyCategoryNames: Record<string, TripCategory> = {
  "Wildlife Safari": "Wildlife Safari",
  Safari: "Wildlife Safari",
  "Luxury Safari": "Luxury Safari",
  Safaris: "Wildlife Safari",
  Honeymoon: "Luxury Safari",
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
  priceValue: number | null;
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
  priceValue: number | null;
  price: string;
  heroImage: string;
  mapImage?: string | null;
  gallery: { url: string; alt: string }[];
  shortDescription: string;
  overviewText: string;
  targetAudience: string[];
  featuredReviewQuote: string;
  tourForMeDescription: string;
  itinerary: {
    key: string;
    dayNumber: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    activityImage: { url: string; alt: string } | null;
    accommodation: string;
    accommodationImage: { url: string; alt: string } | null;
  }[];
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

type AccommodationImage = {
  name?: string | null;
  url?: string | null;
  alt?: string | null;
};

const accommodationNameStopWords = new Set([
  "accommodation",
  "and",
  "camp",
  "hotel",
  "if",
  "lodge",
  "or",
  "safari",
  "the",
  "tented",
]);

function accommodationNameTokens(name: string) {
  return name
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token && !accommodationNameStopWords.has(token));
}

function findAccommodationImage(name: string, images: AccommodationImage[]) {
  const targetTokens = accommodationNameTokens(name);
  if (targetTokens.length === 0) return null;

  const matches = images
    .filter((image): image is AccommodationImage & { name: string; url: string } => Boolean(image.name && image.url))
    .map((image) => {
      const candidateTokens = accommodationNameTokens(image.name);
      const sharedTokens = targetTokens.filter((token) => candidateTokens.includes(token));
      const isSingleTokenExactMatch = targetTokens.length === 1 && candidateTokens.includes(targetTokens[0]);

      return {
        image,
        sharedTokenCount: sharedTokens.length,
        isEligible: sharedTokens.length >= 2 || isSingleTokenExactMatch,
        lengthDifference: Math.abs(targetTokens.length - candidateTokens.length),
      };
    })
    .filter((match) => match.isEligible)
    .sort((left, right) =>
      right.sharedTokenCount - left.sharedTokenCount || left.lengthDifference - right.lengthDifference
    );

  return matches[0]?.image ?? null;
}

function fallbackMealsForDay(title: string, index: number, totalDays: number) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("arrival")) return ["Dinner"];
  if (normalizedTitle.includes("departure")) return ["Breakfast"];
  if (totalDays === 1) return ["Lunch"];
  if (index === 0) return ["Lunch", "Dinner"];
  if (index === totalDays - 1) return ["Breakfast", "Lunch"];

  return ["Breakfast", "Lunch", "Dinner"];
}

function normalizeTripCategory(title: string, category?: string | null): string {
  const reassignedCategory = categoryReassignmentsByTitle[title.trim()];
  if (reassignedCategory) return reassignedCategory;

  const trimmedCategory = category?.trim();
  if (!trimmedCategory) return "Wildlife Safari";

  return legacyCategoryNames[trimmedCategory] ?? trimmedCategory;
}

export function isActiveTripCategory(category: string) {
  return activeTripCategories.has(category);
}

function normalizeTripCard(trip: SanityTripCard): TripCard {
  const tripType = normalizeTripCategory(trip.title, trip.tripType);
  const publishedPrice = typeof trip.priceValue === "number" && trip.priceValue > 0
    ? trip.priceValue
    : null;

  return {
    ...trip,
    tripType,
    image: optimizedSanityImageUrl(trip.image, cardImageWidth) || '/assets/figma/itinerary-1.jpg',
    imageAlt: trip.imageAlt || trip.title,
    price: publishedPrice
      ? `from $${publishedPrice.toLocaleString('en-US')} USD per person`
      : "Price on request",
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
  const [trip, accommodationImageGroups] = await Promise.all([
    client.fetch<(Omit<TripDetail, "price"> & { heroImage?: string | null; tripType?: string | null; category?: string | null }) | null>(`
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
        "mapImage": mapImage.asset->url,
        "gallery": gallery[]{ "url": asset->url, "alt": alt },
        shortDescription,
        "overviewText": pt::text(overviewText),
        targetAudience,
        featuredReviewQuote,
        tourForMeDescription,
        itinerary[]{
          "key": _key,
          dayNumber,
          title,
          "description": pt::text(description),
          activities[],
          meals[],
          "activityImage": select(
            defined(activityImage.asset) => {
              "url": activityImage.asset->url,
              "alt": coalesce(activityImage.alt, title)
            }
          ),
          "accommodation": accommodation.name,
          "accommodationImage": select(
            defined(accommodation.image.asset) => {
              "url": accommodation.image.asset->url,
              "alt": coalesce(accommodation.image.alt, accommodation.name)
            }
          )
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
    `, { slug }),
    client.fetch<{ images?: AccommodationImage[] }[]>(`
      *[_type == "trip"] {
        "images": itinerary[defined(accommodation.image.asset)] {
          "name": accommodation.name,
          "url": accommodation.image.asset->url,
          "alt": coalesce(accommodation.image.alt, accommodation.name)
        }
      }
    `),
  ])
  if (!trip) return null
  const category = normalizeTripCategory(trip.title, trip.category || trip.tripType);
  const accommodationImages = accommodationImageGroups.flatMap((group) => group.images || []);
  const sourceItinerary = trip.itinerary || [];
  const itinerary = sourceItinerary.map((day, index) => {
    const ownAccommodationImage = day.accommodationImage?.url ? day.accommodationImage : null;
    const matchedAccommodationImage = ownAccommodationImage
      ? null
      : findAccommodationImage(day.accommodation, accommodationImages);
    const activities = Array.isArray(day.activities) && day.activities.some(Boolean)
      ? day.activities.filter(Boolean)
      : [day.title];
    const meals = Array.isArray(day.meals) && day.meals.some(Boolean)
      ? day.meals.filter(Boolean)
      : fallbackMealsForDay(day.title, index, sourceItinerary.length);

    return {
      ...day,
      activities,
      meals,
      activityImage: day.activityImage?.url
        ? { ...day.activityImage, url: optimizedSanityImageUrl(day.activityImage.url) || day.activityImage.url }
        : null,
      accommodationImage: ownAccommodationImage
        ? { ...ownAccommodationImage, url: optimizedSanityImageUrl(ownAccommodationImage.url) || ownAccommodationImage.url }
        : matchedAccommodationImage
          ? {
              url: optimizedSanityImageUrl(matchedAccommodationImage.url) || matchedAccommodationImage.url,
              alt: matchedAccommodationImage.alt || day.accommodation,
            }
          : null,
    };
  });

  return {
    ...trip,
    tripType: category,
    category,
    itinerary,
    heroImage: optimizedSanityImageUrl(trip.heroImage) || '/assets/trips/trip-hero-zebras.png',
    mapImage: optimizedSanityImageUrl(trip.mapImage, 1600),
    gallery: (trip.gallery || []).map((image) => ({
      ...image,
      url: optimizedSanityImageUrl(image.url) || image.url,
    })),
    price: typeof trip.priceValue === "number" && trip.priceValue > 0
      ? `from $${trip.priceValue.toLocaleString('en-US')} USD per person`
      : "Price on request",
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
  { slug: sharedTripSlug, title: "The Great Migration Classic", duration: "7 nights", route: "Serengeti + Ngorongoro", season: "July-October", tripType: "Wildlife Safari", priceValue: 1459, price: "from $1,459 USD per person", image: "/assets/figma/itinerary-1.jpg", imageAlt: "Tanzania safari itinerary preview 1" },
  { slug: sharedTripSlug, title: "Northern Circuit Safari", duration: "5 nights", route: "Tarangire + Ngorongoro", season: "June-October", tripType: "Wildlife Safari", priceValue: 1890, price: "from $1,890 USD per person", image: "/assets/figma/itinerary-2.jpg", imageAlt: "Tanzania safari itinerary preview 2" },
  { slug: sharedTripSlug, title: "Serengeti Fly-in Safari", duration: "4 nights", route: "Serengeti + Arusha", season: "All seasons", tripType: "Luxury Safari", priceValue: 2890, price: "from $2,890 USD per person", image: "/assets/figma/itinerary-3.jpg", imageAlt: "Tanzania safari itinerary preview 3" },
]
