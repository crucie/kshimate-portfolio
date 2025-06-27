"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
  })
  const [isMonitoring, setIsMonitoring] = useState(false)

  useEffect(() => {
    if (!isMonitoring) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measurePerformance = () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

        // Get memory usage if available
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
  }, [isMonitoring])

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
