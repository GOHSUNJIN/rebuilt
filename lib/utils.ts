export const AVATAR_COLORS = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400', '#9C27B0', '#00ACC1', '#FF7043', '#5C6BC0', '#26A69A']

export function avatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('')
}
