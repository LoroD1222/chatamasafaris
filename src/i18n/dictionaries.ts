import type { HomeDictionary, NavItem } from "@/i18n/types";

const asset = (name: string) => `/assets/figma/${name}`;

const primaryNav: NavItem[] = [
  { label: "Safaris", href: "/trips?category=Safaris" },
  { label: "Honeymoon", href: "/trips?category=Honeymoon" },
  { label: "Zanzibar", href: "/trips?category=Zanzibar" },
  { label: "About us", href: "/en#about-us" }
];

const plannerFields: HomeDictionary["planner"]["fields"] = [
  {
    name: "name",
    label: "Your name",
    placeholder: "Your name",
    type: "text"
  },
  {
    name: "whatsapp",
    label: "Whatsapp number",
    placeholder: "Whatsapp number",
    type: "tel"
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    type: "email"
  },
  {
    name: "people",
    label: "How many people",
    placeholder: "How many people",
    type: "select",
    options: ["2 people", "3-4 people", "5-8 people", "Family group"]
  }
];

const itineraryImages = [
  "itinerary-1.jpg",
  "itinerary-2.jpg",
  "itinerary-3.jpg",
  "itinerary-4.jpg"
];

const itinerarySlugs = [
  "7-days-full-tanzanian-safari-experience",
  "10-day-ultimate-tanzania-safari",
  "9-days-tanzania-birdwatching-safaris",
  "3-days-serengeti-safari"
];

const itineraryTitles = [
  "7 Days Full Tanzanian Safari Experience",
  "10 Days Ultimate Tanzania Safari",
  "9 Days Tanzania Birdwatching Safaris",
  "3 Days Serengeti Safari"
];

const en: HomeDictionary = {
  brand: {
    name: "Chatama Safaris",
    tagline: "Connecting with Nature",
    logoAlt: "Chatama Safaris"
  },
  topBar: {
    label: "Highest Rated Tanzania Safari Operator",
    phone: "+255 787 453 075",
    email: "info@chatamasafaris.com"
  },
  nav: primaryNav,
  header: {
    plannerCta: "Talk to Safari Planner",
    menuLabel: "Open menu",
    closeLabel: "Close menu"
  },
  hero: {
    eyebrow: "Welcome to Chatama Safaris",
    titleBeforeBreak: "Your Gateway to",
    titleAfterBreakLead: "the Heart of",
    titleHighlight: "Africa",
    description:
      "Fully private, expertly guided, and planned around exactly how you want to travel.",
    primaryCta: "Let's Start Planning",
    secondaryCta: "Check Available Tours",
    image: {
      src: asset("hero.jpg"),
      alt: "A safari vehicle crossing the Serengeti plains in Tanzania"
    }
  },
  planner: {
    eyebrow: "Free, no commitment",
    title: "Talk to a safari planner",
    description: "We reply within 4 hours - by email or WhatsApp, your choice.",
    submit: "Talk to Safari Planner",
    success: "Thanks. A safari planner will reply within 4 hours.",
    note: "Free, no commitment. Your details stay with Chatama Safaris.",
    fields: plannerFields
  },
  experienceCategories: {
    eyebrow: "Our experiences",
    title: "Tanzania — A Land of Wonders",
    description: "Imagine waking up to the soft roars of lions in the distance, the serenity of the savannah at dawn, and the unmatched thrill of witnessing the Great Migration across the Serengeti plains.",
    descriptionBelow: "Tanzania is a treasure trove of biodiversity, culture, and history, offering more than just a safari but an immersion into a world where nature reigns supreme. With Chatama Safaris, discover why Tanzania is the jewel of Africa, from the majestic Kilimanjaro to the pristine beaches of Zanzibar.",
    items: [
      {
        icon: "🦁",
        eyebrow: "Safaris",
        title: "Safaris",
        meta: [],
        description:
          "Private game drives across the Serengeti, Tarangire, and Ngorongoro Crater. See the Big Five with an expert guide by your side.",
        cta: "Explore Safaris",
        href: "/trips?category=Safaris",
        image: {
          src: asset("tanzanian-widernes.png"),
          alt: "Tanzania wilderness with zebras on a safari road"
        }
      },
      {
        icon: "💍",
        eyebrow: "Honeymoon",
        title: "Honeymoon",
        meta: [],
        description:
          "World-class lodges, private game drives, and fine dining in the wild - for travelers who want the very best of everything.",
        cta: "Explore Honeymoon",
        href: "/trips?category=Honeymoon",
        image: {
          src: asset("category-honeymoon.jpg"),
          alt: "Couple holding hands on a Tanzania safari honeymoon"
        }
      },
      {
        icon: "🏝️",
        eyebrow: "Zanzibar",
        title: "Zanzibar Island Retreat",
        meta: [],
        description:
          "Turquoise waters, spice markets, and powder-white beaches. The perfect add-on after your safari - or a destination on its own.",
        cta: "Explore Zanzibar",
        href: "/trips?category=Zanzibar",
        image: {
          src: asset("category-zanzibar.jpg"),
          alt: "Turquoise water and tropical coastline in Zanzibar"
        }
      }
    ]
  },
  trust: {
    items: [
      { label: "Vetted camps only", icon: "camp" },
      { label: "Private expert guides", icon: "guide" },
      { label: "Priced in USD", icon: "priced" },
      { label: "24/7 live support", icon: "support" }
    ],
    note: "Not sure what is right for you? Talk to a safari planner - it's free."
  },
  why: {
    eyebrow: "Why Chatama Safaris",
    titleLead: "Built for travelers",
    titleHighlight: "who expect more",
    plannerLabel: "Talk to a safari planner",
    phone: "+255 787 453 075",
    email: "info@chatamasafaris.com",
    cta: "Talk to Safari Planner",
    items: [
      {
        icon: "🧭",
        title: "Unmatched Expertise",
        description:
          "Our team's profound knowledge of Tanzania ensures a safari experience that's both authentic and deeply engaging."
      },
      {
        icon: "💳",
        title: "Personalized Journeys",
        description:
          "Every safari is tailored to fit your dreams, offering unique adventures that resonate with your spirit of exploration."
      },
      {
        icon: "📡",
        title: "Commitment to Conservation",
        description:
          "We advocate for the conservation of the Wild places for future generations."
      },
      {
        icon: "🗓️",
        title: "Exceptional Value",
        description:
          "With competitive pricing and unmatched service, we ensure your safari adventure delivers unforgettable moments at the best value."
      },
      {
        icon: "🏕️",
        title: "Certified Team",
        description:
          "Expertly trained and certified, our team ensures a safe, enlightening safari experience, bringing the best of Tanzania to life."
      },
      {
        icon: "🔄",
        title: "Trusted Company",
        description:
          "As a trusted safari provider, we're dedicated to authentic, sustainable adventures, earning accolades and trust globally."
      }
    ]
  },
  itineraries: {
    eyebrow: "WHAT WE OFFER",
    titleLead: "Our Safari Packages",
    titleHighlight: "",
    titleTrail: "",
    description:
      "Every trip is private, guided by experts, and built around what you want to see.",
    cta: "View all packages",
    items: itineraryImages.map((image, index) => ({
      slug: itinerarySlugs[index],
      title: itineraryTitles[index],
      duration: "7 nights",
      route: "Serengeti + Ngorongoro",
      season: "July-October",
      price: "from $1459 USD per person",
      image: {
        src: asset(image),
        alt: `Tanzania safari itinerary preview ${index + 1}`
      }
    }))
  },
  planning: {
    eyebrow: "Embrace the Wild Heart of Africa",
    titleLead: "Embrace the Wild",
    titleHighlight: "Heart of Africa",
    paragraphs: [
      "Welcome to Chatama Safaris where your journey into the heart of Tanzania begins. Here, every safari is more than just a trip; it's a story written in the golden light of the savannah, the distant call of wildlife, and the peaceful rustle of untouched landscapes.",
      "We're here to craft unforgettable experiences that bring you face-to-face with nature in its purest form. Whether it's your first time or your fifth, Tanzania will move you, surprise you, and stay with you long after you've gone.",
      "Ready to create memories you'll never forget? Your adventure starts now."
    ],
    cta: "Talk to Safari Planner",
    aside: "Your journey begins here!",
    image: {
      src: asset("start-planningimage.png"),
      alt: "Tanzania safari landscape chosen for the planning section"
    }
  },
  reviews: {
    eyebrow: "Experiences we offer",
    title: "Customer reviews",
    description: "What our travelers say",
    items: [
      {
        quote: '"We saw four of the Big Five on day one. Our guide knew exactly where to be and when - it was like he could read the animals\' minds."',
        author: "Sarah M.",
        details: "12-Day Luxury Safari & Zanzibar, June 2024",
        image: {
          src: asset("review-family.jpg"),
          alt: "Family on safari in Tanzania"
        }
      },
      {
        quote: '"Chatama Safaris handled everything from the moment we landed to the moment we left. Zero stress. Just pure experience."',
        author: "James & Linda R.",
        details: "6-Day Great Migration Safari, August 2024",
        image: {
          src: asset("review-family.jpg"),
          alt: "Family on safari in Tanzania"
        }
      },
      {
        quote: '"The Great Migration crossing was the most breathtaking thing I\'ve ever witnessed. Worth every penny and every hour of planning."',
        author: "David K.",
        details: "4-Day Luxury Tanzania Safari, July 2024",
        image: {
          src: asset("review-jeep.jpg"),
          alt: "Travelers in a Chatama Safaris vehicle"
        }
      },
      {
        quote: '"I\'ve done group tours before and they\'re nothing like this. Private guides, our own vehicle, our own schedule. This is how safari should be done."',
        author: "Michelle T.",
        details: "7-Day Safari from Zanzibar, October 2024",
        image: {
          src: asset("review-jeep.jpg"),
          alt: "Travelers in a Chatama Safaris vehicle"
        }
      }
    ]
  },
  faq: {
    eyebrow: "Got questions?",
    title: "Frequently asked questions",
    description: "Everything you need to know before booking",
    items: [
      {
        question: "How far in advance should I book my Tanzania safari?",
        answer:
          "We recommend booking 4-6 months ahead, especially for July-October (peak migration season). That said, we've organized trips in under 4 weeks - reach out and we'll tell you what's available."
      },
      {
        question: "Is Tanzania safe for American travelers?",
        answer:
          "Yes. Tanzania is one of the most politically stable countries in East Africa. Our parks are well-managed and our guides are trained for your safety in the bush. We've been bringing US travelers here for 15 years without incident."
      },
      {
        question: "What's included in your pricing?",
        answer:
          "All park fees, accommodation, meals during safari, private game drives, and airport transfers are included. International flights and visa fees are separate. You'll get a full line-item breakdown before any deposit."
      },
      {
        question: "Can I combine a safari with Zanzibar or Kilimanjaro?",
        answer:
          "Absolutely - and most of our clients do. We handle the logistics between destinations. A typical combo is 6-8 days on safari followed by 3-4 days in Zanzibar."
      }
    ]
  },
  finalCta: {
    eyebrow: "BOOK / ENQUIRE NOW",
    titleLead: "Start Your Safari",
    titleHighlight: "Journey Now",
    description:
      "Adventure calls from the wild heart of Africa. Are you ready to answer? With Chatama Safaris, step into a world where each day brings a new story, and a new discovery.",
    aside: "July and August departures are filling up. If those months work for you, now is the time.",
    whatsappCta: "Contact us on WhatsApp",
    background: {
      src: asset("final-cta-backgroundimage.png"),
      alt: "Safari travelers in a Tanzania final planning scene"
    }
  },
  footer: {
    links: primaryNav,
    legalLinks: [
      { label: "Terms of Service", href: "#" },
      { label: "Cookies Settings", href: "#" },
      { label: "Privacy Policy", href: "#" }
    ],
    copyright: "©2025 Chatama Safaris - All Rights Reserved."
  }
};

export const dictionaries = { en } satisfies Record<string, HomeDictionary>;

export function getDictionary(locale: keyof typeof dictionaries) {
  return dictionaries[locale];
}
