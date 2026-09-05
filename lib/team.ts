export interface TeamMember {
  role: string
  name: string
  short: string
  bio: string[]
  credentials: string[]
  image?: string
  imagePosition?: string
  imageSize?: string
}

export const TEAM: TeamMember[] = [
  {
    role: 'FOUNDER',
    name: 'Shafiq Khalit',
    image: '/shafiq.jpg',
    short: 'Strength coach, rehabilitation specialist, and founder of Rebuilt Academy. Works with clients through post-operative recovery, strength training, and sport-specific performance.',
    bio: [
      'Before founding Rebuilt, Shafiq spent years as a personal trainer and rehabilitation coach, working with post-surgical clients rebuilding strength and mobility from the ground up. He later moved into business leadership as a director and shareholder in the fitness industry, and that combination of hands-on coaching and operational experience shapes how Rebuilt runs today.',
      'His approach is built on one idea: People Before Programmes™. No client is a template. Coaching starts with the person in front of him, taking into account their history, goals, and constraints, and the plan gets built around that.',
      'Outside client work, Shafiq teaches on coaching new trainers and strength physiology, with a particular focus on perimenopause and male body composition. He sees both as underserved by mainstream fitness content and approaches them with considerably more rigour.',
    ],
    credentials: [
      'Strength Coach & Rehabilitation Specialist',
      'Entrepreneur & Fitness Industry Director',
      'Educator: Strength Physiology & New Trainer Development',
      'Specialisation: Perimenopause & Male Body Composition',
    ],
  },
  {
    role: 'CO-FOUNDER',
    name: 'Joshua Seow',
    image: '/joshua.jpg',
    imagePosition: 'center 12%',
    imageSize: '115%',
    short: 'National floorball representative and co-founder of Rebuilt Academy. Specialises in sports performance, strength training, and rehabilitation with over a decade in the sports industry.',
    bio: [
      'Joshua represented Singapore\'s national floorball team at the 2019 SEA Games, winning a silver medal, and competed at the World Floorball Championships. He took home MVP at the 2018 World Floorball Championship Qualifiers in Jeju, Korea. That track record at elite level informs everything he programmes for performance clients today.',
      'Away from training, Joshua coaches the Wonderstick youth floorball team and is a competitive pickleball player, with plans to coach the sport next. The athlete\'s perspective stays at the centre of how he builds programmes.',
      'With more than a decade in the sports industry, Joshua specialises in sports performance, strength training, and rehabilitation. He holds certifications across personal training, stretch therapy, and massage, and draws on all of them to help clients build strength, recover well, and move better.',
    ],
    credentials: [
      'NCSF Personal Training Certification',
      'Level 2 Certified Stretch Specialist',
      'Level 2 Core Balance Stretching Certification',
      'Swedish Massage Certification',
      'Singapore National Floorball Team (2019 SEA Games)',
      '10+ years in the sports industry',
    ],
  },
]
