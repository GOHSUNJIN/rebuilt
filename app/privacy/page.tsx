import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Rebuilt Academy collects, uses and protects your personal data, in accordance with the PDPA.',
  openGraph: {
    title: 'Privacy Policy',
    description: 'How Rebuilt Academy collects, uses and protects your personal data, in accordance with the PDPA.',
  },
}

const TOC = [
  { num: '01', id: 'collect',   title: 'What we collect' },
  { num: '02', id: 'use',       title: 'How we use it' },
  { num: '03', id: 'sharing',   title: 'Who we share with' },
  { num: '04', id: 'retention', title: 'How long we keep it' },
  { num: '05', id: 'rights',    title: 'Your rights' },
  { num: '06', id: 'cookies',   title: 'Cookies' },
  { num: '07', id: 'security',  title: 'Security' },
  { num: '08', id: 'contact',   title: 'Contact' },
]

function Num({ n }: { n: string }) {
  return (
    <span style={{
      font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)',
      letterSpacing: '.22em', border: '1px solid rgba(183,240,0,.25)',
      padding: '5px 10px', flexShrink: 0,
    }}>
      {n}
    </span>
  )
}

function Section({ id, num, title, children, first = false }: {
  id: string; num: string; title: string; children: React.ReactNode; first?: boolean
}) {
  return (
    <div id={id} style={{ scrollMarginTop: 90, paddingTop: first ? 0 : 56, paddingBottom: 56, borderTop: first ? 'none' : '1px solid #1E1E1E' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
        <Num n={num} />
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-.02em', color: '#FFFFFF', lineHeight: 1.1 }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

const bodyText = { fontSize: 15, lineHeight: 1.8, color: '#A5A5A5', marginTop: 0, marginBottom: 14 } as const

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
      <span style={{ width: 3, height: 3, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, marginTop: 10 }} />
      <p style={{ ...bodyText, marginBottom: 0 }}>{children}</p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, padding: '14px 20px', borderBottom: '1px solid #1E1E1E' }}>
      <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.14em', flexShrink: 0, paddingTop: 2 }}>
        {label.toUpperCase()}
      </span>
      <span style={{ fontSize: 13.5, color: '#A5A5A5', textAlign: 'right', lineHeight: 1.5 }}>{value}</span>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0B0B0B', color: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Header ────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid #2A2A2A', background: '#0B0B0B' }}>
        {/* Breadcrumb */}
        <div className="r-px" style={{ padding: '16px 48px', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/" style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em', textDecoration: 'none' }}>REBUILT</Link>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#333333' }}>/</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em' }}>LEGAL</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#333333' }}>/</span>
          <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em' }}>PRIVACY POLICY</span>
        </div>

        {/* Title area */}
        <div className="r-px" style={{ padding: '56px 48px 52px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: 40, font: '200px/0.82 ui-monospace,Menlo,monospace', color: 'rgba(183,240,0,.04)', fontWeight: 700, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-.05em' }}>
            §
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <h1 className="r-h1" style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.9, letterSpacing: '-.04em', margin: '0 0 24px', color: '#FFFFFF' }}>
                Privacy<br />Policy.
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#A5A5A5', maxWidth: 460, margin: 0 }}>
                How Rebuilt Academy collects, uses and protects personal data, in accordance with the Singapore Personal Data Protection Act 2012.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }} className="r-hide">
              {[
                { label: 'LAST UPDATED', value: '4 AUG 2026' },
                { label: 'JURISDICTION', value: 'Singapore · PDPA' },
                { label: 'SECTIONS', value: '8' },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'right' }}>
                  <p style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.18em', margin: '0 0 4px' }}>{label}</p>
                  <p style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#909090', letterSpacing: '.12em', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────── */}
      <div className="r-px" style={{ padding: '72px 48px', display: 'flex', gap: 72, maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box' }}>

        {/* TOC */}
        <div className="r-hide" style={{ width: 196, flexShrink: 0, position: 'sticky', top: 90, alignSelf: 'start' }}>
          <div style={{ borderLeft: '2px solid #1E1E1E', paddingLeft: 20 }}>
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.22em', marginTop: 0, marginBottom: 22 }}>CONTENTS</p>
            {TOC.map(({ num, id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover-gold"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 0', borderBottom: '1px solid #171717',
                  color: '#6f7783', fontSize: 13, textDecoration: 'none',
                  transition: 'color .15s',
                }}
              >
                <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.1em', flexShrink: 0, minWidth: 16 }}>
                  {num}
                </span>
                {title}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid #1E1E1E' }}>
            <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.18em', marginTop: 0, marginBottom: 10 }}>QUESTIONS?</p>
            <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: 'var(--accent)', textDecoration: 'none', lineHeight: 1.5 }}>
              {SITE.contact.email}
            </a>
          </div>
        </div>

        {/* Sections */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <Section id="collect" num="01" title="What we collect" first>
            <p style={bodyText}>We collect personal data you provide when using our website or booking with us:</p>
            <div style={{ marginBottom: 16 }}>
              {[
                'Name, email address and phone number',
                'Health and injury information relevant to your training or rehabilitation',
                'Booking details including session type, dates and coach preference',
                'Payment records (we do not store card details; PayNow payments are processed externally)',
                'Messages you send us by email, WhatsApp or through website forms',
              ].map(item => <Bullet key={item}>{item}</Bullet>)}
            </div>
            <p style={bodyText}>We may also collect basic usage data when you visit our website (browser type, pages viewed and approximate location at country level) via standard server logs.</p>
          </Section>

          <Section id="use" num="02" title="How we use your information">
            <p style={bodyText}>We use your personal data only for the purposes for which it was collected:</p>
            <div style={{ marginBottom: 16 }}>
              {[
                'Scheduling, confirming and managing your sessions',
                'Communicating with you about bookings or enquiries',
                'Tailoring your training or rehabilitation programme to your health history',
                'Processing payments and issuing receipts',
                'Responding to feedback or complaints',
                'Improving our website and services based on anonymised usage patterns',
              ].map(item => <Bullet key={item}>{item}</Bullet>)}
            </div>
            <p style={bodyText}>We will not use your information for marketing without your explicit consent.</p>
          </Section>

          <Section id="sharing" num="03" title="Who we share your information with">
            <p style={bodyText}>We do not sell, rent or trade your personal data. We may share it in limited circumstances:</p>
            <div style={{ marginBottom: 0 }}>
              {[
                'With your referring physiotherapist, surgeon or clinician, where you have asked us to coordinate your care',
                'With service providers who support our operations (email, scheduling tools), who are contractually required to protect your data',
                'Where required by Singapore law or a regulatory authority',
              ].map(item => <Bullet key={item}>{item}</Bullet>)}
            </div>
          </Section>

          <Section id="retention" num="04" title="How long we keep your information">
            <div style={{ border: '1px solid #1E1E1E', background: '#171717', marginBottom: 20, overflow: 'hidden' }}>
              <InfoRow label="Booking & session records" value="Up to 3 years after your last session" />
              <InfoRow label="Health & injury information" value="Up to 7 years (health records obligations)" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, padding: '14px 20px' }}>
                <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.14em', flexShrink: 0, paddingTop: 2 }}>
                  WEBSITE USAGE DATA
                </span>
                <span style={{ fontSize: 13.5, color: '#A5A5A5', textAlign: 'right', lineHeight: 1.5 }}>Aggregated and anonymised within 90 days</span>
              </div>
            </div>
            <p style={bodyText}>When data is no longer required, we delete or anonymise it securely.</p>
          </Section>

          <Section id="rights" num="05" title="Your rights">
            <p style={bodyText}>Under the PDPA, you have the right to:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 20 }}>
              {[
                { right: 'Access', desc: 'Request a copy of the personal data we hold about you.' },
                { right: 'Correction', desc: 'Ask us to correct any inaccurate or incomplete data.' },
                { right: 'Withdrawal of consent', desc: 'Withdraw consent for us to use your data, subject to legal or contractual restrictions.' },
                { right: 'Data portability', desc: 'Request your data in a structured, machine-readable format where applicable.' },
              ].map(({ right, desc }) => (
                <div key={right} style={{ background: '#171717', border: '1px solid #1E1E1E', padding: '16px 20px' }}>
                  <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', margin: '0 0 7px' }}>
                    {right.toUpperCase()}
                  </p>
                  <p style={{ fontSize: 14, color: '#A5A5A5', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
            <p style={bodyText}>To exercise any of these rights, contact us at{' '}
              <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>{SITE.contact.email}</a>.
              {' '}We will respond within 30 days.
            </p>
          </Section>

          <Section id="cookies" num="06" title="Cookies">
            <p style={bodyText}>Our website uses only strictly necessary cookies to enable core site functionality. We do not use tracking, advertising or analytics cookies that identify individual users.</p>
            <p style={bodyText}>You can refuse or delete cookies through your browser settings. Disabling necessary cookies may affect certain website features.</p>
          </Section>

          <Section id="security" num="07" title="Data security">
            <p style={bodyText}>We take reasonable steps to protect your personal data from unauthorised access, loss or disclosure. Our website uses HTTPS encryption for all data in transit. Access to your personal data is limited to staff who need it to perform their role.</p>
            <p style={bodyText}>No method of electronic transmission or storage is completely secure. If you have concerns, please contact us.</p>
          </Section>

          <Section id="contact" num="08" title="Contact">
            <p style={bodyText}>For questions about this privacy policy or how we handle your personal data:</p>
            <div style={{ background: '#171717', border: '1px solid #1E1E1E', borderLeft: '2px solid var(--accent)', padding: '24px 28px', marginBottom: 20 }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', margin: '0 0 12px' }}>REBUILT ACADEMY</p>
              <p style={{ fontSize: 14, color: '#6f7783', margin: '0 0 10px', lineHeight: 1.6 }}>
                Core Collective · Robinson, Dempsey &amp; Katong
              </p>
              <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(SITE.contact.email)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                {SITE.contact.email}
              </a>
            </div>
            <p style={bodyText}>If you are not satisfied with our response, you may contact the Personal Data Protection Commission (PDPC) at{' '}
              <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>pdpc.gov.sg</a>.
            </p>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
