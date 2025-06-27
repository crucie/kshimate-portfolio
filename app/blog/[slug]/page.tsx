import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params

  // Mock blog post data - in real app, fetch from CMS/database
  const blogPosts: Record<string, any> = {
    "building-retro-ui": {
      title: "BUILDING_RETRO_UI.MD",
      date: "2024-01-15",
      readTime: "8 min",
      tags: ["CSS", "Design", "Retro"],
      content: `
# Building Retro UI Components

Creating pixel-perfect retro interfaces requires attention to detail and understanding of classic design principles.

## Key Principles

\`\`\`css
.pixel-border {
  border: 2px solid currentColor;
  image-rendering: pixelated;
  font-family: monospace;
}
\`\`\`

## Color Schemes
- **Green on Black**: Classic terminal aesthetic
- **Amber on Black**: Vintage monitor feel  
- **White on Blue**: Windows 95 nostalgia

## Typography
Always use monospace fonts for authentic retro feel:
- Courier New
- Monaco  
- Consolas

## Resources
- [CSS Pixel Art Tutorial](https://example.com)
- [Retro Color Palettes](https://example.com)
      `,
    },
    "nextjs-performance": {
      title: "NEXTJS_OPTIMIZATION.MD",
      date: "2024-01-10",
      readTime: "12 min",
      tags: ["Next.js", "Performance", "React"],
      content: `
# Next.js Performance Optimization

Advanced techniques to make your Next.js applications lightning fast.

## Image Optimization

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
  placeholder="blur"
/>
\`\`\`

## Bundle Analysis
Use webpack-bundle-analyzer to identify large dependencies:

\`\`\`bash
npm install --save-dev @next/bundle-analyzer
\`\`\`

## Code Splitting
Implement dynamic imports for better performance:

\`\`\`jsx
const DynamicComponent = dynamic(() => import('./Component'))
\`\`\`
      `,
    },
    "pixel-art-css": {
      title: "PIXEL_ART_CSS.MD",
      date: "2024-01-05",
      readTime: "6 min",
      tags: ["CSS", "Animation", "Art"],
      content: `
# Creating Pixel Art with CSS

Learn how to create stunning pixel art using only CSS.

## Box Shadow Technique

\`\`\`css
.pixel-art {
  width: 1px;
  height: 1px;
  box-shadow: 
    0 0 0 1px red,
    1px 0 0 1px blue,
    0 1px 0 1px green;
}
\`\`\`

## Grid Method
Use CSS Grid for more complex pixel art:

\`\`\`css
.pixel-grid {
  display: grid;
  grid-template-columns: repeat(8, 10px);
  grid-template-rows: repeat(8, 10px);
}
\`\`\`
      `,
    },
    "typescript-tips": {
      title: "TYPESCRIPT_TIPS.MD",
      date: "2023-12-28",
      readTime: "10 min",
      tags: ["TypeScript", "JavaScript", "Tips"],
      content: `
# Advanced TypeScript Tips

Improve your TypeScript skills with these advanced patterns.

## Utility Types

\`\`\`typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Make all properties optional
type PartialUser = Partial<User>

// Make all properties required
type RequiredUser = Required<User>
\`\`\`

## Conditional Types

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T }
\`\`\`

## Template Literal Types

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`
type ButtonEvent = EventName<'click'> // 'onClick'
\`\`\`
      `,
    },
  }

  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-mono mb-4">404.ERROR</h1>
        <p className="font-mono mb-8">Blog post not found</p>
        <Link href="/blog">
          <Button className="pixel-border font-mono">BACK_TO_BLOG.EXE</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto slide-in">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="outline" className="pixel-border font-mono border-current hover:bg-accent mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK_TO_BLOG.EXE
          </Button>
        </Link>
      </div>

      <Card className="pixel-border bg-card text-card-foreground border-current">
        <CardHeader>
          <CardTitle className="font-mono text-2xl md:text-3xl mb-4">{post.title}</CardTitle>
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
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-mono pixel-border bg-accent text-accent-foreground border-current flex items-center gap-1"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none font-mono">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{post.content}</pre>
          </div>

          <div className="mt-8 pt-8 border-t border-current">
            <h3 className="font-mono text-lg mb-4">📚 RELATED_RESOURCES.JSON</h3>
            <div className="grid gap-2">
              <a href="#" className="flex items-center gap-2 font-mono text-sm hover:scale-105 transition-transform">
                <ExternalLink className="h-4 w-4" />
                Official Documentation
              </a>
              <a href="#" className="flex items-center gap-2 font-mono text-sm hover:scale-105 transition-transform">
                <ExternalLink className="h-4 w-4" />
                GitHub Repository
              </a>
              <a href="#" className="flex items-center gap-2 font-mono text-sm hover:scale-105 transition-transform">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
