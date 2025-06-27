"use client"

import { useState, useEffect } from "react"
import { Settings, Zap, Eye, Volume2, Monitor, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceMonitor } from "@/components/performance-monitor"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    floatingPixels: true,
    gridAnimation: true,
    glitchEffects: true,
    typewriterEffect: true,
    hoverAnimations: true,
    reducedMotion: false,
    animationSpeed: 1,
    particleCount: 20,
    performanceMode: "normal", // normal, high, low
    gpuAcceleration: true,
    showPerformanceMonitor: false,
    showNetworkMonitor: true,
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("portfolio-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("portfolio-settings", JSON.stringify(settings))

    // Apply settings to document
    const root = document.documentElement

    // Toggle animation classes
    root.classList.toggle("no-floating-pixels", !settings.floatingPixels)
    root.classList.toggle("no-grid-animation", !settings.gridAnimation)
    root.classList.toggle("no-glitch-effects", !settings.glitchEffects)
    root.classList.toggle("no-typewriter", !settings.typewriterEffect)
    root.classList.toggle("no-hover-animations", !settings.hoverAnimations)
    root.classList.toggle("reduced-motion", settings.reducedMotion)

    // Performance mode classes
    root.classList.remove("performance-mode-high", "performance-mode-low", "performance-mode-normal")
    root.classList.add(`performance-mode-${settings.performanceMode}`)

    // Set CSS variables
    root.style.setProperty("--animation-speed", settings.animationSpeed.toString())
    root.style.setProperty("--particle-count", settings.particleCount.toString())

    // Performance optimizations
    if (settings.performanceMode === "high") {
      root.style.setProperty("--grid-opacity", "0.15")
      root.style.setProperty("--animation-speed", (settings.animationSpeed * 0.5).toString())
    } else if (settings.performanceMode === "low") {
      root.style.setProperty("--grid-opacity", "0.1")
      root.style.setProperty("--animation-speed", (settings.animationSpeed * 2).toString())
    } else {
      root.style.setProperty("--grid-opacity", "0.25")
    }

    // GPU acceleration toggle
    if (!settings.gpuAcceleration) {
      root.style.setProperty("--gpu-acceleration", "none")
    } else {
      root.style.setProperty("--gpu-acceleration", "auto")
    }

    // Add animate class to grids
    const grids = document.querySelectorAll(".component-grid")
    grids.forEach((grid) => {
      if (settings.gridAnimation) {
        grid.classList.add("animate")
      } else {
        grid.classList.remove("animate")
      }
    })
  }, [settings])

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    const defaultSettings = {
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
    }
    setSettings(defaultSettings)
  }

  const getPerformanceRecommendation = () => {
    if (typeof window === "undefined") return null

    const memory = (performance as any).memory
    const deviceMemory = (navigator as any).deviceMemory
    const hardwareConcurrency = navigator.hardwareConcurrency || 4

    if (deviceMemory && deviceMemory < 4) {
      return "Consider using 'Low Performance' mode for better experience on this device."
    }

    if (hardwareConcurrency < 4) {
      return "Your device has limited CPU cores. 'Low Performance' mode is recommended."
    }

    if (memory && memory.totalJSHeapSize > 100 * 1024 * 1024) {
      return "High memory usage detected. Consider reducing particle count."
    }

    return null
  }

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">⚙️ SETTINGS.CFG</h2>

      <div className="grid gap-6">
        {/* Performance Mode */}
        <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate">
          <CardHeader>
            <CardTitle className="font-mono text-xl flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              PERFORMANCE_MODE.CFG
            </CardTitle>
            <CardDescription className="font-mono">Optimize rendering performance for your device</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["high", "normal", "low"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateSetting("performanceMode", mode)}
                  className={`p-3 pixel-border font-mono text-sm transition-all duration-200 hover:scale-105 ${
                    settings.performanceMode === mode
                      ? "bg-primary text-primary-foreground border-current"
                      : "bg-accent/20 border-current hover:bg-accent/40"
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

            {getPerformanceRecommendation() && (
              <div className="p-3 pixel-border bg-yellow-400/10 border-yellow-400 font-mono text-sm">
                💡 {getPerformanceRecommendation()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Animation Controls */}
        <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate">
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
                  className="flex items-center justify-between p-3 pixel-border bg-accent/20 component-grid dark:dark light"
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

        {/* UI Controls */}
        <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate">
          <CardHeader>
            <CardTitle className="font-mono text-xl flex items-center gap-2">
              <Network className="h-5 w-5" />
              UI_ELEMENTS.CFG
            </CardTitle>
            <CardDescription className="font-mono">Configure UI elements and widgets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "showNetworkMonitor", label: "NETWORK_MONITOR.EXE" },
                { key: "showPerformanceMonitor", label: "PERFORMANCE_MONITOR.EXE" },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 pixel-border bg-accent/20 component-grid dark:dark light"
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
        <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate">
          <CardHeader>
            <CardTitle className="font-mono text-xl flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              PERFORMANCE.CFG
            </CardTitle>
            <CardDescription className="font-mono">Fine-tune animation performance settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="font-mono text-sm mb-2 block">ANIMATION_SPEED: {settings.animationSpeed}x</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={settings.animationSpeed}
                onChange={(e) => updateSetting("animationSpeed", Number.parseFloat(e.target.value))}
                className="w-full h-2 pixel-border bg-accent appearance-none"
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
                className="w-full h-2 pixel-border bg-accent appearance-none"
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
        <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate">
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
                  {typeof window !== "undefined" ? window.navigator.userAgent.slice(0, 30) + "..." : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SCREEN_SIZE:</span>
                <span>{typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>VIEWPORT:</span>
                <span>{typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>PIXEL_RATIO:</span>
                <span>{typeof window !== "undefined" ? window.devicePixelRatio : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>CPU_CORES:</span>
                <span>{typeof window !== "undefined" ? navigator.hardwareConcurrency || "Unknown" : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>DEVICE_MEMORY:</span>
                <span>
                  {typeof window !== "undefined"
                    ? (navigator as any).deviceMemory
                      ? `${(navigator as any).deviceMemory}GB`
                      : "Unknown"
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ONLINE_STATUS:</span>
                <span className={typeof window !== "undefined" && navigator.onLine ? "text-green-400" : "text-red-400"}>
                  {typeof window !== "undefined" ? (navigator.onLine ? "ONLINE" : "OFFLINE") : "N/A"}
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
            className="pixel-border font-mono border-current hover:bg-accent component-grid dark:dark light"
          >
            <Settings className="h-4 w-4 mr-2" />
            RESET_TO_DEFAULTS.EXE
          </Button>
        </div>
      </div>

      {/* Performance Monitor */}
      {settings.showPerformanceMonitor && <PerformanceMonitor />}
    </div>
  )
}
