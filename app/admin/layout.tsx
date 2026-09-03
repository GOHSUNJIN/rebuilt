import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-page" style={{ minHeight: '100vh', background: '#0B0B0B', color: '#fff' }}>{children}</div>
}
