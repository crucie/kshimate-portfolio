import type React from "react"
/**
 * TypeScript interfaces for all custom components
 * Use this file as a reference for component props and data structures
 */

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export interface ClientLayoutProps {
  children: React.ReactNode
}

export interface HeaderProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  currentPath: string
}

export interface FooterProps {
  darkMode: boolean
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

export interface AnimatedBackgroundProps {
  darkMode: boolean
}

export interface NetworkMonitorProps {
  darkMode: boolean
}

export type PerformanceMonitorProps = {}

// ============================================================================
// DATA STRUCTURES
// ============================================================================

export interface NetworkStats {
  downlink: number
  uplink: number
  rtt: number
  type: string
  effectiveType: string
  packetsSent: number
  packetsReceived: number
  online: boolean
}

export interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
}

export interface Settings {
  floatingPixels: boolean
  gridAnimation: boolean
  glitchEffects: boolean
  typewriterEffect: boolean
  hoverAnimations: boolean
  reducedMotion: boolean
  animationSpeed: number
  particleCount: number
  performanceMode: "high" | "normal" | "low"
  gpuAcceleration: boolean
  showPerformanceMonitor: boolean
  showNetworkMonitor: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  status: "COMPLETED" | "IN_PROGRESS" | "PLANNED"
  startDate: string
  endDate: string
  team: string
  tech: string[]
  features: string[]
  challenges: string[]
  codeSnippet: string
  github: string
  demo: string
  ascii: string[]
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  content: string
  ascii: string[]
}

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  tech: string[]
  ascii: string[]
}

export interface NetworkTechnology {
  name: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export interface NetworkCategory {
  category: string
  icon: React.ComponentType
  technologies: NetworkTechnology[]
}

export interface NetworkTopology {
  name: string
  ascii: string[]
  description: string
}

export interface ProtocolLayer {
  layer: string
  protocols: string[]
  color: string
}

export interface ProtocolStack {
  name: string
  layers: ProtocolLayer[]
}

// ============================================================================
// COMMON PATTERNS
// ============================================================================

export interface BaseComponentProps {
  darkMode?: boolean
  className?: string
  children?: React.ReactNode
}

export interface AnimationProps {
  animationDelay?: string
  animationDuration?: string
  disableAnimations?: boolean
}

export interface PerformanceProps {
  performanceMode?: "high" | "normal" | "low"
  reducedMotion?: boolean
  gpuAcceleration?: boolean
}

export interface ThemeProps {
  darkMode: boolean
}

// ============================================================================
// PAGE COMPONENT PROPS
// ============================================================================

export interface ProjectDetailProps {
  params: Promise<{ id: string }>
}

export interface BlogPostProps {
  params: Promise<{ slug: string }>
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type NavigationSection = {
  path: string
  name: string
  icon?: React.ComponentType
}

export type TouchGesture = {
  touchStart: number | null
  touchEnd: number | null
  minSwipeDistance: number
}

export type PerformanceMode = "high" | "normal" | "low"

export type AnimationSpeed = 0.5 | 1 | 1.5 | 2 | 2.5 | 3

export type ParticleCount = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50

// ============================================================================
// CSS CUSTOM PROPERTIES
// ============================================================================

export interface CSSCustomProperties {
  "--animation-speed": string
  "--particle-count": string
  "--grid-size": string
  "--grid-opacity": string
  "--performance-mode": string
}

// ============================================================================
// BROWSER API TYPES
// ============================================================================

export interface NetworkConnection {
  downlink?: number
  uplink?: number
  rtt?: number
  type?: string
  effectiveType?: string
}

export interface PerformanceMemory {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

export interface DeviceSpecs {
  deviceMemory?: number
  hardwareConcurrency: number
  userAgent: string
  screenWidth: number
  screenHeight: number
  viewportWidth: number
  viewportHeight: number
  pixelRatio: number
  online: boolean
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

export type ThemeToggleHandler = (darkMode: boolean) => void
export type SettingsUpdateHandler = (key: string, value: any) => void
export type NavigationHandler = (path: string) => void
export type TouchEventHandler = (e: React.TouchEvent) => void

// ============================================================================
// COMPONENT STATE TYPES
// ============================================================================

export interface ComponentState {
  isLoading: boolean
  isVisible: boolean
  isAnimating: boolean
  hasError: boolean
}

export interface AnimationState {
  isPlaying: boolean
  progress: number
  duration: number
  delay: number
}

export interface NetworkState {
  isOnline: boolean
  connectionType: string
  speed: number
  latency: number
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

export interface UseThemeReturn {
  darkMode: boolean
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export interface UseSettingsReturn {
  settings: Settings
  updateSetting: SettingsUpdateHandler
  resetSettings: () => void
}

export interface UsePerformanceReturn {
  metrics: PerformanceMetrics
  isMonitoring: boolean
  startMonitoring: () => void
  stopMonitoring: () => void
}

export interface UseNetworkReturn {
  stats: NetworkStats
  isOnline: boolean
  connectionType: string
}
