import React, { Dispatch, SetStateAction, useState } from "react";
import { DailyWeather } from "@/lib/types";
import Button from "@/app/components/ui/Button";

interface Props {
  dailyData: DailyWeather[];
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

// Button with dropdown menu to select the hourly forecast for a day
const HourlySelect = ({ dailyData, selectedDate, setSelectedDate }: Props) => {
  const [open, setOpen] = useState(false); // Current state for the dropdown

  // If the selected day is the same as now, then it displays "Today" instead of the days name
  const formatLabel = (date: Date, i: number) => {
    if (i === 0) return "Today";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Gets the index of the selected day
  const dayIndex = dailyData.findIndex(
    (d) => new Date(d.time).toDateString() === selectedDate.toDateString(),
  );

  // Adds the button and maps the days when dropdown is open
  return (
    <div className="relative">
      <Button
        desc={formatLabel(selectedDate, dayIndex)}
        open={open}
        setOpen={setOpen}
        isDropdown={true}
        smallButton={true}
      />

      {open && (
        <ul className="hourly_day_select">
          {dailyData.map((day, i) => {
            const date = new Date(day.time);
            return (
              <li
                key={i}
                className={`hourly_day_label ${i === dayIndex && "bg-blue-100 dark:bg-neutral-700"}`}
                onClick={() => {
                  setSelectedDate(date);
                  setOpen(false);
                }}
              >
                {formatLabel(date, i)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default HourlySelect;
