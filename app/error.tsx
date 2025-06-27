"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-mono text-2xl mb-4 text-red-400">SYSTEM.ERROR</CardTitle>
          <div className="ascii-art font-mono text-sm mb-4">
            <div>{"    ╔══════════════╗"}</div>
            <div>{"    ║ CRITICAL     ║"}</div>
            <div>{"    ║ ERROR.EXE    ║"}</div>
            <div>{"    ╚══════════════╝"}</div>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="font-mono text-sm">A critical system error has occurred.</p>
          <div className="space-y-2">
            <Button
              onClick={reset}
              className="w-full pixel-border font-mono bg-primary text-primary-foreground border-current hover:bg-primary/90"
            >
              RESTART_SYSTEM.EXE
            </Button>
            <Button
              onClick={() => (window.location.href = "/about")}
              variant="outline"
              className="w-full pixel-border font-mono border-current hover:bg-accent"
            >
              SAFE_MODE.EXE
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
