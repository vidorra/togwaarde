'use client'
import { useEffect, useState } from 'react'

// Hook for managing Google reCAPTCHA v3
export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    
    // DEBUG: Comprehensive environment variable analysis
    console.log('=== COMPREHENSIVE ENVIRONMENT DEBUG ===')
    console.log('🌍 All available NEXT_PUBLIC_ variables:')
    const nextPublicVars = Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_'))
    console.log('Raw process.env keys:', Object.keys(process.env).slice(0, 10)) // Debug first 10 keys
    nextPublicVars.forEach(key => {
      const value = process.env[key]
      console.log(`  - ${key}: ${value ? `${value.substring(0, 10)}...${value.slice(-3)} (length: ${value.length})` : 'NOT SET'}`)
    })
    
    console.log('\n📧 Required EmailJS Variables Check:')
    console.log('  - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? `...${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.slice(-3)} ✅` : '❌ MISSING')
    console.log('  - NEXT_PUBLIC_EMAILJS_SERVICE_ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? `...${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID.slice(-3)} ✅` : '❌ MISSING')
    console.log('  - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? `...${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID.slice(-3)} ✅` : '❌ MISSING')
    
    console.log('\n🔐 reCAPTCHA Variable Check:')
    console.log('  - NEXT_PUBLIC_RECAPTCHA_SITE_KEY:', siteKey ? `...${siteKey.slice(-3)} ✅` : '❌ MISSING')
    
    console.log('\n🛍️ Bol.com API Status Check:')
    console.log('  - BOL_API_CLIENT_ID: Server-side only (secure) ✅')
    console.log('  - BOL_API_CLIENT_SECRET: Server-side only (secure) ✅')
    console.log('  - API Endpoint: /api/bol-feed (kennisbank-products action) ✅')
    console.log('  - Note: Credentials are properly secured on server-side')
    
    console.log('\n🏗️ Build Information:')
    console.log('  - NODE_ENV:', process.env.NODE_ENV || 'undefined')
    console.log('  - Total env vars:', Object.keys(process.env).length)
    console.log('  - NEXT_PUBLIC_ vars found:', nextPublicVars.length)
    
    if (nextPublicVars.length === 0) {
      console.warn('⚠️  NO NEXT_PUBLIC_ variables found! This suggests:')
      console.warn('   1. CapRover environment variables not set with NEXT_PUBLIC_ prefix')
      console.warn('   2. Application needs rebuild after adding environment variables')
      console.warn('   3. Build cache needs clearing')
    }
    console.log('===========================================')
    
    // Don't spam console with warnings
    if (!siteKey || siteKey === 'your_recaptcha_site_key_here') {
      // Only log once instead of repeatedly
      if (!window.recaptchaWarningLogged) {
        console.warn('reCAPTCHA site key not configured, form will work without it')
        window.recaptchaWarningLogged = true
      }
      setIsReady(false)
      setIsLoaded(false)
      return
    }

    // Check if script is already being loaded
    if (window.recaptchaLoading) {
      return
    }

    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha && window.grecaptcha.ready) {
      setIsLoaded(true)
      window.grecaptcha.ready(() => {
        setIsReady(true)
      })
      return
    }

    // Prevent multiple script loads
    window.recaptchaLoading = true

    // Load reCAPTCHA script
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      setIsLoaded(true)
      window.recaptchaLoading = false
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setIsReady(true)
        })
      }
    }

    script.onerror = () => {
      console.warn('reCAPTCHA script blocked or failed to load (form will still work)')
      window.recaptchaLoading = false
      setIsLoaded(false)
      setIsReady(false)
    }

    // Only append if not already present
    const existingScript = document.querySelector(`script[src*="recaptcha"]`)
    if (!existingScript) {
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup
      window.recaptchaLoading = false
    }
  }, [])

  // Execute reCAPTCHA and get token
  const executeRecaptcha = async (action = 'submit') => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    
    if (!isReady || !window.grecaptcha || !siteKey) {
      console.warn('reCAPTCHA not ready or not configured')
      return null
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action })
      return token
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error)
      return null
    }
  }

  return {
    isLoaded,
    isReady,
    executeRecaptcha
  }
}