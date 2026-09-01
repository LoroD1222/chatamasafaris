import { describe, expect, it } from "vitest";

import {
  getMinimumTripFilterPrice,
  matchesMaximumTripPrice,
  MAX_TRIP_FILTER_PRICE,
} from "@/features/trips/trip-filter";
import type { TripCard } from "@/features/trips/trip-data";

function tripWithPrice(priceValue: number | null): TripCard {
  return {
    slug: "test-trip",
    title: "Test trip",
    duration: "1 night",
    route: "Test route",
    season: "All year",
    tripType: "Wildlife Safari",
    priceValue,
    price: priceValue ? `$${priceValue}` : "Price on request",
    image: "/test.jpg",
    imageAlt: "Test trip",
  };
}

describe("trip price filter", () => {
  it("caps the price range at $10,000", () => {
    expect(MAX_TRIP_FILTER_PRICE).toBe(10_000);
  });

  it("derives the lower bound without allowing higher prices to expand the range", () => {
    const cards = [tripWithPrice(1_000), tripWithPrice(12_500), tripWithPrice(29_100)];

    expect(getMinimumTripFilterPrice(cards)).toBe(1_000);
  });

  it("excludes trips above the selected maximum price", () => {
    expect(matchesMaximumTripPrice(tripWithPrice(9_900), 10_000)).toBe(true);
    expect(matchesMaximumTripPrice(tripWithPrice(10_000), 10_000)).toBe(true);
    expect(matchesMaximumTripPrice(tripWithPrice(12_500), 10_000)).toBe(false);
  });

  it("keeps trips whose price is available on request", () => {
    expect(matchesMaximumTripPrice(tripWithPrice(null), 10_000)).toBe(true);
  });
});
