# Portfolio Redesign — Full Overhaul

## Summary
A full redesign and structural rework of the kshimate portfolio, keeping the **Retro / 2D / Space / RPG pixel** aesthetic while making every page significantly more sophisticated, professional, and focused. The navigation and pages will be streamlined. New pages (Games, enhanced Blog) will be added. Bloated or irrelevant pages (network, page-alternative) will be removed.

**Framer Motion** will be installed and used for all page-level and component animations.

---

## User Review Required

> [!IMPORTANT]
> **Pages being REMOVED:** `/network`, `page-alternative.tsx` — these are completely irrelevant to a portfolio.
> **Settings page** is being kept but cleaned up (NetworkMonitor toggle was already removed).

> [!WARNING]
> **Blog system** will be file-system driven using `.md` files in `content/blog/`. One dummy blog post (`building-retro-ui.md`) will be created as a template. Reading `.md` files at runtime requires the `gray-matter` + `next-mdx-remote` or similar. To keep deps lean, we will use **`gray-matter` + raw markdown rendering with a custom renderer** (no heavy MDX stack).

---

## Open Questions

> [!NOTE]
> No open questions — enough context gathered from existing pages.

---

## Proposed Changes

### New Site Structure

| Route | Status | Change |
|---|---|---|
| `/about` | MODIFY | Redesigned hero intro |
| `/experience` | MODIFY | Timeline-based layout, compact cards |
| `/projects` | MODIFY | Grid cards, no carousel on desktop |
| `/skills` | MODIFY | Categorized skill tree like an RPG stats screen |
| `/blog` | MODIFY | Blog index reading from `/content/blog/*.md` |
| `/blog/[slug]` | MODIFY | Renders markdown from file, styled terminal reader |
| `/contact` | MODIFY | Cleaner card with social links |
| `/games` | **[NEW]** | A dedicated "GAMES ARCADE" page listing indie games |
| `/settings` | MODIFY | Simplified, remove dead monitor toggles |
| `/network` | **[DELETE]** | Irrelevant |
| `page-alternative.tsx` | **[DELETE]** | Unused |

---

### 1. Content / Data Layer

#### [NEW] `content/blog/` directory
- `building-retro-ui.md` — Dummy blog post with full frontmatter as a template

#### [MODIFY] Blog pages — shift to file-based blog
- Install `gray-matter` to parse markdown frontmatter
- Use Node's `fs` to read files server-side in Next.js

---

### 2. Global CSS & Theme

#### [MODIFY] `app/globals.css`
- **Add starfield / space background** keyframe animation (small twinkling dots, scanline overlay)
- Enhance the dark mode palette: deep space `#050b14` base, accent `#00ff9f` (terminal green), star-blue highlights `#4fc3f7`
- Add RPG-stat-bar animation for skills page
- Add `scanline` overlay effect as a class
- Add smooth `page-warp` entrance animation

---

### 3. Layout / Header / Footer

#### [MODIFY] `components/header.tsx`
- Add `GAMES` nav link
- Tighten layout, remove dead import remnants
- Add a subtle "signal strength" pixel icon as a vibe element next to logo

#### [MODIFY] `components/footer.tsx`
- More styled with social links (GitHub, email)
- Show current year dynamically

#### [MODIFY] `components/animated-background.tsx`
- Replace plain squares with **space-themed particles**: stars (tiny white/blue dots), occasional shooting star, scanline effect
- Keep the performance-aware toggle logic

#### [NEW] `components/sprite-walker.tsx`
- A **2D pixel sprite character** that walks/runs along a horizontal track
- Uses Framer Motion `useScroll` + `useTransform` to track scroll position
- Sprite animates frame-by-frame using CSS sprite sheet steps (walking cycle)
- Used on the **Experience page** timeline — sprite walks from job to job as you scroll
- Sprite faces left/right depending on scroll direction

---

### 6. Framer Motion Animations

**Install:** `npm install framer-motion`

#### Page-level
- `<motion.div>` page wrapper with `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` on every page
- `exit` animations for route transitions

#### Experience Page — Sprite Walk Track
- A horizontal pixel-art track/path at the bottom of the timeline
- A small 16×16 pixel sprite walks from left to right as the user scrolls through jobs
- Sprite idle animation at each "job station"
- Each job card animates in with `whileInView` (slide from side)

#### Projects Page
- Cards animate in with `whileInView` stagger (bottom-up, 0.1s delay between each)
- Hover: subtle `whileHover={{ scale: 1.03, rotate: 0.5 }}`

#### Skills Page
- Skill bars animate width from 0 → level% using `useInView` trigger
- Each category slides in from alternating sides

#### About Page
- Character stat card does a "deal" animation (flips in like a playing card)
- Role badges pulse subtly

#### Blog / Games / Contact
- Simple `staggerChildren` fade-in for lists
- `whileHover` scale on cards

---

### 4. Pages

#### [MODIFY] `app/about/page.tsx`
- Remove heavy shadcn `Card` dependency directly in layout
- Better hero: large pixel avatar, RPG-style character card showing "stats" (years of XP, class = Full Stack Dev, level = 2+)
- Typewriter cycles through all three roles (FULL_STACK_DEVELOPER, INDIE_GAME_DEVELOPER, ANIMATOR)
- Bio text stays as terminal lines but styled more richly

#### [MODIFY] `app/experience/page.tsx`
- **Replace large cards with a vertical RPG quest-log timeline**
- Each job = a "QUEST COMPLETED" entry
- Compact: title, company, date on one row; achievements in a collapsible accordion-style (CSS only, no radix)
- ASCII art removed — replaced with role badge icons (emoji-based pixel icon)
- Tech tags remain, styled as compact pixel chips

#### [MODIFY] `app/projects/page.tsx`
- Remove mobile carousel — unified responsive grid
- Each project = a styled "FILE_CARD" with: title, description, tech tags, GitHub + Demo buttons
- Add a `status` field: `LIVE`, `WIP`, `ARCHIVED` with a glowing badge
- Remove placeholder projects 2 & 3, only show real one + add note "more dropping soon"

#### [NEW] `app/games/page.tsx`
- **ARCADE.EXE** page listing indie games
- Each game has: title, platform (Unity, Web), description, a pixel ASCII preview, status badge, optional play link
- Include 1–2 real games (or placeholder games) with "IN DEVELOPMENT" badge
- Styled like a retro game select screen (Pokemon-style menu)

#### [MODIFY] `app/skills/page.tsx`
- **RPG Character Stats Screen** layout
- Categories: FRONTEND, BACKEND, DEVOPS, DESIGN, GAMEDEV
- Each category = a stat group with level bars (CSS progress bars styled as pixel HP bars)
- Small pixel icon per category

#### [MODIFY] `app/blog/page.tsx`
- Read posts from `content/blog/*.md` using `gray-matter` + `fs`
- Show posts as terminal-styled cards with: title, date, read time, tags
- "WRITE_NEW_POST.MD →" instruction card at bottom for the user

#### [MODIFY] `app/blog/[slug]/page.tsx`
- Read the corresponding `.md` file from `content/blog/`
- Render markdown with a lightweight custom renderer (convert headings, code blocks, lists to styled JSX)
- Styled as a terminal log viewer

#### [MODIFY] `app/contact/page.tsx`
- Cleaner, centered "TRANSMISSION.SH" card
- Two buttons: Email + GitHub
- Add a pixel "blinking cursor" animation
- Add a short tagline

#### [MODIFY] `app/settings/page.tsx`
- Remove duplicate `Card` import (bug introduced earlier)
- Remove `Network` icon import (unused after UI Controls section deleted)

#### [DELETE] `app/network/` directory
#### [DELETE] `app/page-alternative.tsx`

---

### 5. Blog Content

#### [NEW] `content/blog/building-retro-ui.md`
Full dummy blog post with proper frontmatter:
```yaml
---
title: "Building Retro UI in 2025"
date: "2026-04-28"
readTime: "7 min"
tags: ["CSS", "Design", "Retro", "Portfolio"]
description: "How I designed a pixel-perfect retro portfolio from scratch — the tools, tricks, and philosophy behind the aesthetic."
---
```

---

## Verification Plan

### Automated
- `npm run dev` — check no compile errors after all changes
- Confirm `/games`, `/blog`, `/blog/building-retro-ui` all route correctly

### Manual Verification
- All nav links work (including new Games link)
- Blog reads `.md` files correctly
- Experience page timeline looks compact and professional
- Projects grid works on mobile and desktop
- Skills RPG bars animate correctly
- Settings page has no duplicate imports / errors
