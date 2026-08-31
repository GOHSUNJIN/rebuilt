export const COOKIE_NAME = 'rebuilt_admin'
export const MAX_AGE_S = 60 * 60 * 8

const enc = new TextEncoder()
const dec = new TextDecoder()

function toB64Url(bytes: Uint8Array): string {
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function fromB64Url(s: string): Uint8Array<ArrayBuffer> {
  const padded = s
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(s.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function secret(): string {
  return process.env.ADMIN_SECRET ?? 'dev-secret-change-in-production'
}

async function hmacKey(usage: KeyUsage): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage],
  )
}

export async function signToken(username: string): Promise<string> {
  const exp = Date.now() + MAX_AGE_S * 1000
  const payload = toB64Url(enc.encode(JSON.stringify({ u: username, exp })))
  const key = await hmacKey('sign')
  const sig = toB64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(payload))))
  return `${payload}.${sig}`
}

export async function verifyToken(token: string): Promise<{ u: string } | null> {
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return null
    const payload = token.slice(0, dot)
    const sigBytes = fromB64Url(token.slice(dot + 1))
    const key = await hmacKey('verify')
    const ok = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload))
    if (!ok) return null
    const data = JSON.parse(dec.decode(fromB64Url(payload)))
    if (Date.now() > data.exp) return null
    return data
  } catch {
    return null
  }
}
