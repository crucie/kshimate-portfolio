"use client"


import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/images/Logo.png"
import { motion } from "framer-motion"
import { Terminal, Gamepad2, Palette, ChevronDown, Mail, Download } from "lucide-react"
import { projects } from "@/lib/projects"
import { ContributionStrip } from "@/components/contribution-strip"
import { useContributions } from "@/hooks/use-contributions"

// Served straight from Drive for now, so the resume can be swapped without a
// redeploy. Move to /public once the PDF is finalised.
const RESUME_URL = "https://drive.google.com/uc?export=download&id=1rF4exF1StlRqi6RbPR-xa9iBD487yx1Q"

const roles = ["FULL_STACK_DEVELOPER.EXE", "INDIE_GAME_DEVELOPER.EXE", "ANIMATOR.EXE"]
const badges = [
  { icon: Terminal, label: "WEB" },
  { icon: Gamepad2, label: "GAME" },
  { icon: Palette, label: "ART" },
]

const dialogLines = [
  "Hello, traveller! I'm kshimate(YAMA).",
  "A Full Stack Dev, Game Dev & Animator",
  "crafting pixel-perfect interfaces",
  "and building things that run on caffeine.",
]

export function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [charIdx, setCharIdx] = useState(0)
  const [erasing, setErasing] = useState(false)
  const [dialogLine, setDialogLine] = useState(0)
  const [dialogText, setDialogText] = useState("")
  const [dialogCharIdx, setDialogCharIdx] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const contributions = useContributions("crucie")

  // Role typewriter
  useEffect(() => {
    const cur = roles[roleIdx]
    if (!erasing && charIdx < cur.length) {
      const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx + 1)); setCharIdx(i => i + 1) }, 70)
      return () => clearTimeout(t)
    }
    if (!erasing && charIdx === cur.length) {
      const t = setTimeout(() => setErasing(true), 2000)
      return () => clearTimeout(t)
    }
    if (erasing && charIdx > 0) {
      const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx - 1)); setCharIdx(i => i - 1) }, 35)
      return () => clearTimeout(t)
    }
    if (erasing && charIdx === 0) { setErasing(false); setRoleIdx(i => (i + 1) % roles.length) }
  }, [charIdx, erasing, roleIdx])

  // Dialog typewriter
  useEffect(() => {
    const line = dialogLines[dialogLine]
    if (dialogCharIdx < line.length) {
      const t = setTimeout(() => { setDialogText(line.slice(0, dialogCharIdx + 1)); setDialogCharIdx(i => i + 1) }, 40)
      return () => clearTimeout(t)
    }
    if (dialogLine < dialogLines.length - 1) {
      const t = setTimeout(() => { setDialogLine(i => i + 1); setDialogCharIdx(0); setDialogText("") }, 1200)
      return () => clearTimeout(t)
    }
  }, [dialogCharIdx, dialogLine])

  // Cursor blink removed — static cursor only
  useEffect(() => { setShowCursor(true) }, [])

  return (
    <section id="hero" className="min-h-[90vh] flex flex-col justify-center pt-8 pb-16">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Role typewriter - above hero */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="font-mono text-sm opacity-60 flex items-center justify-center gap-2">
            <span className="text-primary">$</span>
            <span>{displayed}</span>
            <span className={`text-primary ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
          </div>
        </motion.div>

        {/* Main hero card - Pokémon NPC dialog style */}
        <div className="grid md:grid-cols-5 gap-0 poke-box bg-card">

          {/* LEFT: Trainer card */}
          <motion.div
            className="md:col-span-2 border-r-2 border-current/30 p-6 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Avatar */}
            <div className="pixel-avatar w-24 h-24 border-2 border-current">
              <Image src={logo} alt="kshimate" className="w-full h-full object-cover" priority />
            </div>

            {/* Trainer info */}
            <div className="text-center font-mono w-full">
              <div className="text-xl font-bold tracking-widest text-primary mb-1">KSHIMATE</div>
              <div className="text-xs opacity-50 mb-3">TRAINER CLASS: DEV</div>

              {/* HP bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1 opacity-60">
                  <span>HP</span><span>100/100</span>
                </div>
                <div className="h-3 pixel-border bg-accent/30 border-current overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="flex justify-center gap-2">
                {badges.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    className="flex flex-col items-center gap-1 p-2 pixel-border bg-primary/10 border-current"
                    whileHover={{ scale: 1.15 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-[9px] font-mono opacity-60">{label}</span>
                  </motion.div>
                ))}
              </div>

              {/* LVL */}
              <div className="mt-3 text-xs font-mono opacity-50">LVL 12 · 2+ YRS XP</div>
            </div>
          </motion.div>

          {/* RIGHT: NPC Dialog box */}
          <motion.div
            className="md:col-span-3 p-6 flex flex-col justify-between"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Dialog text */}
            <div className="flex-1 mb-6">
              <div className="font-mono text-xs opacity-40 mb-3">// NPC_DIALOG.TXT</div>

              {/* Previous lines (faded) */}
              {dialogLines.slice(0, dialogLine).map((line, i) => (
                <p key={i} className="font-mono text-sm md:text-base opacity-40 mb-1">{line}</p>
              ))}

              {/* Current line */}
              <p className="font-mono text-sm md:text-base font-medium min-h-[1.5rem]">
                <span className="text-primary mr-1">▶</span>
                {dialogText}
                {dialogLine === dialogLines.length - 1 && (
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity text-primary`}>█</span>
                )}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { label: "PROJECTS", value: `${projects.length}+` },
                { label: "YEARS", value: "2+" },
                { label: "COMMITS", value: "500+" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center pixel-border p-2 bg-accent/20">
                  <div className="font-mono text-lg font-bold text-primary">{value}</div>
                  <div className="font-mono text-[9px] opacity-50">{label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex-1 sm:min-w-[9rem]">
                <button className="w-full pixel-border font-mono text-sm py-2 px-4 bg-primary text-primary-foreground border-current hover:bg-primary/80 transition-colors whitespace-nowrap">
                  VIEW_WORK.EXE ▶
                </button>
              </motion.a>
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 sm:min-w-[9rem]"
              >
                <button className="w-full pixel-border font-mono text-sm py-2 px-4 border-current bg-transparent hover:bg-accent/40 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                  <Download className="h-4 w-4" /> GET_RESUME.PDF
                </button>
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex-1 sm:min-w-[9rem]">
                <Link href="/contact">
                  <button className="w-full pixel-border font-mono text-sm py-2 px-4 border-current bg-transparent hover:bg-accent/40 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                    <Mail className="h-4 w-4" /> CONTACT.SH
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Scroll hint */}
            <div className="flex justify-end mt-2">
              <span className={`font-mono text-xs opacity-30 flex items-center gap-1 ${showCursor ? "opacity-30" : "opacity-10"} transition-opacity`}>
                scroll <ChevronDown className="h-3 w-3" />
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ContributionStrip
            weeks={contributions.weeks}
            loading={contributions.loading}
            error={contributions.error}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
