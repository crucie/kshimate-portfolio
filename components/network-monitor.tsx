"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NetworkStats {
  downlink: number
  uplink: number
  rtt: number
  type: string
  effectiveType: string
  packetsSent: number
  packetsReceived: number
  online: boolean
}

export function NetworkMonitor({ darkMode }: { darkMode: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [stats, setStats] = useState<NetworkStats>({
    downlink: 0,
    uplink: 0,
    rtt: 0,
    type: "unknown",
    effectiveType: "unknown",
    packetsSent: 0,
    packetsReceived: 0,
    online: true,
  })

  const packetSentCounter = useRef(0)
  const packetReceivedCounter = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Function to update network stats
    const updateNetworkStats = () => {
      // Check if online
      const online = navigator.onLine

      // Get connection info if available
      const connection =
        (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

      // Simulate packet counts (since we can't actually track real packets)
      packetSentCounter.current += Math.floor(Math.random() * 5) + 1
      packetReceivedCounter.current += Math.floor(Math.random() * 8) + 2

      setStats({
        downlink: connection?.downlink || 0,
        uplink: connection?.uplink || 0,
        rtt: connection?.rtt || 0,
        type: connection?.type || "unknown",
        effectiveType: connection?.effectiveType || "unknown",
        packetsSent: packetSentCounter.current,
        packetsReceived: packetReceivedCounter.current,
        online,
      })
    }

    // Update immediately
    updateNetworkStats()

    // Set up interval for updates
    intervalRef.current = setInterval(updateNetworkStats, 2000)

    // Listen for online/offline events
    window.addEventListener("online", updateNetworkStats)
    window.addEventListener("offline", updateNetworkStats)

    // Clean up
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      window.removeEventListener("online", updateNetworkStats)
      window.removeEventListener("offline", updateNetworkStats)
    }
  }, [])

  return (
    <div className={`relative ${isExpanded ? "z-50" : ""}`}>
      <Button
        variant="outline"
        size="sm"
        className={`pixel-border flex items-center gap-1 h-8 ${
          darkMode
            ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
            : "border-gray-600 text-gray-900 hover:bg-gray-900 hover:text-white"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {stats.online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
        <span className="text-xs font-mono">{stats.downlink > 0 ? `${stats.downlink}Mbps` : "NET"}</span>
        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </Button>

      {isExpanded && (
        <div
          className={`absolute right-0 mt-1 w-48 p-3 pixel-border shadow-lg component-grid ${
            darkMode
              ? "bg-gray-800 border-green-400 text-green-400 dark"
              : "bg-white border-gray-600 text-gray-900 light"
          } animate`}
        >
          <div className="text-center mb-2">
            <h4 className="font-mono text-xs font-bold">NETWORK_STATS.LOG</h4>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className={stats.online ? "text-green-400" : "text-red-400"}>
                {stats.online ? "ONLINE" : "OFFLINE"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>DOWN:</span>
              <span>{stats.downlink > 0 ? `${stats.downlink} Mbps` : "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span>UP:</span>
              <span>{stats.uplink > 0 ? `${stats.uplink} Mbps` : "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span>LATENCY:</span>
              <span>{stats.rtt > 0 ? `${stats.rtt} ms` : "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span>TYPE:</span>
              <span>{stats.type !== "unknown" ? stats.type : "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span>QUALITY:</span>
              <span>{stats.effectiveType !== "unknown" ? stats.effectiveType : "N/A"}</span>
            </div>

            <div className="border-t border-current my-1 pt-1"></div>

            <div className="flex justify-between">
              <span>PACKETS TX:</span>
              <span>{stats.packetsSent}</span>
            </div>

            <div className="flex justify-between">
              <span>PACKETS RX:</span>
              <span>{stats.packetsReceived}</span>
            </div>

            <div className="flex justify-between">
              <span>PACKET RATIO:</span>
              <span>{(stats.packetsReceived / (stats.packetsSent || 1)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
