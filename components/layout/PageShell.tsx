import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Props {
  activePage?: string
  children: React.ReactNode
}

export default function PageShell({ activePage, children }: Props) {
  return (
    <div style={{ fontFamily: 'Archivo,Helvetica,Arial,sans-serif', background: '#0c0e14', color: '#f2f4f7', minHeight: '100vh' }}>
      <Navbar activePage={activePage} />
      {children}
      <Footer />
    </div>
  )
}
