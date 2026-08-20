'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="scroll-top-btn"
      style={{
        position: 'fixed',
        bottom: 84,
        right: 28,
        zIndex: 89,
        width: 40,
        height: 40,
        background: '#141922',
        border: '1px solid #262a30',
        color: 'var(--accent)',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        transition: 'border-color .2s, background .2s, opacity .2s',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
