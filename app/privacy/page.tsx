import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = { title: 'Privacy' }

export default function PrivacyPage() {
  return (
    <div
      style={{
        fontFamily: 'Archivo,Helvetica,Arial,sans-serif',
        background: '#0b0c0e',
        color: '#f2f4f7',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      {/* Draft notice */}
      <div
        style={{
          background: '#2a1f10',
          border: '1px solid #4a3d2b',
          borderLeft: '3px solid #d99e5c',
          padding: '14px 48px',
          fontSize: 13,
          color: '#c2975a',
          letterSpacing: '.02em',
        }}
      >
        Draft placeholder. This privacy policy needs to be written or reviewed before the
        site goes live.
      </div>

      <div style={{ padding: '76px 48px' }}>
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            color: '#d99e5c',
            letterSpacing: '.24em',
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          LEGAL
        </p>
        <h1
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 0.96,
            letterSpacing: '-.025em',
            marginTop: 0,
            marginBottom: 28,
          }}
        >
          Privacy
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: '#a3aab4',
            maxWidth: 680,
            marginTop: 0,
            marginBottom: 32,
          }}
        >
          [ T-66 · 20-30 word introduction to the privacy policy — what data is collected
          and how it is used ]
        </p>
        <p
          style={{
            font: '10px/1 ui-monospace,Menlo,monospace',
            color: '#5f6670',
            letterSpacing: '.16em',
            marginTop: 0,
          }}
        >
          LAST UPDATED: [ V-41 · date last updated ]
        </p>

        {/* Placeholder sections */}
        <div
          style={{
            maxWidth: 680,
            marginTop: 56,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          {[
            'What information we collect',
            'How we use your information',
            'How we store your information',
            'Your rights',
            'Cookies',
            'Contact',
          ].map((section) => (
            <div key={section} style={{ borderTop: '1px solid #1e2126', paddingTop: 28 }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: 14,
                  letterSpacing: '-.01em',
                }}
              >
                {section}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#a3aab4', margin: 0 }}>
                [ Placeholder text for the &ldquo;{section}&rdquo; section — to be written
                before launch ]
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
