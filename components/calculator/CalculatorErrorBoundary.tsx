'use client'

import React, { ReactNode, ReactElement } from 'react'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

/**
 * Props for CalculatorErrorBoundary component
 */
interface CalculatorErrorBoundaryProps {
  children: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * State for CalculatorErrorBoundary component
 */
interface CalculatorErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Calculator-Specific Error Boundary Component
 *
 * Catches errors in the TOG calculator and displays a calculator-specific error UI.
 * Provides options to:
 * - Retry the calculation
 * - Reset form to defaults
 * - Return to homepage
 *
 * **Usage:**
 * ```tsx
 * <CalculatorErrorBoundary onError={(error) => trackError(error)}>
 *   <TOGCalculator />
 * </CalculatorErrorBoundary>
 * ```
 *
 * @class CalculatorErrorBoundary
 * @extends {React.Component<CalculatorErrorBoundaryProps, CalculatorErrorBoundaryState>}
 */
export class CalculatorErrorBoundary extends React.Component<
  CalculatorErrorBoundaryProps,
  CalculatorErrorBoundaryState
> {
  /**
   * Initialize error boundary state
   * @param {CalculatorErrorBoundaryProps} props - Component props
   */
  constructor(props: CalculatorErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  /**
   * Update state so the next render will show the fallback UI
   * @static
   * @param {Error} error - The thrown error
   * @returns {CalculatorErrorBoundaryState} New state with error
   */
  static getDerivedStateFromError(error: Error): CalculatorErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  /**
   * Log error details
   * @param {Error} error - The caught error
   * @param {React.ErrorInfo} errorInfo - React error info
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('Calculator Error:', error, errorInfo)
    }

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  /**
   * Reset error boundary and reload page
   */
  reset = (): void => {
    this.setState({
      hasError: false,
      error: null
    })
    // Force reload to reset calculator state
    window.location.reload()
  }

  /**
   * Reset to calculator defaults without reloading
   */
  resetCalculator = (): void => {
    this.setState({
      hasError: false,
      error: null
    })
    // Emit custom event to reset calculator form
    window.dispatchEvent(new CustomEvent('resetCalculator'))
  }

  /**
   * Render calculator error boundary
   * @returns {ReactElement} Either error fallback or children
   */
  render(): ReactElement {
    const { hasError, error } = this.state
    const { children } = this.props

    if (hasError && error) {
      return (
        <div className="min-h-[400px] flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 space-y-6">
              {/* Error Header */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-orange-900">
                    Rekenfout opgetreden
                  </h2>
                  <p className="text-sm text-orange-700 mt-1">
                    Er ging iets mis bij het berekenen van de TOG-waarde.
                    Dit is meestal een tijdelijk probleem.
                  </p>
                </div>
              </div>

              {/* Development Error Details */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-left">
                  <h4 className="font-mono font-semibold text-orange-900 text-sm mb-2">
                    Foutdetails (alleen in dev):
                  </h4>
                  <pre className="font-mono text-xs text-orange-800 overflow-auto max-h-24">
                    {error.message}
                  </pre>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Retry Button */}
                <button
                  onClick={this.resetCalculator}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  aria-label="Reset calculator and try again"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Opnieuw proberen
                </button>

                {/* Home Button */}
                <Link
                  href="/"
                  className="bg-white hover:bg-gray-50 border border-orange-200 text-orange-900 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Naar homepage
                </Link>
              </div>

              {/* Helpful Info */}
              <div className="bg-white rounded-lg p-4 border border-orange-100">
                <h3 className="font-medium text-orange-900 text-sm mb-2">
                  Wat kunt u doen?
                </h3>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Probeer de calculator opnieuw in te stellen met andere waarden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Vernieuw de pagina in uw browser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Controleer uw internetverbinding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <>{children}</>
  }
}

export default CalculatorErrorBoundary
