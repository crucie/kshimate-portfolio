import Link from "next/link"
import { FileText, Calendar, Clock, Tag } from "lucide-react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
}

async function getPosts(): Promise<PostMeta[]> {
  const blogDir = path.join(process.cwd(), "content", "blog")
  if (!fs.existsSync(blogDir)) return []
  return fs.readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(blogDir, file), "utf-8"))
      return {
        slug: file.replace(".md", ""),
        title: data.title ?? file.replace(".md", ""),
        description: data.description ?? "",
        date: data.date ?? "",
        readTime: data.readTime ?? "? min",
        tags: data.tags ?? [],
      }
    })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <div className="flex items-center justify-center gap-3 mb-2">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wider">BLOG.DIR</h2>
      </div>
      <p className="font-mono text-sm text-center opacity-50 mb-10">// dev logs, design notes &amp; random thoughts</p>

      <div className="grid gap-6">
        {posts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div
              className="pixel-border bg-card text-card-foreground border-current component-grid dark:dark light hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="px-6 py-4 border-b border-current/30 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="font-mono text-lg font-bold">{post.title}</div>
                  <div className="font-mono text-sm opacity-60 mt-1">{post.description}</div>
                </div>
                <div className="flex flex-col gap-1 md:items-end shrink-0">
                  <div className="flex items-center gap-2 font-mono text-xs opacity-70">
                    <Calendar className="h-3 w-3" />
                    {post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs opacity-70">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs font-mono pixel-border bg-accent text-accent-foreground border-current flex items-center gap-1">
                    <Tag className="h-2.5 w-2.5" />{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        <div className="pixel-border border-dashed border-current opacity-40 px-6 py-4 font-mono text-sm text-center">
          <p>// WRITE_NEW_POST.MD →</p>
          <p className="text-xs mt-1 opacity-60">Drop a .md file in /content/blog/ with proper frontmatter</p>
        </div>
      </div>
    </div>
  )
}
