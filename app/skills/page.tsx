"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function SkillsPage() {
  const skills = [
    "JAVASCRIPT.JS",
    "TYPESCRIPT.TS",
    "REACT.JSX",
    "NEXT.JS",
    "NODE.JS",
    "PYTHON.PY",
    "CSS.SCSS",
    "TAILWIND.CSS",
    "GIT.VCS",
    "DOCKER.YML",
    "POSTGRESQL.DB",
    "MONGODB.JSON",
    "GRAPHQL.GQL",
    "AWS.CLOUD",
    "KUBERNETES.K8S",
    "REDIS.CACHE",
  ]

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">⚡ SKILLS.JSON</h2>
      <Card className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-3 text-center font-mono text-sm pixel-border transition-all duration-300 hover:scale-110 hover:-rotate-2 skill-item touch-target bg-accent/50 border-current component-grid dark:dark light"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
