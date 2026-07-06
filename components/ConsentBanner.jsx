'use client'
import { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'
import { initClarity } from '../lib/analytics'

const STORAGE_KEY = 'cookie-consent'

function applyConsent(accepted) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  gtag('consent', 'update', {
    ad_storage: accepted ? 'granted' : 'denied',
    ad_user_data: accepted ? 'granted' : 'denied',
    ad_personalization: accepted ? 'granted' : 'denied',
    analytics_storage: accepted ? 'granted' : 'denied',
  })
}

/**
 * Subtiele cookiebanner (Consent Mode v2), eigen stijl.
 *
 * - Geen blokkerende overlay: klein kaartje onderin (mobiel volle breedte,
 *   desktop rechtsonder), gelijkwaardige keuzeknoppen (AVG).
 * - Defaults staan op denied via het consent-init script in de layout;
 *   dit component update alleen de keuze en onthoudt die in localStorage.
 * - Heropenen kan overal met:
 *   window.dispatchEvent(new Event('open-cookie-consent'))
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    let stored = null
    try { stored = localStorage.getItem(STORAGE_KEY) } catch { /* private mode */ }
    if (!stored) {
      setVisible(true)
      // volgende frame voor de slide-in transitie
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)))
    }

    const reopen = () => {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)))
    }
    window.addEventListener('open-cookie-consent', reopen)
    return () => window.removeEventListener('open-cookie-consent', reopen)
  }, [])

  const choose = (accepted) => {
    try {
      localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'rejected')
    } catch { /* private mode */ }
    applyConsent(accepted)
    if (accepted) initClarity()
    setEntered(false)
    setTimeout(() => setVisible(false), 250)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 inset-x-0 sm:inset-x-auto sm:right-5 sm:bottom-5 z-50 p-3 sm:p-0 transition-all duration-300 ease-out ${
        entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      role="dialog"
      aria-label="Cookievoorkeuren"
    >
      <div className="sm:max-w-sm bg-white rounded-2xl border border-gray-200 shadow-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">Cookies</p>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              We gebruiken cookies voor anonieme statistieken en advertenties.
              Je keuze is altijd aan te passen via{' '}
              <a href="/privacy-beleid" className="text-primary underline hover:no-underline">
                cookievoorkeuren
              </a>{' '}
              in de footer.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => choose(false)}
            className="py-2 px-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Alleen noodzakelijk
          </button>
          <button
            onClick={() => choose(true)}
            className="py-2 px-3 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
