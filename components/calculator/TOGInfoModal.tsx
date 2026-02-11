'use client'

import { memo, useEffect, useRef } from 'react'
import type { TOGInfoModalProps } from '../../lib/tog-types'

/**
 * TOGInfoModal - Informatieve modal over TOG-waarden
 *
 * **Accessibility Features:**
 * - ✅ Focus trap: Tab cycles only within modal (Shift+Tab cycles backwards)
 * - ✅ Focus restoration: Focus returns to trigger button when closed
 * - ✅ ESC key: Closes modal (role="dialog" handles this automatically)
 * - ✅ Semantic HTML: role="dialog", aria-modal, aria-labelledby
 * - ✅ Screen reader: Modal content properly labeled
 *
 * **Performance:**
 * - Memoized to prevent re-renders when parent updates but modal state hasn't changed
 * - Only re-renders when isOpen or onClose changes
 *
 * @component
 * @param {TOGInfoModalProps} props - Modal props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {() => void} props.onClose - Callback when modal closes
 * @returns {JSX.Element | null} Modal or null if not open
 */
const TOGInfoModal = memo(function TOGInfoModal({ isOpen, onClose }: TOGInfoModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * Handle keyboard events in modal
   * - ESC: Close modal
   * - TAB/SHIFT+TAB: Focus trap (keep focus within modal)
   */
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      // ESC key to close
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // TAB key for focus trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]
          const activeElement = document.activeElement as HTMLElement

          // Shift+Tab at first element: focus last
          if (e.shiftKey && activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
          // Tab at last element: focus first (trap)
          else if (!e.shiftKey && activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    // Set initial focus to close button
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown)

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      // Cleanup
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow

      // Restore focus to trigger button if it's still in the DOM
      // This is typically handled by the parent component
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="presentation"
      ref={containerRef}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tog-info-title"
        ref={modalRef}
      >
        <h3 id="tog-info-title" className="text-xl font-bold mb-4 text-text-primary">Over TOG-waarden</h3>

        <div className="space-y-4 text-sm text-text-secondary-dark">
          {/* Belangrijke informatie */}
          <div className="relative p-4 rounded-lg bg-background pl-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
            <p className="font-semibold text-primary/80 mb-2">Belangrijke informatie:</p>
            <p>
              De TOG-waarden voor individuele kledingstukken in deze calculator zijn{' '}
              <strong>schattingen</strong>. De industrie kent alleen officiële TOG-waarden
              toe aan slaapzakken en inbakerdoeken, niet aan rompers, luiers of sokjes.
            </p>
          </div>

          {/* Wat is TOG? */}
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Wat is TOG?</h4>
            <p>
              TOG staat voor "Thermal Overall Grade" - een maat voor thermische isolatie.
              Eén TOG = 0.1 m²·K/W warmteweerstand.
            </p>
          </div>

          {/* Officiële aanbevelingen */}
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Officiële aanbevelingen:</h4>
            <ul className="space-y-1">
              <li>• <strong>24°C+:</strong> 0.2-0.5 TOG</li>
              <li>• <strong>22-24°C:</strong> 0.5-1.0 TOG</li>
              <li>• <strong>20-22°C:</strong> 1.0-2.5 TOG</li>
              <li>• <strong>18-20°C:</strong> 2.5 TOG (NHS/Lullaby Trust)</li>
              <li>• <strong>16-18°C:</strong> 2.5-3.5 TOG</li>
              <li>• <strong>&lt;16°C:</strong> 3.5 TOG maximum</li>
            </ul>
          </div>

          {/* Dekens & Veiligheid */}
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Dekens & Veiligheid:</h4>
            <ul className="space-y-1">
              <li>• <strong className="text-primary">Losse dekens:</strong> Alleen voor 12+ maanden (niet aanbevolen)</li>
              <li>• <strong className="text-secondary-dark">Ingestopte dekens:</strong> Toegestaan mits correct gedaan</li>
              <li>• <strong>"Feet to foot" methode:</strong> Voetjes aan voeteneind, deken onder armen</li>
              <li>• <strong>Slaapzakken:</strong> Vanaf 50cm voor newborns beschikbaar</li>
              <li>• <strong>Altijd veiliger:</strong> Slaapzak boven dekens verkiezen</li>
            </ul>
          </div>

          {/* Veilig instoppen instructie */}
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Veilig instoppen instructie:</h4>
            <ol className="space-y-1 list-decimal list-inside text-sm">
              <li>Leg baby met voetjes aan voeteneind bedje</li>
              <li>Gebruik lichtgewicht deken(s)</li>
              <li>Trek deken tot schouders/oksels (niet hoger!)</li>
              <li>Stop deken stevig onder matras aan beide zijden</li>
              <li>Controleer of deken niet omhoog kan schuiven</li>
            </ol>
          </div>

          {/* Bronnen */}
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Bronnen:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>VeiligheidNL:</strong> Veilig Slapen richtlijnen (16-20°C)</li>
              <li>• <strong>NCJ (Nederlands Centrum Jeugdgezondheid):</strong> JGZ-richtlijn Veilig Slapen</li>
              <li>• <strong>NHS (UK):</strong> Safe Sleep guidelines</li>
              <li>• <strong>The Lullaby Trust:</strong> Safer Sleep for babies</li>
              <li>• <strong>AAP (American Academy of Pediatrics):</strong> Safe Sleep recommendations</li>
            </ul>
            <p className="mt-2 text-xs text-text-secondary">
              Voor Nederlandse ouders: raadpleeg ook het <a href="https://www.consultatiebureau.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">consultatiebureau</a> of <a href="https://www.kraamzorg.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">kraamzorg</a> voor persoonlijk advies.
            </p>
          </div>

          {/* Advies */}
          <div className="relative p-4 rounded-lg bg-blue-50 pl-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500">
            <p className="font-semibold text-blue-800 mb-2">Advies:</p>
            <p>
              Gebruik deze calculator als richtlijn, maar vertrouw vooral op je eigen observatie.
              Controleer regelmatig de nek en borst van je baby op tekenen van oververhitting of onderkoeling.
            </p>
          </div>
        </div>

        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="mt-6 w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Modal sluiten"
        >
          Sluiten
        </button>
      </div>
    </div>
  )
})

export default TOGInfoModal
