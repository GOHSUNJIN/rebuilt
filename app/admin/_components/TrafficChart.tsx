import type { DailyStat } from '@/lib/analytics'

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

const XS: React.CSSProperties = { font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090' }

export default function TrafficChart({ daily }: { daily: DailyStat[] }) {
  const peak = Math.max(...daily.map(d => d.pageviews), 0)
  const max  = Math.max(...daily.map(d => d.pageviews), 1)
  const fmtD = (iso: string) => new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })

  return (
    <section className="r-px admin-chart" style={{ padding: '24px 40px 20px', borderBottom: '1px solid #222' }}>
      {peak > 0 && (
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#909090', margin: '0 0 20px', letterSpacing: '.1em' }}>
          PEAK <span style={{ color: '#C0C0C0' }}>{fmt(peak)}</span>
        </p>
      )}

      <div className="admin-chart-bars" style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 160 }}>
        {!daily.length ? (
          <p style={{ fontSize: 13, color: '#909090', margin: 0 }}>No data.</p>
        ) : daily.map((d, i) => (
          <div
            key={i}
            title={`${d.timestamp ? fmtD(d.timestamp) : ''}: ${d.pageviews.toLocaleString()} views`}
            style={{
              flex: 1,
              height: `${Math.max((d.pageviews / max) * 100, 2)}%`,
              background: 'linear-gradient(180deg,#B7F000 0%,rgba(183,240,0,.15) 100%)',
              borderRadius: '1px 1px 0 0',
              minWidth: 2,
            }}
          />
        ))}
      </div>

      {daily.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={XS}>{fmtD(daily[0].timestamp)}</span>
          <span style={XS}>{fmtD(daily[daily.length - 1].timestamp)}</span>
        </div>
      )}
    </section>
  )
}
