export interface TeamMember {
  role: string
  name: string
  short: string
  bio: string[]
  credentials: string[]
}

export const TEAM: TeamMember[] = [
  {
    role: 'FOUNDER',
    name: 'James Lim',
    short: 'Registered physiotherapist with 9 years in clinical rehab, specialising in lower limb reconstruction and return-to-sport testing across football and rugby.',
    bio: [
      'James completed his Bachelor of Physiotherapy at NUS and spent six years in a hospital orthopaedic unit before moving into private practice. He has worked extensively with athletes recovering from ACL reconstructions, shoulder dislocations and spinal injuries across football, rugby and combat sports.',
      'At Rebuilt, he leads all rehabilitation programming and is the first point of contact for anyone coming back from surgery or a significant injury. His approach centres on progressive loading, building tissue capacity before returning to full sport.',
      'Outside the studio, James competes in masters athletics and holds a Level 2 athletics coach certification.',
    ],
    credentials: ['B.Phty (NUS)', 'CSCS', 'Level 2 Athletics Coach', '9 years clinical experience'],
  },
  {
    role: 'CO-FOUNDER',
    name: 'Marcus Tan',
    short: 'Strength and conditioning coach with a background in competitive powerlifting and 7 years coaching athletes from amateur club level to national representation.',
    bio: [
      'Marcus holds a degree in Sports Science from NTU and has worked as a strength and conditioning coach across football, basketball and swimming programmes at both club and national level. He competed in powerlifting for eight years, reaching national level in the 83kg category.',
      'His work at Rebuilt Academy covers one-to-one personal training, pairs sessions and structured performance blocks for athletes. He is known for technical precision in the squat, deadlift and pull patterns, and for building programmes that are genuinely sustainable long-term.',
      'Marcus also runs the gym\'s small group training schedule and designs all in-season and off-season conditioning blocks.',
    ],
    credentials: ['B.Sc Sports Science (NTU)', 'NSCA-CSCS', 'National-level powerlifter', '7 years S&C coaching'],
  },
]
