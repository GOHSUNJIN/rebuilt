import { CSSProperties } from 'react'

type Props = { placeholder: string; height?: number | string; style?: CSSProperties }

export default function ImagePlaceholder({ placeholder, height = '100%', style }: Props) {
  return (
    <div
      style={{
        background: '#111316',
        border: '1px solid #1e2126',
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height,
        ...style,
      }}
    >
      <span
        style={{
          font: '10px/1 ui-monospace,Menlo,monospace',
          color: '#3a3f47',
          letterSpacing: '.16em',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        {placeholder}
      </span>
    </div>
  )
}
