# 🎨 Styling Guide

## CSS Architecture

### Custom Properties (CSS Variables)

The project uses CSS custom properties for dynamic theming and performance control:

\`\`\`css
:root {
  /* Theme Colors */
  --background: 243 244 246;
  --foreground: 17 24 39;
  --primary: 17 24 39;
  --accent: 243 244 246;
  
  /* Performance Variables */
  --animation-speed: 1;
  --particle-count: 20;
  --grid-size: 38px;
  --grid-opacity: 0.25;
}

.dark {
  --background: 17 24 39;
  --foreground: 34 197 94;
  --primary: 34 197 94;
  --accent: 31 41 55;
}
\`\`\`

### Component Classes

#### Pixel Border System
\`\`\`css
.pixel-border {
  border: 2px solid currentColor;
  image-rendering: pixelated;
  position: relative;
}

.pixel-border::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: linear-gradient(90deg, currentColor 50%, transparent 50%);
  background-size: 4px 4px;
  opacity: 0.2;
  z-index: -1;
}
\`\`\`

#### Grid Background System
\`\`\`css
.component-grid {
  position: relative;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.component-grid::before {
  content: "";
  position: absolute;
  inset: 0;
  background-size: var(--grid-size) var(--grid-size);
  opacity: 0;
  transition: opacity 0.2s;
  z-index: -1;
}

.component-grid:hover::before {
  opacity: var(--grid-opacity);
}
\`\`\`

### Animation Classes

#### Performance-Optimized Animations
\`\`\`css
.floating-pixel {
  animation: floatOptimized linear infinite;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes floatOptimized {
  0% { transform: translate3d(0, 100vh, 0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate3d(0, -10px, 0) rotate(360deg); opacity: 0; }
}
\`\`\`

#### Typewriter Effect
\`\`\`css
.typing-animation {
  opacity: 0;
  animation: typeInOptimized 0.5s ease-in forwards;
}

@keyframes typeInOptimized {
  from { opacity: 0; transform: translate3d(-10px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
\`\`\`

### Responsive Design

#### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

#### Mobile Optimizations
\`\`\`css
@media (max-width: 768px) {
  :root {
    --grid-size: 30px;
    --grid-opacity: 0.2;
  }
  
  .floating-pixel:nth-child(n + 11) {
    display: none;
  }
}
\`\`\`

### Accessibility

#### Focus Styles
\`\`\`css
button:focus-visible,
a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
\`\`\`

#### Reduced Motion
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

### Performance Classes

#### GPU Acceleration
\`\`\`css
.gpu-accelerated {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
\`\`\`

#### Performance Modes
\`\`\`css
.performance-high {
  --animation-speed: 0.5;
  --particle-count: 10;
  --grid-opacity: 0.15;
}

.performance-low {
  --animation-speed: 2;
  --particle-count: 5;
  --grid-opacity: 0.1;
}
