"use client"

import React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  Moon,
  Sun,
  Github,
  Mail,
  ExternalLink,
  Code,
  User,
  Briefcase,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Settings,
  BookOpen,
  Zap,
  Calendar,
  Clock,
  Tag,
  MapPin,
  Trophy,
  Eye,
  ChevronDown,
  ChevronUp,
  Wifi,
  WifiOff,
  Monitor,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Types and Interfaces
interface NetworkStats {
  downlink: number
  uplink: number
  rtt: number
  type: string
  effectiveType: string
  packetsSent: number
  packetsReceived: number
  online: boolean
}

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
}

interface SettingsType {
  floatingPixels: boolean
  gridAnimation: boolean
  glitchEffects: boolean
  typewriterEffect: boolean
  hoverAnimations: boolean
  reducedMotion: boolean
  animationSpeed: number
  particleCount: number
  performanceMode: "high" | "normal" | "low"
  gpuAcceleration: boolean
  showPerformanceMonitor: boolean
  showNetworkMonitor: boolean
}

// Safe browser API wrapper
const useBrowserAPI = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return {
    isClient,
    navigator: isClient ? window.navigator : null,
    performance: isClient ? window.performance : null,
    localStorage: isClient ? window.localStorage : null,
  }
}

// Network Monitor Component with SSR safety
function NetworkMonitor({ darkMode }: { darkMode: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [stats, setStats] = useState<NetworkStats>({
    downlink: 0,
    uplink: 0,
    rtt: 0,
    type: "unknown",
    effectiveType: "unknown",
    packetsSent: 0,
    packetsReceived: 0,
    online: true,
  })

  const { isClient, navigator } = useBrowserAPI()
  const packetSentCounter = useRef(0)
  const packetReceivedCounter = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isClient || !navigator) return

    const updateNetworkStats = () => {
      const online = navigator.onLine
      const connection =
        (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

      packetSentCounter.current += Math.floor(Math.random() * 5) + 1
      packetReceivedCounter.current += Math.floor(Math.random() * 8) + 2

      setStats({
        downlink: connection?.downlink || 0,
        uplink: connection?.uplink || 0,
        rtt: connection?.rtt || 0,
        type: connection?.type || "unknown",
        effectiveType: connection?.effectiveType || "unknown",
        packetsSent: packetSentCounter.current,
        packetsReceived: packetReceivedCounter.current,
        online,
      })
    }

    updateNetworkStats()
    intervalRef.current = setInterval(updateNetworkStats, 2000)

    const handleOnline = () => updateNetworkStats()
    const handleOffline = () => updateNetworkStats()

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [isClient, navigator])

  if (!isClient) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`pixel-border flex items-center gap-1 h-8 ${
          darkMode
            ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
            : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
        }`}
        disabled
      >
        <Wifi className="h-3 w-3" />
        <span className="text-xs font-mono">NET</span>
      </Button>
    )
  }

  return (
    <div className={`relative ${isExpanded ? "z-50" : ""}`}>
      <Button
        variant="outline"
        size="sm"
        className={`pixel-border flex items-center gap-1 h-8 ${
          darkMode
            ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
            : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {stats.online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
        <span className="text-xs font-mono">{stats.downlink > 0 ? `${stats.downlink}Mbps` : "NET"}</span>
        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </Button>

      {isExpanded && (
        <div
          className={`absolute right-0 mt-1 w-48 p-3 pixel-border shadow-lg component-grid ${
            darkMode
              ? "bg-gray-800 border-green-400 text-green-400 dark"
              : "bg-white border-gray-600 text-gray-900 light"
          } animate`}
        >
          <div className="text-center mb-2">
            <h4 className="font-mono text-xs font-bold">NETWORK_STATS.LOG</h4>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className={stats.online ? "text-green-400" : "text-red-400"}>
                {stats.online ? "ONLINE" : "OFFLINE"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>DOWN:</span>
              <span>{stats.downlink > 0 ? `${stats.downlink} Mbps` : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>UP:</span>
              <span>{stats.uplink > 0 ? `${stats.uplink} Mbps` : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>LATENCY:</span>
              <span>{stats.rtt > 0 ? `${stats.rtt} ms` : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>TYPE:</span>
              <span>{stats.type !== "unknown" ? stats.type : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>QUALITY:</span>
              <span>{stats.effectiveType !== "unknown" ? stats.effectiveType : "N/A"}</span>
            </div>
            <div className="border-t border-current my-1 pt-1"></div>
            <div className="flex justify-between">
              <span>PACKETS TX:</span>
              <span>{stats.packetsSent}</span>
            </div>
            <div className="flex justify-between">
              <span>PACKETS RX:</span>
              <span>{stats.packetsReceived}</span>
            </div>
            <div className="flex justify-between">
              <span>PACKET RATIO:</span>
              <span>{(stats.packetsReceived / (stats.packetsSent || 1)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Performance Monitor Component with SSR safety
function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
  })
  const [isMonitoring, setIsMonitoring] = useState(false)
  const { isClient, performance } = useBrowserAPI()

  useEffect(() => {
    if (!isClient || !performance || !isMonitoring) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measurePerformance = () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        const memory = (performance as any).memory
        const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0

        setMetrics({
          fps,
          memoryUsage,
          renderTime: Math.round(currentTime - lastTime),
        })

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measurePerformance)
    }

    animationId = requestAnimationFrame(measurePerformance)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isClient, performance, isMonitoring])

  if (!isClient) return null

  if (!isMonitoring) {
    return (
      <button
        onClick={() => setIsMonitoring(true)}
        className="fixed bottom-4 right-4 px-3 py-2 text-xs font-mono bg-accent text-accent-foreground border border-current rounded opacity-50 hover:opacity-100 transition-opacity"
      >
        PERF_MONITOR.EXE
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 p-3 bg-card text-card-foreground border border-current font-mono text-xs space-y-1 min-w-[150px]">
      <div className="flex justify-between">
        <span>FPS:</span>
        <span className={metrics.fps < 30 ? "text-red-400" : metrics.fps < 50 ? "text-yellow-400" : "text-green-400"}>
          {metrics.fps}
        </span>
      </div>
      <div className="flex justify-between">
        <span>MEM:</span>
        <span>{metrics.memoryUsage}MB</span>
      </div>
      <div className="flex justify-between">
        <span>RENDER:</span>
        <span>{metrics.renderTime}ms</span>
      </div>
      <button
        onClick={() => setIsMonitoring(false)}
        className="w-full text-center text-xs opacity-60 hover:opacity-100 transition-opacity"
      >
        [CLOSE]
      </button>
    </div>
  )
}

// Animated Background Component with SSR safety
function AnimatedBackground({ darkMode }: { darkMode: boolean }) {
  const [particleCount, setParticleCount] = useState(20)
  const [isVisible, setIsVisible] = useState(true)
  const { isClient, localStorage } = useBrowserAPI()

  useEffect(() => {
    if (!isClient || !localStorage) return

    try {
      const settings = localStorage.getItem("portfolio-settings")
      if (settings) {
        const parsed = JSON.parse(settings)
        setParticleCount(parsed.particleCount || 20)
      }
    } catch (error) {
      console.warn("Failed to load settings:", error)
    }

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
  }, [isClient, localStorage])

  if (!isClient || !isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(Math.min(particleCount, 50))].map((_, i) => (
        <div
          key={i}
          className={`floating-pixel absolute w-2 h-2 ${darkMode ? "bg-green-400" : "bg-gray-600"}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            zIndex: Math.floor(Math.random() * 3) + 1,
          }}
        />
      ))}
    </div>
  )
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Portfolio Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-green-400">
            <div className="text-center max-w-md p-8">
              <div className="ascii-art font-mono text-sm mb-4">
                <div>{"    ╔══════════════╗"}</div>
                <div>{"    ║ SYSTEM ERROR ║"}</div>
                <div>{"    ║ PLEASE RELOAD║"}</div>
                <div>{"    ╚══════════════╝"}</div>
              </div>
              <h2 className="font-mono text-xl mb-4">CRITICAL_ERROR.EXE</h2>
              <p className="font-mono text-sm mb-6">The system encountered an error. Please reload the page.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 font-mono text-sm border-2 border-green-400 bg-green-400 text-gray-900 hover:bg-green-300 transition-colors"
              >
                RELOAD_SYSTEM.EXE
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

// Main Component with proper SSR handling
export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isLoading, setIsLoading] = useState(true)
  const [typewriterText, setTypewriterText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [settings, setSettings] = useState<SettingsType>({
    floatingPixels: true,
    gridAnimation: true,
    glitchEffects: true,
    typewriterEffect: true,
    hoverAnimations: true,
    reducedMotion: false,
    animationSpeed: 1,
    particleCount: 20,
    performanceMode: "normal",
    gpuAcceleration: true,
    showPerformanceMonitor: false,
    showNetworkMonitor: true,
  })

  const { isClient, localStorage, navigator } = useBrowserAPI()
  const sections = ["about", "experience", "projects", "blog", "skills", "contact", "settings"]
  const fullText = "FULL_STACK_DEVELOPER.EXE"
  const minSwipeDistance = 50

  // Safe initialization
  useEffect(() => {
    if (!isClient) return

    try {
      const savedTheme = localStorage?.getItem("theme")
      if (savedTheme) {
        setDarkMode(savedTheme === "dark")
      }

      const savedSettings = localStorage?.getItem("portfolio-settings")
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.warn("Failed to load saved data:", error)
    }

    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [isClient, localStorage])

  // Theme persistence
  useEffect(() => {
    if (!isClient || !localStorage) return

    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light")
      document.documentElement.classList.toggle("dark", darkMode)
    } catch (error) {
      console.warn("Failed to save theme:", error)
    }
  }, [darkMode, isClient, localStorage])

  // Touch handling with safety checks
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0]?.clientX || null)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX || null)
  }

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = sections.indexOf(activeSection)
      if (isLeftSwipe && currentIndex < sections.length - 1) {
        handleSectionChange(sections[currentIndex + 1])
      } else if (isRightSwipe && currentIndex > 0) {
        handleSectionChange(sections[currentIndex - 1])
      }
    }
  }, [touchStart, touchEnd, activeSection, sections])

  const handleSectionChange = (section: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSection(section)
      setIsTransitioning(false)
    }, 150)
  }

  // Typewriter effect with safety
  useEffect(() => {
    if (activeSection === "about" && !isLoading && isClient) {
      let i = 0
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, 100)
      return () => clearInterval(timer)
    }
  }, [activeSection, isLoading, fullText, isClient])

  // Cursor blink effect
  useEffect(() => {
    if (!isClient) return
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [isClient])

  // Settings management with error handling
  const updateSetting = useCallback(
    (key: string, value: any) => {
      if (!isClient || !localStorage) return

      try {
        const newSettings = { ...settings, [key]: value }
        setSettings(newSettings)
        localStorage.setItem("portfolio-settings", JSON.stringify(newSettings))

        // Apply settings to document safely
        const root = document.documentElement
        if (root) {
          root.classList.toggle("no-floating-pixels", !newSettings.floatingPixels)
          root.classList.toggle("no-grid-animation", !newSettings.gridAnimation)
          root.classList.toggle("no-glitch-effects", !newSettings.glitchEffects)
          root.classList.toggle("no-typewriter", !newSettings.typewriterEffect)
          root.classList.toggle("no-hover-animations", !newSettings.hoverAnimations)
          root.classList.toggle("reduced-motion", newSettings.reducedMotion)

          root.classList.remove("performance-mode-high", "performance-mode-low", "performance-mode-normal")
          root.classList.add(`performance-mode-${newSettings.performanceMode}`)

          root.style.setProperty("--animation-speed", newSettings.animationSpeed.toString())
          root.style.setProperty("--particle-count", newSettings.particleCount.toString())

          if (newSettings.performanceMode === "high") {
            root.style.setProperty("--grid-opacity", "0.15")
            root.style.setProperty("--animation-speed", (newSettings.animationSpeed * 0.5).toString())
          } else if (newSettings.performanceMode === "low") {
            root.style.setProperty("--grid-opacity", "0.1")
            root.style.setProperty("--animation-speed", (newSettings.animationSpeed * 2).toString())
          } else {
            root.style.setProperty("--grid-opacity", "0.25")
          }

          const grids = document.querySelectorAll(".component-grid")
          grids.forEach((grid) => {
            if (newSettings.gridAnimation) {
              grid.classList.add("animate")
            } else {
              grid.classList.remove("animate")
            }
          })
        }
      } catch (error) {
        console.warn("Failed to update settings:", error)
      }
    },
    [settings, isClient, localStorage],
  )

  const resetSettings = useCallback(() => {
    const defaultSettings = {
      floatingPixels: true,
      gridAnimation: true,
      glitchEffects: true,
      typewriterEffect: true,
      hoverAnimations: true,
      reducedMotion: false,
      animationSpeed: 1,
      particleCount: 20,
      performanceMode: "normal" as const,
      gpuAcceleration: true,
      showPerformanceMonitor: false,
      showNetworkMonitor: true,
    }
    setSettings(defaultSettings)
    if (isClient && localStorage) {
      try {
        localStorage.setItem("portfolio-settings", JSON.stringify(defaultSettings))
      } catch (error) {
        console.warn("Failed to reset settings:", error)
      }
    }
  }, [isClient, localStorage])

  // Data (moved to avoid SSR issues)
  const projects = [
    {
      id: "pixel-game",
      title: "PIXEL_GAME.EXE",
      description: "Retro 2D game engine with pixel-perfect collision detection",
      tech: ["TypeScript", "Canvas", "WebGL"],
      github: "#",
      demo: "#",
      ascii: ["████████", "█      █", "█  ██  █", "█      █", "████████"],
    },
    {
      id: "chiptune-player",
      title: "CHIPTUNE_PLAYER.EXE",
      description: "8-bit music player with real-time waveform visualization",
      tech: ["React", "Web Audio", "CSS"],
      github: "#",
      demo: "#",
      ascii: ["♪ ♫ ♪ ♫", "████████", "█▓▓▓▓▓▓█", "████████", "♫ ♪ ♫ ♪"],
    },
    {
      id: "retro-dash",
      title: "RETRO_DASH.EXE",
      description: "Pixel-perfect admin dashboard with terminal interface",
      tech: ["Next.js", "Tailwind", "Framer"],
      github: "#",
      demo: "#",
      ascii: ["┌──────┐", "│ DASH │", "├──────┤", "│ DATA │", "└──────┘"],
    },
  ]

  const skills = [
    "JAVASCRIPT.JS",
    "TYPESCRIPT.TS",
    "REACT.JSX",
    "NEXT.JS",
    "NODE.JS",
    "PYTHON.PY",
    "CSS.SCSS",
    "TAILWIND.CSS",
    "GIT.VCS",
    "DOCKER.YML",
    "POSTGRESQL.DB",
    "MONGODB.JSON",
    "GRAPHQL.GQL",
    "AWS.CLOUD",
    "KUBERNETES.K8S",
    "REDIS.CACHE",
  ]

  const experiences = [
    {
      title: "SENIOR_DEVELOPER.EXE",
      company: "TechCorp Industries",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Leading full-stack development team and architecting scalable solutions",
      achievements: [
        "> Increased application performance by 300%",
        "> Led team of 8 developers across 3 time zones",
        "> Implemented CI/CD pipeline reducing deployment time by 80%",
        "> Mentored 12+ junior developers",
      ],
      tech: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
      ascii: ["┌─────────┐", "│ SENIOR  │", "│ █████   │", "│ █████   │", "└─────────┘"],
    },
    {
      title: "FULLSTACK_DEV.EXE",
      company: "StartupLab",
      location: "Austin, TX",
      period: "2020 - 2022",
      description: "Built MVP products from concept to production deployment",
      achievements: [
        "> Developed 5 successful product launches",
        "> Reduced server costs by 60% through optimization",
        "> Built real-time chat system handling 10k+ users",
        "> Implemented automated testing suite",
      ],
      tech: ["Vue.js", "Python", "PostgreSQL", "Redis", "GCP"],
      ascii: ["┌─────────┐", "│ FULL    │", "│ STACK   │", "│ ███████ │", "└─────────┘"],
    },
    {
      title: "FRONTEND_DEV.EXE",
      company: "DesignStudio",
      location: "Remote",
      period: "2018 - 2020",
      description: "Created pixel-perfect responsive web applications",
      achievements: [
        "> Improved user engagement by 150%",
        "> Built component library used by 20+ projects",
        "> Optimized bundle size reducing load time by 40%",
        "> Collaborated with design team on 50+ projects",
      ],
      tech: ["JavaScript", "SCSS", "Webpack", "Jest", "Figma"],
      ascii: ["┌─────────┐", "│ FRONT   │", "│ END     │", "│ ████    │", "└─────────┘"],
    },
  ]

  const blogPosts = [
    {
      slug: "building-retro-ui",
      title: "BUILDING_RETRO_UI.MD",
      description: "How to create pixel-perfect retro interfaces with modern CSS",
      date: "2024-01-15",
      readTime: "8 min",
      tags: ["CSS", "Design", "Retro"],
      ascii: ["████████", "█ CSS  █", "█ GRID █", "█ FLEX █", "████████"],
    },
    {
      slug: "nextjs-performance",
      title: "NEXTJS_OPTIMIZATION.MD",
      description: "Advanced techniques for optimizing Next.js applications",
      date: "2024-01-10",
      readTime: "12 min",
      tags: ["Next.js", "Performance", "React"],
      ascii: ["⚡⚡⚡⚡⚡⚡", "█ NEXT █", "█ FAST █", "█ PERF █", "⚡⚡⚡⚡⚡⚡"],
    },
    {
      slug: "pixel-art-css",
      title: "PIXEL_ART_CSS.MD",
      description: "Creating pixel art and animations using pure CSS",
      date: "2024-01-05",
      readTime: "6 min",
      tags: ["CSS", "Animation", "Art"],
      ascii: ["▓▓▓▓▓▓▓▓", "▓ ART  ▓", "▓ PIXEL▓", "▓ CSS  ▓", "▓▓▓▓▓▓▓▓"],
    },
    {
      slug: "typescript-tips",
      title: "TYPESCRIPT_TIPS.MD",
      description: "Advanced TypeScript patterns for better code quality",
      date: "2023-12-28",
      readTime: "10 min",
      tags: ["TypeScript", "JavaScript", "Tips"],
      ascii: ["┌──────┐", "│ TS   │", "│ TIPS │", "│ CODE │", "└──────┘"],
    },
  ]

  // Loading state with SSR safety
  if (!isClient) {
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
    <ErrorBoundary>
      <div
        className={`min-h-screen transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-green-400" : "bg-gray-100 text-gray-900"
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Animated Background */}
        <AnimatedBackground darkMode={darkMode} />

        {/* Header */}
        <header
          className={`sticky top-0 z-50 border-b-2 pixel-border backdrop-blur-sm ${
            darkMode ? "bg-gray-800/90 border-green-400" : "bg-white/90 border-gray-600"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 pixel-art-logo ${darkMode ? "bg-green-400" : "bg-gray-900"}`}>
                  <div className="pixel-pattern"></div>
                </div>
                <h1 className="text-xl font-bold font-mono tracking-wider glitch-text">{"<DEV.PORTFOLIO/>"}</h1>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => handleSectionChange(section)}
                    className={`font-mono text-sm uppercase tracking-wider transition-all duration-200 hover:scale-110 pixel-button ${
                      activeSection === section
                        ? darkMode
                          ? "text-green-400 pixel-glow"
                          : "text-gray-900 pixel-glow"
                        : darkMode
                          ? "text-gray-400 hover:text-green-300"
                          : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {section.toUpperCase()}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                {settings.showNetworkMonitor && <NetworkMonitor darkMode={darkMode} />}
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
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-b-2 pixel-border ${darkMode ? "bg-gray-800 border-green-400" : "bg-white border-gray-600"}`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex justify-center space-x-4 flex-1">
                {[
                  { key: "about", icon: User },
                  { key: "experience", icon: Briefcase },
                  { key: "projects", icon: Code },
                  { key: "blog", icon: BookOpen },
                  { key: "skills", icon: Zap },
                  { key: "contact", icon: MessageSquare },
                  { key: "settings", icon: Settings },
                ].map(({ key, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleSectionChange(key)}
                    className={`p-3 transition-all duration-200 hover:scale-110 touch-target ${
                      activeSection === key
                        ? darkMode
                          ? "text-green-400 pixel-glow"
                          : "text-gray-900 pixel-glow"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs font-mono opacity-60">← SWIPE TO NAVIGATE →</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main
          className={`container mx-auto px-4 py-8 relative z-10 transition-opacity duration-150 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        >
          {/* About Section */}
          {activeSection === "about" && (
            <div className="max-w-4xl mx-auto slide-in">
              <div className="text-center mb-12">
                <div className={`w-32 h-32 mx-auto mb-6 pixel-avatar ${darkMode ? "bg-green-400" : "bg-gray-900"}`}>
                  <div className="pixel-face"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4 tracking-wider">HELLO_WORLD</h2>
                <div className="text-lg md:text-xl font-mono min-h-[2rem]">
                  <span>{typewriterText}</span>
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
                </div>
              </div>

              <Card
                className={`pixel-border hover:scale-105 transition-transform duration-300 ${
                  darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                } component-grid ${darkMode ? "dark" : "light"} animate`}
              >
                <CardHeader>
                  <CardTitle className="font-mono text-xl flex items-center">
                    <span className="mr-2">📁</span> ABOUT.EXE
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 font-mono">
                  <div className="terminal-text">
                    <p className="typing-animation" style={{ animationDelay: "0.5s" }}>
                      {"> Passionate developer with 5+ years of experience"}
                    </p>
                    <p className="typing-animation" style={{ animationDelay: "1s" }}>
                      {"> Specializing in modern web technologies and retro aesthetics"}
                    </p>
                    <p className="typing-animation" style={{ animationDelay: "1.5s" }}>
                      {"> Love creating pixel-perfect interfaces and smooth UX"}
                    </p>
                    <p className="typing-animation" style={{ animationDelay: "2s" }}>
                      {"> When not coding, creating pixel art and playing retro games"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && (
            <div className="max-w-4xl mx-auto slide-in">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">
                💼 EXPERIENCE.LOG
              </h2>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <Card
                    key={index}
                    className={`pixel-border transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? "bg-gray-800 border-green-400 text-green-400"
                        : "bg-white border-gray-600 text-gray-900"
                    } component-grid ${darkMode ? "dark" : "light"} animate`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="font-mono text-xl mb-2">{exp.title}</CardTitle>
                          <CardDescription
                            className={`font-mono text-lg font-semibold ${darkMode ? "text-green-300" : "text-gray-700"}`}
                          >
                            {exp.company}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <div className="flex items-center gap-2 font-mono text-sm">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-2 font-mono text-sm">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <p className={`font-mono mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {exp.description}
                          </p>

                          <div className="mb-4">
                            <h4 className="font-mono text-sm font-bold mb-2 flex items-center gap-2">
                              <Trophy className="h-4 w-4" />
                              ACHIEVEMENTS.TXT
                            </h4>
                            <div className="terminal-text">
                              {exp.achievements.map((achievement, i) => (
                                <p
                                  key={i}
                                  className="typing-animation font-mono text-sm"
                                  style={{ animationDelay: `${index * 0.5 + i * 0.2}s` }}
                                >
                                  {achievement}
                                </p>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-mono text-sm font-bold mb-2 flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              TECH_STACK.JSON
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className={`px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform ${
                                    darkMode
                                      ? "bg-green-400 text-gray-900 border-green-400"
                                      : "bg-gray-900 text-white border-gray-900"
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <div className="ascii-art font-mono text-xs text-center">
                            {exp.ascii.map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && (
            <div className="max-w-6xl mx-auto slide-in">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">
                📂 PROJECTS.DIR
              </h2>

              {/* Mobile Project Carousel */}
              <div className="md:hidden mb-8">
                <div className="relative">
                  <Card
                    className={`pixel-border ${
                      darkMode
                        ? "bg-gray-800 border-green-400 text-green-400"
                        : "bg-white border-gray-600 text-gray-900"
                    } component-grid ${darkMode ? "dark" : "light"} animate`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-mono text-lg">{projects[currentProjectIndex].title}</CardTitle>
                        <div className="text-xs font-mono opacity-60">
                          {currentProjectIndex + 1}/{projects.length}
                        </div>
                      </div>
                      <CardDescription className={`font-mono ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {projects[currentProjectIndex].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="ascii-art mb-4 text-center font-mono text-xs">
                        {projects[currentProjectIndex].ascii.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {projects[currentProjectIndex].tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform ${
                              darkMode
                                ? "bg-green-400 text-gray-900 border-green-400"
                                : "bg-gray-900 text-white border-gray-900"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`pixel-border font-mono flex-1 touch-target ${
                            darkMode
                              ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                              : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                          }`}
                        >
                          <Github className="h-4 w-4 mr-1" />
                          CODE
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`pixel-border font-mono flex-1 touch-target ${
                            darkMode
                              ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                              : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                          }`}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          DEMO
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}
                      variant="outline"
                      size="sm"
                      className={`pixel-border touch-target ${
                        darkMode
                          ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                          : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setCurrentProjectIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}
                      variant="outline"
                      size="sm"
                      className={`pixel-border touch-target ${
                        darkMode
                          ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                          : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className={`pixel-border transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                      darkMode
                        ? "bg-gray-800 border-green-400 text-green-400"
                        : "bg-white border-gray-600 text-gray-900"
                    } component-grid ${darkMode ? "dark" : "light"} animate`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardHeader>
                      <CardTitle className="font-mono text-lg">{project.title}</CardTitle>
                      <CardDescription className={`font-mono ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="ascii-art mb-4 text-center font-mono text-xs">
                        {project.ascii.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform ${
                              darkMode
                                ? "bg-green-400 text-gray-900 border-green-400"
                                : "bg-gray-900 text-white border-gray-900"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`pixel-border font-mono ${
                            darkMode
                              ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                              : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                          }`}
                        >
                          <Github className="h-4 w-4 mr-1" />
                          CODE
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`pixel-border font-mono ${
                            darkMode
                              ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                              : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                          }`}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          DEMO
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Blog Section */}
          {activeSection === "blog" && (
            <div className="max-w-4xl mx-auto slide-in">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">📝 BLOG.DIR</h2>

              <div className="grid gap-6">
                {blogPosts.map((post, index) => (
                  <Card
                    key={post.slug}
                    className={`pixel-border transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                      darkMode
                        ? "bg-gray-800 border-green-400 text-green-400"
                        : "bg-white border-gray-600 text-gray-900"
                    } component-grid ${darkMode ? "dark" : "light"} animate cursor-pointer`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="font-mono text-xl mb-2">{post.title}</CardTitle>
                          <CardDescription className={`font-mono ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {post.description}
                          </CardDescription>
                        </div>
                        <div className="ascii-art font-mono text-xs text-center md:text-right">
                          {post.ascii.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 font-mono text-sm">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 font-mono text-sm">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform flex items-center gap-1 ${
                              darkMode
                                ? "bg-gray-700 text-green-400 border-green-400"
                                : "bg-gray-100 text-gray-900 border-gray-600"
                            }`}
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && (
            <div className="max-w-4xl mx-auto slide-in">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">
                ⚡ SKILLS.JSON
              </h2>
              <Card
                className={`pixel-border ${
                  darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                } component-grid ${darkMode ? "dark" : "light"} animate`}
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`p-3 text-center font-mono text-sm pixel-border transition-all duration-300 hover:scale-110 hover:-rotate-2 skill-item touch-target ${
                          darkMode ? "bg-gray-900 border-green-400" : "bg-gray-100 border-gray-600"
                        } component-grid ${darkMode ? "dark" : "light"}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === "contact" && (
            <div className="max-w-2xl mx-auto text-center slide-in">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 tracking-wider">📡 CONTACT.SH</h2>
              <Card
                className={`pixel-border hover:scale-105 transition-transform duration-300 ${
                  darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                } component-grid ${darkMode ? "dark" : "light"} animate`}
              >
                <CardContent className="p-8">
                  <div className="ascii-art mb-8 font-mono text-sm">
                    <div>{"    ╔══════════════╗"}</div>
                    <div>{"    ║ READY TO     ║"}</div>
                    <div>{"    ║ COLLABORATE? ║"}</div>
                    <div>{"    ╚══════════════╝"}</div>
                  </div>
                  <p className="font-mono text-lg mb-8 typing-animation">
                    {"> Let's build something awesome together!"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className={`pixel-border font-mono hover:scale-110 transition-transform touch-target ${
                        darkMode
                          ? "bg-green-400 text-gray-900 border-green-400 hover:bg-green-300"
                          : "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                      } component-grid ${darkMode ? "dark" : "light"}`}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      EMAIL.SEND()
                    </Button>
                    <Button
                      variant="outline"
                      className={`pixel-border font-mono hover:scale-110 transition-transform touch-target ${
                        darkMode
                          ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                          : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                      } component-grid ${darkMode ? "dark" : "light"}`}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GITHUB.VISIT()
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="max-w-4xl mx-auto slide-in">
              <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">
                ⚙️ SETTINGS.CFG
              </h2>

              <div className="grid gap-6">
                {/* Performance Mode */}
                <Card
                  className={`pixel-border ${
                    darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                  } component-grid ${darkMode ? "dark" : "light"} animate`}
                >
                  <CardHeader>
                    <CardTitle className="font-mono text-xl flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      PERFORMANCE_MODE.CFG
                    </CardTitle>
                    <CardDescription className="font-mono">
                      Optimize rendering performance for your device
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["high", "normal", "low"].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => updateSetting("performanceMode", mode)}
                          className={`p-3 pixel-border font-mono text-sm transition-all duration-200 hover:scale-105 ${
                            settings.performanceMode === mode
                              ? darkMode
                                ? "bg-green-400 text-gray-900 border-green-400"
                                : "bg-gray-900 text-white border-gray-900"
                              : darkMode
                                ? "bg-gray-700 border-green-400 hover:bg-gray-600"
                                : "bg-gray-100 border-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {mode.toUpperCase()}_PERF.EXE
                          <div className="text-xs mt-1 opacity-60">
                            {mode === "high" && "Max FPS, Min Effects"}
                            {mode === "normal" && "Balanced Performance"}
                            {mode === "low" && "Max Effects, Slower"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Animation Controls */}
                <Card
                  className={`pixel-border ${
                    darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                  } component-grid ${darkMode ? "dark" : "light"} animate`}
                >
                  <CardHeader>
                    <CardTitle className="font-mono text-xl flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      ANIMATION_CONTROLS.JSON
                    </CardTitle>
                    <CardDescription className="font-mono">Toggle individual animation effects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "floatingPixels", label: "FLOATING_PIXELS.EXE" },
                        { key: "gridAnimation", label: "GRID_ANIMATION.EXE" },
                        { key: "glitchEffects", label: "GLITCH_EFFECTS.EXE" },
                        { key: "typewriterEffect", label: "TYPEWRITER.EXE" },
                        { key: "hoverAnimations", label: "HOVER_EFFECTS.EXE" },
                        { key: "gpuAcceleration", label: "GPU_ACCELERATION.EXE" },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className={`flex items-center justify-between p-3 pixel-border ${
                            darkMode ? "bg-gray-700 border-green-400" : "bg-gray-100 border-gray-600"
                          } component-grid ${darkMode ? "dark" : "light"}`}
                        >
                          <span className="font-mono text-sm">{label}</span>
                          <button
                            onClick={() => updateSetting(key, !settings[key as keyof typeof settings])}
                            className={`w-12 h-6 pixel-border transition-colors ${
                              settings[key as keyof typeof settings] ? "bg-green-400" : "bg-gray-400"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white transition-transform ${
                                settings[key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Controls */}
                <Card
                  className={`pixel-border ${
                    darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                  } component-grid ${darkMode ? "dark" : "light"} animate`}
                >
                  <CardHeader>
                    <CardTitle className="font-mono text-xl flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      PERFORMANCE.CFG
                    </CardTitle>
                    <CardDescription className="font-mono">Fine-tune animation performance settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="font-mono text-sm mb-2 block">
                        ANIMATION_SPEED: {settings.animationSpeed}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.5"
                        value={settings.animationSpeed}
                        onChange={(e) => updateSetting("animationSpeed", Number.parseFloat(e.target.value))}
                        className={`w-full h-2 pixel-border appearance-none ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                      />
                      <div className="flex justify-between font-mono text-xs mt-1">
                        <span>0.5x (Slow)</span>
                        <span>1.5x (Normal)</span>
                        <span>3x (Fast)</span>
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-sm mb-2 block">PARTICLE_COUNT: {settings.particleCount}</label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={settings.particleCount}
                        onChange={(e) => updateSetting("particleCount", Number.parseInt(e.target.value))}
                        className={`w-full h-2 pixel-border appearance-none ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                      />
                      <div className="flex justify-between font-mono text-xs mt-1">
                        <span>5 (Minimal)</span>
                        <span>25 (Balanced)</span>
                        <span>50 (Maximum)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Info */}
                <Card
                  className={`pixel-border ${
                    darkMode ? "bg-gray-800 border-green-400 text-green-400" : "bg-white border-gray-600 text-gray-900"
                  } component-grid ${darkMode ? "dark" : "light"} animate`}
                >
                  <CardHeader>
                    <CardTitle className="font-mono text-xl flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      SYSTEM_INFO.LOG
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>USER_AGENT:</span>
                        <span className="text-right text-xs opacity-60">
                          {isClient && navigator ? navigator.userAgent.slice(0, 30) + "..." : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SCREEN_SIZE:</span>
                        <span>{isClient ? `${window.screen.width}x${window.screen.height}` : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VIEWPORT:</span>
                        <span>{isClient ? `${window.innerWidth}x${window.innerHeight}` : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PIXEL_RATIO:</span>
                        <span>{isClient ? window.devicePixelRatio : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CPU_CORES:</span>
                        <span>{isClient && navigator ? navigator.hardwareConcurrency || "Unknown" : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DEVICE_MEMORY:</span>
                        <span>
                          {isClient && navigator
                            ? (navigator as any).deviceMemory
                              ? `${(navigator as any).deviceMemory}GB`
                              : "Unknown"
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>ONLINE_STATUS:</span>
                        <span className={isClient && navigator && navigator.onLine ? "text-green-400" : "text-red-400"}>
                          {isClient && navigator ? (navigator.onLine ? "ONLINE" : "OFFLINE") : "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reset Button */}
                <div className="text-center">
                  <Button
                    onClick={resetSettings}
                    variant="outline"
                    className={`pixel-border font-mono ${
                      darkMode
                        ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                        : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
                    } component-grid ${darkMode ? "dark" : "light"}`}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    RESET_TO_DEFAULTS.EXE
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer
          className={`border-t-2 pixel-border mt-16 ${darkMode ? "border-green-400 bg-gray-800" : "border-gray-600 bg-white"}`}
        >
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="font-mono text-sm">{"© 2024 DEV.PORTFOLIO - Crafted with <3 and lots of █ pixels █"}</p>
          </div>
        </footer>

        {/* Performance Monitor */}
        {settings.showPerformanceMonitor && <PerformanceMonitor />}
      </div>
    </ErrorBoundary>
  )
}
