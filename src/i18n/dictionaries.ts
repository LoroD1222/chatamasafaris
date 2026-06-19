import type { HomeDictionary, NavItem } from "@/i18n/types";

const asset = (name: string) => `/assets/figma/${name}`;

const primaryNav: NavItem[] = [
  { label: "Itineraries", href: "/trips" },
  { label: "Safaris", href: "/trips" },
  { label: "Kilimanjaro", href: "/trips" },
  { label: "Discover Tanzania", href: "/trips" }
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
  "itinerary-4.jpg",
  "itinerary-5.jpg",
  "itinerary-6.jpg"
];

const itinerarySlugs = [
  "great-migration-classic",
  "ngorongoro-serengeti-private-safari",
  "tarangire-ngorongoro-family-safari",
  "northern-circuit-luxury-safari",
  "zanzibar-safari-extension",
  "kilimanjaro-and-safari-adventure"
];

const en: HomeDictionary = {
  brand: {
    name: "Astra Tanzania Safaris",
    tagline: "Safari operator for USA travelers",
    logoAlt: "Astra Tanzania Safaris"
  },
  topBar: {
    label: "Safari Operator for USA Travelers",
    phone: "+255 62 674 7949",
    email: "info@astratanzaniasafaris.com"
  },
  nav: primaryNav,
  header: {
    plannerCta: "Talk to Safari Planner",
    menuLabel: "Open menu",
    closeLabel: "Close menu"
  },
  hero: {
    eyebrow: "Tanzania's #1 Rated Safari Operator for USA Travelers",
    titleBeforeBreak: "A lot of People visit",
    titleAfterBreakLead: "Africa.",
    titleHighlight: "A Few Witness It.",
    description:
      "Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.",
    primaryCta: "Talk to Safari Planner",
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
    note: "Free, no commitment. Your details stay with Astra Tanzania Safaris.",
    fields: plannerFields
  },
  experienceCategories: {
    eyebrow: "Our experiences",
    title: "Choose your Tanzania Experience Category",
    description: "Every trip is private, guided by experts, and built around what matters to you.",
    items: [
      {
        icon: "🏝️",
        eyebrow: "Zanzibar",
        title: "Zanzibar Island Retreat",
        meta: [],
        description:
          "Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.",
        cta: "Explore Zanzibar",
        href: "/trips",
        image: {
          src: asset("category-zanzibar.jpg"),
          alt: "Turquoise water and tropical coastline in Zanzibar"
        }
      },
      {
        icon: "🦁",
        eyebrow: "Wildlife Safari",
        title: "Classic Tanzania Safari",
        meta: ["For all ages", "For all ages"],
        description:
          "Turquoise waters, spice markets, and powder-white beaches. The perfect extension after your safari.",
        cta: "Explore African Wildlife",
        href: "/trips",
        image: {
          src: asset("tanzanian-widernes.png"),
          alt: "Tanzania wilderness with zebras on a safari road"
        }
      },
      {
        icon: "🏔️",
        eyebrow: "Kilimanjaro climb",
        title: "Climbing Kilimanjaro",
        meta: ["For all ages", "For all ages"],
        description:
          "World-class lodges, private game drives, and fine dining in the wild - for travelers who want the best of everything.",
        cta: "Explore Arusha",
        href: "/trips",
        image: {
          src: asset("category-kilimanjaro.jpg"),
          alt: "Tented camp below Mount Kilimanjaro"
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
    eyebrow: "Why Astra Tanzania",
    titleLead: "Built for travelers",
    titleHighlight: "who expect more",
    plannerLabel: "Talk to a safari planner",
    phone: "+255 62 674 7949",
    email: "info@astratanzaniasafaris.com",
    cta: "Talk to Safari Planner",
    items: [
      {
        icon: "🧭",
        title: "Private, expert guides",
        description:
          "Your guide has 10+ years in the bush - not a resort employee running a route. They know where the leopards sleep."
      },
      {
        icon: "💳",
        title: "Private, expert guides",
        description:
          'Quote in USD, pay in USD. No conversion risk. Full breakdown before any deposit. No hidden park fees, visa run-arounds, or "local surcharges."'
      },
      {
        icon: "📡",
        title: "24/7 US time-zone support",
        description:
          "Your US-based trip coordinator is reachable before and during your trip. Real person. Real phone. Not a chatbot at 3am Tanzania time."
      },
      {
        icon: "🗓️",
        title: "Migration-timed itineraries",
        description:
          "We map your dates to peak wildlife movements - Serengeti crossings, calving season, dry-season concentrations."
      },
      {
        icon: "🏕️",
        title: "Vetted camps only",
        description:
          "We've slept in every camp we recommend. Mobile tented camps, private conservancy lodges - zero compromise on safety or comfort."
      },
      {
        icon: "🔄",
        title: "Free rebooking guarantee",
        description:
          "Life changes. Rebook your safari up to 30 days before departure at no extra cost. No questions asked."
      }
    ]
  },
  itineraries: {
    eyebrow: "Experiences we offer",
    titleLead: "Choose your",
    titleHighlight: "Tanzania",
    titleTrail: "experience",
    description:
      "Private guided Tanzania safaris - planned for you, priced in USD, backed by 15 years of getting Americans to Africa.",
    cta: "View More Experiences",
    items: itineraryImages.map((image, index) => ({
      slug: itinerarySlugs[index],
      title: "The Great Migration Classic",
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
    eyebrow: "Experiences we offer",
    titleLead: "Stop overthinking.",
    titleHighlight: "Start planning.",
    paragraphs: [
      "Stop overthinking. Start planning.",
      "Tanzania is one of those trips people talk about for the rest of their lives - but only if you do it right. The Serengeti, Zanzibar, Kilimanjaro. It's all here, and it's all within reach. The hard part isn't getting to Tanzania. It's knowing who to trust to get you there.",
      "That's where we come in. We're Astra Tanzania - a small team based in Arusha with one job: building Tanzania trips that actually deliver what the photos promise. Not a call center. Not a booking engine. Real people who live here, know the parks, and answer your WhatsApp.",
      "Tell us your dates, how many people, and what matters most to you. We'll handle everything else - from which park to visit in your month, to what's included in every dollar you spend. No hidden fees. No vague itineraries. No surprises when you land.",
      "Immerse yourself in local culture, meet the Maasai, and experience Tanzania's breathtaking landscapes.",
      "With a focus on sustainable travel, we create unforgettable adventures while supporting local communities."
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
    description: "A short and simple subheading can be added here",
    items: [
      {
        quote: '"(Testimonial) lorem ipsum dolor sit amet, consec adipiscing sed do eiusmod."',
        author: "Full name",
        details: "Company name / details.",
        image: {
          src: asset("review-family.jpg"),
          alt: "Family on safari in Tanzania"
        }
      },
      {
        quote: '"(Testimonial) lorem ipsum dolor sit amet, consec adipiscing sed do eiusmod."',
        author: "Full name",
        details: "Company name / details.",
        image: {
          src: asset("review-family.jpg"),
          alt: "Family on safari in Tanzania"
        }
      },
      {
        quote: '"(Testimonial) lorem ipsum dolor sit amet, consec adipiscing sed do eiusmod."',
        author: "Full name",
        details: "Company name / details.",
        image: {
          src: asset("review-jeep.jpg"),
          alt: "Travelers in an Astra safari vehicle"
        }
      },
      {
        quote: '"(Testimonial) lorem ipsum dolor sit amet, consec adipiscing sed do eiusmod."',
        author: "Full name",
        details: "Company name / details.",
        image: {
          src: asset("review-jeep.jpg"),
          alt: "Travelers in an Astra safari vehicle"
        }
      }
    ]
  },
  faq: {
    eyebrow: "Overline text",
    title: "Frequently asked questions",
    description: "A short and simple subheading can be added here",
    items: [
      {
        question: "Question can be added here",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        question: "Question can be added here",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        question: "Question can be added here",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        question: "Question can be added here",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
  },
  finalCta: {
    eyebrow: "Experiences we offer",
    titleLead: "Still thinking about it?",
    titleHighlight: "Talk to a planner first - it's free.",
    description:
      "Just a 10-minute conversation with someone who knows Tanzania inside out. Tell us your dates, your budget, and what matters most - we'll tell you honestly whether we're the right fit.",
    aside: "July and August departures are filling up. If those months work for you, now is the time.",
    whatsappCta: "Ask us on Whatsapp",
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
    copyright: "©2025 Chalk UI - All Rights Reserved."
  }
};

export const dictionaries = { en } satisfies Record<string, HomeDictionary>;

export function getDictionary(locale: keyof typeof dictionaries) {
  return dictionaries[locale];
}
