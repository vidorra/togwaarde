'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { Mail, ArrowRight, Home, Phone, Clock, MapPin, MessageCircle, Send, AlertCircle } from 'lucide-react'


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission (in real implementation, this would call an API)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-primary">Contact</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Mail className="w-6 h-6 mr-3 text-primary" />
            Contact
          </h1>
          <p className="text-gray-600">
            Heeft u vragen over flesvoeding of onze website? Wij helpen u graag verder.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h2 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Belangrijk: Medische vragen
          </h2>
          <p className="text-amber-800 mb-3">
            Voor <strong>medische vragen</strong> over uw baby kunt u beter contact opnemen met:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-lg p-3">
              <h3 className="font-medium text-amber-800 mb-1">Huisarts</h3>
              <p className="text-sm text-amber-700">Voor urgente medische vragen</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <h3 className="font-medium text-amber-800 mb-1">Consultatiebureau</h3>
              <p className="text-sm text-amber-700">Voor vragen over voeding en groei</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Stuur ons een bericht
              </h2>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">
                    ✅ Bedankt voor uw bericht! Wij nemen zo spoedig mogelijk contact met u op.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-primary/10 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">
                    ❌ Er is iets misgegaan. Probeer het later opnieuw of stuur een e-mail naar info@flesvoedingcalculator.nl
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Uw volledige naam"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="uw.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Onderwerp *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Kies een onderwerp</option>
                    <option value="calculator">Vraag over de calculator</option>
                    <option value="informatie">Vraag over flesvoeding informatie</option>
                    <option value="website">Technisch probleem met website</option>
                    <option value="suggestie">Suggestie voor verbetering</option>
                    <option value="samenwerking">Samenwerking of partnership</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Typ hier uw vraag of bericht..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-all inline-flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Versturen...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Bericht versturen
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  * Verplichte velden. Door dit formulier te versturen gaat u akkoord met ons{' '}
                  <Link href="/privacy-beleid" className="text-primary hover:underline">
                    privacybeleid
                  </Link>.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                E-mail contact
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">Algemene vragen:</h4>
                  <a href="mailto:info@flesvoedingcalculator.nl" className="text-primary hover:underline">
                    info@flesvoedingcalculator.nl
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Privacy vragen:</h4>
                  <a href="mailto:privacy@flesvoedingcalculator.nl" className="text-primary hover:underline">
                    privacy@flesvoedingcalculator.nl
                  </a>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Reactietijd
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• <strong>Algemene vragen:</strong> Binnen 2 werkdagen</p>
                <p>• <strong>Technische problemen:</strong> Binnen 1 werkdag</p>
                <p>• <strong>Privacy verzoeken:</strong> Binnen 30 dagen (wettelijk)</p>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="font-medium text-blue-800 mb-3">Veelgestelde vragen</h3>
              <p className="text-sm text-blue-700 mb-4">
                Misschien staat uw vraag al beantwoord in onze FAQ sectie.
              </p>
              <Link 
                href="/faq"
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Bekijk FAQ
              </Link>
            </div>

            {/* Support Hours */}
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-800 mb-4">
                Wanneer zijn wij bereikbaar?
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• <strong>Maandag - Vrijdag:</strong> 9:00 - 17:00</p>
                <p>• <strong>Weekend:</strong> Beperkte beschikbaarheid</p>
                <p>• <strong>Feestdagen:</strong> Gesloten</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Wij werken vanuit Nederland (CET/CEST tijdzone)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Resources */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Professionele hulp bij flesvoeding
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">Consultatiebureau</h3>
              <p className="text-sm text-gray-600">Voor advies over voeding en groei van uw baby</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">Huisarts</h3>
              <p className="text-sm text-gray-600">Voor medische vragen over uw baby</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">Lactatiekundige</h3>
              <p className="text-sm text-gray-600">Voor vragen over voeding en overstap naar fles</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}