"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Monitor, Server, Rocket, Palette, Gamepad2 } from "lucide-react"
import { GithubContributions } from "@/components/github-contributions"

type Category = { name: string; icon: React.ElementType; skills: { label: string; level: number }[] }

const categories: Category[] = [
  {
    name: "FRONTEND", icon: Monitor,
    skills: [
      { label: "React / Next.js", level: 90 },
      { label: "TypeScript", level: 80 },
      { label: "Tailwind CSS", level: 88 },
      { label: "React Native", level: 70 },
    ],
  },
  {
    name: "BACKEND", icon: Server,
    skills: [
      { label: "Node.js / Express", level: 82 },
      { label: "MongoDB / Mongoose", level: 78 },
      { label: "PostgreSQL", level: 65 },
      { label: "GraphQL", level: 55 },
    ],
  },
  {
    name: "DEVOPS", icon: Rocket,
    skills: [
      { label: "Git / GitHub", level: 88 },
      { label: "Docker", level: 60 },
      { label: "CI/CD Pipelines", level: 55 },
      { label: "AWS (basics)", level: 45 },
    ],
  },
  {
    name: "DESIGN", icon: Palette,
    skills: [
      { label: "Figma / Design Systems", level: 85 },
      { label: "Adobe Suite", level: 78 },
      { label: "Framer Motion", level: 72 },
      { label: "GSAP / SVG Anim.", level: 60 },
    ],
  },
  {
    name: "GAMEDEV", icon: Gamepad2,
    skills: [
      { label: "Unity / C#", level: 75 },
      { label: "Blender 3D", level: 60 },
      { label: "Pixel Art", level: 70 },
      { label: "WebGL / Three.js", level: 40 },
    ],
  },
]

function SkillBar({ label, level, delay }: { label: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between font-mono text-xs mb-1">
        <span>{label}</span>
        <span className="text-primary opacity-80">{level}/100</span>
      </div>
      <div className="h-3 pixel-border bg-accent/30 border-current overflow-hidden">
        <motion.div
          className="hp-bar-fill h-full bg-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }
const categoryVariants = { hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -50 : 50 }), show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }

export default function SkillsPage() {
  return (
    <motion.div className="max-w-5xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <Zap className="h-6 w-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">STATS_SCREEN.EXE</h2>
      </div>
      <p className="font-mono text-sm text-center opacity-50 mb-8">// CHARACTER_SKILLS — RPG EDITION</p>

      {/* GitHub contributions graph */}
      <GithubContributions username="crucie" />

      {/* Skill categories */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            custom={i}
            variants={categoryVariants}
            className="pixel-border bg-card text-card-foreground border-current component-grid"
          >
            <div className="border-b border-current/30 px-5 py-3 flex items-center gap-2">
              <cat.icon className="h-5 w-5 text-primary" />
              <span className="font-mono text-base font-bold tracking-wider">{cat.name}</span>
            </div>
            <div className="px-5 py-4">
              {cat.skills.map((skill, j) => (
                <SkillBar key={skill.label} label={skill.label} level={skill.level} delay={j * 0.12} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
