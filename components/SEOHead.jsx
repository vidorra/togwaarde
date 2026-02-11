import Head from 'next/head'
import { generateBreadcrumbSchema } from '../lib/structured-data'

export default function SEOHead({ 
  title, 
  description, 
  canonical, 
  structuredData = [],
  breadcrumbs = [],
  noIndex = false
}) {
  const fullTitle = title.includes('FlesvoedingCalculator.nl') 
    ? title 
    : `${title} | FlesvoedingCalculator.nl`

  return (
    <>
      {/* Meta tags are handled by Next.js metadata API in app router */}
      
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      
      {/* Breadcrumb Schema */}
      {breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs))
          }}
        />
      )}
      
      {/* Additional meta tags */}
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS prefetch for common resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
    </>
  )
}

// Enhanced metadata generation for specific page types
export function generatePageMetadata(pageType, data = {}) {
  const baseUrl = 'https://flesvoedingcalculator.nl'
  
  const metadataTemplates = {
    homepage: {
      title: 'Flesvoeding Calculator 2025 | Bereken Hoeveel ML Baby Nodig Heeft',
      description: 'Gratis flesvoeding calculator op basis van Nederlandse richtlijnen. Bereken direct hoeveel ml jouw baby per voeding nodig heeft. ✓ 150ml/kg formule ✓ Per leeftijd',
      canonical: baseUrl,
      openGraph: {
        title: 'FlesvoedingCalculator.nl - Bereken de juiste hoeveelheid flesvoeding',
        description: 'Gratis calculator gebaseerd op Nederlandse richtlijnen',
        url: baseUrl,
        images: [{ url: `${baseUrl}/og-homepage.png`, width: 1200, height: 630 }],
      }
    },
    
    calculator: {
      title: 'Voedingsschema Calculator | FlesvoedingCalculator.nl',
      description: 'Bereken het perfecte voedingsschema voor uw baby. Nederlandse richtlijnen, verschillende leeftijden, praktische schema\'s.',
      canonical: `${baseUrl}/voedingsschemas`,
      openGraph: {
        title: 'Voedingsschema Calculator - Persoonlijke schema\'s voor uw baby',
        description: 'Maak een persoonlijk voedingsschema op basis van leeftijd en voorkeur',
        url: `${baseUrl}/voedingsschemas`,
        images: [{ url: `${baseUrl}/og-calculator.png`, width: 1200, height: 630 }],
      }
    },
    
    knowledge: {
      title: `${data.title || 'Kennisbank'} | FlesvoedingCalculator.nl`,
      description: data.description || 'Uitgebreide informatie over flesvoeding, voedingstechnieken en praktische tips.',
      canonical: `${baseUrl}/kennisbank${data.slug ? `/${data.slug}` : ''}`,
      openGraph: {
        title: `${data.title || 'Kennisbank'} - FlesvoedingCalculator.nl`,
        description: data.description || 'Betrouwbare informatie over flesvoeding',
        url: `${baseUrl}/kennisbank${data.slug ? `/${data.slug}` : ''}`,
        images: [{ url: `${baseUrl}/og-knowledge.png`, width: 1200, height: 630 }],
      }
    },
    
    faq: {
      title: 'Veelgestelde Vragen | FlesvoedingCalculator.nl',
      description: 'Antwoorden op veelgestelde vragen over flesvoeding, onze calculator en algemene voedingsvragen voor baby\'s.',
      canonical: `${baseUrl}/faq`,
      openGraph: {
        title: 'Veelgestelde Vragen - FlesvoedingCalculator.nl',
        description: 'Vind antwoorden op alle vragen over flesvoeding en onze calculator',
        url: `${baseUrl}/faq`,
        images: [{ url: `${baseUrl}/og-faq.png`, width: 1200, height: 630 }],
      }
    },
    
    info: {
      title: `${data.title || 'Informatie'} | FlesvoedingCalculator.nl`,
      description: data.description || 'Belangrijke informatie over FlesvoedingCalculator.nl',
      canonical: `${baseUrl}${data.slug || ''}`,
      openGraph: {
        title: `${data.title || 'Informatie'} - FlesvoedingCalculator.nl`,
        description: data.description || 'Informatie van FlesvoedingCalculator.nl',
        url: `${baseUrl}${data.slug || ''}`,
        images: [{ url: `${baseUrl}/og-info.png`, width: 1200, height: 630 }],
      }
    }
  }
  
  return metadataTemplates[pageType] || metadataTemplates.info
}