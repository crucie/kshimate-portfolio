import { Calendar, MapPin, Trophy, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExperiencePage() {
  const experiences = [
    {
      title: "DESIGN_LEAD.EXE",
      company: "MATRIX INNOVATION",
      location: "LUCKNOW, UP",
      period: "Dec-2023 - Jan-2025",
      description: "Leading Design Team, and implementing the Front-End Development goals team and architecting scalable solutions and design systems.",
      achievements: [
        "> Designed and implemented 3+ scalable design systems",
        "> Led team of 3 designers to create 10+ design systems",
        "> Implemented design system used across 10+ projects",
        "> Reduced design inconsistencies by 80%",
      ],
      tech: ["Figma", "React-Native", "React", "Node.js", "Tailwind CSS", ],
      ascii: ["┌─────────┐", "│ SENIOR  │", "│ █████   │", "│ █████   │", "└─────────┘"],
    },
    {
      title: "INDIE_GAMEDEV.EXE",
      company: "~PERSONAL PROJECTS",
      location: "REMOTE",
      period: "March-2021 - Jan-2022",
      description: "Built MVP products from concept to production deployment",
      achievements: [
        "> Developed 3+ indie games using Unity and C#",
        "> Made 2D games with pixel art and animations using Unity",
      ],
      tech: ["Unity", "C#", "Blender", "Figma", "Adobe Photoshop", "Adobe Illustrator"],
      ascii: ["┌─────────┐", "│ GAME    │", "│ DEV     │", "│ ███████ │", "└─────────┘"],
    },
    {
      title: "CHEIF_VIDEO_ANIMATOR.EXE",
      company: "INTEGRATED_IDEAS",
      location: "REMOTE",
        period: "Jul-2019 - October-2019",
      description: "Created motion graphics and animations for various digital marketing campaigns, enhancing brand visibility and engagement.",
      achievements: [
        "> Produced over 5+ high-quality animations",
        "> created ADs that increased engagement by 40%",
        "> Collaborated with marketing team to create viral content",
        "> Streamlined animation workflow, reducing production time by 30%",
      ],
      tech: ["Adobe After Effects", "Adobe Premiere Pro", "Adobe Illustrator", "Figma", "Adobe Photoshop", ],
      ascii: ["┌────────────┐", "│ ANIMATOR   │", "│            │", "│ ████       │", "└────────────┘"],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">💼 EXPERIENCE.LOG</h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="pixel-border transition-all duration-300 hover:scale-105 bg-card text-card-foreground border-current"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="font-mono text-xl mb-2">{exp.title}</CardTitle>
                  <CardDescription className="font-mono text-lg font-semibold text-foreground">
                    {exp.company}
                  </CardDescription>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <Calendar className="h-4 w-4" />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="font-mono mb-4 text-foreground">{exp.description}</div>

                  <div className="mb-4">
                    <h4 className="font-mono text-sm font-bold mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      ACHIEVEMENTS.TXT
                    </h4>
                    <div className="terminal-text">
                      {exp.achievements.map((achievement, i) => (
                        <p
                          key={i}
                          className="typing-animation font-mono text-sm"
                          style={{ animationDelay: `${index * 0.5 + i * 0.2}s` }}
                        >
                          {achievement}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm font-bold mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      TECH_STACK.JSON
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform bg-primary text-primary-foreground border-current"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <div className="ascii-art font-mono text-xs text-center">
                    {exp.ascii.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
