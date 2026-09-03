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

  const today   = new Date().toISOString().slice(0, 10)
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #2A2A2A' }}>
        <input
          ref={sinceRef}
          type="date"
          defaultValue={currentSince ?? yearAgo}
          max={today}
          required
          style={INPUT}
        />
        <span style={{ padding: '0 10px', font: '11px/1 ui-monospace,Menlo,monospace', color: '#6B7280', letterSpacing: '.1em', borderLeft: '1px solid #2A2A2A', borderRight: '1px solid #2A2A2A', height: '100%', display: 'flex', alignItems: 'center' }}>
          TO
        </span>
        <input
          ref={untilRef}
          type="date"
          defaultValue={currentUntil ?? today}
          max={today}
          required
          style={INPUT}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        style={{
          padding: '13px 22px',
          font: '12px/1 ui-monospace,Menlo,monospace',
          letterSpacing: '.18em',
          background: pending ? '#1A1A1A' : 'var(--accent)',
          color: pending ? '#6B7280' : '#0B0B0B',
          border: '1px solid transparent',
          cursor: pending ? 'not-allowed' : 'pointer',
          fontWeight: 700,
          flexShrink: 0,
          transition: 'background .15s, color .15s',
        }}
      >
        {pending ? 'LOADING...' : 'APPLY'}
      </button>
    </form>
  )
}

const INPUT: React.CSSProperties = {
  padding: '13px 14px',
  font: '13px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.04em',
  background: '#111',
  border: 'none',
  color: '#C0C0C0',
  outline: 'none',
  colorScheme: 'dark',
  minWidth: 140,
}
