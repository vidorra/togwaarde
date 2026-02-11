'use client'

import TOGCalculator from '../../components/TOGCalculator'
import CalculatorErrorBoundary from '../../components/calculator/CalculatorErrorBoundary'

/**
 * Calculator Page
 *
 * Displays the main TOG calculator wrapped in an error boundary
 * for graceful error handling.
 *
 * The error boundary catches rendering errors and provides recovery options.
 *
 * @page CalculatorPage
 * @returns {JSX.Element} Calculator page with error boundary
 */
export default function CalculatorPage(): JSX.Element {
  return (
    <CalculatorErrorBoundary
      onError={(error) => {
        // TODO: Send to error tracking service
        console.error('Calculator error:', error)
      }}
    >
      <TOGCalculator />
    </CalculatorErrorBoundary>
  )
}
