"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { City, Weather } from "@/lib/types";
import { useCurrentLocation } from "@/app/hooks/useCurrentLocation";
import { useWeather } from "@/app/hooks/useWeather";

interface Props {
  children: React.ReactNode;
}

interface WeatherContextType {
  city: City | null; // Current city state
  setCity: (city: City | null) => void; // Function to set the city
  weather: Weather | null; // Current weather state
  loading: boolean; // Current loading state
  error: string | null; // Current error state
}

// Create the context. Initially undefined, will be provided later
const WeatherContext = createContext<WeatherContextType | null>(null);

const WeatherProvider = ({ children }: Props) => {
  const [city, setCity] = useState<City | null>(null);
  // Initialize city by getting the users current location
  const reverse = useCurrentLocation(!city); // Only if there is no city

  useEffect(() => {
    if (!city && reverse.city) {
      // Sets the users current city in the city state
      setCity(reverse.city);
    }
  }, [city, reverse.city]);

  // Fetch the weather for the city
  const { weather, loading, error } = useWeather(city!);

  // Provide city, setCity function, weather, loading and error to all children
  return (
    <WeatherContext.Provider value={{ city, setCity, weather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to access units context
export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within WeatherProvider");
  }
  return context;
};

export default WeatherProvider;
