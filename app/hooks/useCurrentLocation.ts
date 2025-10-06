import { useEffect, useReducer } from "react";
import { getReverseCityData } from "@/app/services/api";
import { currentLocationReducer } from "@/app/hooks/reducer/currentLocationReducer";

// In case the user prohibits permission
const fallbackCity = {
  name: "Berlin",
  country: "Germany",
  region: "Berlin",
  countryCode: "DE",
  latitude: 52.52,
  longitude: 13.405,
};

// Fetch Hook for getting the users current location (Requires users permission)
export function useCurrentLocation(enabled: boolean = true) {
  const [state, dispatch] = useReducer(currentLocationReducer, {
    city: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!enabled) return; // Only gets called when needed

    const fetchLocation = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        // Gets the current location of the users device
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 2000,
            });
          },
        );

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch the users current city by using the coords (Reverse geocoding)
        const detectedCity = await getReverseCityData(lat, lon);
        dispatch({ type: "FETCH_SUCCESS", payload: detectedCity });
      } catch (error: unknown) {
        const geoError = error as GeolocationPositionError;

        // Handles any fetch, network or permission error
        if (geoError.code === 1 || geoError.code === 3) {
          // In case the user prohibits permission
          dispatch({ type: "FETCH_SUCCESS", payload: fallbackCity });
        } else if (geoError.code === 2) {
          dispatch({ type: "FETCH_ERROR", error: "Unable to access location" });
        } else {
          dispatch({
            type: "FETCH_ERROR",
            error: "Failed to resolve location name",
          });
        }
      }
    };

    fetchLocation();
  }, [enabled]);

  // Return the users current location with city data
  return state;
}
