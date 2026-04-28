# Design System & Theme Documentation

This document outlines the design principles, color palettes, and visual components used in the **kshimate-portfolio** project.

## Core Theme: Retro-Future Terminal
The project employs a distinctive **Retro-Future / Cyber-Terminal** aesthetic. It blends 80s computer nostalgia (pixel art, monochrome text, CRT effects) with modern web performance and responsiveness.

### Atmosphere
- **Monospace Focus**: Everything feels structured like a terminal or code editor.
- **High Contrast**: Sharp transitions between light and dark backgrounds.
- **Glitch & Motion**: Subtle animations that mimic hardware glitches and loading sequences.

---

## Color Palettes
The theme uses CSS variables for dynamic switching between Light and Dark modes.

### Dark Mode (Default/Dominant)
- **Background**: `gray-900` (#111827 / `hsl(243 244 246)`) - *Wait, the root variables show background as light by default, but the ClientLayout handles the logic.*
- **Foreground (Text)**: `green-400` (#4ade80) - Classic terminal green.
- **Primary/Border**: `green-400`.
- **Card/Popovers**: `gray-800` (#1f2937).

### Light Mode
- **Background**: `gray-100` (#f3f4f6).
- **Foreground (Text)**: `gray-900` (#111827).
- **Primary/Border**: `gray-600` (#4b5563).

---

## Typography
The project relies heavily on monospace fonts to maintain the terminal aesthetic.

- **Primary Font**: `Courier New`, `Monaco`, `Menlo`, `Ubuntu Mono`, `monospace`.
- **Styling**: `tracking-wider`, `uppercase` (for nav), and `font-bold` for emphasis.

---

## Visual Components

### 1. Pixel Borders (`.pixel-border`)
Custom borders that simulate low-resolution pixelated edges, using CSS pseudo-elements and gradients.

### 2. Glitch Effects (`.glitch-text`)
Text animations that create a "shaking" or "splitting" effect with red and green shadows, mimicking a malfunctioning CRT monitor.

### 3. CRT Scanlines & Grids (`.component-grid`)
Animated radial and linear gradients that move across the background, creating a sense of depth and hardware persistence.

### 4. Floating Pixels (`.floating-pixel`)
GPU-accelerated background particles that move vertically, adding life to the interface without heavy performance cost.

### 5. Typewriter Animation (`.typing-animation`)
Elements that appear as if they are being typed in real-time, complete with a blinking cursor (`█`).

---

## Performance System
The project includes a performance monitoring and toggle system:
- **High Performance**: Enables full animations, high particle counts, and fast grid moves.
- **Low Performance**: Reduces animation speeds and particle counts for better stability on older hardware.
- **Reduced Motion**: Respects OS settings by disabling almost all transitions and animations.
