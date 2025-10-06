import { Weather } from "@/lib/types";

type WeatherState = {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
};

type WeatherAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Weather }
  | { type: "FETCH_ERROR"; error: string };

export function weatherReducer(state: WeatherState, action: WeatherAction) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { weather: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
