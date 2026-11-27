import { BlockList, isIP } from 'node:net'

/**
 * Bezoekers-IP voor rate limits.
 *
 * CapRover (nginx) zet het adres dat hij ziet ACHTERAAN x-forwarded-for. Alles
 * daarvoor vult de bezoeker zelf in, dus het eerste veld is niet te vertrouwen.
 *
 * Is dat laatste adres een Cloudflare-adres, dan staat de echte bezoeker in
 * cf-connecting-ip: die header zet Cloudflare zelf en overschrijft wat de
 * bezoeker meestuurt. Van elk ander adres negeren we hem, want wie de server
 * rechtstreeks aanspreekt kan hem zelf invullen. Zo klopt de teller met en
 * zonder firewall die alleen Cloudflare doorlaat.
 *
 * Bron: https://www.cloudflare.com/ips/ (nagekeken 27-11-2026).
 * Zelfde bestand in togwaarde en flesvoedingcalculator.
 */
const CLOUDFLARE_IPV4 = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
]

const CLOUDFLARE_IPV6 = [
  '2400:cb00::/32',
  '2606:4700::/32',
  '2803:f800::/32',
  '2405:b500::/32',
  '2405:8100::/32',
  '2a06:98c0::/29',
  '2c0f:f248::/32',
]

const cloudflare = new BlockList()
for (const range of CLOUDFLARE_IPV4) {
  const [net, bits] = range.split('/')
  cloudflare.addSubnet(net, Number(bits), 'ipv4')
}
for (const range of CLOUDFLARE_IPV6) {
  const [net, bits] = range.split('/')
  cloudflare.addSubnet(net, Number(bits), 'ipv6')
}

/** '::ffff:1.2.3.4' (IPv4 in IPv6-notatie) wordt '1.2.3.4'. */
function normalize(ip) {
  const s = (ip || '').trim()
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(s)
  return mapped ? mapped[1] : s
}

export function isCloudflareIp(ip) {
  const addr = normalize(ip)
  const family = isIP(addr)
  if (!family) return false
  return cloudflare.check(addr, family === 4 ? 'ipv4' : 'ipv6')
}

export function getClientIp(request) {
  const h = request.headers
  const parts = (h.get('x-forwarded-for') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const peer = normalize(parts[parts.length - 1] || h.get('x-real-ip'))

  if (peer && isCloudflareIp(peer)) {
    const visitor = normalize(h.get('cf-connecting-ip'))
    if (isIP(visitor)) return visitor
  }
  return peer || 'unknown'
}
