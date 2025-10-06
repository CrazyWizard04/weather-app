import React from "react";
import {
  formatDate,
  formatTemp,
  formatWeatherCode,
} from "@/lib/utils/formatting";
import { HourlyWeather } from "@/lib/types";
import { useUnitsContext } from "@/app/components/providers/UnitsProvider";

interface Props {
  hourlyData: HourlyWeather;
}

// Label which the forecast of the hour with weather, time and temperature
const HourlyLabel = ({ hourlyData }: Props) => {
  // Destruction of the data required here
  const { weatherCode, time, temp, isDay } = hourlyData;
  // Gets the units from the context provider
  const { units } = useUnitsContext();

  return (
    <div className="hourly_label">
      <img
        src={formatWeatherCode(weatherCode, isDay)}
        alt="sunny"
        className={`absolute ${isDay ? "top-2 left-2 size-10" : "top-3 left-3 size-8"}`}
      />
      <p className="pl-10 font-semibold">{formatDate(time, "Hour")}</p>
      <p>{formatTemp(temp, units.temperature)}</p>
    </div>
  );
};
export default HourlyLabel;
