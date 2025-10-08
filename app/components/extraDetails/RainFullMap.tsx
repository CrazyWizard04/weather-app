import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useRainMap } from "@/app/hooks/useRainMap";
import { useThemeContext } from "@/app/components/providers/ThemeProvider";
import Image from "next/image";
import { useWeather } from "@/app/store/useWeather";

// A modal with a giant map with rain radar
const RainFullMap = () => {
  // Gets the current theme from the context provider
  const { darkMode } = useThemeContext();
  // Gets the city from the context provider for the coords
  const { city } = useWeather();
  // Gets the rainLayer from the hook
  const { rainMap } = useRainMap();

  const mapRef = useRef<L.Map | null>(null); // Ref to store the Leaflet map instance
  const mapContainerRef = useRef<HTMLDivElement>(null); // Ref for the map container element

  const [isPlaying, setIsPlaying] = useState(true); // playing state of the animation
  const [frameIndex, setFrameIndex] = useState(0); // current frames of the animation
  const [currentTime, setCurrentTime] = useState<string | null>(null); // current time of the animation
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to the current interval
  const radarLayerRef = useRef<L.TileLayer | null>(null); // Ref to store the radar layer

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

    // Initialize the map with a given center and zoom
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 10,
      maxZoom: 15,
      zoomControl: true,
    });
    mapRef.current = map;

    // Add base world map layer
    const baseMapUrl = `https://{s}.basemaps.cartocdn.com/${darkMode ? "dark" : "light"}_all/{z}/{x}/{y}{r}.png`;
    L.tileLayer(baseMapUrl, { maxZoom: 20 }).addTo(map);

    // Removes the map when mounted off
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, [rainMap, latitude, longitude, darkMode]);

  useEffect(() => {
    // If the rain layer or the map are missing, do nothing
    if (!rainMap || !mapRef.current) return;
    const map = mapRef.current;

    // Gets all frames for the animation
    const frames = [...rainMap.radar.past, ...rainMap.radar.nowcast];
    const host = rainMap.host;

    const showFrame = (index: number) => {
      // If an old radar layer already exists, remove it
      if (radarLayerRef.current) map.removeLayer(radarLayerRef.current);

      // Sets the frame of the current index
      const frame = frames[index];
      const radarUrl = host + frame.path + "/256/{z}/{x}/{y}/2/1_1.png";

      // Sets the time of this radar frame to display it later
      setCurrentTime(
        new Date(frame.time * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      // Add radar overlay of the current frame
      const layer = L.tileLayer(radarUrl, { opacity: 0.7, zIndex: 10 });
      radarLayerRef.current = layer;
      layer.addTo(map);
    };

    showFrame(frameIndex);

    if (isPlaying) {
      // When the animation is playing
      intervalRef.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % frames.length);
      }, 800);
    } else {
      // When the animation is stopped
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Removes the map when mounted off
    return () => {
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isPlaying, rainMap, frameIndex]);

  // The number of all frames combined
  const totalFrames = rainMap
    ? rainMap.radar.past.length + rainMap.radar.nowcast.length
    : 0;

  return (
    <div className="flex h-full flex-col">
      <div className="mt-2 flex-9/10 md:flex-8/10">
        <div
          ref={mapContainerRef}
          className="h-full w-full cursor-pointer rounded-lg shadow-xl"
        />
      </div>
      <div className="flex-center flex-1/10 gap-2">
        <button className="size-10" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <>
              <Image
                src="ui-icons/pause-light.svg"
                alt="pauseLight"
                className="block dark:hidden"
                width={50}
                height={50}
              />
              <Image
                src="ui-icons/pause-dark.svg"
                alt="pauseDark"
                className="hidden dark:block"
                width={50}
                height={50}
              />
            </>
          ) : (
            <>
              <Image
                src="ui-icons/play-light.svg"
                alt="playLight"
                className="block dark:hidden"
                width={50}
                height={50}
              />
              <Image
                src="ui-icons/play-dark.svg"
                alt="playDark"
                className="hidden dark:block"
                width={50}
                height={50}
              />
            </>
          )}
        </button>
        <p>{currentTime}</p>
        <div className="relative h-2 w-full rounded-full bg-blue-500">
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white"
            style={{
              left: `calc(${(frameIndex / (totalFrames - 1)) * 100}% - 8px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RainFullMap;
