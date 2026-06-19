export const sharedTripSlug = "great-migration-classic";

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
};

const tripCardSeed = [
  ["The Great Migration Classic", "7 nights", "Serengeti + Ngorongoro", "July-October", "Wildlife Safari", 1459, "/assets/figma/itinerary-1.jpg"],
  ["Northern Circuit Safari", "5 nights", "Tarangire + Ngorongoro", "June-October", "Wildlife Safari", 1890, "/assets/figma/itinerary-2.jpg"],
  ["Serengeti Fly-in Safari", "4 nights", "Serengeti + Arusha", "All seasons", "Luxury Safari", 2890, "/assets/figma/itinerary-3.jpg"],
  ["Zanzibar After Safari", "6 nights", "Serengeti + Zanzibar", "July-October", "Zanzibar Extension", 2140, "/assets/figma/itinerary-5.jpg"],
  ["Kilimanjaro & Safari", "8 nights", "Kilimanjaro + Tarangire", "January-March", "Kilimanjaro", 3340, "/assets/figma/itinerary-4.jpg"],
  ["Family Safari Classic", "5 nights", "Lake Manyara + Ngorongoro", "All seasons", "Family Safari", 1690, "/assets/figma/itinerary-6.jpg"],
  ["Private Migration Safari", "7 nights", "Serengeti + Mara River", "July-October", "Wildlife Safari", 2450, "/assets/figma/itinerary-1.jpg"],
  ["Luxury Crater Safari", "4 nights", "Ngorongoro + Tarangire", "June-October", "Luxury Safari", 3120, "/assets/figma/itinerary-2.jpg"],
  ["Zanzibar Wildlife Combo", "9 nights", "Serengeti + Stone Town", "All seasons", "Zanzibar Extension", 2760, "/assets/figma/itinerary-5.jpg"],
  ["Short Family Safari", "3 nights", "Tarangire + Arusha", "All seasons", "Family Safari", 1290, "/assets/figma/itinerary-6.jpg"],
  ["Kilimanjaro Private Add-on", "6 nights", "Kilimanjaro + Arusha", "January-March", "Kilimanjaro", 1990, "/assets/figma/itinerary-4.jpg"],
  ["Classic Big Five Safari", "6 nights", "Serengeti + Ngorongoro", "June-October", "Wildlife Safari", 2190, "/assets/figma/itinerary-3.jpg"],
  ["Honeymoon Safari", "7 nights", "Serengeti + Zanzibar", "All seasons", "Luxury Safari", 3590, "/assets/figma/itinerary-5.jpg"],
  ["Family Migration Safari", "7 nights", "Serengeti + Ngorongoro", "July-October", "Family Safari", 2380, "/assets/figma/itinerary-1.jpg"],
  ["Kilimanjaro Wildlife Escape", "9 nights", "Kilimanjaro + Serengeti", "June-October", "Kilimanjaro", 3860, "/assets/figma/itinerary-4.jpg"]
] as const;

export const tripCards: TripCard[] = tripCardSeed.map(([title, duration, route, season, tripType, priceValue, image], index) => ({
  slug: sharedTripSlug,
  title,
  duration,
  route,
  season,
  tripType,
  priceValue,
  price: `from $${priceValue.toLocaleString("en-US")} USD per person`,
  image,
  imageAlt: `Tanzania safari itinerary preview ${index + 1}`
}));

export const galleryImages = [
  {
    src: "/assets/trips/trip-hero-zebras.png",
    alt: "Zebras grazing in Serengeti during a Tanzania safari"
  },
  {
    src: "/assets/figma/itinerary-2.jpg",
    alt: "Tanzania wilderness road and plains"
  },
  {
    src: "/assets/figma/itinerary-3.jpg",
    alt: "Safari vehicle in the grass"
  },
  {
    src: "/assets/figma/itinerary-5.jpg",
    alt: "Zanzibar turquoise coastline"
  }
];

export const itineraryDays = [
  {
    day: "DAY 1",
    title: "Tarangire National Park, Return To Arusha",
    description:
      "After breakfast, continue toward Tarangire National Park, one of Tanzania's most scenic and elephant-rich parks. Enjoy a private game drive with picnic lunch before returning toward Arusha.",
    accommodation: "Ahadi Lodge"
  },
  {
    day: "DAY 2",
    title: "Tarangire National Park, Return To Arusha",
    description:
      "Your safari continues with a relaxed morning game drive and time to follow wildlife movement across the plains. The route and pace stay flexible around your private group.",
    accommodation: "Ahadi Lodge"
  },
  {
    day: "DAY 3",
    title: "Tarangire National Park, Return To Arusha",
    description:
      "Enjoy your final safari experience before beginning the return journey to Arusha, marking the end of your unforgettable luxury safari adventure.",
    accommodation: "Ahadi Lodge"
  }
];

export const includedItems = [
  "Professional English-speaking guide",
  "Private luxury 4x4 safari vehicle",
  "All park entry fees",
  "2 nights camp accommodation",
  "All park entry fees",
  "2 nights camp accommodation",
  "Professional English-speaking guide",
  "Private luxury 4x4 safari vehicle",
  "All park entry fees",
  "2 nights camp accommodation",
  "All park entry fees",
  "2 nights camp accommodation"
];

export const faqs = [
  {
    question: "Question can be added here",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Question can be added here",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Question can be added here",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "Question can be added here",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];
