"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function ExperiencePage() {
  const router = useRouter()
  useEffect(() => { router.replace("/#experience") }, [router])
  return null
}
