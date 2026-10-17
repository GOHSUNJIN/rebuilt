import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 512, height: 512, display: 'flex' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={512} height={512}>
          <circle cx={50} cy={50} r={50} fill="#0b0c0e" />
          <path
            d="M84 79 A44 44 0 1 1 91 65"
            fill="none"
            stroke="white"
            strokeWidth={5.5}
            strokeLinecap="round"
          />
          {/* R - left bar, outer bump, then dark cutout for bump interior */}
          <rect x={24} y={23} width={11} height={55} fill="white" />
          <path d="M35 23 L56 23 C70 23 70 52 56 52 L35 52 Z" fill="white" />
          <path d="M35 31 L53 31 C62 31 62 45 53 45 L35 45 Z" fill="#0b0c0e" />
          {/* R - diagonal leg + small gap cutout at joint */}
          <polygon points="35,52 50,52 68,78 53,78" fill="white" />
          <polygon points="35,52 47,52 39,64" fill="#0b0c0e" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
