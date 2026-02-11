import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { rateLimitMiddleware, getClientIP } from '../../../lib/rate-limiter'
import { verifyRecaptcha, validateContactInput, getEmailJSConfig } from '../../../lib/api-validation'
import type { NextRequest } from 'next/server'

/**
 * Send email via EmailJS REST API
 * @param formData - Validated form data
 * @param clientInfo - Client information (IP, user agent)
 * @returns {Promise<{success: boolean}>} Email sending result
 */
async function sendEmail(
  formData: {
    name: string
    email: string
    subject: string
    message: string
    type: string
  },
  clientInfo: {
    ip: string
    userAgent: string
  }
): Promise<{ success: boolean; response: string }> {
  const emailjsConfig = getEmailJSConfig()

  // Log config for debugging with last 3 characters
  console.log('=== SERVER ENVIRONMENT DEBUG ===')
  console.log('EmailJS Public Key:', emailjsConfig.publicKey ? `...${emailjsConfig.publicKey.slice(-3)}` : 'NOT SET')
  console.log('EmailJS Private Key:', emailjsConfig.privateKey ? `...${emailjsConfig.privateKey.slice(-3)}` : 'NOT SET')
  console.log('EmailJS Service ID:', emailjsConfig.serviceId ? `...${emailjsConfig.serviceId.slice(-3)}` : 'NOT SET')
  console.log('EmailJS Template ID:', emailjsConfig.templateId ? `...${emailjsConfig.templateId.slice(-3)}` : 'NOT SET')
  console.log('reCAPTCHA Secret Key:', process.env.RECAPTCHA_SECRET_KEY ? `...${process.env.RECAPTCHA_SECRET_KEY.slice(-3)}` : 'NOT SET')
  console.log('================================')

  // Check if EmailJS is configured
  if (!emailjsConfig.isValid) {
    const missingConfig = []
    if (!emailjsConfig.privateKey) missingConfig.push('PRIVATE_KEY')
    if (!emailjsConfig.serviceId) missingConfig.push('SERVICE_ID')
    if (!emailjsConfig.templateId) missingConfig.push('TEMPLATE_ID')

    console.error('EmailJS missing configuration:', missingConfig)
    throw new Error(`EmailJS not properly configured. Missing: ${missingConfig.join(', ')}`)
  }

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject || `${formData.type === 'feedback' ? 'Feedback' : 'Contact'} van ${formData.name}`,
    message: formData.message,
    message_type: formData.type,
    to_email: 'info@vidorra.nl',
    reply_to: formData.email,
    // Security info
    user_agent: clientInfo.userAgent,
    client_ip: clientInfo.ip,
    timestamp: new Date().toLocaleString('nl-NL', {
      timeZone: 'Europe/Amsterdam',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  try {
    // EmailJS server-side sending via REST API
    console.log('Attempting to send email with params:', {
      serviceId: emailjsConfig.serviceId,
      templateId: emailjsConfig.templateId,
      fromName: templateParams.from_name,
      fromEmail: templateParams.from_email
    })

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: emailjsConfig.serviceId,
        template_id: emailjsConfig.templateId,
        user_id: emailjsConfig.publicKey,
        accessToken: emailjsConfig.privateKey,
        template_params: templateParams
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`EmailJS API error: ${response.status} - ${errorText}`)
    }

    const result = await response.text()
    console.log('EmailJS response:', result)
    return { success: true, response: result }
  } catch (error) {
    console.error('EmailJS send failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}

/**
 * Handle POST requests to contact form
 * @param request - Next.js request object
 * @returns JSON response with success or error
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limiting using Redis-backed rate limiter
    const rateLimit = await rateLimitMiddleware(request, 'contact')

    if (rateLimit.limited) {
      return NextResponse.json(
        rateLimit.response,
        { status: 429, headers: rateLimit.headers }
      )
    }

    // Get client info for logging
    const headersList = headers()
    const ip = getClientIP(request)
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Parse request body
    const body = (await request.json()) as Record<string, unknown>

    // Verify reCAPTCHA if token provided
    if (body.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken as string)

      if (!recaptchaResult.success) {
        console.log('reCAPTCHA verification failed:', recaptchaResult)
        return NextResponse.json(
          { error: 'Beveiligingsvalidatie mislukt' },
          { status: 400, headers: rateLimit.headers }
        )
      }

      // Check score (v3 only)
      if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5) {
        console.log('reCAPTCHA score too low:', recaptchaResult.score)
        return NextResponse.json(
          { error: 'Beveiligingsvalidatie mislukt' },
          { status: 400, headers: rateLimit.headers }
        )
      }
    }

    // Validate input
    const validation = validateContactInput(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Formuliervalidatie mislukt', details: validation.errors },
        { status: 400, headers: rateLimit.headers }
      )
    }

    // Try to send email, but don't fail if it doesn't work
    try {
      const emailResult = await sendEmail(validation.sanitized, { ip, userAgent })

      if (emailResult.success) {
        // Log successful submission (without sensitive data)
        console.log(`Contact form submitted successfully from ${ip} (${validation.sanitized.type})`)

        return NextResponse.json(
          { success: true, message: 'Bericht succesvol verzonden' },
          { headers: rateLimit.headers }
        )
      }
    } catch (emailError) {
      // Log the email error but still return success to user
      console.error('Email sending failed, but form submission recorded:', emailError instanceof Error ? emailError.message : 'Unknown error')

      // For now, just log the form data and return success
      console.log('Form submission (email failed):', {
        type: validation.sanitized.type,
        name: validation.sanitized.name,
        email: validation.sanitized.email,
        subject: validation.sanitized.subject,
        messageLength: validation.sanitized.message.length,
        timestamp: new Date().toISOString(),
        ip: ip,
        userAgent: userAgent
      })

      return NextResponse.json(
        { success: true, message: 'Bericht succesvol ontvangen' },
        { headers: rateLimit.headers }
      )
    }

    // Fallback - should not reach here
    return NextResponse.json(
      { success: true, message: 'Bericht succesvol ontvangen' },
      { headers: rateLimit.headers }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}

/**
 * Handle other HTTP methods - only POST is allowed
 * @returns 405 Method Not Allowed response
 */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
