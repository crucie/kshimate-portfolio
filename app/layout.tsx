import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"

export const metadata: Metadata = {
  title: "kshimate.me",
  description: "a dev nd designer",
    generator: 'v0.0.1'
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
