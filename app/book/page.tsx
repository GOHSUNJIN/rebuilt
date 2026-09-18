'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'
import {
  SERVICE_PARAM_MAP, SERVICE_CATEGORY_MAP, SERVICE_FORMAT_MAP,
  isValidEmail, STEPS,
} from '@/lib/bookData'
import Step1 from '@/components/booking/Step1'
import Step2 from '@/components/booking/Step2'
import Step3 from '@/components/booking/Step3'
import Step4 from '@/components/booking/Step4'
import Step5 from '@/components/booking/Step5'
import Done from '@/components/booking/Done'

// ── Main component ───────────────────────────────────────────────────────────

function BookContent() {
  const searchParams = useSearchParams()
  const [step, setStep]           = useState(1)
  const [category, setCategory]   = useState<string | null>('Rehabilitation')
  const [ptFormat, setPtFormat]   = useState<string | null>(null)
  const [service, setService]     = useState<string | null>(null)
  const [coach, setCoach]         = useState('No preference')
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [slots, setSlots]         = useState<string[]>([])
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')

  const [notes, setNotes]         = useState('')
  const [showError, setShowError] = useState(false)
  const [location, setLocation]   = useState('No preference')
  const contentRef = useRef<HTMLDivElement>(null)
  const mounted    = useRef(false)

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  useEffect(() => {
    const param = searchParams.get('service')
    if (param && SERVICE_PARAM_MAP[param]) {
      setService(SERVICE_PARAM_MAP[param])
      setCategory(SERVICE_CATEGORY_MAP[param] ?? null)
      const fmt = SERVICE_FORMAT_MAP[param]
      if (fmt) setPtFormat(fmt)
      setStep(2)
    }
  }, [searchParams])

  useEffect(() => { setShowError(false) }, [step])

  const toggleSlot = (key: string) => setSlots(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key])

  const canContinue = () => {
    if (step === 1) return !!service
    if (step === 2) return true
    if (step === 3) return slots.length > 0
    if (step === 4) return name.trim() !== '' && isValidEmail(email)
    return true
  }

  const selectCategory = (id: string) => {
    setCategory(id); setPtFormat(null); setSlots([])
    setService(id === 'Performance' || id === 'Physiotherapy' || id === 'Not sure yet' ? id : null)
  }

  const showLocation = category === 'Rehabilitation' || category === 'Training' || category === 'Performance'

  const fmtSlot = (s: string) => {
    const [day, time] = s.split('-')
    if (!day || !time) return s
    const h = parseInt(time, 10)
    const m = parseInt(time.split(':')[1] ?? '0', 10)
    const period = h >= 12 ? 'pm' : 'am'
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${day} ${hour}${m > 0 ? `:${String(m).padStart(2, '0')}` : ''}${period}`
  }

  const fmtSlots = slots.length > 0 ? slots.map(fmtSlot).join(', ') : 'TBC'

  const waText = [
    `Hi Rebuilt Academy,`,
    ``,
    `I'd like to book a consult. Here are my details:`,
    ``,
    `*Booking*`,
    `Service: ${service ?? 'TBC'}`,
    showLocation ? `Location: ${location}` : null,
    `Coach: ${coach}`,
    `Times: ${fmtSlots}`,
    ``,
    `*Contact*`,
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    notes.trim() ? `\nNotes: ${notes.trim()}` : null,
  ].filter((l): l is string => l !== null).join('\n')

  const emailBody = [
    `Hi Rebuilt Academy,`,
    ``,
    `I'd like to book a consultation. Here are my details:`,
    ``,
    `BOOKING`,
    `Service: ${service ?? 'TBC'}`,
    showLocation ? `Location: ${location}` : null,
    `Coach: ${coach}`,
    `Times: ${fmtSlots}`,
    ``,
    `CONTACT`,
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    notes.trim() ? `\nNotes:\n${notes.trim()}` : null,
    ``,
    `Thank you`,
  ].filter((l): l is string => l !== null).join('\n')

  const waUrl = `${SITE.contact.whatsapp}?text=${encodeURIComponent(waText)}`

  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}&su=${encodeURIComponent('Consultation Booking - Rebuilt')}&body=${encodeURIComponent(emailBody)}`

  const summaryRows = [
    { label: 'Service',         value: service },
    { label: 'Coach',           value: coach },
    { label: 'Location',        value: showLocation ? location : null },
    { label: 'Preferred times', value: slots.length > 0 ? slots.map(fmtSlot).join(', ') : null },
    { label: 'Name',            value: name || null },
    { label: 'Email',           value: email || null },
    { label: 'Notes',           value: notes || null },
  ].filter(r => r.value)

  return (
    <div className="book-page-root" style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0B0B0B', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav className="r-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, padding: '0 48px', background: 'rgba(11,12,14,.97)', borderBottom: '1px solid #1E1E1E' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none' }}>
          <Image src="/rebuilt-mark.svg" alt="Rebuilt" width={34} height={34} style={{ display: 'block' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.28em', color: '#FFFFFF', lineHeight: 1 }}>REBUILT ACADEMY</div>
            <div style={{ marginTop: 4, font: '8px/1 ui-monospace,Menlo,monospace', letterSpacing: '.22em', color: 'var(--accent)' }}>SINGAPORE</div>
          </div>
        </Link>
        <Link href="/" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#A5A5A5', textDecoration: 'none' }}>← Close</Link>
      </nav>

      {/* Step indicator */}
      <div className="r-px book-steps" style={{ display: 'flex', alignItems: 'center', padding: '0 48px', borderBottom: '1px solid #1E1E1E', background: '#0B0B0B', overflowX: 'auto' }}>
        {STEPS.map(({ num, label }, i) => {
          const done = step > num; const current = step === num
          return (
            <div key={num} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 0', paddingRight: i < STEPS.length - 1 ? 20 : 0, opacity: done || current ? 1 : 0.3 }}>
                <span style={{ width: 22, height: 22, border: `1px solid ${done || current ? 'var(--accent)' : '#2A2A2A'}`, background: done ? 'var(--accent)' : 'transparent', color: done ? '#0B0B0B' : current ? 'var(--accent)' : '#5f6670', font: '9px/1 ui-monospace,Menlo,monospace', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  {done ? '✓' : num}
                </span>
                <span className="book-step-label" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: current ? '#FFFFFF' : done ? 'var(--accent)' : '#5f6670' }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <span style={{ width: 16, height: 1, background: '#1E1E1E', display: 'block', marginRight: 20, flexShrink: 0 }} />}
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div ref={contentRef} className="r-px book-content" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '52px 48px 80px' }}>
        <div style={{ width: '100%', maxWidth: 600 }}>

          {/* Summary bar (steps 2-5) */}
          {step >= 2 && step < 6 && (service || slots.length > 0) && (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40, padding: '13px 18px', background: '#171717', border: '1px solid #1E1E1E' }}>
              {service && <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.14em' }}>SERVICE: <span style={{ color: '#A5A5A5' }}>{service}</span></span>}
              {coach !== 'No preference' && step > 2 && <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.14em' }}>COACH: <span style={{ color: '#A5A5A5' }}>{coach}</span></span>}
              {slots.length > 0 && <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.14em' }}>TIMES: <span style={{ color: '#A5A5A5' }}>{slots.length} selected</span></span>}
            </div>
          )}

          {step === 1 && <Step1 category={category} ptFormat={ptFormat} service={service} selectCategory={selectCategory} setPtFormat={id => { setPtFormat(id); setService(null) }} setService={setService} />}
          {step === 2 && <Step2 coach={coach} setCoach={setCoach} />}
          {step === 3 && <Step3 activeDay={activeDay} slots={slots} setActiveDay={setActiveDay} toggleSlot={toggleSlot} location={location} setLocation={setLocation} showLocation={showLocation} />}
          {step === 4 && <Step4 name={name} email={email} notes={notes} setName={setName} setEmail={setEmail} setNotes={setNotes} />}
          {step === 5 && <Step5 summaryRows={summaryRows} waUrl={waUrl} gmailUrl={gmailUrl} notSureYet={category === 'Not sure yet'} />}
          {step === 6 && <Done />}

          {/* Navigation (steps 1–4) */}
          {step >= 1 && step <= 4 && (
            <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid #1E1E1E' }}>
              <div className="book-nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {step > 1 && (
                  <button type="button" onClick={() => setStep(s => s - 1)} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid #2A2A2A', color: '#909090', fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                )}
                <button type="button"
                  onClick={() => { if (canContinue()) { setStep(s => s + 1); setShowError(false) } else { setShowError(true) } }}
                  style={{ padding: '14px 36px', background: canContinue() ? 'var(--accent)' : '#1E1E1E', color: canContinue() ? '#0B0B0B' : '#444444', border: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', cursor: canContinue() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'background .2s, color .2s', opacity: canContinue() ? 1 : 0.65 }}
                >
                  Continue →
                </button>
              </div>
              {showError && !canContinue() && (
                <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#B7F000', letterSpacing: '.12em', marginTop: 16, marginBottom: 0 }}>
                  {step === 1 ? 'Please select a session type to continue.' : step === 3 ? 'Please select at least one preferred time slot.' : 'Please enter your name and email to continue.'}
                </p>
              )}
            </div>
          )}

          {/* Back + Done on review step */}
          {step === 5 && (
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #1E1E1E' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#4a5060', letterSpacing: '.12em', margin: '0 0 16px' }}>SENT YOUR REQUEST? CLICK DONE TO FINISH.</p>
              <div className="book-nav" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button type="button" onClick={() => setStep(4)} style={{ padding: '12px 22px', background: 'transparent', border: '1px solid #2A2A2A', color: '#909090', fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                <button type="button" onClick={() => setStep(6)} style={{ padding: '12px 28px', background: 'var(--accent)', border: 'none', color: '#0B0B0B', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0B0B0B' }} />}>
      <BookContent />
    </Suspense>
  )
}
