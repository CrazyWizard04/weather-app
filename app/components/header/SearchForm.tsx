"use client";

import React, { FormEvent, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { City } from "@/lib/types";
import { useSearchCities } from "@/app/hooks/useSearchCities";
import Icon from "@/app/components/ui/Icon";
import { useWeather } from "@/app/store/useWeather";
import { useFavorites } from "@/app/store/useFavoritesStore";

const SearchForm = () => {
  const [query, setQuery] = useState(""); // Value in the input
  const [focused, setFocused] = useState(false); // Focus on the input
  // Gets the favourites and editing funcitons from the context provider
  const { isFavorite, toggleFavorite } = useFavorites();
  // Gets the setCity from the context provider
  const { setCity } = useWeather();

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
      <Icon
        name="search"
        width={20}
        height={20}
        className="absolute top-4 left-4"
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
          <Icon
            name="loading"
            width={30}
            height={30}
            className="animate-spin"
            needsTheme={false}
          />
          <span className="text-normal ml-4 text-neutral-700 dark:text-white">
            Search in progress
          </span>
        </div>
      )}

      {error && (
        <div className="search_select_status">
          <Icon name="error" width={30} height={30} needsTheme={false} />
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
                  toggleFavorite(city);
                }}
              >
                {isFavorite(city) ? (
                  <Icon
                    name="star-full"
                    width={25}
                    height={25}
                    needsTheme={false}
                  />
                ) : (
                  <Icon
                    name="star-outline"
                    width={25}
                    height={25}
                    needsTheme={false}
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
