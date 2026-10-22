import Image from "next/image";

import { SiteFinalCta } from "@/components/layouts/site-final-cta";
import { Button } from "@/components/ui/button";
import { LeadPlanner } from "@/features/home/lead-planner";
import { FaqList } from "@/features/home/faq-list";
import { ReviewsSection, TeamSection, WhySection } from "@/features/home/home-page";
import { HeroGallery, ItinerarySection, type ItineraryDayCard } from "@/features/trips/trip-pages";
import type { HomeDictionary } from "@/i18n/types";

const plannerId = "quote";

const galleryImages = [
  { src: "/images/zanzibar-safari/gallery_01_safari_jeep_elephants.jpg", alt: "Safari vehicle beside elephants and wildebeest at a watering hole" },
  { src: "/images/zanzibar-safari/gallery_02_elephant_herd.jpg", alt: "Elephant family walking across Tanzania's savannah" },
  { src: "/images/zanzibar-safari/gallery_03_safari_guests.jpg", alt: "Safari guests and local guide beside a vehicle in Tanzania" },
  { src: "/images/zanzibar-safari/gallery_04_safari_from_jeep.jpg", alt: "Traveler taking in the Tanzania landscape from a safari vehicle" },
  { src: "/images/zanzibar-safari/gallery_05_safari_wildlife.jpg", alt: "Two zebras on the Tanzanian savannah" },
  { src: "/images/zanzibar-safari/gallery_06_zanzibar_coast.jpg", alt: "Aerial view of Zanzibar's turquoise coastline" },
  { src: "/images/zanzibar-safari/gallery_07_zanzibar_pier.jpg", alt: "Zanzibar beachfront jetty at sunset" },
  { src: "/images/zanzibar-safari/gallery_08_zanzibar_palms.jpg", alt: "Palm-lined Zanzibar coastline and jetty" }
];

const itinerary: ItineraryDayCard[] = [
  {
    key: "day-1-safari-begins",
    day: "DAY 1",
    title: "Your Safari Adventure Begins",
    description: "Your Tanzania adventure starts with a private safari experience shaped around the kind of wildlife and landscapes you hope to discover. Take in your first impressions of the bush and settle into the rhythm of the wild.",
    activities: ["Begin your private safari", "Set your preferred pace with your guide"],
    meals: ["Confirmed in your personalized quote"],
    activityImage: { src: "/assets/figma/itinerary-1.jpg", alt: "Tanzania safari landscape" },
    accommodation: "Selected to suit your travel style; details are confirmed in your personalized quote.",
    accommodationImage: null
  },
  {
    key: "day-2-wildlife",
    day: "DAY 2",
    title: "Discover Tanzania's Incredible Wildlife",
    description: "Spend another day immersed in Tanzania's extraordinary natural world. Your guide will help you slow down, look closer, and make the most of every unhurried moment outdoors.",
    activities: ["Explore Tanzania's wildlife areas", "Enjoy a flexible private game-drive experience"],
    meals: ["Confirmed in your personalized quote"],
    activityImage: { src: "/assets/figma/itinerary-2.jpg", alt: "Wildlife on the Tanzania plains" },
    accommodation: "Selected to suit your travel style; details are confirmed in your personalized quote.",
    accommodationImage: null
  },
  {
    key: "day-3-wild",
    day: "DAY 3",
    title: "One More Day in the Wild",
    description: "Make the most of one more day surrounded by Tanzania's remarkable wilderness. Whether you are drawn to wide-open views, quiet moments, or time watching wildlife, the day remains tailored to you.",
    activities: ["Continue your private safari", "Follow the moments that interest you most"],
    meals: ["Confirmed in your personalized quote"],
    activityImage: { src: "/assets/figma/itinerary-3.jpg", alt: "Tanzania wilderness at golden hour" },
    accommodation: "Selected to suit your travel style; details are confirmed in your personalized quote.",
    accommodationImage: null
  },
  {
    key: "day-4-zanzibar",
    day: "DAY 4",
    title: "Welcome to Zanzibar",
    description: "After the adventure of the safari, Zanzibar brings a softer pace and a beautiful change of scenery. Ease into island time with tropical coastlines, warm ocean air, and room to simply unwind.",
    activities: ["Begin your Zanzibar beach escape", "Enjoy time to relax and explore at your own pace"],
    meals: ["Confirmed in your personalized quote"],
    activityImage: { src: "/assets/figma/itinerary-5.jpg", alt: "Zanzibar beach beside the Indian Ocean" },
    accommodation: "Selected to suit your travel style; details are confirmed in your personalized quote.",
    accommodationImage: null
  },
  {
    key: "day-5-zanzibar-beaches",
    day: "DAY 5",
    title: "Relax on Zanzibar's Beaches",
    description: "Let the day unfold slowly on Zanzibar's tropical coastline. Swim, stroll, enjoy the view, or shape the day around the kind of beach time that feels best to you.",
    activities: ["Enjoy Zanzibar's coastline", "Keep the day as relaxed or active as you wish"],
    meals: ["Confirmed in your personalized quote"],
    activityImage: { src: "/assets/figma/zanzibar-88.jpg", alt: "Turquoise Zanzibar coastline" },
    accommodation: "Selected to suit your travel style; details are confirmed in your personalized quote.",
    accommodationImage: null
  },
  {
    key: "day-6-free-day",
    day: "DAY 6",
    title: "Your Extra Zanzibar Day, Free",
    description: "Your final island day is on us. Use this extra time to linger by the water, revisit a favorite spot, or enjoy the simple luxury of having nowhere else to be.",
    activities: ["Enjoy your complimentary extra Zanzibar day", "Choose the pace that suits you"],
    meals: ["Confirmed in your personalized quote"],
    activityImage: { src: "/assets/figma/category-zanzibar.jpg", alt: "Zanzibar beach and clear blue water" },
    accommodation: "Selected to suit your travel style; details are confirmed in your personalized quote.",
    accommodationImage: null
  }
];

const faqs = [
  {
    question: "How does the free Zanzibar day work?",
    answer: "This six-day offer includes an additional Zanzibar day at no extra cost when you book the five-day safari and beach escape. Your personalized quote will confirm the exact itinerary and offer details for your dates."
  },
  {
    question: "Can we customize the safari and Zanzibar itinerary?",
    answer: "Yes. This is an example itinerary, and your local planning team can tailor the pace, interests, and route around your travel style."
  },
  {
    question: "What's included in the safari package?",
    answer: "What is included depends on the itinerary created for you. Your personalized quote will clearly outline the accommodation, logistics, and experiences selected for your trip."
  },
  {
    question: "Can we choose our travel dates?",
    answer: "Yes. Share the dates that work best for you and the team will help shape an itinerary around them."
  },
  {
    question: "How do we book our safari and Zanzibar trip?",
    answer: "Start by requesting a free personalized quote. Once you are happy with the proposed itinerary, the team will guide you through the next steps."
  }
];

export function ZanzibarSafariPage({ dictionary }: { dictionary: HomeDictionary }) {
  const campaignDictionary: HomeDictionary = {
    ...dictionary,
    header: { ...dictionary.header, plannerCta: "Plan My Safari & Zanzibar Trip" },
    hero: { ...dictionary.hero, primaryCta: "Plan My Safari & Zanzibar Trip" },
    why: { ...dictionary.why, cta: "Plan My Safari & Zanzibar Trip" },
    planner: {
      ...dictionary.planner,
      eyebrow: "PLAN YOUR ESCAPE",
      title: "Get Your Personalized Safari Quote",
      description: "Tell us a little about your trip, and our local team will help you plan your adventure.",
      submit: "Plan My Safari & Zanzibar Trip"
    }
  };

  return (
    <main className="astra-page-enter overflow-hidden bg-astra-cream text-astra-brown">
      <Hero dictionary={campaignDictionary} />
      <section className="bg-[#FFF8F0] py-16 md:py-20">
        <div className="container max-w-[980px] text-center">
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">YOUR JOURNEY, AT A GLANCE</p>
          <h2 className="mt-3 text-[32px] font-medium leading-[1.18] text-astra-cocoa md:text-[44px]">Your 6-Day Safari &amp; Zanzibar Adventure</h2>
          <p className="mx-auto mt-4 max-w-[760px] text-base leading-[1.6] text-astra-brown">Three days exploring Tanzania&apos;s incredible wildlife, followed by three days enjoying Zanzibar&apos;s tropical coastline — including one extra day free.</p>
        </div>
      </section>
      <ItinerarySection itineraryDays={itinerary} gallerySlides={[]} heading="Your Day-by-Day Adventure" />
      <section className="bg-[#F9F7F0] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[650px] text-center">
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">MAKE IT YOUR OWN</p>
          <h2 className="mt-3 text-[32px] font-medium leading-[1.18] text-astra-cocoa md:text-[44px]">Want to Stay a Little Longer? No Problem!</h2>
          <p className="mt-4 text-base leading-[1.6] text-astra-brown">More days on safari? Extra time on Zanzibar&apos;s beaches? Every trip can be tailored to your preferences, travel dates, and budget. Tell us what you have in mind, and we&apos;ll create the perfect itinerary for you.</p>
          <Button asChild className="mt-8 h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90">
            <a href={`#${plannerId}`}>Customize My Trip <span aria-hidden="true">→</span></a>
          </Button>
        </div>
      </section>
      <section className="bg-[#FFF8F0] py-16 md:py-20">
        <div className="container max-w-[980px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">INSPIRATION FOR YOUR ESCAPE</p>
            <h2 className="mt-3 text-[32px] font-medium leading-[1.18] text-astra-cocoa md:text-[44px]">A Glimpse of Tanzania &amp; Zanzibar</h2>
            <p className="mt-4 text-base leading-[1.6] text-astra-brown">From incredible wildlife encounters to turquoise waters and peaceful beaches, discover what makes this journey unforgettable.</p>
          </div>
          <HeroGallery images={galleryImages} priority={false} className="mx-auto mt-10 max-w-[900px]" />
        </div>
      </section>
      <WhySection
        dictionary={campaignDictionary}
        content={{
          eyebrow: "WHY TRAVEL WITH CHATAMA SAFARIS?",
          titleLead: "Made for a journey",
          titleHighlight: "that feels like yours",
          items: [
            { icon: "compass", title: "Private Safari Experience", description: "Travel at your own pace with a safari experience shaped around your interests." },
            { icon: "route", title: "Experienced Local Guides", description: "Explore with knowledgeable Tanzanian guides who understand the land and its wildlife." },
            { icon: "gem", title: "Handpicked Accommodations", description: "Choose a travel style that feels right for you, with options selected around your journey." },
            { icon: "leaf", title: "Personalized Travel Planning", description: "From safari time to beach days, your itinerary is designed around what matters to you." }
          ]
        }}
      />
      <TeamSection dictionary={dictionary} />
      <ReviewsSection
        dictionary={campaignDictionary}
        compact
        sourceLink={{
          href: "https://www.tripadvisor.com/Attraction_Review-g297913-d34688932-Reviews-Chatama_Safaris-Arusha_Arusha_Region.html",
          label: "Read more Chatama Safaris reviews on TripAdvisor"
        }}
        content={{
          eyebrow: "WHAT OUR TRAVELERS SAY",
          title: "Real Travelers. Unforgettable Experiences.",
          description: "See why travelers choose Chatama Safaris for their adventures in Tanzania.",
          items: dictionary.reviews.items
        }}
      />
      <section className="bg-astra-cream py-16 md:py-20">
        <div className="container max-w-[846px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
            <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">GOOD TO KNOW</p>
            <h2 className="text-[32px] font-medium leading-[1.25] text-astra-cocoa md:text-[44px]">Frequently Asked Questions</h2>
          </div>
          <div className="mt-8"><FaqList items={faqs} /></div>
        </div>
      </section>
      <SiteFinalCta
        dictionary={campaignDictionary}
        plannerHref={`#${plannerId}`}
        content={{
          eyebrow: "YOUR ADVENTURE STARTS HERE",
          titleLead: "The Wild. The Beach.",
          titleHighlight: "One Extra Day on Us.",
          description: "Three unforgettable days on safari, followed by three days in Zanzibar—including your extra day free. Tell us when you'd like to travel, and we'll help plan your perfect getaway.",
          aside: "Free personalized quote · No obligation",
          whatsappCta: dictionary.finalCta.whatsappCta,
          cta: "Plan My Safari & Zanzibar Trip",
          background: { src: "/images/zanzibar-safari/gallery_07_zanzibar_pier.jpg", alt: "Zanzibar beachfront jetty at sunset" }
        }}
      />
    </main>
  );
}

function Hero({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="relative overflow-hidden bg-[#F9F7F0] text-white md:min-h-[600px] md:bg-astra-cocoa">
      <div className="absolute inset-x-0 top-0 h-[500px] md:inset-0 md:h-auto">
        <Image src="/images/zanzibar-safari/hero-tanzania-zanzibar.jpg" alt="Wildebeest crossing beside Zanzibar's tropical shoreline" fill priority sizes="100vw" className="hidden object-cover object-center md:block" />
        <Image src="/images/zanzibar-safari/hero-tanzania-safari-mobile.jpg" alt="Wildebeest crossing a river in Tanzania" fill priority sizes="100vw" className="object-cover object-center md:hidden" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(64,48,40,0.78)_0%,rgba(64,48,40,0.62)_68%,rgba(64,48,40,0.48)_100%)] md:bg-[linear-gradient(76deg,rgba(64,48,40,0.91)_4%,rgba(64,48,40,0.74)_37%,rgba(64,48,40,0.18)_76%,rgba(64,48,40,0.08)_100%)]" />
      </div>
      <div className="container relative grid max-w-[1112px] gap-8 py-12 md:min-h-[600px] md:items-center md:py-14 lg:grid-cols-[minmax(0,1fr)_365px] lg:gap-[75px]">
        <div className="min-h-[420px] max-w-[650px] md:min-h-0">
          <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">6 DAYS • TANZANIA + ZANZIBAR</p>
          <h1 className="mt-5 text-[40px] font-normal leading-[1.12] md:text-[54px]">The Wild, Then the <span className="font-bold text-astra-gold">Beach.</span></h1>
          <p className="mt-5 inline-flex rounded-full border border-astra-gold/65 bg-astra-gold/15 px-4 py-2 text-[15px] font-bold text-white backdrop-blur-sm">3-Day Private Safari + 2 Days Zanzibar + 1 Extra Day Free</p>
          <p className="mt-5 max-w-[545px] text-base leading-[1.65] text-white/90">Explore Tanzania&apos;s incredible wildlife, then unwind on Zanzibar&apos;s beautiful beaches. Your adventure, your pace, with one extra Zanzibar day free.</p>
        </div>
        <div className="relative">
          <LeadPlanner planner={dictionary.planner} sectionId={plannerId} className="relative z-10 w-full scroll-mt-24 shadow-none" />
        </div>
      </div>
    </section>
  );
}
