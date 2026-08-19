import type { ReactNode } from 'react'

export interface NavLink {
  href: string
  label: string
  page: string
}

export interface PricingItem {
  type: string
  price: string
  sub: string
  features: string[]
  featured: boolean
  href: string
}

export interface CrosslinkItem {
  label: string
  href: string
  desc: string
}

export interface FeatureItem {
  num: string
  title: string
  desc: string
  icon: ReactNode
}

export interface FAQItem {
  num: string
  q: string
  a: string
}
