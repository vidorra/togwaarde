import DOMPurify from 'isomorphic-dompurify'

/**
 * reCAPTCHA verification result
 */
export interface RecaptchaResult {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  sanitized: {
    name: string
    email: string
    subject: string
    message: string
    type: string
  }
}

/**
 * Verify reCAPTCHA token (v3)
 * @param token - reCAPTCHA token from client
 * @returns {Promise<RecaptchaResult>} Verification result with score
 */
export async function verifyRecaptcha(token: string): Promise<RecaptchaResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured')
    return { success: false, score: 0 }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json() as RecaptchaResult
    return {
      success: data.success,
      score: data.score || 0,
      action: data.action,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
      'error-codes': data['error-codes']
    }
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return { success: false, score: 0 }
  }
}

/**
 * Sanitize text input - removes all HTML/scripts
 * @param str - Input string to sanitize
 * @returns Cleaned string
 */
function sanitizeText(str: string | undefined): string {
  if (!str) return ''
  return DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim()
}

/**
 * Validate and sanitize contact form input
 * @param data - Form data object
 * @returns {ValidationResult} Validation result with sanitized data or errors
 */
export function validateContactInput(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = []

  // Validate name
  const name = (data.name as string)?.trim()
  if (!name || name.length < 2 || name.length > 100) {
    errors.push('Name must be between 2 and 100 characters')
  }

  // Validate email
  const email = (data.email as string)?.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email) || email.length > 254) {
    errors.push('Valid email address is required')
  }

  // Validate message
  const message = (data.message as string)?.trim()
  if (!message || message.length < 10 || message.length > 5000) {
    errors.push('Message must be between 10 and 5000 characters')
  }

  // Validate type
  const type = (data.type as string)?.trim()
  if (!['feedback', 'contact'].includes(type)) {
    errors.push('Invalid message type')
  }

  // Check for obvious spam patterns
  const suspiciousPatterns = [
    /https?:\/\/[^\s]+/gi, // Multiple URLs
    /\b(buy now|click here|free money|win big|viagra|casino|lottery|investment opportunity)\b/gi,
    /(.)\\1{15,}/, // Too many repeated characters
    /[A-Z]{20,}/, // Excessive caps
  ]

  const subject = (data.subject as string) || ''
  const fullText = `${name} ${subject} ${message}`.toLowerCase()
  const suspiciousMatches = suspiciousPatterns.filter(pattern => pattern.test(fullText))

  if (suspiciousMatches.length > 0) {
    errors.push('Message contains suspicious content')
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name: sanitizeText(name),
      email: email?.toLowerCase().trim() || '',
      subject: sanitizeText(subject),
      message: sanitizeText(message),
      type: type || ''
    }
  }
}

/**
 * Get reCAPTCHA configuration from environment
 * @returns Object with reCAPTCHA config values
 */
export function getRecaptchaConfig(): {
  secretKey: string | undefined
  enabled: boolean
} {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  return {
    secretKey,
    enabled: !!secretKey
  }
}

/**
 * Get EmailJS configuration from environment
 * @returns Object with EmailJS config values
 */
export function getEmailJSConfig(): {
  publicKey: string | undefined
  privateKey: string | undefined
  serviceId: string | undefined
  templateId: string | undefined
  isValid: boolean
} {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const privateKey = process.env.EMAILJS_PRIVATE_KEY
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

  return {
    publicKey,
    privateKey,
    serviceId,
    templateId,
    isValid: !!(privateKey && serviceId && templateId)
  }
}
