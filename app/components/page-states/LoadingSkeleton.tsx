import React from "react";
import CurrentCard from "@/app/components/currentWeather/CurrentCard";
import Icon from "@/app/components/ui/Icon";

// This shows a skeleton of the elements in the main page when its loading
const LoadingSkeleton = () => {
  return (
    <section className="weather_container">
      <div className="lg:col-span-2">
        <div className="flex-center mb-6 h-[280px] flex-col gap-4 rounded-lg bg-blue-100 dark:bg-neutral-800">
          <Icon
            name="loading"
            width={50}
            height={50}
            className="animate-spin"
            needsTheme={false}
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Loading...
          </p>
        </div>

        <div className="current_container">
          <CurrentCard
            value="-"
            desc="Feels like"
            image="weather-details/thermometer-cold.svg"
          />
          <CurrentCard
            value="-"
            desc="Humidity"
            image="weather-details/humidity.svg"
          />
          <CurrentCard
            value="-"
            desc="Wind"
            image="weather-details/wind-beaufort/wind-0.svg"
          />
          <button className="current_extend_btn">
            <Icon name="dropdown" width={30} height={30} />
            <span className="text-neutral-900 dark:text-white">
              More Details
            </span>
          </button>
        </div>

        <h3>Daily forecast</h3>
        <ul className="daily_container">
          <li className="daily_loading" />
          <li className="daily_loading" />
          <li className="daily_loading" />
          <li className="daily_loading" />
          <li className="daily_loading" />
          <li className="daily_loading" />
          <li className="daily_loading" />
        </ul>
      </div>

      <div className="hourly_container custom_scroll">
        <div className="hourly_bar">
          <h3 className="text-center">Hourly forecast</h3>
          <div className="small_btn">
            <p className="text-sm">-</p>
            <Icon name="dropdown" width={15} height={15} />
          </div>
        </div>

        <ul className="space-y-4 p-4">
          <li className="hourly_loading" />
          <li className="hourly_loading" />
          <li className="hourly_loading" />
          <li className="hourly_loading" />
          <li className="hourly_loading" />
          <li className="hourly_loading" />
          <li className="hourly_loading" />
          <li className="hourly_loading" />
        </ul>
      </div>
    </section>
  );
};
export default LoadingSkeleton;
