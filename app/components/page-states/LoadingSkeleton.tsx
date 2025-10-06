import React from "react";
import CurrentCard from "@/app/components/currentWeather/CurrentCard";
import Image from "next/image";

// This shows a skeleton of the elements in the main page when its loading
const LoadingSkeleton = () => {
  return (
    <section className="weather_container">
      <div className="lg:col-span-2">
        <div className="flex-center mb-6 h-[280px] flex-col gap-4 rounded-lg bg-blue-100 dark:bg-neutral-800">
          <Image
            src="ui-icons/loading.svg"
            alt="loading"
            className="animate-spin"
            width={50}
            height={50}
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
            <Image
              src="ui-icons/dropdown-light.svg"
              alt="extend-light"
              className="block duration-200 dark:hidden"
              width={30}
              height={30}
            />
            <Image
              src="ui-icons/dropdown-dark.svg"
              alt="extend-dark"
              className="hidden duration-200 dark:block"
              width={30}
              height={30}
            />
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
            <Image
              src="ui-icons/dropdown-light.svg"
              alt="dropdownLight"
              className="block dark:hidden"
              width={15}
              height={15}
            />
            <Image
              src="ui-icons/dropdown-dark.svg"
              alt="dropdownDark"
              className="hidden dark:block"
              width={15}
              height={15}
            />
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
