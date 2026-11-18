"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";

import type { RouteStop } from "@/features/trips/trip-data";

type TripRouteMapProps = {
  stops: RouteStop[];
  activeStopId: string;
  onStopSelect: (stopId: string) => void;
};

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
type LeafletModule = typeof import("leaflet");

function escapeMarkerLabel(label: string) {
  return label.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

function markerIcon(L: LeafletModule, label: string, active: boolean) {
  return L.divIcon({
    className: "trip-route-marker-shell",
    html: `<span class="trip-route-marker${active ? " is-active" : ""}" aria-hidden="true">${escapeMarkerLabel(label)}</span>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
}

export function TripRouteMap({ stops, activeStopId, onStopSelect }: TripRouteMapProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef(new Map<string, Marker>());
  const selectedStopRef = useRef(activeStopId);
  const onStopSelectRef = useRef(onStopSelect);

  useEffect(() => {
    onStopSelectRef.current = onStopSelect;
  }, [onStopSelect]);

  useEffect(() => {
    let disposed = false;
    const markerKeyHandlers: Array<() => void> = [];
    const markerEntries = markersRef.current;

    async function initializeMap() {
      if (!mapElementRef.current || stops.length === 0) return;

      const L = await import("leaflet");
      if (disposed || !mapElementRef.current) return;

      const map = L.map(mapElementRef.current, {
        zoomControl: true,
        keyboard: true,
        scrollWheelZoom: false,
        zoomAnimation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        fadeAnimation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        markerZoomAnimation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
      mapRef.current = map;

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const points = stops.map((stop) => L.latLng(stop.latitude, stop.longitude));
      const routeLine = L.polyline(points, {
        color: "#D96F36",
        dashArray: "8 10",
        lineCap: "round",
        lineJoin: "round",
        opacity: 0.95,
        weight: 3,
      }).addTo(map);

      stops.forEach((stop, index) => {
        const marker = L.marker([stop.latitude, stop.longitude], {
          icon: markerIcon(L, stop.markerLabel || String(index + 1), stop.id === selectedStopRef.current),
          keyboard: true,
          riseOnHover: true,
          title: `${stop.dayLabel}: ${stop.name}`,
        });
        markerEntries.set(stop.id, marker);
        marker.on("click", () => onStopSelectRef.current(stop.id));
        marker.on("add", () => {
          const markerElement = marker.getElement();
          if (!markerElement) return;

          markerElement.setAttribute("role", "button");
          markerElement.setAttribute("aria-label", `Select ${stop.name}, ${stop.dayLabel}`);
          const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onStopSelectRef.current(stop.id);
            }
          };
          markerElement.addEventListener("keydown", handleKeyDown);
          markerKeyHandlers.push(() => markerElement.removeEventListener("keydown", handleKeyDown));
        });
        marker.addTo(map);
      });

      if (points.length === 1) {
        map.setView(points[0], 8, { animate: false });
      } else {
        map.fitBounds(routeLine.getBounds(), { padding: [42, 42], maxZoom: 8, animate: false });
      }
    }

    void initializeMap();

    return () => {
      disposed = true;
      markerKeyHandlers.forEach((removeListener) => removeListener());
      markerEntries.clear();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [stops]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker, stopId) => {
      const markerVisual = marker.getElement()?.querySelector<HTMLElement>(".trip-route-marker");
      markerVisual?.classList.toggle("is-active", stopId === activeStopId);
    });

    if (selectedStopRef.current === activeStopId) return;
    selectedStopRef.current = activeStopId;
    const selectedStop = stops.find((stop) => stop.id === activeStopId);
    if (!selectedStop) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    map.panTo([selectedStop.latitude, selectedStop.longitude], {
      animate: !prefersReducedMotion,
      duration: prefersReducedMotion ? 0 : 0.45,
    });
  }, [activeStopId, stops]);

  return <div ref={mapElementRef} className="h-full w-full" aria-label="Interactive itinerary route map" />;
}
