import type { Metadata } from 'next'
import { loginAction } from '@/app/actions/admin'

export const metadata: Metadata = { title: 'Sign in | Rebuilt Academy' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Brand */}
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.28em',
            color: 'var(--accent)',
            margin: '0 0 48px',
          }}
        >
          REBUILT ACADEMY
        </p>

        <h1
          style={{
            fontSize: 40,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-.03em',
            margin: '0 0 14px',
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

        {error && (
          <div
            style={{
              background: 'rgba(220,60,60,.07)',
              border: '1px solid rgba(220,60,60,.22)',
              padding: '13px 18px',
              marginBottom: 28,
              fontSize: 13,
              lineHeight: 1.5,
              color: '#f87171',
            }}
          >
            Invalid username or password.
          </div>
        )}

        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                font: '9px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.2em',
                color: '#A5A5A5',
                marginBottom: 10,
              }}
            >
              USERNAME
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #2A2A2A',
                padding: '14px 16px',
                fontSize: 14,
                color: '#fff',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                font: '9px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.2em',
                color: '#A5A5A5',
                marginBottom: 10,
              }}
            >
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid #2A2A2A',
                padding: '14px 16px',
                fontSize: 14,
                color: '#fff',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-gold"
            style={{ padding: '16px', marginTop: 4, fontSize: 12, letterSpacing: '.16em' }}
          >
            SIGN IN
          </button>
        </form>

      </div>
    </div>
  )
}
