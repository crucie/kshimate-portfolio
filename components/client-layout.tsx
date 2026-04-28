"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { motion, AnimatePresence } from "framer-motion"

export type Theme = "space" | "fire-red"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [theme, setTheme] = useState<Theme>("space")
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setIsMounted(true) }, [])

  useEffect(() => {
    if (!isMounted) return
    const savedTheme = localStorage.getItem("theme")
    const savedPalette = localStorage.getItem("palette") as Theme | null
    if (savedTheme) setDarkMode(savedTheme === "dark")
    if (savedPalette) setTheme(savedPalette)
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return
    localStorage.setItem("theme", darkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode, isMounted])

  useEffect(() => {
    if (!isMounted) return
    localStorage.setItem("palette", theme)
    document.documentElement.classList.toggle("theme-fire-red", theme === "fire-red")
  }, [theme, isMounted])

  const bgClass = theme === "fire-red"
    ? darkMode ? "bg-[#160800] text-[#f0e8d5]" : "bg-[#f2e9da] text-[#281000]"
    : darkMode ? "bg-[#050b14] text-[#00ff9f]" : "bg-gray-100 text-gray-900"

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="loading-pixels mb-4"><div className="pixel-loader" /></div>
          <p className="font-mono text-lg animate-pulse text-gray-900">BOOT.EXE...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgClass}`}>
        <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <div className="loading-pixels mb-4"><div className="pixel-loader" /></div>
          <p className="font-mono text-lg animate-pulse">LOADING_PORTFOLIO.EXE...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${bgClass}`}>
      <AnimatedBackground darkMode={darkMode} theme={theme} />
      <div className="scanlines pointer-events-none" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} setTheme={setTheme} currentPath={pathname} />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            className="container mx-auto px-4 py-8 flex-1 relative z-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}
