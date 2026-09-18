'use client'
import type { Step5Props } from './types'
import StepHeader from './StepHeader'

export default function Step5({ summaryRows, waUrl, gmailUrl, notSureYet, onSent }: Step5Props) {
  return (
    <>
      <StepHeader step={5} heading="Review & send" />
      <p style={{ fontSize: 15, color: '#A5A5A5', marginTop: 0, marginBottom: notSureYet ? 20 : 36 }}>
        Check your details, then send your request. We&apos;ll confirm your slot and arrange payment shortly.
      </p>
      {notSureYet && (
        <div style={{ padding: '14px 18px', background: 'rgba(183,240,0,.07)', border: '1px solid rgba(183,240,0,.2)', marginBottom: 28 }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', margin: '0 0 8px' }}>NOT SURE YET</p>
          <p style={{ fontSize: 13, color: '#A5A5A5', margin: 0, lineHeight: 1.55 }}>No problem. We&apos;ll reach out to find the right programme for you before confirming anything.</p>
        </div>
      )}
      <div style={{ border: '1px solid #1E1E1E', background: '#171717', padding: '28px 24px', marginBottom: 24 }}>
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.16em', marginTop: 0, marginBottom: 20 }}>YOUR REQUEST</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {summaryRows.map(({ label, value }, i) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, padding: '12px 0', borderBottom: i < summaryRows.length - 1 ? '1px solid #1E1E1E' : 'none' }}>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.14em', flexShrink: 0, paddingTop: 2 }}>{label.toUpperCase()}</span>
              <span style={{ fontSize: 14, color: '#A5A5A5', textAlign: 'right', lineHeight: 1.5 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.14em', marginBottom: 16, marginTop: 0 }}>SEND YOUR REQUEST VIA</p>
      <div className="book-nav" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(onSent, 400)} className="btn-gold" style={{ padding: '15px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z" />
          </svg>
          WhatsApp
        </a>
        <a href={gmailUrl} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(onSent, 400)} className="btn-outline" style={{ padding: '15px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
          Email
        </a>
      </div>
    </>
  )
}
