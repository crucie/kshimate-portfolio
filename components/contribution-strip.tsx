"use client"

import { useThemeFlags } from "@/hooks/use-theme-flags"
import { getLevelColor, WEEKS, type ContribDay } from "@/lib/contributions"

/**
 * Bare contribution calendar for the hero: no axis labels, legend or tooltip,
 * so it stays a slim strip. Data is passed in so the page fetches once and
 * shares it with whatever else needs the numbers.
 */
export function ContributionStrip({
  weeks,
  total,
  loading,
  error,
}: {
  weeks: ContribDay[][]
  total: number
  loading: boolean
  error: boolean
}) {
  const { isDark, isFireRed } = useThemeFlags()
  const accentColor = isFireRed ? (isDark ? "#ff6600" : "#c01c00") : isDark ? "#00ff9f" : "#1a6b3a"

  const status = error ? (
    "activity unavailable"
  ) : loading ? (
    "SYNCING..."
  ) : (
    <>
      {total} contributions
      {/* Dropped on phones, where the header has no room for it */}
      <span className="hidden sm:inline"> · last 12 months</span>
    </>
  )

  return (
    <div className="mt-4 pixel-border bg-card text-card-foreground border-current component-grid">
      <div className="px-4 py-2 border-b border-current/30 flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold flex items-center gap-2">
          <span style={{ color: accentColor }}>◈</span> GIT_ACTIVITY.LOG
        </span>
        <span className="font-mono text-[10px] opacity-60 whitespace-nowrap">{status}</span>
      </div>

      <div className="px-4 py-3">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${weeks.length || WEEKS}, 1fr)`,
            gridTemplateRows: "repeat(7, 1fr)",
            gridAutoFlow: "column",
            gap: 2,
          }}
        >
          {/* Empty cells hold the row height while the calendar is in flight */}
          {weeks.length
            ? weeks.map((week) =>
                week.map((day) => (
                  <div
                    key={day.date}
                    className="rounded-none relative transition-transform duration-100 hover:scale-150 hover:z-10"
                    style={{
                      backgroundColor: getLevelColor(day.level, isDark, isFireRed),
                      aspectRatio: "1",
                    }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))
              )
            : Array.from({ length: WEEKS * 7 }).map((_, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: getLevelColor(0, isDark, isFireRed), aspectRatio: "1" }}
                />
              ))}
        </div>
      </div>
    </div>
  )
}
