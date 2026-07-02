import Image from "next/image";

import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import { Button } from "@/components/ui/button";
import type { HomeDictionary } from "@/i18n/types";

export function SiteFinalCta({ dictionary }: { dictionary: HomeDictionary }) {
  return (
    <section className="relative bg-[linear-gradient(to_bottom,#F0E9DE_0%,#F0E9DE_32%,#1C1612_32%,#1C1612_100%)] px-4 pb-16 pt-8 text-white">
      <div className="relative z-[100] mx-auto mb-[-34px] flex max-w-[628px] flex-col gap-4 rounded-[10px] bg-astra-gold p-3 text-[#2e3138] shadow-[0_15px_35px_rgba(28,22,18,0.2)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold leading-[1.5] tracking-[-0.08px]">Couldn&apos;t find the answer you&apos;re looking for?</p>
          <p className="text-xs leading-[1.5]">
            Our safari planners typically reply within 4 hours.
          </p>
        </div>
        <Button asChild className="h-10 rounded-lg bg-astra-cocoa px-4 text-sm font-medium text-white hover:bg-astra-brown">
          <a href={`https://wa.me/${dictionary.topBar.phone.replace(/\D/g, "")}`}>{dictionary.finalCta.whatsappCta}</a>
        </Button>
      </div>
      <div className="container max-w-[1230px]">
        <div className="relative overflow-hidden rounded-2xl border border-white/30">
          <Image src={dictionary.finalCta.background.src} alt={dictionary.finalCta.background.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(86deg,#1C1612_3%,rgba(28,22,18,0.21)_99%)]" />
          <div className="relative grid min-h-[560px] gap-10 px-6 py-16 md:px-16 lg:grid-cols-[minmax(0,640px)] lg:items-center lg:px-[97px]">
            <div>
              <p className="text-[13px] font-bold uppercase leading-[1.6] tracking-[0.05em] text-astra-gold">{dictionary.finalCta.eyebrow}</p>
              <h2 className="mt-6 max-w-[572px] text-[40px] font-normal leading-[1.3] md:text-[49px]">
                {dictionary.finalCta.titleLead}
                <br />
                <span className="text-[34px] font-bold text-astra-gold">{dictionary.finalCta.titleHighlight}</span>
              </h2>
              <p className="mt-6 max-w-[504px] text-[15px] leading-[1.6] text-white/70">{dictionary.finalCta.description}</p>
              <PlannerDialogButton
                planner={dictionary.planner}
                className="mt-6 h-[54px] rounded-[9px] bg-astra-gold px-6 text-base font-bold text-astra-cocoa hover:bg-astra-gold/90"
              >
                {dictionary.header.plannerCta}
              </PlannerDialogButton>
              <p className="mt-7 max-w-[611px] text-xs font-bold italic leading-[1.6]">{dictionary.finalCta.aside}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
