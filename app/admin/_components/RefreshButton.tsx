'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function RefreshButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => router.refresh())}
      className="btn-outline"
      disabled={pending}
      style={{ padding: '10px 18px', fontSize: 11, letterSpacing: '.16em', opacity: pending ? 0.5 : 1 }}
    >
      {pending ? '···' : 'REFRESH'}
    </button>
  )
}
