import React from "react";
import { formatAirQuality } from "@/lib/utils/formatting";
import { getAqCard } from "@/lib/utils/constants";
import AirQualityLabels from "@/app/components/extraDetails/AirQualityLabels";
import { useWeatherContext } from "@/app/components/providers/WeatherProvider";

// Detail card which show the air quality for the selected city
const AirQualityContainer = () => {
  // Gets the weather data from the context provider
  const { weather } = useWeatherContext();
  if (!weather || !weather.airQuality) return;

  // Grabs the styles and the status for the index span
  const { status, color } = formatAirQuality(weather.airQuality.us_index);
  // Grabs the detail labels value, description and icon
  const aqCards = getAqCard(weather.airQuality);

  return (
    <div className="extra_info_card flex flex-col gap-2">
      <p className="text-neutral-600 dark:text-neutral-300">
        🎈 Air Quality (US)
      </p>
      <div className="flex-between">
        <span className="text-2xl font-bold text-neutral-800 dark:text-white">
          {weather.airQuality.us_index}
        </span>
        <span className={`airQuality_index ${color}`}>{status}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {aqCards.map((card) => (
          <AirQualityLabels
            key={card.key}
            value={card.value}
            desc={card.desc}
            image={card.img}
          />
        ))}
      </div>
    </div>
  );
};
export default AirQualityContainer;
