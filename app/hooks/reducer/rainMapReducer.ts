import { RainMap } from "@/lib/types";

type RainMapState = {
  rainMap: RainMap | null;
  loading: boolean;
  error: string | null;
};

type RainMapAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: RainMap }
  | { type: "FETCH_ERROR"; error: string };

export function rainMapReducer(state: RainMapState, action: RainMapAction) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { rainMap: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
