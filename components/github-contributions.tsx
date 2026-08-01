"use client"

import { useEffect, useState } from "react"

interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ApiResponse {
  total: Record<string, number>
  contributions: ContribDay[]
}

const WEEKS = 53
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function getLevelColor(level: number, isDark: boolean, isFireRed: boolean): string {
  if (isFireRed) {
    const darkColors = ["#1a0800", "#4a1500", "#8b2a00", "#cc4400", "#ff6600"]
    const lightColors = ["#f0d8c0", "#f5b98a", "#e87c40", "#d44a10", "#b82000"]
    return isDark ? darkColors[level] : lightColors[level]
  }
  const darkColors = ["#0a1a0a", "#003d1a", "#00712d", "#00a843", "#00ff9f"]
  const lightColors = ["#e5e7eb", "#a8d5ba", "#5aad78", "#2d8b52", "#1a6b3a"]
  return isDark ? darkColors[level] : lightColors[level]
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

/** First Sunday of the window, so every column is a full Sun–Sat week. */
function windowStart(end: Date): Date {
  const start = new Date(end)
  start.setDate(start.getDate() - (WEEKS * 7 - 1))
  start.setDate(start.getDate() - start.getDay())
  return start
}

// The API's ?y=last window answers with an all-zero calendar for some
// accounts, so the year is reassembled from the explicit per-year endpoints.
async function fetchYear(username: string, year: number): Promise<ContribDay[]> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
  if (!res.ok) throw new Error(`contributions for ${year}: HTTP ${res.status}`)
  const data: ApiResponse = await res.json()
  return data.contributions ?? []
}

function buildWeeks(byDate: Map<string, ContribDay>, start: Date, end: Date): ContribDay[][] {
  const weeks: ContribDay[][] = []
  let week: ContribDay[] = []
  for (const cur = new Date(start); cur <= end; cur.setDate(cur.getDate() + 1)) {
    const key = dateKey(cur)
    week.push(byDate.get(key) ?? { date: key, count: 0, level: 0 })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length) weeks.push(week)
  return weeks
}

/**
 * A month name above the column where each month starts. The window opens
 * mid-month, so that first stub is skipped rather than crowding the next label.
 */
function monthLabels(weeks: ContribDay[][]): string[] {
  const labels = weeks.map(() => "")
  if (!weeks.length) return labels

  const monthOf = (week: ContribDay[]) => new Date(`${week[0].date}T00:00:00`).getMonth()
  let previous = monthOf(weeks[0])
  let lastLabelled = -2

  weeks.forEach((week, i) => {
    if (i === 0) return
    const month = monthOf(week)
    if (month === previous) return
    previous = month
    if (i - lastLabelled >= 2) {
      labels[i] = MONTHS[month]
      lastLabelled = i
    }
  })

  return labels
}

export function GithubContributions({ username = "crucie" }: { username?: string }) {
  const [weeks, setWeeks] = useState<ContribDay[][]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isFireRed, setIsFireRed] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<ContribDay | null>(null)

  useEffect(() => {
    const update = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
      setIsFireRed(document.documentElement.classList.contains("theme-fire-red"))
    }
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const end = new Date()
      const start = windowStart(end)
      const years = Array.from(new Set([start.getFullYear(), end.getFullYear()]))

      try {
        const days = (await Promise.all(years.map((y) => fetchYear(username, y)))).flat()
        if (cancelled) return
        const byDate = new Map(days.map((d) => [d.date, d]))
        const built = buildWeeks(byDate, start, end)
        setWeeks(built)
        setTotal(built.flat().reduce((sum, d) => sum + d.count, 0))
        setLoading(false)
      } catch {
        if (cancelled) return
        setError(true)
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [username])

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
