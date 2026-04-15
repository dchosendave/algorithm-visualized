import { useEffect } from "react"

import { useLocalStorage } from "@/hooks/use-local-storage"

export type Theme = "light" | "dark"

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", getSystemTheme)

  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    )
  }

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
