import Link from "next/link"
import { Calendar, Clock, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "building-retro-ui",
      title: "BUILDING_RETRO_UI.MD",
      description: "How to create pixel-perfect retro interfaces with modern CSS",
      date: "2024-01-15",
      readTime: "8 min",
      tags: ["CSS", "Design", "Retro"],
      ascii: ["████████", "█ CSS  █", "█ GRID █", "█ FLEX █", "████████"],
    },
    {
      slug: "nextjs-performance",
      title: "NEXTJS_OPTIMIZATION.MD",
      description: "Advanced techniques for optimizing Next.js applications",
      date: "2024-01-10",
      readTime: "12 min",
      tags: ["Next.js", "Performance", "React"],
      ascii: ["⚡⚡⚡⚡⚡⚡", "█ NEXT █", "█ FAST █", "█ PERF █", "⚡⚡⚡⚡⚡⚡"],
    },
    {
      slug: "pixel-art-css",
      title: "PIXEL_ART_CSS.MD",
      description: "Creating pixel art and animations using pure CSS",
      date: "2024-01-05",
      readTime: "6 min",
      tags: ["CSS", "Animation", "Art"],
      ascii: ["▓▓▓▓▓▓▓▓", "▓ ART  ▓", "▓ PIXEL▓", "▓ CSS  ▓", "▓▓▓▓▓▓▓▓"],
    },
    {
      slug: "typescript-tips",
      title: "TYPESCRIPT_TIPS.MD",
      description: "Advanced TypeScript patterns for better code quality",
      date: "2023-12-28",
      readTime: "10 min",
      tags: ["TypeScript", "JavaScript", "Tips"],
      ascii: ["┌──────┐", "│ TS   │", "│ TIPS │", "│ CODE │", "└──────┘"],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center tracking-wider">📝 BLOG.DIR</h2>

      <div className="grid gap-6">
        {blogPosts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card
              className="pixel-border transition-all duration-300 hover:scale-105 hover:rotate-1 bg-card text-card-foreground border-current cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="font-mono text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription className="font-mono text-muted-foreground">{post.description}</CardDescription>
                  </div>
                  <div className="ascii-art font-mono text-xs text-center md:text-right">
                    {post.ascii.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs font-mono pixel-border hover:scale-105 transition-transform bg-accent text-accent-foreground border-current flex items-center gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
