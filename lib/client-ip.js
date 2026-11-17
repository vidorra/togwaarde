/**
 * Bezoekers-IP voor rate limits.
 *
 * CapRover (nginx) zet het adres dat hij ziet ACHTERAAN x-forwarded-for. Alles
 * daarvoor vult de bezoeker zelf in, dus het eerste veld is niet te vertrouwen.
 *
 * cf-connecting-ip alleen met TRUST_CLOUDFLARE=1. Zet dat pas aan als de
 * firewall op de server uitsluitend Cloudflare-adressen doorlaat; anders kan
 * iedereen die de server rechtstreeks aanspreekt die header zelf invullen.
 * Staat Cloudflare ervoor zonder deze vlag, dan is het laatste XFF-veld een
 * Cloudflare-adres en delen bezoekers een teller.
 */
export function getClientIp(request) {
  const h = request.headers
  if (process.env.TRUST_CLOUDFLARE === '1') {
    const cf = h.get('cf-connecting-ip')?.trim()
    if (cf) return cf
  }
  const parts = (h.get('x-forwarded-for') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return parts[parts.length - 1] || h.get('x-real-ip')?.trim() || 'unknown'
}
