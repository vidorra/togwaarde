import { NextResponse } from 'next/server'
import { verifyAdminAndGetWebsite, signAdminToken } from '../../../../lib/jwt-utils.js'

// Force dynamic route
export const dynamic = 'force-dynamic'

const VALID_WEBSITES = ['flesvoedingcalculator', 'togwaarde']

/**
 * POST /api/admin/switch-website - Switch admin context to different website
 *
 * Allows an authenticated admin to switch their JWT token to manage a different website.
 * Both websites share the same admin password and JWT_SECRET for cross-website management.
 *
 * Request body: { newWebsite: 'togwaarde' }
 * Response: { success: true, token: '<new-jwt>', website: 'togwaarde' }
 */
export async function POST(request) {
  try {
    // Verify current token and get website context
    const { website } = verifyAdminAndGetWebsite(request)

    const body = await request.json()
    const { newWebsite } = body

    // Validate new website is valid
    if (!newWebsite || !VALID_WEBSITES.includes(newWebsite)) {
      return NextResponse.json(
        { success: false, message: `Invalid website. Must be one of: ${VALID_WEBSITES.join(', ')}` },
        { status: 400 }
      )
    }

    // Don't allow switching to the same website (pointless but harmless)
    if (newWebsite === website) {
      return NextResponse.json(
        { success: false, message: 'Already on this website' },
        { status: 400 }
      )
    }

    // Create new token for the new website
    const newToken = signAdminToken(newWebsite)

    console.log(`Admin switched from ${website} to ${newWebsite}`)

    return NextResponse.json({
      success: true,
      token: newToken,
      website: newWebsite,
      message: `Switched to ${newWebsite}`,
    })
  } catch (error) {
    console.error('Website switch error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to switch website' },
      { status: 401 }
    )
  }
}

/**
 * GET handler - method not allowed
 */
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  )
}
