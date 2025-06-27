"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground({ darkMode }: { darkMode: boolean }) {
  const [particleCount, setParticleCount] = useState(20)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Get performance settings from localStorage
    const settings = localStorage.getItem("portfolio-settings")
    if (settings) {
      const parsed = JSON.parse(settings)
      setParticleCount(parsed.particleCount || 20)
    }

    // Use Intersection Observer to pause animations when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    const element = document.body
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Don't render particles if not visible or if disabled
  if (!isVisible) {
    return null
  }

  return (
    <>
      {/* Optimized Floating Pixels */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(Math.min(particleCount, 50))].map((_, i) => (
          <div
            key={i}
            className={`floating-pixel absolute w-2 h-2 ${darkMode ? "bg-green-400" : "bg-gray-600"}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              // Distribute particles across different layers for better performance
              zIndex: Math.floor(Math.random() * 3) + 1,
            }}
          />
        ))}
      </div>
    </>
  )
}
