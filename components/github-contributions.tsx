"use client"

import { useState } from "react"
import { useContributions } from "@/hooks/use-contributions"
import { useThemeFlags } from "@/hooks/use-theme-flags"
import { getLevelColor, monthLabels, type ContribDay } from "@/lib/contributions"

export function GithubContributions({ username = "crucie" }: { username?: string }) {
  const { weeks, total, loading, error } = useContributions(username)
  const { isDark, isFireRed } = useThemeFlags()
  const [hoveredDay, setHoveredDay] = useState<ContribDay | null>(null)

  const accentColor = isFireRed ? (isDark ? "#ff6600" : "#c01c00") : isDark ? "#00ff9f" : "#1a6b3a"
  const months = monthLabels(weeks)

  return (
    <div className="pixel-border bg-card text-card-foreground border-current mb-8">
      <div className="border-b border-current/30 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-base font-bold">
          <span style={{ color: accentColor }}>◈</span>
          CONTRIBUTION_GRAPH.SVG
        </div>
        {!loading && !error && (
          <span className="font-mono text-xs opacity-60">{total} contributions in the last year</span>
        )}
      </div>

      <div className="px-5 py-4">
        {loading && <div className="font-mono text-xs opacity-50 py-8 text-center">FETCHING_DATA.EXE...</div>}
        {error && (
          <div className="font-mono text-xs opacity-50 py-8 text-center text-red-400">
            ERR: Could not load contributions
          </div>
        )}
        {!loading && !error && (
          <div className="relative">
            <div className="flex">
              {/* Day-of-week labels, offset by the month row above the cells */}
              <div className="flex flex-col shrink-0 mr-1">
                <div className="font-mono text-[9px] mb-1 opacity-0 select-none">M</div>
                <div className="flex flex-col justify-around flex-1" style={{ gap: 2 }}>
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                      key={i}
                      className="font-mono text-[9px] opacity-30 flex items-center"
                      style={{ height: "var(--cell-size, 11px)" }}
                    >
                      {i % 2 === 1 ? d : ""}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {/* One label slot per column, so months sit above their own week */}
                <div
                  className="mb-1"
                  style={{ display: "grid", gridTemplateColumns: `repeat(${weeks.length}, 1fr)`, gap: 2 }}
                >
                  {months.map((m, i) => (
                    <div key={i} className="font-mono text-[9px] opacity-40 whitespace-nowrap">
                      {m}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
                    gridTemplateRows: "repeat(7, 1fr)",
                    gridAutoFlow: "column",
                    gap: 2,
                  }}
                >
                  {weeks.map((week) =>
                    week.map((day) => (
                      <div
                        key={day.date}
                        className="rounded-none cursor-pointer transition-transform duration-100 hover:scale-150 hover:z-10 relative"
                        style={{
                          backgroundColor: getLevelColor(day.level, isDark, isFireRed),
                          aspectRatio: "1",
                        }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Tooltip */}
            {hoveredDay && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-xs px-2 py-1 pixel-border bg-card border-current pointer-events-none whitespace-nowrap z-20">
                {hoveredDay.date}: {hoveredDay.count} contributions
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-1 mt-3 justify-end">
              <span className="font-mono text-[9px] opacity-40 mr-1">Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div
                  key={l}
                  className="w-[11px] h-[11px] rounded-none"
                  style={{ backgroundColor: getLevelColor(l, isDark, isFireRed) }}
                />
              ))}
              <span className="font-mono text-[9px] opacity-40 ml-1">More</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
