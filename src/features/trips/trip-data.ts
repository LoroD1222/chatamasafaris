import { client } from '@/lib/sanity'

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
  itinerary: { dayNumber: number; title: string; description: string; accommodation: string }[];
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
}

type SanityTripCard = Omit<TripCard, "price"> & {
  slug?: string | null;
  title?: string | null;
  duration?: string | null;
  route?: string | null;
  season?: string | null;
  tripType?: string | null;
  priceValue?: number | null;
  image?: string | null;
  imageAlt?: string | null;
}

type SanityTripDetail = Omit<TripDetail, "price">;

// Shared static detail page used until CMS-driven detail templates are added.
export const sharedTripSlug = "great-migration-classic"

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
  return trips.map((t) => ({
    slug: t.slug || sharedTripSlug,
    title: t.title || "Tanzania Safari",
    duration: t.duration || "",
    route: t.route || "",
    season: t.season || "",
    tripType: t.tripType || "Wildlife Safari",
    priceValue: t.priceValue || 0,
    image: t.image || '/assets/figma/itinerary-1.jpg',
    imageAlt: t.imageAlt || t.title || "Tanzania safari itinerary preview",
    price: `from $${(t.priceValue || 0).toLocaleString('en-US')} USD per person`,
  }))
}

export async function getTripBySlug(slug: string): Promise<TripDetail | null> {
  const trip = await client.fetch<SanityTripDetail | null>(`
    *[_type == "trip" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      "duration": duration,
      "route": destinations,
      "season": bestSeason,
      "tripType": category,
      "priceValue": priceFrom,
      "heroImage": heroImage.asset->url,
      "gallery": gallery[]{ "url": asset->url, "alt": alt },
      shortDescription,
      "overviewText": pt::text(overviewText),
      targetAudience,
      featuredReviewQuote,
      itinerary[]{ dayNumber, title, "description": pt::text(description), "accommodation": accommodation.name },
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
  return {
    ...trip,
    heroImage: trip.heroImage || '/assets/trips/trip-hero-zebras.png',
    price: `from $${trip.priceValue?.toLocaleString('en-US')} USD per person`,
  }
}

// Fallback static data used until Sanity has content
export const galleryImages = [
  { src: "/assets/trips/trip-hero-zebras.png", alt: "Zebras grazing in Serengeti during a Tanzania safari" },
  { src: "/assets/figma/itinerary-2.jpg", alt: "Tanzania wilderness road and plains" },
  { src: "/assets/figma/itinerary-3.jpg", alt: "Safari vehicle in the grass" },
  { src: "/assets/figma/itinerary-5.jpg", alt: "Zanzibar turquoise coastline" }
]

export const itineraryDays = [
  { day: "DAY 1", title: "Tarangire National Park, Return To Arusha", description: "After breakfast, continue toward Tarangire National Park, one of Tanzania's most scenic and elephant-rich parks. Enjoy a private game drive with picnic lunch before returning toward Arusha.", accommodation: "Ahadi Lodge" },
  { day: "DAY 2", title: "Tarangire National Park, Return To Arusha", description: "Your safari continues with a relaxed morning game drive and time to follow wildlife movement across the plains.", accommodation: "Ahadi Lodge" },
  { day: "DAY 3", title: "Tarangire National Park, Return To Arusha", description: "Enjoy your final safari experience before beginning the return journey to Arusha.", accommodation: "Ahadi Lodge" }
]

export const includedItems = [
  "Professional English-speaking guide",
  "Private luxury 4x4 safari vehicle",
  "All park entry fees",
  "2 nights camp accommodation",
]

export const faqs = [
  { question: "Question can be added here", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { question: "Question can be added here", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
]

export const tripCards: TripCard[] = [
  { slug: sharedTripSlug, title: "The Great Migration Classic", duration: "7 nights", route: "Serengeti + Ngorongoro", season: "July-October", tripType: "Wildlife Safari", priceValue: 1459, price: "from $1,459 USD per person", image: "/assets/figma/itinerary-1.jpg", imageAlt: "Tanzania safari itinerary preview 1" },
  { slug: sharedTripSlug, title: "Northern Circuit Safari", duration: "5 nights", route: "Tarangire + Ngorongoro", season: "June-October", tripType: "Wildlife Safari", priceValue: 1890, price: "from $1,890 USD per person", image: "/assets/figma/itinerary-2.jpg", imageAlt: "Tanzania safari itinerary preview 2" },
  { slug: sharedTripSlug, title: "Serengeti Fly-in Safari", duration: "4 nights", route: "Serengeti + Arusha", season: "All seasons", tripType: "Luxury Safari", priceValue: 2890, price: "from $2,890 USD per person", image: "/assets/figma/itinerary-3.jpg", imageAlt: "Tanzania safari itinerary preview 3" },
  { slug: sharedTripSlug, title: "Zanzibar Island Retreat", duration: "4 nights", route: "Stone Town + Coast", season: "All seasons", tripType: "Zanzibar", priceValue: 2140, price: "from $2,140 USD per person", image: "/assets/figma/category-zanzibar.jpg", imageAlt: "Zanzibar turquoise water and tropical coast" },
  { slug: sharedTripSlug, title: "Kilimanjaro Summit Climb", duration: "7 nights", route: "Machame + Moshi", season: "June-October", tripType: "Kilimanjaro", priceValue: 3340, price: "from $3,340 USD per person", image: "/assets/figma/category-kilimanjaro.jpg", imageAlt: "Tents below Mount Kilimanjaro" },
]
