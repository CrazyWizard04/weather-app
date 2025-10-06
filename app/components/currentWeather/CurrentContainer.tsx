import React, { useState } from "react";
import { getCurrentCards } from "@/lib/utils/constants";
import CurrentCard from "@/app/components/currentWeather/CurrentCard";
import { useUnitsContext } from "@/app/components/providers/UnitsProvider";
import { useWeatherContext } from "@/app/components/providers/WeatherProvider";
import Image from "next/image";

// Container which shows details of the current weather
const CurrentContainer = () => {
  const [moreDetails, setMoreDetails] = useState(false);
  const details = moreDetails ? 9 : 3;

  // Gets the units from the context provider
  const { units } = useUnitsContext();

  // Gets the weather data from the context provider
  const { weather } = useWeatherContext();
  if (!weather || !weather.currentWeather) return;

  // Grabs the details cards value, description, and icon with correct units
  const currentCards = getCurrentCards(weather.currentWeather, units);

  // Mapping the current weather data which can be expanded/folded
  return (
    <div className="current_container">
      {currentCards.slice(0, details).map((card) => (
        <CurrentCard
          key={card.key}
          value={card.value}
          desc={card.desc}
          image={card.img}
        />
      ))}
      <button
        className="current_extend_btn"
        onClick={() => setMoreDetails(!moreDetails)}
      >
        <Image
          src="ui-icons/dropdown-light.svg"
          alt="extend-light"
          className={`${moreDetails ? "-scale-100" : "scale-100"} block duration-200 dark:hidden`}
          width={30}
          height={30}
        />

        <Image
          src="ui-icons/dropdown-dark.svg"
          alt="extend-dark"
          className={`${moreDetails ? "-scale-100" : "scale-100"} hidden duration-200 dark:block`}
          width={30}
          height={30}
        />
        <span className="text-neutral-900 dark:text-white">More Details</span>
      </button>
    </div>
  );
};

export default CurrentContainer;
