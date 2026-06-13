import { describe, expect, it } from "vitest";

import { dictionaries, getDictionary } from "@/i18n/dictionaries";

describe("dictionaries", () => {
  it("keeps English and Arabic homepage dictionaries structurally aligned", () => {
    const en = getDictionary("en");
    const ar = getDictionary("ar");

    expect(Object.keys(ar)).toEqual(Object.keys(en));
    expect(ar.nav).toHaveLength(en.nav.length);
    expect(ar.planner.fields).toHaveLength(en.planner.fields.length);
    expect(ar.benefits.items).toHaveLength(en.benefits.items.length);
    expect(ar.expertise.items).toHaveLength(en.expertise.items.length);
    expect(ar.experiences.items).toHaveLength(en.experiences.items.length);
  });

  it("exposes only supported locale dictionaries", () => {
    expect(Object.keys(dictionaries)).toEqual(["en", "ar"]);
  });
});
