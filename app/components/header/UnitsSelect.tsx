import React, { useState } from "react";
import { Units } from "@/lib/types";
import { useUnitsContext } from "@/app/components/providers/UnitsProvider";
import Button from "@/app/components/ui/Button";
import Image from "next/image";

// A button with dropdown menu to set the units
const UnitsSelect = () => {
  const [open, setOpen] = useState(false); // Current state for the dropdown
  // Gets the units from the context provider and destructs them
  const { units, setUnits } = useUnitsContext();
  const { temperature, windSpeed, precipitation } = units;

  // Toggles a specific unit between metric/imperial
  const handleSelect = (category: keyof Units, value: Units[keyof Units]) => {
    setUnits((prev) => ({ ...prev, [category]: value }));
  };

  // Checks if 2 or more of the units are metric
  const metricCount =
    (temperature === "celsius" ? 1 : 0) +
    (windSpeed === "kmh" ? 1 : 0) +
    (precipitation === "mm" ? 1 : 0);

  const isMetricMajority = metricCount >= 2;

  const isCelsius = temperature === "celsius";
  const isKMH = windSpeed === "kmh";
  const isMilli = precipitation === "mm";
  const isFahrenheit = temperature === "fahrenheit";
  const isMPH = windSpeed === "mph";
  const isInch = precipitation === "inch";

  // Toggles all units to metric or imperial
  const toggleAllUnits = () => {
    if (isMetricMajority) {
      setUnits({
        temperature: "fahrenheit",
        windSpeed: "mph",
        precipitation: "inch",
      });
    } else {
      return setUnits({
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm",
      });
    }
  };

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
            {isMetricMajority ? "Switch to Imperial" : "Switch to Metric"}
          </p>

          <hr />

          {/* Temperature */}
          <div>
            <span className="units_span">Temperature</span>
            <div
              className={`units_label ${isCelsius && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleSelect("temperature", "celsius")}
            >
              <p className="mt-1 text-sm">Celsius (°C)</p>
              {isCelsius && (
                <>
                  <Image
                    src="ui-icons/checkmark-light.svg"
                    alt="checkmark"
                    className="block dark:hidden"
                    width={15}
                    height={15}
                  />
                  <Image
                    src="ui-icons/checkmark-dark.svg"
                    alt="checkmark"
                    className="hidden dark:block"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </div>
            <div
              className={`units_label ${isFahrenheit && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleSelect("temperature", "fahrenheit")}
            >
              <p className="mt-1 text-sm">Fahrenheit (°F)</p>
              {isFahrenheit && (
                <>
                  <Image
                    src="ui-icons/checkmark-light.svg"
                    alt="checkmark"
                    className="block dark:hidden"
                    width={15}
                    height={15}
                  />
                  <Image
                    src="ui-icons/checkmark-dark.svg"
                    alt="checkmark"
                    className="hidden dark:block"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </div>
          </div>

          <hr />

          {/* Wind Speed */}
          <div>
            <span className="units_span">Wind Speed</span>
            <div
              className={`units_label ${isKMH && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleSelect("windSpeed", "kmh")}
            >
              <p className="mt-1 text-sm">km/h</p>
              {windSpeed === "kmh" && (
                <>
                  <Image
                    src="ui-icons/checkmark-light.svg"
                    alt="checkmark"
                    className="block dark:hidden"
                    width={15}
                    height={15}
                  />
                  <Image
                    src="ui-icons/checkmark-dark.svg"
                    alt="checkmark"
                    className="hidden dark:block"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </div>
            <div
              className={`units_label ${isMPH && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleSelect("windSpeed", "mph")}
            >
              <p className="mt-1 text-sm">mph</p>
              {windSpeed === "mph" && (
                <>
                  <Image
                    src="ui-icons/checkmark-light.svg"
                    alt="checkmark"
                    className="block dark:hidden"
                    width={15}
                    height={15}
                  />
                  <Image
                    src="ui-icons/checkmark-dark.svg"
                    alt="checkmark"
                    className="hidden dark:block"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </div>
          </div>

          <hr />

          {/* Precipitation */}
          <div>
            <span className="units_span">Precipitation</span>
            <div
              className={`units_label ${isMilli && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleSelect("precipitation", "mm")}
            >
              <p className="mt-1 text-sm">Millimeters (mm)</p>
              {precipitation === "mm" && (
                <>
                  <Image
                    src="ui-icons/checkmark-light.svg"
                    alt="checkmark"
                    className="block dark:hidden"
                    width={15}
                    height={15}
                  />
                  <Image
                    src="ui-icons/checkmark-dark.svg"
                    alt="checkmark"
                    className="hidden dark:block"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </div>
            <div
              className={`units_label ${isInch && "bg-blue-200 dark:bg-neutral-700"}`}
              onClick={() => handleSelect("precipitation", "inch")}
            >
              <p className="mt-1 text-sm">Inches (in)</p>
              {precipitation === "inch" && (
                <>
                  <Image
                    src="ui-icons/checkmark-light.svg"
                    alt="checkmark"
                    className="block dark:hidden"
                    width={15}
                    height={15}
                  />
                  <Image
                    src="ui-icons/checkmark-dark.svg"
                    alt="checkmark"
                    className="hidden dark:block"
                    width={15}
                    height={15}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsSelect;
