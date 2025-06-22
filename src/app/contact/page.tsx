import { Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto text-center slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 tracking-wider">📡 CONTACT.SH</h2>
      <Card className="pixel-border hover:scale-105 transition-transform duration-300 bg-card text-card-foreground border-current component-grid dark:dark light">
        <CardContent className="p-8">
          <div className="ascii-art mb-8 font-mono text-sm">
            <div>{"    ╔══════════════╗"}</div>
            <div>{"    ║ READY TO     ║"}</div>
            <div>{"    ║ COLLABORATE? ║"}</div>
            <div>{"    ╚══════════════╝"}</div>
          </div>
          <p className="font-mono text-lg mb-8 typing-animation">{"> Let's build something awesome together!"}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="pixel-border font-mono hover:scale-110 transition-transform touch-target bg-primary text-primary-foreground border-current hover:bg-primary/90 component-grid dark:dark light">
              <Mail className="h-4 w-4 mr-2" />
              EMAIL.SEND()
            </Button>
            <Button
              variant="outline"
              className="pixel-border font-mono hover:scale-110 transition-transform touch-target border-current hover:bg-accent component-grid dark:dark light"
            >
              <Github className="h-4 w-4 mr-2" />
              GITHUB.VISIT()
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
