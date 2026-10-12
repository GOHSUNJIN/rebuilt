export const SERVICE_PARAM_MAP: Record<string, string> = {
  performance: 'Performance',
  rehab:       'Assessment',
  strength:    'One to one',
  pairs:       'Pairs',
  smallgroup:  'Small group',
  physio:      'Physiotherapy',
}

export const SERVICE_CATEGORY_MAP: Record<string, string> = {
  performance: 'Performance',
  rehab:       'Rehabilitation',
  strength:    'Training',
  pairs:       'Training',
  smallgroup:  'Training',
  physio:      'Physiotherapy',
}

export const SERVICE_FORMAT_MAP: Record<string, string | null> = {
  strength:   'One to one',
  pairs:      'Pairs',
  smallgroup: 'Small group',
}

export const TABS = [
  { id: 'Rehabilitation',    label: 'Rehab' },
  { id: 'Training',          label: 'Training' },
  { id: 'Performance',       label: 'Performance' },
  { id: 'Physiotherapy',     label: 'Physiotherapy' },
  { id: 'Not sure yet',      label: 'Not sure' },
]

export const REHAB_OPTIONS = [
  { label: 'Assessment',     sub: '45 min · SGD 100' },
  { label: 'Single Session', sub: '60 min · SGD 140' },
  { label: 'Block of 10',    sub: 'SGD 120 / session · 10 sessions', popular: true },
]

export const PT_FORMATS = [
  { id: 'One to one',  label: 'One to One',  sub: '1 client' },
  { id: 'Pairs',       label: 'Pairs',        sub: '2 clients' },
  { id: 'Small group', label: 'Small Group',  sub: '3-5 clients' },
]

export const PT_TYPES: Record<string, { single: string; block: string }> = {
  'One to one':  { single: 'SGD 160 / session',  block: 'SGD 140 / session · 10 sessions' },
  'Pairs':       { single: 'SGD 120 per person', block: 'SGD 90 per person · 10 sessions' },
  'Small group': { single: 'SGD 100 per person', block: 'SGD 70 per person · 10 sessions' },
}

export const COACHES = [
  { label: 'Shafiq Khalit', sub: 'Founder',        detail: 'Strength & rehabilitation' },
  { label: 'Joshua Seow',   sub: 'Co-Founder',      detail: 'Sports performance & rehab' },
  { label: 'No Preference', sub: 'First available', detail: 'We\'ll match you' },
]

export const LOCATION_OPTIONS = [
  { id: 'Robinson',      sub: 'CBD' },
  { id: 'Dempsey',       sub: 'Dempsey Hill' },
  { id: 'Katong',        sub: 'East Coast' },
  { id: 'No Preference', sub: 'Any location' },
]

export const DAYS      = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const ALL_TIMES = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
export const SAT_TIMES = ['08:00', '09:00', '10:00', '11:00']

export const STEPS = [
  { num: 1, label: 'Service' },
  { num: 2, label: 'Coach' },
  { num: 3, label: 'Time' },
  { num: 4, label: 'Details' },
  { num: 5, label: 'Submit' },
]

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)
