import { createHash, timingSafeEqual } from 'node:crypto'

/** Vergelijkt twee geheimen in constante tijd (ook bij verschillende lengte). */
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}
