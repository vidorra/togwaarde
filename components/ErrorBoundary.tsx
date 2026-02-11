'use client'

import React, { ReactNode, ReactElement } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

/**
 * Props for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactElement
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  componentName?: string
}

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * React Error Boundary Component
 *
 * Catches JavaScript errors in child components and displays fallback UI.
 * Allows graceful degradation instead of white-screen crashes.
 *
 * **Features:**
 * - Catches errors in child components
 * - Customizable fallback UI via `fallback` prop
 * - Error logging via `onError` callback
 * - Component name tracking for debugging
 * - Reset functionality to retry rendering
 *
 * **Usage:**
 * ```tsx
 * <ErrorBoundary
 *   componentName="Calculator"
 *   onError={(error) => console.log('Calculator error:', error)}
 *   fallback={(error, reset) => (
 *     <div>
 *       <p>Calculator failed: {error.message}</p>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 * >
 *   <CalculatorComponent />
 * </ErrorBoundary>
 * ```
 *
 * **Note:** Error Boundaries only catch errors in:
 * - Render methods
 * - Lifecycle methods
 * - Constructors
 *
 * They do NOT catch errors in:
 * - Event handlers (use try-catch instead)
 * - Async code (use try-catch in async functions)
 * - Server-side rendering
 *
 * @class ErrorBoundary
 * @extends {React.Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Initialize error boundary state
   * @param {ErrorBoundaryProps} props - Component props
   */
  constructor(props: ErrorBoundaryProps) {
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
   * @returns {ErrorBoundaryState} New state with error
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  /**
   * Log error to error reporting service
   * @param {Error} error - The caught error
   * @param {React.ErrorInfo} errorInfo - React error info with component stack
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error in ${this.props.componentName || 'component'}:`, error, errorInfo)
    }

    // Call parent error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // TODO: Send to error tracking service (Sentry, etc.)
    // errorTrackingService.captureException(error, {
    //   tags: { component: this.props.componentName },
    //   extra: { errorInfo }
    // })
  }

  /**
   * Reset error boundary state
   */
  reset = (): void => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  /**
   * Render error boundary
   * @returns {ReactElement} Either error fallback or children
   */
  render(): ReactElement {
    const { hasError, error } = this.state
    const { children, fallback, componentName } = this.props

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.reset)
      }

      // Default fallback UI
      return (
        <div className="min-h-[200px] flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 space-y-4">
              {/* Error Icon */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>

              {/* Error Message */}
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-red-900">
                  {componentName ? `${componentName} Error` : 'Something went wrong'}
                </h3>
                <p className="text-sm text-red-700">
                  We encountered an unexpected error. Please try again.
                </p>
              </div>

              {/* Development Error Details */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-100 rounded-lg p-3 text-left">
                  <p className="text-xs font-mono text-red-800 break-words">
                    {error.message}
                  </p>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={this.reset}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                aria-label="Retry after error"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return <>{children}</>
  }
}

export default ErrorBoundary
