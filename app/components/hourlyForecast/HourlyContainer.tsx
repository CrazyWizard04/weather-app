import React, { useState } from "react";
import { formatDate, getNext24Hours, isSameDay } from "@/lib/utils/formatting";
import HourlySelect from "@/app/components/hourlyForecast/HourlySelect";
import HourlyLabel from "@/app/components/hourlyForecast/HourlyLabel";
import { useWeatherContext } from "@/app/components/providers/WeatherProvider";

// Container which shows the hourly forecast of a selected day
const HourlyContainer = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Current day as selected day

  // Gets the weather data from the context provider
  const { weather } = useWeatherContext();
  if (!weather) return;

  // Fuses the sun events (sunrise/sunset) with hourly forecast data for visualization
  const { hours, sunEvents } = getNext24Hours(
    weather.hourlyWeather,
    weather.dailyWeather,
    selectedDate,
  );
  let lastDay: number | null = null;

  return (
    <div className="hourly_container custom_scroll">
      <div className="hourly_bar">
        <h3 className="text-center">Hourly forecast</h3>
        <HourlySelect
          dailyData={weather.dailyWeather}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="space-y-4 p-4 pt-2">
        {hours.map((hour, i) => {
          const hourDate = new Date(hour.time);
          const currentDay = hourDate.getDate();
          let divider = null;

          {
            /* Adds a divider between the current day and the next day forecast */
          }
          if (lastDay !== null && lastDay !== currentDay) {
            divider = (
              <div key={`divider-${i}`} className="divider">
                {hourDate.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </div>
            );
          }
          lastDay = currentDay;

          {
            /* Searches for the sunrise/sunset for today */
          }
          const sunEvent = sunEvents.find(
            (se) =>
              new Date(se).getHours() === hourDate.getHours() &&
              isSameDay(new Date(se), hourDate),
          );

          return (
            <React.Fragment key={i}>
              {divider}
              {sunEvent ? (
                <div key={"SunTimes" + i} className="hourly_label">
                  <img
                    src={
                      new Date(sunEvent).getHours() < 12
                        ? "weather-icons/sunEvents/sunrise.webp"
                        : "weather-icons/sunEvents/sunset.webp"
                    }
                    alt="sunny"
                    className="absolute top-2 left-2 size-10"
                  />
                  <p className="pl-10 font-semibold">
                    {formatDate(sunEvent, "Hour")}
                  </p>
                  <p>
                    {new Date(sunEvent).getHours() < 12 ? "Sunrise" : "Sunset"}
                  </p>
                </div>
              ) : (
                <HourlyLabel key={"Hourly" + i} hourlyData={hour} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyContainer;
