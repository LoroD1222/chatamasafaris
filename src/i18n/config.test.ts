import { describe, expect, it } from "vitest";

import { defaultLocale, getTextDirection, isLocale, locales, rtlLocales } from "@/i18n/config";

describe("i18n config", () => {
  it("defines the expected default and supported locales", () => {
    expect(defaultLocale).toBe("en");
    expect(locales).toEqual(["en", "ar"]);
  });

  it("detects supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("returns ltr and rtl directions", () => {
    expect(rtlLocales).toEqual(["ar"]);
    expect(getTextDirection("en")).toBe("ltr");
    expect(getTextDirection("ar")).toBe("rtl");
  });
});
