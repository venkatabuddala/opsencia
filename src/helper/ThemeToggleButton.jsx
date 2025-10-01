import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ThemeToggleButton = () => {
  // 1. Initialize state for the current theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 2. Function to update the theme on the HTML element
  const updateThemeOnHtmlEl = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  // 4. On initial render, set the theme from localStorage
  useEffect(() => {
    updateThemeOnHtmlEl(theme);
  }, [theme]);

  // 5. Toggle theme when button is clicked
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl(newTheme);
  };

  return (
    <button
      type='button'
      data-theme-toggle
      aria-label='Toggle theme'
      className='has-indicator w-40-px h-40-px rounded-circle d-flex justify-content-center align-items-center theme-toggle-btn'
      onClick={handleThemeToggle}
    >
      <Icon
        icon={theme === "dark" ? "ri:sun-line" : "ri:moon-line"}
        className='icon text-xl'
        style={{ color: "#ffffff" }}
      />
    </button>
  );
};

export default ThemeToggleButton;
