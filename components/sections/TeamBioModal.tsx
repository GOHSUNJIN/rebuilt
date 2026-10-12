'use client'
import { useState, useRef, useCallback } from 'react'
import { TEAM } from '@/lib/team'
import { getInitials } from '@/lib/utils'
import ScrollDots from '@/components/ui/ScrollDots'
import TeamMemberDrawer, { MemberPlaceholder } from '@/components/sections/TeamMemberDrawer'
import PartnerDrawer from '@/components/sections/PartnerDrawer'
import type { TeamMember } from '@/lib/team'

const TOTAL_CARDS = TEAM.length + 1

export default function TeamBioModal() {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const [showRnB, setShowRnB]   = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / TOTAL_CARDS
    setActiveIdx(Math.min(Math.round(el.scrollLeft / cardWidth), TOTAL_CARDS - 1))
  }, [])

  return (
    <>
      {/* ── Team grid ───────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="r3 r-team-scroll"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#2A2A2A' }}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            role="button"
            tabIndex={0}
            aria-label={`Read ${member.name}'s full bio`}
            className="hover-border"
            style={{ border: '1px solid #1E1E1E', cursor: 'pointer', transition: 'border-color .2s ease' }}
            onClick={() => setSelected(member)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(member) } }}
          >
            {member.image ? (
              <div
                className="r-team-img"
                role="img"
                aria-label={member.name}
                style={{
                  height: 340,
                  flexShrink: 0,
                  backgroundColor: '#0B0B0B',
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: member.imageSize ?? 'cover',
                  backgroundPosition: member.imagePosition ?? 'center top',
                }}
              />
            ) : (
              <MemberPlaceholder initials={getInitials(member.name)} height={340} className="r-team-img" />
            )}
            <div style={{ padding: '24px 22px 26px' }}>
              <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
                {member.role}
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
                {member.name}
              </h3>
              <p className="r-team-bio-full" style={{ fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>
                {member.short}
              </p>
              <p className="r-team-bio-mini" style={{ display: 'none', fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>
                {member.mini}
              </p>
              <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>
                READ FULL BIO →
              </span>
            </div>
          </div>
        ))}

        {/* Rehab & Beyond card */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Read more about Rehab & Beyond"
          className="hover-border"
          style={{ border: '1px solid #1E1E1E', cursor: 'pointer', transition: 'border-color .2s ease', display: 'flex', flexDirection: 'column' }}
          onClick={() => setShowRnB(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowRnB(true) } }}
        >
          <div className="r-team-img" style={{ height: 340, position: 'relative', overflow: 'hidden', background: '#FFFFFF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rnb-logo.png"
              alt="Rehab & Beyond"
              style={{ width: 240, maxWidth: '80%', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 18, left: 22 }}>
              <span style={{ font: '8px/1 ui-monospace,Menlo,monospace', color: 'rgba(0,0,0,.35)', letterSpacing: '.18em' }}>
                GOBEYONDREHAB.SG
              </span>
            </div>
          </div>
          <div style={{ padding: '24px 22px 26px' }}>
            <p style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.2em', marginTop: 0, marginBottom: 10 }}>
              PHYSIOTHERAPY PARTNER
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 10, color: '#FFFFFF' }}>
              Rehab &amp; Beyond
            </h3>
            <p className="r-team-bio-full" style={{ fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>
              AHPC-registered physiotherapists treating sports injuries, post-surgery rehab and musculoskeletal conditions. Named Best Physiotherapy Clinic Singapore 2024.
            </p>
            <p className="r-team-bio-mini" style={{ display: 'none', fontSize: 14, lineHeight: 1.65, color: '#A5A5A5', margin: '0 0 18px' }}>
              AHPC-registered physiotherapists. Named Best Physio <span style={{ whiteSpace: 'nowrap' }}>Clinic Singapore 2024.</span>
            </p>
            <span style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.16em' }}>
              READ MORE →
            </span>
          </div>
        </div>
      </div>

      <ScrollDots count={TOTAL_CARDS} activeIndex={activeIdx} className="r-team-dots" />

      <TeamMemberDrawer member={selected} onClose={() => setSelected(null)} />
      <PartnerDrawer open={showRnB} onClose={() => setShowRnB(false)} />
    </>
  )
}
