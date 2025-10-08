import React from "react";
import { DailyWeather } from "@/lib/types";
import DailyCard from "@/app/components/dailyForecast/DailyCard";
import { useWeather } from "@/app/store/useWeather";

// Container which shows the daily forecast for the next 7 days
const DailyContainer = () => {
  // Gets the weather data from the context provider
  const { weatherData } = useWeather();
  if (!weatherData) return;

  // Mapping the daily forecast for the next 7 days
  return (
    <>
      <h3>Daily forecast</h3>
      <ul className="daily_container">
        {weatherData.dailyWeather.map((data: DailyWeather, i: number) => (
          <DailyCard key={"Day" + i} dailyData={data} />
        ))}
      </ul>
    </>
  );
};

export default DailyContainer;
