"use client";

import React, { createContext, useContext } from "react";
import { City } from "@/lib/types";
import { useFavourites } from "@/app/hooks/useFavourites";

interface Props {
  children: React.ReactNode;
}

interface FavouritesContext {
  favourites: City[]; // Current cities states array
  saveFavourite: (city: City) => void; // Function to save cities as favourite
  removeFavourite: (lat: number, lon: number) => void; // Function to remove cities from favourite
}

// Create the context. Initially undefined, will be provided later
const FavouritesContext = createContext<FavouritesContext | null>(null);

const FavouritesProvider = ({ children }: Props) => {
  // Gets the favourites and the editing function from the hook
  const { favourites, saveFavourite, removeFavourite } = useFavourites();

  // Provide the favourites and the editing functions to all children
  return (
    <FavouritesContext.Provider
      value={{ favourites, saveFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// Custom hook to access units context
export function useFavouritesContext() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error(
      "useFavouritesContext must be used within FavouritesProvider",
    );
  }
  return context;
}

export default FavouritesProvider;
