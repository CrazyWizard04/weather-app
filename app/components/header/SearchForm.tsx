"use client";

import React, { FormEvent, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { City } from "@/lib/types";
import { useSearchCities } from "@/app/hooks/useSearchCities";
import { useFavouritesContext } from "@/app/components/providers/FavouritesProvider";
import { useWeatherContext } from "@/app/components/providers/WeatherProvider";
import Image from "next/image";

const SearchForm = () => {
  const [query, setQuery] = useState(""); // Value in the input
  const [focused, setFocused] = useState(false); // Focus on the input
  // Gets the favourites and editing funcitons from the context provider
  const { favourites, saveFavourite, removeFavourite } = useFavouritesContext();
  // Gets the setCity from the context provider
  const { setCity } = useWeatherContext();

  // Checks if one of the cities is added as favourite
  const favourite = (city: City) => {
    return favourites.some(
      (fav) =>
        fav.latitude === city.latitude && fav.longitude === city.longitude,
    );
  };

  // Add/Removes the city as favourite when clicked
  const toggleFavourite = (city: City) => {
    favourite(city)
      ? removeFavourite(city.latitude, city.longitude)
      : saveFavourite(city);
  };

  // Fetch the first 10 matching cities of the query
  const { cities, loading, error, searchCities } = useSearchCities(
    query,
    focused,
  );

  // Shows the city list when loaded, focused, no error occurs and there is actually data
  const selectCity =
    cities && cities.length > 0 && focused && !loading && !error;

  // Selects the city to fetch the weather when clicked
  const handleSelect = (city: City) => {
    setCity(city);
    setQuery(city.name);
    setFocused(false);
  };

  // Searchs for matching results when clicked the search button
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.length > 1) {
      searchCities();
      setFocused(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search_form">
      <Image
        src="ui-icons/search-light.svg"
        alt="searchLight"
        className="absolute top-4 left-4 block dark:hidden"
        width={20}
        height={20}
      />
      <Image
        src="ui-icons/search-dark.svg"
        alt="searchDark"
        className="absolute top-4 left-4 hidden dark:block"
        width={20}
        height={20}
      />
      <input
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a place..."
        className="search_input"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button type="submit" className="search_btn">
        Search
      </button>

      {loading && (
        <div className="search_select_status">
          <Image
            src="ui-icons/loading.svg"
            alt="loading"
            className="animate-spin"
            width={30}
            height={30}
          />
          <span className="text-normal ml-4 text-neutral-700 dark:text-white">
            Search in progress
          </span>
        </div>
      )}

      {error && (
        <div className="search_select_status">
          <Image
            src="ui-icons/error.svg"
            alt="loading"
            width={30}
            height={30}
          />
          <span className="text-normal ml-4 text-neutral-700 dark:text-white">
            No search results found.
          </span>
        </div>
      )}

      {selectCity && (
        <ul className="search_select custom_scroll">
          <li className="search_label" onMouseDown={() => setCity(null)}>
            <p className="text-xl">📍 Current Location</p>
          </li>
          {cities.map((city, i) => (
            <li
              key={i}
              className="search_label"
              onMouseDown={() => handleSelect(city)}
            >
              <div className="flex flex-col">
                <div className="flex">
                  <CircleFlag
                    countryCode={city.countryCode.toLowerCase()}
                    className="size-6"
                  />
                  <p className="ml-2 text-lg">
                    {city.name}, {city.country}
                  </p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {city.region} ({city.latitude}°N, {city.longitude}°E)
                </p>
              </div>
              <button
                type="button"
                className="cursor-pointer p-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavourite(city);
                }}
              >
                {favourite(city) ? (
                  <Image
                    src="ui-icons/star-full.svg"
                    alt="add"
                    width={25}
                    height={25}
                  />
                ) : (
                  <Image
                    src="ui-icons/star-outline.svg"
                    alt="remove"
                    width={25}
                    height={25}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
export default SearchForm;
