import { useEffect, useReducer } from "react";
import { getRainMap } from "@/app/services/api";
import { rainMapReducer } from "@/app/hooks/reducer/rainMapReducer";

// Fetch hook for getting the RainLayer for the map
export function useRainMap() {
  const [state, dispatch] = useReducer(rainMapReducer, {
    rainMap: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "FETCH_START" });
      try {
        // Fetch the RainLayer from the API
        const rainMapData = await getRainMap();
        dispatch({ type: "FETCH_SUCCESS", payload: rainMapData });
      } catch (error) {
        // In case the fetch fails
        const msg = "Failed to fetch data from Rain Map. Please try again.";
        dispatch({ type: "FETCH_ERROR", error: msg });
      }
    }

    fetchData();
  }, []);

  // Return the RainLayer
  return state;
}
