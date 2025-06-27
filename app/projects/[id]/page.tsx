"use client"

import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectDetailProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = await params

  // Mock project data - in real app, fetch from CMS/database
  const projects: Record<string, any> = {
    "pixel-game": {
      title: "PIXEL_GAME.EXE",
      description: "A retro-style 2D game engine built with TypeScript and Canvas API",
      longDescription:
        "This project is a comprehensive 2D game engine designed for creating retro-style games. It features pixel-perfect collision detection, sprite animation systems, and a modular architecture that makes it easy to create classic arcade-style games.",
      status: "COMPLETED",
      startDate: "2023-06-01",
      endDate: "2023-12-15",
      team: "Solo Project",
      tech: ["TypeScript", "Canvas API", "WebGL", "Webpack", "Jest"],
      features: [
        "Pixel-perfect collision detection system",
        "Sprite animation and tilemap rendering",
        "Sound system with Web Audio API",
        "Input handling for keyboard and gamepad",
        "Level editor with JSON export",
        "Physics engine for platformer games",
      ],
      challenges: [
        "Optimizing canvas rendering for 60fps gameplay",
        "Implementing efficient collision detection algorithms",
        "Creating a flexible entity-component system",
        "Managing game state and scene transitions",
      ],
      codeSnippet: `
// Collision detection system
class CollisionSystem {
  checkCollision(entityA: Entity, entityB: Entity): boolean {
    const rectA = entityA.getBoundingRect()
    const rectB = entityB.getBoundingRect()
    
    return rectA.x < rectB.x + rectB.width &&
           rectA.x + rectA.width > rectB.x &&
           rectA.y < rectB.y + rectB.height &&
           rectA.y + rectA.height > rectB.y
  }
}
      `,
      github: "https://github.com/username/pixel-game",
      demo: "https://pixel-game-demo.vercel.app",
      ascii: ["████████", "█      █", "█  ██  █", "█      █", "████████"],
    },
    "chiptune-player": {
      title: "CHIPTUNE_PLAYER.EXE",
      description: "8-bit music player with real-time waveform visualization",
      longDescription:
        "A web-based chiptune music player that recreates the authentic 8-bit sound experience. Features real-time audio visualization, playlist management, and support for multiple chiptune formats.",
      status: "IN_PROGRESS",
      startDate: "2023-09-01",
      endDate: "2024-03-01",
      team: "2 Developers",
      tech: ["React", "Web Audio API", "CSS3", "TypeScript", "Vite"],
      features: [
        "Real-time waveform visualization",
        "Support for NSF, SID, and MOD formats",
        "Playlist management system",
        "Audio effects and filters",
        "Retro-styled UI with animations",
        "Keyboard shortcuts for playback control",
      ],
      challenges: [
        "Implementing accurate chiptune format parsing",
        "Creating smooth real-time visualizations",
        "Optimizing audio processing performance",
        "Designing intuitive retro interface",
      ],
      codeSnippet: `
// Audio visualization component
const WaveformVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const analyser = analyserRef.current
    
    if (!canvas || !ctx || !analyser) return
    
    const draw = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw waveform...
    }
    
    const animate = () => {
      draw()
      requestAnimationFrame(animate)
    }
    animate()
  }, [])
  
  return <canvas ref={canvasRef} className="pixel-border" />
}
      `,
      github: "https://github.com/username/chiptune-player",
      demo: "https://chiptune-player-demo.vercel.app",
      ascii: ["♪ ♫ ♪ ♫", "████████", "█▓▓▓▓▓▓█", "████████", "♫ ♪ ♫ ♪"],
    },
    "retro-dash": {
      title: "RETRO_DASH.EXE",
      description: "Pixel-perfect admin dashboard with terminal interface",
      longDescription:
        "A comprehensive admin dashboard built with a retro terminal aesthetic. Features real-time data visualization, user management, and a command-line interface for power users.",
      status: "COMPLETED",
      startDate: "2023-03-01",
      endDate: "2023-08-30",
      team: "3 Developers",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Chart.js", "Prisma"],
      features: [
        "Real-time dashboard with live data updates",
        "Terminal-style command interface",
        "User and role management system",
        "Data visualization with retro charts",
        "Dark/light theme switching",
        "Responsive design for all devices",
      ],
      challenges: [
        "Creating authentic terminal experience in web",
        "Implementing real-time data synchronization",
        "Designing accessible retro interface",
        "Optimizing performance with large datasets",
      ],
      codeSnippet: `
// Terminal command processor
class TerminalProcessor {
  private commands: Map<string, Function> = new Map()
  
  constructor() {
    this.registerCommand('help', this.showHelp)
    this.registerCommand('users', this.listUsers)
    this.registerCommand('stats', this.showStats)
  }
  
  processCommand(input: string): string {
    const [command, ...args] = input.trim().split(' ')
    const handler = this.commands.get(command)
    
    if (!handler) {
      return \`Command '\${command}' not found. Type 'help' for available commands.\`
    }
    
    return handler(args)
  }
}
      `,
      github: "https://github.com/username/retro-dash",
      demo: "https://retro-dash-demo.vercel.app",
      ascii: ["┌──────┐", "│ DASH │", "├──────┤", "│ DATA │", "└──────┘"],
    },
  }

  const project = projects[id]

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-mono mb-4">404.ERROR</h1>
        <p className="font-mono mb-8">Project not found</p>
        <Link href="/projects">
          <Button className="pixel-border font-mono">BACK_TO_PROJECTS.EXE</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto slide-in">
      <div className="mb-8">
        <Link href="/projects">
          <Button variant="outline" className="pixel-border font-mono border-current hover:bg-accent mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK_TO_PROJECTS.EXE
          </Button>
        </Link>
      </div>

      {/* Project Header */}
      <Card className="pixel-border bg-card text-card-foreground border-current mb-8">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <CardTitle className="font-mono text-2xl md:text-3xl mb-4">{project.title}</CardTitle>
              <p className="font-mono text-lg text-muted-foreground mb-4">{project.description}</p>
              <p className="font-mono text-sm leading-relaxed">{project.longDescription}</p>
            </div>
            <div className="ascii-art font-mono text-sm text-center lg:text-right">
              {project.ascii.map((line: string, i: number) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-sm">
              <CheckCircle className="h-4 w-4" />
              <span className="font-bold">STATUS:</span> {project.status}
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <Calendar className="h-4 w-4" />
              <span className="font-bold">DURATION:</span> {new Date(project.startDate).getFullYear()} -{" "}
              {new Date(project.endDate).getFullYear()}
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <Users className="h-4 w-4" />
              <span className="font-bold">TEAM:</span> {project.team}
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <Zap className="h-4 w-4" />
              <span className="font-bold">TECH:</span> {project.tech.length} Technologies
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="pixel-border font-mono bg-primary text-primary-foreground border-current hover:bg-primary/90">
              <Github className="h-4 w-4 mr-2" />
              VIEW_SOURCE.EXE
            </Button>
            <Button variant="outline" className="pixel-border font-mono border-current hover:bg-accent">
              <ExternalLink className="h-4 w-4 mr-2" />
              LIVE_DEMO.EXE
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Features */}
        <Card className="pixel-border bg-card text-card-foreground border-current">
          <CardHeader>
            <CardTitle className="font-mono text-xl">🚀 FEATURES.JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="font-mono text-sm flex items-start gap-2 typing-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-green-400 mt-1">▶</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="pixel-border bg-card text-card-foreground border-current">
          <CardHeader>
            <CardTitle className="font-mono text-xl">⚡ TECH_STACK.JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {project.tech.map((tech: string, index: number) => (
                <div
                  key={index}
                  className="p-3 text-center font-mono text-sm pixel-border transition-all duration-300 hover:scale-110 skill-item bg-accent/50 border-current"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card className="pixel-border bg-card text-card-foreground border-current">
          <CardHeader>
            <CardTitle className="font-mono text-xl">🎯 CHALLENGES.LOG</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.challenges.map((challenge: string, index: number) => (
                <li
                  key={index}
                  className="font-mono text-sm flex items-start gap-2 typing-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-yellow-400 mt-1">⚠</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Code Snippet */}
        <Card className="pixel-border bg-card text-card-foreground border-current">
          <CardHeader>
            <CardTitle className="font-mono text-xl">💻 CODE_SAMPLE.TS</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-mono text-xs bg-accent/20 p-4 rounded border overflow-x-auto">
              <code>{project.codeSnippet}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
