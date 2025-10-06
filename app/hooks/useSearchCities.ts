import { useEffect, useReducer } from "react";
import { getMatchingCities } from "@/app/services/api";
import { searchCityReducer } from "@/app/hooks/reducer/searchCityReducer";

// Fetch hook for getting the first 10 Cities that match the query
export function useSearchCities(query: string, focused: boolean) {
  const [state, dispatch] = useReducer(searchCityReducer, {
    cities: [],
    loading: false,
    error: null,
  });

  async function fetchCities() {
    // Skip fetching if the search bar isn't focused or the query is too short
    if (!focused || query.length < 2) return;

    dispatch({ type: "FETCH_START" });

    try {
      // Fetch matching cities from the API
      const citiesData = await getMatchingCities(query);
      dispatch({ type: "FETCH_SUCCESS", payload: citiesData });
    } catch (error) {
      // Handle any fetch or network errors
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch({ type: "FETCH_ERROR", error: message });
    }
  }

  // Debounce: wait for the user to stop typing before fetching
  useEffect(() => {
    const debounce = setTimeout(fetchCities, 800);
    return () => clearTimeout(debounce);
  }, [query]);

  // Return the cities plus a manual fetch trigger for instant lookups
  return { ...state, searchCities: fetchCities };
}
