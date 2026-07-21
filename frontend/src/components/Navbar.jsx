export default function Navbar() {
  return (
    <nav className="border-b border-white/10 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
            त
          </div>
          <span className="font-bold text-base tracking-wide">TRINETRA</span>
          <span className="text-xs text-white/40 hidden sm:block">
            AI Digital Public Safety
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="hidden sm:block">Live Protection</span>
        </div>
      </div>
    </nav>
  )
}