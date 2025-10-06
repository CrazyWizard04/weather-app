import { City } from "@/lib/types";

type CityState = {
  city: City | null;
  loading: boolean;
  error: string | null;
};

type CityAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: City }
  | { type: "FETCH_ERROR"; error: string };

export function currentLocationReducer(state: CityState, action: CityAction) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { city: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
