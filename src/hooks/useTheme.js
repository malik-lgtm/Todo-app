
import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("todo-app-theme");
      return savedTheme === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todo-app-theme", theme);
    } catch (error) {
      console.error("Unable to save theme preference:", error);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return { theme, toggleTheme };
}

export default useTheme;
