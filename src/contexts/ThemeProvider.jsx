import { useEffect, useMemo } from "react";

import { ThemeContext } from "@context/theme-context";

const FORCED_THEME = "light";

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark");
    root.classList.add(FORCED_THEME);
    root.style.colorScheme = FORCED_THEME;

    try {
      localStorage.removeItem("theme");
    } catch {
      // The theme still applies when browser storage is unavailable.
    }
  }, []);

  const value = useMemo(
    () => ({
      theme: FORCED_THEME,
      setTheme: () => null,
      toggleTheme: () => null,
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
