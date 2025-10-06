import React from "react";
import { useThemeContext } from "@/app/components/providers/ThemeProvider";
import Image from "next/image";

// Button to toggle between dark/light mode
const DarkModeToggle = () => {
  // Gets the toggle function from the context provider
  const { toggleDarkMode } = useThemeContext();
  return (
    <button className="header_btn" onClick={toggleDarkMode}>
      <Image
        src="ui-icons/light-mode.svg"
        alt="light-mode"
        className="hidden dark:block"
        width={25}
        height={25}
      />
      <Image
        src="ui-icons/dark-mode.svg"
        alt="dark-mode"
        className="block dark:hidden"
        width={25}
        height={25}
      />
    </button>
  );
};
export default DarkModeToggle;
