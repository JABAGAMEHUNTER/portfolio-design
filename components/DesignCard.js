import { useState } from 'react'

export default function DesignCard({ design, onSelect }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      onClick={() => onSelect(design)}
      className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-800 card-glow focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      )}
      <img
        src={design.image}
        alt={design.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-center px-4 pb-4">
          <h3 className="text-sm font-semibold text-white mb-1">{design.title}</h3>
          <div className="flex flex-wrap justify-center gap-1">
            {design.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}
