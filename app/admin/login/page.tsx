import type { Metadata } from 'next'
import LoginForm from '../_components/LoginForm'

export const metadata: Metadata = { title: 'Sign in | Rebuilt Academy' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Header strip */}
      <div
        className="r-px"
        style={{ padding: '24px 48px', borderBottom: '1px solid #1E1E1E' }}
      >
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.28em',
            color: 'var(--accent)',
            margin: 0,
          }}
        >
          REBUILT ACADEMY
        </p>
      </div>

      {/* Form zone */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-.03em',
              margin: '0 0 12px',
              color: '#fff',
            }}
          >
            Admin access.
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: '#A5A5A5',
              margin: '0 0 40px',
            }}
          >
            Restricted area. Authorised personnel only.
          </p>

          <LoginForm error={!!error} />
        </div>
      </div>

      {/* Footer strip */}
      <div
        className="r-px"
        style={{ padding: '24px 48px', borderTop: '1px solid #1E1E1E' }}
      >
        <p
          style={{
            font: '9px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.2em',
            color: '#2A2A2A',
            margin: 0,
          }}
        >
          INTERNAL USE ONLY
        </p>
      </div>

    </div>
  )
}
