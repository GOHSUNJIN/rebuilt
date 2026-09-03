'use client'
import { useState } from 'react'
import type { DailyStat, DOWStat } from '@/lib/analytics'

interface Props {
  daily: DailyStat[]
  dow: DOWStat[]
}

type Tab = 'daily' | 'dow'

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export default function TrafficChart({ daily, dow }: Props) {
  const [tab, setTab] = useState<Tab>('daily')

  const peak = tab === 'daily'
    ? Math.max(...daily.map(d => d.pageviews), 0)
    : Math.max(...dow.map(d => d.pageviews), 0)

  return (
    <section className="r-px admin-chart" style={{ padding: '36px 48px 32px', borderBottom: '1px solid #2A2A2A' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 0, border: '1px solid #2A2A2A' }}>
          {([['daily', 'DAILY'] , ['dow', 'BY DAY OF WEEK']] as [Tab, string][]).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              style={{
                padding: '10px 20px',
                font: '11px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.16em',
                background: tab === id ? 'var(--accent)' : '#111',
                color: tab === id ? '#0B0B0B' : '#909090',
                border: 'none',
                borderRight: id === 'daily' ? '1px solid #2A2A2A' : 'none',
                cursor: 'pointer',
                fontWeight: tab === id ? 700 : 400,
                transition: 'background .15s, color .15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {peak > 0 && (
          <p style={{ font: '12px/1 ui-monospace,Menlo,monospace', color: '#6B7280', margin: 0, letterSpacing: '.1em' }}>
            PEAK &nbsp;<span style={{ color: '#C0C0C0', fontWeight: 600 }}>{fmt(peak)}</span>
          </p>
        )}
      </div>

      <div
        className="admin-chart-bars"
        style={{ display: 'flex', alignItems: 'flex-end', gap: tab === 'dow' ? 8 : 3, height: 180 }}
      >
        {tab === 'daily' ? <DailyBars daily={daily} /> : <DOWBars dow={dow} />}
      </div>

      <XAxisLabels tab={tab} daily={daily} dow={dow} />
    </section>
  )
}

function DailyBars({ daily }: { daily: DailyStat[] }) {
  if (daily.length === 0) return <p style={{ fontSize: 15, color: '#909090', margin: 0 }}>No data yet.</p>
  const max = Math.max(...daily.map(d => d.pageviews), 1)
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
  return (
    <>
      {daily.map((d, i) => (
        <div
          key={i}
          title={`${d.timestamp ? fmtDate(d.timestamp) : ''}: ${d.pageviews.toLocaleString()} views, ${d.visitors.toLocaleString()} visitors`}
          style={{
            flex: 1,
            height: `${Math.max((d.pageviews / max) * 100, 2)}%`,
            background: 'linear-gradient(180deg, #B7F000 0%, rgba(183,240,0,0.20) 100%)',
            borderRadius: '2px 2px 0 0',
            minWidth: 3,
          }}
        />
      ))}
    </>
  )
}

function DOWBars({ dow }: { dow: DOWStat[] }) {
  if (dow.every(d => d.pageviews === 0)) {
    return <p style={{ fontSize: 15, color: '#909090', margin: 0 }}>No data yet.</p>
  }
  const max = Math.max(...dow.map(d => d.pageviews), 1)
  return (
    <>
      {dow.map((d, i) => (
        <div
          key={i}
          title={`${d.day}: avg ${d.pageviews.toLocaleString()} views/day`}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}
        >
          <div
            style={{
              width: '100%',
              height: `${Math.max((d.pageviews / max) * 100, 2)}%`,
              background: 'linear-gradient(180deg, #a78bfa 0%, rgba(167,139,250,0.22) 100%)',
              borderRadius: '2px 2px 0 0',
            }}
          />
        </div>
      ))}
    </>
  )
}

const X: React.CSSProperties = { font: '11px/1 ui-monospace,Menlo,monospace', color: '#6B7280', letterSpacing: '.06em' }

function XAxisLabels({ tab, daily, dow }: { tab: Tab; daily: DailyStat[]; dow: DOWStat[] }) {
  if (tab === 'daily' && daily.length > 0) {
    const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <span style={X}>{fmtDate(daily[0].timestamp)}</span>
        <span style={X}>{fmtDate(daily[daily.length - 1].timestamp)}</span>
      </div>
    )
  }
  if (tab === 'dow') {
    return (
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {dow.map(d => (
          <div key={d.day} style={{ flex: 1, textAlign: 'center' }}>
            <span style={X}>{d.day.slice(0, 3).toUpperCase()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}
