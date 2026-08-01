"use client"

import { useRef, useState, type MouseEvent } from "react"
import type { ContribDay } from "@/lib/contributions"

/** Roughly half the widest tooltip, used to keep it inside the card at both ends. */
const EDGE_PAD = 105

/**
 * Tracks the hovered day and where its tooltip should sit, measured against the
 * grid so the label lands over the cell instead of the middle of the calendar.
 */
export function useDayTooltip() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<{ day: ContribDay; x: number } | null>(null)

  const show = (day: ContribDay) => (event: MouseEvent<HTMLElement>) => {
    const grid = gridRef.current
    if (!grid) return
    const cell = event.currentTarget.getBoundingClientRect()
    const box = grid.getBoundingClientRect()
    const pad = Math.min(EDGE_PAD, box.width / 2)
    const center = cell.left - box.left + cell.width / 2
    setHovered({ day, x: Math.min(Math.max(center, pad), box.width - pad) })
  }

  const hide = () => setHovered(null)

  return { gridRef, hovered, show, hide }
}
