"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { PlannerDialogButton } from "@/components/planner/planner-dialog";
import type { HomeDictionary } from "@/i18n/types";

export function MobileFloatingPlannerCta({
  planner,
  heroId
}: {
  planner: HomeDictionary["planner"];
  heroId: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-astra-cream via-astra-cream/95 to-transparent px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-8 md:hidden">
      <PlannerDialogButton
        planner={planner}
        className="mx-auto flex h-[54px] w-full max-w-[520px] rounded-[10px] bg-astra-gold px-5 text-[15px] font-bold text-astra-cocoa shadow-[0_12px_34px_rgba(64,48,40,0.28)] hover:bg-astra-gold/90"
      >
        <span className="me-auto">{planner.submit}</span>
        <ArrowRight className="size-4" aria-hidden="true" />
      </PlannerDialogButton>
    </div>
  );
}
