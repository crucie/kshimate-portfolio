export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loading-pixels mb-4">
          <div className="pixel-loader"></div>
        </div>
        <p className="font-mono text-lg animate-pulse">LOADING_SYSTEM.EXE...</p>
      </div>
    </div>
  )
}
