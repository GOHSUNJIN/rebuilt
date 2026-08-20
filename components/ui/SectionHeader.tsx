import type { ReactNode } from 'react'

export default function SectionHeader({
  label,
  heading,
  desc,
  headingSize = 36,
}: {
  label: string
  heading: ReactNode
  desc?: string
  headingSize?: number
}) {
  const letterSpacing = headingSize >= 44 ? '-.03em' : '-.025em'
  const lineHeight    = headingSize >= 44 ? 0.92 : 0.96
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
      <div>
        <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.24em', marginTop: 0, marginBottom: 16 }}>
          {label}
        </p>
        <h2 className="r-section-h2" style={{ fontSize: headingSize, fontWeight: 800, letterSpacing, margin: 0, lineHeight }}>
          {heading}
        </h2>
      </div>
      {desc && (
        <p className="r-desc-right" style={{ fontSize: 14, lineHeight: 1.65, color: '#5f6670', margin: 0, maxWidth: 320, textAlign: 'right' }}>
          {desc}
        </p>
      )}
    </div>
  )
}
