import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light animate max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-mono text-2xl mb-4">BOOT_SEQUENCE.EXE</CardTitle>
          <div className="ascii-art font-mono text-sm mb-4">
            <div>{"    ╔══════════════╗"}</div>
            <div>{"    ║ SYSTEM READY ║"}</div>
            <div>{"    ║ SELECT MODE  ║"}</div>
            <div>{"    ╚══════════════╝"}</div>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="font-mono text-sm">Initialize portfolio system:</p>
          <div className="space-y-2">
            <Link href="/about" className="block">
              <Button className="w-full pixel-border font-mono bg-primary text-primary-foreground border-current hover:bg-primary/90">
                STANDARD_MODE.EXE
              </Button>
            </Link>
            <Link href="/projects" className="block">
              <Button variant="outline" className="w-full pixel-border font-mono border-current hover:bg-accent">
                PROJECT_MODE.EXE
              </Button>
            </Link>
            <Link href="/skills" className="block">
              <Button variant="outline" className="w-full pixel-border font-mono border-current hover:bg-accent">
                SKILLS_MODE.EXE
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
