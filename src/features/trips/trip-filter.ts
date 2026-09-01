import type { TripCard } from "@/features/trips/trip-data";

export const MAX_TRIP_FILTER_PRICE = 10_000;

export function getMinimumTripFilterPrice(cards: TripCard[]) {
  const filterablePrices = cards
    .map((trip) => trip.priceValue)
    .filter(
      (price): price is number =>
        typeof price === "number" && price > 0 && price <= MAX_TRIP_FILTER_PRICE,
    );

  return filterablePrices.length > 0 ? Math.min(...filterablePrices) : 0;
}

export function matchesMaximumTripPrice(trip: TripCard, maximumPrice: number) {
  return (
    typeof trip.priceValue !== "number" ||
    trip.priceValue <= 0 ||
    trip.priceValue <= maximumPrice
  );
}
