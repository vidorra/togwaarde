import OverOnsClient from './OverOnsClient'

export const metadata = {
  title: 'Over TOGWaarde.nl: onze missie en werkwijze | TOGWaarde.nl',
  description: 'Ontdek de missie achter TOGWaarde.nl en waarom je onze TOG-adviezen kunt vertrouwen. Evidence-based, gratis en gebaseerd op VeiligheidNL, NCJ, NHS en The Lullaby Trust.',
  keywords: 'over togwaarde, tog advies betrouwbaar, veilig slapen richtlijnen, tog methode, babyslaap expertise, evidence based babyslaap, over ons',
  alternates: { canonical: '/over-ons/' },
}

export default function OverOnsPage() {
  return <OverOnsClient />
}
