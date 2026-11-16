// Productvolgorde op TOG: slaapzakken die bij het seizoen passen komen
// bovenaan, zodat dat niet twee keer per jaar met de hand in de admin hoeft.
// De TOG komt uit de tag van het product ("0.5 TOG", "TOG 2.5, slaapzak",
// "TOG 2.0 tot 3.0"), met de productnaam als terugval.
//
// Binnen dezelfde afstand blijft de volgorde uit de admin staan (stabiele
// sortering). Producten zonder TOG (thermometer, kleding) gaan achteraan,
// onderling ook in admin-volgorde.

// Doel-TOG per seizoen, op maand (1-12) in Nederlandse tijd.
const SEIZOENEN = [
  { maanden: [11, 12, 1, 2, 3], doel: [2.5, 3.5] }, // winter
  { maanden: [6, 7, 8], doel: [0.5, 1.0] }, // zomer
  { maanden: [4, 5, 9, 10], doel: [1.0, 2.5] }, // voor- en najaar
]

// Pagina's die het hele jaar over één seizoen gaan.
const VAST_DOEL = {
  'tog-waarde-winter': [2.5, 3.5],
  'baby-slapen-zomer': [0.5, 1.0],
}

const GETAL = '(\\d+(?:[.,]\\d+)?)'

// [min, max] of null. Alleen getallen die bij "TOG" staan of in een tag met
// TOG erin, zodat "6-12 maanden" of "2 stuks" niet meetellen.
export function togBereik(tag, naam) {
  const uitTag = getallenBijTog(tag, true)
  const getallen = uitTag.length ? uitTag : getallenBijTog(naam, false)
  if (!getallen.length) return null
  return [Math.min(...getallen), Math.max(...getallen)]
}

function getallenBijTog(tekst, helemaal) {
  const t = String(tekst || '')
  if (!/tog/i.test(t)) return []
  const naTog = new RegExp(`tog\\s*${GETAL}(?:\\s*(?:-|tot|t/m)\\s*${GETAL})?`, 'gi')
  const voorTog = new RegExp(`${GETAL}\\s*tog`, 'gi')
  const gevonden = []
  for (const m of t.matchAll(naTog)) gevonden.push(m[1], m[2])
  for (const m of t.matchAll(voorTog)) gevonden.push(m[1])
  // Tag met TOG erin maar het getal los ervan ("2.5 en 3.5, TOG"): alle getallen.
  if (helemaal && !gevonden.some(Boolean)) {
    for (const m of t.matchAll(new RegExp(GETAL, 'g'))) gevonden.push(m[1])
  }
  return gevonden
    .filter(Boolean)
    .map((g) => parseFloat(g.replace(',', '.')))
    .filter((g) => g > 0 && g <= 5)
}

export function doelVoorPagina(pageId, nu = new Date()) {
  if (VAST_DOEL[pageId]) return VAST_DOEL[pageId]
  const maand = Number(
    new Intl.DateTimeFormat('nl-NL', { month: 'numeric', timeZone: 'Europe/Amsterdam' }).format(nu)
  )
  return SEIZOENEN.find((s) => s.maanden.includes(maand)).doel
}

// Afstand tussen twee bereiken: 0 als ze overlappen.
function afstand([a1, a2], [b1, b2]) {
  if (a2 < b1) return b1 - a2
  if (b2 < a1) return a1 - b2
  return 0
}

export function sorteerOpTog(producten, pageId, nu = new Date()) {
  const doel = doelVoorPagina(pageId, nu)
  return producten
    .map((p, i) => {
      const bereik = togBereik(p.tag, p.name)
      return { p, i, score: bereik ? afstand(bereik, doel) : Infinity }
    })
    .sort((a, b) => a.score - b.score || a.i - b.i)
    .map((x) => x.p)
}
