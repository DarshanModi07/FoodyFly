import { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="px-3 py-1 rounded  text-2xl text-white bg-gray-800 dark:bg-yellow-100 dark:text-gray-800"
    >
      Theme {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
