"use client"

import { useEffect, useState, useRef } from "react"

interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ApiResponse {
  total: Record<string, number>
  contributions: ContribDay[]
}

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

export function GithubContributions({ username = "crucie" }: { username?: string }) {
  const [weeks, setWeeks] = useState<ContribDay[][]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isFireRed, setIsFireRed] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<ContribDay | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

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
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => r.json())
      .then((data: ApiResponse) => {
        const days = data.contributions.slice(-364)
        const grouped: ContribDay[][] = []
        for (let i = 0; i < days.length; i += 7) grouped.push(days.slice(i, i + 7))
        setWeeks(grouped)
        // Sum directly from data rather than relying on year key
        const sum = days.reduce((acc, d) => acc + d.count, 0)
        setTotal(sum)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [username])

  const accentColor = isFireRed ? (isDark ? "#ff6600" : "#c01c00") : (isDark ? "#00ff9f" : "#1a6b3a")

  return (
    <div className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light mb-8">
      <div className="border-b border-current/30 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-base font-bold">
          <span style={{ color: accentColor }}>◈</span>
          CONTRIBUTION_GRAPH.SVG
        </div>
        {!loading && !error && (
          <span className="font-mono text-xs opacity-60">{total} contributions in the last year</span>
        )}
      </div>

      <div className="px-5 py-4 overflow-x-auto">
        {loading && (
          <div className="font-mono text-xs opacity-50 py-8 text-center">
            FETCHING_DATA.EXE...
          </div>
        )}
        {error && (
          <div className="font-mono text-xs opacity-50 py-8 text-center text-red-400">
            ERR: Could not load contributions
          </div>
        )}
        {!loading && !error && (
          <div className="relative">
            {/* Day labels */}
            <div className="flex mb-1 ml-6">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                <div key={m} className="font-mono text-[9px] opacity-40 flex-1 min-w-[20px]">{m}</div>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {/* Row labels */}
              <div className="flex flex-col gap-[3px] mr-1 justify-around">
                {["S","M","T","W","T","F","S"].map((d, i) => (
                  <div key={i} className="font-mono text-[9px] opacity-30 h-[11px] leading-[11px]">{d}</div>
                ))}
              </div>

              {/* Contribution cells */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="contrib-cell rounded-none cursor-pointer"
                      style={{ backgroundColor: getLevelColor(day.level, isDark, isFireRed) }}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
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
              {[0,1,2,3,4].map((l) => (
                <div key={l} className="contrib-cell" style={{ backgroundColor: getLevelColor(l, isDark, isFireRed) }} />
              ))}
              <span className="font-mono text-[9px] opacity-40 ml-1">More</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
