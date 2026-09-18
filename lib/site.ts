import type { NavLink } from '@/lib/types'

export const NAV_LINKS: NavLink[] = [
  { href: '/rehab',       label: 'Rehab',           page: 'rehab' },
  { href: '/strength',    label: 'Training',         page: 'strength' },
  { href: '/performance', label: 'Performance',      page: 'performance' },
  { href: '/physio',      label: 'Physiotherapy',    page: 'physio' },
  { href: '/about',       label: 'About',            page: 'about' },
  { href: '/faq',         label: 'FAQ',              page: 'faq' },
]

export const WHATSAPP_MESSAGES: Record<string, string> = {
  '/rehab':       "Hi! I'm interested in your rehab programme at Rebuilt Academy. Could you share more details?",
  '/strength':    "Hi! I'm interested in personal training at Rebuilt Academy. Could you share more details?",
  '/performance': "Hi! I'm interested in your sports performance programme. Could you share more details?",
  '/physio':      "Hi! I'd like to book a physio session at Rebuilt Academy. How do I get started?",
  '/book':        "Hi! I'd like to book a consult at Rebuilt Academy. Could you help?",
  '/about':       "Hi! I have a question about Rebuilt Academy. Could you help?",
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi! I'd like to find out more about Rebuilt Academy."

export const SITE = {
  name: 'Rebuilt Academy',
  tagline: 'SINGAPORE',
  url: 'https://rebuilt.sg',

  locations: [
    {
      name: 'Robinson',
      street: '120 Robinson Rd, #10-01',
      city: 'Singapore 068913',
      mapsUrl: 'https://maps.google.com/?q=120+Robinson+Road+Singapore+068913',
    },
    {
      name: 'Dempsey',
      street: '27A Loewen Rd, #27A',
      city: 'Singapore 248839',
      mapsUrl: 'https://maps.google.com/?q=27A+Loewen+Road+Singapore+248839',
    },
    {
      name: 'Katong',
      street: 'i12 Katong, 112 E Coast Rd, #03-01',
      city: 'Singapore 428802',
      mapsUrl: 'https://maps.google.com/?q=i12+Katong+112+East+Coast+Road+Singapore+428802',
    },
  ],

  contact: {
    email: 'hello@rebuilt.sg',
    phone: '+65 9456 0563',
    phoneTel: 'tel:+6594560563',
    whatsapp: 'https://wa.me/6594560563',
  },

  social: {
    instagram: 'https://www.instagram.com/rebuiltbysk/',
  },

  hours: ['Monday - Friday: 7am - 9pm', 'Saturday: 8am - 2pm', 'Sunday: Closed'],
}
