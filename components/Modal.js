import { useEffect, useCallback, useRef, useState } from 'react'

export default function Modal({ design, onClose }) {
  const imgRef = useRef(null)
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const pinchRef = useRef(null)
  const dragRef = useRef(null)

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Escape':
          if (scale > 1) resetZoom()
          else onClose()
          break
      }
    },
    [onClose, scale, resetZoom]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  useEffect(() => {
    resetZoom()
  }, [design])

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale((prev) => Math.max(1, Math.min(5, prev + delta)))
  }, [])

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchRef.current = {
        distance: Math.hypot(dx, dy),
        scale: scale,
      }
    } else if (e.touches.length === 1 && scale > 1) {
      dragRef.current = {
        startX: e.touches[0].clientX - position.x,
        startY: e.touches[0].clientY - position.y,
      }
    }
  }, [scale, position])

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.hypot(dx, dy)
      const newScale = Math.max(1, Math.min(5, pinchRef.current.scale * (distance / pinchRef.current.distance)))
      setScale(newScale)

      if (newScale === 1) setPosition({ x: 0, y: 0 })
    } else if (e.touches.length === 1 && dragRef.current) {
      e.preventDefault()
      setPosition({
        x: e.touches[0].clientX - dragRef.current.startX,
        y: e.touches[0].clientY - dragRef.current.startY,
      })
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null
    dragRef.current = null
  }, [])

  let lastTap = 0
  const handleClick = useCallback((e) => {
    const now = Date.now()
    if (now - lastTap < 300) {
      if (scale > 1) resetZoom()
      else setScale(2.5)
    }
    lastTap = now
  }, [scale, resetZoom])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (scale > 1) return
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={containerRef}
        className="relative max-w-4xl w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl animate-slideUp max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <h2 className="text-lg font-bold truncate">{design.title}</h2>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className="relative flex-1 overflow-hidden bg-zinc-900/50 mx-4 rounded-xl touch-none"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: pinchRef.current || dragRef.current ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            <img
              ref={imgRef}
              src={design.image}
              alt={design.title}
              onClick={handleClick}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain select-none cursor-zoom-in"
              draggable={false}
              style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
            />
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-[11px] text-zinc-500 bg-black/60 px-2 py-1 rounded-full">
              {scale > 1 ? 'Arraste para mover' : 'Pinça para zoom'}
            </span>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-zinc-400 text-sm mb-3">{design.description}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {design.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider text-violet-300 bg-violet-500/10 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={design.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Ver projeto
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
