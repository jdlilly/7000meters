"use client";

import dynamic from "next/dynamic";
import type { MapPeak } from "@/components/PeakMap";

const PeakMap = dynamic(
  () => import("@/components/PeakMap").then((mod) => mod.PeakMap),
  { ssr: false }
);

export function PeakMapLoader(props: {
  peaks: MapPeak[];
  highlightedSlug?: string;
  longitude?: number;
  latitude?: number;
  zoom?: number;
}) {
  return <PeakMap {...props} />;
}