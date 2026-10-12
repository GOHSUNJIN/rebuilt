'use client'
import type { Step5Props } from './types'
import StepHeader from './StepHeader'

export default function Step5({ summaryRows, waUrl, notSureYet, onSubmit, submitting, submitError, onSent }: Step5Props) {
  return (
    <>
      <StepHeader step={5} heading="Review & send" />
      <p style={{ fontSize: 15, color: '#A5A5A5', marginTop: 0, marginBottom: notSureYet ? 20 : 36 }}>
        Check your details, then send your request. We&apos;ll confirm your slot within the day.
      </p>

      {notSureYet && (
        <div style={{ padding: '14px 18px', background: 'rgba(183,240,0,.07)', border: '1px solid rgba(183,240,0,.2)', marginBottom: 28 }}>
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', margin: '0 0 8px' }}>NOT SURE YET</p>
          <p style={{ fontSize: 13, color: '#A5A5A5', margin: 0, lineHeight: 1.55 }}>No problem. We&apos;ll reach out to find the right programme for you before confirming anything.</p>
        </div>
      )}

      <div style={{ border: '1px solid #1E1E1E', background: '#171717', padding: '28px 24px', marginBottom: 28 }}>
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

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        style={{
          width: '100%',
          padding: '16px 28px',
          background: submitting ? '#1E1E1E' : 'var(--accent)',
          color: submitting ? '#555' : '#0B0B0B',
          border: 'none',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          cursor: submitting ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'background .2s, color .2s',
        }}
      >
        {submitting ? 'Sending…' : 'Send booking request →'}
      </button>

      {submitError && (
        <div style={{ marginTop: 16 }}>
          <p style={{ font: '11px/1.6 ui-monospace,Menlo,monospace', color: '#e07070', letterSpacing: '.1em', margin: '0 0 14px' }}>
            {submitError}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', textDecoration: 'none' }}
            onClick={() => setTimeout(onSent, 400)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z" />
            </svg>
            Send via WhatsApp instead
          </a>
        </div>
      )}
    </>
  )
}
