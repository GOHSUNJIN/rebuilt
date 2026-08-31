'use client'
import { COACHES } from '@/lib/bookData'
import type { Step2Props } from './types'
import StepHeader from './StepHeader'

export default function Step2({ coach, setCoach }: Step2Props) {
  return (
    <>
      <StepHeader step={2} heading="Choose a coach." />
      <p style={{ fontSize: 15, color: '#A5A5A5', marginTop: 0, marginBottom: 28 }}>You can always switch after your first session.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: '#1E1E1E' }}>
        {COACHES.map(({ label, sub, detail }) => {
          const selected = coach === label
          return (
            <button key={label} type="button" onClick={() => setCoach(label)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', background: selected ? '#171717' : '#0B0B0B', border: 'none', borderLeft: `3px solid ${selected ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
            >
              <div>
                <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 8px' }}>{sub.toUpperCase()}</p>
                <p style={{ fontSize: 15, fontWeight: 700, margin: '0 0 5px', color: selected ? '#FFFFFF' : '#A5A5A5', letterSpacing: '-.01em' }}>{label}</p>
                <p style={{ fontSize: 12.5, color: '#909090', margin: 0 }}>{detail}</p>
              </div>
              {selected && <span style={{ color: 'var(--accent)', fontSize: 14, flexShrink: 0, marginLeft: 20 }}>✓</span>}
            </button>
          )
        })}
      </div>
    </>
  )
}
