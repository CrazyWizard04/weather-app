import React from "react";
import { useThemeContext } from "@/app/components/providers/ThemeProvider";
import Icon from "@/app/components/ui/Icon";

// Button to toggle between dark/light mode
const DarkModeToggle = () => {
  // Gets the toggle function from the context provider
  const { toggleDarkMode } = useThemeContext();
  return (
    <button className="header_btn" onClick={toggleDarkMode}>
      <Icon
        name="light-mode"
        width={25}
        height={25}
        className="hidden dark:block"
        needsTheme={false}
      />
      <Icon
        name="dark-mode"
        width={25}
        height={25}
        className="block dark:hidden"
        needsTheme={false}
      />
    </button>
  );
};
export default DarkModeToggle;
