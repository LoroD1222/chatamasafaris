"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import type { Faq } from "@/i18n/types";

export function FaqList({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <article
            key={`${item.question}-${index}`}
            className="rounded-[10px] border border-[#c9d2d9] bg-white p-6 transition-colors data-[open=true]:border-[#c9d2d9]"
            data-open={isOpen}
          >
            <div className="flex items-center gap-2">
              <h3 className="min-w-0 flex-1 text-base font-medium leading-normal text-[#2e3138]">{item.question}</h3>
              <button
                type="button"
                className="grid size-8 shrink-0 place-items-center rounded bg-astra-gold/25 text-astra-cocoa transition hover:bg-astra-gold/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-astra-gold"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="sr-only">{isOpen ? "Collapse answer" : "Expand answer"}</span>
                {isOpen ? <ChevronUp className="size-4" aria-hidden="true" /> : <ChevronDown className="size-4" aria-hidden="true" />}
              </button>
            </div>
            {isOpen ? (
              <p id={panelId} className="mt-2 text-base leading-normal tracking-[-0.18px] text-[#5e6573]">
                {item.answer}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
