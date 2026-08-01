export type ProjectStatus = "LIVE" | "WIP" | "ARCHIVED"

export type ProjectLink = { label: string; url: string }

export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  url: string | null
  github: string
  status: ProjectStatus
  /** Screenshot source, when the page worth showing isn't the one `url` points at. */
  thumbUrl?: string
  /** Further deployments of the same project, listed under the main live link. */
  links?: ProjectLink[]
}

export const statusClass: Record<ProjectStatus, string> = {
  LIVE: "badge-live",
  WIP: "badge-wip",
  ARCHIVED: "badge-archived",
}

export const projects: Project[] = [
  {
    id: "clawx",
    title: "ClawX",
    description: "Agentic prediction market on Avalanche — autonomous agents create, trade & resolve markets 24/7.",
    tech: ["Next.js", "TypeScript", "Avalanche", "Tailwind"],
    url: "https://app.clawxlab.xyz",
    thumbUrl: "https://clawxlab.xyz",
    links: [
      { label: "LANDING", url: "https://clawxlab.xyz" },
      { label: "WAITLIST", url: "https://waitlist.clawxlab.xyz" },
    ],
    github: "https://github.com/ClawXLabs",
    status: "WIP",
  },
  {
    id: "krexon",
    title: "Krexon",
    description: "Swap loyalty points on Solana — hotel points, airline miles & retail credits in one place.",
    tech: ["Next.js", "Solana", "TypeScript", "Tailwind"],
    url: "https://krexon.kshimate.space",
    github: "https://github.com/crucie",
    status: "LIVE",
  },
  {
    id: "slambk",
    title: "SlamBK",
    description: "A modern slam book app — share memories and connect with friends digitally.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    url: "https://slambk.kshimate.space",
    github: "https://github.com/crucie/SlamBk",
    status: "LIVE",
  },
  {
    id: "kanban",
    title: "Kanban Board",
    description: "A full-stack Kanban board with drag-and-drop task management and team collaboration.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "ReactJS", "Tailwind CSS"],
    url: "https://kanban.kshimate.space",
    github: "https://github.com/crucie/fs-knbn",
    status: "LIVE",
  },
  {
    id: "dswarm",
    title: "dSwarm",
    description: "Decentralised swarm coordination platform built on blockchain infrastructure.",
    tech: ["React", "Vite", "Hardhat", "Ethereum"],
    url: "https://dswarm.kshimate.space",
    github: "https://github.com/crucie/decentralised-swarm",
    status: "LIVE",
  },
  {
    id: "csv",
    title: "CSV Viewer",
    description: "A clean, fast CSV file viewer and editor built with Next.js.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://csv.kshimate.space",
    github: "https://github.com/crucie/upcsv",
    status: "WIP",
  },
  {
    id: "gdg-lko",
    title: "GDG Lucknow",
    description: "Official dummy website for Google Developer Group Lucknow — events, blogs & community hub.",
    tech: ["Next.js", "React", "Tailwind"],
    url: "https://gdg-lko.kshimate.space",
    github: "https://github.com/crucie",
    status: "LIVE",
  },
  {
    id: "pmnv",
    title: "PMNV",
    description: "A premium modern Next.js web application with clean architecture.",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    url: "https://pmnv.kshimate.space",
    github: "https://github.com/crucie/pmnvNxt",
    status: "LIVE",
  },
  {
    id: "eventic",
    title: "Eventic",
    description: "Event Logistics Engine — admin grid, guest portal, and pluggable checkpoint system.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    url: null,
    github: "https://github.com/crucie",
    status: "WIP",
  },
]
