"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-green-400">
          <div className="text-center max-w-md p-8">
            <div className="ascii-art font-mono text-sm mb-4">
              <div>{"    ╔══════════════╗"}</div>
              <div>{"    ║ FATAL ERROR  ║"}</div>
              <div>{"    ║ SYSTEM HALT  ║"}</div>
              <div>{"    ╚══════════════╝"}</div>
            </div>
            <h2 className="font-mono text-xl mb-4">CRITICAL_SYSTEM_FAILURE.EXE</h2>
            <p className="font-mono text-sm mb-6">The system has encountered a fatal error and must restart.</p>
            <button
              onClick={reset}
              className="px-4 py-2 font-mono text-sm border-2 border-green-400 bg-green-400 text-gray-900 hover:bg-green-300 transition-colors"
            >
              EMERGENCY_RESTART.EXE
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
