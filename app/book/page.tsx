'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SERVICES = [
  { label: 'Assessment', sub: '45 min · from SGD 120' },
  { label: 'Single session', sub: '60 min · from SGD 150' },
  { label: 'Block of sessions', sub: 'Save with a block · from SGD 130/session' },
  { label: 'Pairs session', sub: 'Train with a partner · from SGD 90/person' },
  { label: 'Performance assessment', sub: '60 min · from SGD 150' },
  { label: 'Not sure yet', sub: 'We will help you choose' },
]

const COACHES = [
  { label: 'James Lim', sub: 'Head of Rehab' },
  { label: 'Marcus Tan', sub: 'Head of Training' },
  { label: 'No preference', sub: 'First available' },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TIMES = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const STEPS = [
  { num: 1, label: 'Service' },
  { num: 2, label: 'Coach' },
  { num: 3, label: 'Time' },
  { num: 4, label: 'Details' },
  { num: 5, label: 'Deposit' },
  { num: 6, label: 'Confirmed' },
]

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState<string | null>(null)
  const [coach, setCoach] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const canContinue = () => {
    if (step === 1) return service !== null
    if (step === 2) return coach !== null
    if (step === 3) return slot !== null
    if (step === 4) return name.trim() !== '' && email.trim() !== ''
    return true
  }

  return (
    <div
      style={{
        fontFamily: 'Archivo,Helvetica,Arial,sans-serif',
        background: '#0b0c0e',
        color: '#f2f4f7',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Gold strip */}
      <div style={{ height: 5, background: '#d99e5c' }} />

      {/* Simplified nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 48px',
          background: '#0b0c0e',
          borderBottom: '1px solid #212429',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'block',
              flexShrink: 0,
              background: '#0b0c0e',
              position: 'relative',
            }}
          >
            <Image
              src="/logo.jpeg"
              alt="Rebuilt"
              width={84}
              height={84}
              style={{ position: 'absolute', width: '250%', height: 'auto', top: '-41%', left: '-75%' }}
            />
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '.34em', color: '#f2f4f7' }}>
            REBUILT
          </span>
        </Link>
        <Link
          href="/"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: '#8d95a0',
          }}
        >
          ← Close
        </Link>
      </nav>

      {/* Info bar */}
      <div
        style={{
          background: '#111316',
          borderBottom: '1px solid #1e2126',
          padding: '12px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <span
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            color: '#6f7783',
            letterSpacing: '.18em',
          }}
        >
          BOOK A SESSION
        </span>
        <span style={{ width: 1, height: 14, background: '#2a2e34', display: 'block' }} />
        <span
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            color: '#5f6670',
            letterSpacing: '.14em',
          }}
        >
          SINGAPORE · Mon-Fri 7am-9pm · Sat 8am-2pm
        </span>
      </div>

      {/* Step indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
          borderBottom: '1px solid #1e2126',
          background: '#0b0c0e',
        }}
      >
        {STEPS.map(({ num, label }, i) => {
          const done = step > num
          const current = step === num
          return (
            <div
              key={num}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '18px 0',
                  paddingRight: i < STEPS.length - 1 ? 32 : 0,
                  opacity: done || current ? 1 : 0.4,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    border: `1px solid ${done ? '#d99e5c' : current ? '#d99e5c' : '#2a2e34'}`,
                    background: done ? '#d99e5c' : 'transparent',
                    color: done ? '#0b0c0e' : current ? '#d99e5c' : '#5f6670',
                    font: '9px/1 ui-monospace,Menlo,monospace',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {done ? '✓' : num}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: current ? '#f2f4f7' : done ? '#d99e5c' : '#5f6670',
                  }}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: '#1e2126',
                    display: 'block',
                    marginRight: 32,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 0,
        }}
      >
        {/* Left – step content */}
        <div style={{ padding: '52px 48px', borderRight: '1px solid #1e2126' }}>
          {step === 1 && (
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  marginTop: 0,
                  marginBottom: 8,
                }}
              >
                What are you booking?
              </h2>
              <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 32 }}>
                Pick the session type that fits.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SERVICES.map(({ label, sub }) => (
                  <button
                    key={label}
                    onClick={() => setService(label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 20px',
                      background: service === label ? '#15181c' : '#111316',
                      border: `1px solid ${service === label ? '#d99e5c' : '#1e2126'}`,
                      color: '#f2f4f7',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all .15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px', color: '#f2f4f7' }}>
                        {label}
                      </p>
                      <p style={{ fontSize: 12, color: '#79818c', margin: 0 }}>{sub}</p>
                    </div>
                    {service === label && (
                      <span style={{ color: '#d99e5c', fontSize: 16 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  marginTop: 0,
                  marginBottom: 8,
                }}
              >
                Choose a coach
              </h2>
              <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 32 }}>
                Or let us pick the best fit.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {COACHES.map(({ label, sub }) => (
                  <button
                    key={label}
                    onClick={() => setCoach(label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 20px',
                      background: coach === label ? '#15181c' : '#111316',
                      border: `1px solid ${coach === label ? '#d99e5c' : '#1e2126'}`,
                      color: '#f2f4f7',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all .15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px', color: '#f2f4f7' }}>
                        {label}
                      </p>
                      <p style={{ fontSize: 12, color: '#79818c', margin: 0 }}>{sub}</p>
                    </div>
                    {coach === label && (
                      <span style={{ color: '#d99e5c', fontSize: 16 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  marginTop: 0,
                  marginBottom: 8,
                }}
              >
                Pick a time
              </h2>
              <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 32 }}>
                Available slots this week.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                {DAYS.map((day) => (
                  <div
                    key={day}
                    style={{
                      font: '10px/1 ui-monospace,Menlo,monospace',
                      color: '#6f7783',
                      letterSpacing: '.16em',
                      textAlign: 'center',
                      paddingBottom: 8,
                      borderBottom: '1px solid #1e2126',
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 8,
                }}
              >
                {DAYS.map((day) =>
                  TIMES.map((time) => {
                    const key = `${day}-${time}`
                    const isSelected = slot === key
                    return (
                      <button
                        key={key}
                        onClick={() => setSlot(key)}
                        style={{
                          padding: '10px 4px',
                          fontSize: 12,
                          background: isSelected ? '#d99e5c' : '#111316',
                          border: `1px solid ${isSelected ? '#d99e5c' : '#1e2126'}`,
                          color: isSelected ? '#0b0c0e' : '#a3aab4',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'all .15s',
                        }}
                      >
                        {time}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  marginTop: 0,
                  marginBottom: 8,
                }}
              >
                Your details
              </h2>
              <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 32 }}>
                We need a few things before we confirm the session.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label
                      style={{
                        font: '10px/1 ui-monospace,Menlo,monospace',
                        color: '#6f7783',
                        letterSpacing: '.16em',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      NAME *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      style={{
                        width: '100%',
                        padding: '13px 14px',
                        background: '#14161a',
                        border: '1px solid #262a30',
                        color: '#f2f4f7',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        font: '10px/1 ui-monospace,Menlo,monospace',
                        color: '#6f7783',
                        letterSpacing: '.16em',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        padding: '13px 14px',
                        background: '#14161a',
                        border: '1px solid #262a30',
                        color: '#f2f4f7',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      font: '10px/1 ui-monospace,Menlo,monospace',
                      color: '#6f7783',
                      letterSpacing: '.16em',
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    PHONE
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+65 0000 0000"
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      background: '#14161a',
                      border: '1px solid #262a30',
                      color: '#f2f4f7',
                      fontSize: 14,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      font: '10px/1 ui-monospace,Menlo,monospace',
                      color: '#6f7783',
                      letterSpacing: '.16em',
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    ANYTHING WE SHOULD KNOW?
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Injury history, goals, questions..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      background: '#14161a',
                      border: '1px solid #262a30',
                      color: '#f2f4f7',
                      fontSize: 14,
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  marginTop: 0,
                  marginBottom: 8,
                }}
              >
                Deposit to confirm
              </h2>
              <p style={{ fontSize: 15, color: '#a3aab4', marginTop: 0, marginBottom: 32 }}>
                A deposit holds your slot. The rest is paid on the day.
              </p>
              <div
                style={{
                  border: '1px solid #1e2126',
                  background: '#111316',
                  padding: '28px 24px',
                  maxWidth: 420,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontSize: 14, color: '#a3aab4' }}>Deposit amount</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: '#f2f4f7' }}>
                    SGD 50
                  </span>
                </div>
                <p
                  style={{
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    color: '#5f6670',
                    letterSpacing: '.14em',
                    margin: 0,
                  }}
                >
                  DEDUCTED FROM YOUR SESSION TOTAL
                </p>
              </div>
              <div
                style={{
                  border: '1px solid #2a2e34',
                  background: '#0e1013',
                  padding: '20px',
                  maxWidth: 420,
                }}
              >
                <p
                  style={{
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    color: '#6f7783',
                    letterSpacing: '.16em',
                    marginTop: 0,
                    marginBottom: 10,
                  }}
                >
                  PAYMENT
                </p>
                <p style={{ fontSize: 14, color: '#a3aab4', margin: 0 }}>
                  [ Payment integration placeholder — Stripe or similar ]
                </p>
              </div>
            </div>
          )}

          {step === 6 && (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  border: '1px solid #d99e5c',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 28px',
                  color: '#d99e5c',
                  fontSize: 22,
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  marginTop: 0,
                  marginBottom: 12,
                }}
              >
                You&apos;re booked.
              </h2>
              <p style={{ fontSize: 16, color: '#a3aab4', marginTop: 0, marginBottom: 32 }}>
                Confirmation has been sent to {email || 'your email'}. We&apos;ll see you
                soon.
              </p>
              <Link href="/" className="btn-outline" style={{ padding: '14px 28px' }}>
                Back to home
              </Link>
            </div>
          )}
        </div>

        {/* Right – sticky summary */}
        <div
          style={{
            background: '#0e1013',
            borderLeft: '1px solid #1e2126',
            padding: '40px 32px',
            position: 'sticky',
            top: 0,
            alignSelf: 'start',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <p
            style={{
              font: '10px/1 ui-monospace,Menlo,monospace',
              color: '#6f7783',
              letterSpacing: '.2em',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            SUMMARY
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <p
                style={{
                  font: '9px/1 ui-monospace,Menlo,monospace',
                  color: '#5f6670',
                  letterSpacing: '.16em',
                  marginBottom: 5,
                  marginTop: 0,
                }}
              >
                SERVICE
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: service ? '#f2f4f7' : '#3a3f47',
                  margin: 0,
                }}
              >
                {service || '—'}
              </p>
            </div>
            <div>
              <p
                style={{
                  font: '9px/1 ui-monospace,Menlo,monospace',
                  color: '#5f6670',
                  letterSpacing: '.16em',
                  marginBottom: 5,
                  marginTop: 0,
                }}
              >
                COACH
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: coach ? '#f2f4f7' : '#3a3f47',
                  margin: 0,
                }}
              >
                {coach || '—'}
              </p>
            </div>
            <div>
              <p
                style={{
                  font: '9px/1 ui-monospace,Menlo,monospace',
                  color: '#5f6670',
                  letterSpacing: '.16em',
                  marginBottom: 5,
                  marginTop: 0,
                }}
              >
                TIME
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: slot ? '#f2f4f7' : '#3a3f47',
                  margin: 0,
                }}
              >
                {slot ? slot.replace('-', ' · ') : '—'}
              </p>
            </div>
          </div>

          {step >= 5 && (
            <div
              style={{
                borderTop: '1px solid #1e2126',
                paddingTop: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    font: '10px/1 ui-monospace,Menlo,monospace',
                    color: '#6f7783',
                    letterSpacing: '.16em',
                  }}
                >
                  DEPOSIT
                </span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#f2f4f7' }}>
                  [ V-72 ]
                </span>
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #1e2126', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {step < 6 && (
              <button
                onClick={() => {
                  if (canContinue()) setStep((s) => s + 1)
                }}
                disabled={!canContinue()}
                className={canContinue() ? 'btn-gold' : ''}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: canContinue() ? '#d99e5c' : '#1a1d22',
                  color: canContinue() ? '#0b0c0e' : '#4a4f57',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  cursor: canContinue() ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  transition: 'all .2s',
                }}
              >
                {step === 5 ? 'Pay deposit' : 'Continue'}
              </button>
            )}
            {step > 1 && step < 6 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: '1px solid #2a2e34',
                  color: '#8d95a0',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
