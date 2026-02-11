'use client'
import { useState, useEffect, useRef } from 'react'
import { HelpCircle, X } from 'lucide-react'

const InfoTooltip = ({ content }) => {
  const [show, setShow] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (wrapperRef.current) {
      const button = wrapperRef.current.closest('button')
      if (button) {
        if (show) {
          button.style.zIndex = '60'
        } else {
          button.style.zIndex = ''
        }
      }
    }
  }, [show])

  return (
    <div ref={wrapperRef} className={`relative inline-block ${show ? 'z-[60]' : 'z-50'}`}>
      <span
        onClick={(e) => {
          e.stopPropagation()
          setShow(!show)
        }}
        className="ml-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer inline-flex"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation()
            e.preventDefault()
            setShow(!show)
          }
        }}
        aria-label="Meer informatie"
      >
        <HelpCircle className="w-4 h-4" />
      </span>

      {show && (
        <>
          {/* Backdrop voor mobiel - sluit bij klik buiten */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setShow(false)}
          />

          {/* Tooltip content */}
          <div className="absolute z-50 w-72 md:w-64 p-4 bg-white border-2 border-primary/20 rounded-lg shadow-xl text-sm -left-32 md:-left-28 top-8 md:top-6">
            {/* Close button - vooral handig op mobiel */}
            <span
              onClick={(e) => {
                e.stopPropagation()
                setShow(false)
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer inline-flex"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  e.preventDefault()
                  setShow(false)
                }
              }}
              aria-label="Sluiten"
            >
              <X className="w-4 h-4" />
            </span>

            <div className="pr-6">
              {content}
            </div>

            {/* Arrow indicator */}
            <div className="absolute -top-2 left-32 md:left-28 w-4 h-4 bg-white border-l-2 border-t-2 border-primary/20 transform rotate-45" />
          </div>
        </>
      )}
    </div>
  )
}

export default InfoTooltip
