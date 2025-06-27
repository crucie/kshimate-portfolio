"use client"

import { redirect } from "next/navigation"

export default function HomePage() {
  // Server-side redirect - this happens before any rendering
  redirect("/about")
}
