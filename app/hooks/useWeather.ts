import { City } from "@/lib/types";
import { useEffect, useReducer } from "react";
import { getWeatherData } from "@/app/services/api";
import { weatherReducer } from "@/app/hooks/reducer/weatherReducer";

// Fetch hook for getting the weather data of a city
export function useWeather(city: City) {
  const [state, dispatch] = useReducer(weatherReducer, {
    weather: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!city) return;

    // Starting the fetch
    async function fetchData() {
      dispatch({ type: "FETCH_START" });

      try {
        // Fetch the weather of the city from the API
        const weatherData = await getWeatherData(city.latitude, city.longitude);

        // In case there is no data for this city
        if (!weatherData) {
          const msg = "We couldn't find the weather for this location.";
          dispatch({ type: "FETCH_ERROR", error: msg });
          return;
        }

        dispatch({ type: "FETCH_SUCCESS", payload: weatherData });
      } catch (error) {
        // In case of a network error
        const msg =
          "We couldn't connect to the server (API error). Please try again in a few moments.";
        dispatch({ type: "FETCH_ERROR", error: msg });
      }
    }

    fetchData();
  }, [city]);

  // Return the weather data
  return state;
}
