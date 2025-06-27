"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Moon, Sun, User, Briefcase, Code, MessageSquare, Settings, BookOpen, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NetworkMonitor } from "@/components/network-monitor"

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  currentPath: string
}

export function Header({ darkMode, setDarkMode, currentPath }: HeaderProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const router = useRouter()

  const sections = [
    { path: "/about", name: "about" },
    { path: "/experience", name: "experience" },
    { path: "/projects", name: "projects" },
    { path: "/blog", name: "blog" },
    { path: "/skills", name: "skills" },
    { path: "/contact", name: "contact" },
  ]

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = sections.findIndex((section) => section.path === currentPath)
      if (isLeftSwipe && currentIndex < sections.length - 1) {
        router.push(sections[currentIndex + 1].path)
      } else if (isRightSwipe && currentIndex > 0) {
        router.push(sections[currentIndex - 1].path)
      }
    }
  }, [touchStart, touchEnd, currentPath, sections, router])

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b-2 pixel-border backdrop-blur-sm ${
          darkMode ? "bg-gray-800/90 border-green-400" : "bg-white/90 border-gray-600"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/about" className="flex items-center space-x-4 hover:scale-105 transition-transform">
              <div className={`w-8 h-8 pixel-art-logo ${darkMode ? "bg-green-400" : "bg-gray-900"}`}>
                <div className="pixel-pattern"></div>
              </div>
              <h1 className="text-xl font-bold font-mono tracking-wider glitch-text">{"<kshimate/>"}</h1>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {sections.map((section) => (
                <Link
                  key={section.path}
                  href={section.path}
                  className={`font-mono text-sm uppercase tracking-wider transition-all duration-200 hover:scale-110 pixel-button ${
                    currentPath === section.path
                      ? darkMode
                        ? "text-green-400 pixel-glow"
                        : "text-gray-900 pixel-glow"
                      : darkMode
                        ? "text-gray-400 hover:text-green-300"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section.name.toUpperCase()}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Network Monitor Widget */}
              {/* <NetworkMonitor darkMode={darkMode} /> */}

              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="outline"
                size="icon"
                className={`pixel-border hover:scale-110 transition-transform ${
                  darkMode
                    ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                    : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => router.push("/settings")}
                variant="outline"
                size="icon"
                className={`pixel-border hover:scale-110 transition-transform ${
                  darkMode
                    ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                    : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation with Swipe Indicator */}
      <div
        className={`md:hidden border-b-2 pixel-border ${darkMode ? "bg-gray-800 border-green-400" : "bg-white border-gray-600"}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex justify-center space-x-4 flex-1">
              {[
                { path: "/about", icon: User },
                { path: "/experience", icon: Briefcase },
                { path: "/projects", icon: Code },
                { path: "/blog", icon: BookOpen },
                { path: "/skills", icon: Zap },
                { path: "/contact", icon: MessageSquare },
              ].map(({ path, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  className={`p-3 transition-all duration-200 hover:scale-110 touch-target ${
                    currentPath === path
                      ? darkMode
                        ? "text-green-400 pixel-glow"
                        : "text-gray-900 pixel-glow"
                      : darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs font-mono opacity-60">← SWIPE TO NAVIGATE →</p>
          </div>
        </div>
      </div>
    </div>
  )
}
