"use client";

import React from "react";
import UnitsProvider from "@/app/components/providers/UnitsProvider";
import FavouritesProvider from "@/app/components/providers/FavouritesProvider";
import WeatherProvider from "@/app/components/providers/WeatherProvider";
import ThemeProvider from "@/app/components/providers/ThemeProvider";

interface Props {
  children: React.ReactNode;
}

// This component wraps all Provider together
const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <UnitsProvider>
        <FavouritesProvider>
          <WeatherProvider>{children}</WeatherProvider>
        </FavouritesProvider>
      </UnitsProvider>
    </ThemeProvider>
  );
};
export default Providers;
