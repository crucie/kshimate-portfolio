# 📚 Custom Components Documentation

This document provides detailed documentation for all custom components used in the retro portfolio project.

## Table of Contents

1. [Layout Components](#layout-components)
2. [UI Components](#ui-components)
3. [Utility Components](#utility-components)
4. [Page Components](#page-components)
5. [Component Props Reference](#component-props-reference)
6. [Usage Examples](#usage-examples)

---

## Layout Components

### ClientLayout

**File:** `components/client-layout.tsx`

The main layout wrapper that handles global state, theme management, and provides the overall structure for the application.

#### Features
- Dark/Light theme management
- Loading state handling
- Global settings management
- Animated background integration
- Header and footer wrapper

#### Props
\`\`\`typescript
interface ClientLayoutProps {
  children: React.ReactNode
}
\`\`\`

#### Usage
\`\`\`tsx
<ClientLayout>
  <YourPageContent />
</ClientLayout>
\`\`\`

#### State Management
- `darkMode`: Boolean for theme state
- `isLoading`: Loading state for initial app load
- `settings`: Global settings object from localStorage

---

### Header

**File:** `components/header.tsx`

Navigation header with responsive design, swipe gestures, and integrated widgets.

#### Features
- Responsive navigation menu
- Touch/swipe gesture support
- Network monitoring widget
- Theme toggle button
- Settings access
- Active page highlighting

#### Props
\`\`\`typescript
interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  currentPath: string
}
\`\`\`

#### Navigation Sections
\`\`\`typescript
const sections = [
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/projects", name: "projects" },
  { path: "/blog", name: "blog" },
  { path: "/skills", name: "skills" },
  { path: "/contact", name: "contact" },
]
\`\`\`

#### Touch Gestures
- **Left Swipe**: Navigate to next section
- **Right Swipe**: Navigate to previous section
- **Minimum Distance**: 50px for gesture recognition

---

### Footer

**File:** `components/footer.tsx`

Simple footer component with retro styling and theme awareness.

#### Props
\`\`\`typescript
interface FooterProps {
  darkMode: boolean
}
\`\`\`

#### Features
- Theme-aware styling
- Pixel-perfect border design
- Copyright information with ASCII art

---

## UI Components

### AnimatedBackground

**File:** `components/animated-background.tsx`

Performance-optimized animated background with floating pixels.

#### Features
- Performance-aware particle rendering
- Intersection Observer for visibility optimization
- Configurable particle count
- GPU-accelerated animations
- Memory management

#### Props
\`\`\`typescript
interface AnimatedBackgroundProps {
  darkMode: boolean
}
\`\`\`

#### Performance Optimizations
- Particles only render when visible
- Configurable particle count (5-50)
- GPU acceleration with `transform3d`
- Memory cleanup on unmount

#### Settings Integration
\`\`\`typescript
// Reads from localStorage: portfolio-settings
{
  particleCount: number, // 5-50
  performanceMode: 'high' | 'normal' | 'low'
}
\`\`\`

---

### NetworkMonitor

**File:** `components/network-monitor.tsx`

Real-time network monitoring widget with expandable interface.

#### Features
- Real-time network statistics
- Connection type detection
- Packet simulation
- Online/offline status
- Expandable compact design

#### Props
\`\`\`typescript
interface NetworkMonitorProps {
  darkMode: boolean
}
\`\`\`

#### Network Statistics
\`\`\`typescript
interface NetworkStats {
  downlink: number        // Download speed in Mbps
  uplink: number         // Upload speed in Mbps
  rtt: number           // Round-trip time in ms
  type: string          // Connection type
  effectiveType: string // Effective connection type
  packetsSent: number   // Simulated packets sent
  packetsReceived: number // Simulated packets received
  online: boolean       // Online status
}
\`\`\`

#### Browser API Integration
- Uses `navigator.connection` when available
- Falls back to `navigator.onLine` for basic status
- Simulates packet counts for demonstration

---

### PerformanceMonitor

**File:** `components/performance-monitor.tsx`

Real-time performance monitoring with FPS, memory, and render time tracking.

#### Features
- FPS monitoring
- Memory usage tracking
- Render time measurement
- Performance recommendations
- Toggleable display

#### Metrics
\`\`\`typescript
interface PerformanceMetrics {
  fps: number           // Frames per second
  memoryUsage: number   // Memory usage in MB
  renderTime: number    // Render time in ms
}
\`\`\`

#### Performance Indicators
- **Green**: FPS ≥ 50
- **Yellow**: FPS 30-49
- **Red**: FPS < 30

#### Browser API Usage
- `performance.now()` for timing
- `performance.memory` for memory stats (Chrome only)
- `requestAnimationFrame` for FPS calculation

---

## Utility Components

### Component Grid System

**CSS Classes:** `.component-grid`

A hover-activated grid background system for enhanced visual feedback.

#### Features
- GPU-accelerated animations
- Theme-aware grid patterns
- Performance optimizations
- Configurable grid size and opacity

#### CSS Variables
\`\`\`css
:root {
  --grid-size: 38px;        /* ~1cm grid cells */
  --grid-opacity: 0.25;     /* Grid opacity */
  --animation-speed: 1;     /* Animation speed multiplier */
}
\`\`\`

#### Usage Classes
\`\`\`css
.component-grid.light    /* Light theme grid */
.component-grid.dark     /* Dark theme grid */
.component-grid.animate  /* Enable grid animation */
\`\`\`

#### Performance Modes
- **High Performance**: Reduced opacity, faster animations
- **Normal**: Balanced settings
- **Low Performance**: Maximum effects, slower animations

---

## Page Components

### About Page

**File:** `app/about/page.tsx`

Personal introduction with typewriter effect and animated avatar.

#### Features
- Typewriter animation for title
- Animated pixel avatar
- Terminal-style text presentation
- Responsive design

#### Animations
- **Typewriter Effect**: Character-by-character text reveal
- **Cursor Blink**: Animated cursor with opacity transitions
- **Slide In**: Page entrance animation

---

### Projects Page

**File:** `app/projects/page.tsx`

Project showcase with mobile carousel and desktop grid layout.

#### Features
- Responsive layout (carousel on mobile, grid on desktop)
- Project filtering and navigation
- ASCII art project previews
- Technology tag display

#### Project Data Structure
\`\`\`typescript
interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  ascii: string[]
}
\`\`\`

---

### Blog Page

**File:** `app/blog/page.tsx`

Blog post listing with metadata and ASCII art previews.

#### Features
- Post metadata display (date, read time, tags)
- ASCII art thumbnails
- Tag-based categorization
- Responsive card layout

#### Blog Post Structure
\`\`\`typescript
interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  ascii: string[]
}
\`\`\`

---

### Settings Page

**File:** `app/settings/page.tsx`

Comprehensive settings panel for performance and UI customization.

#### Features
- Performance mode selection
- Animation toggles
- UI element controls
- System information display
- Real-time settings application

#### Settings Structure
\`\`\`typescript
interface Settings {
  floatingPixels: boolean
  gridAnimation: boolean
  glitchEffects: boolean
  typewriterEffect: boolean
  hoverAnimations: boolean
  reducedMotion: boolean
  animationSpeed: number        // 0.5-3x
  particleCount: number         // 5-50
  performanceMode: 'high' | 'normal' | 'low'
  gpuAcceleration: boolean
  showPerformanceMonitor: boolean
  showNetworkMonitor: boolean
}
\`\`\`

---

## Component Props Reference

### Common Props Pattern

Most components follow this pattern for theme integration:

\`\`\`typescript
interface BaseComponentProps {
  darkMode?: boolean
  className?: string
  children?: React.ReactNode
}
\`\`\`

### Animation Props

Components with animations often include:

\`\`\`typescript
interface AnimationProps {
  animationDelay?: string
  animationDuration?: string
  disableAnimations?: boolean
}
\`\`\`

### Performance Props

Performance-aware components include:

\`\`\`typescript
interface PerformanceProps {
  performanceMode?: 'high' | 'normal' | 'low'
  reducedMotion?: boolean
  gpuAcceleration?: boolean
}
\`\`\`

---

## Usage Examples

### Basic Component Usage

\`\`\`tsx
// Simple component with theme
<Header 
  darkMode={darkMode} 
  setDarkMode={setDarkMode} 
  currentPath="/about" 
/>

// Component with performance settings
<AnimatedBackground 
  darkMode={darkMode}
  performanceMode="normal"
/>
\`\`\`

### Advanced Integration

\`\`\`tsx
// Full layout with all components
<ClientLayout>
  <AnimatedBackground darkMode={darkMode} />
  <Header 
    darkMode={darkMode} 
    setDarkMode={setDarkMode} 
    currentPath={pathname} 
  />
  <main className="container mx-auto px-4 py-8">
    <YourPageContent />
  </main>
  <Footer darkMode={darkMode} />
  <NetworkMonitor darkMode={darkMode} />
  <PerformanceMonitor />
</ClientLayout>
\`\`\`

### Settings Integration

\`\`\`tsx
// Reading settings in components
useEffect(() => {
  const settings = localStorage.getItem('portfolio-settings')
  if (settings) {
    const parsed = JSON.parse(settings)
    // Apply settings to component
  }
}, [])

// Applying settings to CSS
useEffect(() => {
  document.documentElement.style.setProperty('--animation-speed', settings.animationSpeed.toString())
  document.documentElement.classList.toggle('no-animations', !settings.animations)
}, [settings])
\`\`\`

---

## Performance Considerations

### Memory Management
- Components use `useRef` for persistent values
- Cleanup intervals and event listeners in `useEffect`
- Intersection Observer for visibility-based optimizations

### Animation Optimization
- GPU acceleration with `transform3d`
- `will-change` property for animated elements
- Reduced motion support via CSS media queries

### Bundle Size
- Tree-shaking friendly imports
- Lazy loading for heavy components
- Conditional rendering based on settings

---

## Accessibility Features

### Keyboard Navigation
- Focus management for interactive elements
- Skip links for screen readers
- Proper ARIA labels and roles

### Screen Reader Support
- Semantic HTML structure
- `sr-only` classes for screen reader content
- Live regions for dynamic content updates

### Reduced Motion
- Respects `prefers-reduced-motion`
- Settings toggle for animation control
- Fallback static states

---

## Browser Compatibility

### Modern Features Used
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- Performance API
- Network Information API (optional)

### Fallbacks
- Graceful degradation for unsupported APIs
- CSS fallbacks for older browsers
- Progressive enhancement approach

---

## Testing Recommendations

### Unit Testing
\`\`\`tsx
// Example test structure
describe('NetworkMonitor', () => {
  it('should display network stats', () => {
    render(<NetworkMonitor darkMode={false} />)
    // Test implementation
  })
})
\`\`\`

### Performance Testing
- Monitor FPS during animations
- Memory leak detection
- Bundle size analysis
- Lighthouse performance audits

---

## Contributing Guidelines

### Component Development
1. Follow TypeScript strict mode
2. Include proper prop interfaces
3. Add performance optimizations
4. Support both themes
5. Include accessibility features

### Documentation
1. Update this file for new components
2. Include usage examples
3. Document performance implications
4. Add accessibility notes

---

*Last updated: December 2024*
