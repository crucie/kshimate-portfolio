export interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ApiResponse {
  total: Record<string, number>
  contributions: ContribDay[]
}

export const WEEKS = 53

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function getLevelColor(level: number, isDark: boolean, isFireRed: boolean): string {
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
export function monthLabels(weeks: ContribDay[][]): string[] {
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

/** Tooltip text, e.g. "12 contributions on Jul 31, 2026". */
export function describeDay(day: ContribDay): string {
  const count =
    day.count === 0 ? "No contributions" : day.count === 1 ? "1 contribution" : `${day.count} contributions`
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  return `${count} on ${date}`
}

export function countContributions(weeks: ContribDay[][]): number {
  return weeks.flat().reduce((sum, day) => sum + day.count, 0)
}

export async function loadContributions(username: string): Promise<ContribDay[][]> {
  const end = new Date()
  const start = windowStart(end)
  const years = Array.from(new Set([start.getFullYear(), end.getFullYear()]))
  const days = (await Promise.all(years.map((y) => fetchYear(username, y)))).flat()
  return buildWeeks(new Map(days.map((d) => [d.date, d])), start, end)
}
