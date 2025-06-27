"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const [typewriterText, setTypewriterText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const fullText = "FULL_STACK_DEVELOPER.EXE"

  // Typewriter effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [fullText])

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  // build ready! [28/06/2025: 00:18:00 IST]
  return (
    <div className="max-w-4xl mx-auto slide-in">
      <div className="text-center mb-12">
        <div className="w-32 h-32 mx-auto mb-6 pixel-avatar bg-current">
          <div className="pixel-face"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4 tracking-wider">HELLO_INTERNET</h2>
        <div className="text-lg md:text-xl font-mono min-h-[2rem]">
          <span>{typewriterText}</span>
          <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
        </div>
      </div>

      <Card className="pixel-border hover:scale-105 transition-transform duration-300 bg-card text-card-foreground border-current component-grid dark:dark light">
        <CardHeader>
          <CardTitle className="font-mono text-xl flex items-center">
            <span className="mr-2">📁</span> ABOUT.EXE
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 font-mono">
          <div className="terminal-text">
            <p className="typing-animation" style={{ animationDelay: "0.5s" }}>
              {"> Passionate developer with 2+ years of experience"}
            </p>
            <p className="typing-animation" style={{ animationDelay: "1s" }}>
              {"> I love to learn new web technologies and frameworks, make games, animations, and more!"}
            </p>
            <p className="typing-animation" style={{ animationDelay: "1.5s" }}>
              {"> Love creating pixel-perfect interfaces and smooth UX"}
            </p>
            <p className="typing-animation" style={{ animationDelay: "2s" }}>
              {"> When not coding, creating pixel art and building indie games"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
