"use client"

import { useEffect, useState } from "react"

/** ClientLayout keeps the palette as classes on <html>, so read them from there. */
export function useThemeFlags() {
  const [flags, setFlags] = useState({ isDark: false, isFireRed: false })

  useEffect(() => {
    const update = () =>
      setFlags({
        isDark: document.documentElement.classList.contains("dark"),
        isFireRed: document.documentElement.classList.contains("theme-fire-red"),
      })

    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  return flags
}
