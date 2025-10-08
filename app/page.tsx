"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import DarkModeToggle from "@/app/components/header/DarkModeToggle";
import FavouritesMenu from "@/app/components/header/FavouritesMenu";
import UnitsSelect from "@/app/components/header/UnitsSelect";
import SearchForm from "@/app/components/header/SearchForm";
import LoadingSkeleton from "@/app/components/page-states/LoadingSkeleton";
import ErrorState from "@/app/components/page-states/ErrorState";
import WeatherCard from "@/app/components/currentWeather/WeatherCard";
import CurrentContainer from "@/app/components/currentWeather/CurrentContainer";
import DailyContainer from "@/app/components/dailyForecast/DailyContainer";
import HourlyContainer from "@/app/components/hourlyForecast/HourlyContainer";
import AirQualityContainer from "@/app/components/extraDetails/AirQualityContainer";
import LunarContainer from "@/app/components/extraDetails/LunarContainer";
import Image from "next/image";
import { useWeather } from "@/app/store/useWeather";

// Loading the Rain Map dynamically
const RainMiniMap = dynamic(
  () => import("@/app/components/extraDetails/RainMiniMap"),
  {
    loading: () => <div className="extra_info_card" />,
  },
);

// The heart of this project: The main page with all components
export default function Home() {
  // Getting the needed data from our Context Provider
  const { weatherData, fetchWeather, loading, error, city } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <main>
      <header className="flex-between">
        <Image
          src="ui-icons/logo-light.svg"
          alt="logo-light"
          className="block dark:hidden"
          width={200}
          height={50}
        />
        <Image
          src="ui-icons/logo-dark.svg"
          alt="logo-dark"
          className="hidden dark:block"
          width={200}
          height={50}
        />
        <div className="flex items-end gap-2">
          <DarkModeToggle />
          <FavouritesMenu />
          <UnitsSelect />
        </div>
      </header>

      <section className="flex-center flex-col">
        <h1>{`How's the sky looking today?`}</h1>
        <SearchForm />
      </section>

      {loading && <LoadingSkeleton />}
      {error && <ErrorState errorMessage="Error lol" />}

      {weatherData && city && !loading && (
        <section className="weather_container">
          <div className="lg:col-span-2">
            <WeatherCard />
            <CurrentContainer />
            <DailyContainer />
          </div>

          <HourlyContainer />
          <RainMiniMap />
          <AirQualityContainer />
          <LunarContainer />
        </section>
      )}
    </main>
  );
}
