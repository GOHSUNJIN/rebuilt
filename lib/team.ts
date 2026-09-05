export interface TeamMember {
  role: string
  name: string
  short: string
  bio: string[]
  credentials: string[]
  image?: string
}

export const TEAM: TeamMember[] = [
  {
    role: 'FOUNDER',
    name: 'Shafiq Khalit',
    image: '/shafiq.jpg',
    short: 'Strength coach, rehabilitation specialist, and entrepreneur. Coaches clients through post-operative recovery, strength training, and sport-specific performance — often the same person moving through all three.',
    bio: [
      'Before founding Rebuilt, Shafiq spent years in personal training and rehab coaching, working with post-surgical clients rebuilding strength and mobility from the ground up. He then moved into business leadership as a director and shareholder in the fitness industry — that combination of hands-on coaching and running the business side shapes how Rebuilt operates today.',
      'His approach is built on a simple premise: People Before Programmes™. No client is a template. Coaching starts with the person in front of him — their history, their goals, their constraints — and the plan gets built around that, not the other way around.',
      'Outside client work, Shafiq teaches on coaching new trainers and strength physiology, with a particular focus on perimenopause and male body composition — areas he believes get too little rigour in mainstream fitness content.',
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
    short: 'National floorball representative (2019 SEA Games) and sports performance coach with over a decade in the industry. Specialises in sports performance, strength training, and rehabilitation.',
    bio: [
      'Joshua represented Singapore\'s national floorball team at the 2019 SEA Games, winning a silver medal, and at the World Floorball Championships. He took home MVP at the 2018 World Floorball Championship Qualifiers in Jeju, Korea — a career built on elite-level sport that directly informs how he coaches performance clients today.',
      'He now channels that background into coaching, leading the Wonderstick youth floorball team and expanding into pickleball, where he competes socially and plans to coach next. The athlete\'s perspective stays central to everything he programmes.',
      'With more than a decade in the sports industry, Joshua specialises in sports performance, strength training, and rehab. He combines a broad certification base — stretch, personal training, massage — to help clients build strength, recover well, and move better.',
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
