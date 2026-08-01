"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { GithubContributions } from "@/components/github-contributions"
import { SkillTabs } from "@/components/skill-tabs"
import { skillCategories, totalTech } from "@/lib/skills"

export default function SkillsPage() {
  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <Zap className="h-6 w-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">STATS_SCREEN.EXE</h2>
      </div>
      <p className="font-mono text-sm text-center opacity-50 mb-8">
        // TECH_LOADOUT — {totalTech} TOOLS ACROSS {skillCategories.length} CLASSES
      </p>

      <GithubContributions username="crucie" />

      <SkillTabs />
    </motion.div>
  )
}
