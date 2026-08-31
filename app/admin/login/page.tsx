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
    <>
      <style>{`
        .admin-input { transition: border-color .15s; }
        .admin-input:focus { border-color: #C9A84C !important; outline: none; box-shadow: 0 0 0 3px rgba(201,168,76,.1); }
        .admin-submit:hover { filter: brightness(1.1); }
        .admin-submit:active { filter: brightness(.95); }
      `}</style>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 24,
          background: '#0B0C0E',
        }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>

          {/* Brand mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52 }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: '1px solid #C9A84C',
                borderRadius: 7,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div style={{ width: 10, height: 10, background: '#C9A84C', borderRadius: 2 }} />
            </div>
            <p
              style={{
                font: '10px/1 ui-monospace,Menlo,monospace',
                letterSpacing: '.25em',
                color: '#C9A84C',
                margin: 0,
              }}
            >
              REBUILT ACADEMY
            </p>
          </div>

          <h1 style={{ font: '700 28px/1.05 inherit', color: '#fff', margin: '0 0 10px' }}>
            Admin access
          </h1>
          <p style={{ font: '14px/1.5 inherit', color: '#4A4A4A', margin: '0 0 36px' }}>
            Restricted area. Authorised personnel only.
          </p>

          {error && (
            <div
              style={{
                background: 'rgba(220,60,60,.07)',
                border: '1px solid rgba(220,60,60,.22)',
                borderRadius: 8,
                padding: '13px 16px',
                marginBottom: 28,
                font: '13px/1.4 inherit',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span>Invalid username or password.</span>
            </div>
          )}

          <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label
                htmlFor="username"
                style={{
                  display: 'block',
                  font: '9px/1 ui-monospace,Menlo,monospace',
                  letterSpacing: '.2em',
                  color: '#505050',
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
                className="admin-input"
                style={{
                  width: '100%',
                  background: '#111315',
                  border: '1px solid #222426',
                  borderRadius: 8,
                  padding: '13px 15px',
                  font: '14px/1 inherit',
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
                  color: '#505050',
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
                className="admin-input"
                style={{
                  width: '100%',
                  background: '#111315',
                  border: '1px solid #222426',
                  borderRadius: 8,
                  padding: '13px 15px',
                  font: '14px/1 inherit',
                  color: '#fff',
                }}
              />
            </div>

            <button
              type="submit"
              className="admin-submit"
              style={{
                marginTop: 6,
                background: '#C9A84C',
                color: '#0B0C0E',
                border: 'none',
                borderRadius: 8,
                padding: '15px',
                font: '600 13px/1 inherit',
                letterSpacing: '.07em',
                cursor: 'pointer',
                transition: 'filter .15s',
              }}
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
