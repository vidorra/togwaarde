import { NextResponse } from 'next/server'

/**
 * Security middleware for TOGwaarde.nl
 *
 * Implements:
 * - Content Security Policy (CSP)
 * - Security headers
 * - HSTS (Strict-Transport-Security)
 */

// Content Security Policy configuration
const getCSPHeader = (nonce) => {
  const cspDirectives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      // Allow inline scripts with nonce for Next.js
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      // Third-party scripts
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://www.google.com/recaptcha/',
      'https://www.gstatic.com/recaptcha/',
      'https://partner.bol.com',
      'https://www.partner.bol.com',
      'https://www.clarity.ms',
      // EmailJS
      'https://cdn.jsdelivr.net',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      'https://fonts.googleapis.com',
    ],
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      // Allow images from these sources
      'https://www.google-analytics.com',
      'https://media.s-bol.com',
      'https://www.bol.com',
      'https://*.bol.com',
      'https://partner.bol.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    'connect-src': [
      "'self'",
      // API connections
      'https://www.google-analytics.com',
      'https://api.emailjs.com',
      'https://www.google.com/recaptcha/',
      'https://ipapi.co',
      'https://api.open-meteo.com',
      'https://www.clarity.ms',
      'https://*.clarity.ms',
    ],
    'frame-src': [
      "'self'",
      'https://www.google.com/recaptcha/',
      'https://recaptcha.google.com',
      'https://partner.bol.com',
    ],
    'frame-ancestors': ["'self'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'upgrade-insecure-requests': [],
  }

  return Object.entries(cspDirectives)
    .map(([key, values]) => {
      if (values.length === 0) return key
      return `${key} ${values.join(' ')}`
    })
    .join('; ')
}

// Generate a random nonce for CSP
function generateNonce() {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString('base64')
}

export function middleware(request) {
  const response = NextResponse.next()
  const nonce = generateNonce()

  // Get pathname for route-specific handling
  const { pathname } = request.nextUrl

  // ============================================
  // SECURITY HEADERS - Applied to all routes
  // ============================================

  // Content Security Policy
  response.headers.set('Content-Security-Policy', getCSPHeader(nonce))

  // Strict Transport Security (HSTS) - Force HTTPS
  // max-age=31536000 = 1 year, includeSubDomains for all subdomains
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Disable browser features we don't need
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // ============================================
  // ADMIN ROUTES - Extra security
  // ============================================
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Prevent clickjacking on admin pages
    response.headers.set('X-Frame-Options', 'DENY')

    // Additional CSP restrictions for admin
    // (already covered in main CSP, but we set stricter frame-ancestors)
    response.headers.set('X-XSS-Protection', '1; mode=block')
  } else {
    // Allow same-origin framing for non-admin pages
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  }

  // Pass nonce to the page for inline scripts
  response.headers.set('x-nonce', nonce)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
