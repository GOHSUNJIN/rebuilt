'use client'
import { useEffect, useState } from 'react'

type Status = { open: boolean; label: string }

function getSingaporeStatus(): Status {
  const sgt = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }))
  const day = sgt.getDay() // 0=Sun … 6=Sat
  const mins = sgt.getHours() * 60 + sgt.getMinutes()

  let opens: number, closes: number
  if (day === 0) return { open: false, label: 'Closed today' }
  if (day === 6) { opens = 8 * 60; closes = 14 * 60 }
  else            { opens = 7 * 60; closes = 21 * 60 }

  if (mins < opens) {
    const h = opens / 60
    return { open: false, label: `Opens at ${h % 12 || 12}${h < 12 ? 'am' : 'pm'}` }
  }
  if (mins >= closes) return { open: false, label: 'Closed for today' }

  const remaining = closes - mins
  if (remaining <= 60) return { open: true, label: `Closes in ${remaining}min` }

  const ch = closes / 60
  return { open: true, label: `Open until ${ch % 12 || 12}${ch < 12 ? 'am' : 'pm'}` }
}

export default function OpenStatus({ style }: { style?: React.CSSProperties }) {
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    setStatus(getSingaporeStatus())
    const id = setInterval(() => setStatus(getSingaporeStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!status) return null

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, ...style }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
        background: status.open ? '#4ade80' : '#6f7783',
        animation: status.open ? 'pulseDot 2s ease-in-out infinite' : 'none',
      }} />
      <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.14em', color: status.open ? '#7ee8a2' : '#6f7783' }}>
        {status.label}
      </span>
    </div>
  )
}
