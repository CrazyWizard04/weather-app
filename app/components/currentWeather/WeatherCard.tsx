import React from "react";
import {
  formatDate,
  formatTemp,
  formatWeatherCode,
} from "@/lib/utils/formatting";
import { useWeather } from "@/app/store/useWeather";
import { useSettings } from "@/app/store/useSettings";

// The giant weather card which shows your location, temperature and current weather
const WeatherCard = () => {
  // Gets the units from the context provider
  const { units } = useSettings();

  // Gets the weather data from the context provider
  const { weatherData, city } = useWeather();
  if (!weatherData || !city) return;

  // Destruction of the data required here
  const { time, weatherCode, temp, isDay } = weatherData.currentWeather;

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
