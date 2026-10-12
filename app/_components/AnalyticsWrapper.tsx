'use client'
import { Analytics } from '@vercel/analytics/react'

export default function AnalyticsWrapper() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem('ra_admin') === '1') return null
        return event
      }}
    />
  )
}
