"use client";

import { useEffect } from "react";

import { rememberAdSource } from "@/lib/safari-digital";

export function SafariDigitalAttribution() {
  useEffect(() => {
    rememberAdSource();
  }, []);

  return null;
}
