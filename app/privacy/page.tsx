import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Rebuilt Singapore collects, uses and protects your personal data, in accordance with the PDPA.',
}

const p: CSSProperties = { fontSize: 15, lineHeight: 1.8, color: '#a3aab4', marginTop: 0, marginBottom: 14 }
const ul: CSSProperties = { fontSize: 15, lineHeight: 1.8, color: '#a3aab4', paddingLeft: 20, margin: '0 0 14px' }

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
      width: 32, height: 32, border: '1px solid #4a3d2b', color: '#d99e5c',
      font: '10px/1 ui-monospace,Menlo,monospace', letterSpacing: '.1em',
      display: 'grid', placeItems: 'center', flexShrink: 0,
    }}>
      {n}
    </span>
  )
}

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0b0c0e', color: '#f2f4f7', minHeight: '100vh' }}>
      <div style={{ height: 5, background: '#d99e5c' }} />
      <Navbar />

      {/* ── Header ──────────────────────────────── */}
      <section
        className="r-px"
        style={{
          padding: '72px 48px 56px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #141208 0%, #0b0c0e 65%)',
          borderBottom: '1px solid #212429',
        }}
      >
        <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.24em', marginTop: 0, marginBottom: 20 }}>
          REBUILT · LEGAL
        </p>
        <h1
          className="r-h2"
          style={{ fontSize: 58, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-.025em', marginTop: 0, marginBottom: 22 }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a3aab4', maxWidth: 600, marginTop: 0, marginBottom: 36 }}>
          How Rebuilt collects, uses and protects personal data, in accordance with the Singapore Personal Data Protection Act 2012.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
            LAST UPDATED: 1 JAN 2025
          </span>
          <span style={{ width: 1, height: 12, background: '#2a2e34', display: 'block' }} />
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
            PDPA COMPLIANT
          </span>
          <span style={{ width: 1, height: 12, background: '#2a2e34', display: 'block' }} />
          <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.16em' }}>
            8 SECTIONS
          </span>
        </div>
      </section>

      {/* ── Body ────────────────────────────────── */}
      <div
        className="r-px"
        style={{ padding: '64px 48px 96px', display: 'flex', gap: 80, maxWidth: 1100, margin: '0 auto', boxSizing: 'border-box' }}
      >
        {/* TOC — hidden on mobile via r-hide */}
        <div
          className="r-hide"
          style={{ width: 210, flexShrink: 0, position: 'sticky', top: 60, alignSelf: 'start' }}
        >
          <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#5f6670', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
            CONTENTS
          </p>
          {TOC.map(({ num, id, title }) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover-gold"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '9px 0', borderBottom: '1px solid #1a1d22',
                color: '#5f6670', fontSize: 13, textDecoration: 'none',
                transition: 'color .15s',
              }}
            >
              <span style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#3a3f47', letterSpacing: '.1em', flexShrink: 0, minWidth: 20 }}>
                {num}
              </span>
              {title}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>

          <div id="collect" style={{ paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="01" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>What we collect</h2>
            </div>
            <p style={p}>We collect personal data you provide when using our website or booking with us:</p>
            <ul style={ul}>
              <li>Name, email address and phone number</li>
              <li>Health and injury information relevant to your training or rehabilitation</li>
              <li>Booking details including session type, dates and coach preference</li>
              <li>Payment records (we do not store card details; PayNow payments are processed externally)</li>
              <li>Messages you send us by email, WhatsApp or through website forms</li>
            </ul>
            <p style={p}>We may also collect basic usage data when you visit our website — browser type, pages viewed and approximate location (country level) — via standard server logs.</p>
          </div>

          <div id="use" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="02" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>How we use your information</h2>
            </div>
            <p style={p}>We use your personal data only for the purposes for which it was collected:</p>
            <ul style={ul}>
              <li>Scheduling, confirming and managing your sessions</li>
              <li>Communicating with you about bookings or enquiries</li>
              <li>Tailoring your training or rehabilitation programme to your health history</li>
              <li>Processing payments and issuing receipts</li>
              <li>Responding to feedback or complaints</li>
              <li>Improving our website and services based on anonymised usage patterns</li>
            </ul>
            <p style={p}>We will not use your information for marketing without your explicit consent.</p>
          </div>

          <div id="sharing" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="03" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Who we share your information with</h2>
            </div>
            <p style={p}>We do not sell, rent or trade your personal data. We may share it in limited circumstances:</p>
            <ul style={ul}>
              <li>With your referring physiotherapist, surgeon or clinician, where you have asked us to coordinate your care</li>
              <li>With service providers who support our operations (email, scheduling tools), who are contractually required to protect your data</li>
              <li>Where required by Singapore law or a regulatory authority</li>
            </ul>
          </div>

          <div id="retention" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="04" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>How long we keep your information</h2>
            </div>
            <ul style={ul}>
              <li>Booking and session records are kept for up to 3 years after your last session</li>
              <li>Health and injury information is kept for up to 7 years to comply with health records obligations</li>
              <li>Website usage data is aggregated and anonymised within 90 days</li>
            </ul>
            <p style={p}>When data is no longer required, we delete or anonymise it securely.</p>
          </div>

          <div id="rights" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="05" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Your rights</h2>
            </div>
            <p style={p}>Under the PDPA, you have the right to:</p>
            <ul style={ul}>
              <li><strong style={{ color: '#c2c7ce' }}>Access</strong> &mdash; request a copy of the personal data we hold about you</li>
              <li><strong style={{ color: '#c2c7ce' }}>Correction</strong> &mdash; ask us to correct any inaccurate or incomplete data</li>
              <li><strong style={{ color: '#c2c7ce' }}>Withdrawal of consent</strong> &mdash; withdraw consent for us to use your data, subject to legal or contractual restrictions</li>
              <li><strong style={{ color: '#c2c7ce' }}>Data portability</strong> &mdash; request your data in a structured, machine-readable format where applicable</li>
            </ul>
            <p style={p}>To exercise any of these rights, contact us at {SITE.contact.email}. We will respond within 30 days.</p>
          </div>

          <div id="cookies" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="06" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Cookies</h2>
            </div>
            <p style={p}>Our website uses only strictly necessary cookies to enable core site functionality. We do not use tracking, advertising or analytics cookies that identify individual users.</p>
            <p style={p}>You can refuse or delete cookies through your browser settings. Disabling necessary cookies may affect certain website features.</p>
          </div>

          <div id="security" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48, paddingBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="07" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Data security</h2>
            </div>
            <p style={p}>We take reasonable steps to protect your personal data from unauthorised access, loss or disclosure. Our website uses HTTPS encryption for all data in transit. Access to your personal data is limited to staff who need it to perform their role.</p>
            <p style={p}>No method of electronic transmission or storage is completely secure. If you have concerns, please contact us.</p>
          </div>

          <div id="contact" style={{ borderTop: '1px solid #1a1d22', paddingTop: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <Num n="08" />
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-.01em' }}>Contact</h2>
            </div>
            <p style={p}>For questions about this privacy policy or how we handle your personal data:</p>
            <div style={{ border: '1px solid #1e2126', background: '#111316', padding: '24px 28px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f2f4f7', margin: '0 0 8px' }}>Rebuilt Singapore</p>
              <p style={{ fontSize: 14, color: '#a3aab4', margin: '0 0 6px', lineHeight: 1.6 }}>
                {SITE.address.full}
              </p>
              <a href={`mailto:${SITE.contact.email}`} style={{ fontSize: 14, color: '#d99e5c', textDecoration: 'none' }}>
                {SITE.contact.email}
              </a>
            </div>
            <p style={p}>If you are not satisfied with our response, you may contact the Personal Data Protection Commission (PDPC) at pdpc.gov.sg.</p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
