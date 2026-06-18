export const sharedTripSlug = "great-migration-classic";

export type TripCard = {
  slug: string;
  title: string;
  duration: string;
  route: string;
  season: string;
  price: string;
  image: string;
  imageAlt: string;
};

const cardImages = [
  "/assets/figma/itinerary-1.jpg",
  "/assets/figma/itinerary-2.jpg",
  "/assets/figma/itinerary-3.jpg",
  "/assets/figma/itinerary-4.jpg",
  "/assets/figma/itinerary-5.jpg",
  "/assets/figma/itinerary-6.jpg"
];

export const tripCards: TripCard[] = Array.from({ length: 15 }, (_, index) => ({
  slug: sharedTripSlug,
  title: "The Great Migration Classic",
  duration: "7 nights",
  route: "Serengeti + Ngorongoro",
  season: "July-October",
  price: "from $1459 USD per person",
  image: cardImages[index % cardImages.length],
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
