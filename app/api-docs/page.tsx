import { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Code, BookOpen } from 'lucide-react'

/**
 * Metadata for API documentation page
 */
export const metadata: Metadata = {
  title: 'API Documentation | Togwaarde',
  description: 'OpenAPI documentation for the Togwaarde API. Learn how to integrate with our contact form and sitemap endpoints.',
  robots: {
    index: true,
    follow: true
  }
}

/**
 * API Documentation Page
 *
 * Displays OpenAPI/Swagger documentation for the Togwaarde API.
 *
 * **Available endpoints:**
 * - POST /api/contact - Submit contact form
 * - GET /api/sitemap.xml - Dynamic sitemap
 * - GET /api/docs - OpenAPI schema JSON
 *
 * **Documentation tools:**
 * - Swagger UI
 * - Redoc
 * - OpenAPI viewers
 *
 * @page APIDocsPage
 * @returns {JSX.Element} API documentation page
 */
export default function APIDocsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Code className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
              <p className="text-white/90 text-lg">
                Complete OpenAPI specification for the Togwaarde API
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <p className="text-gray-700">
            The Togwaarde API provides endpoints for contact form submissions and dynamic sitemap generation.
            All endpoints are secured with rate limiting, input validation, and optional reCAPTCHA protection.
          </p>
        </section>

        {/* Quick Links */}
        <section className="grid sm:grid-cols-2 gap-4">
          {/* Swagger UI Link */}
          <a
            href="https://swagger.io/tools/swagger-ui/?url=https://togwaarde.nl/api/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white border-2 border-primary/20 hover:border-primary rounded-2xl transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-lg text-gray-900">Swagger UI</h3>
              <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-600">
              Interactive API documentation with try-it-out functionality
            </p>
          </a>

          {/* OpenAPI JSON Link */}
          <a
            href="/api/docs"
            className="block p-6 bg-white border-2 border-primary/20 hover:border-primary rounded-2xl transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-lg text-gray-900">OpenAPI Schema</h3>
              <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-600">
              Raw OpenAPI 3.1.0 JSON specification
            </p>
          </a>
        </section>

        {/* Endpoints */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Endpoints</h2>

          {/* POST /api/contact */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-mono font-semibold text-sm flex-shrink-0">
                POST
              </span>
              <code className="text-lg font-mono text-gray-900 break-all">/api/contact</code>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">
                  Submit a contact form or feedback message. Includes spam detection, input validation,
                  and optional reCAPTCHA verification.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Rate Limit</h4>
                <p className="text-gray-700">
                  5 requests per 15 minutes per IP address
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
{`{
  "name": "Jan de Vries",
  "email": "jan@example.nl",
  "subject": "Vraag over TOG",
  "message": "Ik heb een vraag...",
  "type": "feedback",
  "recaptchaToken": "optional_token"
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Responses</h4>
                <div className="space-y-2">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <span className="font-mono font-semibold text-green-700">200</span>
                    <p className="text-sm text-green-700">Message submitted successfully</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
                    <span className="font-mono font-semibold text-orange-700">400</span>
                    <p className="text-sm text-orange-700">Validation error or spam detected</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <span className="font-mono font-semibold text-red-700">429</span>
                    <p className="text-sm text-red-700">Rate limit exceeded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GET /api/sitemap.xml */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-mono font-semibold text-sm flex-shrink-0">
                GET
              </span>
              <code className="text-lg font-mono text-gray-900 break-all">/api/sitemap.xml</code>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">
                  Returns an XML sitemap with all pages for search engine crawling.
                  Automatically updated based on knowledge base articles.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <p className="text-sm text-gray-700 mb-2">Valid XML sitemap following sitemap.org protocol</p>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-xs">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://togwaarde.nl</loc>
    <priority>1.0</priority>
  </url>
  ...
</urlset>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Security Features
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">Rate Limiting</h4>
              <p className="text-sm text-green-800">
                Redis-backed sliding window algorithm
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">Input Validation</h4>
              <p className="text-sm text-green-800">
                Comprehensive validation + DOMPurify sanitization
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">Spam Detection</h4>
              <p className="text-sm text-green-800">
                reCAPTCHA v3 + pattern matching
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">Error Handling</h4>
              <p className="text-sm text-green-800">
                Graceful degradation with detailed errors
              </p>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-gray-900">Need help?</h3>
          <p className="text-gray-700">
            Check the full OpenAPI specification above or{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              contact us
            </Link>
            {' '}for API support.
          </p>
        </section>
      </div>
    </div>
  )
}
