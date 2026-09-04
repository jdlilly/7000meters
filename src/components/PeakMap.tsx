"use client";

import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

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
  const mapRef = useRef<MapRef>(null);
  const [popup, setPopup] = useState<MapPeak | null>(null);
  const [countries, setCountries] = useState<GeoJSON.FeatureCollection | null>(
    null
  );

  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("countries.geojson missing");
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => console.error("Country borders failed", error));
  }, []);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !countries) return;

    const addBorders = () => {
      if (!map.getSource("countries")) {
        map.addSource("countries", { type: "geojson", data: countries });
      }
      if (!map.getLayer("country-outline")) {
        map.addLayer({
          id: "country-outline",
          type: "line",
          source: "countries",
          paint: {
            "line-color": "#dc2626",
            "line-width": 2.5,
            "line-opacity": 1,
          },
        });
      }
    };

    if (map.isStyleLoaded()) addBorders();
    else map.once("load", addBorders);

    return () => {
      map.off("load", addBorders);
    };
  }, [countries]);

  return (
    <div className="h-[28rem] w-full overflow-hidden border border-stone-300 sm:h-[36rem]">
      <Map
        ref={mapRef}
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
              <span className="block text-stone-500">{popup.elevationM} m</span>
            </a>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}