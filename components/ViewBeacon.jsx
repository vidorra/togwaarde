'use client'

import { useEffect } from 'react'

/**
 * ViewBeacon: registreert anoniem één bezoek per sessie (cookieless, geen PII).
 * Vuurt fire-and-forget naar /api/track-view; een sessionStorage-vlag zorgt
 * dat een bezoeker die meerdere pagina's bekijkt als één bezoek telt.
 */
export default function ViewBeacon() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('vb') === '1') return
      sessionStorage.setItem('vb', '1')
    } catch {
      // sessionStorage geblokkeerd: dan telt elke paginaload, geen ramp
    }
    try {
      const body = '{}'
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/track-view', body)
      } else {
        fetch('/api/track-view', { method: 'POST', body, keepalive: true }).catch(() => {})
      }
    } catch {
      // tracking mag de site nooit breken
    }
  }, [])

  return null
}
