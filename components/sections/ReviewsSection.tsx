'use client'
import { useState, useEffect } from 'react'
import CountUp from '@/components/ui/CountUp'

const REVIEW_POOL = [
  { stars: '★★★★★', text: 'Came in eight weeks post-ACL with no idea what was safe. Weekly testing meant I could see the improvement clearly every session.', name: 'Daniel C.', role: 'REHAB CLIENT' },
  { stars: '★★★★★', text: 'Never had a properly periodised programme in six years of training. One block and my numbers moved more than three years of going on my own.', name: 'Priya S.', role: 'TRAINING CLIENT' },
  { stars: '★★★★★', text: 'They film your lifts, track every metric and adjust when something is not working. Different standard of coaching from anywhere else I have trained.', name: 'Wei Jian T.', role: 'TRAINING CLIENT' },
  { stars: '★★★★★', text: 'Came in with a two-year-old shoulder injury and left with an actual plan. First time anyone sat down and explained exactly what was happening and why.', name: 'Aisha B.', role: 'REHAB CLIENT' },
  { stars: '★★★★★', text: 'My sprint numbers went up 8% across a 12-week block. The testing at both ends made the whole thing feel real, not just motivational.', name: 'Jun Hao L.', role: 'PERFORMANCE CLIENT' },
  { stars: '★★★★★', text: 'Three months in and I am lifting numbers I never hit before. The programme adapts when life gets in the way. You always know exactly where you stand.', name: 'Deepa R.', role: 'TRAINING CLIENT' },
  { stars: '★★★★★', text: 'Returned from hip surgery not knowing what I could do safely. The progressive loading meant I never felt at risk, and I am back to full training now.', name: 'Hafiz A.', role: 'REHAB CLIENT' },
  { stars: '★★★★★', text: 'Off-season block sorted out every gap the season exposed. Came back faster and more durable, and the exit test proved it with actual numbers.', name: 'Zi Xuan K.', role: 'PERFORMANCE CLIENT' },
  { stars: '★★★★★', text: 'The level of detail in the programming is unlike anywhere else I have trained in Singapore. Every session has a clear purpose and you can feel it working.', name: 'Sarah N.', role: 'TRAINING CLIENT' },
]

// Google-style avatar palette
const AVATAR_COLORS = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400', '#9C27B0', '#00ACC1', '#FF7043', '#5C6BC0', '#26A69A']

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(REVIEW_POOL.slice(0, 3))

  useEffect(() => {
    setReviews(shuffle(REVIEW_POOL).slice(0, 3))
  }, [])

  return (
    <section className="r-px r-tall-pad" style={{ background: '#0e1220', borderTop: '1px solid #212429', borderBottom: '1px solid #212429', padding: '80px 48px' }}>
      <div className="r-reviews r-reviews-scroll" style={{ display: 'grid', gridTemplateColumns: '.7fr 1fr 1fr 1fr', gap: 2, background: '#212429' }}>
        <div style={{ background: '#141922', padding: '36px 28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 14, color: '#F4B400', letterSpacing: '.08em', display: 'block', marginBottom: 18 }}>★★★★★</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <CountUp
                to={4.9}
                decimals={1}
                style={{ fontSize: 80, fontWeight: 800, lineHeight: 0.9, letterSpacing: '-.04em', color: 'var(--accent)' }}
              />
              <span style={{ fontSize: 18, fontWeight: 600, color: '#5f6670' }}>/5</span>
            </div>
          </div>
          <a href="https://www.google.com/search?q=Rebuilt+Singapore+gym+reviews" target="_blank" rel="noopener noreferrer" style={{ font: '10px/1 ui-monospace,Menlo,monospace', color: 'var(--accent)', letterSpacing: '.18em', textDecoration: 'none', marginTop: 28 }} className="hover-gold">
            Read on Google →
          </a>
        </div>

        {reviews.map(({ stars, text, name, role }) => (
          <div key={name} className="hover-review" style={{ background: '#1c2130', padding: '36px 28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 13, color: '#F4B400', letterSpacing: '.06em' }}>{stars}</span>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, fontWeight: 500, color: '#e9ecf0', margin: 0, flex: 1 }}>{text}</p>
            <div style={{ display: 'flex', gap: 12, paddingTop: 18, borderTop: '1px solid #262a30', alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: avatarColor(name),
                display: 'grid', placeItems: 'center',
                flexShrink: 0,
                fontSize: 13, fontWeight: 600, color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}>
                {name[0]}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 3px', color: '#f2f4f7' }}>{name}</p>
                <p style={{ font: '9px/1 ui-monospace,Menlo,monospace', color: '#a3aab4', margin: 0, letterSpacing: '.1em' }}>{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
