'use client'
import { useState } from 'react'
import Link from 'next/link'
import ContactModal from './ContactModal'
import { ThermometerSun, Calculator, Info, BookOpen, Calendar, Users, X, AlertCircle } from 'lucide-react'

export default function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const navigation = [
    { href: '/', name: 'Home' },
    { href: '/calculator', name: 'TOG Calculator' },
    { href: '/producten', name: 'Producten' },
    { href: '/kennisbank', name: 'Kennisbank' },
    { href: '/over-ons', name: 'Over Ons' }
  ]

  return (
    <>
      {/* Disclaimer Banner */}
      {showDisclaimer && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="container mx-auto flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Veiligheids Disclaimer</p>
              <p>Deze TOG calculator is alleen voor informatieve doeleinden. Raadpleeg altijd uw kinderarts of consultatiebureau voor persoonlijk advies over de veilige slaap van uw baby.</p>
            </div>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="text-amber-600 hover:text-amber-800 ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <ThermometerSun className="w-5 h-5 text-primary" />
                <span className="font-medium text-gray-800">TOGWaarde.nl</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Betrouwbare informatie over TOG-waarden en babyslaap temperatuur, gebaseerd op veilige slaap richtlijnen.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-medium text-gray-500 mb-3">Navigatie</h3>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Informatie */}
            <div>
              <h3 className="font-medium text-gray-500 mb-3">Informatie</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <Link href="/kennisbank/wat-is-tog" className="block hover:text-primary transition-colors">Wat is TOG?</Link>
                <Link href="/kennisbank" className="block hover:text-primary transition-colors">Kennisbank</Link>
                <Link href="/over-ons" className="block hover:text-primary transition-colors">Over Ons</Link>
                <Link href="/privacy-beleid" className="block hover:text-primary transition-colors">Privacy beleid</Link>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="block hover:text-primary transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Veiligheid */}
            <div>
              <h3 className="font-medium text-gray-500 mb-3">Veiligheid</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <a href="https://www.nvk.nl" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">
                  Nederlandse Vereniging voor Kindergeneeskunde
                </a>
                <a href="https://www.rijksoverheid.nl/onderwerpen/pasgeboren-baby/veilig-slapen-baby" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">
                  Rijksoverheid - Veilig Slapen
                </a>
                <a href="https://www.ncj.nl" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">
                  NCJ
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              <p>© 2025 TOGWaarde.nl - Alle rechten voorbehouden</p>
            </div>
            <div className="text-xs text-gray-400">
              <p>Veilige babyslaap informatie gebaseerd op Nederlandse richtlijnen</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  )
}