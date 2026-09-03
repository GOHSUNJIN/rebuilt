'use client'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link> & { event: string }

export default function TrackLink({ event, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event)
        onClick?.(e)
      }}
    />
  )
}
