"use client"

import { useEffect, useState } from "react"
import { countContributions, loadContributions, type ContribDay } from "@/lib/contributions"

export function useContributions(username: string) {
  const [weeks, setWeeks] = useState<ContribDay[][]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    loadContributions(username)
      .then((built) => {
        if (cancelled) return
        setWeeks(built)
        setTotal(countContributions(built))
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return { weeks, total, loading, error }
}
