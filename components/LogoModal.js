import { useEffect, useCallback, useRef, useState } from 'react'

const images = [
  { src: '/artes/logo.png', alt: 'JMJ Design — Logo' },
  { src: '/artes/logo_icon.png', alt: 'JMJ Design — Ícone' },
]

export default function LogoModal({ onClose }) {
  const [index, setIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const pinchRef = useRef(null)
  const dragRef = useRef(null)
  const lastTap = useRef(0)

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
        case 'ArrowLeft':
          if (scale === 1) setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
          break
        case 'ArrowRight':
          if (scale === 1) setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
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
  }, [index])

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
    } else if (e.touches.length === 1 && scale === 1) {
      const sw = e.touches[0].clientX
      dragRef.current = { swipeX: sw, moved: false }
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
      if (dragRef.current.swipeX !== undefined) {
        const diff = e.touches[0].clientX - dragRef.current.swipeX
        if (Math.abs(diff) > 10) dragRef.current.moved = true
      } else {
        e.preventDefault()
        setPosition({
          x: e.touches[0].clientX - dragRef.current.startX,
          y: e.touches[0].clientY - dragRef.current.startY,
        })
      }
    }
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (dragRef.current && dragRef.current.swipeX !== undefined) {
      if (!dragRef.current.moved) {
        const now = Date.now()
        if (now - lastTap.current < 300) {
          if (scale > 1) resetZoom()
          else setScale(2.5)
        }
        lastTap.current = now
      } else {
        const diff = e.changedTouches[0].clientX - dragRef.current.swipeX
        if (Math.abs(diff) > 50) {
          if (diff > 0) setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
          else setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
        }
      }
    }
    pinchRef.current = null
    dragRef.current = null
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
        className="relative max-w-2xl w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <span className="text-sm text-zinc-400">
            {index === 0 ? 'Logo' : 'Ícone'} · {index + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className="relative mx-4 rounded-xl overflow-hidden bg-zinc-800/50 touch-none"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center min-h-[50vh]">
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: pinchRef.current || dragRef.current ? 'none' : 'transform 0.2s ease-out',
              }}
            >
              <img
                src={images[index].src}
                alt={images[index].alt}
                className="max-w-full max-h-[55vh] w-auto h-auto object-contain select-none"
                draggable={false}
                style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
              />
            </div>
          </div>

          {scale === 1 && (
            <>
              <button
                onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? 'bg-violet-400 w-3' : 'bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-4 text-center">
          <p className="text-zinc-400 text-xs">
            {scale > 1 ? 'Arraste para mover · Toque duas vezes para resetar' : 'Deslize ou use as setas · Pinça para zoom'}
          </p>
        </div>
      </div>
    </div>
  )
}
