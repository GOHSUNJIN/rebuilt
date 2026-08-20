import { useEffect } from 'react'

// Locks page scroll when a modal or drawer is open
export function useScrollLock(active: boolean) {
  useEffect(() => {
    const el = document.documentElement
    el.style.overflow = active ? 'hidden' : ''
    return () => { el.style.overflow = '' }
  }, [active])
}
