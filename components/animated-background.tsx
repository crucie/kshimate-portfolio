"use client"

import { useEffect, useState, useRef } from "react"
import type { Theme } from "@/components/client-layout"

export function AnimatedBackground({ darkMode, theme }: { darkMode: boolean; theme: Theme }) {
  const [particleCount, setParticleCount] = useState(20)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const s = localStorage.getItem("portfolio-settings")
    if (s) { const p = JSON.parse(s); setParticleCount(p.particleCount || 20) }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    if (theme === "fire-red") {
      // ── Ember / fire particles ──
      type Ember = { x: number; y: number; vx: number; vy: number; size: number; life: number; maxLife: number; hue: number }
      const embers: Ember[] = []
      const starCount = Math.min(particleCount * 4, 150)
      for (let i = 0; i < starCount; i++) {
        embers.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(0.4 + Math.random() * 1.2),
          size: 1 + Math.random() * 2,
          life: Math.random() * 200,
          maxLife: 150 + Math.random() * 150,
          hue: 10 + Math.random() * 30,
        })
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const e of embers) {
          e.x += e.vx; e.y += e.vy; e.life++
          if (e.life > e.maxLife) {
            e.x = Math.random() * canvas.width
            e.y = canvas.height + 10
            e.life = 0
          }
          const alpha = Math.sin((e.life / e.maxLife) * Math.PI) * 0.9
          const bright = darkMode ? `hsla(${e.hue},100%,60%,${alpha})` : `hsla(${e.hue},80%,45%,${alpha * 0.5})`
          ctx.fillStyle = bright
          ctx.fillRect(Math.floor(e.x), Math.floor(e.y), Math.ceil(e.size), Math.ceil(e.size))
        }
        animId = requestAnimationFrame(draw)
      }
      draw()
    } else {
      // ── Space starfield ──
      type Star = { x: number; y: number; size: number; brightness: number; twinkleSpeed: number }
      type Shoot = { x: number; y: number; speed: number; length: number; opacity: number; active: boolean }
      const stars: Star[] = []
      const shooting: Shoot[] = []
      const starCount = Math.min(particleCount * 5, 200)
      for (let i = 0; i < starCount; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2, brightness: Math.random(), twinkleSpeed: 0.005 + Math.random() * 0.02 })
      }

      let tick = 0
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        tick++
        for (const s of stars) {
          s.brightness += s.twinkleSpeed
          const alpha = 0.15 + Math.abs(Math.sin(s.brightness)) * 0.85
          ctx.fillStyle = darkMode ? `rgba(180,220,255,${alpha})` : `rgba(80,80,120,${alpha * 0.3})`
          ctx.fillRect(Math.floor(s.x), Math.floor(s.y), Math.ceil(s.size), Math.ceil(s.size))
        }
        if (tick % 300 === 0 && shooting.length < 2) {
          shooting.push({ x: Math.random() * canvas.width * 0.5, y: Math.random() * canvas.height * 0.4, speed: 4 + Math.random() * 4, length: 30 + Math.random() * 40, opacity: 1, active: true })
        }
        for (const ss of shooting) {
          if (!ss.active) continue
          ss.x += ss.speed; ss.y += ss.speed * 0.5; ss.opacity -= 0.015
          if (ss.opacity <= 0) { ss.active = false; continue }
          const g = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.length * 0.5)
          g.addColorStop(0, darkMode ? `rgba(0,255,159,${ss.opacity})` : `rgba(100,100,200,${ss.opacity})`)
          g.addColorStop(1, "transparent")
          ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(ss.x - ss.length, ss.y - ss.length * 0.5); ctx.stroke()
        }
        for (let i = shooting.length - 1; i >= 0; i--) { if (!shooting[i].active) shooting.splice(i, 1) }
        animId = requestAnimationFrame(draw)
      }
      draw()
    }

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [darkMode, theme, particleCount])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: darkMode ? 0.85 : 0.65 }} />
}
