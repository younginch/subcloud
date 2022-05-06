import { useState, useEffect } from "react";

export enum Theme {
  SYNC = "sync",
  LIGHT = "light",
  DARK = "dark",
}

export function getCurrentTheme(): Theme {
  if (typeof window !== "undefined") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return Theme.DARK;
    } else {
      return Theme.LIGHT;
    }
  }
  return Theme.LIGHT;
}

export default function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState(getCurrentTheme());

  function mediaQueryListener(
    this: MediaQueryList,
    event: MediaQueryListEvent
  ): void {
    if (event.matches) {
      setSystemTheme(Theme.DARK);
    } else {
      setSystemTheme(Theme.LIGHT);
    }
  }

  useEffect(() => {
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkThemeMediaQuery.addEventListener("change", mediaQueryListener);
    return () =>
      darkThemeMediaQuery.removeEventListener("change", mediaQueryListener);
  }, []);
  return systemTheme;
}
