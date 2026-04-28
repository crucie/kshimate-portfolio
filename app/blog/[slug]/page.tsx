import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

interface PostMeta {
  title: string
  date: string
  readTime: string
  tags: string[]
  description: string
}

async function getPost(slug: string): Promise<{ meta: PostMeta; content: string } | null> {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    meta: {
      title: data.title ?? slug,
      date: data.date ?? "",
      readTime: data.readTime ?? "? min",
      tags: data.tags ?? [],
      description: data.description ?? "",
    },
    content,
  }
}

// Lightweight markdown-to-HTML renderer
function renderMarkdown(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="font-mono text-base font-bold mt-6 mb-2 text-primary">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-mono text-lg font-bold mt-8 mb-3 border-b border-current/30 pb-1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-mono text-2xl font-bold mt-4 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-accent/40 font-mono text-xs rounded-none border border-current/20">$1</code>')
    // Code blocks (crude but works)
    .replace(/```[\w]*\n([\s\S]*?)```/gm, (_, code) =>
      `<pre class="my-4 p-4 pixel-border bg-accent/20 font-mono text-xs overflow-x-auto whitespace-pre"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    )
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-current/30 my-6" />')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary pl-4 font-mono text-sm opacity-80 italic my-3">$1</blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="font-mono text-sm flex items-start gap-2 mb-1"><span class="text-primary shrink-0">▶</span><span>$1</span></li>')
    // Line breaks → paragraphs
    .replace(/\n{2,}/g, '</p><p class="font-mono text-sm leading-relaxed mb-3">')
    // Wrap in initial paragraph
    .replace(/^/, '<p class="font-mono text-sm leading-relaxed mb-3">')
    .replace(/$/, '</p>')
    // Wrap li in ul
    .replace(/(<li[^>]*>[^<]*(?:<[^/][^>]*>[^<]*<\/[^>]*>[^<]*)*<\/li>(?:\s*<li[^>]*>[^<]*(?:<[^/][^>]*>[^<]*<\/[^>]*>[^<]*)*<\/li>)*)/g, '<ul class="list-none my-3 space-y-1 pl-2">$1</ul>')
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const { meta, content } = post

  return (
    <div className="max-w-3xl mx-auto slide-in">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="outline" className="pixel-border font-mono border-current hover:bg-accent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK_TO_BLOG.EXE
          </Button>
        </Link>
      </div>

      {/* Post card */}
      <div className="pixel-border bg-card text-card-foreground border-current">
        {/* Header */}
        <div className="border-b border-current/30 px-6 py-5">
          <h1 className="font-mono text-2xl md:text-3xl font-bold mb-3">{meta.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs opacity-70">
              <Calendar className="h-3 w-3" />
              {meta.date ? new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs opacity-70">
              <Clock className="h-3 w-3" />
              {meta.readTime}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono pixel-border bg-accent text-accent-foreground border-current flex items-center gap-1"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="px-6 py-6 terminal-log-viewer"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />

        {/* Footer */}
        <div className="border-t border-current/30 px-6 py-4 font-mono text-xs opacity-40">
          <span>// END_OF_FILE — </span>
          <Link href="/blog" className="hover:opacity-80 underline">
            READ_MORE.EXE
          </Link>
        </div>
      </div>
    </div>
  )
}
