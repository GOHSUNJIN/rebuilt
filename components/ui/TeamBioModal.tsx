'use client'
import Image from 'next/image'
import { useState } from 'react'

interface TeamMember {
  role: string
  name: string
  photo: string
  short: string
  bio: string[]
  credentials: string[]
}

const TEAM: TeamMember[] = [
  {
    role: 'HEAD OF REHAB',
    name: 'James Lim',
    photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    short: 'Registered physiotherapist with 9 years in clinical rehab, specialising in lower limb reconstruction and return-to-sport testing across football and rugby.',
    bio: [
      'James completed his Bachelor of Physiotherapy at NUS and spent six years in a hospital orthopaedic unit before moving into private practice. He has worked extensively with athletes recovering from ACL reconstructions, shoulder dislocations and spinal injuries across football, rugby and combat sports.',
      'At Rebuilt, he leads all rehabilitation programming and is the first point of contact for anyone coming back from surgery or a significant injury. His approach centres on progressive loading — building tissue capacity before returning to full sport.',
      'Outside the studio, James competes in masters athletics and holds a Level 2 athletics coach certification.',
    ],
    credentials: ['B.Phty (NUS)', 'CSCS', 'Level 2 Athletics Coach', '9 years clinical experience'],
  },
  {
    role: 'STRENGTH COACH',
    name: 'Marcus Tan',
    photo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    short: 'Strength and conditioning coach with a background in competitive powerlifting and 7 years coaching athletes from amateur club level to national representation.',
    bio: [
      'Marcus holds a degree in Sports Science from NTU and has worked as a strength and conditioning coach across football, basketball and swimming programmes at both club and national level. He competed in powerlifting for eight years, reaching national level in the 83kg category.',
      'His work at Rebuilt covers one-to-one personal training, pairs sessions and structured performance blocks for athletes. He is known for technical precision in the squat, deadlift and pull patterns, and for building programmes that are genuinely sustainable long-term.',
      'Marcus also runs the gym\'s small group training schedule and designs all in-season and off-season conditioning blocks.',
    ],
    credentials: ['B.Sc Sports Science (NTU)', 'NSCA-CSCS', 'National-level powerlifter', '7 years S&C coaching'],
  },
]

export default function TeamBioModal() {
  const [selected, setSelected] = useState<TeamMember | null>(null)

  return (
    <>
      <div
        className="r3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: '#212429',
        }}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="hover-border"
            style={{
              border: '1px solid #1e2126',
              cursor: 'pointer',
              transition: 'border-color .2s ease',
            }}
            onClick={() => setSelected(member)}
          >
            <div className="img-zoom" style={{ height: 340, overflow: 'hidden', position: 'relative' }}>
              <Image
                src={member.photo}
                alt={member.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ padding: '24px 22px 26px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
                {member.role}
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
                {member.name}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#a3aab4', margin: '0 0 18px' }}>
                {member.short}
              </p>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.16em' }}>
                READ FULL BIO →
              </span>
            </div>
          </div>
        ))}

        {/* Placeholder / hiring card */}
        <div style={{ border: '1px solid #1e2126', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, background: '#111316', display: 'grid', placeItems: 'center', minHeight: 340 }}>
            <span style={{ font: '11px/1 ui-monospace,Menlo,monospace', color: '#2a2e34', letterSpacing: '.2em' }}>
              PHYSIOTHERAPIST
            </span>
          </div>
          <div style={{ padding: '24px 22px 26px' }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#4a3d2b', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
              COMING SOON
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#5f6670' }}>
              Physiotherapist
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#4a4f57', margin: 0 }}>
              Joining ahead of the physiotherapy launch.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bio drawer ──────────────────────────── */}
      {selected && (
        <>
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 1000,
              animation: 'ovIn .2s ease both',
            }}
            onClick={() => setSelected(null)}
          />
          <div
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 500,
              background: '#0f1115', borderLeft: '1px solid #262a30', zIndex: 1001,
              overflowY: 'auto', animation: 'drawerIn .28s cubic-bezier(0.2, 0.7, 0.3, 1) both',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: 20, right: 20, background: 'none',
                border: '1px solid #2a2e34', color: '#a3aab4', width: 36, height: 36,
                cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 14,
                fontFamily: 'inherit', zIndex: 1,
              }}
            >
              ✕
            </button>

            <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
              <Image
                src={selected.photo}
                alt={selected.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="500px"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f1115 0%, transparent 55%)' }} />
            </div>

            <div style={{ padding: '4px 36px 52px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#d99e5c', letterSpacing: '.24em', marginTop: 0, marginBottom: 12 }}>
                {selected.role}
              </p>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', marginTop: 0, marginBottom: 28 }}>
                {selected.name}
              </h2>

              {selected.bio.map((para, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.72, color: '#a3aab4', marginTop: 0, marginBottom: 18 }}>
                  {para}
                </p>
              ))}

              <div style={{ borderTop: '1px solid #1e2126', marginTop: 28, paddingTop: 28 }}>
                <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: '#6f7783', letterSpacing: '.2em', marginTop: 0, marginBottom: 18 }}>
                  CREDENTIALS
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selected.credentials.map((c) => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 4, height: 4, background: '#d99e5c', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: '#c2c7ce' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
