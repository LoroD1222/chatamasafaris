import { ArrowRight, Compass, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

import { LeadPlanner } from "@/features/home/lead-planner";
import type { HomeDictionary } from "@/i18n/types";

const heroImage = "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85";
const giraffeImage = "https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=900&q=80";
const mountainImage = "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=900&q=80";

const featureIcons = [Compass, MapPinned, ShieldCheck, Sparkles, Compass, ShieldCheck];

export function HomePage({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-safari-cream">
        <div className="absolute inset-x-0 top-0 h-28 bg-safari-sand" />
        <div className="container relative grid min-h-[760px] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-16">
          <div className="relative overflow-hidden rounded-lg shadow-lift">
            <Image
              src={heroImage}
              alt=""
              width={1600}
              height={980}
              priority
              className="h-[560px] w-full object-cover md:h-[650px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-safari-ink/82 via-safari-ink/48 to-transparent rtl:bg-gradient-to-l" />
            <div className="absolute inset-x-0 bottom-0 max-w-2xl p-6 text-safari-cream md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-safari-gold">{dictionary.hero.eyebrow}</p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">{dictionary.hero.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-safari-cream/82 md:text-lg">{dictionary.hero.description}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#planner"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-safari-gold px-6 text-sm font-semibold text-white transition hover:bg-safari-gold/90"
                >
                  {dictionary.hero.primaryCta}
                </a>
                <a
                  href="#experiences"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/45 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {dictionary.hero.secondaryCta}
                </a>
              </div>
            </div>
          </div>
          <LeadPlanner planner={dictionary.planner} />
        </div>
      </section>

      <section id="benefits" className="bg-safari-cream py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-safari-gold">{dictionary.benefits.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-safari-ink md:text-5xl">{dictionary.benefits.title}</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {dictionary.benefits.items.map((item) => (
              <article key={item.value} className="rounded-lg border border-safari-bark/10 bg-white p-6 shadow-soft">
                <span className="text-sm font-bold text-safari-gold">{item.value}</span>
                <h3 className="mt-4 text-xl font-semibold text-safari-ink">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-safari-bark/72">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="overflow-hidden bg-safari-ink text-safari-cream">
        <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="grid grid-cols-2 gap-3">
              <Image src={giraffeImage} alt="" width={700} height={900} className="h-72 rounded-lg object-cover md:h-96" />
              <Image src={mountainImage} alt="" width={700} height={900} className="mt-10 h-72 rounded-lg object-cover md:h-96" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-safari-gold">{dictionary.expertise.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">{dictionary.expertise.title}</h2>
            <p className="mt-5 max-w-2xl leading-7 text-safari-cream/72">{dictionary.expertise.description}</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {dictionary.expertise.items.map((item, index) => {
                const Icon = featureIcons[index % featureIcons.length];

                return (
                  <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <Icon className="h-5 w-5 text-safari-gold" />
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-safari-cream/66">{item.description}</p>
                  </article>
                );
              })}
            </div>
            <a href="#planner" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-safari-gold">
              {dictionary.expertise.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>

      <section id="experiences" className="bg-safari-cream py-16 md:py-24">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-safari-gold">{dictionary.experiences.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-safari-ink md:text-5xl">{dictionary.experiences.title}</h2>
              <p className="mt-4 text-safari-bark/72">{dictionary.experiences.description}</p>
            </div>
            <a
              href="#planner"
              className="inline-flex h-11 items-center justify-center rounded-md border border-safari-bark/20 px-5 text-sm font-semibold text-safari-ink transition hover:bg-white"
            >
              {dictionary.experiences.cta}
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dictionary.experiences.items.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-lg bg-white shadow-soft">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-safari-ink/72 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-safari-gold">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
