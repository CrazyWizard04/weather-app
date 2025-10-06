import React from "react";
import {
  formatDate,
  formatTemp,
  formatWeatherCode,
} from "@/lib/utils/formatting";
import { useUnitsContext } from "@/app/components/providers/UnitsProvider";
import { useWeatherContext } from "@/app/components/providers/WeatherProvider";

// The giant weather card which shows your location, temperature and current weather
const WeatherCard = () => {
  // Gets the units from the context provider
  const { units } = useUnitsContext();

  // Gets the weather data from the context provider
  const { weather, city } = useWeatherContext();
  if (!weather || !city) return;

  // Destruction of the data required here
  const { time, weatherCode, temp, isDay } = weather.currentWeather;

  // Displaying the city with date, current weather and temperature
  return (
    <div className="weather_card">
      <div>
        <h2>{city.name + ", " + city.country}</h2>
        <p className="text-center text-neutral-200 md:text-left">
          {formatDate(time, "Detailed")}
        </p>
      </div>

      <div className="flex-between md:flex-center gap-5">
        <img
          src={formatWeatherCode(weatherCode, isDay)}
          alt="weather"
          className="size-25"
        />
        <span className="temp_font">{formatTemp(temp, units.temperature)}</span>
      </div>
    </div>
  );
};
export default WeatherCard;
