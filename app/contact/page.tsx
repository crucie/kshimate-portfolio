"use client"

import { motion } from "framer-motion"
import { Radio, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function ContactPage() {
  const [showCursor, setShowCursor] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 600)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <Radio className="h-6 w-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">TRANSMISSION.SH</h2>
      </div>
      <p className="font-mono text-sm opacity-50 mb-10">// open for collaboration, gigs &amp; cool ideas</p>

      <motion.div
        className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="p-8">
          <div className="ascii-art mb-8 font-mono text-sm opacity-80">
            <div>{"  ╔══════════════════╗"}</div>
            <div>{"  ║  SIGNAL_ACQUIRED  ║"}</div>
            <div>{"  ║  READY_TO_TX/RX   ║"}</div>
            <div>{"  ╚══════════════════╝"}</div>
          </div>

          <div className="terminal-text mb-8 text-left">
            <p className="font-mono text-sm typing-animation" style={{ animationDelay: "0.2s" }}>
              {"> Let's build something awesome together!"}
            </p>
            <p className="font-mono text-sm typing-animation" style={{ animationDelay: "0.8s" }}>
              {"> Mail me at work.amaymishra@gmail.com"}
            </p>
            <p className="font-mono text-sm typing-animation" style={{ animationDelay: "1.4s" }}>
              {"> Or ping me on GitHub"}
              <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="mailto:work.amaymishra@gmail.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <Button className="pixel-border font-mono bg-primary text-primary-foreground border-current hover:bg-primary/90 w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" /> EMAIL.SEND()
              </Button>
            </motion.a>
            <motion.a href="https://github.com/crucie" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <Button variant="outline" className="pixel-border font-mono border-current hover:bg-accent w-full sm:w-auto">
                <Github className="h-4 w-4 mr-2" /> GITHUB.VISIT()
              </Button>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
