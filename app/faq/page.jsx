import FaqClient from './FaqClient'
import { faqItems } from './faq-data'
import { generateFAQSchema } from '../../lib/structured-data'

export const metadata = {
  title: 'Veelgestelde vragen over TOG en slaapzakken | TOGWaarde.nl',
  description: 'Antwoorden op veelgestelde vragen over TOG-waardes, babyslaapzakken, kamertemperatuur en veilig slapen. Praktische tips om je baby comfortabel en veilig te laten slapen.',
  keywords: 'faq tog, veelgestelde vragen tog, tog waarde vragen, slaapzak vragen, babyslaap veiligheid, kamertemperatuur baby, veilig slapen baby',
  alternates: { canonical: '/faq/' },
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqItems)) }}
      />
      <FaqClient />
    </>
  )
}
