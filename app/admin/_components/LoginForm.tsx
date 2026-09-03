'use client'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { loginAction } from '@/app/actions/admin'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="btn-gold"
      disabled={pending}
      style={{
        padding: '16px',
        marginTop: 4,
        fontSize: 12,
        letterSpacing: '.16em',
        opacity: pending ? 0.7 : 1,
        transition: 'opacity .2s',
        cursor: pending ? 'not-allowed' : 'pointer',
      }}
    >
      {pending ? 'SIGNING IN...' : 'SIGN IN'}
    </button>
  )
}

const INPUT: React.CSSProperties = {
  width: '100%',
  background: '#111',
  border: '1px solid #2A2A2A',
  padding: '14px 16px',
  fontSize: 14,
  color: '#fff',
}

const LABEL: React.CSSProperties = {
  display: 'block',
  font: '9px/1 ui-monospace,Menlo,monospace',
  letterSpacing: '.2em',
  color: '#A5A5A5',
  marginBottom: 10,
}

export default function LoginForm({ error }: { error: boolean }) {
  const [show, setShow] = useState(false)

  return (
    <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {error && (
        <div
          style={{
            background: 'rgba(220,60,60,.07)',
            border: '1px solid rgba(220,60,60,.22)',
            padding: '13px 18px',
            fontSize: 13,
            lineHeight: 1.5,
            color: '#f87171',
          }}
        >
          Invalid username or password.
        </div>
      )}

      <div>
        <label htmlFor="username" style={LABEL}>USERNAME</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          autoFocus
          required
          style={INPUT}
        />
      </div>

      <div>
        <label htmlFor="password" style={LABEL}>PASSWORD</label>
        <div style={{ position: 'relative' }}>
          <input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            required
            style={{ ...INPUT, paddingRight: 68 }}
          />
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#555',
              font: '9px/1 ui-monospace,Menlo,monospace',
              letterSpacing: '.12em',
              cursor: 'pointer',
              padding: 0,
              transition: 'color .15s',
            }}
          >
            {show ? 'HIDE' : 'SHOW'}
          </button>
        </div>
      </div>

      <SubmitButton />

    </form>
  )
}
