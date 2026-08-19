interface Props {
  step: number
  heading: React.ReactNode
  large?: boolean
}

export default function StepHeader({ step, heading, large = false }: Props) {
  const num = step < 10 ? `0${step}` : String(step)
  return (
    <>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.22em', marginTop: 0, marginBottom: 20 }}>
        STEP {num} OF 05
      </p>
      <h2
        className={large ? 'r-h1' : 'r-h2'}
        style={{
          fontSize: large ? 44 : 40,
          fontWeight: 800,
          letterSpacing: large ? '-.03em' : '-.025em',
          marginTop: 0,
          marginBottom: large ? 24 : 8,
          lineHeight: large ? 0.93 : 0.96,
        }}
      >
        {heading}
      </h2>
    </>
  )
}
