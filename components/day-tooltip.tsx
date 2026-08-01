"use client"

import { describeDay, type ContribDay } from "@/lib/contributions"

/** Positioned by the caller against a grid marked `relative`. */
export function DayTooltip({ day, x }: { day: ContribDay; x: number }) {
  return (
    <div
      className="absolute bottom-full mb-2 z-30 pointer-events-none pixel-border bg-card text-card-foreground border-current px-2 py-1 font-mono text-[10px] whitespace-nowrap"
      style={{ left: x, transform: "translateX(-50%)" }}
    >
      {describeDay(day)}
    </div>
  )
}
