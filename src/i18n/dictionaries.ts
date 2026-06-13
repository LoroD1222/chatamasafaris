import type { HomeDictionary } from "@/i18n/types";

const safariImages = {
  migration: "https://images.unsplash.com/photo-1549366021-9f761d040a94?auto=format&fit=crop&w=900&q=80",
  kilimanjaro: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=900&q=80",
  camp: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  lodge: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
  culture: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=900&q=80"
};

const en: HomeDictionary = {
  brand: {
    name: "Seba Safari",
    tagline: "Tailor-made Tanzania"
  },
  nav: [
    { label: "Destinations", href: "#experiences" },
    { label: "Safari", href: "#expertise" },
    { label: "Why Seba", href: "#benefits" },
    { label: "Contact", href: "#planner" }
  ],
  header: {
    plannerCta: "Talk to a local planner",
    menuLabel: "Open menu",
    closeLabel: "Close menu"
  },
  hero: {
    eyebrow: "Private Tanzania safaris",
    title: "A lot of people visit Africa. A few witness it.",
    description:
      "Design a private safari through Tanzania with local planners who know the migration, hidden lodges, quiet routes, and the small timing details that make a journey feel effortless.",
    primaryCta: "Start safari planning",
    secondaryCta: "Explore experiences"
  },
  planner: {
    title: "Talk to a local planner",
    description: "Share a few trip details and we will shape the first route around your timing, pace, and budget.",
    emailLabel: "Email",
    emailPlaceholder: "traveler@example.com",
    submit: "Plan my safari",
    note: "Response within one business day.",
    fields: [
      {
        label: "Travel month",
        placeholder: "Choose month",
        options: ["June to October", "November to March", "April to May", "Flexible"]
      },
      {
        label: "Travelers",
        placeholder: "Group size",
        options: ["2 travelers", "3-4 travelers", "5-8 travelers", "Family group"]
      },
      {
        label: "Safari style",
        placeholder: "Choose style",
        options: ["Classic safari", "Migration focused", "Luxury lodges", "Safari + coast"]
      }
    ]
  },
  benefits: {
    eyebrow: "Built for serious travelers",
    title: "Most travelers from the USA make these costly safari mistakes when traveling to Tanzania",
    items: [
      {
        value: "01",
        label: "Choosing the wrong park sequence",
        description: "Avoid wasted transfer days by matching the route to wildlife movement and arrival airports."
      },
      {
        value: "02",
        label: "Booking lodges without context",
        description: "Know when a famous lodge is too far from the action, too busy, or simply not worth the premium."
      },
      {
        value: "03",
        label: "Missing seasonal details",
        description: "Migration crossings, calving, green season value, and road conditions all change the right plan."
      }
    ]
  },
  expertise: {
    eyebrow: "Local guidance",
    title: "Built for travelers who expect more",
    description:
      "Every itinerary is shaped by people who understand how the parks, seasons, camps, and transfers work together in real life.",
    cta: "Meet your planning team",
    items: [
      { title: "Private expert guides", description: "Guides selected for wildlife knowledge, calm pacing, and deep local context." },
      { title: "Flexible camp plans", description: "Routes adapt around migration timing, special interests, and comfort level." },
      { title: "24/7 in-trip support", description: "Local backup is available throughout the journey, not only before departure." },
      { title: "Migration timing", description: "Plans account for real seasonal movement instead of generic park lists." },
      { title: "Vetted stays", description: "Every lodge or camp is selected for location, service, and value." },
      { title: "Clear budgeting", description: "Transparent tradeoffs help decide where to splurge and where to save." }
    ]
  },
  experiences: {
    eyebrow: "Choose your Tanzania experience",
    title: "Safari routes shaped around what you came to see",
    description: "Start with the style of journey, then let the route, lodges, and timing follow.",
    cta: "View all experiences",
    items: [
      { title: "Great Migration", category: "Serengeti", image: safariImages.migration },
      { title: "Kilimanjaro foothills", category: "Northern circuit", image: safariImages.kilimanjaro },
      { title: "Private mobile camps", category: "Wildlife first", image: safariImages.camp },
      { title: "Safari and Zanzibar", category: "Bush to beach", image: safariImages.beach },
      { title: "Family lodge safari", category: "Easy pacing", image: safariImages.lodge },
      { title: "Culture and conservation", category: "Deeper travel", image: safariImages.culture }
    ]
  },
  footer: {
    cta: "Ready to build the route around your dates?",
    note: "Seba Safari plans private Tanzania travel for couples, families, and small groups.",
    copyright: "Seba Safari. All rights reserved."
  }
};

const ar: HomeDictionary = {
  brand: {
    name: "سيبا سفاري",
    tagline: "رحلات تنزانيا المصممة لك"
  },
  nav: [
    { label: "الوجهات", href: "#experiences" },
    { label: "السفاري", href: "#expertise" },
    { label: "لماذا سيبا", href: "#benefits" },
    { label: "تواصل معنا", href: "#planner" }
  ],
  header: {
    plannerCta: "تحدث مع مخطط محلي",
    menuLabel: "افتح القائمة",
    closeLabel: "أغلق القائمة"
  },
  hero: {
    eyebrow: "رحلات سفاري خاصة في تنزانيا",
    title: "كثيرون يزورون أفريقيا. القليلون يعيشونها حقا.",
    description:
      "صمم رحلة سفاري خاصة في تنزانيا مع مخططين محليين يعرفون الهجرة الكبرى، والمخيمات الهادئة، والطرق الأقل ازدحاما، والتفاصيل التي تجعل الرحلة سلسة.",
    primaryCta: "ابدأ تخطيط السفاري",
    secondaryCta: "استكشف التجارب"
  },
  planner: {
    title: "تحدث مع مخطط محلي",
    description: "شاركنا بعض تفاصيل الرحلة وسنقترح مسارا أوليا يناسب توقيتك ووتيرتك وميزانيتك.",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "traveler@example.com",
    submit: "خطط رحلتي",
    note: "نرد خلال يوم عمل واحد.",
    fields: [
      {
        label: "شهر السفر",
        placeholder: "اختر الشهر",
        options: ["يونيو إلى أكتوبر", "نوفمبر إلى مارس", "أبريل إلى مايو", "مرن"]
      },
      {
        label: "عدد المسافرين",
        placeholder: "حجم المجموعة",
        options: ["مسافران", "3-4 مسافرين", "5-8 مسافرين", "عائلة"]
      },
      {
        label: "نمط السفاري",
        placeholder: "اختر النمط",
        options: ["سفاري كلاسيكي", "تركيز على الهجرة", "نزل فاخرة", "سفاري وساحل"]
      }
    ]
  },
  benefits: {
    eyebrow: "مصممة للمسافرين الجادين",
    title: "أخطاء مكلفة يقع فيها كثير من المسافرين عند التخطيط لسفاري في تنزانيا",
    items: [
      {
        value: "01",
        label: "اختيار ترتيب خاطئ للمحميات",
        description: "نقلل أيام التنقل غير الضرورية عبر مواءمة الطريق مع حركة الحياة البرية ومطارات الوصول."
      },
      {
        value: "02",
        label: "حجز نزل بلا سياق",
        description: "نوضح متى يكون النزل الشهير بعيدا عن المشهد أو مزدحما أو لا يستحق فرق السعر."
      },
      {
        value: "03",
        label: "تجاهل التفاصيل الموسمية",
        description: "عبور الهجرة وموسم الولادات والطرق والقيمة الموسمية كلها تغير الخطة الأفضل."
      }
    ]
  },
  expertise: {
    eyebrow: "إرشاد محلي",
    title: "مصممة لمن يتوقعون أكثر",
    description:
      "كل مسار يصممه أشخاص يعرفون كيف تعمل المحميات والمواسم والمخيمات والتنقلات معا على أرض الواقع.",
    cta: "تعرف على فريق التخطيط",
    items: [
      { title: "مرشدون خبراء خاصون", description: "مرشدون مختارون للمعرفة بالحياة البرية والهدوء وفهم السياق المحلي." },
      { title: "خطط مخيمات مرنة", description: "مسارات تتكيف مع توقيت الهجرة والاهتمامات الخاصة ومستوى الراحة." },
      { title: "دعم أثناء الرحلة", description: "فريق محلي متاح طوال الرحلة وليس قبل المغادرة فقط." },
      { title: "توقيت الهجرة", description: "تأخذ الخطط الحركة الموسمية الفعلية في الحسبان بدلا من قوائم عامة." },
      { title: "إقامات مختارة", description: "كل نزل أو مخيم يختار حسب الموقع والخدمة والقيمة." },
      { title: "ميزانية واضحة", description: "تساعدك المقارنات الشفافة على معرفة أين تنفق وأين توفر." }
    ]
  },
  experiences: {
    eyebrow: "اختر تجربة تنزانيا",
    title: "مسارات سفاري مصممة حول ما تريد رؤيته",
    description: "ابدأ بنمط الرحلة، ثم نجعل المسار والإقامات والتوقيت يتبعونه.",
    cta: "عرض كل التجارب",
    items: [
      { title: "الهجرة الكبرى", category: "سيرينغيتي", image: safariImages.migration },
      { title: "سفوح كليمنجارو", category: "الدائرة الشمالية", image: safariImages.kilimanjaro },
      { title: "مخيمات متنقلة خاصة", category: "الحياة البرية أولا", image: safariImages.camp },
      { title: "سفاري وزنجبار", category: "من البر إلى البحر", image: safariImages.beach },
      { title: "سفاري عائلية مريحة", category: "وتيرة سهلة", image: safariImages.lodge },
      { title: "ثقافة وحماية الطبيعة", category: "سفر أعمق", image: safariImages.culture }
    ]
  },
  footer: {
    cta: "هل أنت مستعد لبناء المسار حول تواريخك؟",
    note: "تخطط سيبا سفاري رحلات تنزانيا الخاصة للأزواج والعائلات والمجموعات الصغيرة.",
    copyright: "سيبا سفاري. جميع الحقوق محفوظة."
  }
};

export const dictionaries = { en, ar } satisfies Record<string, HomeDictionary>;

export function getDictionary(locale: keyof typeof dictionaries) {
  return dictionaries[locale];
}
