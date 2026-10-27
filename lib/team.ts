export interface TeamMember {
  role: string
  name: string
  short: string
  mini: string
  bio: string[]
  credentials: string[]
  image?: string
  imagePosition?: string
  imageSize?: string
  avatarImagePosition?: string
  avatarImageSize?: string
}

export const TEAM: TeamMember[] = [
  {
    role: 'FOUNDER',
    name: 'Shafiq Khalit',
    image: '/shafiq.jpg',
    short: 'Strength coach, rehabilitation specialist, and founder of Rebuilt Academy. Works with clients through post-operative recovery, strength training, and sport-specific performance.',
    mini: 'Strength coach, rehabilitation specialist, and founder of Rebuilt Academy.',
    bio: [
      'Before founding Rebuilt, Shafiq spent years as a personal trainer and rehabilitation coach, working with post-surgical clients rebuilding strength and mobility from the ground up. He later moved into business leadership as a director and shareholder in the fitness industry, and that combination of hands-on coaching and operational experience shapes how Rebuilt runs today.',
      'His approach is built on one idea: People Before Programmes. No client is a template. Coaching starts with the person in front of him, taking into account their history, goals, and constraints, and the plan gets built around that.',
      'Outside client work, Shafiq teaches on coaching new trainers and strength physiology, with a particular focus on perimenopause and male body composition. He sees both as underserved by mainstream fitness content and approaches them with considerably more rigour.',
    ],
    credentials: [
      'Strength Coach & Rehabilitation Specialist',
      'Entrepreneur & Fitness Industry Director',
      'Educator: Strength Physiology & New Trainer Development',
      'Specialisation: Perimenopause & Male Body Composition',
      'ACE Certified Personal Trainer (ACE-CPT)',
      'Strength and Conditioning Certified (Pre-script Level 1 & 2)',
      'Precision Nutrition Certification',
      'ISA Sports Academy Rehabilitation Certifications (Level 1, 2 & 3)',
      'Pre and Post Natal Certified (Girls Gone Strong)',
      'Knee Meniscus Rehab Certified',
      'Rehab Essentials',
      'Chiropractic Body Alignment (Level 1)',
    ],
  },
  {
    role: 'CO-FOUNDER',
    name: 'Joshua Seow',
    image: '/joshua.jpg',
    imagePosition: 'center top',
    imageSize: '118%',
    avatarImagePosition: 'center top',
    avatarImageSize: '160%',
    short: 'National floorball representative and co-founder of Rebuilt Academy. Specialises in sports performance, strength training, and rehabilitation with over a decade in the sports industry.',
    mini: 'National floorball representative and co-founder of Rebuilt Academy.',
    bio: [
      'Joshua is a passionate sportsman who has represented Singapore\'s national Floorball team, competing at the 2019 SEA Games and the World Floorball Championships. He won MVP at the 2018 World Floorball Championship Qualifiers in Jeju, Korea, and took home a silver medal at the 2019 SEA Games. Beyond floorball, Joshua is now a competitive and social pickleball player, and coaches the Wonderstick youth floorball team, with plans to coach pickleball next.',
      'With more than a decade in the sports industry, Joshua specializes in sports performance, strength training, and rehab. He is a Level 2 certified stretch specialist, and holds an NCSF Personal Training certification, Level 2 Core Balance Stretching certification, Swedish massage certification, and basic hand and foot reflexology certification. He combines this background to help clients build strength, recover well, and move better.',
    ],
    credentials: [
      'NCSF Personal Training Certification',
      'Level 2 Certified Stretch Specialist',
      'Level 2 Core Balance Stretching Certification',
      'Swedish Massage Certification',
      'Basic Hand and Foot Reflexology Certification',
      'Singapore National Floorball Team (2019 SEA Games)',
      '10+ years in the sports industry',
    ],
  },
]
