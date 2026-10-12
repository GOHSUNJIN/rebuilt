interface ScrollDotsProps {
  count: number
  activeIndex: number
  className?: string
}

export default function ScrollDots({ count, activeIndex, className }: ScrollDotsProps) {
  return (
    <div className={className} style={{ display: 'none', justifyContent: 'center', gap: 6, marginTop: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: i === activeIndex ? 20 : 6,
            height: 4,
            borderRadius: 2,
            background: i === activeIndex ? 'var(--accent)' : '#2A2A2A',
            transition: 'width .25s, background .25s',
          }}
        />
      ))}
    </div>
  )
}
