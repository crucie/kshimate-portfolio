import Link from "next/link"

export function Footer({ darkMode }: { darkMode: boolean }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={`border-t-2 z-10 bottom-0 w-full pixel-border mt-16 ${darkMode ? "border-green-400 bg-gray-800" : "border-gray-600 bg-white"}`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm opacity-80">
            {`© ${year} kshimate.me — Crafted with `}
            <span className="text-red-400">❤</span>
            {` and lots of █ pixels █`}
          </p>
          <div className="flex items-center gap-4 font-mono text-sm">
            <a
              href="https://github.com/crucie"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 flex items-center gap-1"
            >
              <span>▣</span> GitHub
            </a>
            <a
              href="mailto:work.amaymishra@gmail.com"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 flex items-center gap-1"
            >
              <span>✉</span> Email
            </a>
            <Link
              href="/settings"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200 flex items-center gap-1"
            >
              <span>⚙</span> Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
