/**
 * Lichtgewicht guard voor de PUBLIEKE, niet-geauthenticeerde tracking-endpoints
 * (track-calculation / track-click). Doel: voorkomen dat één IP de gedeelde
 * Postgres volpompt met rijen (de DB ging al 2x OOM). Geen security-grens maar
 * een volume-rem.
 *
 * In-memory sliding window: telt per proces. Op de single-replica CapRover-
 * deploy is dat prima; het is bewust geen Redis (geen extra afhankelijkheid).
 * Zelfde bestand in beide repos zodat het gedrag niet uit elkaar loopt.
 */

const WINDOW_MS = 60_000       // venster van 1 minuut
const MAX_PER_WINDOW = 100     // max requests per IP per venster (ruim voor mensen, stopt floods)
const MAX_BODY_BYTES = 4096    // track-payloads zijn een paar velden; 4KB is royaal

// ip -> array of request-timestamps (ms) binnen het venster
const hits = new Map()

export function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

/**
 * @returns {{ allowed: boolean, retryAfter: number }} retryAfter in seconden
 */
export function checkTrackRate(request) {
  const now = Date.now()
  const ip = getClientIp(request)
  const recent = (hits.get(ip) || []).filter((ts) => now - ts < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) }
  }

  recent.push(now)
  hits.set(ip, recent)

  // Opportunistische opschoning zodat de map niet onbegrensd groeit.
  if (hits.size > 5000) {
    for (const [key, arr] of hits) {
      const keep = arr.filter((ts) => now - ts < WINDOW_MS)
      if (keep.length) hits.set(key, keep)
      else hits.delete(key)
    }
  }

  return { allowed: true, retryAfter: 0 }
}

/** true als de request-body groter is dan de cap (via Content-Length). */
export function bodyTooLarge(request) {
  const len = Number(request.headers.get('content-length') || 0)
  return len > MAX_BODY_BYTES
}
