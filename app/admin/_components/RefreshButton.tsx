'use client'
import { useTransition } from 'react'
import { refreshAdminAction } from '@/app/actions/admin'

export default function RefreshButton() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => refreshAdminAction())}
      className="btn-outline"
      disabled={pending}
      style={{ padding: '10px 18px', fontSize: 11, letterSpacing: '.16em', opacity: pending ? 0.5 : 1 }}
    >
      {pending ? '···' : 'REFRESH'}
    </button>
  )
}
