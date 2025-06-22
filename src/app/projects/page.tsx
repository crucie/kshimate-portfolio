"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, ExternalLink, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectsPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const projects = [
    {
      id: "pixel-game",
      title: "PIXEL_GAME.EXE",
      description: "Retro 2D game engine with pixel-perfect collision detection",
      tech: ["TypeScript", "Canvas", "WebGL"],
      github: "#",
      demo: "#",
      ascii: ["████████", "█      █", "█  ██  █", "█      █", "████████"],
    },
    {
      id: "chiptune-player",
      title: "CHIPTUNE_PLAYER.EXE",
      description: "8-bit music player with real-time waveform visualization",
      tech: ["React", "Web Audio", "CSS"],
      github: "#",
      demo: "#",
      ascii: ["♪ ♫ ♪ ♫", "████████", "█▓▓▓▓▓���█", "████████", "♫ ♪ ♫ ♪"],
    },
    {
      id: "retro-dash",
      title: "RETRO_DASH.EXE",
      description: "Pixel-perfect admin dashboard with terminal interface",
      tech: ["Next.js", "Tailwind", "Framer"],
      github: "#",
      demo: "#",
      ascii: ["┌──────┐", "│ DASH │", "├──────┤", "│ DATA │", "└──────┘"],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">📂 PROJECTS.DIR</h2>

      {/* Mobile Project Carousel */}
      <div className="md:hidden mb-8">
        <div className="relative">
          <Card className="pixel-border bg-card text-card-foreground border-current">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-lg">{projects[currentProjectIndex].title}</CardTitle>
                <div className="text-xs font-mono opacity-60">
                  {currentProjectIndex + 1}/{projects.length}
                </div>
              </div>
              <CardDescription className="font-mono text-muted-foreground">
                {projects[currentProjectIndex].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ascii-art mb-4 text-center font-mono text-xs">
                {projects[currentProjectIndex].ascii.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {projects[currentProjectIndex].tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform bg-primary text-primary-foreground border-current"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${projects[currentProjectIndex].id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="pixel-border font-mono flex-1 touch-target border-current hover:bg-accent mb-2"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  DETAILS
                </Button>
              </Link>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="pixel-border font-mono flex-1 touch-target border-current hover:bg-accent"
                >
                  <Github className="h-4 w-4 mr-1" />
                  CODE
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="pixel-border font-mono flex-1 touch-target border-current hover:bg-accent"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  DEMO
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}
              variant="outline"
              size="sm"
              className="pixel-border touch-target border-current hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentProjectIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}
              variant="outline"
              size="sm"
              className="pixel-border touch-target border-current hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="pixel-border transition-all duration-300 hover:scale-105 hover:rotate-1 bg-card text-card-foreground border-current"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardHeader>
              <CardTitle className="font-mono text-lg">{project.title}</CardTitle>
              <CardDescription className="font-mono text-muted-foreground">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ascii-art mb-4 text-center font-mono text-xs">
                {project.ascii.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform bg-primary text-primary-foreground border-current"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="pixel-border font-mono border-current hover:bg-accent w-full mb-2"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  VIEW_DETAILS.EXE
                </Button>
              </Link>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="pixel-border font-mono border-current hover:bg-accent">
                  <Github className="h-4 w-4 mr-1" />
                  CODE
                </Button>
                <Button variant="outline" size="sm" className="pixel-border font-mono border-current hover:bg-accent">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  DEMO
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
