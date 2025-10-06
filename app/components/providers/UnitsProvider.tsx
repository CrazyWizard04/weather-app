"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Units } from "@/lib/types";

interface Props {
  children: React.ReactNode;
}

interface UnitsContext {
  units: Units; // Current units state
  setUnits: Dispatch<SetStateAction<Units>>; // Function to set specific units
}

// Create the context. Initially undefined, will be provided later
const UnitsContext = createContext<UnitsContext | null>(null);

const UnitsProvider = ({ children }: Props) => {
  // Initialize units state (metric units)
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });

  // Provide units and set function to all children
  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};

// Custom hook to access units context
export function useUnitsContext() {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnitsContext must be used within UnitsProvider");
  }
  return context;
}

export default UnitsProvider;
