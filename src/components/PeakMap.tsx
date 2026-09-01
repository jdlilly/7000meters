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

export function PeakMap({ peaks }: { peaks: MapPeak[] }) {
  const [popup, setPopup] = useState<MapPeak | null>(null);

  return (
    <div className="h-[70vh] w-full overflow-hidden border border-stone-300">
      <Map
        initialViewState={{
          longitude: 78,
          latitude: 32,
          zoom: 4,
        }}
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
              className={`block h-2.5 w-2.5 rounded-full border border-stone-800 ${
                peak.class === "subsidiary" ? "bg-stone-100" : "bg-stone-800"
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