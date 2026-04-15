import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

function resolveInitialValue<T>(initialValue: T | (() => T)) {
  return initialValue instanceof Function ? initialValue() : initialValue
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const readValue = (): T => {
    const fallbackValue = resolveInitialValue(initialValue)

    if (typeof window === "undefined") {
      return fallbackValue
    }

    try {
      const item = window.localStorage.getItem(key)

      return item ? (JSON.parse(item) as T) : fallbackValue
    } catch {
      return fallbackValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(readValue)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Ignore write errors so the UI still works in restricted environments.
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as [
    T,
    Dispatch<SetStateAction<T>>,
  ]
}
