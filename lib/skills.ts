import {
  Atom,
  Blend,
  Blocks,
  Box,
  Boxes,
  Braces,
  Brush,
  Cloud,
  Component,
  Container,
  Cpu,
  Database,
  FileCode2,
  Figma,
  Film,
  Framer,
  Gamepad2,
  Gem,
  GitBranch,
  Github,
  Grid2x2,
  HardHat,
  Hash,
  Hexagon,
  Leaf,
  Monitor,
  Mountain,
  Network,
  PanelsTopLeft,
  PenTool,
  Palette,
  Pyramid,
  Rocket,
  Route,
  Server,
  Smartphone,
  Sparkles,
  Triangle,
  Type,
  Wallet,
  Waves,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type Tech = { name: string; icon: LucideIcon }

export type SkillCategory = {
  id: string
  label: string
  icon: LucideIcon
  blurb: string
  tech: Tech[]
}

/**
 * Every entry is a stroked lucide glyph rather than a brand logo, so the icons
 * inherit the active palette instead of dragging in fixed brand colours. The
 * pairings lean on shape: Tailwind's wind, Mongo's leaf, Avalanche's mountain.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "FRONTEND",
    icon: Monitor,
    blurb: "Interfaces, state and motion across the React ecosystem.",
    tech: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: PanelsTopLeft },
      { name: "TypeScript", icon: Type },
      { name: "JavaScript", icon: Braces },
      { name: "Tailwind CSS", icon: Wind },
      { name: "React Native", icon: Smartphone },
      { name: "Framer Motion", icon: Framer },
      { name: "Vite", icon: Zap },
    ],
  },
  {
    id: "backend",
    label: "BACKEND",
    icon: Server,
    blurb: "APIs, data models and the services behind the screens.",
    tech: [
      { name: "Node.js", icon: Hexagon },
      { name: "Express", icon: Route },
      { name: "MongoDB", icon: Leaf },
      { name: "PostgreSQL", icon: Database },
      { name: "Prisma", icon: Pyramid },
      { name: "GraphQL", icon: Network },
    ],
  },
  {
    id: "web3",
    label: "WEB3",
    icon: Blocks,
    blurb: "Contracts, chains and wallet flows for on-chain products.",
    tech: [
      { name: "Solidity", icon: FileCode2 },
      { name: "Hardhat", icon: HardHat },
      { name: "Ethereum", icon: Gem },
      { name: "Avalanche", icon: Mountain },
      { name: "Solana", icon: Waves },
      { name: "Wallet Flows", icon: Wallet },
    ],
  },
  {
    id: "design",
    label: "DESIGN",
    icon: Palette,
    blurb: "Layout, type and animation before a line of code.",
    tech: [
      { name: "Figma", icon: Figma },
      { name: "Design Systems", icon: Component },
      { name: "Adobe Suite", icon: Brush },
      { name: "GSAP", icon: Sparkles },
      { name: "SVG Animation", icon: PenTool },
      { name: "Pixel Art", icon: Grid2x2 },
    ],
  },
  {
    id: "deployment",
    label: "DEPLOYMENT",
    icon: Rocket,
    blurb: "Shipping, containers and the pipelines that keep it live.",
    tech: [
      { name: "Vercel", icon: Triangle },
      { name: "Docker", icon: Container },
      { name: "CI/CD", icon: Workflow },
      { name: "AWS", icon: Cloud },
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
    ],
  },
  {
    id: "gamedev",
    label: "GAME_DEV",
    icon: Gamepad2,
    blurb: "Real-time rendering, 3D and pixel-pushing side quests.",
    tech: [
      { name: "Unity", icon: Box },
      { name: "C#", icon: Hash },
      { name: "Blender", icon: Blend },
      { name: "Three.js", icon: Boxes },
      { name: "WebGL", icon: Cpu },
      { name: "Sprite Anim.", icon: Film },
    ],
  },
]

export const totalTech = skillCategories.reduce((sum, cat) => sum + cat.tech.length, 0)
