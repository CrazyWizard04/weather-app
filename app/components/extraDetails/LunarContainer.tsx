import React, { useRef } from "react";
import SunCalc from "suncalc";
import { formatMoonPhases } from "@/lib/utils/formatting";
import { drawMoon } from "@/lib/utils/moonPainter";
import { useWeather } from "@/app/store/useWeather";

// Details card which shows the moon phases, distance, set/rise time and the next Full Moon
const LunarContainer = () => {
  const now = new Date(); // Get current Time
  const canvasRef = useRef<HTMLCanvasElement>(null); // Container of the drawn Moon phase

  // Grab selected City from Context
  const { city } = useWeather();
  if (!city) return;

  // Get Illumination of the Moon and the current Moon phase
  const { fraction, phase } = SunCalc.getMoonIllumination(now);

  // Gets Moon position for the distance between Moon and Earth
  const moonPos = SunCalc.getMoonPosition(now, city.latitude, city.longitude);
  const distance = Math.floor(moonPos.distance).toLocaleString("de-DE");

  // Gets Set/Rise times of the Moon
  const { rise, set } = SunCalc.getMoonTimes(
    now,
    city.latitude,
    city.longitude,
  );
  const showMoonTimes = now > rise ? set : rise;

  // Drawing the Moon phases using a base image and canvas
  const baseImg = new Image();
  baseImg.src = "weather-details/moon-base.png";
  baseImg.onload = () => drawMoon(canvasRef.current, baseImg, phase);

  // Calculates the amount of days for the next Full Moon
  function getNextFullMoon() {
    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;

    // Cycles for the next 30 Days (Moon cycle goes 29.52 days)
    for (let i = 0; i < 30; i++) {
      const cycle = new Date(now.getTime() + i * oneDayMs);
      const illum = SunCalc.getMoonIllumination(cycle);

      // When the current days Moon phase is a Full Moon
      if (Math.abs(illum.phase - 0.5) < 0.02) {
        return i;
      }
    }

    // Else return nothing
    return null;
  }

  return (
    <div className="extra_info_card">
      <p className="mb-3 text-neutral-600 dark:text-neutral-300">
        🌑 Moon Phase
      </p>

      <div className="flex-between mb-6">
        <div>
          <h2 className="text-neutral-800 dark:text-white">
            {formatMoonPhases(phase)}
          </h2>
          <p>
            {now.toLocaleTimeString("en-US", {
              minute: "2-digit",
              hour: "2-digit",
            })}
          </p>
        </div>
        <canvas ref={canvasRef} width={100} height={100} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="lunar_details">
          <p>☀</p>
          <span className="text-white">{Math.floor(fraction * 100)}%</span>
        </div>
        <div className="lunar_details">
          <p>{now > rise ? "⬇" : "⬆"}</p>
          <span className="text-white">
            {showMoonTimes.toLocaleTimeString("en-US", {
              minute: "2-digit",
              hour: "2-digit",
            })}
          </span>
        </div>
        <div className="lunar_details">
          <p>🌕</p>
          <span className="text-white">{getNextFullMoon()} Days</span>
        </div>
        <div className="lunar_details">
          <p>↔</p>
          <span className="text-white">{distance} km</span>
        </div>
      </div>
    </div>
  );
};
export default LunarContainer;
