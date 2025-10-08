import { City, Weather } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getReverseCityData, getWeatherData } from "@/app/services/api";

interface WeatherState {
  weatherData: Weather | null;
  city: City | null;
  loading: boolean;
  error: boolean;
  lastFetched: number | null;
  setCity: (city: City | null) => void;
  fetchWeather: (force?: boolean) => Promise<void>;
  fetchGeolocationWeather: () => Promise<void>;
  clearWeather: () => void;
}

const DEFAULT_CITY = {
  name: "Berlin",
  country: "Germany",
  region: "Berlin",
  countryCode: "DE",
  latitude: 52.52,
  longitude: 13.405,
};

export const useWeather = create<WeatherState>()(
  persist(
    (set, get) => ({
      weatherData: null,
      city: null,
      loading: false,
      error: false,
      lastFetched: null,

      setCity: async (city: City | null) => {
        set({ city });
        await get().fetchWeather(true);
      },

      fetchWeather: async (force: boolean = false) => {
        const { city, lastFetched } = get();
        if (!city) return await get().fetchGeolocationWeather();

        const isStale = !lastFetched || Date.now() - lastFetched > 60 * 1000;
        if (!isStale && !force) return;

        set({ loading: true, error: false });

        try {
          const weatherData = await getWeatherData(
            city.latitude,
            city.longitude,
          );
          set({
            weatherData,
            lastFetched: Date.now(),
            loading: false,
            error: false,
          });
        } catch (error) {
          set({ loading: false, error: true });
        }
      },

      fetchGeolocationWeather: async () => {
        set({ loading: true, error: false });

        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 3000,
              });
            },
          );

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const yourCity = await getReverseCityData(lat, lon);
          set({ city: yourCity });

          await get().fetchWeather();
        } catch (error) {
          set({ city: DEFAULT_CITY, loading: false, error: true });
          await get().fetchWeather(true);
        }
      },

      clearWeather: () => set({ weatherData: null }),
    }),
    {
      name: "weather-data",
      partialize: (state) => ({
        weatherData: state.weatherData,
        city: state.city,
        lastFetched: state.lastFetched,
      }),
    },
  ),
);
