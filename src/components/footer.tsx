export function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer
      className={`border-t-2 pixel-border mt-16 ${darkMode ? "border-green-400 bg-gray-800" : "border-gray-600 bg-white"}`}
    >
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="font-mono text-sm">{"© 2024 DEV.PORTFOLIO - Crafted with <3 and lots of █ pixels █"}</p>
      </div>
    </footer>
  )
}
