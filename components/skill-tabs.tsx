"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { skillCategories } from "@/lib/skills"

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 380, damping: 26 } },
}

export function SkillTabs() {
  const [activeId, setActiveId] = useState(skillCategories[0].id)
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0]

  return (
    <div>
      <div role="tablist" aria-label="Skill categories" className="flex flex-wrap justify-center gap-2 mb-6">
        {skillCategories.map((cat) => {
          const selected = cat.id === active.id
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${cat.id}`}
              onClick={() => setActiveId(cat.id)}
              className={`relative pixel-border border-current px-3 py-2 font-mono text-xs tracking-wider flex items-center gap-2 transition-colors ${
                selected ? "text-primary-foreground" : "hover:bg-accent/40"
              }`}
            >
              {/* Slides between tabs instead of each one fading on its own */}
              {selected && (
                <motion.span
                  layoutId="skill-tab-active"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <cat.icon className="relative h-4 w-4" strokeWidth={1.75} />
              <span className="relative">{cat.label}</span>
            </button>
          )
        })}
      </div>

      <div className="pixel-border bg-card text-card-foreground border-current component-grid">
        <div className="border-b border-current/30 px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <active.icon className="h-5 w-5 text-primary shrink-0" strokeWidth={1.75} />
            <span className="font-mono text-base font-bold tracking-wider">{active.label}</span>
          </div>
          <span className="font-mono text-[10px] opacity-50">
            {String(active.tech.length).padStart(2, "0")} ENTRIES
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-label={active.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="px-5 py-5"
          >
            <p className="font-mono text-xs opacity-50 mb-5">// {active.blurb}</p>

            <motion.ul
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 list-none"
            >
              {active.tech.map((tech) => (
                <motion.li
                  key={tech.name}
                  variants={tileVariants}
                  whileHover={{ y: -4 }}
                  className="group pixel-border border-current bg-accent/20 px-3 py-4 flex flex-col items-center gap-2 cursor-default"
                >
                  <tech.icon
                    className="h-8 w-8 text-primary transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
                    strokeWidth={1.5}
                  />
                  <span className="font-mono text-[11px] text-center leading-tight">{tech.name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
