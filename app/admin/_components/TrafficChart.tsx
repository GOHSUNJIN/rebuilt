'use client'
import { useState } from 'react'
import type { DailyStat, HourlyStat, DOWStat } from '@/lib/analytics'

interface Props {
  daily: DailyStat[]
  hourly: HourlyStat[]
  dow: DOWStat[]
}

type Tab = 'daily' | 'hourly' | 'dow'

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

const X_LABEL: React.CSSProperties = {
  font: '9px/1 ui-monospace,Menlo,monospace',
  color: '#3A3A3A',
}

export default function TrafficChart({ daily, hourly, dow }: Props) {
  const [tab, setTab] = useState<Tab>('daily')

  const peak =
    tab === 'daily'   ? Math.max(...daily.map(d => d.pageviews), 0) :
    tab === 'hourly'  ? Math.max(...hourly.map(h => h.pageviews), 0) :
                        Math.max(...dow.map(d => d.pageviews), 0)

  return (
    <section className="r-px admin-chart" style={{ padding: '36px 48px 32px', borderBottom: '1px solid #2A2A2A' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        {/* Chart type tabs */}
        <div style={{ display: 'flex', gap: 1, background: '#2A2A2A' }}>
          {([['daily', 'DAILY'], ['hourly', 'HOURLY'], ['dow', 'BY DAY']] as [Tab, string][]).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              style={{
                padding: '7px 14px',
                font: '9px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.14em',
                background: tab === id ? 'var(--accent)' : '#171717',
                color: tab === id ? '#0B0B0B' : '#909090',
                border: 'none',
                cursor: 'pointer',
                fontWeight: tab === id ? 700 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {peak > 0 && (
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#444', margin: 0 }}>
            PEAK &nbsp;{fmt(peak)}
          </p>
        )}
      </div>

      <div
        className="admin-chart-bars"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: tab === 'dow' ? 6 : 3,
          height: 180,
        }}
      >
        {tab === 'daily'  && <DailyBars daily={daily} />}
        {tab === 'hourly' && <HourlyBars hourly={hourly} />}
        {tab === 'dow'    && <DOWBars dow={dow} />}
      </div>

      <XAxisLabels tab={tab} daily={daily} hourly={hourly} dow={dow} />
    </section>
  )
}

function DailyBars({ daily }: { daily: DailyStat[] }) {
  if (daily.length === 0) return <p style={{ fontSize: 14, color: '#5f6670', margin: 0 }}>No data yet.</p>
  const max = Math.max(...daily.map(d => d.pageviews), 1)
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
  return (
    <>
      {daily.map((d, i) => (
        <div
          key={i}
          title={`${d.timestamp ? fmtDate(d.timestamp) : ''}: ${d.pageviews.toLocaleString()} views · ${d.visitors.toLocaleString()} visitors`}
          style={{
            flex: 1,
            height: `${Math.max((d.pageviews / max) * 100, 2)}%`,
            background: 'linear-gradient(180deg, #B7F000 0%, rgba(183,240,0,0.18) 100%)',
            borderRadius: '2px 2px 0 0',
            minWidth: 3,
          }}
        />
      ))}
    </>
  )
}

function HourlyBars({ hourly }: { hourly: HourlyStat[] }) {
  if (hourly.length === 0) {
    return (
      <p style={{ fontSize: 14, color: '#5f6670', margin: 0, lineHeight: 1.6 }}>
        Hourly data unavailable for this period.
      </p>
    )
  }
  const max = Math.max(...hourly.map(h => h.pageviews), 1)
  const fmtHour = (iso: string) => {
    const d = new Date(iso)
    return `${d.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })} ${String(d.getUTCHours()).padStart(2, '0')}:00`
  }
  return (
    <>
      {hourly.map((h, i) => (
        <div
          key={i}
          title={`${h.timestamp ? fmtHour(h.timestamp) : ''}: ${h.pageviews.toLocaleString()} views`}
          style={{
            flex: 1,
            height: `${Math.max((h.pageviews / max) * 100, 2)}%`,
            background: 'linear-gradient(180deg, #60a5fa 0%, rgba(96,165,250,0.18) 100%)',
            borderRadius: '2px 2px 0 0',
            minWidth: 2,
          }}
        />
      ))}
    </>
  )
}

function DOWBars({ dow }: { dow: DOWStat[] }) {
  if (dow.every(d => d.pageviews === 0)) {
    return <p style={{ fontSize: 14, color: '#5f6670', margin: 0 }}>No data yet.</p>
  }
  const max = Math.max(...dow.map(d => d.pageviews), 1)
  return (
    <>
      {dow.map((d, i) => (
        <div
          key={i}
          title={`${d.day}: avg ${d.pageviews.toLocaleString()} views/day · ${d.visitors.toLocaleString()} visitors`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: `${Math.max((d.pageviews / max) * 100, 2)}%`,
              background: 'linear-gradient(180deg, #a78bfa 0%, rgba(167,139,250,0.18) 100%)',
              borderRadius: '2px 2px 0 0',
            }}
          />
        </div>
      ))}
    </>
  )
}

function XAxisLabels({ tab, daily, hourly, dow }: { tab: Tab; daily: DailyStat[]; hourly: HourlyStat[]; dow: DOWStat[] }) {
  if (tab === 'daily' && daily.length > 0) {
    const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={X_LABEL}>{fmtDate(daily[0].timestamp)}</span>
        <span style={X_LABEL}>{fmtDate(daily[daily.length - 1].timestamp)}</span>
      </div>
    )
  }

  if (tab === 'hourly' && hourly.length > 0) {
    const fmtHour = (iso: string) => {
      const d = new Date(iso)
      return `${d.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })} ${String(d.getUTCHours()).padStart(2, '0')}:00`
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={X_LABEL}>{fmtHour(hourly[0].timestamp)}</span>
        <span style={X_LABEL}>{fmtHour(hourly[hourly.length - 1].timestamp)}</span>
      </div>
    )
  }

  if (tab === 'dow') {
    return (
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        {dow.map(d => (
          <div key={d.day} style={{ flex: 1, textAlign: 'center' }}>
            <span style={X_LABEL}>{d.day.toUpperCase()}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}
