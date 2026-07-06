import Script from 'next/script'

/**
 * Umami analytics (cookieless, self-hosted op CapRover).
 *
 * Meet 100% van de bezoekers zonder cookies of persoonsgegevens en valt
 * daarmee buiten de consent-plicht (zie cookieless-analytics-plan.md).
 * Events worden gespiegeld vanuit lib/analytics.js (trackEvent).
 *
 * WEBSITE_ID invullen na de Umami-deploy: dashboard > Instellingen >
 * Websites > togwaarde.nl > Website-ID. Tot die tijd rendert dit niets.
 */
const WEBSITE_ID = ''
const UMAMI_SRC = 'https://stats.server.devjens.nl/script.js'

export default function UmamiScript() {
  if (!WEBSITE_ID) return null
  return (
    <Script
      src={UMAMI_SRC}
      data-website-id={WEBSITE_ID}
      strategy="afterInteractive"
    />
  )
}
