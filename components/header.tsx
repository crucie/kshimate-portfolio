"use client"


import type React from "react"
import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Moon, Sun, Settings, Zap, MessageSquare, Home, Globe, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Theme } from "@/components/client-layout"

// GAMES and BLOG are parked until their pages are ready; the routes redirect
// home from next.config.mjs, so re-enabling means restoring both places.
const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/skills", label: "SKILLS", icon: Zap },
  { href: "/contact", label: "CONTACT", icon: MessageSquare },
]

const swipeOrder = navItems.map((item) => item.href)

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  theme: Theme
  setTheme: (v: Theme) => void
  currentPath: string
}

export function Header({ darkMode, setDarkMode, theme, setTheme, currentPath }: HeaderProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const router = useRouter()

  const isHome = currentPath === "/"

  const minSwipeDistance = 50
  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX) }
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const dist = touchStart - touchEnd
    if (Math.abs(dist) < minSwipeDistance) return
    const ci = swipeOrder.indexOf(currentPath)
    if (dist > 0 && ci < swipeOrder.length - 1) router.push(swipeOrder[ci + 1])
    else if (dist < 0 && ci > 0) router.push(swipeOrder[ci - 1])
  }, [touchStart, touchEnd, currentPath, router])

  const isActive = (href: string) => currentPath === href || (href === "/" && currentPath === "/")

  const activeClass = darkMode
    ? theme === "fire-red" ? "text-[#dc4600] font-bold" : "text-green-400 font-bold"
    : theme === "fire-red" ? "text-[#c01c00] font-bold" : "text-gray-900 font-bold"

  const inactiveClass = darkMode
    ? theme === "fire-red" ? "text-[#a06030] hover:text-[#ff8030]" : "text-gray-400 hover:text-green-300"
    : theme === "fire-red" ? "text-[#7a4020] hover:text-[#c01c00]" : "text-gray-600 hover:text-gray-900"

  const borderColor = theme === "fire-red"
    ? darkMode ? "border-[#b44600]" : "border-[#3c1c05]"
    : darkMode ? "border-green-400" : "border-gray-600"

  const btnClass = theme === "fire-red"
    ? darkMode
      ? "border-[#b44600] text-[#f5d264] hover:bg-[#b44600] hover:text-black"
      : "border-[#3c1c05] text-[#3c1c05] hover:bg-[#3c1c05] hover:text-[#f8f0c8]"
    : darkMode
      ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
      : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <header className={`sticky top-0 z-50 border-b-2 pixel-border backdrop-blur-sm ${darkMode ? `bg-gray-900/90 ${borderColor}` : `bg-white/90 ${borderColor}`}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
              <span className="font-mono text-xs opacity-50 hidden sm:inline select-none">▓▒░</span>
              <div className={`w-7 h-7 pixel-art-logo ${darkMode ? "bg-primary" : "bg-foreground"}`}>
                <div className="pixel-pattern" />
              </div>
              <h1 className="text-lg font-bold font-mono tracking-wider glitch-text">{"<kshimate/>"}</h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:scale-110 pixel-button ${isActive(link.href) ? activeClass : inactiveClass}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-1">
              {/* Theme toggle (Space ↔ Fire Red) */}
              <Button onClick={() => setTheme(theme === "space" ? "fire-red" : "space")}
                variant="outline" size="icon"
                title={theme === "space" ? "Switch to Fire Red theme" : "Switch to Space theme"}
                className={`pixel-border hover:scale-110 transition-transform ${btnClass}`}
              >
                {theme === "fire-red" ? <Globe className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
              </Button>
              {/* Dark/light toggle */}
              <Button onClick={() => setDarkMode(!darkMode)}
                variant="outline" size="icon"
                className={`pixel-border hover:scale-110 transition-transform ${btnClass}`}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button onClick={() => router.push("/settings")}
                variant="outline" size="icon"
                className={`pixel-border hover:scale-110 transition-transform ${btnClass}`}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`md:hidden border-b-2 pixel-border ${darkMode ? `bg-gray-900 ${borderColor}` : `bg-white ${borderColor}`}`}>
        <div className="container mx-auto px-4 py-2 flex justify-center space-x-1">
          {navItems.map(({ href, icon: Icon }) => (
            <Link key={href} href={href}
              className={`p-2 transition-all hover:scale-110 touch-target ${isActive(href) ? activeClass : inactiveClass}`}
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
        <div className="text-center pb-1">
          <p className="text-xs font-mono opacity-50">← SWIPE TO NAVIGATE →</p>
        </div>
      </div>
    </div>
  )
}
