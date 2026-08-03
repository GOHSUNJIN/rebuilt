import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority: number, freq: MetadataRoute.Sitemap[0]['changeFrequency'] = 'monthly') => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  })

  return [
    u('/', 1.0, 'weekly'),
    u('/rehab', 0.9),
    u('/strength', 0.9),
    u('/performance', 0.9),
    u('/physio', 0.7),
    u('/about', 0.8),
    u('/book', 0.8, 'weekly'),
    u('/privacy', 0.3, 'yearly'),
    u('/terms', 0.3, 'yearly'),
  ]
}
