'use client'
import Layout from '../components/Layout'
import Link from 'next/link'
import { Calculator, ArrowLeft, Calendar, BookOpen, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
          {/* 404 Visual */}
          <div className="relative">
            <div className="text-6xl md:text-8xl font-medium text-primary/20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-800">
              Pagina niet gevonden
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              De pagina die u zoekt bestaat niet of is verplaatst. 
              Geen zorgen, we helpen u graag verder!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Waar wilt u naartoe?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/"
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Calculator className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Calculator</div>
                  <div className="text-sm text-gray-600">Terug naar de hoofdpagina</div>
                </div>
              </Link>
              
              <Link 
                href="/voedingsschemas"
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Calendar className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Voedingsschema's</div>
                  <div className="text-sm text-gray-600">Bereken voedingsschema's</div>
                </div>
              </Link>
              
              <Link 
                href="/kennisbank"
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <BookOpen className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Kennisbank</div>
                  <div className="text-sm text-gray-600">Informatie over flesvoeding</div>
                </div>
              </Link>
              
              <Link 
                href="/faq"
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <HelpCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">Veelgestelde vragen</div>
                  <div className="text-sm text-gray-600">Antwoorden op veel vragen</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ga terug naar de vorige pagina
            </button>
          </div>

          {/* Contact */}
          <div className="bg-primary-gradient rounded-2xl p-6 text-white">
            <h3 className="font-medium text-lg mb-2">
              Hulp nodig?
            </h3>
            <p className="text-white/90 mb-4">
              Kunt u niet vinden wat u zoekt? Neem contact met ons op.
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