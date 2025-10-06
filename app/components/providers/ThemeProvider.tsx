"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ThemeContext {
  darkMode: boolean; // Current dark mode state
  toggleDarkMode: () => void; // Function to toggle between dark/light mode
}

// Create the context. Initially undefined, will be provided later
const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeProvider = ({ children }: Props) => {
  // Initialize dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    // Checking localStorage first for the theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;

    // Else falling back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Updates the theme state in the html and in the localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Updates live the theme when system theme gets changed
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Function to toggle between dark/light mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Provide dark mode and toggle function to all children
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access dark mode context
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
