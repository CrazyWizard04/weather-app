import React from "react";
import {
  formatDate,
  formatTemp,
  formatWeatherCode,
  isSameDay,
} from "@/lib/utils/formatting";
import { DailyWeather } from "@/lib/types";
import { useUnitsContext } from "@/app/components/providers/UnitsProvider";

interface Props {
  dailyData: DailyWeather;
}

const DailyCard = ({ dailyData }: Props) => {
  // Destruction of the data required here
  const { time, weatherCode, minTemp, maxTemp } = dailyData;

  // Gets the units from the context provider
  const { units } = useUnitsContext();

  // Displays "Today" instead of the days name
  const dailyTime = new Date(time);
  const isToday = isSameDay(dailyTime, new Date());

  return (
    <li className="daily_card">
      <span className="text-normal font-medium text-neutral-900 dark:text-white">
        {isToday ? "Today" : formatDate(time, "Weekday")}
      </span>
      <img
        src={formatWeatherCode(weatherCode, true)}
        alt="weather"
        className="size-15 self-center"
      />

      <div className="flex-between">
        <span className="text-md text-neutral-900 dark:text-neutral-100">
          {formatTemp(maxTemp, units.temperature)}
        </span>
        <span className="text-md text-neutral-600 dark:text-neutral-400">
          {formatTemp(minTemp, units.temperature)}
        </span>
      </div>
    </li>
  );
};
export default DailyCard;
