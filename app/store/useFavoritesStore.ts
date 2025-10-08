import { City } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteState = {
  favorites: City[];
  addFavorite: (city: City) => void;
  removeFavorite: (city: City) => void;
  toggleFavorite: (city: City) => void;
  isFavorite: (city: City) => boolean;
  clearAll: () => void;
};

export const useFavorites = create(
  persist<FavoriteState>(
    (set, get) => ({
      favorites: [],

      addFavorite: (city: City) => {
        const exists = get().favorites.some(
          (fav) =>
            fav.latitude === city.latitude && fav.longitude === city.longitude,
        );
        if (exists) return;

        set((state) => ({
          favorites: [...state.favorites, city].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        }));
      },

      removeFavorite: (city: City) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) =>
              fav.latitude !== city.latitude ||
              fav.longitude !== city.longitude,
          ),
        }));
      },

      toggleFavorite: (city: City) => {
        get().isFavorite(city)
          ? get().removeFavorite(city)
          : get().addFavorite(city);
      },

      isFavorite: (city: City) => {
        const favorites = get().favorites;
        return favorites.some(
          (fav) =>
            fav.latitude === city.latitude && fav.longitude === city.longitude,
        );
      },

      clearAll: () => set({ favorites: [] }),
    }),
    { name: "favorite-locations" },
  ),
);
