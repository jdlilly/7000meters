"use client";

import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Elevation } from "@/components/Units";

export type MapPeak = {
  name: string;
  slug: string;
  elevationM: number;
  class?: string;
  lat: number;
  lon: number;
};

const STYLE = "https://tiles.openfreemap.org/styles/liberty";

type PeakMapProps = {
  peaks: MapPeak[];
  highlightedSlug?: string;
  longitude?: number;
  latitude?: number;
  zoom?: number;
};

export function PeakMap({
  peaks,
  highlightedSlug,
  longitude = 78,
  latitude = 32,
  zoom = 3.4,
}: PeakMapProps) {
  const [popup, setPopup] = useState<MapPeak | null>(null);

  return (
    <div className="h-[28rem] w-full overflow-hidden border border-stone-300 sm:h-[36rem]">
      <Map
        initialViewState={{ longitude, latitude, zoom }}
        mapStyle={STYLE}
        onClick={() => setPopup(null)}
      >
        {peaks.map((peak) => {
          const highlighted = peak.slug === highlightedSlug;
          const size = highlighted ? 16 : peak.class === "subsidiary" ? 7 : 10;
          return (
            <Marker
              key={peak.slug}
              longitude={peak.lon}
              latitude={peak.lat}
              anchor="center"
              onClick={(event) => {
                event.originalEvent.stopPropagation();
                setPopup(peak);
              }}
            >
              <button
                type="button"
                aria-label={peak.name}
                className="rounded-full border-2 border-white"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: highlighted ? "#1d4ed8" : "#2563eb",
                }}
              />
            </Marker>
          );
        })}

        {popup ? (
          <Popup
            longitude={popup.lon}
            latitude={popup.lat}
            anchor="bottom"
            offset={12}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <a href={`/peaks/${popup.slug}`} className="text-sm text-stone-900">
              {popup.name}
              <span className="block text-stone-500">
                <Elevation m={popup.elevationM} />
              </span>
            </a>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}