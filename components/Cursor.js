'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (ref.current) ref.current.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px) rotate(${pos.current.x * 0.04}deg)`
      }
      requestAnimationFrame(loop)
    }
    const raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference will-change-transform"
      style={{ transition: 'opacity 0.3s' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="#a78bfa"
          stroke="#c4b5fd"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  )
}
