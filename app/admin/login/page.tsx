import type { Metadata } from 'next'
import { loginAction } from '@/app/actions/admin'

export const metadata: Metadata = { title: 'Sign in | Rebuilt Academy' }

const field: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#111315',
  border: '1px solid #252729',
  borderRadius: 6,
  padding: '12px 14px',
  font: '14px/1 inherit',
  color: '#fff',
  outline: 'none',
}

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
        padding: 24,
      }}
    >
      <div style={{ width: '100%', maxWidth: 360 }}>
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            letterSpacing: '.25em',
            color: '#C9A84C',
            margin: '0 0 32px',
          }}
        >
          REBUILT ACADEMY
        </p>

        <h1 style={{ font: '700 24px/1.1 inherit', color: '#fff', margin: '0 0 8px' }}>
          Admin access
        </h1>
        <p style={{ font: '14px/1.5 inherit', color: '#606060', margin: '0 0 32px' }}>
          Restricted area. Authorised personnel only.
        </p>

        {error && (
          <div
            style={{
              background: 'rgba(220,60,60,.1)',
              border: '1px solid rgba(220,60,60,.3)',
              borderRadius: 6,
              padding: '12px 16px',
              marginBottom: 24,
              font: '13px/1.4 inherit',
              color: '#f87171',
            }}
          >
            Invalid username or password.
          </div>
        )}

        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                font: '9px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.2em',
                color: '#606060',
                marginBottom: 8,
              }}
            >
              USERNAME
            </label>
            <input id="username" name="username" type="text" autoComplete="username" required style={field} />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                font: '9px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.2em',
                color: '#606060',
                marginBottom: 8,
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
              style={field}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: 8,
              background: '#C9A84C',
              color: '#0B0C0E',
              border: 'none',
              borderRadius: 6,
              padding: '14px',
              font: '600 13px/1 inherit',
              letterSpacing: '.08em',
              cursor: 'pointer',
            }}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}
