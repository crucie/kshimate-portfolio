"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { motion } from "framer-motion"
import { Briefcase, FolderOpen, Github, ExternalLink, ChevronRight, MapPin, Calendar, Palette, Gamepad2, Clapperboard, type LucideIcon } from "lucide-react"
import { projects, statusClass } from "@/lib/projects"

// ─── Experience Data ───────────────────────────────
type Experience = { title: string; company: string; location: string; period: string; icon: LucideIcon; achievements: string[]; tech: string[] }
const experiences: Experience[] = [
  {
    title: "DESIGN_LEAD.EXE",
    company: "MATRIX INNOVATION",
    location: "Lucknow, UP",
    period: "Dec 2023 – Jan 2025",
    icon: Palette,
    achievements: [
      "Designed & implemented 3+ scalable design systems",
      "Led team of 3 designers across 10+ projects",
      "Reduced design inconsistencies by 80%",
    ],
    tech: ["Figma", "React-Native", "React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "INDIE_GAMEDEV.EXE",
    company: "~PERSONAL PROJECTS",
    location: "Remote",
    period: "Mar 2021 – Jan 2022",
    icon: Gamepad2,
    achievements: [
      "Developed 3+ indie games using Unity and C#",
      "Built 2D pixel art games with custom animation pipelines",
    ],
    tech: ["Unity", "C#", "Blender", "Figma", "Adobe Photoshop"],
  },
  {
    title: "CHIEF_VIDEO_ANIMATOR.EXE",
    company: "INTEGRATED_IDEAS",
    location: "Remote",
    period: "Jul 2019 – Oct 2019",
    icon: Clapperboard,
    achievements: [
      "Produced 5+ high-quality motion graphics campaigns",
      "Created ads that increased engagement by 40%",
      "Streamlined workflow, cutting production time 30%",
    ],
    tech: ["After Effects", "Premiere Pro", "Illustrator", "Photoshop"],
  },
]

const screenshotOf = (url: string) =>
  `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`

function ProjectThumb({ url, image, title }: { url: string | null; image?: string; title: string }) {
  const [failed, setFailed] = useState(false)
  const thumbSrc = image ?? (url ? screenshotOf(url) : null)

  if (!thumbSrc) {
    return (
      <div className="project-thumb flex items-center justify-center">
        <div className="font-mono text-xs opacity-30 text-center">
          <div className="text-2xl mb-1">🚧</div>
          IN_PRODUCTION
        </div>
      </div>
    )
  }

  if (failed) {
    return (
      <div className="project-thumb flex items-center justify-center">
        <div className="font-mono text-xs opacity-30">{title.toUpperCase()}</div>
      </div>
    )
  }

  return (
    <div className="project-thumb">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbSrc} alt={`${title} screenshot`} loading="lazy" onError={() => setFailed(true)} />
    </div>
  )
}

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const cardVariant = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-16 scroll-mt-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">QUEST_LOG.TXT</h2>
          </div>

          <div className="quest-line space-y-6 pl-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-12 top-4 w-8 h-8 pixel-border bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="pixel-border bg-card text-card-foreground border-current component-grid hover:scale-[1.01] transition-transform duration-200">
                  <div className="border-b border-current/30 px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <exp.icon className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <div className="font-mono text-base font-bold">{exp.title}</div>
                        <div className="font-mono text-sm opacity-60">{exp.company}</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="font-mono text-xs px-2 py-1 pixel-border bg-primary/10 border-current flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {exp.period}
                      </span>
                      <span className="font-mono text-xs opacity-50 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-mono text-xs opacity-50 mb-2">// QUEST_OBJECTIVES</p>
                    <ul className="space-y-1 mb-4">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="font-mono text-sm flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 font-mono text-xs pixel-border bg-primary text-primary-foreground border-current hover:scale-105 transition-transform">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-16 scroll-mt-24">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <FolderOpen className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">PROJECTS.DIR</h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariant}
                whileHover={{ scale: 1.025, rotate: 0.3 }}
                className="pixel-border bg-card text-card-foreground border-current component-grid flex flex-col"
              >
                {/* Thumbnail */}
                <ProjectThumb
                  url={project.url}
                  image={project.thumbImage}
                  title={project.title}
                />

                {/* Info */}
                <div className="border-b border-current/30 px-4 py-3 flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-sm font-bold">{project.title}</div>
                    <div className="font-mono text-xs opacity-60 mt-0.5 leading-relaxed">{project.description}</div>
                  </div>
                  <span className={`px-2 py-0.5 font-mono text-xs pixel-border shrink-0 ${statusClass[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                {/* Tech */}
                <div className="px-4 py-2 flex flex-wrap gap-1 border-b border-current/30">
                  {project.tech.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 font-mono text-[10px] pixel-border bg-primary/10 border-current">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="px-4 py-3 flex gap-2 mt-auto">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <button className="w-full pixel-border font-mono text-xs py-1.5 border-current hover:bg-accent/40 transition-colors flex items-center justify-center gap-1">
                      <Github className="h-3 w-3" /> CODE
                    </button>
                  </a>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="w-full pixel-border font-mono text-xs py-1.5 bg-primary text-primary-foreground border-current hover:bg-primary/80 transition-colors flex items-center justify-center gap-1">
                        <ExternalLink className="h-3 w-3" /> LIVE
                      </button>
                    </a>
                  ) : (
                    <button disabled className="flex-1 pixel-border font-mono text-xs py-1.5 border-current opacity-30 cursor-not-allowed">
                      🚧 SOON
                    </button>
                  )}
                </div>

                {/* Additional deployments */}
                {project.links && project.links.length > 0 && (
                  <div className="px-4 pb-3 -mt-1 flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 basis-[calc(50%-0.25rem)]"
                      >
                        <button className="w-full pixel-border font-mono text-[10px] py-1 bg-primary/10 border-current hover:bg-accent/40 transition-colors flex items-center justify-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> {link.label}
                        </button>
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
