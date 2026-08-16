import type { Metadata } from "next";
import { ArrowRight, Check, Clock3, MessageCircle, Route } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layouts/page-shell";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Thank You | Chatama Safaris",
  description: "Your safari planning request has been received by Chatama Safaris.",
  robots: {
    index: false,
    follow: false
  }
};

const nextSteps = [
  {
    Icon: Clock3,
    title: "We review your request",
    description: "A Tanzania-based safari planner will read through your dates, group size, and travel ideas."
  },
  {
    Icon: MessageCircle,
    title: "We get in touch",
    description: "Expect a personal reply within 4 hours during our working day—usually much sooner."
  },
  {
    Icon: Route,
    title: "We shape your safari",
    description: "Together, we will refine the route, stays, and pace until the trip feels completely yours."
  }
];

export default function ThankYouPage() {
  const dictionary = getDictionary(defaultLocale);
  const whatsAppHref = `https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`;

  return (
    <PageShell locale={defaultLocale} dictionary={dictionary}>
      <main className="astra-page-enter bg-astra-cream text-astra-brown">
        <section className="relative isolate overflow-hidden bg-astra-cocoa text-white">
          <Image
            src="/assets/figma/final-cta-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(64,48,40,0.98)_5%,rgba(64,48,40,0.78)_55%,rgba(64,48,40,0.58)_100%)]" />

          <div className="container flex min-h-[510px] max-w-[920px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[590px]">
            <span className="grid size-16 place-items-center rounded-full border border-white/40 bg-astra-gold text-astra-cocoa shadow-[0_12px_40px_rgba(0,0,0,0.2)]" aria-hidden="true">
              <Check className="size-8" strokeWidth={2.5} />
            </span>
            <p className="mt-7 text-[13px] font-bold uppercase tracking-[0.14em] text-astra-gold">Request received</p>
            <h1 className="mt-3 max-w-[760px] text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[54px]">
              Thank you—your safari starts here.
            </h1>
            <p className="mt-6 max-w-[650px] text-[17px] font-medium leading-[1.65] text-white/85 sm:text-[19px]">
              Your trip request is safely in our hands. One of our local safari planners will personally reply within 4 hours.
            </p>
            <div className="mt-9 flex w-full max-w-[480px] flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/trips"
                className="inline-flex h-[50px] items-center justify-center gap-3 rounded-[9px] bg-astra-gold px-6 text-[15px] font-bold text-astra-cocoa transition hover:bg-[#C99A5D] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore safari trips
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="inline-flex h-[50px] items-center justify-center rounded-[9px] border border-white/45 bg-white/10 px-6 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </section>

        <section className="container max-w-[1080px] px-6 py-16 md:py-24" aria-labelledby="next-steps-title">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-astra-gold">What happens next</p>
            <h2 id="next-steps-title" className="mt-3 text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[38px]">
              From first ideas to the open road
            </h2>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {nextSteps.map(({ Icon, title, description }, index) => (
              <li key={title} className="rounded-[14px] border border-astra-brown/10 bg-white p-7 shadow-[0_16px_45px_rgba(64,48,40,0.07)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-astra-gold/20 text-astra-cocoa" aria-hidden="true">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[13px] font-bold text-astra-brown/35">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-[19px] font-semibold">{title}</h3>
                <p className="mt-2 text-[14px] font-medium leading-[1.65] text-astra-brown/70">{description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[14px] bg-astra-cocoa px-7 py-7 text-center text-white sm:flex-row sm:text-left">
            <div>
              <p className="text-[18px] font-semibold">Need to add something to your request?</p>
              <p className="mt-1 text-[14px] font-medium text-white/70">Send us a WhatsApp message and we’ll add it to your plans.</p>
            </div>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-[9px] bg-astra-gold px-5 text-[14px] font-bold text-astra-cocoa transition hover:bg-[#C99A5D] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Message us
            </a>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
