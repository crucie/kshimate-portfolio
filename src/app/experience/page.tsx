import { Calendar, MapPin, Trophy, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExperiencePage() {
  const experiences = [
    {
      title: "SENIOR_DEVELOPER.EXE",
      company: "TechCorp Industries",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Leading full-stack development team and architecting scalable solutions",
      achievements: [
        "> Increased application performance by 300%",
        "> Led team of 8 developers across 3 time zones",
        "> Implemented CI/CD pipeline reducing deployment time by 80%",
        "> Mentored 12+ junior developers",
      ],
      tech: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
      ascii: ["┌─────────┐", "│ SENIOR  │", "│ █████   │", "│ █████   │", "└─────────┘"],
    },
    {
      title: "FULLSTACK_DEV.EXE",
      company: "StartupLab",
      location: "Austin, TX",
      period: "2020 - 2022",
      description: "Built MVP products from concept to production deployment",
      achievements: [
        "> Developed 5 successful product launches",
        "> Reduced server costs by 60% through optimization",
        "> Built real-time chat system handling 10k+ users",
        "> Implemented automated testing suite",
      ],
      tech: ["Vue.js", "Python", "PostgreSQL", "Redis", "GCP"],
      ascii: ["┌─────────┐", "│ FULL    │", "│ STACK   │", "│ ███████ │", "└─────────┘"],
    },
    {
      title: "FRONTEND_DEV.EXE",
      company: "DesignStudio",
      location: "Remote",
      period: "2018 - 2020",
      description: "Created pixel-perfect responsive web applications",
      achievements: [
        "> Improved user engagement by 150%",
        "> Built component library used by 20+ projects",
        "> Optimized bundle size reducing load time by 40%",
        "> Collaborated with design team on 50+ projects",
      ],
      tech: ["JavaScript", "SCSS", "Webpack", "Jest", "Figma"],
      ascii: ["┌─────────┐", "│ FRONT   │", "│ END     │", "│ ████    │", "└─────────┘"],
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
                  <p className="font-mono mb-4 text-muted-foreground">{exp.description}</p>

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
