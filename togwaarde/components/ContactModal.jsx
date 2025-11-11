'use client'
import { useState, useEffect } from 'react'
import { X, Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, MessageCircle, Phone } from 'lucide-react'
import { useRecaptcha } from '../hooks/useRecaptcha.js'

// Contact modal component for feedback and contact forms
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'feedback' // feedback or contact
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', 'ratelimit'
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const { isReady: recaptchaReady, executeRecaptcha } = useRecaptcha()

  // Validate individual fields
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Naam is verplicht'
        if (value.trim().length < 2) return 'Naam moet minimaal 2 karakters bevatten'
        if (value.trim().length > 100) return 'Naam mag maximaal 100 karakters bevatten'
        return ''
      
      case 'email':
        if (!value.trim()) return 'Email is verplicht'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) return 'Voer een geldig emailadres in'
        if (value.trim().length > 254) return 'Email mag maximaal 254 karakters bevatten'
        return ''
      
      case 'message':
        if (!value.trim()) return 'Bericht is verplicht'
        if (value.trim().length < 10) return 'Bericht moet minimaal 10 karakters bevatten'
        if (value.trim().length > 5000) return 'Bericht mag maximaal 5000 karakters bevatten'
        return ''
      
      default:
        return ''
    }
  }

  // Update field errors when form data changes
  useEffect(() => {
    const errors = {}
    Object.keys(formData).forEach(field => {
      if (touchedFields[field]) {
        const error = validateField(field, formData[field])
        if (error) errors[field] = error
      }
    })
    setFieldErrors(errors)
  }, [formData, touchedFields])

  // Reset errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitStatus(null)
      setErrorMessage('')
      setFieldErrors({})
      setTouchedFields({})
    }
  }, [isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInputBlur = (e) => {
    const { name } = e.target
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    // Validate all fields and mark them as touched
    const allTouched = {
      name: true,
      email: true,
      message: true
    }
    setTouchedFields(allTouched)

    // Check if form is valid
    const nameError = validateField('name', formData.name)
    const emailError = validateField('email', formData.email)
    const messageError = validateField('message', formData.message)
    
    const hasErrors = nameError || emailError || messageError
    
    if (hasErrors) {
      setFieldErrors({
        ...(nameError && { name: nameError }),
        ...(emailError && { email: emailError }),
        ...(messageError && { message: messageError })
      })
      setSubmitStatus('error')
      setErrorMessage('Vul alle verplichte velden correct in voordat u het formulier verstuurt.')
      setIsSubmitting(false)
      return
    }

    try {
      // Get reCAPTCHA token (optional)
      let recaptchaToken = null
      if (recaptchaReady) {
        try {
          recaptchaToken = await executeRecaptcha('contact_form')
          if (!recaptchaToken) {
            console.warn('reCAPTCHA token generation failed, proceeding without it')
          }
        } catch (error) {
          console.warn('reCAPTCHA execution failed:', error)
        }
      } else {
        console.warn('reCAPTCHA not ready, proceeding without it')
      }

      // Send email directly via EmailJS client-side
      const { default: emailjs } = await import('@emailjs/browser')
      
      // Check if environment variables are available
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      
      console.log('=== CLIENT EMAILJS DEBUG v2 ===')
      console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('EMAIL')))
      console.log('Public Key:', publicKey ? `...${publicKey.slice(-3)}` : 'NOT SET')
      console.log('Service ID:', serviceId ? `...${serviceId.slice(-3)}` : 'NOT SET')
      console.log('Template ID:', templateId ? `...${templateId.slice(-3)}` : 'NOT SET')
      console.log('Raw values:')
      console.log('- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'EXISTS' : 'MISSING')
      console.log('- NEXT_PUBLIC_EMAILJS_SERVICE_ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'EXISTS' : 'MISSING')
      console.log('- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'EXISTS' : 'MISSING')
      console.log('===============================')
      
      if (!publicKey || !serviceId || !templateId) {
        throw new Error(`EmailJS not configured. Missing: ${[
          !publicKey && 'PUBLIC_KEY',
          !serviceId && 'SERVICE_ID', 
          !templateId && 'TEMPLATE_ID'
        ].filter(Boolean).join(', ')}`)
      }
      
      // Initialize EmailJS
      emailjs.init(publicKey)
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || `${formData.type === 'feedback' ? 'Feedback' : 'Contact'} van ${formData.name}`,
        message: formData.message,
        message_type: formData.type,
        to_email: 'info@vidorra.nl',
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('nl-NL', { 
          timeZone: 'Europe/Amsterdam',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      
      console.log('Sending email via client-side EmailJS with environment variables...')
      
      await emailjs.send(
        serviceId,
        templateId,
        templateParams
      )
      
      console.log('Email sent successfully!')
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'feedback'
        })
        setSubmitStatus(null)
        setErrorMessage('')
        setFieldErrors({})
        setTouchedFields({})
        onClose()
      }, 2500)
      
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Er ging iets mis. Probeer het later opnieuw.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Remove old validation check - button is always enabled now

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary rounded-t-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="w-6 h-6" />
              <h2 className="text-xl font-medium">Contact & Feedback</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/90 text-sm mt-2">
            We horen graag van je! Stel je vraag of deel je feedback met ons.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Message Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type bericht
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'feedback' }))}
                className={`p-3 rounded-xl border transition-all text-sm font-medium flex items-center justify-center space-x-2 ${
                  formData.type === 'feedback'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-primary'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Feedback</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'contact' }))}
                className={`p-3 rounded-xl border transition-all text-sm font-medium flex items-center justify-center space-x-2 ${
                  formData.type === 'contact'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-primary'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naam *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Uw naam"
                required
                className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all outline-none text-gray-800 placeholder:text-gray-500 ${
                  fieldErrors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                }`}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-primary flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="uw.email@voorbeeld.nl"
                required
                className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all outline-none text-gray-800 placeholder:text-gray-500 ${
                  fieldErrors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                }`}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-primary flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Onderwerp
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder={formData.type === 'feedback' ? 'Feedback over...' : 'Contact over...'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-800 placeholder:text-gray-500"
            />
          </div>


          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bericht * <span className="text-gray-500 text-xs">({formData.message.trim().length}/10 minimum)</span>
            </label>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder={formData.type === 'feedback' 
                  ? 'Deel uw feedback, suggesties of ervaringen met ons...' 
                  : 'Beschrijf uw bericht zo duidelijk mogelijk...'
                }
                required
                minLength={10}
                rows={4}
                className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all outline-none resize-none text-gray-800 placeholder:text-gray-500 ${
                  fieldErrors.message
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                }`}
              />
              <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            </div>
            {fieldErrors.message && (
              <p className="mt-1 text-sm text-primary flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Bericht succesvol verzonden! We nemen zo snel mogelijk contact op.
              </span>
            </div>
          )}

          {(submitStatus === 'error' || submitStatus === 'ratelimit') && (
            <div className="flex items-center space-x-2 text-primary bg-primary/10 p-3 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {errorMessage || 'Er ging iets mis. Probeer het opnieuw of mail naar info@vidorra.nl'}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Verzenden...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Versturen</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 rounded-b-2xl px-6 py-4">
          <p className="text-xs text-gray-500 text-center">
            Uw gegevens worden alleen gebruikt om contact met u op te nemen en worden niet gedeeld met derden.
            <br />
            <span className="text-xs text-gray-400 mt-1 block">
              Dit formulier wordt beschermd door reCAPTCHA en Google&apos;s{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Privacybeleid
              </a>{' '}
              en{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Servicevoorwaarden
              </a>{' '}
              zijn van toepassing.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactModal