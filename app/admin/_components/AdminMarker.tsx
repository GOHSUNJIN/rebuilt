'use client'
import { useEffect } from 'react'

export default function AdminMarker() {
  useEffect(() => { localStorage.setItem('ra_admin', '1') }, [])
  return null
}
