import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"

export const metadata: Metadata = {
  title: "Dev Portfolio - Retro Style",
  description: "A pixel-perfect retro portfolio showcasing modern web development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
