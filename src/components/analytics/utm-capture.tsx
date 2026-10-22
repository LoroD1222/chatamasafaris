"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { captureUtmParameters } from "@/utils/inquiries";

export function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParameters(searchParams.toString());
  }, [searchParams]);

  return null;
}
