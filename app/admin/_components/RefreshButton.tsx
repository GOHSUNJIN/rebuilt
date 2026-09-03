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
      title="Refresh data"
      aria-label="Refresh analytics data"
      style={{
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pending ? 0.4 : 1,
        transition: 'opacity .15s',
      }}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="15"
        height="15"
        style={{
          display: 'block',
          animation: pending ? 'spin 0.8s linear infinite' : 'none',
        }}
      >
        <path d="M17 10A7 7 0 1 1 10 3" />
        <polyline points="10 1 13.5 4.5 10 8" />
      </svg>
    </button>
  )
}
