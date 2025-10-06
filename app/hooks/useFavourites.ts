import { useEffect, useState } from "react";
import { City } from "@/lib/types";

const STORAGE_KEY = "favouriteLocations";

// A Hook for handling the users favourite cities with a local storage
export function useFavourites() {
  const [favourites, setFavourites] = useState<City[]>([]);
  // Cities get grabbed by their coords (Latitude, Longitude)

  // Loads the favourites from the storage when visiting the page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(STORAGE_KEY);
      // But only if the user saved favourites before
      if (data) setFavourites(JSON.parse(data));
    }
  }, []);

  // Saves the selected city to the local storage
  function saveFavourite(city: City) {
    setFavourites((prev) => {
      // In case the city is already added to the favourites
      if (
        prev.some(
          (fav) =>
            fav.latitude === city.latitude && fav.longitude === city.longitude,
        )
      ) {
        return prev;
      }

      // Gets a copy of the array and adds the new City to it
      const updated = [...prev, city];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  // Removes the selected city from the local storage
  function removeFavourite(lat: number, lon: number) {
    setFavourites((prev) => {
      // Creates a new array without the selected City (City gets removed)
      const updated = prev.filter(
        (fav) => fav.latitude !== lat || fav.longitude !== lon,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  // Return favourites and the editing functions
  return { favourites, saveFavourite, removeFavourite };
}
