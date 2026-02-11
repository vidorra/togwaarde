// Structured data generators for SEO

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FlesvoedingCalculator.nl",
    "description": "Gratis flesvoeding calculator op basis van Nederlandse richtlijnen",
    "url": "https://flesvoedingcalculator.nl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://flesvoedingcalculator.nl/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlesvoedingCalculator.nl",
      "url": "https://flesvoedingcalculator.nl"
    }
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FlesvoedingCalculator.nl",
    "url": "https://flesvoedingcalculator.nl",
    "logo": "https://flesvoedingcalculator.nl/logo.png",
    "description": "Nederlandse flesvoeding calculator gebaseerd op officiële richtlijnen",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Dutch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    }
  }
}

export function generateCalculatorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flesvoeding Calculator",
    "description": "Bereken hoeveel flesvoeding uw baby nodig heeft op basis van Nederlandse richtlijnen",
    "url": "https://flesvoedingcalculator.nl/voedingsschemas",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlesvoedingCalculator.nl"
    },
    "featureList": [
      "Berekening op basis van 150ml/kg formule",
      "Nederlandse voedingsrichtlijnen",
      "Verschillende leeftijdscategorieën",
      "Praktische tips en adviezen"
    ]
  }
}

export function generateArticleSchema(title, description, url, datePublished, dateModified) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": "FlesvoedingCalculator.nl"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlesvoedingCalculator.nl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://flesvoedingcalculator.nl/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  }
}

export function generateHowToSchema(name, description, steps, url) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "url": url,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "image": step.image || undefined
    })),
    "totalTime": "PT5M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Flesvoeding"
      },
      {
        "@type": "HowToSupply", 
        "name": "Zuigfles"
      },
      {
        "@type": "HowToSupply",
        "name": "Gekookt water"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Maatlepel"
      },
      {
        "@type": "HowToTool",
        "name": "Thermometer"
      }
    ]
  }
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }
}

export function generateHealthTopicSchema(topic) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": topic.title,
    "description": topic.description,
    "url": topic.url,
    "lastReviewed": topic.lastReviewed,
    "medicalAudience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": 0,
      "suggestedMaxAge": 2,
      "audienceType": "Parents"
    },
    "about": {
      "@type": "MedicalCondition",
      "name": "Infant Nutrition"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlesvoedingCalculator.nl"
    }
  }
}