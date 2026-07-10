import { describe, expect, it } from "vitest";

import { dictionaries, getDictionary } from "@/i18n/dictionaries";

describe("dictionaries", () => {
  it("contains the Figma homepage sections for English", () => {
    const en = getDictionary("en");

    expect(en.brand.name).toBe("Chatama Safaris");
    expect(en.nav).toHaveLength(4);
    expect(en.planner.fields).toHaveLength(4);
    expect(en.experienceCategories.items).toHaveLength(3);
    expect(en.trust.items).toHaveLength(4);
    expect(en.why.items).toHaveLength(6);
    expect(en.itineraries.items).toHaveLength(4);
    expect(en.reviews.items).toHaveLength(4);
    expect(en.faq.items).toHaveLength(4);
  });

  it("exposes only supported locale dictionaries", () => {
    expect(Object.keys(dictionaries)).toEqual(["en"]);
  });
});
