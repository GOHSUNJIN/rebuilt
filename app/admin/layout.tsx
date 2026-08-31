import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Rebuilt Academy',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: '100vh', background: '#0B0C0E' }}>{children}</div>
}
