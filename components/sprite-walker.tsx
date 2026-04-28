"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface SpriteWalkerProps {
  /** Number of stops along the track (e.g. number of jobs) */
  stops: number
}

/**
 * A pixel-art sprite that walks along a horizontal dashed track,
 * driven by scroll progress within a container.
 */
export function SpriteWalker({ stops }: SpriteWalkerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const spriteX = useTransform(scrollYProgress, [0, 1], ["0%", "92%"])
  const [frame, setFrame] = useState(0)

  // Sprite walk cycle: alternate frames
  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f + 1) % 2), 300)
    return () => clearInterval(timer)
  }, [])

  const sprites = ["🚶", "🏃"]

  return (
    <div ref={trackRef} className="sprite-track my-6 mx-auto max-w-2xl">
      {/* Dashed rail */}
      <div className="sprite-track-rail" />

      {/* Stop markers */}
      {Array.from({ length: stops }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-2 h-2 pixel-border border-current opacity-40"
          style={{
            left: `${(i / Math.max(stops - 1, 1)) * 92}%`,
            background: "currentColor",
          }}
        />
      ))}

      {/* Walking sprite */}
      <motion.div className="pixel-sprite" style={{ left: spriteX }}>
        {sprites[frame]}
      </motion.div>
    </div>
  )
}
