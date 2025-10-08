import { Units } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  units: Units;
  handleUnits: (category: keyof Units, value: Units[keyof Units]) => void;
  isMetric: () => boolean;
  toggleAllUnits: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      units: {
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm",
      },

      handleUnits: (category: keyof Units, value: Units[keyof Units]) => {
        set((state) => ({ units: { ...state.units, [category]: value } }));
      },

      isMetric: () => {
        const units = get().units;
        const { temperature, windSpeed, precipitation } = units;
        const metricCount =
          (temperature === "celsius" ? 1 : 0) +
          (windSpeed === "kmh" ? 1 : 0) +
          (precipitation === "mm" ? 1 : 0);

        return metricCount >= 2;
      },

      toggleAllUnits: () => {
        if (get().isMetric()) {
          set({
            units: {
              temperature: "fahrenheit",
              windSpeed: "mph",
              precipitation: "inch",
            },
          });
        } else {
          set({
            units: {
              temperature: "celsius",
              windSpeed: "kmh",
              precipitation: "mm",
            },
          });
        }
      },
    }),
    { name: "settings" },
  ),
);
