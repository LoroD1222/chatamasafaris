export type NavItem = {
  label: string;
  href: string;
};

export type PlannerField =
  | {
      name: string;
      label: string;
      placeholder: string;
      type: "text" | "email" | "tel";
    }
  | {
      name: string;
      label: string;
      placeholder: string;
      type: "select";
      options: string[];
    };

export type AssetImage = {
  src: string;
  alt: string;
};

export type ExperienceCategory = {
  icon: string;
  eyebrow: string;
  title: string;
  meta: string[];
  description: string;
  cta: string;
  image: AssetImage;
};

export type TrustItem = {
  label: string;
  icon: string;
};

export type WhyItem = {
  icon: string;
  title: string;
  description: string;
};

export type Itinerary = {
  title: string;
  duration: string;
  route: string;
  season: string;
  price: string;
  image: AssetImage;
};

export type Review = {
  quote: string;
  author: string;
  details: string;
  image: AssetImage;
};

export type Faq = {
  question: string;
  answer: string;
};

export type HomeDictionary = {
  brand: {
    name: string;
    tagline: string;
    logoAlt: string;
  };
  topBar: {
    label: string;
    phone: string;
    email: string;
  };
  nav: NavItem[];
  header: {
    plannerCta: string;
    menuLabel: string;
    closeLabel: string;
  };
  hero: {
    eyebrow: string;
    titleBeforeBreak: string;
    titleAfterBreakLead: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image: AssetImage;
  };
  planner: {
    eyebrow: string;
    title: string;
    description: string;
    submit: string;
    success: string;
    note: string;
    fields: PlannerField[];
  };
  experienceCategories: {
    eyebrow: string;
    title: string;
    description: string;
    items: ExperienceCategory[];
  };
  trust: {
    items: TrustItem[];
    note: string;
  };
  why: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    plannerLabel: string;
    phone: string;
    email: string;
    cta: string;
    items: WhyItem[];
  };
  itineraries: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    titleTrail: string;
    description: string;
    cta: string;
    items: Itinerary[];
  };
  planning: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    paragraphs: string[];
    cta: string;
    aside: string;
    images: AssetImage[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    description: string;
    items: Review[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: Faq[];
  };
  finalCta: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    aside: string;
    whatsappCta: string;
    background: AssetImage;
  };
  footer: {
    links: NavItem[];
    legalLinks: NavItem[];
    copyright: string;
  };
};
