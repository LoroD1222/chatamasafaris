export type NavItem = {
  label: string;
  href: string;
};

export type PlannerField = {
  label: string;
  placeholder: string;
  options: string[];
};

export type Benefit = {
  value: string;
  label: string;
  description: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type Experience = {
  title: string;
  category: string;
  image: string;
};

export type HomeDictionary = {
  brand: {
    name: string;
    tagline: string;
  };
  nav: NavItem[];
  header: {
    plannerCta: string;
    menuLabel: string;
    closeLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  planner: {
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    note: string;
    fields: PlannerField[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    items: Benefit[];
  };
  expertise: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    items: Feature[];
  };
  experiences: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    items: Experience[];
  };
  footer: {
    cta: string;
    note: string;
    copyright: string;
  };
};
