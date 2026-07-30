import type { HomeDictionary, NavItem } from "@/i18n/types";

const asset = (name: string) => `/assets/figma/${name}`;

const primaryNav: NavItem[] = [
  { label: "Wildlife Safari", href: "/trips?category=Wildlife+Safari" },
  { label: "Luxury Safari", href: "/trips?category=Luxury+Safari" },
  { label: "Zanzibar", href: "/trips?category=Zanzibar" },
  { label: "About us", href: "/#about-us" }
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
    description: "Our carefully crafted itineraries, handpicked guides, and deep local knowledge ensure that every experience is personal, immersive, and unforgettable.",
    descriptionBelow: "Whether you dream of witnessing the Great Migration, tracking big cats on the Serengeti plains, or exploring hidden gems off the beaten path, we are here to guide you every step of the way.",
    items: [
      {
        icon: "🦁",
        eyebrow: "Wildlife Safari",
        title: "Classic Tanzania Safari",
        meta: [],
        description:
          "Private game drives across the Serengeti, Tarangire, and Ngorongoro Crater. See the Big Five with an expert guide by your side.",
        cta: "Explore Wildlife Safari",
        href: "/trips?category=Wildlife+Safari",
        image: {
          src: asset("classic-safari.jpg"),
          alt: "Classic Tanzania safari vehicle beside elephants and wildebeest at a waterhole"
        }
      },
      {
        icon: "🌟",
        eyebrow: "Luxury Safari",
        title: "Premium Tanzania Safari",
        meta: [],
        description:
          "World-class lodges, private game drives, and fine dining in the wild - for travelers who want the very best of everything.",
        cta: "Explore Luxury Safari",
        href: "/trips?category=Luxury+Safari",
        image: {
          src: asset("luxury-safari-image.jpg"),
          alt: "Luxury safari lodge deck overlooking the Serengeti at sunset"
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
          src: asset("zanzibar-88.jpg"),
          alt: "Turquoise water and tropical coastline in Zanzibar"
        }
      }
    ]
  },
  trust: {
    items: [
      { label: "Generosity", icon: "generosity" },
      { label: "Quest to serve", icon: "service" },
      { label: "Love for the animals and nature", icon: "nature" },
      { label: "Team work", icon: "teamwork" }
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
        icon: "compass",
        title: "Unmatched Expertise",
        description:
          "Our team's profound knowledge of Tanzania ensures a safari experience that's both authentic and deeply engaging."
      },
      {
        icon: "route",
        title: "Personalized Journeys",
        description:
          "Every safari is tailored to fit your dreams, offering unique adventures that resonate with your spirit of exploration."
      },
      {
        icon: "leaf",
        title: "Commitment to Conservation",
        description:
          "We advocate for the conservation of the Wild places for future generations."
      },
      {
        icon: "gem",
        title: "Exceptional Value",
        description:
          "With competitive pricing and unmatched service, we ensure your safari adventure delivers unforgettable moments at the best value."
      },
      {
        icon: "award",
        title: "Certified Team",
        description:
          "Expertly trained and certified, our team ensures a safe, enlightening safari experience, bringing the best of Tanzania to life."
      },
      {
        icon: "shield",
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
      "Chatama Safaris is a registered Tanzanian tour operator founded in 2024 with a passion for sharing the wild heart of Africa with travellers from around the world.",
      "We believe every safari is more than a journey. It is a story shaped by golden savannahs, unforgettable wildlife encounters, and Tanzania's untouched landscapes.",
      "Our mission is to create memorable, tailor-made safari experiences through professional guiding and carefully planned itineraries built around each traveller's interests and needs.",
      "Our vision is to become one of East Africa's most trusted safari providers, known for authentic experiences, excellent service, and personal attention.",
      "Whether it is your first safari or your fifth, Tanzania will stay with you long after you return home.",
      "Your journey into the heart of Tanzania begins with Chatama Safaris."
    ],
    cta: "Talk to Safari Planner",
    aside: "Your journey begins here!",
    image: {
      src: asset("about-us-image-2026.png"),
      alt: "Tanzania safari landscape chosen for the planning section"
    }
  },
  reviews: {
    eyebrow: "Experiences we offer",
    title: "Customer reviews",
    description: "What our travelers say",
    items: [
      {
        quote: '"Peter and Mohamed, thank you for providing us with an unforgettable experience. You tolerated all of our questions and silly comments, and welcomed our games. You showed us the true meaning of Tanzanian hospitality. Your vast knowledge and love for what you do is evident and infectious. We hope you continue to name animals in our honor and will think of us whenever you see the elephants. Si kwaheri, ni tutaonana hivi karibuni. Asante sana, Nicoletta and Olina."',
        author: "Nicoletta",
        details: "10 days Wildlife safari, June 27, 2026",
        image: {
          src: asset("reviews/review-group.jpg"),
          alt: "Chatama Safaris guests with their guide",
          position: "object-[center_42%]"
        }
      },
      {
        quote: '"I have known the Chatama Safari tour guides for more than 10 years. Every time I come to Tanzania, the reason for the comeback has been meeting this team. It has never been a disappointment. Chatama Safari is the answer for an exclusive safari guiding experience."',
        author: "Carolyn Housman",
        details: "10 days luxury safari, May 20, 2024",
        image: {
          src: asset("reviews/review-dinner.jpg"),
          alt: "Chatama Safaris guests at dinner",
          position: "object-[center_45%]"
        }
      },
      {
        quote: '"We booked and travelled with Chatama Safaris, and this was our best organized safari ever. Our safari tour guide, Peter, was knowledgeable, professional and friendly."',
        author: "Julia Senkowysky",
        details: "8 days honeymoon safari, October 10, 2025",
        image: {
          src: asset("reviews/review-culture.jpg"),
          alt: "Chatama Safaris guests in Maasai dress",
          position: "object-[center_34%]"
        }
      },
      {
        quote: '"Wonderful safari by Chatama Safari professional guides. They are more than just Serengeti guides; they accommodated many subjects of life, whether at dinner or on safari. I strongly recommend them for an exclusive and professional guided safari experience."',
        author: "Alissa Brill",
        details: "June 29, 2026"
      },
      {
        quote: '"Chatama Safari went beyond expectations. They provided us with the best itinerary for our honeymoon. They arranged lodges in exclusive areas of the Serengeti, perfect for our honeymoon. They have amazing professional guides and always took us deeper into the Serengeti. I recommend booking with Chatama Safari for a honeymoon vacation in Tanzania."',
        author: "Andrea",
        details: "Honeymoon vacation in Tanzania, October 25, 2025"
      },
      {
        quote: '"I love the educated and professional guiding. We saw the Big Five and many more. The guides\' knowledge was amazing. Playing games on the Serengeti plains was, to me, one of the unforgettable moments."',
        author: "Anne",
        details: "2026"
      },
      {
        quote: '"Chatama Safari provided us with a vibe beyond our expectations, from their relaxed itinerary focused on the client\'s interests to their professional guide service. It was an unforgettable lifetime safari experience."',
        author: "Katie",
        details: "Chatama Safaris guest"
      },
      {
        quote: '"Wonderful experience delivered by professional and experienced safari guides. The whole trip was well organized. I cannot wait to meet them again. Chatama Safari is the ultimate team of professional safari providers."',
        author: "Melissa Mentone",
        details: "June 28, 2022"
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
    copyright: "©2026 Chatama Safaris - All Rights Reserved."
  }
};

export const dictionaries = { en } satisfies Record<string, HomeDictionary>;

export function getDictionary(locale: keyof typeof dictionaries) {
  return dictionaries[locale];
}
