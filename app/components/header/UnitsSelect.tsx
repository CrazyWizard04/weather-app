import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import Icon from "@/app/components/ui/Icon";
import { useSettings } from "@/app/store/useSettings";

// A button with dropdown menu to set the units
const UnitsSelect = () => {
  const [open, setOpen] = useState(false); // Current state for the dropdown
  // Gets the units from the context provider and destructs them
  const { units, isMetric, handleUnits, toggleAllUnits } = useSettings();
  const { temperature, windSpeed, precipitation } = units;

  const isCelsius = temperature === "celsius";
  const isKMH = windSpeed === "kmh";
  const isMilli = precipitation === "mm";

  return (
    <div className="relative">
      <Button
        desc="Units"
        open={open}
        setOpen={setOpen}
        iconLight="ui-icons/units-light.svg"
        iconDark="ui-icons/units-dark.svg"
        isDropdown={true}
      />

      {open && (
        <div className="units_select">
          <p className="units_label" onClick={() => toggleAllUnits()}>
            {isMetric() ? "Switch to Imperial" : "Switch to Metric"}
          </p>
          <hr />
          <div>
            <span className="units_span">Temperature</span>
            <div
              className={`units_label ${isCelsius && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleUnits("temperature", "celsius")}
            >
              <p className="mt-1 text-sm">Celsius (°C)</p>
              {isCelsius && <Icon name="checkmark" width={15} height={15} />}
            </div>
            <div
              className={`units_label ${!isCelsius && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleUnits("temperature", "fahrenheit")}
            >
              <p className="mt-1 text-sm">Fahrenheit (°F)</p>
              {!isCelsius && <Icon name="checkmark" width={15} height={15} />}
            </div>
          </div>
          <hr />
          <div>
            <span className="units_span">Wind Speed</span>
            <div
              className={`units_label ${isKMH && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleUnits("windSpeed", "kmh")}
            >
              <p className="mt-1 text-sm">km/h</p>
              {isKMH && <Icon name="checkmark" width={15} height={15} />}
            </div>
            <div
              className={`units_label ${!isKMH && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleUnits("windSpeed", "mph")}
            >
              <p className="mt-1 text-sm">mph</p>
              {!isKMH && <Icon name="checkmark" width={15} height={15} />}
            </div>
          </div>
          <hr />
          <div>
            <span className="units_span">Precipitation</span>
            <div
              className={`units_label ${isMilli && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleUnits("precipitation", "mm")}
            >
              <p className="mt-1 text-sm">Millimeters (mm)</p>
              {isMilli && <Icon name="checkmark" width={15} height={15} />}
            </div>
            <div
              className={`units_label ${!isMilli && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleUnits("precipitation", "inch")}
            >
              <p className="mt-1 text-sm">Inches (in)</p>
              {!isMilli && <Icon name="checkmark" width={15} height={15} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsSelect;
