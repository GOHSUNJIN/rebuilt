'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 0,
        width: 480,
        height: 480,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(183,240,0,.045) 0%, transparent 65%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.55s cubic-bezier(.17,.67,.83,.67), top 0.55s cubic-bezier(.17,.67,.83,.67)',
        left: '-240px',
        top: '-240px',
        willChange: 'left, top',
      }}
    />
  )
}
