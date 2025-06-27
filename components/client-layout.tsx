"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    }

    // Shorter loading time to prevent hydration issues
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return

    localStorage.setItem("theme", darkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode, isMounted])

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="loading-pixels mb-4">
            <div className="pixel-loader"></div>
          </div>
          <p className="font-mono text-lg animate-pulse text-gray-900">INITIALIZING.EXE...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="text-center">
          <div className="loading-pixels mb-4">
            <div className="pixel-loader"></div>
          </div>
          <p className={`font-mono text-lg animate-pulse ${darkMode ? "text-green-400" : "text-gray-900"}`}>
            LOADING_PORTFOLIO.EXE...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-green-400" : "bg-gray-100 text-gray-900"
      }`}
    >
      <AnimatedBackground darkMode={darkMode} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} currentPath={pathname} />
      <main className="container mx-auto px-4 py-8 relative z-10">{children}</main>
      <Footer darkMode={darkMode} />
    </div>
  )
}
