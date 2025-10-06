import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useRainMap } from "@/app/hooks/useRainMap";
import Modal from "@/app/components/ui/Modal";
import RainFullMap from "@/app/components/extraDetails/RainFullMap";
import { useWeatherContext } from "@/app/components/providers/WeatherProvider";
import { useThemeContext } from "@/app/components/providers/ThemeProvider";
import Image from "next/image";

// A widget which shows a preview map with rain radar
const RainMiniMap = () => {
  // Gets the current theme from the context provider
  const { darkMode } = useThemeContext();
  // Gets the city from the context provider for the coords
  const { city } = useWeatherContext();
  // Gets the rainLayer from the hook
  const { rainMap } = useRainMap();

  const mapRef = useRef<L.Map>(null); // Ref to store the Leaflet map instance
  const mapContainerRef = useRef<HTMLDivElement>(null); // Ref for the map container element
  const baseLayerRef = useRef<L.TileLayer | null>(null); // Ref for the base map
  const [expand, setExpand] = useState(false); // Current expand state

  const latitude = city?.latitude;
  const longitude = city?.longitude;

  useEffect(() => {
    // If map already exists, container is missing, or rainMap not loaded, do nothing
    if (
      !latitude ||
      !longitude ||
      mapRef.current ||
      !mapContainerRef.current ||
      !rainMap
    )
      return;

    // Initialize the map with a given center and zoom (static)
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 8,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
    });
    mapRef.current = map;

    // Add base world map layer
    const baseMapUrl = `https://{s}.basemaps.cartocdn.com/${darkMode ? "dark" : "light"}_all/{z}/{x}/{y}{r}.png`;
    baseLayerRef.current = L.tileLayer(baseMapUrl, { maxZoom: 18 }).addTo(map);

    // Gets the first frame of the rain nowcast
    const frames = [...rainMap.radar.nowcast];
    const firstFrame = frames[0];
    const host = rainMap.host;

    // Add radar overlay (rain nowcast)
    if (firstFrame) {
      const radarUrl = host + firstFrame.path + "/256/{z}/{x}/{y}/2/1_1.png";
      L.tileLayer(radarUrl, { opacity: 0.7, zIndex: 10 }).addTo(map);
    }

    // Adds a marker on the given coords
    L.marker([latitude, longitude]).addTo(map).bindPopup("Your Location");
  }, [rainMap, latitude, longitude, darkMode]);

  // Update the map theme when theme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      // If map or rainLayer is missing, do nothing
      if (!mapRef.current || !baseLayerRef.current) return;
      const isDark = document.documentElement.classList.contains("dark");
      const newBaseUrl = `https://{s}.basemaps.cartocdn.com/${isDark ? "dark" : "light"}_all/{z}/{x}/{y}{r}.png`;

      // Remove the old base map layer
      mapRef.current.removeLayer(baseLayerRef.current);

      // Add new one with right theme
      baseLayerRef.current = L.tileLayer(newBaseUrl, { maxZoom: 18 }).addTo(
        mapRef.current,
      );
    };

    // Listen for system dark mode changes
    media.addEventListener("change", handleThemeChange);

    // Listen for Tailwind dark class changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Destroys the listener at the end
    return () => {
      media.removeEventListener("change", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="extra_info_card">
      <div className="mb-4 flex items-center">
        <Image
          src="weather-details/raindrop.svg"
          alt="raindrop"
          width={30}
          height={30}
        />
        <p className="text-neutral-800 dark:text-neutral-300">Rain Map</p>
      </div>
      <div className="h-[200px] w-full rounded-lg transition-all duration-500 ease-in-out">
        <div
          ref={mapContainerRef}
          className="w- h-full w-full cursor-pointer rounded-lg shadow-xl"
          onClick={() => setExpand(true)}
        />
      </div>

      <Modal
        desc="Rain Map"
        size="md:max-w-[700px] max-w-9/10 md:h-[600px] h-9/10"
        open={expand}
        setOpen={setExpand}
      >
        <RainFullMap />
      </Modal>
    </div>
  );
};
export default RainMiniMap;
