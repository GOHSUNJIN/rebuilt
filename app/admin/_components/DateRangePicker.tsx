'use client'
import { useFormStatus } from 'react-dom'
import { setDateRangeAction } from '@/app/actions/admin'

function ApplyButton() {
  const { pending } = useFormStatus()
  return (
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
  )
}

interface Props {
  currentSince?: string
  currentUntil?: string
}

export default function DateRangePicker({ currentSince, currentUntil }: Props) {
  const toDateInput = (iso?: string) => iso ? iso.slice(0, 10) : ''
  const today = new Date().toISOString().slice(0, 10)
  const yearAgo = new Date(Date.now() - 365 * 86_400_000).toISOString().slice(0, 10)

  return (
    <form action={setDateRangeAction} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <input
        type="date"
        name="since"
        defaultValue={toDateInput(currentSince) || yearAgo}
        max={today}
        required
        style={INPUT_STYLE}
      />
      <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#444', letterSpacing: '.1em' }}>TO</span>
      <input
        type="date"
        name="until"
        defaultValue={toDateInput(currentUntil) || today}
        max={today}
        required
        style={INPUT_STYLE}
      />
      <ApplyButton />
    </form>
  )
}

const INPUT_STYLE = {
  padding: '8px 10px',
  font: '10px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.08em',
  background: '#171717',
  border: '1px solid #2A2A2A',
  color: '#A5A5A5',
  outline: 'none',
  colorScheme: 'dark',
}
