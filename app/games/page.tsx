"use client"

import { motion } from "framer-motion"
import { Gamepad2, Clock, Play } from "lucide-react"

type GameStatus = "LIVE" | "IN_DEV" | "CONCEPT"
const statusClass: Record<GameStatus, string> = {
  LIVE: "badge-live",
  IN_DEV: "badge-dev",
  CONCEPT: "badge-wip",
}

const games = [
  {
    id: "pixel-dungeon",
    title: "PIXEL_DUNGEON.EXE",
    platform: "Unity / PC",
    description: "A top-down 2D dungeon crawler with procedurally generated levels and a retro pixel art style.",
    preview: [
      "┌────────────────┐",
      "│  ██  ████  ██  │",
      "│  ██  BOSS  ██  │",
      "│  ░░░░░░░░░░░░  │",
      "│  ░ ▶ PLAYER ░  │",
      "│  ░░░░░░░░░░░░  │",
      "└────────────────┘",
    ],
    status: "IN_DEV" as GameStatus,
    playLink: null,
  },
  {
    id: "space-shooter",
    title: "STAR_SHOOTER.EXE",
    platform: "Unity / Web",
    description: "A classic arcade space shooter. Dodge asteroids, collect power-ups, and beat your high score.",
    preview: [
      "┌────────────────┐",
      "│  ★   *  ★   *  │",
      "│    ✦     ✦     │",
      "│   [ENEMY] ●    │",
      "│      ▲ ▼       │",
      "│    [PLAYER]    │",
      "└────────────────┘",
    ],
    status: "IN_DEV" as GameStatus,
    playLink: null,
  },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }
const cardVariant = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export default function GamesPage() {
  return (
    <motion.div className="max-w-5xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <Gamepad2 className="h-6 w-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">ARCADE.EXE</h2>
      </div>
      <p className="font-mono text-sm text-center opacity-50 mb-10">// indie games crafted in Unity — INSERT_COIN to play</p>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={container} initial="hidden" animate="show">
        {games.map((game) => (
          <motion.div key={game.id} variants={cardVariant} whileHover={{ scale: 1.02 }}
            className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light flex flex-col">
            <div className="border-b border-current/30 px-5 py-3 flex items-start justify-between gap-2">
              <div>
                <div className="font-mono text-base font-bold">{game.title}</div>
                <div className="font-mono text-xs opacity-60 mt-0.5">// {game.platform}</div>
              </div>
              <span className={`px-2 py-0.5 font-mono text-xs pixel-border shrink-0 ${statusClass[game.status]}`}>
                {game.status.replace("_", " ")}
              </span>
            </div>
            <div className="px-5 py-4 border-b border-current/30">
              <div className="ascii-art font-mono text-xs text-center opacity-80">
                {game.preview.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            </div>
            <div className="px-5 py-4 flex-1">
              <p className="font-mono text-sm opacity-80">{game.description}</p>
            </div>
            <div className="px-5 pb-5">
              {game.playLink ? (
                <a href={game.playLink} target="_blank" rel="noopener noreferrer">
                  <button className="w-full pixel-border font-mono text-sm py-2 bg-primary text-primary-foreground border-current hover:bg-primary/80 transition-colors flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" /> PLAY_NOW.EXE
                  </button>
                </a>
              ) : (
                <button disabled className="w-full pixel-border font-mono text-sm py-2 bg-accent/20 border-current opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" /> IN_DEVELOPMENT...
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-center mt-10 font-mono text-xs opacity-40" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.8 }}>
        <p>// More games being added. Check back soon!</p>
        <p className="mt-1">PRESS_START_TO_CONTINUE ▶</p>
      </motion.div>
    </motion.div>
  )
}
