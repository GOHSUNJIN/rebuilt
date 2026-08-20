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
  '/rehab':       "Hi, I'm interested in the Rehab service at Rebuilt Academy. Could you tell me more?",
  '/strength':    "Hi, I'm interested in Training at Rebuilt Academy. Could you tell me more?",
  '/performance': "Hi, I'm interested in the Performance service at Rebuilt Academy. Could you tell me more?",
  '/physio':      "Hi, I'm interested in booking a physiotherapy session at Rebuilt Academy. Could you help me get started?",
  '/book':        "Hi, I'd like to book a consult at Rebuilt Academy. Could you help me get started?",
  '/about':       "Hi, I have a question about Rebuilt Academy. Could you help me?",
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi, I'd like to find out more about Rebuilt Academy."

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
    phone: '+65 8223 8935',
    phoneTel: 'tel:+6582238935',
    whatsapp: 'https://wa.me/6582238935',
  },

  social: {
    instagram: 'https://www.instagram.com/rebuiltbysk/',
  },

  hours: ['Mon-Fri: 7am-9pm', 'Sat: 8am-2pm', 'Sun: Closed'],
}
