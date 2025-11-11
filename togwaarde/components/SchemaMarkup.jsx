'use client'

export function WebApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FlesvoedingCalculator.nl",
    "url": "https://flesvoedingcalculator.nl",
    "description": "Gratis flesvoeding calculator op basis van Nederlandse richtlijnen. Bereken hoeveel ml je baby per voeding nodig heeft.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "browserRequirements": "Moderne webbrowser",
    "softwareVersion": "2025",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "FlesvoedingCalculator.nl",
      "url": "https://flesvoedingcalculator.nl"
    },
    "featureList": [
      "Persoonlijke flesvoeding berekening",
      "Nederlandse richtlijnen",
      "Groeispurt ondersteuning",
      "Leeftijdsaanpassingen",
      "Voedingsschema's"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FlesvoedingCalculator.nl",
    "url": "https://flesvoedingcalculator.nl",
    "logo": "https://flesvoedingcalculator.nl/logo.png",
    "description": "Betrouwbare flesvoeding calculator en informatie voor Nederlandse ouders",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL"
    },
    "areaServed": "Netherlands",
    "knowsLanguage": "nl",
    "foundingDate": "2024",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Vidorra"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Hoeveel ml flesvoeding heeft een baby van 3 maanden nodig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een baby van 3 maanden krijgt ongeveer 130ml per kg lichaamsgewicht per dag. Bij een gewicht van 5kg betekent dit 650ml verdeeld over 6-7 voedingen (ongeveer 95ml per voeding)."
        }
      },
      {
        "@type": "Question",
        "name": "Hoeveel flesvoeding heeft een baby van 4 kg nodig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bij 4 kg: 4 x 150ml = 600ml per dag, verdeeld over 6-7 voedingen. Dit komt neer op ongeveer 85-100ml per voeding, afhankelijk van leeftijd en aantal voedingen."
        }
      },
      {
        "@type": "Question",
        "name": "Wat is het flesvoeding schema voor 0-6 maanden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "0-3 maanden: 6-8 voedingen van 60-120ml. 3-6 maanden: 5-6 voedingen van 120-180ml. Gebruik onze calculator voor een persoonlijk schema op basis van gewicht en leeftijd."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe bereken ik hoeveel flesvoeding mijn baby nodig heeft?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gebruik de formule: gewicht (kg) x 150ml = totaal per dag. Deel dit door aantal voedingen per dag. Onze calculator doet dit automatisch en houdt rekening met leeftijdsaanpassingen."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}