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

export async function getTripCards(): Promise<TripCard[]> {
  const trips = await client.fetch(`
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
  return trips.map((t: any) => ({
    ...t,
    image: t.image || '/assets/figma/itinerary-1.jpg',
    imageAlt: t.imageAlt || t.title,
    price: `from $${t.priceValue?.toLocaleString('en-US')} USD per person`,
  }))
}

export async function getRecentTrips(limit = 6): Promise<TripCard[]> {
  const trips = await client.fetch(`
    *[_type == "trip"] | order(_createdAt desc) [0...$limit] {
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
  `, { limit })
  return trips.map((t: any) => ({
    ...t,
    image: t.image || '/assets/figma/itinerary-1.jpg',
    imageAlt: t.imageAlt || t.title,
    price: `from $${t.priceValue?.toLocaleString('en-US')} USD per person`,
  }))
}

export async function getSimilarTrips(slug: string, category: string, limit = 3): Promise<TripCard[]> {
  const trips = await client.fetch(`
    *[_type == "trip" && slug.current != $slug && category == $category] | order(_createdAt desc) [0...$limit] {
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
  `, { slug, category, limit })
  return trips.map((t: any) => ({
    ...t,
    image: t.image || '/assets/figma/itinerary-1.jpg',
    imageAlt: t.imageAlt || t.title,
    price: `from $${t.priceValue?.toLocaleString('en-US')} USD per person`,
  }))
}

export async function getTripBySlug(slug: string): Promise<TripDetail | null> {
  const trip = await client.fetch(`
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
  return {
    ...trip,
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
  { slug: sharedTripSlug, title: "The Great Migration Classic", duration: "7 nights", route: "Serengeti + Ngorongoro", season: "July-October", tripType: "Wildlife Safari", priceValue: 1459, price: "from $1,459 USD per person", image: "/assets/figma/itinerary-1.jpg", imageAlt: "Tanzania safari itinerary preview 1" },
  { slug: sharedTripSlug, title: "Northern Circuit Safari", duration: "5 nights", route: "Tarangire + Ngorongoro", season: "June-October", tripType: "Wildlife Safari", priceValue: 1890, price: "from $1,890 USD per person", image: "/assets/figma/itinerary-2.jpg", imageAlt: "Tanzania safari itinerary preview 2" },
  { slug: sharedTripSlug, title: "Serengeti Fly-in Safari", duration: "4 nights", route: "Serengeti + Arusha", season: "All seasons", tripType: "Luxury Safari", priceValue: 2890, price: "from $2,890 USD per person", image: "/assets/figma/itinerary-3.jpg", imageAlt: "Tanzania safari itinerary preview 3" },
]
