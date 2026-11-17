import dns from 'node:dns'
import net from 'node:net'

// Uitgaande requests naar URL's die in de beheeromgeving zijn ingevuld
// (affiliate-links, prijzen) mogen niet naar de server zelf of het interne
// netwerk: geen localhost, geen privé-adressen, geen cloud-metadata. De check
// gebeurt opnieuw bij elke redirect. Rest-risico: DNS-rebinding tussen de
// check en het request zelf; voor een route achter de admin-login is dat
// acceptabel.

const geblokkeerd = new net.BlockList()
for (const [adres, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.168.0.0', 16],
  ['198.18.0.0', 15], ['224.0.0.0', 4], ['240.0.0.0', 4],
]) geblokkeerd.addSubnet(adres, prefix, 'ipv4')
for (const [adres, prefix] of [
  ['::', 128], ['::1', 128], ['64:ff9b::', 96],
  ['fc00::', 7], ['fe80::', 10], ['ff00::', 8],
]) geblokkeerd.addSubnet(adres, prefix, 'ipv6')

function isIntern(adres) {
  const gemapt = adres.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
  if (gemapt) adres = gemapt[1]
  const soort = net.isIPv4(adres) ? 'ipv4' : net.isIPv6(adres) ? 'ipv6' : null
  return !soort || geblokkeerd.check(adres, soort)
}

export async function assertPubliekeUrl(invoer) {
  let url
  try {
    url = new URL(invoer)
  } catch {
    throw new Error('Ongeldige URL')
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('Alleen http- en https-URL\'s')
  }
  const host = url.hostname.replace(/^\[|\]$/g, '')
  const adressen = net.isIP(host)
    ? [{ address: host }]
    : await dns.promises.lookup(host, { all: true })
  if (adressen.length === 0 || adressen.some((a) => isIntern(a.address))) {
    throw new Error('URL wijst naar een intern adres')
  }
  return url
}

// fetch() met dezelfde opties, maar redirects volgen we zelf zodat elke hop
// langs assertPubliekeUrl gaat.
export async function veiligFetch(invoer, opties = {}, maxRedirects = 5) {
  let url = await assertPubliekeUrl(invoer)
  for (let hop = 0; ; hop++) {
    const res = await fetch(url, { ...opties, redirect: 'manual' })
    const location = res.status >= 300 && res.status < 400 ? res.headers.get('location') : null
    if (!location) return res
    if (hop >= maxRedirects) throw new Error('Te veel redirects')
    url = await assertPubliekeUrl(new URL(location, url))
  }
}
