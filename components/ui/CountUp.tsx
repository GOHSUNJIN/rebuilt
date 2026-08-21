'use client'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  duration?: number
  decimals?: number
  suffix?: string
  style?: React.CSSProperties
  className?: string
}

export default function CountUp({ to, duration = 1200, decimals = 0, suffix = '', style, className }: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(parseFloat((eased * to).toFixed(decimals)))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration, decimals])

  return (
    <span ref={ref} style={style} className={className}>
      {value.toFixed(decimals)}{suffix}
    </span>
  )
}
