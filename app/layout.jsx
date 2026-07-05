import './globals.css'
import Script from 'next/script'
import { initWebVitals } from '../lib/analytics'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://togwaarde.nl'),
  title: 'Wat moet mijn baby aan bij deze temperatuur? | TOG Calculator',
  description: 'Stel de kamertemperatuur in en zie direct welke TOG-slaapzak en kleding je baby veilig aan kan. Gratis, gebaseerd op NHS, Lullaby Trust en VeiligheidNL.',
  keywords: 'welke kleding baby nacht temperatuur, wat moet mijn baby aan, welke tog slaapzak, tog waarde per temperatuur, baby aankleden nacht, tog calculator, veilige babyslaap',
  robots: 'index, follow',
  authors: [{ name: 'TOGWaarde.nl' }],
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#E85D42',
    'theme-color': '#E85D42',
  },
  openGraph: {
    title: 'TOGWaarde.nl - Bereken de Ideale TOG Waarde',
    description: 'Bereken de perfecte TOG waarde voor jouw babys slaapzak op basis van kamertemperatuur',
    url: 'https://togwaarde.nl',
    siteName: 'TOGWaarde.nl',
    images: ['/og-image.png'],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOGWaarde.nl',
    description: 'Bereken de perfecte TOG waarde voor jouw babys slaapzak',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://togwaarde.nl',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TOGWaarde.nl",
              "description": "Gratis TOG waarde calculator voor veilige babyslaap",
              "url": "https://togwaarde.nl",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://togwaarde.nl/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Vidorra",
                "url": "https://togwaarde.nl",
                "sameAs": [
                  "https://togwaarde.nl",
                  "https://flesvoedingcalculator.nl"
                ]
              }
            })
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W88NL33G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W88NL33G');
          `}
        </Script>

        {/* Google Analytics (gtag) - eigen togwaarde stream */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JC52G66X85"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JC52G66X85');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5215838917916938"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "swtgjl0ozf");
          `}
        </Script>

        {/* Web Vitals Monitoring */}
        <Script id="web-vitals-init" strategy="afterInteractive">
          {`
            (async () => {
              try {
                const { onCLS, onFCP, onLCP, onTTFB } = await import('web-vitals');
                
                function sendToAnalytics(metric) {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', metric.name, {
                      event_category: 'Web Vitals',
                      event_label: metric.id,
                      value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
                      non_interaction: true,
                    });
                  }
                  
                  if (typeof console !== 'undefined' && console.log) {
                    console.log('[Web Vitals]', metric.name, ':', {
                      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                      delta: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
                      id: metric.id,
                    });
                  }
                }
                
                onCLS(sendToAnalytics);
                onFCP(sendToAnalytics);
                onLCP(sendToAnalytics);
                onTTFB(sendToAnalytics);
              } catch (error) {
                console.error('Failed to load web vitals:', error);
              }
            })();
          `}
        </Script>
        
        {/* Google AdSense Initialization */}
        <Script id="adsense-init" strategy="afterInteractive">
          {`
            (adsbygoogle = window.adsbygoogle || []).push({});
          `}
        </Script>
        
        {children}
      </body>
    </html>
  )
}