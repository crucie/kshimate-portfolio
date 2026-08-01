"use client"

import { useThemeFlags } from "@/hooks/use-theme-flags"
import { countContributions, getLevelColor, type ContribDay } from "@/lib/contributions"

const STRIP_WEEKS = 26

/**
 * Recent slice of the contribution calendar. Data is passed in so the page can
 * fetch once and share it with whatever else needs the numbers.
 */
export function ContributionStrip({
  weeks,
  loading,
  error,
}: {
  weeks: ContribDay[][]
  loading: boolean
  error: boolean
}) {
  const { isDark, isFireRed } = useThemeFlags()
  const accentColor = isFireRed ? (isDark ? "#ff6600" : "#c01c00") : isDark ? "#00ff9f" : "#1a6b3a"

  const columns = weeks.slice(-STRIP_WEEKS)
  const status = error
    ? "activity unavailable"
    : loading
      ? "SYNCING..."
      : `${countContributions(columns)} contributions · last ${columns.length} weeks`

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
            gridTemplateColumns: `repeat(${columns.length || STRIP_WEEKS}, 1fr)`,
            gridTemplateRows: "repeat(7, 1fr)",
            gridAutoFlow: "column",
            gap: 2,
          }}
        >
          {/* Empty cells hold the row height while the calendar is in flight */}
          {columns.length
            ? columns.map((week) =>
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
            : Array.from({ length: STRIP_WEEKS * 7 }).map((_, i) => (
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
