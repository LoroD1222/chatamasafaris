import { describe, expect, it } from "vitest";

import { defaultLocale, getTextDirection, isLocale, locales, rtlLocales } from "@/i18n/config";

describe("i18n config", () => {
  it("defines the expected default and supported locales", () => {
    expect(defaultLocale).toBe("en");
    expect(locales).toEqual(["en"]);
  });

  it("detects supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(false);
    expect(isLocale("fr")).toBe(false);
  });

  it("keeps v1 English-only and direction helpers ready for future rtl locales", () => {
    expect(rtlLocales).toEqual([]);
    expect(getTextDirection("en")).toBe("ltr");
  });
});
