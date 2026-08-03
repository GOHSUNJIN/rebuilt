'use client'
import { useState } from 'react'

const TAGS = ['Injury', 'Post-surgery', 'Pain', 'Return to sport', 'Not sure']

export default function WaitlistTags() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
      {TAGS.map((tag) => {
        const active = selected.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            style={{
              padding: '8px 14px',
              border: `1px solid ${active ? '#d99e5c' : '#2a2e34'}`,
              background: active ? 'rgba(217,158,92,.1)' : 'transparent',
              color: active ? '#d99e5c' : '#a3aab4',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '.08em',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all .15s',
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
