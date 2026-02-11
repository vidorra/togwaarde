'use client'

import { useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, Home, RotateCcw } from 'lucide-react'

/**
 * Global Error Boundary Component
 *
 * Catches unhandled errors in the application and displays a user-friendly error page.
 * Development: Shows detailed error information
 * Production: Shows generic message
 *
 * @component
 * @param {Object} props - Component props
 * @param {Error & {digest?: string}} props.error - The caught error object
 * @param {() => void} props.reset - Function to reset error boundary and retry
 * @returns {JSX.Element} Error page with recovery options
 */
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
    // TODO: Send to error tracking service (Sentry, etc.)
  }, [error])

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
          {/* Error Visual */}
          <div className="relative">
            <div className="text-6xl md:text-8xl font-medium text-red-100 select-none">
              500
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center border border-red-200">
                <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-800">
              Er is iets misgegaan
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              We hebben een onverwachte fout ondervonden.
              Onze excuses voor het ongemak. Probeer het opnieuw of ga terug naar de homepage.
            </p>
          </div>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && error && (
            <div className="bg-primary/10 rounded-2xl border border-red-200 p-6 text-left">
              <h3 className="font-medium text-red-800 mb-2">Ontwikkeling - Foutdetails:</h3>
              <pre className="text-sm text-primary overflow-auto max-h-32">
                {error.message}
              </pre>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center"
              aria-label="Pagina opnieuw laden en opnieuw proberen"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Probeer opnieuw
            </button>

            <Link
              href="/"
              className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-xl border border-gray-200 transition-all inline-flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Naar homepage
            </Link>
          </div>

          {/* Helpful Actions */}
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Wat kunt u doen?
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Probeer de pagina opnieuw te laden</span>
              </div>

              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Controleer uw internetverbinding</span>
              </div>

              <div className="flex items-start space-x-3">
                <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Ga terug naar de homepage en probeer opnieuw</span>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
            <h3 className="font-medium text-lg mb-2">
              Probleem blijft bestaan?
            </h3>
            <p className="text-white/90 mb-4">
              Als deze fout blijft optreden, neem dan contact met ons op.
              We helpen u graag verder.
            </p>
            <Link
              href="/contact"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center"
            >
              Contact opnemen
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
