'use client'
import { useState } from 'react'

interface CopyTextProps {
  value: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export default function CopyText({ value, children, style, className }: CopyTextProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: do nothing, original href still works
    }
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={style} className={className}>{children}</span>
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
        style={{
          background: 'none',
          border: 'none',
          padding: '2px 6px',
          cursor: 'pointer',
          font: '9px/1 ui-monospace,Menlo,monospace',
          letterSpacing: '.12em',
          color: copied ? '#7ee8a2' : '#5f6670',
          transition: 'color .2s ease',
          flexShrink: 0,
        }}
      >
        {copied ? 'COPIED ✓︎' : 'COPY'}
      </button>
    </span>
  )
}
