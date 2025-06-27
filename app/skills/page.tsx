"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function SkillsPage() {
  const skills = [
  // Frontend
  "REACT.JSX",
  "REACT-NATIVE",
  "TYPESCRIPT.TS",
  "HTML5",
  "NEXT.JS",
  "TAILWIND.CSS",

  // Backend
  "NODE.JS",
  "EXPRESS.JS",
  "MONGODB.DB",
  "POSTGRESQL.SQL",
  "MONGOOSE.ODM",
  "REDIS.CACHE",
  "GRAPHQL.API",

  // DevOps
  "GIT.WORKFLOW",
  "DOCKER.CONTAINER",
  "CI/CD.PIPELINE",
  "AWS.CLOUD",
  "KUBERNETES.K8S",
  
  // UI/UX Design
  "FIGMA.DESIGN",
  "DESIGN.SYSTEMS",
  
  // Animation & Motion
  "FRAMER.MOTION",
  "GSAP.ANIMATION",
  "THREE.JS",
  "SVG.ANIMATION",
  "ADOBE.SUITE",
  
  // Game Development
  "UNITY.C#",
  "GAMEDEV.LOGIC",
  "BLENDER.3D",
  "WEBGL.3D",
  
  
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
