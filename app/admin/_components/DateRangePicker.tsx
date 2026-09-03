'use client'
import { useRouter } from 'next/navigation'
import { useTransition, useRef } from 'react'

interface Props {
  currentSince?: string
  currentUntil?: string
}

export default function DateRangePicker({ currentSince, currentUntil }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const sinceRef = useRef<HTMLInputElement>(null)
  const untilRef = useRef<HTMLInputElement>(null)

  const today = new Date().toISOString().slice(0, 10)
  const yearAgo = new Date(Date.now() - 365 * 86_400_000).toISOString().slice(0, 10)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const since = sinceRef.current?.value
    const until = untilRef.current?.value
    if (!since || !until || since > until) return
    startTransition(() => {
      router.push(`/admin?p=custom&since=${since}&until=${until}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <input
        ref={sinceRef}
        type="date"
        defaultValue={currentSince ?? yearAgo}
        max={today}
        required
        style={INPUT}
      />
      <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#444', letterSpacing: '.1em' }}>TO</span>
      <input
        ref={untilRef}
        type="date"
        defaultValue={currentUntil ?? today}
        max={today}
        required
        style={INPUT}
      />
      <button
        type="submit"
        disabled={pending}
        style={{
          padding: '8px 14px',
          font: '10px/1 ui-monospace,Menlo,monospace',
          letterSpacing: '.14em',
          background: pending ? '#2A2A2A' : 'var(--accent)',
          color: pending ? '#909090' : '#0B0B0B',
          border: 'none',
          cursor: pending ? 'not-allowed' : 'pointer',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {pending ? '···' : 'APPLY'}
      </button>
    </form>
  )
}

const INPUT: React.CSSProperties = {
  padding: '8px 10px',
  font: '10px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.08em',
  background: '#171717',
  border: '1px solid #2A2A2A',
  color: '#A5A5A5',
  outline: 'none',
  colorScheme: 'dark',
}
