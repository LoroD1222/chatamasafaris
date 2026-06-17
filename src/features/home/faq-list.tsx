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
            className="rounded-[10px] border border-[#c9d2d9] bg-white transition-colors data-[open=true]:border-[#c9d2d9]"
            data-open={isOpen}
          >
            <button
              type="button"
              className="group flex w-full items-center gap-2 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-astra-gold"
              aria-label={isOpen ? "Collapse answer" : "Expand answer"}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <h3 className="min-w-0 flex-1 text-base font-medium leading-normal text-[#2e3138]">{item.question}</h3>
              <span
                className="grid size-8 shrink-0 place-items-center rounded bg-astra-gold/25 text-astra-cocoa transition group-hover:bg-astra-gold/35"
                aria-hidden="true"
              >
                {isOpen ? <ChevronUp className="size-4" aria-hidden="true" /> : <ChevronDown className="size-4" aria-hidden="true" />}
              </span>
            </button>
            {isOpen ? (
              <p id={panelId} className="px-6 pb-6 text-base leading-normal tracking-[-0.18px] text-[#5e6573]">
                {item.answer}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
