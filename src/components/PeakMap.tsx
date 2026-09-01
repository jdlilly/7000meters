"use client";

import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapPeak = {
  slug: string;
  name: string;
  elevationM: number;
  class: string;
  lat: number;
  lon: number;
};

const STYLE = "https://tiles.openfreemap.org/styles/liberty";

export function PeakMap({
  peaks,
  highlightedSlug,
  longitude = 78,
  latitude = 32,
  zoom = 4,
}: {
  peaks: MapPeak[];
  highlightedSlug?: string;
  longitude?: number;
  latitude?: number;
  zoom?: number;
}) {
  const [popup, setPopup] = useState<MapPeak | null>(null);

  return (
    <div className="h-[70vh] w-full overflow-hidden border border-stone-300">
      <Map
        initialViewState={{ longitude, latitude, zoom }}
        mapStyle={STYLE}
        onClick={() => setPopup(null)}
      >
        {peaks.map((peak) => (
          <Marker
            key={peak.slug}
            longitude={Number(peak.lon)}
            latitude={Number(peak.lat)}
            anchor="center"
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              setPopup(peak);
            }}
          >
            <button
              type="button"
              title={peak.name}
              className={`block rounded-full border ${
                peak.slug === highlightedSlug
                  ? "h-5 w-5 border-blue-800 bg-blue-700"
                  : peak.class === "subsidiary"
                    ? "h-2.5 w-2.5 border-blue-800 bg-blue-100"
                    : "h-2.5 w-2.5 border-blue-800 bg-blue-700"
              }`}
            />
          </Marker>
        ))}

        {popup ? (
          <Popup
            longitude={Number(popup.lon)}
            latitude={Number(popup.lat)}
            anchor="bottom"
            onClose={() => setPopup(null)}
            closeButton
            closeOnClick={false}
          >
            <div className="min-w-[10rem] text-stone-900">
              <p className="font-medium">{popup.name}</p>
              <p className="text-sm text-stone-600">
                {popup.elevationM} m
                {popup.class === "subsidiary" ? " · subsidiary" : ""}
              </p>
              <p className="mt-2 text-sm">
                <a href={`/peaks/${popup.slug}`} className="text-slate-700">
                  Open page →
                </a>
              </p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}